---
inclusion: fileMatch
fileMatchPattern: "src/**/*.{ts,tsx,js,jsx}"
---

# 代码风格指南

## TypeScript 规范

### 组件命名
- 使用 PascalCase：`VideoPlayer.tsx`
- 一个文件一个组件
- 文件名与组件名一致

### 类型定义
```typescript
// ✅ 推荐：使用 interface
interface VideoData {
  id: string;
  title: string;
  url: string;
}

// ❌ 避免：使用 any
const data: any = {};
```

### 函数组件
```typescript
// ✅ 使用箭头函数 + 类型注解
export const VideoCard = ({ video }: { video: VideoData }) => {
  return <div>{video.title}</div>;
};
```

## 导入顺序
1. React 相关
2. 第三方库
3. 本地组件
4. 工具函数
5. 类型定义
6. 样式

```typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import type { VideoData } from '@/types';
```

## 国际化
- 所有用户可见文本必须使用 `next-intl`
- 在 `src/messages/` 添加翻译
- 使用 `useTranslations()` hook

```typescript
const t = useTranslations('VideoPage');
<h1>{t('title')}</h1>
```

## API 路由
- 放在 `src/app/api/` 目录
- 使用 TypeScript
- 返回标准 JSON 格式

```typescript
export async function GET(request: Request) {
  return Response.json({ success: true, data: [] });
}
```
