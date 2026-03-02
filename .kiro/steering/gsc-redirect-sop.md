---
inclusion: manual
---

# GSC "Page with redirect" 处理 SOP

## 什么是 "Page with redirect"？

GSC 中 "Page with redirect" 不是错误，是信息提示。意思是 Google 爬到了这个 URL，但收到了 301/302 重定向响应，所以不会索引这个 URL，而是索引目标 URL。

只要目标 URL 正确被索引，redirect 条目就不需要担心。

## 分类与处理方式

### 1. 尾部斜杠补全（无需处理）
- 原因：`next.config.ts` 设置了 `trailingSlash: true`
- 表现：`/faq` → `/faq/`、`/ko` → `/ko/`
- 处理：不需要任何操作，这是 Next.js 正常行为

### 2. .html 后缀重定向（无需处理）
- 原因：`next.config.ts` 中的 `/:path*.html` → `/:path*/` 规则
- 表现：`/pricing.html` → `/pricing/`
- 处理：规则已存在，等 Google 停止爬取旧 URL 即可
- 预防：确保站内没有任何链接指向 `.html` 版本

### 3. http/www 规范化（无需处理）
- 原因：`middleware.ts` 中的 www/http → https 非 www 重定向
- 表现：`http://www.ytvidhub.com/` → `https://ytvidhub.com/`
- 处理：已正确配置

### 4. 双斜杠（已修复，未来自动处理）
- 原因：外部链接或爬虫生成了 `//` URL
- 表现：`/path//` → `/path/`
- 处理：`middleware.ts` 中已添加双斜杠规范化规则

### 5. 路径迁移重定向（按需处理）
- 原因：页面路径变更后添加的 301
- 表现：`/guide/playlist-subtitles-bulk` → `/tools/playlist-subtitles-bulk`
- 处理：保留 301 规则至少 6 个月，之后可考虑移除

## 遇到新的 redirect 条目时的处理流程

1. 打开 GSC → Pages → "Page with redirect"
2. 对每个 URL 判断属于上面哪个分类
3. 如果属于分类 1-4，不需要处理
4. 如果是新的路径迁移（分类 5），确认：
   - 目标 URL 能正常访问（200）
   - 目标 URL 已被 Google 索引
   - sitemap.xml 中只包含目标 URL，不包含旧 URL
5. 如果是未知的重定向：
   - 用 `curl -I <URL>` 检查实际响应头
   - 确认 301 目标是否正确
   - 检查 middleware.ts 和 next.config.ts 中的规则

## 如何减少 redirect 条目

- 确保站内所有链接使用最终 URL（带尾部斜杠、无 .html、https 非 www）
- sitemap.xml 只包含最终 URL
- 外部平台（社交媒体、外链）更新为最终 URL
- 新页面上线时不要频繁改路径

## 添加新 301 重定向的规范

当需要迁移页面路径时：

```typescript
// 在 middleware.ts 中添加（next.config.ts redirects 之前执行）
// 格式：
if (pathname === '/old-path' || pathname.endsWith('/old-path')) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace('/old-path', '/new-path');
    return NextResponse.redirect(newUrl, 301);
}
```

同时更新 sitemap.ts，将旧路径移除，确保只有新路径存在。
