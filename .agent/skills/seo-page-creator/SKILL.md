<!--
 * @Author: admin 2270669689@qq.com
 * @Date: 2026-02-25 15:23:14
 * @LastEditors: admin 2270669689@qq.com
 * @LastEditTime: 2026-02-25 15:31:49
 * @FilePath: \ytvidhub\.agent\skills\seo-page-creator\SKILL.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
---
name: SEO Page Creator v2.0 (SEO页面生成器)
description: 创建符合SEO最佳实践的新页面，自动包含 generateMetadata、hreflang、FAQPage 结构化数据、动态锚文字、双向内链检查。
---

# SEO Page Creator v2.0

## 使用场景
当需要创建新的 SEO 落地页时调用此 skill。例如：`/seo-page-creator youtube-to-text`

## 创建流程

### 1. 页面文件结构
每个新页面必须包含：
```
src/app/[locale]/(main)/[page-slug]/
├── page.tsx      # 服务端组件（禁止 "use client"）
└── layout.tsx    # generateMetadata + buildAlternates
```

---

### 2. layout.tsx 模板
```tsx
import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: '[页面标题] | YTVidHub',
        description: '[155字符以内的描述，包含目标关键词和行动号召]',
        alternates: buildAlternates(locale, '/[page-slug]'),
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
```

---

### 3. page.tsx 规范
- 必须是服务端组件（async function，无 "use client"）
- H1 包含目标关键词
- 内容 1500+ 字
- 包含 2 种 JSON-LD（FAQPage 必选 + HowTo 或 SoftwareApplication 二选一）
- 至少 3 条内链，锚文字使用动态变体（见第 6 节）

---

### 4. 【NEW】FAQ 模块 + FAQPage JSON-LD

每个新页面**必须**包含 FAQ 模块，并输出 FAQPage 结构化数据。
FAQ 在 Google 搜索结果中展开为折叠内容块，显著提升点击率。

**FAQ 内容要求：**
- 至少 5 个问题
- 问题必须是用户真实搜索词（参考 Google "People also ask"）
- 答案 2-4 句，简洁直接

**FAQPage JSON-LD 模板（服务端渲染，放在 page.tsx）：**
```tsx
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '[问题1]',
      acceptedAnswer: { '@type': 'Answer', text: '[答案1]' },
    },
    {
      '@type': 'Question',
      name: '[问题2]',
      acceptedAnswer: { '@type': 'Answer', text: '[答案2]' },
    },
    // 至少 5 个
  ],
};

// JSX 中输出：
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
/>
```

---

### 5. HowTo / SoftwareApplication JSON-LD
根据页面类型选择（与 FAQPage 并列，不互相替代）：
- 工具页 → `SoftwareApplication`
- 教程页 → `HowTo`（包含 step 数组）

---

### 6. 【NEW】动态锚文字变体池

**禁止**同一页面所有内链使用相同锚文字。根据上下文语义从变体池中选择：

| 变体 | 适用场景 |
|------|---------|
| `YouTube subtitle downloader` | 通用首页链接 |
| `download YouTube subtitles` | 动作导向句子 |
| `YouTube CC downloader` | 提到 CC/字幕轨道时 |
| `YouTube transcription tool` | 提到转录/文字稿时 |
| `extract subtitles from YouTube` | 提到提取操作时 |
| `free subtitle extractor` | 提到免费/无需注册时 |
| `YTVidHub` | 品牌提及场景 |

**规则：**
- 同一页面内同一锚文字最多出现 2 次
- 指向首页 `/` 优先用前 3 个变体
- 指向 `/youtube-subtitle-downloader` 用后 4 个变体

---

### 7. 内链清单（出站链接）
新页面必须链接到：
- `/`（首页）— 使用变体池锚文字
- `/youtube-subtitle-downloader`
- `/bulk-youtube-subtitle-downloader`
- 至少 1 篇相关 guide/blog

---

### 8. 【NEW】双向内链补链提醒

新页面创建完成后，**必须**提醒用户在以下高权重旧页面中手动加入指向新页面的链接。
补链能让 Google 更快发现并收录新页面。

**需要补链的高权重页面（按权重排序）：**

1. **首页** `src/app/[locale]/(main)/page.tsx`
   - 在"工具介绍"或"相关工具"区域加一句话 + 链接

2. **`/youtube-subtitle-downloader`** page.tsx
   - 在页面底部"相关工具"或正文中加内链

3. **`/bulk-youtube-subtitle-downloader`** page.tsx
   - 同上

4. **最相关的 1 篇 guide/blog**
   - 在正文中找语义相关的句子，自然插入链接

**补链格式示例：**
```tsx
<p>
  You can also{' '}
  <Link href="/[new-page-slug]">[自然语义的锚文字]</Link>{' '}
  directly from any YouTube video.
</p>
```

> ⚠️ 不补链 = 新页面可能 2-4 周才被收录。补链后通常 3-7 天内收录。

---

### 9. 更新 sitemap.ts
将新页面加入 `multilingualPages` 数组：
```ts
{ path: '/[page-slug]', priority: 0.8, changeFreq: 'monthly' as const },
```

---

### 10. 完成检查清单

- [ ] layout.tsx 有 `generateMetadata` + `buildAlternates`
- [ ] page.tsx 无 `"use client"`
- [ ] H1 包含目标关键词
- [ ] FAQPage JSON-LD 包含 5+ 问题
- [ ] HowTo 或 SoftwareApplication JSON-LD
- [ ] 内链使用了至少 3 种不同锚文字变体
- [ ] sitemap.ts 已更新
- [ ] **已提醒用户在 3 个旧页面补链** ← 最容易忘
- [ ] 提醒用户部署后去 GSC 提交索引
