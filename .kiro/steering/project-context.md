# YTVidHub 项目上下文

## 项目概述
YTVidHub 是一个 YouTube 字幕提取和处理平台，支持字幕下载、AI 摘要、批量处理等功能。
线上地址: https://ytvidhub.com

## 技术栈
- Next.js 16 + React 19 + TypeScript 5
- Tailwind CSS 3 + framer-motion
- Prisma ORM (数据库)
- next-intl (国际化, 英文/西班牙文)
- Resend (邮件)
- Stripe (支付)
- sonner (toast 通知)

## 项目结构
- `src/app/[locale]/(main)/` - 主站页面 (首页、定价、博客、SEO 页面等)
- `src/app/[locale]/(workspace)/workspace/` - 工作台页面 (视频播放+字幕+AI分析)
- `src/app/api/` - API 路由
- `src/components/` - React 组件
- `src/lib/` - 工具函数
- `src/messages/` - 国际化翻译文件
- `prisma/schema.prisma` - 数据库模型

## 核心 API 路由
- `api/subtitle/download-single` - 单视频字幕下载
- `api/subtitle/batch-submit` / `batch-check` / `task-status` - 批量下载
- `api/subtitle/parse-playlist` / `parse-mixed` - 播放列表解析
- `api/ai-summary` - AI 摘要 (首次免费, 后续扣 2 积分)
- `api/history/` - 历史记录 CRUD
- `api/daily-reward` - 每日签到 (+3 积分)
- `api/deduct-credits` - 积分扣除
- `api/sync-user` - 用户同步

## 积分系统
- 每日签到 +3 积分
- AI Summary 扣 2 积分 (首次免费)
- Stripe 付费购买积分

## 已完成功能 (参考 PROGRESS.md)
- 字幕下载 + 页面内展示内容
- AI Summary + workspace 分析
- 字幕与视频时间同步 (postMessage)
- 历史记录 / Library
- 登录后首页改造
- 首次 AI Summary 免费
- 每日签到奖励
- 批量下载
- SEO 博客页面

## SEO 策略（2026-03-02 确定）
- 首页主关键词：youtube subtitle downloader（泛词拉流量）
- /bulk-youtube-subtitle-downloader 独立页面：bulk youtube subtitle downloader（细分词）
- 关键词已确定，不要再频繁修改 title，给 Google 4-6 周稳定期
- FAQ JSON-LD 只放首页（page.tsx），内容和可见 FAQ 组件一致
- sitemap lastModified 使用固定日期，内容更新时手动改
- 之前频繁改 title 导致关键词从 70 掉到 19，现在在恢复期
- WebApplication JSON-LD 在根 layout，全站共享（合理）
- FAQ answer 文本不能包含 markdown 语法（影响结构化数据验证）

## 2026-03-02 SEO 修改记录
- en.json: metadata title 改为 "YouTube Subtitle Downloader - Download SRT, VTT, TXT Captions Free | YTVidHub"
- en.json: hero title 改为 "YouTube Subtitle Downloader"，H2 自然带出 bulk
- en.json: FAQ answer 去除 markdown **bold** 标记
- next.config.ts: 移除 bulk-youtube-subtitle-downloader → / 的 301 redirect
- sitemap.ts: lastModified 改为固定日期 '2026-03-02'
- [locale]/layout.tsx: 移除 FAQ JSON-LD（只保留 WebApplication JSON-LD）
- [locale]/(main)/page.tsx: 新增 FAQ JSON-LD，使用可见 FAQ 的 faq.questions 内容
- bulk-youtube-subtitle-downloader/layout.tsx: 补上 hreflang alternates，修正 OG URL trailing slash，移除无关 article meta

## 待观察
- 2 周后检查 Semrush "youtube subtitle downloader" 是否出现排名
- 确认 Google Search Console 首页渲染内容是否完整
- 根 layout fallback metadata 用的是首页内容，如有子页面继承导致重复 title 需修复

## 用户偏好
- 使用中文交流
- 重视开发效率，不喜欢重复劳动
- 希望每次对话能延续上次的上下文
