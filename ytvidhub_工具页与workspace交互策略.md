# YTVidHub 工具页与 Workspace 交互策略

更新时间：2026-05-08  
适用站点：`ytvidhub.com`  
对应源码目录：`/Users/anlizhaomidemac/Desktop/New project/ytvidhub`

---

## 1. 这份文档解决什么问题

这份文档只解决一个非常具体的问题：

> 你已经有 `workspace`，那 4 个 SEO 工具页到底应该怎么分工？  
> 用户在页面完成一步之后，下一步应该去哪里？  
> 哪些能力你现在已经有，哪些其实还没有？

这次不是抽象建议，而是按你当前源码真实状态整理出来的版本。

---

## 2. 先说结论

你现在最该做的，不是再做更多站，也不是把每个页面都重做成完整 mini app。

你现在最该做的是 3 件事：

1. 先把每个工具页的“主任务”定义清楚
2. 先把每个工具页完成任务后的“下一步功能”定义清楚
3. 先把页面文案、CTA、跳转路径和现有 workspace 能力对齐

一句话总结：

```text
工具页负责匹配搜索意图
workspace 负责承接结果、放大结果、推动付费
```

但这里要加一个现实前提：

```text
你现在大多数工具页并没有在当前页真正完成操作，
而是输入 URL 后跳到 workspace 执行。
```

所以你现在不该写一种“假装当前页已经有完整能力”的文档，而应该写一种：

```text
现阶段怎么承接
下一阶段补什么
为什么这样做
```

---

## 3. 当前代码的真实情况

这一段最重要，因为后面所有建议都必须基于真实代码，而不是想象中的产品。

### 3.1 4 个核心页当前状态

| 页面 | 当前状态 | 真实作用 |
| --- | --- | --- |
| `/youtube-subtitle-downloader/` | 更偏静态 SEO 页 | 讲下载场景，CTA 把人导到首页或 bulk 页 |
| `/youtube-transcript-generator/` | 有输入框，但输入后跳 `workspace` | transcript 工作流入口页 |
| `/youtube-subtitle-extractor/` | 有输入框，但输入后跳 `workspace` | extract / clean 工作流入口页 |
| `/bulk-youtube-subtitle-downloader/` | 更偏营销页 | 讲批量场景，真实批量执行在 workspace / API / history |

### 3.2 已确认存在的能力

这些能力是代码里真实有的，不是建议中的“未来功能”：

- 单视频字幕下载：`SRT / VTT / TXT`
- `Copy All`
- `AI Summary`
- `Study Cards`
- 翻译 / 双语字幕
- 批量处理
- ZIP 导出
- 历史记录
- 登录后继续
- credits / pricing 承接

### 3.3 已确认不存在或没有真正前台化的能力

这些是你现在“文案里可以暗示方向，但不能假装已经做完”的部分：

- `/youtube-subtitle-downloader/` 当前页直接输入 URL 并下载
- `/youtube-subtitle-downloader/` 当前页直接选 `SRT / VTT / TXT`
- `/youtube-transcript-generator/` 当前页直接生成并展示 transcript 结果
- `/youtube-subtitle-extractor/` 当前页直接展示 clean text 结果
- `/bulk-youtube-subtitle-downloader/` 当前页直接看到 batch 运行状态与结果

也就是说：

> 你真正强的能力现在主要都在 `workspace`，不是在各个 SEO 工具页首屏。

---

## 4. 关键源码依据

下面这些文件，是本次判断的主要依据：

- `src/app/[locale]/(main)/youtube-subtitle-downloader/page.tsx`
- `src/app/[locale]/(main)/youtube-transcript-generator/page.tsx`
- `src/app/[locale]/(main)/youtube-subtitle-extractor/page.tsx`
- `src/app/[locale]/(main)/bulk-youtube-subtitle-downloader/page.tsx`
- `src/app/[locale]/(main)/bulk-youtube-subtitle-downloader/BulkDownloaderClient.tsx`
- `src/app/[locale]/(workspace)/workspace/page.tsx`
- `src/components/transcript/TranscriptGeneratorHero.tsx`
- `src/components/subtitle/SubtitleExtractorHero.tsx`
- `src/components/workspace/QuickActions.tsx`
- `src/components/workspace/TranscriptArea.tsx`
- `src/components/workspace/SummaryArea.tsx`
- `src/components/workspace/TranslateModal.tsx`

其中几个关键事实：

### 4.1 transcript 页

`TranscriptGeneratorHero.tsx` 当前逻辑是：

```text
输入 URL
-> router.push('/workspace?urls=...&from=transcript-generator&mode=download')
```

所以它不是“当前页生成 transcript”，而是“把用户送进 transcript 执行流”。

### 4.2 extractor 页

`SubtitleExtractorHero.tsx` 当前逻辑是：

```text
输入 URL
-> router.push('/workspace?urls=...&from=subtitle-extractor&mode=download')
```

所以它不是“当前页完成提取”，而是“把用户送进 extract 执行流”。

### 4.3 subtitle downloader 页

`youtube-subtitle-downloader/page.tsx` 现在更像一篇强 SEO 的说明页。  
首个主要 CTA 是：

```text
Start Downloading Subtitles -> /
```

也就是回首页，不是当前页执行。

### 4.4 bulk 页

`BulkDownloaderClient.tsx` 当前更多是在卖“批量能力”的场景和价值。  
但真正的批量执行、批量历史、批量继续下载、批量额度逻辑，都在 `workspace` 和相关 hook / API 里。

---

## 5. 正确的产品分工

### 5.1 工具页负责什么

工具页负责 4 件事：

1. 精准命中一个搜索任务
2. 让用户立刻知道“这个页就是干这个的”
3. 把用户送进正确的执行路径
4. 在页面上明确告诉用户“完成这一步后你下一步可以做什么”

### 5.2 workspace 负责什么

workspace 负责 5 件事：

1. 真正执行字幕 / transcript / 批量逻辑
2. 生成结果
3. 提供二次处理能力
4. 保存历史和登录承接
5. 付费与额度升级

### 5.3 为什么不能全部跳 workspace

如果用户搜的是：

- `youtube subtitle downloader`
- `youtube transcript generator`
- `extract subtitles from youtube`

那他的心理预期是：

```text
我现在就要做这一步
```

如果一进来就是一个功能很多的大 workspace，会有 3 个问题：

1. SEO 承接会变弱
2. 首次理解成本会上升
3. 用户还没拿到结果，就被迫先理解系统

### 5.4 为什么也不能把所有功能都堆在工具页

如果你把每个 SEO 页都做成完整 mini app，也会有 4 个问题：

1. 首屏变重
2. 关键词意图变散
3. 页面边界混乱
4. 批量、历史、付费没有统一承接层

所以真正合理的结构不是二选一，而是：

```text
工具页先完成一个任务承诺
workspace 再承接更深一步
```

---

## 6. 4 个页面的角色与后续功能总表

这是你接下来最应该反复看的表。

| 页面 | 页面主任务 | 当前真实执行方式 | 完成第一步后最该接的功能 | 为什么是它 |
| --- | --- | --- | --- | --- |
| `/youtube-subtitle-downloader/` | 下载单个视频字幕 | 当前页不执行，导向首页 / workspace 路径 | `AI Summary` | 用户拿到字幕后最自然的问题是“这段内容讲了什么” |
| `/youtube-transcript-generator/` | 获取 transcript / 纯文本 | 当前页输入 URL，跳 `workspace` | `Study Cards` | transcript 用户更偏学习、整理、做笔记 |
| `/youtube-subtitle-extractor/` | 提取字幕文本并清洗 | 当前页输入 URL，跳 `workspace` | `Copy All / Export TXT` | extractor 用户首先是想“把文本拿出来” |
| `/bulk-youtube-subtitle-downloader/` | 批量提取 playlist / channel 字幕 | 场景页，真实执行在 workspace | `Batch History / ZIP Export` | bulk 用户最关心任务结果、打包导出、后续管理 |

---

## 7. 每个页面做完之后，下一步到底该接什么

这一章不是讲“页面关键词”，而是讲“用户完成动作之后的后续功能”。

### 7.1 `/youtube-subtitle-downloader/`

#### 页面角色

这是一个“单视频字幕下载”页。

#### 用户来这里时真正想完成的事

```text
把这个 YouTube 视频的字幕下载下来
```

#### 当前代码里真实发生的事

这个页本身还不是执行页，更像 SEO 说明页。

当前问题不在于“没有页面”，而在于：

- 页名是 downloader
- 但页内没有真正 downloader 操作区
- CTA 仍然把用户送去首页

#### 完成第一步后，最该接什么功能

主后续功能：

- `AI Summary`

次后续功能：

- `Copy All`
- `Translate / Bilingual Subtitle`
- `Open in Workspace`

#### 为什么主后续功能是 `AI Summary`

因为下载页用户完成下载后，最自然的问题通常不是“我要不要做 batch”，而是：

- 这段视频到底讲了什么？
- 我能不能快速看重点？
- 我能不能不用自己读完整段字幕？

`AI Summary` 正好能承接这个心理链路：

```text
下载字幕
-> 快速理解内容
-> 再决定是否保存、翻译、继续处理
```

#### 你现在没有的东西

这个页面现在没有：

- 当前页 URL 输入
- 当前页格式选择
- 当前页下载结果态
- 当前页下载成功后的结果页 CTA

#### 这页现在最应该怎么写

短期文案导向应该是：

```text
Download subtitle first
Then summarize, copy, or translate it in workspace
```

也就是说，这页不要再只说“下载”，而要说“下载之后你还能继续处理”。

---

### 7.2 `/youtube-transcript-generator/`

#### 页面角色

这是一个 transcript / text 工作流入口页。

#### 用户来这里时真正想完成的事

```text
拿到这段视频的可读文本
```

#### 当前代码里真实发生的事

这个页当前有输入框，但不是当前页出结果。

实际流程是：

```text
输入 URL
-> 跳到 /workspace
-> workspace 里拉 transcript
-> 结果出来后可继续处理
```

#### 完成第一步后，最该接什么功能

主后续功能：

- `Study Cards`

次后续功能：

- `AI Summary`
- `Copy / Export TXT`
- `Save to History`

#### 为什么主后续功能是 `Study Cards`

因为 transcript 用户和 download 用户不完全一样。

download 用户更偏“拿文件”。  
transcript 用户更偏：

- 阅读
- 学习
- 记录
- 提炼

而你的 `SummaryArea.tsx` 里已经有 `Study Cards` 逻辑，这个功能和 transcript 的关系是最顺的。

正确链路应该是：

```text
拿到 transcript
-> 先看摘要
-> 生成 Study Cards
-> 保存到 history
```

#### 这里要注意一个产品事实

`Study Cards` 不是 transcript 一拿到就直接出现的独立动作，它更像 summary 之后的进阶动作。

所以这页的正确表达不是：

```text
Generate transcript -> Generate study cards immediately
```

而应该是：

```text
Generate transcript
-> understand the content
-> turn it into study cards
```

#### 你现在没有的东西

这个页面现在没有：

- 当前页 transcript 结果区
- 当前页复制 transcript
- 当前页导出 transcript
- 当前页结果后的学习型引导块

#### 这页现在最应该怎么写

这页首屏和首屏下方说明，应该围绕这个任务链：

```text
Get transcript
Summarize it
Turn it into study cards
```

不要只强调“多格式导出”，因为那会把它和 `subtitle downloader` 的边界打散。

---

### 7.3 `/youtube-subtitle-extractor/`

#### 页面角色

这是一个“提取字幕文本 / 清洗文本”的入口页。

#### 用户来这里时真正想完成的事

```text
先把字幕文本拿出来
```

#### 当前代码里真实发生的事

这个页当前也不是当前页直接出结果，而是：

```text
输入 URL
-> 跳到 /workspace
-> 在 transcript / download 流程里继续处理
```

#### 完成第一步后，最该接什么功能

主后续功能：

- `Copy All / Export TXT`

次后续功能：

- `Translate / Bilingual Subtitle`
- `AI Summary`
- `Open in Workspace`

#### 为什么主后续功能是 `Copy All / Export TXT`

因为 extractor 用户的最核心需求不是“管理很多任务”，而是：

- 先拿到干净文本
- 复制出来
- 导出去
- 用到自己的工作流里

这个页面的典型任务链应该是：

```text
Extract subtitles
-> copy text
-> export TXT
-> translate or summarize
```

#### 你现在没有的东西

这个页面现在没有：

- 当前页直接显示 extracted text
- 当前页直接复制
- 当前页直接导出 TXT
- 当前页结果态里的“下一步处理区”

#### 这页现在最应该怎么写

这个页不要再讲得太像 bulk，也不要太像 transcript。

它应该明确强调的是：

```text
提取
清洗
复制
导出
```

也就是“先拿出来，再处理”。

---

### 7.4 `/bulk-youtube-subtitle-downloader/`

#### 页面角色

这是 playlist / channel / multi-url 批量页。

#### 用户来这里时真正想完成的事

```text
一次性处理很多视频字幕
```

#### 当前代码里真实发生的事

这页更像价值说明页，而不是一个当前页就能实时查看 batch 结果的强执行页。

真实 bulk 能力主要在：

- batch submit
- batch resume
- batch history
- batch credit gating
- ZIP download
- workspace batch view

#### 完成第一步后，最该接什么功能

主后续功能：

- `Batch History / ZIP Export`

次后续功能：

- `Re-open Batch in Workspace`
- `Upgrade for Larger Batch`
- `Convert All to Clean TXT`

#### 为什么主后续功能是 `Batch History / ZIP Export`

bulk 用户的关注点和单视频用户完全不同。

他们最关心的是：

- 这批跑完了吗？
- 哪些成功了？
- 我能不能一键导出？
- 我还能不能回来继续？
- 我额度够不够？

所以这页的后续功能必须偏“任务管理”，而不是偏“内容理解”。

正确链路应该是：

```text
提交批量任务
-> 查看 batch 进度 / 历史
-> 下载 ZIP
-> 不够再升级 credits
```

#### 你现在没有的东西

这个页面现在没有真正前台化的：

- 当前页 batch 输入并实时跑任务
- 当前页任务完成态
- 当前页 ZIP 完成态
- 当前页历史记录面板

#### 这页现在最应该怎么写

这个页应该围绕“批量任务完成后的管理能力”来写，而不是只写“我们支持 playlist / channel”。

---

## 8. 你现在真正缺的，不是更多功能，而是页面级任务链表达

你现在的问题不是：

```text
没有能力
```

而是：

```text
能力主要在 workspace
但页面没有把“做完这一步后下一步是什么”说清楚
```

所以当前卡点主要有 4 个：

1. 页面关键词和页面任务没有完全对齐
2. 页面 CTA 和真实执行路径没有完全对齐
3. 页面完成第一步后的下一步功能没有被明确表达
4. 页面与 workspace 之间没有形成“任务链”

---

## 9. 4 个页面短期应该怎么改

这一章只讲短期，不讲大重构。

### 9.1 先做“表达改造”，不是先做“功能重构”

优先级最高的是：

1. 让每个页面只讲一个主任务
2. 让每个页面只主推一个后续功能
3. 让 CTA 文案体现任务链
4. 让页面里的 related tools / secondary CTA 体现下一步路径

### 9.2 每页只保留一个“主后续动作”

| 页面 | 主后续动作 |
| --- | --- |
| `/youtube-subtitle-downloader/` | `AI Summary` |
| `/youtube-transcript-generator/` | `Study Cards` |
| `/youtube-subtitle-extractor/` | `Copy All / Export TXT` |
| `/bulk-youtube-subtitle-downloader/` | `Batch History / ZIP Export` |

这一步非常关键。

因为如果你一个页面同时推：

- summary
- translate
- study cards
- history
- batch
- pricing

那页面虽然“功能很多”，但用户不会觉得清晰，Google 也更难理解这个页面到底重点回答什么任务。

### 9.3 CTA 文案的方向

你现在很多 CTA 还是功能名式的，比如：

- Start Downloading
- Generate Transcript
- Extract Subtitle

这些不算错，但不够把“后续动作”讲清楚。

你应该逐渐把部分文案改成任务链表达：

#### downloader 页

```text
Download subtitles
Then summarize in workspace
```

#### transcript 页

```text
Generate transcript
Then turn it into study cards
```

#### extractor 页

```text
Extract subtitle text
Then copy or export clean TXT
```

#### bulk 页

```text
Run batch extraction
Then manage history and download ZIP
```

---

## 10. 中期再补什么功能

当你把表达理顺以后，再进入中期补能力。

### 第一优先级

- 给 `/youtube-subtitle-downloader/` 做一个真正可执行的轻下载区
- 给 `/youtube-transcript-generator/` 做一个轻结果预览区
- 给 `/youtube-subtitle-extractor/` 做一个轻文本预览区

### 第二优先级

- 结果页里增加明确“下一步动作卡片”
- 按页面类型展示不同 secondary CTA

### 第三优先级

- 把部分 workspace 的结果态回嵌到工具页
- 做成“当前页完成第一步，workspace 完成第二步”的结构

---

## 11. 当前最推荐的执行顺序

不要同时动 4 个方向，按这个顺序来：

### 第 1 步：先改页面定位

目标：

- downloader 页只讲下载
- transcript 页只讲 transcript
- extractor 页只讲提取与 clean text
- bulk 页只讲批量

### 第 2 步：先改页面文案与 CTA

目标：

- 每个页面只推 1 个主后续动作
- 页面内明确“做完第一步之后的下一步”

### 第 3 步：再补轻量结果态

目标：

- 至少让用户在当前页看到“任务已开始”或“你将进入哪个工作流”

### 第 4 步：最后再补完整执行能力

目标：

- 只把最关键的一步能力搬回页面
- 不要把整个 workspace 复制到页面

---

## 12. 最后给你的底层判断

如果你问：

> 我是不是应该让所有用户都直接跳 workspace？

我的答案是：

```text
不是。
```

如果你问：

> 我是不是应该把每个页面都做成完整工具？

我的答案也是：

```text
也不是。
```

真正适合你现在阶段的方式是：

```text
页面承接搜索任务
页面说清后续一步
workspace 接住更深处理
```

你现在最需要补上的，不是更多功能，而是：

```text
页面任务 -> workspace 后续功能
这条链路的清晰度
```

这会直接影响三件事：

1. 内页点击率
2. 用户继续操作率
3. 付费前的产品理解成本

---

## 13. 这份文档对应的最终落地原则

后续你做工具页时，都用这个标准判断：

### 能留在工具页的

- 用户搜索时最想立刻完成的那一步
- 单步、低门槛、立即看到结果的动作

### 应该放到 workspace 的

- 下载后的进一步处理
- transcript 后的学习和总结
- 批量任务管理
- 历史、登录、额度、付费

最终原则：

```text
工具页负责“先帮用户赢一次”
workspace 负责“把这次结果继续放大”
```

