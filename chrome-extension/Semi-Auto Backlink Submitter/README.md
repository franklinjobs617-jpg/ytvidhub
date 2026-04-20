# SEO 外链发布辅助插件 (Semi-Auto Backlink Submitter)

基于 Chrome Extension Manifest V3 的半自动外链发布工具：  
自动完成导航 + 表单填充 + 结果流转，人工负责过盾/验证码/最终发布点击。

## 功能对照

- `导入 CSV`：读取 `post_url,title,body_html,tags`
- `开始/暂停任务`：按队列逐条打开投稿页
- Cloudflare 检测：命中后等待人工过盾
- 自动填充：
  - 标题输入框自动匹配并注入
  - 正文优先尝试富文本编辑器/iframe，失败进入人工兜底
- 人工兜底工具：
  - 一键复制标题（纯文本）
  - 一键复制正文（`text/html` + `text/plain`）
- 状态标记：
  - 成功 / 失败 / 跳过
- 自动成功监听：
  - URL 命中标题 slug
  - 页面出现 success/published 文案
- `导出结果 CSV`：
  - 原始URL
  - 发布状态
  - 成功后的外链URL
  - 任务标题
  - 备注

## 目录结构

```text
Semi-Auto Backlink Submitter/
├─ manifest.json
├─ background/service-worker.js
├─ content/content.js
├─ content/content.css
└─ sidepanel/
   ├─ sidepanel.html
   ├─ sidepanel.css
   └─ sidepanel.js
```

## 使用方式

1. 打开 `chrome://extensions/`
2. 开启开发者模式
3. 点击「加载已解压的扩展程序」
4. 选择 `chrome-extension/Semi-Auto Backlink Submitter`
5. 打开扩展 SidePanel，导入 `task.csv`
6. 点击「开始任务」执行流程

## CSV 示例

```csv
post_url,title,body_html,tags
https://example.com/wp-admin/post-new.php,"The Ultimate Guide to SEO in 2024","<p>This is a guide...</p><a href=""https://mysite.com"">My Site</a>","SEO,Marketing,Tips"
```
