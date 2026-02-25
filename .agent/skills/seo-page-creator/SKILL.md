---
name: SEO Page Creator (SEO页面生成器)
description: 创建符合SEO最佳实践的新页面，自动包含 generateMetadata、hreflang、结构化数据、内链。
---

# SEO Page Creator

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
        description: '[155字符以内的描述，包含目标关键词]',
        alternates: buildAlternates(locale, '/[page-slug]'),
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
```

### 3. page.tsx 规范
- 必须是服务端组件（async function，无 "use client"）
- H1 包含目标关键词
- 内容 1500+ 字
- 包含 JSON-LD 结构化数据（HowTo 或 SoftwareApplication）
- 至少 3 条内链指向站内其他页面
- 至少 1 条内链指向首页，锚文字用 "YouTube subtitle downloader"

### 4. 更新 sitemap.ts
将新页面加入 `multilingualPages` 数组：
```ts
{ path: '/[page-slug]', priority: 0.8, changeFreq: 'monthly' as const },
```

### 5. 内链检查清单
新页面必须链接到：
- `/` (首页)
- `/youtube-subtitle-downloader`
- `/bulk-youtube-subtitle-downloader`
- 至少 1 篇相关 guide/blog

### 6. 部署后
提醒用户去 GSC 提交新页面索引。
