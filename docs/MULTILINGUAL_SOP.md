# 多语言上线标准操作流程 (SOP)

## 概述
本文档提供快速上线新语言版本的标准化流程，确保翻译完整性和质量。

## 前置条件
- Node.js 环境已安装
- 项目依赖已安装 (`npm install`)
- 英语基准文件 (`src/messages/en.json`) 为最新版本

---

## 快速上线流程（3步完成）

### 步骤 1: 创建新语言翻译文件

在 `src/messages/` 目录下创建新的语言文件：

```bash
# 示例：创建法语翻译
cp src/messages/en.json src/messages/fr.json
```

**语言代码参考：**
- `ja` - 日语
- `ko` - 韩语
- `zh` - 中文
- `es` - 西班牙语
- `de` - 德语
- `fr` - 法语
- `pt` - 葡萄牙语
- `it` - 意大利语

### 步骤 2: 翻译内容

使用 AI 翻译工具（ChatGPT/Claude/DeepL）翻译文件内容：

**翻译提示词模板：**
```
请将以下 JSON 文件翻译成[目标语言]。
要求：
1. 保持 JSON 结构不变
2. 只翻译值（value），不翻译键（key）
3. 保持 HTML 标签和占位符不变（如 {count}, <highlight>, <strong>）
4. 确保专业术语准确（YouTube, SRT, VTT, TXT, AI, LLM 等）
5. 保持语气专业且友好

[粘贴 en.json 内容]
```

### 步骤 3: 验证翻译完整性

运行验证脚本检查缺失的键：

```bash
node scripts/check-translations.js [语言代码]
```

**示例：**
```bash
node scripts/check-translations.js fr
```

---

## 详细验证流程

### 自动化验证脚本

创建 `scripts/check-translations.js`：

```javascript
const fs = require('fs');
const path = require('path');

const lang = process.argv[2];
if (!lang) {
  console.error('请指定语言代码，例如: node check-translations.js fr');
  process.exit(1);
}

const enPath = path.join(__dirname, '../src/messages/en.json');
const targetPath = path.join(__dirname, `../src/messages/${lang}.json`);

if (!fs.existsSync(targetPath)) {
  console.error(`❌ 文件不存在: ${targetPath}`);
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const target = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (let key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = getAllKeys(en);
const targetKeys = getAllKeys(target);

const missing = enKeys.filter(k => !targetKeys.includes(k));
const extra = targetKeys.filter(k => !enKeys.includes(k));

console.log(`\n📊 翻译完整性报告 - ${lang.toUpperCase()}`);
console.log('='.repeat(50));
console.log(`✅ 英语基准键数: ${enKeys.length}`);
console.log(`📝 ${lang.toUpperCase()} 翻译键数: ${targetKeys.length}`);
console.log(`❌ 缺失键数: ${missing.length}`);
console.log(`⚠️  多余键数: ${extra.length}`);

if (missing.length > 0) {
  console.log('\n❌ 缺失的键:');
  missing.forEach(k => console.log(`  - ${k}`));
}

if (extra.length > 0) {
  console.log('\n⚠️  多余的键（可能需要删除）:');
  extra.forEach(k => console.log(`  - ${k}`));
}

if (missing.length === 0 && extra.length === 0) {
  console.log('\n✅ 翻译完整！所有键都已匹配。');
  process.exit(0);
} else {
  console.log('\n❌ 翻译不完整，请修复上述问题。');
  process.exit(1);
}
```

### 手动验证检查清单

- [ ] 所有键都已翻译（无缺失）
- [ ] 占位符格式正确（`{count}`, `{amount}` 等）
- [ ] HTML 标签保持不变（`<highlight>`, `<strong>` 等）
- [ ] 专业术语一致性（YouTube, SRT, VTT, AI, LLM）
- [ ] 语法和拼写正确
- [ ] 语气符合目标市场文化

---

## 配置路由（Next.js i18n）

### 更新 `src/i18n/routing.ts`

添加新语言到配置：

```typescript
export const routing = defineRouting({
  locales: ['en', 'ja', 'ko', 'de', 'es', 'fr'], // 添加新语言代码
  defaultLocale: 'en'
});
```

### 更新 `next.config.js`（如需要）

确保 i18n 配置包含新语言：

```javascript
module.exports = {
  i18n: {
    locales: ['en', 'ja', 'ko', 'de', 'es', 'fr'],
    defaultLocale: 'en',
  },
};
```

---

## 测试流程

### 本地测试

1. **启动开发服务器：**
```bash
npm run dev
```

2. **访问新语言页面：**
```
http://localhost:3000/fr
```

3. **测试检查项：**
- [ ] 页面正常加载
- [ ] 所有文本正确显示（无英语残留）
- [ ] 导航菜单翻译正确
- [ ] 表单和按钮文本正确
- [ ] 错误消息显示正确
- [ ] SEO 元数据（title, description）正确

### 构建测试

```bash
npm run build
npm run start
```

确保生产构建无错误。

---

## 部署前检查清单

- [ ] 翻译文件验证通过（0 缺失键）
- [ ] 路由配置已更新
- [ ] 本地测试通过
- [ ] 生产构建成功
- [ ] SEO 元数据已翻译
- [ ] 语言切换器显示新语言
- [ ] 所有页面路径正确（/fr/*, /fr/pricing 等）

---

## 上线后验证

1. **访问生产环境新语言页面**
2. **检查 Google Search Console 索引状态**
3. **验证 hreflang 标签正确**
4. **监控错误日志**

---

## 常见问题排查

### 问题 1: 页面显示英语而非新语言

**解决方案：**
- 检查文件名是否正确（`src/messages/[lang].json`）
- 确认路由配置包含新语言代码
- 清除 `.next` 缓存并重新构建

### 问题 2: 部分文本未翻译

**解决方案：**
- 运行验证脚本检查缺失键
- 检查组件是否使用了硬编码文本
- 确认 `useTranslations()` hook 使用正确

### 问题 3: 占位符显示错误

**解决方案：**
- 检查占位符格式：`{count}` 而非 `{count }`
- 确认占位符名称与代码一致
- 验证 JSON 格式正确（无语法错误）

---

## 维护流程

### 当英语基准文件更新时

1. **检测新增键：**
```bash
node scripts/check-translations.js fr
```

2. **更新所有语言文件：**
- 识别新增的键
- 翻译新内容
- 重新验证

3. **建议：使用版本控制**
- 在 `en.json` 中添加版本号注释
- 跟踪每次更新的变更日志

---

## 时间估算

| 步骤 | 预计时间 |
|------|---------|
| 创建翻译文件 | 5 分钟 |
| AI 翻译内容 | 10-15 分钟 |
| 人工审核翻译 | 30-60 分钟 |
| 验证和测试 | 15-20 分钟 |
| 配置和部署 | 10 分钟 |
| **总计** | **70-110 分钟** |

---

## 工具推荐

### 翻译工具
- **ChatGPT/Claude**: 适合整体翻译
- **DeepL**: 高质量机器翻译
- **Google Translate**: 快速参考

### 验证工具
- **i18n-ally** (VS Code 插件): 可视化管理翻译
- **JSON Lint**: 验证 JSON 格式
- **自定义验证脚本**: 自动化检查

---

## 联系支持

如遇到问题，请联系开发团队或参考：
- 项目文档: `/docs`
- 技术支持: [support@ytvidhub.com]

---

**最后更新**: 2026-03-03
**版本**: 1.0
