---
name: Weekly SEO Check (每周SEO例行检查)
description: 每周执行一次的SEO例行检查，包括翻译完整性、内链审计、sitemap验证、内容更新建议。
---

# Weekly SEO Check

## 使用场景
每周执行一次，保持SEO健康度。直接调用：`/weekly-seo-check`

## 检查流程

### 1. 翻译完整性（5分钟）
对比 4 个语言文件的 key 数量：
```
src/messages/en.json
src/messages/es.json
src/messages/de.json
src/messages/ko.json
```
报告缺失的 key。

### 2. Sitemap 验证
- 检查 `src/app/sitemap.ts`
- 确认所有 page.tsx 对应的路由都在 sitemap 中
- 确认高价值页面在 `multilingualPages` 数组中

### 3. 新页面检查
- 扫描最近新增的 page.tsx 文件
- 检查是否有对应的 layout.tsx 或 generateMetadata
- 检查是否已加入 sitemap

### 4. 内链机会
- 扫描所有 blog/guide 页面
- 找出没有指向首页链接的页面
- 建议添加内链的位置和锚文字

### 5. 跨站链接检查
检查 Footer.tsx 是否包含以下站点的互链：
- ytcommentfinder.com
- genanime.art
- removermarca.com

### 6. 输出周报
格式：
```
## YTVidHub 周报 [日期]
- 翻译完整度：en 100% | es XX% | de XX% | ko XX%
- Sitemap 页面数：XX（多语言 XX + 英文 XX）
- 缺失 metadata 的页面：[列表]
- 内链建议：[具体建议]
- 本周建议更新的页面：[1篇最需要刷新的内容]
```
