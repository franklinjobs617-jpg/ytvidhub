// utils/transcriptUtils.tsx
import React from "react";

// 格式化时间
export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

// VTT 时间转秒
const parseVttTime = (timeStr: string) => {
  if (!timeStr) return 0;
  const parts = timeStr.split(":");
  let seconds = 0;
  if (parts.length === 3) {
    seconds += parseInt(parts[0]) * 3600;
    seconds += parseInt(parts[1]) * 60;
    seconds += parseFloat(parts[2]);
  } else if (parts.length === 2) {
    seconds += parseInt(parts[0]) * 60;
    seconds += parseFloat(parts[1]);
  }
  return seconds;
};

// 1. 强力 VTT 解析器 (修复了元数据泄露问题)
export const parseVtt = (vttContent: string) => {
  const lines = vttContent.split(/\r?\n/);
  const items: { start: number; text: string }[] = [];

  let currentStart = 0;
  let isHeaderFinished = false; // 标记：是否已经跳过了头部

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    if (line.includes("-->")) {
      isHeaderFinished = true; // 锁定状态：正文开始了
      const times = line.split("-->");
      currentStart = parseVttTime(times[0].trim());
      continue;
    }

    // 如果头部还没结束，且这一行不是时间轴，那它肯定是元数据，直接跳过
    if (!isHeaderFinished) continue;

    let text = line
      .replace(/<[^>]*>/g, "")
      .replace(/\[.*?\]/g, "")
      .replace(/\(.*?\)/g, "")
      .trim();

    if (text && items[items.length - 1]?.text !== text) {
      items.push({ start: currentStart, text });
    }
  }
  return items;
};

export const groupTranscriptByTime = (
  items: { start: number; text: string }[]
) => {
  const groups: { startTime: number; text: string }[] = [];
  if (items.length === 0) return [];

  let currentGroup = { startTime: items[0].start, text: "" };
  const TIME_THRESHOLD = 30;

  items.forEach((item, index) => {
    currentGroup.text += item.text + " ";

    const timeDiff = item.start - currentGroup.startTime;

    // 切分条件：时间到了，或者最后一句
    if (timeDiff >= TIME_THRESHOLD || index === items.length - 1) {
      let finalText = currentGroup.text.trim();
      // 首字母大写优化
      finalText = finalText.charAt(0).toUpperCase() + finalText.slice(1);

      groups.push({ startTime: currentGroup.startTime, text: finalText });

      if (index < items.length - 1) {
        currentGroup = { startTime: items[index + 1].start, text: "" };
      }
    }
  });

  return groups;
};

export const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={index}
        className="bg-yellow-200 text-slate-900 rounded-sm px-0.5 font-medium"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
};
