# 第三部分：SEO 验证与监控 SOP (Validation & Monitoring SOP)

本部分旨在为开发者提供一套系统化的工具链和日常检查流程，以确保 SEO 标准在开发、上线及维护阶段得到持续贯彻。

---

## 1. 核心工具链推荐 (Recommended SEO Toolchain)

高效的 SEO 工作离不开专业工具的支持。以下是开发者必备的 SEO 工具分类推荐。

| 工具分类 | 推荐工具 | 主要用途 |
| :--- | :--- | :--- |
| **官方诊断** | **Google Search Console (GSC)** | 抓取、索引、核心性能指标 (CWV)、安全性、手动操作监控。 |
| **性能测试** | **Lighthouse / PageSpeed Insights** | 页面加载性能、可访问性、SEO 最佳实践、INP/LCP/CLS 审计。 |
| **模拟抓取** | **Screaming Frog SEO Spider** | 模拟搜索引擎抓取全站，发现 404、重复标题、缺失 Canonical 等。 |
| **结构化数据验证** | **Rich Results Test** | 验证 JSON-LD 结构化数据是否能正确生成富媒体搜索结果。 |
| **多语言验证** | **Hreflang Checker** | 检查多语言标签的自引用、双向引用及代码规范。 |
| **浏览器插件** | **SEOquake / Ahrefs SEO Toolbar** | 在页面上快速查看 TDK、标题层级、图片 Alt 等元数据。 |

---

## 2. 开发与上线自检流程 (Pre-launch & Post-launch Checklist)

在项目开发的各个关键节点，必须执行以下标准化自检。

### 2.1 开发阶段自检 (Development Phase)
- [ ] **TDK 检查**：确保每个页面都有唯一的 Title 和 Description。
- [ ] **HTML 语义化**：检查 `<h1>` 唯一性及标题层级逻辑。
- [ ] **图片 Alt 属性**：确保所有关键图片均有描述性 `alt` 文本。
- [ ] **JSON-LD 注入**：使用“富媒体搜索结果测试工具”验证结构化数据。
- [ ] **本地性能测试**：运行 Lighthouse 审计，确保 SEO 分数不低于 90。

### 2.2 上线前最后检查 (Pre-launch Final Check)
- [ ] **Robots.txt 验证**：确认未意外 Disallow 核心业务路径。
- [ ] **Sitemap 生成**：确保 Sitemap 包含且仅包含 Canonical URL。
- [ ] **HTTPS 强制跳转**：检查所有 HTTP 请求是否已 301 重定向至 HTTPS。
- [ ] **Canonical 标签**：确保所有页面均包含指向自身的规范网址。

### 2.3 上线后监控 (Post-launch Monitoring)
- [ ] **GSC 抓取状态**：上线 48 小时内检查 GSC 中的“抓取统计信息”，确保 Googlebot 已开始访问。
- [ ] **索引覆盖率**：监控“网页”报告，确认核心页面是否已成功编入索引。
- [ ] **性能指标监控**：在“核心性能指标”报告中观察真实用户的 LCP 和 INP 数据。

---

## 3. 日常维护与异常处理 (Maintenance & Troubleshooting)

SEO 不是一劳永逸的工作，需要长期的维护和异常监控。

### 3.1 定期全站扫描 (Monthly Full-site Scan)
建议每月使用 **Screaming Frog** 进行一次全站扫描，重点查找以下问题：
- **坏链 (Broken Links)**：修复 404 或错误的内部链接。
- **重定向链 (Redirect Chains)**：减少重定向次数，提升抓取效率。
- **元数据缺失**：发现新上线页面中缺失的 TDK 或 Canonical 标签。

### 3.2 异常预警与处理 (Troubleshooting)
- **抓取量骤降**：检查 `robots.txt` 或服务器防火墙是否误封了 Googlebot IP。
- **索引量下降**：检查是否出现了大规模的“软 404”或内容重复导致的去索引。
- **性能指标飘红**：分析最近的代码提交，查找阻塞主线程的长任务或未优化的静态资源。

---

## 参考文献

[1] Google Search Central. (n.d.). *Search Console training*. Retrieved from [https://developers.google.com/search/docs/monitor-debug/search-console-training](https://developers.google.com/search/docs/monitor-debug/search-console-training)
[2] Google Search Central. (n.d.). *Audit your site with Lighthouse*. Retrieved from [https://developers.google.com/search/docs/fundamentals/seo-starter-guide#lighthouse](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#lighthouse)
[3] Screaming Frog. (n.d.). *SEO Spider Tool*. Retrieved from [https://www.screamingfrog.co.uk/seo-spider/](https://www.screamingfrog.co.uk/seo-spider/)
[4] Google Search Central. (n.d.). *Rich results test*. Retrieved from [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
