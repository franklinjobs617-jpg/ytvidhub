import { useTranslations } from 'next-intl';

// Utility functions for transcript processing
export function cleanTranscript(transcript: string, removeTimestamps: boolean = true): string {
  if (!transcript) return '';

  let cleaned = transcript;

  if (removeTimestamps) {
    // Remove timestamp lines (both SRT and VTT formats)
    cleaned = cleaned.replace(/\d{2}:\d{2}:\d{2},\d{3}\s+-->\s+\d{2}:\d{2}:\d{2},\d{3}/g, '');
    cleaned = cleaned.replace(/\d{2}:\d{2}:\d{2}\.\d{3}\s+-->\s+\d{2}:\d{2}:\d{2}\.\d{3}/g, '');
    cleaned = cleaned.replace(/WEBVTT\s*\n\n/, '');
    cleaned = cleaned.replace(/\d+\n\d{2}:\d{2}:\d{2},\d{3}\s+-->\s+\d{2}:\d{2}:\d{2},\d{3}[\s\S]*?\n\n/g, '');
  }

  // Remove sequence numbers in SRT format
  cleaned = cleaned.replace(/^\d+\n/gm, '');

  // Normalize whitespace
  cleaned = cleaned.trim();
  cleaned = cleaned.replace(/\s*/g,'');
  cleaned = cleaned.replace(/\s+/g, ' ');

  return cleaned;
}

// 旧版格式化时间函数 (保留兼容性)
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
};

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Internationalization utilities
export const useI18nTranscriptUtils = () => {
  const t = useTranslations('transcript');

  const getFormatDescription = (format: 'srt' | 'vtt' | 'txt'): string => {
    switch (format) {
      case 'srt':
        return t('formats.srt.description');
      case 'vtt':
        return t('formats.vtt.description');
      case 'txt':
        return t('formats.txt.description');
      default:
        return t('formats.default.description');
    }
  };

  return {
    getFormatDescription,
  };
};

// Performance utility for large transcript processing
export const processLargeTranscript = (transcript: string, chunkSize: number = 1000): string[] => {
  const chunks: string[] = [];
  for (let i = 0; i < transcript.length; i += chunkSize) {
    chunks.push(transcript.slice(i, i + chunkSize));
  }
  return chunks;
};

// Validation utility
export const validateTranscript = (transcript: string): { isValid: boolean; error?: string } => {
  if (!transcript || typeof transcript !== 'string') {
    return { isValid: false, error: 'Transcript is required and must be a string' };
  }

  if (transcript.length === 0) {
    return { isValid: false, error: 'Transcript cannot be empty' };
  }

  if (transcript.length > 10 * 1024 * 1024) { // 10MB limit
    return { isValid: false, error: 'Transcript is too large (maximum 10MB)' };
  }

  return { isValid: true };
};