# YTVidHub SEO 进度记录

> 目标：日均 UV 30 → 200
> 当前进度：Phase 1 完成 ✅

---

## Phase 1 已完成（2026-02-25）

### 1. 修复 Sitemap 多语言 alternate ✅
**文件：** `src/app/sitemap.ts`

将以下 12 个高价值页面从 `englishOnlyPages` 移到 `multilingualPages`，Google 现在能发现 es/de/ko 版本：
- `/youtube-subtitle-downloader`
- `/bulk-youtube-subtitle-downloader`
- `/extract-youtube-subtitles-online-tool`
- `/download-subs-from-youtube`
- `/tools/subtitle-extractor-online`
- `/guide/how-to-download-youtube-subtitles-complete-guide`
- `/guide/srt-vs-vtt`
- `/pricing`
- `/how-to-use`
- `/faq`
- `/what-is-an-srt-file`
- `/about`

---

### 2. 创建 `src/lib/seo.ts` 工具函数 ✅
**文件：** `src/lib/seo.ts`（新建）

`buildAlternates(locale, pathname)` — 统一生成 hreflang + canonical，所有 layout.tsx 复用。

---

### 3. 创建 7 个 layout.tsx（服务端 metadata）✅

| 页面 | 文件 | 状态 |
|------|------|------|
| about | `src/app/[locale]/(main)/about/layout.tsx` | 新建 |
| faq | `src/app/[locale]/(main)/faq/layout.tsx` | 新建 |
| how-to-use | `src/app/[locale]/(main)/how-to-use/layout.tsx` | 新建 |
| support | `src/app/[locale]/(main)/support/layout.tsx` | 新建 |
| terms-of-service | `src/app/[locale]/(main)/terms-of-service/layout.tsx` | 新建 |
| extract-youtube-subtitles-online-tool | `src/app/[locale]/(main)/extract-youtube-subtitles-online-tool/layout.tsx` | 新建 |
| privacy-policy | `src/app/[locale]/(main)/privacy-policy/layout.tsx` | 升级为 generateMetadata |
| download-subs-from-youtube | `src/app/[locale]/(main)/download-subs-from-youtube/layout.tsx` | 升级为 generateMetadata |

---

### 4. 删除客户端 `<title>`/`<meta>` 标签 ✅

从以下 6 个 page.tsx 删除了客户端 metadata 标签（避免与 layout.tsx 冲突）：
- `about/page.tsx`
- `how-to-use/page.tsx`
- `support/page.tsx`
- `privacy-policy/page.tsx`
- `terms-of-service/page.tsx`
- `faq/page.tsx`（保留了 JSON-LD）

---

### 5. 修复 i18n ✅

- `src/messages/es.json`：补充缺失的 `"topUp": "Recargar"`
- `src/i18n/request.ts`：预加载 locales 从 `['en', 'es']` 改为 `['en', 'es', 'de', 'ko']`

---

### 6. 修复 hreflang（早期修复）✅

- `page.tsx`（首页）：补充 `ko` + `x-default`
- `bulk-youtube-subtitle-downloader/page.tsx`：补充 `de`, `ko`, `x-default`
- `youtube-subtitle-downloader/page.tsx`：补充 `ko`, `x-default`

---

### 7. 创建 Kiro Skills ✅

| Skill | 路径 | 用途 |
|-------|------|------|
| `/seo-page-creator` | `.agent/skills/seo-page-creator/SKILL.md` | 创建新 SEO 落地页 |
| `/seo-auditor` | `.agent/skills/seo-auditor/SKILL.md` | 审计指定页面 SEO 健康度 |
| `/weekly-seo-check` | `.agent/skills/weekly-seo-check/SKILL.md` | 每周 SEO 例行检查 |

---

## 部署后必做 ⚠️

1. **部署到 Vercel**（push 当前改动）
2. **GSC 提交索引**：在 Google Search Console 逐一提交以下 URL：
   - `https://ytvidhub.com/faq`
   - `https://ytvidhub.com/about`
   - `https://ytvidhub.com/how-to-use`
   - `https://ytvidhub.com/download-subs-from-youtube`
   - `https://ytvidhub.com/extract-youtube-subtitles-online-tool`
   - `https://ytvidhub.com/pricing`
3. **验证 sitemap**：访问 `https://ytvidhub.com/sitemap.xml`，确认多语言 alternate 出现

---

## Phase 2：下一步（跨站导流 + 内链）

### 2.1 Footer 加跨站链接 🔴 P0
**文件：** `src/components/Footer.tsx`

新增 "Sister Tools" 栏目，加入以下 3 个站的链接：
```
ytcommentfinder.com — YT Comment Finder
genanime.art — GenAnime Art
removermarca.com — Remover Marca
```
同时去其他 3 个站的 Footer 加回链到 ytvidhub.com。

**操作：** 直接告诉 Kiro "帮我在 Footer 加跨站链接"

---

### 2.2 Blog/Guide 内链优化 🟡 P1

| 页面 | 需要加的内链 |
|------|------------|
| `blog/how-to-get-youtube-video-transcript` | → `/guide/srt-vs-vtt`, `/guide/clean-transcript-no-timestamp` |
| `guide/srt-vs-vtt` | → `/what-is-an-srt-file`, `/youtube-subtitle-downloader` |
| `blog/spanish-yt-channels-subtitles` | → removermarca.com（西语用户） |

**操作：** 告诉 Kiro "帮我优化 blog/guide 内链"

---

### 2.3 RelatedArticles 组件 🟢 P2
新建 `src/components/seo/RelatedArticles.tsx`，放在每篇 blog/guide 底部。

---

## Phase 3：新内容页（Month 2）

| 新页面 | 目标关键词 | 月搜索量 |
|--------|-----------|---------|
| `/youtube-to-text` | "youtube to text" | ~40K |
| `/youtube-transcript-generator` | "youtube transcript generator" | ~22K |
| `/tools/youtube-to-srt` | "youtube to srt" | ~8K |

**操作：** 使用 `/seo-page-creator youtube-to-text` 创建

---

### 3.2 Blog 内容国际化（前 3 篇）

优先翻译：
1. `guide/how-to-download-youtube-subtitles-complete-guide`
2. `blog/how-to-get-youtube-video-transcript`
3. `guide/srt-vs-vtt`

---

## Phase 4：AI 功能页（Month 3）

- `/tools/youtube-video-summarizer` — 目标关键词 "youtube video summarizer"
- `/download-subtitles/[language]` — 程序化 SEO，20+ 语言页面

---

## 日常例行任务

### 每天（5 分钟）
- [ ] 查 GSC 抓取错误和新索引页面

### 每周（2 小时）
- [ ] 运行 `/weekly-seo-check` 检查 SEO 健康度
- [ ] 更新 1 篇 blog/guide（加 2026 年份引用、扩展 FAQ）
- [ ] 加 2-3 条新内链
- [ ] GSC 提交新页面索引

### 每两周（3 小时）
- [ ] 发布 1 篇新 blog（1500+ 字，服务端渲染，带结构化数据）

### 每月（4 小时）
- [ ] 运行 `/seo-auditor` 审计核心页面
- [ ] Core Web Vitals 检查（Lighthouse top 5 页面）
- [ ] 竞品分析 + 关键词差距识别

---

## 下次开始时说这句话

> "继续 SEO 计划，当前在 Phase 2，帮我做 Footer 跨站链接"

Kiro 会读取此文件并继续。

---

## 预期里程碑

| 里程碑 | 预期 UV | 关键驱动 |
|--------|---------|---------|
| 现在（Phase 1 完成） | 30/天 | — |
| Phase 2 完成 | 60-80/天 | 跨站链接 + 内链优化 |
| Phase 3 完成 | 100-130/天 | 新落地页 + 多语言内容 |
| Phase 4 完成 | 150-200/天 | AI 工具页 + 程序化 SEO |
