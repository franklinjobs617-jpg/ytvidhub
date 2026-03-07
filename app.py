import io
import os
import re
import time
import shutil
import uuid
import sys
import json
import threading
import zipfile
import random
import string 
import requests
from concurrent.futures import ThreadPoolExecutor
from flask import Flask, request, jsonify, send_file, redirect, after_this_request, Response, stream_with_context
from flask_cors import CORS
from rembg import remove

import yt_dlp

# ==============================================================================
# 0. 全局配置与初始化
# ==============================================================================
app = Flask(__name__)
# 允许跨域，支持前端 main.js 的请求
CORS(app, resources={r"/*": {"origins": "*"}})

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOWNLOAD_FOLDER = os.path.join(BASE_DIR, "downloads")
BATCH_TEMP_FOLDER = os.path.join(BASE_DIR, "batch_temp") 
SUBTITLE_TEMP_FOLDER = os.path.join(BASE_DIR, "subtitle_temp")

ARK_API_KEY = "3a4b60e4-f692-4210-b26e-a03c636fc804"
ARK_MODEL = "glm-4-7-251222"
ARK_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions"

# 确保文件夹存在
for folder in [DOWNLOAD_FOLDER, BATCH_TEMP_FOLDER, SUBTITLE_TEMP_FOLDER]:
    os.makedirs(folder, exist_ok=True) 

# 全局任务存储 (同时用于旧版视频批量和新版字幕批量)
tasks = {}

# 字幕缓存 (避免重复下载)
_subtitle_cache = {}
_SUBTITLE_CACHE_TTL = 3600  # 1小时

# AI 总结缓存
_summary_cache = {}
_SUMMARY_CACHE_TTL = 7200  # 2小时

# 学习卡片缓存
_cards_cache = {}
_CARDS_CACHE_TTL = 7200  # 2小时

# ==============================================================================
# 1. 动态代理生成逻辑 (参考你提供的代码)
# ==============================================================================
def get_proxy_url():
    """ 生成动态住宅代理 URL，用于绕过 YouTube 的 IP 限制 """
    try:
        customer_id = "B_48472"
        password = "vaug9887"
        country = "US"
        gateway = "gate1.ipweb.cc"
        port = "7778"
        # 每次请求生成不同的 Session ID，确保 IP 切换
        session_id = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        username = f"{customer_id}_{country}___5_{session_id}"
        return f"http://{username}:{password}@{gateway}:{port}"
    except Exception as e:
        print(f"⚠️ 代理生成失败: {e}")
        return None

def sanitize_filename(filename):
    """ 清洗文件名，防止文件系统错误 """
    if not filename: return "download"
    # 替换非法字符
    clean = re.sub(r'[\\/*?:"<>|]', "_", filename).strip()
    # 限制长度
    encoded_bytes = clean.encode('utf-8')
    if len(encoded_bytes) > 200:
        clean = encoded_bytes[:200].decode('utf-8', 'ignore')
    return clean

def parse_srt_to_text(content):
    """ 解析 SRT/VTT 为纯文本 (用于AI总结) """
    if not content: return ""
    
    lines = content.splitlines()
    cleaned_lines = []
    
    timestamp_pattern = re.compile(r'\d{2}:\d{2}:\d{2}[,.]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[,.]\d{3}')
    
    for line in lines:
        line = line.strip()
        if not line: continue
        if line.upper().startswith('WEBVTT') or line.startswith('Language:') or line.startswith('Kind:'): 
            continue
        if line.isdigit(): continue
        if timestamp_pattern.search(line): continue
        text_line = re.sub(r'<[^>]+>', '', line)
        text_line = text_line.strip()
        
        if text_line:
            cleaned_lines.append(text_line)
    
    # 简单去重
    unique_lines = []
    for i, line in enumerate(cleaned_lines):
        if i > 0 and line == cleaned_lines[i-1]:
            continue
        unique_lines.append(line)
        
    return '\n'.join(unique_lines)

def get_video_info_core(video_url):
    """ 获取视频详细信息 (用于前端 /api/info) """
    proxy = get_proxy_url()
    ydl_opts = {
        'proxy': proxy, 'quiet': True, 'no_warnings': True, 'skip_download': True,
        'extractor_args': {'youtube': {'player_client': ['ios', 'android', 'web']}}
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl: 
            info = ydl.extract_info(video_url, download=False)
            
            # 处理字幕列表
            ALLOWED_LANGS = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru']
            subtitles_list = []
            # 提取手动字幕
            for lang, subs in info.get('subtitles', {}).items():
                if any(lang.startswith(al) for al in ALLOWED_LANGS):
                    subtitles_list.append({"lang_code": lang, "name": subs[0].get('name', lang), "is_auto": False})
            # 提取自动字幕
            for lang, subs in info.get('automatic_captions', {}).items():
                if any(lang.startswith(al) for al in ALLOWED_LANGS):
                    if not any(s['lang_code'] == lang for s in subtitles_list):
                        subtitles_list.append({"lang_code": lang, "name": subs[0].get('name', lang), "is_auto": True})
            
            subtitles_list.sort(key=lambda x: 0 if x['lang_code'].startswith('en') else 1)

            return {
                "url": video_url, 
                "title": info.get('title'), 
                "thumbnail": info.get('thumbnail'),
                "duration": info.get('duration'),
                "uploader": info.get('uploader'),
                "formats": process_video_formats(info), 
                "subtitles": subtitles_list
            }, None
    except Exception as e:
        return {"url": video_url, "error": str(e)}, str(e)

def process_video_formats(info):
    """ 格式化视频流信息 """
    formats_raw = info.get('formats', [])
    final_formats = []
    for f in formats_raw:
        if f.get('vcodec') != 'none' and f.get('height'):
            final_formats.append({
                "format_id": f.get('format_id'),
                "resolution": f"{f.get('height')}p",
                "filesize": f.get('filesize'),
                "type": "video"
            })
        elif f.get('vcodec') == 'none' and f.get('acodec') != 'none':
            final_formats.append({
                "format_id": f.get('format_id'),
                "resolution": "Audio",
                "filesize": f.get('filesize'),
                "type": "audio"
            })
    return final_formats

def run_download_video_core(video_url, quality_val, output_dir):
    """ 服务器下载视频/音频核心逻辑 """
    unique_id = str(uuid.uuid4())
    output_template = os.path.join(output_dir, f"{unique_id}.%(ext)s")
    
    if quality_val == 'audio':
        dl_format, final_ext = 'bestaudio/best', 'mp3'
    elif quality_val and quality_val.isdigit():
        dl_format = f'bestvideo[height<={quality_val}]+bestaudio/best[height<={quality_val}]/best'
        final_ext = 'mp4'
    else:
        dl_format, final_ext = 'bestvideo+bestaudio/best', 'mp4'
    
    proxy = get_proxy_url()
    ydl_opts = {
        'proxy': proxy, 'format': dl_format, 'outtmpl': output_template,
        'quiet': False, 'no_warnings': True,
        'merge_output_format': 'mp4' if final_ext == 'mp4' else None
    }
    if final_ext == 'mp3':
        ydl_opts['postprocessors'] = [{'key': 'FFmpegExtractAudio','preferredcodec': 'mp3','preferredquality': '192'}]

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=True)
            candidates = [f for f in os.listdir(output_dir) if f.startswith(unique_id)]
            if not candidates: return None, None, "File not generated"
            
            final_filepath = os.path.join(output_dir, candidates[0])
            real_ext = os.path.splitext(final_filepath)[1]
            friendly_filename = f"{sanitize_filename(info.get('title', 'video'))}{real_ext}"
            return final_filepath, friendly_filename, None
    except Exception as e:
        return None, None, str(e)

def check_video_for_batch(video_url):
    """ 对应 /api/batch_check — 使用共享缓存避免重复 yt_dlp 调用 """
    try:
        info, err = _get_video_info_cached(video_url)
        if not info:
            return {
                "url": video_url,
                "video_info": {"title": "Error/Invalid", "uploader": "Unknown"},
                "can_download": False
            }
        has_subtitles = bool(info.get('subtitles') or info.get('automatic_captions'))
        return {
            "url": video_url,
            "video_info": {
                "title": info.get('title', 'Unknown'),
                "uploader": info.get('uploader', 'Unknown')
            },
            "can_download": has_subtitles
        }
    except Exception as e:
        return {
            "url": video_url,
            "video_info": {"title": "Error/Invalid", "uploader": "Unknown"},
            "can_download": False
        }

# 视频信息缓存 {video_url: (timestamp, info_dict)}
_info_cache: dict = {}
_INFO_CACHE_TTL = 1800  # 30分钟

def _get_video_info_cached(video_url: str):
    """共享缓存层：避免同一视频重复调用 yt_dlp.extract_info"""
    now = time.time()
    if video_url in _info_cache:
        ts, info = _info_cache[video_url]
        if now - ts < _INFO_CACHE_TTL:
            return info, None
    proxy = get_proxy_url()
    ydl_opts = {'proxy': proxy, 'skip_download': True, 'quiet': True, 'no_warnings': True}
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
        _info_cache[video_url] = (now, info)
        return info, None
    except Exception as e:
        return None, str(e)

# 字幕内存缓存 {cache_key: (timestamp, transcript, title)}
_subtitle_cache: dict = {}
_SUBTITLE_CACHE_TTL = 3600  # 1小时

def get_subtitle_fast(video_url: str, lang_code: str = 'en'):
    """
    快速字幕获取：yt_dlp 只拿元数据拿到字幕 URL，再直接 requests.get 下载内容。
    跳过 yt_dlp 文件写入 + FFmpeg 转换，速度提升 3-5x。
    带内存缓存，同一视频 1 小时内不重复抓取。
    """
    cache_key = f"{video_url}_{lang_code}"
    now = time.time()

    # 命中缓存直接返回
    if cache_key in _subtitle_cache:
        ts, transcript, title = _subtitle_cache[cache_key]
        if now - ts < _SUBTITLE_CACHE_TTL:
            return transcript, title, None

    proxy = get_proxy_url()
    ydl_opts = {'proxy': proxy, 'skip_download': True, 'quiet': True, 'no_warnings': True}

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)

        title = info.get('title', 'Video')

        # 优先手动字幕，其次自动字幕
        sub_url = None
        for source in [info.get('subtitles', {}), info.get('automatic_captions', {})]:
            for lang in [lang_code, 'en', 'en-US', 'en-orig']:
                if lang in source:
                    for fmt in source[lang]:
                        if fmt.get('ext') in ('vtt', 'json3', 'srv3'):
                            sub_url = fmt['url']
                            break
                    if sub_url:
                        break
            if sub_url:
                break

        if not sub_url:
            return None, None, "No subtitles found for this language."

        # 直接 HTTP 下载字幕，不走 yt_dlp 下载机制（无磁盘 IO，无 FFmpeg）
        proxies = {'http': proxy, 'https': proxy} if proxy else None
        resp = requests.get(sub_url, timeout=30, proxies=proxies)
        resp.raise_for_status()
        transcript = parse_srt_to_text(resp.text)

        # 写入缓存
        _subtitle_cache[cache_key] = (now, transcript, title)
        return transcript, title, None

    except Exception as e:
        return None, None, str(e)


def get_subtitle_content_fast(video_url, lang_code='en', output_format='srt'):
    """
    快速字幕下载（带格式）：直接 HTTP 拿原始 VTT，纯内存转换，无 FFmpeg 无磁盘IO。
    返回 (content, filename, error)
    """
    proxy = get_proxy_url()
    ydl_opts = {'proxy': proxy, 'skip_download': True, 'quiet': True, 'no_warnings': True}

    try:
        info, cache_err = _get_video_info_cached(video_url)
        if not info:
            # 缓存未命中，直接获取
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(video_url, download=False)

        title = info.get('title', 'subtitle')

        # 找字幕 URL
        sub_url = None
        for source in [info.get('subtitles', {}), info.get('automatic_captions', {})]:
            for lang in [lang_code, 'en', 'en-US', 'en-orig']:
                if lang in source:
                    for fmt in source[lang]:
                        if fmt.get('ext') in ('vtt', 'json3', 'srv3'):
                            sub_url = fmt['url']
                            break
                    if sub_url:
                        break
            if sub_url:
                break

        if not sub_url:
            return None, None, "No subtitles found"

        # 直接 HTTP 下载原始字幕（带 UA + 重试）
        proxies = {'http': proxy, 'https': proxy} if proxy else None
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        raw_content = None
        for attempt in range(3):
            try:
                resp = requests.get(sub_url, timeout=30, proxies=proxies, headers=headers)
                resp.raise_for_status()
                raw_content = resp.text
                break
            except Exception:
                if attempt == 2:
                    raise
                proxies = {'http': get_proxy_url(), 'https': get_proxy_url()} if proxy else None
        if not raw_content:
            return None, None, "Failed to download subtitle content"

        # 内存中格式转换
        if output_format == 'txt':
            content = parse_srt_to_text(raw_content)
        elif output_format == 'srt':
            content = _vtt_to_srt(raw_content)
        else:
            content = raw_content  # vtt 原样返回

        safe_filename = f"{sanitize_filename(title)}.{output_format}"
        return content, safe_filename, None

    except Exception as e:
        return None, None, str(e)


def _vtt_to_srt(vtt_content):
    """VTT → SRT 纯内存转换，无需 FFmpeg"""
    lines = vtt_content.strip().split('\n')
    srt_lines = []
    counter = 1
    i = 0

    # 跳过 VTT 头部
    while i < len(lines):
        if '-->' in lines[i]:
            break
        i += 1

    while i < len(lines):
        line = lines[i].strip()
        if '-->' in line:
            # 转换时间格式: 00:00:01.000 → 00:00:01,000
            timestamp = line.replace('.', ',')
            srt_lines.append(str(counter))
            srt_lines.append(timestamp)
            counter += 1
            i += 1
            # 收集文本行
            while i < len(lines) and lines[i].strip():
                text = re.sub(r'<[^>]+>', '', lines[i].strip())
                if text:
                    srt_lines.append(text)
                i += 1
            srt_lines.append('')
        else:
            i += 1

    return '\n'.join(srt_lines)


def get_subtitle_content(video_url, lang_code, output_format='srt'):
    proxy = get_proxy_url()
    unique_id = str(uuid.uuid4())
    output_path_base = os.path.join(SUBTITLE_TEMP_FOLDER, unique_id)
    
    target_dl_fmt = 'srt' if output_format == 'srt' else 'vtt'

    ydl_opts = {
        'proxy': proxy,
        'skip_download': True,
        'writesubtitles': True,
        'writeautomaticsub': True, 
        'subtitleslangs': [lang_code], 
        'outtmpl': output_path_base,
        'quiet': True,
        'no_warnings': True,
        'postprocessors': [{'key': 'FFmpegSubtitlesConvertor', 'format': target_dl_fmt}],
    }

    generated_file = None
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=True)
            title = info.get('title', 'subtitle')

        for f in os.listdir(SUBTITLE_TEMP_FOLDER):
            if f.startswith(unique_id):
                generated_file = os.path.join(SUBTITLE_TEMP_FOLDER, f)
                break
        
        if not generated_file:
            return None, None, "No subtitles found for this language."

        with open(generated_file, 'r', encoding='utf-8') as f: 
            content = f.read()

        final_ext = output_format
        if output_format == 'txt':
            content = parse_srt_to_text(content)
        
        safe_filename = f"{sanitize_filename(title)}.{final_ext}"
        return content, safe_filename, None

    except Exception as e:
        return None, None, str(e)
    finally:
        if generated_file and os.path.exists(generated_file):
            try: os.remove(generated_file)
            except: pass

# ==============================================================================
# 2. 核心解析接口
# ==============================================================================
@app.route('/api/get-parse', methods=['POST', 'OPTIONS'])
def get_parse_video():
    # 处理 CORS 预检请求
    if request.method == 'OPTIONS':
        return '', 204

    data = request.get_json()
    video_url = data.get('url')
    
    if not video_url:
        return jsonify({"error": "No URL provided"}), 400

    print(f"🚀 收到解析请求: {video_url}")

    # 获取动态代理
    proxy = get_proxy_url()
    
    # yt-dlp 配置优化
    ydl_opts = {
        'proxy': proxy,
        # 强制选择包含音视频的单文件格式 (itag 22=720p, 18=360p)
        'format': '22/18/best[ext=mp4][vcodec^=avc1]/best',
        'quiet': True,
        'no_warnings': True,
        # 必须与 Cloudflare Worker 中的 User-Agent 保持高度一致，防止 403
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'nocheckcertificate': True,
        # 关键：由于使用代理，我们需要这些参数模拟真实移动/网页客户端
        'extractor_args': {
            'youtube': {
                'player_client': ['android', 'web'],
                'skip': ['hls', 'dash'] # 跳过切片流，强制找单文件
            }
        }
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # 提取信息不下载
            info = ydl.extract_info(video_url, download=False)
            languages = [] 
            # 获取人工生成字幕
            subs = info.get('subtitles', {})
            for code, items in subs.items():
                languages.append({
                    "code": code,
                    "label": f"{items[0].get('name', code)} (Original)",
                    "is_auto": False
                })
           
           
            # 获取自动生成字幕
            auto_subs = info.get('automatic_captions', {})
            for code, items in auto_subs.items():
                # 过滤掉已经存在的人工字幕代码
                if not any(l['code'] == code for l in languages):
                    languages.append({
                        "code": code,
                        "label": f"{items[0].get('name', code)} (Auto-generated)",
                        "is_auto": True
                    })

            # 返回给前端的结果
            result = {
                "title": info.get('title'),
                "url": info.get('url'),  # 这里的 URL 将交给 Worker 转发
                "thumbnail": info.get('thumbnail'),
                "ext": info.get('ext') or 'mp4',
                "languages": languages,
                "size": info.get('filesize') or info.get('filesize_approx'),
                "proxy_used": True if proxy else False
            }
            
            print(f"✅ 解析成功: {info.get('title')[:30]}...")
            return jsonify(result)

    except Exception as e:
        error_msg = str(e)
        print(f"❌ 解析出错: {error_msg}")
        
        # 针对常见错误的友好提示
        if "bot" in error_msg.lower():
            return jsonify({"error": "Please try again later."}), 500
        return jsonify({"error": error_msg}), 500



# ==============================================================================
# 3. 批量解析接口 (支持最多 3 个视频)
# ==============================================================================
@app.route('/api/get-parse-batch', methods=['POST', 'OPTIONS'])
def get_parse_batch():
    if request.method == 'OPTIONS':
        return '', 204

    data = request.get_json()
    urls = data.get('urls', [])
    
    if not urls or not isinstance(urls, list):
        return jsonify({"error": "请提供有效的 URL 列表"}), 400

    # 限制最大批量数为 3，防止被 YouTube 封锁 IP
    urls = urls[:3]
    print(f"🚀 收到批量解析请求: {len(urls)} 个视频")

    proxy = get_proxy_url()
    
    # 统一定义解析单个视频的函数
    def parse_single(url):
        ydl_opts = {
            'proxy': proxy,
            'format': '22/18/best[ext=mp4][vcodec^=avc1]/best',
            'quiet': True,
            'no_warnings': True,
            'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'nocheckcertificate': True,
            'extractor_args': {
                'youtube': {
                    'player_client': ['android', 'web'],
                    'skip': ['hls', 'dash']
                }
            }
        }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                return {
                    "title": info.get('title'),
                    "url": info.get('url'), # 视频直链
                    "thumbnail": info.get('thumbnail'),
                    "status": "success"
                }
        except Exception as e:
            return {"url": url, "status": "failed", "error": str(e)}

    # 使用线程池并发解析，提高速度
    results = []
    with ThreadPoolExecutor(max_workers=3) as executor:
        results = list(executor.map(parse_single, urls))

    return jsonify({"results": results})


# ==============================================================================
# 4. 后台任务线程
# ==============================================================================

# 旧版视频批量下载线程 (保持原样)
def batch_video_worker(task_id, video_list):
    task_dir = os.path.join(BATCH_TEMP_FOLDER, task_id)
    os.makedirs(task_dir, exist_ok=True)
    total = len(video_list)
    success_files = []
    
    for index, item in enumerate(video_list):
        url = item.get('url')
        quality = item.get('quality', 'best')
        
        tasks[task_id]['progress'] = f"{index}/{total}"
        tasks[task_id]['status'] = "processing"
        
        filepath, filename, err = run_download_video_core(url, quality, task_dir)
        if filepath and not err: success_files.append(filepath)
        time.sleep(1)
            
    if success_files:
        tasks[task_id]['status'] = "completed"
        tasks[task_id]['progress'] = f"{total}/{total}"
        zip_name = f"Video_Batch_{task_id[:8]}.zip"
        zip_path = os.path.join(DOWNLOAD_FOLDER, zip_name)
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            for file in success_files: zf.write(file, arcname=os.path.basename(file))
        tasks[task_id]['zip_path'] = zip_path
        tasks[task_id]['zip_name'] = zip_name
    else:
        tasks[task_id]['status'] = "failed"
    shutil.rmtree(task_dir, ignore_errors=True)

# 新版字幕批量下载线程 (适配 main.js)
def batch_subtitle_worker(task_id, videos, lang, fmt):
    task_dir = os.path.join(BATCH_TEMP_FOLDER, task_id)
    os.makedirs(task_dir, exist_ok=True)
    total = len(videos)
    success_files = []
    completed = [0]  # 用列表以便在闭包中修改
    lock = threading.Lock()

    errors = []

    def download_one(video):
        url = video.get('url')
        # 快速路径：直接 HTTP 拿字幕
        content, filename, err = get_subtitle_content_fast(url, lang, fmt)

        # 快速路径失败 → 回退到原始方式（FFmpeg + 磁盘IO）
        if not content or err:
            print(f"⚠️ Fast path failed for {url}: {err}, trying fallback...")
            try:
                content, filename, err = get_subtitle_content(url, lang, fmt)
            except Exception as e:
                err = str(e)

        if content and not err:
            with lock:
                file_path = os.path.join(task_dir, filename)
                counter = 1
                while os.path.exists(file_path):
                    name, ext = os.path.splitext(filename)
                    file_path = os.path.join(task_dir, f"{name}_{counter}{ext}")
                    counter += 1
                try:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    success_files.append(file_path)
                except Exception as e:
                    print(f"❌ File write failed for {url}: {e}")
        else:
            print(f"❌ Both paths failed for {url}: {err}")
            with lock:
                errors.append(f"{url}: {err}")

        with lock:
            completed[0] += 1
            tasks[task_id]['progress'] = f"{completed[0]}/{total}"

    # 并发下载，max_workers=3 避免代理被限制
    with ThreadPoolExecutor(max_workers=3) as executor:
        executor.map(download_one, videos)

    if success_files:
        zip_name = f"Subtitles_Batch_{task_id[:8]}.zip"
        zip_path = os.path.join(DOWNLOAD_FOLDER, zip_name)
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            for fp in success_files:
                zf.write(fp, arcname=os.path.basename(fp))

        tasks[task_id]['zip_path'] = zip_path
        tasks[task_id]['zip_name'] = zip_name
        tasks[task_id]['status'] = "completed"
    else:
        first_errors = errors[:3]
        tasks[task_id]['status'] = "failed"
        tasks[task_id]['error'] = f"All {total} downloads failed. Samples: {'; '.join(first_errors)}" if first_errors else "All downloads failed (no details)"
        print(f"❌ Batch task {task_id} failed: {tasks[task_id]['error']}")

    shutil.rmtree(task_dir, ignore_errors=True)


# ==============================================================================
# 4. Playlist/Channel 解析接口 (新增)
# ==============================================================================

def extract_playlist_videos(playlist_url, max_videos=50):
    """从playlist URL提取所有视频URL - 优化版本，支持大列表分级处理"""
    proxy = get_proxy_url()
    ydl_opts = {
        'proxy': proxy,
        'quiet': True,
        'no_warnings': True,
        'extract_flat': True,  # 轻量化展开，只获取基本信息
        'extractor_args': {'youtube': {'player_client': ['android', 'web']}},
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'nocheckcertificate': True,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(playlist_url, download=False)
            
            if not info:
                return [], "Failed to extract playlist information"
            
            # 检查是否有entries
            if 'entries' not in info or not info['entries']:
                return [], "No videos found in playlist or channel"
            
            videos = []
            processed_count = 0
            
            # 获取playlist/channel的基本信息
            playlist_title = info.get('title', 'Unknown Playlist')
            playlist_uploader = info.get('uploader', 'Unknown')
            total_entries = len([e for e in info['entries'] if e])  # 过滤None条目
            
            print(f"📋 Processing playlist: {playlist_title} ({total_entries} total videos)")
            
            for entry in info['entries']:
                if processed_count >= max_videos:
                    print(f"⚠️ Reached max limit ({max_videos}), stopping extraction")
                    break
                    
                # 跳过无效条目
                if not entry or not entry.get('id'):
                    continue
                
                try:
                    video_url = f"https://www.youtube.com/watch?v={entry['id']}"
                    video_data = {
                        'url': video_url,
                        'title': sanitize_filename(entry.get('title', 'Unknown')),
                        'id': entry['id'],
                        'duration': entry.get('duration', 0),
                        'uploader': entry.get('uploader', playlist_uploader),
                        'playlist_title': playlist_title,  # 新增：记录来源playlist
                        'playlist_index': entry.get('playlist_index', processed_count + 1)  # 新增：记录在playlist中的位置
                    }
                    videos.append(video_data)
                    processed_count += 1
                except Exception as e:
                    print(f"⚠️ 跳过无效视频条目: {e}")
                    continue
            
            print(f"✅ Successfully extracted {len(videos)} videos from playlist")
            return videos, None
            
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Playlist解析出错: {error_msg}")
        return [], error_msg

def deduplicate_videos(all_videos):
    """去重逻辑：根据video_id去除重复视频"""
    seen_ids = set()
    unique_videos = []
    duplicates_count = 0
    
    for video in all_videos:
        video_id = video.get('id')
        if video_id and video_id not in seen_ids:
            seen_ids.add(video_id)
            unique_videos.append(video)
        else:
            duplicates_count += 1
    
    if duplicates_count > 0:
        print(f"🔄 Removed {duplicates_count} duplicate videos")
    
    return unique_videos

@app.route('/api/parse-playlist', methods=['POST', 'OPTIONS'])
def parse_playlist():
    """解析playlist或channel，返回视频列表"""
    if request.method == 'OPTIONS':
        return '', 204
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
        
    url = data.get('url')
    max_videos = data.get('max_videos', 50)  # 默认最多50个
    
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    
    # 限制最大视频数量，防止滥用
    max_videos = min(max_videos, 100)  # 硬限制100个
    
    print(f"🎵 收到playlist解析请求: {url[:100]}...")
    
    # 检查是否是playlist或channel URL
    playlist_patterns = [
        'playlist?list=',
        '/channel/',
        '/@',
        '/c/',
        '/user/'
    ]
    
    if not any(pattern in url for pattern in playlist_patterns):
        return jsonify({"error": "Not a valid playlist or channel URL"}), 400
    
    videos, error = extract_playlist_videos(url, max_videos)
    
    if error:
        return jsonify({"error": error}), 500
    
    if not videos:
        return jsonify({"error": "No videos found in playlist/channel"}), 404
    
    # 确定类型
    url_type = "playlist" if "playlist?list=" in url else "channel"
    
    return jsonify({
        "type": url_type,
        "total_videos": len(videos),
        "videos": videos,
        "source_url": url,
        "max_requested": max_videos
    })

@app.route('/api/parse-mixed', methods=['POST', 'OPTIONS'])
def parse_mixed_urls():
    """智能解析混合URL：自动识别单个视频、playlist、channel，支持去重和分级处理"""
    # 处理 CORS 预检请求
    if request.method == 'OPTIONS':
        return '', 204
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
        
    urls = data.get('urls', [])
    
    if not urls or not isinstance(urls, list):
        return jsonify({"error": "No URLs provided or invalid format"}), 400
    
    # 限制URL数量，防止滥用
    urls = urls[:10]  # 最多10个URL
    
    print(f"🚀 收到混合URL解析请求: {len(urls)} 个URL")
    
    results = []
    all_videos = []  # 用于最终去重
    playlist_info = []
    
    for url in urls:
        if not url or not isinstance(url, str):
            results.append({"url": url, "type": "error", "error": "Invalid URL format"})
            continue
            
        try:
            # 检查URL类型
            playlist_patterns = [
                'playlist?list=',
                '/channel/',
                '/@',
                '/c/',
                '/user/'
            ]
            
            if any(pattern in url for pattern in playlist_patterns):
                # Playlist/Channel处理 - 使用分级处理
                max_per_playlist = 100  # 每个playlist最多100个视频
                videos, error = extract_playlist_videos(url, max_per_playlist)
                
                if error:
                    results.append({"url": url, "type": "error", "error": error})
                else:
                    # 收集playlist信息
                    playlist_info.append({
                        "url": url,
                        "title": videos[0].get('playlist_title', 'Unknown Playlist') if videos else 'Empty Playlist',
                        "count": len(videos)
                    })
                    
                    # 添加到总视频列表
                    all_videos.extend(videos)
                    
                    results.append({
                        "url": url, 
                        "type": "playlist", 
                        "videos": videos,
                        "count": len(videos),
                        "playlist_title": videos[0].get('playlist_title', 'Unknown') if videos else 'Unknown'
                    })
            else:
                # 单个视频处理 - 复用现有函数
                video_info, error = get_video_info_core(url)
                if error:
                    results.append({"url": url, "type": "error", "error": error})
                else:
                    # 转换为统一格式并添加到总列表
                    video_id = None
                    if 'watch?v=' in url:
                        import re
                        match = re.search(r'[?&]v=([^&#]+)', url)
                        video_id = match.group(1) if match else url[-11:]
                    else:
                        video_id = url[-11:]
                    
                    video_data = {
                        'url': url,
                        'title': video_info.get('title', 'Unknown'),
                        'id': video_id,
                        'duration': video_info.get('duration', 0),
                        'uploader': video_info.get('uploader', 'Unknown')
                    }
                    all_videos.append(video_data)
                    
                    results.append({
                        "url": url,
                        "type": "video",
                        "video_info": video_info
                    })
                    
        except Exception as e:
            error_msg = str(e)
            print(f"❌ 处理URL出错 {url}: {error_msg}")
            results.append({"url": url, "type": "error", "error": error_msg})
    
    # 执行去重逻辑
    unique_videos = deduplicate_videos(all_videos)
    total_unique = len(unique_videos)
    total_original = len(all_videos)
    duplicates_removed = total_original - total_unique
    
    return jsonify({
        "results": results,
        "summary": {
            "total_videos": total_unique,
            "original_count": total_original,
            "duplicates_removed": duplicates_removed,
            "playlists_processed": len(playlist_info),
            "playlist_info": playlist_info
        },
        "unique_videos": unique_videos  # 去重后的完整视频列表
    })

# ==============================================================================
# 5. 音频直链解析接口 (伪装模式：强制使用 format 18)
# ==============================================================================
@app.route('/api/get-audio-parse', methods=['POST', 'OPTIONS'])
def get_audio_parse():
    if request.method == 'OPTIONS':
        return '', 204

    data = request.get_json()
    video_url = data.get('url')
    
    if not video_url:
        return jsonify({"error": "No URL provided"}), 400

    print(f"🎵 收到音频解析请求 (强制 F18 模式): {video_url}")
    proxy = get_proxy_url()
    
    ydl_opts = {
        'proxy': proxy,
        'quiet': True,
        'no_warnings': True, 
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'nocheckcertificate': True,
        'extractor_args': {
            'youtube': {
                'player_client': ['android', 'web'],
            }
        },
        'skip_download': True,

    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            
            # --- 核心过滤逻辑开始 ---
            all_formats = info.get('formats', [])
            
            # 仅保留 format_id 为 "18" 的项
            f18_list = [f for f in all_formats if f.get('format_id') == '18']
            
            # 确定最终使用的直链地址
            # 如果找到了 format 18，就用 18；否则用 info 默认返回的
            final_url = info.get('url')
            final_filesize = info.get('filesize') or info.get('filesize_approx')

            if f18_list:
                f18 = f18_list[0]
                final_url = f18.get('url')
                final_filesize = f18.get('filesize') or f18.get('filesize_approx')
            # --- 核心过滤逻辑结束 ---

            # 清理标题
            raw_title = info.get('title', 'audio')
            safe_title = re.sub(r'[\\/*?:"<>|]', "_", raw_title).rstrip()

            result = {
                "title": safe_title,
                "url": final_url,           # 优先级最高的 format 18 直链
                "thumbnail": info.get('thumbnail'),
                "duration": info.get('duration'),
                "ext": "m4a",               # 强制后缀为 m4a 实现伪装
                "filesize": final_filesize, # 对应 format 18 的大小
                "ua": ydl_opts['user_agent'],
                "formats": f18_list         # 只包含 format 18 的数组
            }
            
            print(f"✅ 解析成功 (已过滤为 F18): {safe_title[:30]}...")
            return jsonify(result)

    except Exception as e:
        print(f"❌ 解析出错: {str(e)}")
        return jsonify({"error": str(e)}), 500



















def format_time(seconds):
    """ 将秒数转换为 MM:SS 格式 """
    m, s = divmod(int(seconds), 60)
    return f"{m:02d}:{s:02d}"

def clean_subtitle_text(text):
    """ 清洗字幕文本：去除 HTML 标签、多余空格和 YouTube VTT 的重复标记 """
    # 去除 <c>...</c> 标签
    text = re.sub(r'<[^>]+>', '', text)

    text = text.replace('&nbsp;', ' ').replace('&gt;', '>').replace('&lt;', '<')
    # 去除重复的换行和多余空格
    text = text.replace('\n', ' ').strip()
    return text

def parse_vtt_to_segments(vtt_content):
    """ 
    解析 VTT 格式并深度去重 (解决 YouTube 自动字幕滚动重复问题)
    """
    raw_segments = []
    # 匹配时间轴
    pattern = re.compile(r'(\d{2}:\d{2}:\d{2}.\d{3}) --> (\d{2}:\d{2}:\d{2}.\d{3})')
    
    lines = vtt_content.splitlines()
    
    # 第一步：初步提取所有有效的时间轴和文本
    for i in range(len(lines)):
        match = pattern.search(lines[i])
        if match:
            start_time_str = match.group(1)
            h, m, s = start_time_str.split(':')
            total_seconds = int(h)*3600 + int(m)*60 + float(s)
            
            # 提取紧随时间轴后的文本行
            current_text = ""
            j = i + 1
            while j < len(lines) and not pattern.search(lines[j]) and lines[j].strip() != "":
                current_text += lines[j] + " "
                j += 1
            
            clean_txt = clean_subtitle_text(current_text)
            if clean_txt:
                raw_segments.append({
                    "t_val": total_seconds, # 用于排序和比较
                    "t_str": format_time(total_seconds),
                    "txt": clean_txt
                })

    # 第二步：深度去重核心逻辑
    # 针对 YouTube 滚动字幕：如果下一行包含当前行，则丢弃当前行
    filtered_segments = []
    for i in range(len(raw_segments)):
        current = raw_segments[i]
        
        # 如果不是最后一行，检查下一行
        if i < len(raw_segments) - 1:
            next_seg = raw_segments[i + 1]
            # 1. 如果下一行是以当前行开头的 (滚动累加)
            # 2. 或者下一行完全等于当前行 (冗余)
            if next_seg['txt'].startswith(current['txt']) or next_seg['txt'] == current['txt']:
                continue 
        
        # 补充：如果当前行包含上一行 (针对某些 VTT 乱序情况)
        if filtered_segments and current['txt'].startswith(filtered_segments[-1]['txt']):
            filtered_segments[-1] = {
                "t": current['t_str'],
                "txt": current['txt']
            }
        else:
            filtered_segments.append({
                "t": current['t_str'],
                "txt": current['txt']
            })
                
    return filtered_segments
# ==============================================================================
# 6. 字幕核心接口 (新增)
# ==============================================================================

@app.route('/api/transcript/info', methods=['POST'])
def get_transcript_info():
    """ 1. 获取字幕元数据：语言列表 """
    data = request.get_json()
    video_url = data.get('url')
    if not video_url:
        return jsonify({"error": "No URL provided"}), 400

    proxy = get_proxy_url()
    ydl_opts = {
        'proxy': proxy,
        'skip_download': True,
        'quiet': True
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            
            languages = []
            # 获取人工上传字幕
            subs = info.get('subtitles', {})
            for code, items in subs.items():
                languages.append({
                    "code": code,
                    "label": f"{items[0].get('name', code)} (Original)",
                    "is_auto": False
                })
            
            # 获取自动生成字幕
            auto_subs = info.get('automatic_captions', {})
            for code, items in auto_subs.items():
                # 过滤掉已经存在的人工字幕代码
                if not any(l['code'] == code for l in languages):
                    languages.append({
                        "code": code,
                        "label": f"{items[0].get('name', code)} (Auto-generated)",
                        "is_auto": True
                    })

            return jsonify({
                "id": info.get('id'),
                "title": info.get('title'),
                "thumbnail": info.get('thumbnail'),
                "languages": languages,
                "default_lang": "en" if any(l['code'] == 'en' for l in languages) else (languages[0]['code'] if languages else "")
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/transcript/content', methods=['POST'])
def get_transcript_content():
    """ 2. 获取清洗后的字幕内容 """
    data = request.get_json()
    video_url = data.get('url')
    lang = data.get('lang', 'en')
    
    if not video_url:
        return jsonify({"error": "No URL provided"}), 400

    proxy = get_proxy_url()
    # 唯一标识符用于临时文件名
    uid = str(uuid.uuid4())
    temp_out = f"temp_sub_{uid}"
    
    ydl_opts = {
        'proxy': proxy,
        'skip_download': True,
        'writesubtitles': True,
        'writeautomaticsub': True,
        'subtitleslangs': [lang],
        'outtmpl': temp_out,
        'quiet': True,
        'postprocessors': [{ 'key': 'FFmpegSubtitlesConvertor', 'format': 'vtt' }]
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])
            
        # 寻找生成的文件
        expected_file = f"{temp_out}.{lang}.vtt"
        if not os.path.exists(expected_file):
            # 兼容性处理：有些视频可能不带语言后缀
            expected_file = f"{temp_out}.vtt"

        if os.path.exists(expected_file):
            with open(expected_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            segments = parse_vtt_to_segments(content)
            full_text = " ".join([s['txt'] for s in segments])
            
            # 清理临时文件
            os.remove(expected_file)
            
            return jsonify({
                "format": "json",
                "segments": segments,
                "full_text": full_text
            })
        else:
            return jsonify({"error": "Subtitle file not generated"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.route('/api/transcript/download', methods=['GET'])
def download_transcript():
    """ 3. 字幕文件下载接口 (修复版) """
    video_url = request.args.get('url')
    lang = request.args.get('lang', 'en')
    dl_type = request.args.get('type', 'srt') # srt 或 txt
    
    if not video_url:
        return "Missing URL", 400

    proxy = get_proxy_url()
    uid = str(uuid.uuid4())
    # 临时文件基础名
    temp_out_base = f"dl_sub_{uid}"
    
    # 策略：始终下载 vtt 格式，因为 content 接口证明了 vtt 下载是稳定的
    ydl_opts = {
        'proxy': proxy,
        'skip_download': True,
        'writesubtitles': True,
        'writeautomaticsub': True,
        'subtitleslangs': [lang],
        'outtmpl': temp_out_base, # 默认会自动加上 .lang.vtt
        'quiet': True,
        'postprocessors': [{ 'key': 'FFmpegSubtitlesConvertor', 'format': 'vtt' }]
    }

    actual_vtt_file = None
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=True)
            title = info.get('title', 'transcript')
            # 清理文件名非法字符
            safe_title = re.sub(r'[\\/*?:"<>|]', "_", title).rstrip()

        # 查找生成的文件 (由于 yt-dlp 命名规则多变，采用前缀扫描法)
        for f in os.listdir('.'):
            if f.startswith(temp_out_base) and f.endswith('.vtt'):
                actual_vtt_file = f
                break

        if not actual_vtt_file or not os.path.exists(actual_vtt_file):
            return "Error: Subtitle file failed to generate.", 404

        # 读取下载好的 VTT 内容
        with open(actual_vtt_file, 'r', encoding='utf-8') as f:
            vtt_content = f.read()
        
        # 使用你原本成功的解析逻辑
        segments = parse_vtt_to_segments(vtt_content)
        
        if not segments:
            return "Error: Subtitle content is empty.", 404

        if dl_type == 'txt':
            # 转换为 TXT 格式内容
            output_data = "\n".join([f"[{s['t']}] {s['txt']}" for s in segments])
            download_name = f"{safe_title}.txt"
            mimetype = 'text/plain'
        else:
            # 转换为 SRT 格式内容 (手动拼接，不依赖 FFmpeg)
            srt_lines = []
            for i, s in enumerate(segments):
                # 将 MM:SS 转换为 SRT 标准的 00:MM:SS,000 格式
                # 注意：这里简单填充了小时和毫秒以保证播放器兼容性
                timestamp = f"00:{s['t']},000"
                srt_lines.append(f"{i+1}")
                # 结束时间简单设为起始时间（大部分播放器会自动处理），或根据下一条处理
                srt_lines.append(f"{timestamp} --> {timestamp}")
                srt_lines.append(s['txt'])
                srt_lines.append("") # 空行分隔
            output_data = "\n".join(srt_lines)
            download_name = f"{safe_title}.srt"
            mimetype = 'application/x-subrip'

        # 将内容放入内存流发送给用户
        mem_file = io.BytesIO(output_data.encode('utf-8'))
        
        return send_file(
            mem_file, 
            mimetype=mimetype, 
            as_attachment=True, 
            download_name=download_name
        )

    except Exception as e:
        print(f"Download error: {str(e)}")
        return f"Download failed: {str(e)}", 500
    finally:
        # 无论成功失败，尝试清理磁盘上的临时 vtt 文件
        if actual_vtt_file and os.path.exists(actual_vtt_file):
            try:
                os.remove(actual_vtt_file)
            except:
                pass





















# ==============================================================================
# 7. 兼容性与 AI 接口 (从 app.py 合并)
# ==============================================================================

@app.route('/', methods=['GET'])
def index():
    return "<h3>YouTube API Running (Full Support)</h3>"







@app.route('/api/download', methods=['GET', 'POST'])
def api_download_merged():
    """
    GET: 旧版视频下载
    POST: 新版字幕单条下载 (main.js: downloadFile)
    """
    if request.method == 'GET':
        url = request.args.get('url')
        quality = request.args.get('quality', 'best')
        if not url: return jsonify({"code": 1, "message": "Missing url"}), 400
        
        filepath, filename, error = run_download_video_core(url, quality, DOWNLOAD_FOLDER)
        if error: return jsonify({"code": 1, "message": error}), 500
        
        @after_this_request
        def remove_file(response):
            try: os.remove(filepath)
            except: pass
            return response
        return send_file(filepath, as_attachment=True, download_name=filename)

    elif request.method == 'POST':
        data = request.get_json() or {}
        url = data.get('url')
        lang = data.get('lang', 'en')
        fmt = data.get('format', 'srt')
        title_hint = data.get('title', 'subtitle')
        if not url: return jsonify({"status": 1, "message": "Missing URL"}), 400
        content, filename, err = get_subtitle_content(url, lang, fmt)
        if err: return jsonify({"status": 1, "message": err}), 500
        if not filename: filename = f"{sanitize_filename(title_hint)}.{fmt}"
        mem_file = io.BytesIO()
        mem_file.write(content.encode('utf-8'))
        mem_file.seek(0)
        return send_file(mem_file, as_attachment=True, download_name=filename, mimetype='text/plain')

@app.route('/api/batch_check', methods=['POST'])
def api_batch_check():
    data = request.get_json() or {}
    urls = data.get('urls', [])
    if not urls: return jsonify({"status": "failed", "message": "No URLs provided"}), 400
    with ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(check_video_for_batch, urls))
    return jsonify({"status": "completed", "results": results})

@app.route('/api/batch_submit', methods=['POST'])
def api_batch_submit():
    data = request.get_json() or {}
    videos = data.get('videos', [])
    lang = data.get('lang', 'en')
    fmt = data.get('format', 'srt')
    if not videos: return jsonify({"status": "failed", "message": "No videos"}), 400
    task_id = str(uuid.uuid4())
    tasks[task_id] = {"status": "pending", "progress": f"0/{len(videos)}", "total": len(videos), "type": "subtitle"}
    threading.Thread(target=batch_subtitle_worker, args=(task_id, videos, lang, fmt), daemon=True).start()
    return jsonify({"status": "pending", "task_id": task_id})

@app.route('/api/batch-download', methods=['POST'])
def api_batch_download_legacy():
    task_id = str(uuid.uuid4())
    videos = request.get_json().get('videos', [])
    tasks[task_id] = {"status": "pending", "progress": f"0/{len(videos)}", "type": "video"}
    threading.Thread(target=batch_video_worker, args=(task_id, videos), daemon=True).start()
    return jsonify({"code": 0, "task_id": task_id})

@app.route('/api/task_status', methods=['GET'])
def api_task_status_merged():
    task_id = request.args.get('task_id')
    task = tasks.get(task_id)
    if not task: return jsonify({"status": "not_found", "code": 1}), 404
    return jsonify({"code": 0, "status": task['status'], "progress": task['progress'], "data": task})

@app.route('/api/download_zip', methods=['GET', 'POST'])
def api_download_zip_merged():
    if request.method == 'POST':
        task_id = request.get_json().get('task_id')
    else:
        task_id = request.args.get('task_id')
    task = tasks.get(task_id)
    if not task or task.get('status') != 'completed':
        return jsonify({"status": 1, "message": "Task not ready or not found"}), 400
    zip_path = task.get('zip_path')
    zip_name = task.get('zip_name')
    if not zip_path or not os.path.exists(zip_path):
        return jsonify({"status": 1, "message": "File missing"}), 500
    @after_this_request
    def remove_file(response):
        try: os.remove(zip_path)
        except: pass
        return response
    return send_file(zip_path, as_attachment=True, download_name=zip_name)

@app.route('/api/subtitle', methods=['GET'])
def api_subtitle_legacy():
    url = request.args.get('url')
    lang = request.args.get('lang')
    content, filename, error = get_subtitle_content(url, lang, 'srt')
    if error: return jsonify({"code": 1, "message": error}), 500
    return send_file(io.BytesIO(content.encode('utf-8')), as_attachment=True, download_name=filename)

@app.route('/api/video_info', methods=['POST'])
def api_video_info():
    """快速获取视频基本信息，不下载字幕"""
    data = request.get_json() or {}
    video_url = data.get('url')
    if not video_url:
        return jsonify({"error": "No URL provided"}), 400
    
    proxy = get_proxy_url()
    ydl_opts = {
        'proxy': proxy,
        'quiet': True,
        'no_warnings': True,
        'skip_download': True,
        'extract_flat': False
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            
            # 检查是否有字幕
            has_subtitles = bool(info.get('subtitles') or info.get('automatic_captions'))
            
            return jsonify({
                "id": info.get('id'),
                "title": info.get('title', 'Unknown Title'),
                "uploader": info.get('uploader', 'Unknown'),
                "duration": info.get('duration', 0),
                "thumbnail": info.get('thumbnail'),
                "view_count": info.get('view_count'),
                "upload_date": info.get('upload_date'),
                "has_subtitles": has_subtitles,
                "description": info.get('description', '')[:500] + '...' if info.get('description') else ''
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate_summary_stream', methods=['POST'])
def api_generate_summary_stream():
    data = request.get_json() or {}
    video_url = data.get('url')
    if not video_url:
        return jsonify({"status": "failed", "message": "Missing URL"}), 400

    print(f"🚀 [AI Summary] Request received for: {video_url}")

    # 检查缓存
    if video_url in _summary_cache:
        ts, cached_summary = _summary_cache[video_url]
        if time.time() - ts < _SUMMARY_CACHE_TTL:
            print(f"✅ [AI Summary] Cache hit, returning instantly")
            def return_cached():
                yield cached_summary
            res = Response(stream_with_context(return_cached()), mimetype='text/event-stream')
            res.headers['X-Accel-Buffering'] = 'no'
            res.headers['Cache-Control'] = 'no-cache'
            res.headers['Connection'] = 'keep-alive'
            return res

    def generate():
        # 1. 立即告知前端正在工作
        yield "__STATUS__:Analyzing video structure...\n"
        start_time = time.time()

        try:
            # 2. 在流内部获取字幕 (耗时操作)
            yield "__STATUS__:Extracting subtitles (this may take a few seconds)...\n"
            
            # 获取字幕内容
            transcript, title_info, err = get_subtitle_fast(video_url, 'en')
            
            if err:
                print(f"⚠️ [AI Summary] Subtitle fetch failed, trying description: {err}")
                yield "__STATUS__:Subtitles unavailable, falling back to description...\n"
                
                proxy = get_proxy_url()
                with yt_dlp.YoutubeDL({'proxy': proxy, 'skip_download': True, 'quiet': True}) as ydl:
                    info = ydl.extract_info(video_url, download=False)
                    video_title = info.get('title', 'Unknown Video')
                    video_duration = info.get('duration', 0)
                    transcript = info.get('description', '')
                    if len(transcript) < 200:
                        yield f"__ERROR__:No subtitles available and description is too short."
                        return
            else:
                video_title = title_info.rsplit('.', 1)[0] if title_info else 'Video'
                # 简单估算或默认值，避免再次请求
                video_duration = 0 

            print(f"📊 [AI Summary] Transcript ready in {time.time() - start_time:.2f}s. Length: {len(transcript)}")
            yield "__STATUS__:Generating study guide...\n"

            # 3. 准备 AI 请求
            headers = {"Content-Type": "application/json", "Authorization": f"Bearer {ARK_API_KEY}"}
            
            system_prompt = """You are a content analyst for a video platform. Help users quickly understand what a video is about and whether it's worth their time.

STEP 1 — CLASSIFY the content type (use this internally to choose structure, do not output this step):
tutorial | lecture | interview | documentary | news | other

STEP 2 — CHOOSE structure based on type:
- tutorial    → Overview, Prerequisites (if any), Key Steps, Common Mistakes, Result
- lecture     → Core Argument, Supporting Points, Evidence & Examples, Conclusions
- interview   → Guest & Context, Main Topics Discussed, Notable Quotes or Insights
- documentary/news → Background, Key Facts, Implications
- other       → 3-4 thematic sections with descriptive titles that reflect the actual content

STEP 3 — WRITE the summary:

# [Exact video title]

> [One sentence: what this video is and who should watch it]

## [Section titles based on content type — descriptive, not generic]
[2-4 sentences or 3-5 bullets per section. **Bold the single most important phrase** in each section.]

## Key Takeaways
- [3-5 specific points using actual names/numbers/examples from the video]

QUALITY RULES:
- Only use information present in the transcript — never infer or add outside context
- Specific beats generic: "reduced latency by 40ms" beats "improved performance"
- Match depth to video length: short video = concise; long video = thorough
- Forbidden phrases: "In this video", "The speaker discusses", "It's worth noting", "In conclusion"
- If transcript appears incomplete, add: *(Note: transcript may be incomplete)*"""

            user_prompt = f"""Summarize this video.

Title: {video_title}
Duration: approximately {max(1, video_duration // 60)} minutes

Transcript:
{transcript[:35000]}"""

            payload = {
                "model": ARK_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                "stream": True,
                "temperature": 0.7,
                "max_tokens": 4000
            }
            
            response = requests.post(ARK_URL, headers=headers, json=payload, stream=True, timeout=180)
            thinking_notified = False
            content_started = False
            full_summary = ""  # 收集完整内容用于缓存
            for line in response.iter_lines():
                if line:
                    chunk = line.decode('utf-8').strip()
                    if chunk.startswith("data: "):
                        data_str = chunk[6:]
                        if data_str == "[DONE]":
                            break
                        try:
                            resp_json = json.loads(data_str)
                            delta = resp_json['choices'][0]['delta']
                            # thinking阶段：模型在思考，发送状态提示
                            reasoning = delta.get('reasoning_content', '')
                            if reasoning and not thinking_notified:
                                yield "__STATUS__:AI is thinking deeply...\n"
                                thinking_notified = True
                            # content阶段：实际输出内容
                            content = delta.get('content', '')
                            if content:
                                if not content_started:
                                    content_started = True
                                    print(f"📝 [AI Summary] Content streaming started")
                                full_summary += content
                                yield content
                        except:
                            continue

            # 保存到缓存
            if full_summary:
                _summary_cache[video_url] = (time.time(), full_summary)
                print(f"💾 [AI Summary] Cached for future use")

        except Exception as e:
            print(f"❌ [AI Summary] Error: {str(e)}")
            yield f"__ERROR__:Server Error: {str(e)}"

    # 使用 stream_with_context 保持上下文
    res = Response(stream_with_context(generate()), mimetype='text/event-stream')
    res.headers['X-Accel-Buffering'] = 'no'
    res.headers['Cache-Control'] = 'no-cache'
    res.headers['Connection'] = 'keep-alive'
    return res

@app.route('/api/generate_study_cards_stream', methods=['POST'])
def api_generate_study_cards_stream():
    data = request.get_json() or {}
    video_url = data.get('url')
    pre_transcript = data.get('transcript')  # 前端传来的已有内容（summary文本）
    if not video_url:
        return jsonify({"error": "Missing URL"}), 400

    # 检查缓存
    if video_url in _cards_cache:
        ts, cached_cards = _cards_cache[video_url]
        if time.time() - ts < _CARDS_CACHE_TTL:
            print(f"✅ [Study Cards] Cache hit, returning instantly")
            def return_cached():
                yield cached_cards
            res = Response(stream_with_context(return_cached()), mimetype='text/plain')
            res.headers['X-Accel-Buffering'] = 'no'
            res.headers['Cache-Control'] = 'no-cache'
            res.headers['Connection'] = 'keep-alive'
            return res

    def generate():
        # 如果前端已经传了 transcript（来自 AI Summary），直接用，跳过字幕获取
        if pre_transcript and len(pre_transcript) > 100:
            transcript = pre_transcript
            video_title = 'Video'
            # 尝试从缓存拿标题（不会触发 yt_dlp，只查缓存）
            if video_url in _info_cache:
                ts, info = _info_cache[video_url]
                if time.time() - ts < _INFO_CACHE_TTL:
                    video_title = info.get('title', 'Video')
            yield "__STATUS__:Generating study cards...\n"
        else:
            yield "__STATUS__:Fetching subtitles...\n"
            try:
                transcript, title_info, err = get_subtitle_fast(video_url, 'en')
                if err:
                    yield "__STATUS__:Subtitles unavailable, using description...\n"
                    info, _ = _get_video_info_cached(video_url)
                    if info:
                        video_title = info.get('title', 'Unknown Video')
                        transcript = info.get('description', '')
                        if len(transcript) < 200:
                            yield "__ERROR__:No subtitles available and description is too short."
                            return
                    else:
                        yield "__ERROR__:Failed to get video info."
                        return
                else:
                    video_title = title_info.rsplit('.', 1)[0] if title_info else 'Video'
                yield "__STATUS__:Generating study cards...\n"
            except Exception as e:
                yield f"__ERROR__:Server Error: {str(e)}"
                return

        try:

            headers = {"Content-Type": "application/json", "Authorization": f"Bearer {ARK_API_KEY}"}
            system_prompt = """You are a study card generator. Create high-quality flashcards from video transcripts.

Output ONLY cards in this exact format, one after another with no other text:
---
Q: [question that tests understanding]
A: [comprehensive answer, 50-150 words]
T: [timestamp MM:SS or null]
Type: concept|definition|insight|action
Category: technical|business|design|general
---

Rules:
- Generate 6-8 cards
- Questions must require understanding, not just recall
- Answers must be educational and specific
- No intro text, no summary, ONLY the card blocks"""

            user_prompt = f"""Create 6-8 study cards from this transcript.

Video: {video_title}
Transcript: {transcript[:35000]}

Output ONLY the card blocks in the specified format."""

            payload = {
                "model": ARK_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                "stream": True,
                "temperature": 0.7,
                "max_tokens": 4000
            }

            response = requests.post(ARK_URL, headers=headers, json=payload, stream=True, timeout=180)
            thinking_notified = False
            content_started = False
            full_cards = ""  # 收集完整内容用于缓存
            for line in response.iter_lines():
                if line:
                    chunk = line.decode('utf-8').strip()
                    if chunk.startswith("data: "):
                        data_str = chunk[6:]
                        if data_str == "[DONE]":
                            break
                        try:
                            resp_json = json.loads(data_str)
                            delta = resp_json['choices'][0]['delta']
                            # thinking阶段：模型在思考，发送状态提示
                            reasoning = delta.get('reasoning_content', '')
                            if reasoning and not thinking_notified:
                                yield "__STATUS__:AI is thinking deeply...\n"
                                thinking_notified = True
                            # content阶段：实际输出内容
                            content = delta.get('content', '')
                            if content:
                                if not content_started:
                                    content_started = True
                                    print(f"📝 [Study Cards] Content streaming started")
                                full_cards += content
                                yield content
                        except:
                            continue

            # 保存到缓存
            if full_cards:
                _cards_cache[video_url] = (time.time(), full_cards)
                print(f"💾 [Study Cards] Cached for future use")

        except Exception as e:
            print(f"❌ [Study Cards] Error: {str(e)}")
            yield f"__ERROR__:Server Error: {str(e)}"

    res = Response(stream_with_context(generate()), mimetype='text/plain')
    res.headers['X-Accel-Buffering'] = 'no'
    res.headers['Cache-Control'] = 'no-cache'
    res.headers['Connection'] = 'keep-alive'
    return res

@app.route('/parse', methods=['POST', 'OPTIONS'])
def parse_video_legacy():
    if request.method == 'OPTIONS': return '', 204
    video_url = request.json.get('url')
    if not video_url: return jsonify({"error": "No URL provided"}), 400
    ydl_opts = {
        'format': '22/18/best', 'quiet': False,
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'nocheckcertificate': True, 'source_address': '0.0.0.0',
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            return jsonify({"title": info.get('title'), "url": info.get('url'), "thumbnail": info.get('thumbnail'), "ext": info.get('ext') or 'mp4'})
    except Exception as e: return jsonify({"error": str(e)}), 500

# connect网站去除背景api
@app.route('/api/remove-background', methods=['POST'])
def remove_background_api():
    file = request.files.get('file')
    if not file: return jsonify({"error": "No file"}), 400
    try:
        output_data = remove(file.read())
        return send_file(io.BytesIO(output_data), mimetype='image/png', as_attachment=True, download_name='no_bg.png')
    except Exception as e: return jsonify({"error": str(e)}), 500




# ==============================================================================
# 8. 启动配置
# ==============================================================================
if __name__ == '__main__':
    # 部署到服务器必须监听 0.0.0.0，端口建议 5000
    print(f"📡 YouTube 解析服务正在运行在 0.0.0.0:5000...")
    app.run(host='0.0.0.0', port=5000, debug=False)