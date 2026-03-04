# 第一部分：全站级 SEO 基础设施开发 SOP (Site-wide Infrastructure SOP)

本部分规定了网站在全局架构、服务器配置及爬虫治理层面的标准操作流程。这些基础设施的质量直接决定了搜索引擎对全站内容的抓取效率（Crawl Budget）与索引质量。

---

## 1. 爬虫治理与机器人协议 (Bot Governance & Robots.txt)

在 2026 年的搜索生态中，开发者必须区分“内容检索爬虫”（为搜索结果提供数据）与“模型训练爬虫”（仅用于 AI 训练，不提供流量反馈） [1]。

### 1.1 Robots.txt 差异化配置

**操作步骤：**
1.  **允许检索类爬虫**：明确允许 `OAI-SearchBot`（OpenAI 搜索）、`Googlebot` 等检索类爬虫。
2.  **限制训练类爬虫**：根据业务隐私需求，可选限制 `GPTBot`、`Google-Extended` 等训练类爬虫。
3.  **禁止敏感路径**：统一屏蔽后台管理、用户私有数据、搜索结果页等低质量路径。

**代码示例 (标准模板)：**

```text
# 允许 AI 搜索实时调用（如 ChatGPT Search）
User-agent: OAI-SearchBot
Allow: /

# 允许主流搜索引擎
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /

# 拒绝 AI 模型训练抓取（可选，保护版权）
User-agent: GPTBot
Disallow: /
User-agent: Google-Extended
Disallow: /

# 屏蔽低价值路径
Disallow: /admin/
Disallow: /search/
Disallow: /api/
Disallow: /temp/

# 指定站点地图位置
Sitemap: https://www.example.com/sitemap.xml
```

**验证方法：**
- 使用 [Google Robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool) 验证语法。
- 检查服务器日志，确认是否有非预期的 Disallow 导致抓取量骤降。

### 1.2 动态站点地图 (Dynamic Sitemap)

**操作步骤：**
1.  **自动更新**：Sitemap 必须由后端定时任务或内容管理系统 (CMS) 自动生成。
2.  **质量过滤**：仅包含 `200 OK` 状态、带 `Canonical` 标签且非 `noindex` 的页面。
3.  **规模控制**：单个 Sitemap 文件不超过 50,000 个 URL 或 50MB（未压缩）。若超出，使用索引文件 (Sitemap Index)。

**验证方法：**
- 在 Google Search Console 的“站点地图”报告中提交并检查是否有解析错误。

---

## 2. URL 工程与路径规范 (URL Engineering)

URL 是页面的唯一标识，其结构的简洁性与一致性对权重集中至关重要 [2]。

### 2.1 强制 HTTPS 与 HSTS

**操作步骤：**
1.  **全站 301 重定向**：将所有 HTTP 请求永久重定向至 HTTPS。
2.  **开启 HSTS**：在服务器响应头中加入 `Strict-Transport-Security`，强制浏览器使用加密连接。

### 2.2 路径一致性规范

**操作步骤：**
1.  **小写化**：强制所有 URL 字符为小写，避免大小写混用导致的内容重复。
2.  **连字符使用**：统一使用 `-` 分隔单词，严禁使用下划线 `_`。
3.  **结尾斜杠一致性**：统一全站 URL 结尾是否带 `/`（建议统一不带）。
4.  **死链处理**：
    - **正常删除**：内容永久删除后，返回 `404 Not Found` 或 `410 Gone`。
    - **精准重定向**：仅当有高度相关的替代页面时，才使用 `301` 跳转。严禁将所有 404 跳转至首页。

### 2.3 多面导航 (Faceted Navigation) 治理

针对电商等拥有海量筛选组合的网站，必须防止“路径爆炸”消耗抓取预算 [3]。

**操作步骤：**
1.  **参数清理**：使用 `rel="nofollow"` 阻止爬虫跟踪非必要的筛选组合（如：价格区间、多重排序）。
2.  **Canonical 归集**：所有筛选后的页面应通过 `Canonical` 标签指向该分类的基础 URL。
3.  **Robots.txt 屏蔽**：对于无搜索意义的参数组合，直接在 Robots.txt 中 Disallow。

---

## 3. 渲染架构与服务器响应 (Rendering & Server Performance)

搜索引擎对 JavaScript 的渲染能力虽在提升，但 SSR 依然是确保抓取率的最佳方案 [4]。

### 3.1 核心内容 SSR/预渲染

**操作步骤：**
1.  **首屏关键内容**：标题、正文、核心元数据必须在初始 HTML 中输出。
2.  **Hydration 优化**：确保客户端激活 (Hydration) 过程不影响 LCP 指标。
3.  **隐形错误处理**：当后端接口失败时，前端不得返回带 `200` 状态码的错误页，必须由服务端直接返回 `500` 或 `404`。

### 3.2 资源压缩与缓存

**操作步骤：**
1.  **Brotli/Gzip 压缩**：在服务器端开启对文本资源的压缩。
2.  **长效缓存策略**：对静态资源（JS/CSS/Images）设置 `Cache-Control: max-age=31536000`。

---

## 参考文献

[1] Yotpo. (2026, February 6). *Full Technical SEO Checklist: The 2026 Guide*. Retrieved from [https://www.yotpo.com/blog/full-technical-seo-checklist/](https://www.yotpo.com/blog/full-technical-seo-checklist/)
[2] Google Search Central. (n.d.). *URL structure best practices*. Retrieved from [https://developers.google.com/search/docs/crawling-indexing/url-structure](https://developers.google.com/search/docs/crawling-indexing/url-structure)
[3] Google Search Central. (n.d.). *Faceted navigation best practices*. Retrieved from [https://developers.google.com/search/docs/specialty/ecommerce/faceted-navigation](https://developers.google.com/search/docs/specialty/ecommerce/faceted-navigation)
[4] Google Search Central. (n.d.). *JavaScript SEO basics*. Retrieved from [https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
