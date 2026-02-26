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
- [ ] **历史记录 / Library 功能**
  - 用户下载/分析过的视频保存到数据库
  - 需要新增 Prisma model（`download_history` 表）
  - 登录后首页展示最近分析的视频列表

- [ ] **登录后首页改造**
  - 已登录用户看到个人 Dashboard（最近记录、积分状态）
  - 未登录用户保持现有营销页面

### P3 - 转化优化
- [ ] **首次 AI Summary 免费**
  - 新用户第一次使用 AI Summary 不扣积分
  - 让用户先体验价值，再引导付费
  - 涉及文件：`api/ai-summary/route.ts`、积分逻辑

- [ ] **每日签到奖励更显眼**
  - 当前签到入口不够突出，用户发现率低
