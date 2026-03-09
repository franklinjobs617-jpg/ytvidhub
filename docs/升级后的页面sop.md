升级版的页面生成SOP--2025/10/27--执行效率不错
针对写google seo友好的英文页面，为了能够写出来质量高的seo页面，我应该怎么提供提示词给你。
尤其是要精确到一些细节问题。例如title多少字符，description是多少字，怎么去ai化，更EEAT等。请告诉我通用的提示词模板。经过此提示词模板我的on page seo至少能得到个95分。
另外，提示词中需要增加对页面输出的要求。我明确如下，请你整合到提示词输出要求。
1. 预留人工介入的一些内容描述，尽量保证有30%的人工介入部分；
2. 给出文章内图片的描述，AI制图提示词
3. 给出第二部的图片的英文seo name, alt 信息。

输入内容：
Target Primary Keyword (TPK) - 核心目标关键词--您研究后确定的那个极长尾、低竞争度的关键词
Target Secondary Keywords (TSKs) - 次级关键词--2-4 个与 TPK 紧密相关，但意图略有不同的长尾词（最好是 KD 更低的词）。
Target User Intent - 目标用户意图--一个简短的描述，说明搜索该词的用户处于哪个阶段（查找信息、比较产品、还是准备购买）。
Target Domain Context - 目标网站背景--您的网站的主题、当前在 Google 眼中的“权威性”（可以估算一个 DA/DR 范围），以及您正在推广的工具/产品（如 ytvidhub）。
步骤0：输入关键词并生成SEO战略蓝图构建需要的高质量的输入信息
我需要输入的内容

## 自动生成 SEO 战略蓝图所需输入

请分析我提供的关键词数据和网站背景，自动生成一份高质量的【步骤一 输入条件】（TPK, TSKs, Intent, Context）。

---
**[我的输入数据]**

**1. 原始关键词数据来源和描述:**
[请简述您提供的附件中的关键词数据（例如：附件中包含了约10个低搜索量的长尾词，其中包含 "playlist subtitle download" 和 "youtube subtitle api" 等）。]

**2. 网站背景和推广焦点 (Website/Product Focus):**
[请提供当前网站的**最新状态**和您希望**强调的专业点**。例如：YTVidHub 是一个面向研究人员的新站 (DR<15)，当前重点是推广其“Clean VTT”功能，并即将上线“Playlist/Channel”批量下载功能。]

**3. 竞争对手信息参考 (Competitor Reference - Optional):**
[请填写您主要对标的竞品（如 Notegpt）的特点，例如：Notegpt 强在通用 AI 摘要，我们在字幕领域需要更强的技术深度 E-E-A-T。]
---

**【AI 输出要求】**

请根据以上信息，输出一个结构化的 JSON 或列表，内容必须精确对应以下四个项目，作为我下一步运行【SEO 战略蓝图构建】的输入：

1. Target Primary Keyword (TPK)
2. Target Secondary Keywords (TSKs) (列表形式)
3. Target User Intent
4. Target Domain Context

步骤一：【SEO 战略蓝图构建】（Run Once）
目的： 定义页面的 SEO 骨架、用户意图、E-E-A-T 锚点和输出规范。
# SEO On-Page Strategy Blueprint Generator

**【角色设定】**
You are a **Top-Tier SEO Content Strategist and Conversion Rate Optimization (CRO) Expert** specializing in ranking on Google. Your output will serve as the **master blueprint** for generating a high-ranking, E-E-A-T-driven English article.

**【输入数据】**
* **Target Primary Keyword (TPK):** [e.g., "How to convert YouTube video to blog post using ytvidhub"]
* **Target Secondary Keywords (TSKs) (Min 3):** [e.g., "ytvidhub accuracy feedback", "quick video to text converter", "YouTube content repurposing"]
* **Target User Intent:** [e.g., Informational, Step-by-Step Tutorial]
* **Target Domain Authority (DA/DR):** [e.g., New Site/Low Authority (0-20)]

**【严格的输出要求 - Blueprint Specifications】**

Please output the following analysis in **English** only, using **Markdown** formatting.

## 1. Core SEO & Length Specifications
* **Target Title Tag Length:** Maximum 55-60 characters. Must contain TPK.
* **Target Meta Description Length:** Maximum 150-160 characters. Must summarize value and include TPK/TSKs.
* **Target Word Count Range:** 1800 - 2200 words (To ensure comprehensive coverage for a competitive informational topic).

## 2. E-E-A-T & Anti-AI Flavor Directives
* **E-E-A-T Injection Points (Identify 3 Critical Areas):** List 3 specific sections where **first-hand experience/unique data** is *absolutely* necessary.
    * *Area 1:* [Specific focus, e.g., Real-world transcription test results]
    * *Area 2:* [Specific focus, e.g., A unique troubleshooting tip not found elsewhere]
    * *Area 3:* [Specific focus, e.g., A critical analysis of a competitor's feature]
* **Anti-AI Flavor Instructions:** List 3 forbidden phrases/clichés to avoid, AND suggest a more natural/human tone (e.g., "Use active voice," "Incorporate relatable analogies").

## 3. Content Structure & Visuals Blueprint
* **Required H2 Headings (Min 5):** Outline the main H2 structure that naturally covers TPK and TSKs.
* **Image Integration Plan:** Specify the **minimum number of required images (Min 4)** and the **concept** for each placeholder.

## 4. Manual Content Reservation (The 30% Human Input)
For the content sections identified in Section 2, define exactly what **YOU (the human)** must insert to elevate the piece:
* **Manual Content Block 1 (E-E-A-T):** *Required Content Type:* [e.g., A short paragraph sharing a personal 5-minute win using the tool.]
* **Manual Content Block 2 (Visual Proof):** *Required Content Type:* [e.g., A screenshot of a specific setting in the tool.]
* **Manual Content Block 3 (Critical Opinion):** *Required Content Type:* [e.g., A direct comparison critique against a key competitor.]
步骤二：【SEO 优化内容生成与整合】（Run Second）
目的： 根据步骤一的蓝图，生成一篇**“可编辑的、高分 SEO 初稿”**，并严格预留人工和图片SEO位置。
注意：需要增加两部分内容，强调输出：
1. 输出英文页面的html代码（如不特殊强调，那么就是输出英文页面）；
2. 在内容输出中，涉及到人工介入的图片或者观点，请给出描述和内容生成的提示词。

# 📝 Final Production HTML Generation Prompt (Universal Template)

**【指令核心】**
Your task is to act as an **Expert Web Developer and SEO Content Writer**. Based *only* on the strategic context provided in the **[INPUT CONTEXT]** section below, you **MUST** generate the **FULL, PRODUCTION-READY, SEMANTIC HTML5 CODE** for the target English article.

**【输入上下文 (INPUT CONTEXT)】**
* **Target Primary Keyword (TPK):** [PASTE_TPK_HERE]
* **Target Secondary Keywords (TSKs):** [PASTE_TSK_LIST_HERE]
* **Target User Intent:** [PASTE_INTENT_HERE, e.g., Informational / Transactional / Guide]
* **E-E-A-T Goal & Required Content Areas:** [PASTE_E_E_A_T_AREAS_AND_IMAGE_CONCEPTS_HERE]
* **Tone Directive:** [PASTE_HUMAN_TONE_DIRECTIVES_HERE, e.g., Enthusiastic, non-AI, conversational.]

**【严格的输出要求 - HTML Generation Mandate】**

1.  **Output Format:** **MUST** be a single, complete Markdown code block containing ONLY the HTML code and essential structure. **NO outside explanation or text.**
2.  **Semantic HTML:** Use correct HTML5 structure (`<article>`, `<section>`, `<h2>`, `<h3>`, etc.).
3.  **Keyword Density:** Integrate TPK and TSKs naturally, adhering to the length specifications outlined in the previous Blueprint step (which you must reference mentally).
4.  **Human Intervention Marking (Crucial):** All locations requiring specific human input (text drafts, finalized images, unique screenshots) **MUST** be marked with clear, standardized HTML comments **directly preceding** the content placeholder.

---

## HTML Content Generation Structure

```html
<article>
    <title>[GENERATED_TITLE_BASED_ON_TPK_AND_LENGTH_SPEC]</title>
    <meta name="description" content="[GENERATED_META_DESCRIPTION_BASED_ON_VALUE_PROP_AND_TSKS]">
    <h1>[GENERATED_H1_USING_TPK]</h1>

    <p>[Introductory paragraph adhering to human tone directive.]</p>

    <figure>
        <img src="[IMAGE_URL_1_TO_BE_REPLACED]" 
             alt="[GENERATED_ALT_TEXT_FOR_IMAGE_1]" 
             title="[GENERATED_SEO_FILENAME_FOR_IMAGE_1]">
        <figcaption>[Caption placeholder.]</figcaption>
    </figure>

    <section>
        <h2>[H2_SECTION_TITLE_1_COVERING_TPK]</h2>
        <p>[Content body text.]</p>

        <section id="manual-injection-EET-1">
            <h3>[H3_TITLE_RELATED_TO_EET_1]</h3>
            <p><strong>[INSERT_DRAFT_TEXT_A_HERE]</strong></p> 
            <p><em>Placeholder note: This section MUST be replaced with a candid, personal insight or unique finding (Draft A).</em></p>
        </section>
        <h2>[H2_SECTION_TITLE_2]</h2>
        <figure>
            <img src="[IMAGE_URL_2_TO_BE_REPLACED]" 
                 alt="[GENERATED_ALT_TEXT_FOR_IMAGE_2]" 
                 title="[GENERATED_SEO_FILENAME_FOR_IMAGE_2]">
            <figcaption>[Caption placeholder.]</figcaption>
        </figure>
        
        <section id="manual-injection-PROOF-2">
            <h2>The Proof: Checking Our Claims</h2>
            <p><strong>[INSERT_IMAGE_PLACEHOLDER_2]</strong></p> 
            <p><strong>[INSERT_DRAFT_TEXT_B_EXPLANATION_HERE]</strong></p> 
            <p><em>Placeholder note: This requires inserting a screenshot/test result and an explanation linking it to the tool's unique selling proposition.</em></p>
        </section>
        <section id="manual-injection-ANALYSIS-3">
            <h2>Industry Deep Dive: What The Competition Misses</h2>
            <p><strong>[INSERT_DRAFT_TEXT_C_HERE]</strong></p> 
            <p><em>Placeholder note: This must be replaced with a candid, comparative critique (Draft C) to establish authority.</em></p>
        </section>
        </section>

    <section>
        <h2>Ready to Get Started?</h2>
        <p>[Concluding summary paragraph.]</p>
        <p class="cta-button"><a href="[PRIMARY_CTA_LINK]">[PRIMARY_CTA_TEXT]</a></p>
        <p class="cta-secondary"><a href="[SECONDARY_CTA_LINK]">Or, try our related tool/resource here.</a></p>
    </section>

</article>

# 🛠️ HUMAN INPUT INSTRUCTION GUIDE (FOR EDITOR ONLY)

**INSTRUCTIONS:** The editor must now generate the Draft Text for Areas A, B, and C based on the E-E-A-T goals from the Blueprint, ensuring the tone is conversational and genuine. This guide provides the final prompts and structure needed for the human team to fill the HTML placeholders.

## Manual Input Element 1 (Area A: Expertise/Experience)

* **Required Content Type:** A short, unique personal story or unique observation related to the TPK topic.
* **Content Drafting Prompt:** "Write a **candid, short (under 100 words) narrative** about a personal experience related to this topic. Avoid technical jargon. Start the text with an emotionally relatable hook. **Example Style:** 'I used to think X was hard, but then I discovered Y...'"
* **Placeholder Location:** `[INSERT_DRAFT_TEXT_A_HERE]`

## Manual Input Element 2 (Area B: Visual Proof/Technical Edge)

* **Required Content Type:** A unique screenshot or specific diagram proving a technical claim or feature.
* **Content Drafting Prompt (Text Explanation):** "Write a **short, confident explanation (under 60 words)** accompanying the screenshot you will insert. This text must explain why this specific visual element is crucial for the user's success and how it proves your site’s technical edge."
* **Image Generation Prompt (If applicable):** "Generate a [**Style**, e.g., Clean Diagram/Realistic Photo] showing [**Detailed visual description based on the E-E-A-T Goal**]."
* **SEO Metadata Prompt:** "Suggest an **SEO File Name** (e.g., `tip-1-screenshot.png`) and a descriptive **Alt Text** that includes one relevant TSK."
* **Placeholder Location:** `[INSERT_DRAFT_TEXT_B_EXPLANATION_HERE]` and `[INSERT_IMAGE_PLACEHOLDER_2]`

## Manual Input Element 3 (Area C: Critical Analysis/Comparison)

* **Required Content Type:** A direct, well-reasoned critique comparing your solution/topic against a common alternative or competitor.
* **Content Drafting Prompt:** "Write a **balanced but firm critique (approx. 100 words)** comparing the standard way of doing this vs. your recommended approach. Use active voice. Acknowledge the standard method briefly, but strongly advocate for your method's superiority based on [**Referenced E-E-A-T Goal**]."
* **Placeholder Location:** `[INSERT_DRAFT_TEXT_C_HERE]`

根据关键词（长尾）推测搜索意图并生成含人工介入的页面提示词 2025/10/23
从关键词到搜索意图的解读与输出
目的： 确定核心意图，提取子主题，并明确人工需要验证和填充的独特洞察点。
# SEO 内容意图分析与人工蓝图构建模块

**【角色设定】**
你是一位资深的 **SERP 分析专家**和 **内容架构师**。你的任务是深度剖析搜索意图，并为后续的内容创作提供**结构化蓝图**，同时**明确标识**需要注入**“第一手经验”**的位置。

**【输入数据】**
* **核心目标关键词 (Primary Keyword):** [在此处填入您的目标 KD=8 关键词]
* **目标网站/领域：** [例如：ytvidhub.com，专注于 YouTube 内容的垂直 SEO 工具]
* **目标受众画像：** [例如：时间紧张的博主/营销人员，需要简单、步骤清晰的指南]

**【严格的输出要求】**

请严格按照以下**三个部分**的结构化格式输出分析结果。**请使用英文进行分析和总结**，确保分析的专业性。

## 1. 核心搜索意图剖析 (Core Intent Analysis)
* **Search Intent Classification:** (判断是 Informational, Commercial Investigation, 还是 Transactional)
* **User's Pain Point:** (用户搜索此词时最核心的未被解决的痛点是什么？)
* **Expected Output Type:** (Google 最可能展示给用户的是什么类型的内容？)

## 2. 支撑性长尾子主题 (Supporting Sub-Topics)
请基于上述意图，列出 **4 到 6 个** 必须在文章中得到解答的**细分子问题**。
* **Sub-Topic 1:** [问题陈述]
* **Sub-Topic 2:** [问题陈述]
* **Sub-Topic 3:** [问题陈述]
* **Sub-Topic 4:** [问题陈述]

## 3. **人工经验注入点 (Manual Experience Injection Points)** ⚠️ **(重点)**
请识别出文章中**最需要“第一手经验”来提升 E-E-A-T** 的 2-3 个关键环节，并明确指示我需要填补的内容类型。
* **Injection Point A (针对准确性/质量):** * **建议内容类型:** [例如：关于转写准确率，我需要提供**3个真实测试案例**的数据反馈。]
    * **SEO 目的:** [例如：增加可信度，回答 KD=3 子关键词]
* **Injection Point B (针对步骤/UI):** * **建议内容类型:** [例如：关于工具界面操作，我需要提供**3张我亲自截取的、带有高亮标记的最新版截图**。]
    * **SEO 目的:** [例如：提高用户体验，覆盖“截图教程”的意图]
* **Injection Point C (针对结论/对比):** * **建议内容类型:** [例如：关于竞品对比，我需要提供一个**我个人对某功能的“负面/批判性”看法**。]
    * **SEO 目的:** [例如：打破 AI 的中立语调，展现专家观点]
继承上一步的对搜索意图的拆解，生成含人工介入的页面产出
目的： 生成初稿，并明确标记出**等待人工内容（经验、图片、独特观点）**的占位符。
# SEO 优化内容生成与人工整合模块

**【角色设定】**
你是一位**资深博主和技术测评师**。你的写作风格必须是**直接、犀利、充满实战洞察**的**英文**。**严禁**使用任何“AI 陈词滥调”和过于平滑的过渡语。你的输出应像一篇**由真实专家撰写**的、**等待最终编辑**的初稿。

**【输入数据 - 必须参考步骤一的分析结果】**
* **核心目标关键词 (Primary Keyword):** [粘贴步骤一中的 Primary Keyword]
* **子主题与结构要求 (Structure Input):** [粘贴步骤一中 "2. 支撑性长尾子主题" 的所有内容]
* **人工经验注入点 (Manual Injection Plan):** [粘贴步骤一中 "3. 人工经验注入点" 的所有内容]

**【严格的输出要求】**

请严格按照以下**五大板块**结构生成最终文章。**请在需要人工内容的地方，使用明确的占位符。**

## 1. 吸引人的标题和导语 (Title & Hook)
* **H1 Title:** 必须包含 Primary Keyword，目标是提高点击率 (CTR)。
* **Opening Paragraph:** 立即解决核心痛点，前 100 字内**自然地**融入 Primary Keyword。**语气必须是第一人称（I/We）**，体现出实战经验。

## 2. 核心内容 - 结构化指南 (The Main Body)
* 使用 H2 作为主要阶段划分。使用 H3 来解答步骤一中提炼出的**“支撑性子主题”**。
* **关键词自然布局：** 确保所有关键词自然融入。

## 3. **经验注入与图片占位符 (E-E-A-T Injection & Image Placeholders)** ⚠️ **(重点)**
请根据**“人工经验注入点”**规划，在文章中**预留以下占位符**，等待您在人工编辑阶段插入真实内容：

* **[MANUAL_INSERT_A: 准确率测试数据和反馈]**
    * **建议替换内容:** [您在 Injection Point A 准备的 3 个真实测试案例数据。]
* **[MANUAL_INSERT_B: 界面截图与操作标记]**
    * **建议替换内容:** [您在 Injection Point B 准备的 3 张最新截图。]

**请在文章中与占位符位置最匹配的地方，预留 3 处图片占位符，并按要求输出其 SEO 信息：**

> **[IMAGE_PLACEHOLDER: 描述此图将被替换成的截图内容]**
> **Image SEO Name:** [AI 建议的 SEO 名称，例如：ytvidhub-screenshot-for-accuracy-test]
> **Image Alt Text:** [AI 建议的 Alt Text，应包含一个次级关键词]

## 4. 进阶技巧/PMF 验证点 (Expert Insight)
* 插入一个专门的板块，**引导用户对订阅服务的需求**。
* 在此板块中，**明确提及**您计划在**Injection Point C** 处加入的**批判性观点**，引导读者期待您的后续文章或使用您的工具。

## 5. 结论与行动号召 (Conclusion & CTA)
* 用专业、直接的语气总结文章价值（**避免任何总结性套话**）。
* **Call-to-Action (CTA):** 明确引导，例如：“Ready to bypass the generic advice? Try our tool’s advanced features here [Link]”。

终版的提示词
# 网站搭建 AI 提示词（通用优化版）

## 阶段一提示词：网站结构规划与内容布局（战略拆解阶段）

**【阶段一提示词：自然语言到网站结构规划】**

### 一、项目与战略输入（仅限自然语言描述）

请分析以下关于新网站项目的**自然语言描述**。你必须从中精准提炼出所有关键要素：核心关键词、目标域名、目标流量国家/地区、网站的核心功能和主要用户搜索意图。

**[请将您的自然语言描述粘贴在此处。例如：]**
> *“我购买了域名 `ambigramgenerator.me`，计划围绕核心关键词 `ambigram generator` 进行开发。流量主要集中在 **US**，其次是 **PH, IN, UK, ID**。网站需要提供一个在线工具，让用户可以输入文字，一键生成颠倒文字图（Ambigram），并提供不同风格的下载选项。我的目标是获取好的 SEO 排名，重点解决用户‘立即创建’的需求。”*

### 二、核心要素提炼与解读（AI 自动输出）

请基于上面的描述，**结构化**输出以下关键要素：

1.  **网站域名：**
2.  **核心关键词 (H1/H2 主题)：**
3.  **目标网站语言 (Language)：** [默认：English；可填写：中文, Spanish 等]
4.  **目标流量区域/本地化重点：**
5.  **网站核心功能（针对搜索意图）：** [请描述网站必须具备的**最主要功能**以解决用户的核心需求]

### 三、网站结构与 E-E-A-T 规划（战略输出）

请基于上述提炼的核心关键词、搜索意图和功能要求，设计网站的**内容集群结构**，并输出以下三个表格：

1.  **内容集群结构图（文本描述）：** 描述主页（Home Page）作为核心支柱（Pillar），如何通过内部链接连接到各个子页面（Topic Cluster）。
2.  **网站分阶段建设页面列表：** 划分出网站的**核心基础页面（阶段 1/P0/P1 优先建设）**和**扩展主题页面（阶段 2 建设）**。
3.  **核心页面结构与 E-E-A-T 规划表：**

| 页面定位 (Page Type) | URL 路径 | H1/Title 核心关键词 | E-E-A-T 侧重 | 价值提供/内容模块（**硬性要求**） |
| :--- | :--- | :--- | :--- | :--- |
| **核心工具** (Tool) | `/generator/` | `[核心关键词]` | **[请明确说明侧重哪个 E-E-A-T 支柱]** | **【工具功能】** 必须包含：**用户自定义/输入功能** + **核心导出/下载功能** + FAQ |
| **核心知识支柱** (Pillar) | `/what-is/` | `[核心关键词]` | **[请明确说明侧重哪个 E-E-A-T 支柱]** | **【GEO模块】** 必须包含：针对**目标流量区域**的本地化内容/案例 + How-To/指南 + FAQ |
| **主题扩展 1** (Cluster) | `/topic-a/` | `[长尾关键词]` | **[请明确说明侧重哪个 E-E-A-T 支柱]** | **【SEO优化】** 必须包含：长尾关键词布局 + 详细 H2/H3 结构 + FAQ |
| **主题扩展 2** (Cluster) | `/topic-b/` | `[长尾关键词]` | **[请明确说明侧重哪个 E-E-A-T 支柱]** | **【用户体验】** 必须包含：详细使用教程/指南 + FAQ |




## 阶段二提示词：高标准页面生成（执行阶段）

**【阶段二提示词：高标准页面生成】**

### 一、内容生成与表达的严格要求（质量控制）

1.  **目标语言与去 AI 味表达：** 内容生成和表达必须严格使用目标语言（如 English），并**去除所有 AI 痕迹**。请采用自然、流畅、专业且权威的语气，专注于为用户提供实际价值。
2.  **内容饱满度：** 核心内容深度需**至少达到 1000 词**，通过详细的 H2/H3 结构进行拆分。

### 二、目标页面信息（基于阶段一的输入）

请根据以下表格中提供的页面结构和 E-E-A-T 规划，生成 HTML 文件。

| 页面定位 | URL 路径 | H1/Title 核心关键词 | E-E-A-T 侧重 | 价值提供/内容模块 | Title 限制 | Description 限制 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **[请粘贴阶段一表格中的某一页面行]** | **[请粘贴阶段一表格中的某一页面行]** | **[请粘贴阶段一表格中的某一页面行]** | **[请粘贴阶段一表格中的某一页面行]** | **[请粘贴阶段一表格中的某一页面行]** | **[50-60 字符]** | **[140-160 字符]** |

### 三、页面结构与 SEO 硬性要求（目标 On-Page SEO 得分 ≥ 90/100）

1.  **Header/Footer 结构：** 必须包含**完整的 Header 和 Footer** 组件，并包含内部链接：[请列出 Header/Footer 中需包含的链接]。
2.  **On-Page SEO 细节：** 严格遵循 **Title 50-60 字符**和 **Description 140-160 字符**的限制。
3.  **图片与媒体 SEO 优化：** 必须为所有图片和媒体**生成描述性的 `alt` 属性**，并合理嵌入长尾关键词。
4.  **GEO/E-E-A-T 落实：** 必须在页面中实现以下模块（并进行相应的 HTML 结构优化，例如 `<ul class="list-disc">` 或 **FAQ Schema 准备**）：
    * **[请明确列出该页面所需的 How-To/指南、FAQ、专家背书、技术原理、自定义工具等所有模块]**
5.  **性能优化考量：** HTML 结构设计应考虑加载速度和移动友好性，例如优化关键路径 CSS，以确保 **Lighthouse 性能指标**的良好得分。

### 最终输出要求：

请直接输出整合所有 HTML、CSS/Tailwind 配置、Header/Footer 以及所有深度内容模块的**最终完整 HTML 文件代码**。