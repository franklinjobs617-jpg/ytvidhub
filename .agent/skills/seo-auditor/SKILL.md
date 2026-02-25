---
name: SEO Auditor (SEO审计)
description: 审计指定页面的SEO健康度，检查 metadata、hreflang、结构化数据、内链、服务端渲染等问题。
---

# SEO Auditor

## 使用场景
对指定页面进行 SEO 健康检查。例如：`/seo-auditor /pricing`

## 审计检查清单

### 1. Metadata 检查
- [ ] 页面是否有 `generateMetadata()` 或 layout.tsx 提供服务端 metadata？
- [ ] title 是否包含目标关键词？是否在 60 字符以内？
- [ ] description 是否在 155 字符以内？是否包含行动号召？
- [ ] 是否有客户端 `<title>`/`<meta>` 标签？（应删除，改用 layout.tsx）

### 2. Hreflang 检查
- [ ] 是否使用 `buildAlternates()` 生成 4 语言 alternate？
- [ ] 是否包含 `x-default` 指向英文版？
- [ ] 该页面是否在 `sitemap.ts` 的 `multilingualPages` 数组中？

### 3. 服务端渲染检查
- [ ] page.tsx 是否有 `"use client"`？
- [ ] H1 标签是否在服务端渲染？（Google 爬虫能否不执行 JS 就看到 H1？）
- [ ] JSON-LD 结构化数据是否在服务端输出？

### 4. 内链检查
- [ ] 页面是否有指向首页的链接？锚文字是否包含关键词？
- [ ] 页面是否链接到至少 2 个其他内部页面？
- [ ] 是否有其他页面链接到此页面？

### 5. 性能检查
- [ ] 是否使用了 framer-motion 等重型客户端库？
- [ ] 图片是否使用 next/image 并设置了 alt 属性？

## 输出格式
审计完成后输出：
- ✅ 通过项
- ❌ 未通过项 + 具体修复建议
- 总评分（通过数/总检查数）
