---
inclusion: manual
---

# SEO 自检 SOP

每次上线新页面或修改现有页面时，按以下清单逐项检查。

## 1. 页面级 Meta 检查
- [ ] title 包含主关键词，60字符以内
- [ ] description 包含主关键词+长尾词，155字符以内
- [ ] H1 唯一且包含主关键词
- [ ] H2/H3 层级正确，包含语义相关词
- [ ] canonical URL 正确指向自身（非重复页面）
- [ ] hreflang 标签与其他语言版本一一对应
- [ ] OG 标签完整（title/description/image/url）

## 2. 内容可抓取性
- [ ] 关键词密集的内容必须是服务端渲染（SSR），不能依赖 dynamic() 或 "use client"
- [ ] 用 Google Search Console 的 URL 检查工具验证"已渲染的页面"是否包含完整内容
- [ ] FAQ、Features 等 SEO 关键区域如果用了 dynamic import，改为 SSR 或至少加 { ssr: true }
- [ ] 图片有 alt 属性且包含相关关键词

## 3. Sitemap 一致性
- [ ] sitemap 中的每个 URL 返回 200 状态码（不能是 301/404）
- [ ] 被 301 重定向的页面必须从 sitemap 中移除
- [ ] lastModified 使用真实的内容更新时间，不要用动态时间戳
- [ ] priority 值合理反映页面重要性

## 4. 关键词策略
- [ ] 每个页面有明确的主关键词，不与其他页面重复
- [ ] 建立关键词-页面映射表，避免 cannibalization
- [ ] 长尾词分配到博客/指南页面，核心词留给主要功能页
- [ ] 新页面上线前在 Semrush 确认目标关键词的搜索量和竞争度

## 5. 技术检查
- [ ] robots.txt 没有误封重要路径
- [ ] 没有 noindex 标签误加到需要索引的页面
- [ ] 结构化数据（JSON-LD）只出现在相关页面，不要全站打同一份
- [ ] 页面加载速度 < 3s（Core Web Vitals 达标）
- [ ] 301 重定向链不超过 1 跳

## 6. 上线后验证
- [ ] Google Search Console 提交 URL 请求索引
- [ ] 1-2 天后用 site:domain.com/path 确认已收录
- [ ] 1 周后在 Semrush 检查目标关键词是否开始出现
- [ ] 检查 Search Console 的"覆盖率"报告，确认无新增错误

## 7. 关键词-页面映射表（需维护）

| 页面 | 主关键词 | 长尾词 |
|------|---------|--------|
| / (首页) | bulk youtube subtitle downloader | batch subtitle download, playlist subtitle extractor |
| /youtube-subtitle-downloader | youtube subtitle downloader | free subtitle downloader, download youtube captions |
| /extract-youtube-subtitles-online-tool | extract youtube subtitles | youtube subtitle extraction online |
| /download-subs-from-youtube | download subs from youtube | download subtitles youtube free |
| /tools/subtitle-extractor-online | subtitle extractor online | online subtitle extractor tool |
| /what-is-an-srt-file | what is srt file | srt file format, srt file type |
| /youtube-transcript-for-chatgpt | youtube transcript for chatgpt | copy youtube transcript for AI |
| /guide/srt-vs-vtt | srt vs vtt | srt vtt difference |
