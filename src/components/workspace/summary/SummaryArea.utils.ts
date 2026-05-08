// 学习卡片缓存
export const cardsCache = new Map<string, StudyCard[]>();

export interface StudyCard {
  question: string;
  answer: string;
  type: "concept" | "definition" | "insight" | "action" | string;
  category?: string;
  time?: string;
}

// Parse complete card blocks from streamed text
export function extractCards(
  text: string,
  isFinal = false,
): { cards: StudyCard[]; remaining: string } {
  const cards: StudyCard[] = [];
  const blockRegex = /---\n([\s\S]*?)\n---/g;
  let match;
  let lastIndex = 0;

  while ((match = blockRegex.exec(text)) !== null) {
    const card = parseCardBlock(match[1]);
    if (card) cards.push(card);
    lastIndex = match.index + match[0].length;
  }

  return { cards, remaining: lastIndex > 0 ? text.substring(lastIndex) : text };
}

export function parseCardBlock(block: string): StudyCard | null {
  const card: Partial<StudyCard> = {};
  for (const line of block.split("\n")) {
    if (line.startsWith("Q: ")) card.question = line.substring(3).trim();
    else if (line.startsWith("A: ")) card.answer = line.substring(3).trim();
    else if (line.startsWith("Type: ")) card.type = line.substring(6).trim();
    else if (line.startsWith("Category: "))
      card.category = line.substring(10).trim();
    else if (line.startsWith("T: ") && line.substring(3).trim() !== "null")
      card.time = line.substring(3).trim();
  }
  if (!card.question || !card.answer) return null;
  return card as StudyCard;
}

// 获取类型信息的辅助函数 - NotebookLM简洁风格
export function getTypeInfo(type: string) {
  switch (type) {
    case "concept":
      return {
        icon: "●",
        label: "Concept",
        bg: "bg-blue-50",
        text: "text-blue-700",
        bgHover: "bg-blue-100",
        bgActive: "bg-blue-600",
        textActive: "text-white",
      };
    case "definition":
      return {
        icon: "◆",
        label: "Definition",
        bg: "bg-green-50",
        text: "text-green-700",
        bgHover: "bg-green-100",
        bgActive: "bg-green-600",
        textActive: "text-white",
      };
    case "insight":
      return {
        icon: "◐",
        label: "Insight",
        bg: "bg-blue-50",
        text: "text-blue-700",
        bgHover: "bg-blue-100",
        bgActive: "bg-blue-600",
        textActive: "text-white",
      };
    case "action":
      return {
        icon: "▶",
        label: "Action",
        bg: "bg-orange-50",
        text: "text-orange-700",
        bgHover: "bg-orange-100",
        bgActive: "bg-orange-600",
        textActive: "text-white",
      };
    default:
      return {
        icon: "○",
        label: "General",
        bg: "bg-slate-50",
        text: "text-slate-700",
        bgHover: "bg-slate-100",
        bgActive: "bg-slate-600",
        textActive: "text-white",
      };
  }
}

// 格式化数据用于PDF导出
export function formatDataForPDF(data: string): string {
  if (!data) return "";

  // 转换Markdown格式为HTML
  let html = data
    // 标题
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // 斜体
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // 换行
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");

  // 处理卡片格式
  if (data.includes("---START_CARDS---")) {
    const parts = data.split("---START_CARDS---");
    const summary = parts[0];
    const cardsSection = parts[1] || "";

    let cardsHtml = "";
    const cardBlocks = cardsSection
      .split(/\n---\n/)
      .filter((block) => block.trim());

    cardBlocks.forEach((block: string, index: number) => {
      const lines = block.split("\n").filter((line) => line.trim());
      let question = "",
        answer = "",
        time = "";

      lines.forEach((line: string) => {
        if (line.startsWith("Q: ")) question = line.substring(3);
        if (line.startsWith("A: ")) answer = line.substring(3);
        if (line.startsWith("T: ")) time = line.substring(3);
      });

      if (question && answer) {
        cardsHtml += `
          <div class="card">
            <div class="question">Q${index + 1}: ${question}</div>
            <div class="answer">${answer}</div>
            ${time ? `<div style="font-size: 0.9em; color: #6b7280; margin-top: 0.5em;">⏱️ ${time}</div>` : ""}
          </div>
        `;
      }
    });

    html = `<div>${summary}</div><h2>Study Cards</h2>${cardsHtml}`;
  }

  return `<p>${html}</p>`;
}
