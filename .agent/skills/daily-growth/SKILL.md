---
name: Daily Growth Playbook (每日增长操作手册)
description: 从20UV到200UV的每日执行手册。包含每天必做清单、外链建设目标、社区引流策略、周/月任务。调用：/daily-growth
---

# Daily Growth Playbook

## 目标：20 UV/day → 200 UV/day

---

## 每日必做（总计 45 分钟）

### ① 早晨：数据检查（5 分钟）

打开 Google Search Console → 效果 → 最近7天

检查以下3个指标，记录变化：

| 指标 | 健康值 | 行动触发 |
|------|--------|---------|
| 总点击数 | 每周+10% | 低于上周 → 检查是否有页面排名下滑 |
| 曝光最高的页面 | - | 排名15-30的页面 → 优先优化 |
| 新出现的查询词 | - | 有新词 → 考虑创建对应页面 |

**每周一额外检查：**
- 哪个页面排名进入前10？→ 加强内链指向它
- 哪个页面排名跌出前20？→ 更新内容或补外链

---

### ② 外链建设（20 分钟）

**目标：每天2个有效外链**

外链质量分级：

| 等级 | 来源类型 | 预期效果 | 每周目标 |
|------|---------|---------|---------|
| A级 | AI工具目录（DA50+） | 外链+直接流量 | 3个 |
| B级 | Reddit/HN真实帖子 | 直接流量+品牌曝光 | 2个 |
| C级 | 论坛回答/Quora | 少量流量 | 5个 |

**A级目录提交清单（按优先级排序）：**

每个提交一次即可，长期有效：

- [ ] https://theresanaiforthat.com/submit/
- [ ] https://www.futurepedia.io/submit-tool
- [ ] https://www.toolify.ai/submit
- [ ] https://alternativeto.net（添加为YouTube字幕工具的替代品）
- [ ] https://www.producthunt.com（正式发布，选周二）
- [ ] https://news.ycombinator.com（Show HN帖子）
- [ ] https://aitools.fyi/submit
- [ ] https://topai.tools/submit
- [ ] https://www.aitoolsdirectory.com/submit
- [ ] https://www.insidr.ai/submit-ai-tool/
- [ ] https://www.supertools.therundown.ai/submit
- [ ] https://www.aitoolhunt.com/submit

**每次提交的标准描述（直接复制）：**
```
Name: YTVidHub
Tagline: Extract YouTube subtitles for ChatGPT, AI training & research
Description: Free tool to download YouTube transcripts in SRT, VTT, or plain TXT format.
No login required. Works on any YouTube video. Used by AI researchers, content creators,
and language learners to extract clean text for LLM fine-tuning, summarization, and translation.
URL: https://ytvidhub.com
Category: AI Tools / Productivity / Video Tools
```

---

### ③ 社区引流（20 分钟）

**目标社区（按效果排序）：**

| 社区 | 链接 | 策略 |
|------|------|------|
| r/ChatGPT | reddit.com/r/ChatGPT | 回答"how to summarize YouTube videos"类问题 |
| r/LocalLLaMA | reddit.com/r/LocalLLaMA | 分享"YouTube transcript for LLM training"用法 |
| r/MachineLearning | reddit.com/r/MachineLearning | 技术向帖子，提到数据来源 |
| r/learnprogramming | reddit.com/r/learnprogramming | 回答字幕/转录相关问题 |
| Quora | quora.com | 搜索"youtube transcript"相关问题并回答 |

**Reddit 回复模板（自然，不要硬广）：**
```
I've been doing this for a while. The easiest way is to extract the transcript
first — I use [YTVidHub](https://ytvidhub.com) which gives you clean TXT with
no timestamps. Then paste it into ChatGPT with your prompt. Works great for
long videos too.
```

**禁止行为：**
- 不要在同一帖子下连续回复
- 不要在新账号上直接发广告
- 不要在帖子标题里提工具名

---

## 每周任务（周一执行，2小时）

### 1. 创建一个新内页

使用 `/seo-page-creator [关键词]` 创建新页面。

**本月关键词优先级队列：**

| 关键词 | 月搜索量估计 | 竞争度 | 优先级 |
|--------|------------|--------|--------|
| youtube transcript for chatgpt | 中高 | 低 | ⭐⭐⭐ 已完成 |
| get youtube transcript | 高 | 中 | ⭐⭐⭐ 下一个 |
| youtube video to text | 高 | 高 | ⭐⭐ |
| youtube transcript copy | 中 | 低 | ⭐⭐⭐ |
| download youtube captions | 中 | 低 | ⭐⭐ |
| youtube subtitle to text | 中 | 低 | ⭐⭐ |
| extract text from youtube video | 中 | 低 | ⭐⭐ |
| youtube transcript api free | 中 | 低 | ⭐⭐ |

### 2. 执行 `/weekly-seo-check`

检查翻译完整性、sitemap、内链机会。

### 3. 更新一个旧页面

优先更新排名在 11-30 之间的页面：
- 在 H2 下加一段新内容
- 更新 `dateModified` 字段
- 在 GSC 提交重新索引

---

## 每月任务（月初执行，半天）

### Product Hunt 发布（最重要）

**准备清单：**
- [ ] 截图：首页 + workspace + 下载结果（3张）
- [ ] GIF：演示从粘贴URL到获得字幕的全流程（15秒）
- [ ] 标语：`Extract any YouTube transcript in seconds — free, no login`
- [ ] 描述：200字，强调免费、无需登录、AI用途
- [ ] 发布时间：周二 00:01 PST（太平洋时间）

**发布当天：**
- 在 r/ChatGPT、r/MachineLearning 同步发帖
- 在 Twitter/X 发布
- 请朋友/用户在 PH 上 upvote（不要刷票）

### Hacker News Show HN

标题格式：`Show HN: YTVidHub – Extract YouTube transcripts for LLM training (free)`

发布时间：工作日早上9点EST

---

## 流量目标追踪

| 时间 | UV目标 | 主要来源 |
|------|--------|---------|
| 第1周 | 30/day | 工具目录提交开始生效 |
| 第2周 | 50/day | Reddit引流 + 新页面收录 |
| 第4周 | 80/day | SEO开始积累 |
| 第8周 | 150/day | Product Hunt + SEO复合增长 |
| 第12周 | 200/day | 多渠道稳定 |

---

## 每日结束检查

- [ ] 今天提交了几个工具目录？（目标：1-2个）
- [ ] 今天在社区回复了几条？（目标：2-3条）
- [ ] GSC有没有新的排名变化？
- [ ] 本周的新页面创建了吗？
