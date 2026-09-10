// YouTube 评论 textDisplay 是 HTML（含 <a> 链接、<br>、emoji 等）。
// 在 dangerouslySetInnerHTML 之前做白名单净化，剥离脚本/事件属性。
const ALLOWED_TAGS = new Set(["A", "B", "BR", "EM", "I", "S", "STRONG", "U"]);
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  A: new Set(["href"]),
};

export function sanitizeCommentHtml(html: string): string {
  // 简单可靠的净化：DOM 解析 + 白名单重建（仅浏览器端使用，SSR 不执行）
  const doc = new DOMParser().parseFromString(html, "text/html");
  const root = doc.body;

  const clean = (node: Element): string => {
    let out = "";
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        out += child.textContent ?? "";
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element;
        const tag = el.tagName;
        if (ALLOWED_TAGS.has(tag)) {
          const attrs: string[] = [];
          const allowed = ALLOWED_ATTRS[tag];
          if (allowed) {
            for (const name of allowed) {
              const value = el.getAttribute(name);
              if (value) {
                // href 只允许 http(s) 协议
                if (name === "href" && !/^https?:\/\//i.test(value)) continue;
                attrs.push(`${name}="${value.replace(/"/g, "&quot;")}"`);
              }
            }
          }
          out += `<${tag.toLowerCase()}${attrs.length ? " " + attrs.join(" ") : ""}>`;
          out += clean(el);
          out += `</${tag.toLowerCase()}>`;
        } else {
          // 未知标签：只保留其文本内容
          out += clean(el);
        }
      }
    }
    return out;
  };

  return clean(root);
}
