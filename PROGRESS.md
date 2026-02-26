# YTvidHub 开发进度记录

## 已完成

### 首页体验优化
- **显示下载内容** (`useSubtitleDownloader.ts`, `HeroSection.tsx`)
  - 下载完成后直接在页面展示字幕内容，不再只是触发文件下载
  - 标题 + 操作按钮固定在顶部，内容区域可滚动
  - 支持一键复制全文

- **AI Summary 跳转无卡顿** (`HeroSection.tsx`)
  - 先执行 `router.push` 跳转，再用 `setTimeout(0)` 异步写入 sessionStorage
  - 解决了大文本同步写入阻塞主线程导致的页面卡顿

### Workspace 优化
- **字幕缓存，避免重复请求** (`TranscriptArea.tsx`)
  - 从首页下载后进入 workspace，TranscriptArea 优先读 sessionStorage 缓存
  - 支持 VTT / SRT / TXT 三种格式的缓存与转换（SRT→VTT, TXT→VTT envelope）

- **修复 Copy Bug** (`TranscriptArea.tsx`)
  - 原来复制的是占位字符串 `"Please implement full copy logic"`
  - 现在正确复制 `displayItems` 的实际文本内容

- **移除 Quiz 死功能** (`workspace/page.tsx`)
  - 移动端底部导航删除 Quiz tab（FlashcardView 显示"Feature no longer available"）
  - `activeTab` 类型收窄为 `"video" | "analysis"`
  - 删除 `Brain` import

- **清理 console.log** (`workspace/page.tsx`)
  - 删除 25+ 条调试日志和调试用 `useEffect`

- **修复视频跳转重载问题** (`VideoPlayer.tsx`)
  - 原来：`seekTime` 变化 → 重新赋值 `iframe.src` → 视频从头加载
  - 现在：`seekTime` 变化 → `postMessage` 发送 `seekTo` + `playVideo` → 无缝跳转

---

## 待完成

### P1 - 核心体验
- [x] **字幕与视频时间同步**
  - `VideoPlayer.tsx`：iframe `onLoad` 后发送 `{"event":"listening"}` 订阅 YouTube 事件；监听 `infoDelivery` 消息获取 `currentTime`，节流到 1 次/秒
  - `TranscriptArea.tsx`：`activeIndex` 找到当前播放对应的字幕行；`activeItemRef` + `scrollIntoView` 自动滚动；高亮样式（violet 背景 + 加粗文字）；搜索时禁用自动滚动

### P2 - 留存优化
- [x] **历史记录 / Library 功能**
  - `prisma/schema.prisma`：新增 `video_history` model，`@@unique([userId, videoId])`
  - `api/history/upsert/route.ts`：POST，upsert 历史记录，`accessCount` 自增
  - `api/history/route.ts`：GET，返回最近 N 条记录（最多 20）
  - `lib/api.ts`：新增 `upsertHistory` / `getHistory` 方法
  - `workspace/page.tsx`：AI Summary 完成后 fire-and-forget 写入历史
  - `components/landing/RecentHistory.tsx`：历史卡片组件（缩略图 + 标题 + 时间 + 类型标签）
  - `components/landing/HeroSection.tsx`：登录用户在空状态下展示最近历史

- [x] **登录后首页改造**
  - 已登录用户在空状态区域看到最近分析/下载的视频列表
  - 未登录用户保持现有营销页面（RecentHistory 仅在 `user` 存在时渲染）

### P3 - 转化优化
- [x] **首次 AI Summary 免费**
  - `api/ai-summary/route.ts`：查询 `video_history` 中 `ai_summary` 记录数，为 0 则跳过积分检查和扣除
  - 新用户第一次体验无感知，后续正常扣 2 积分

- [x] **每日签到奖励更显眼**
  - `api/daily-reward/route.ts`：GET 查询状态（canClaim / streak / nextClaimAt），POST 领取（+3 积分，更新 streak）
  - `components/ui/DailyRewardButton.tsx`：可领取时显示脉冲金色按钮，已领取显示连续天数火焰，领取后闪绿色 "+3 Credits!"
  - `components/Header.tsx`：登录用户积分旁插入 DailyRewardButton
