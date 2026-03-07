export interface SubtitleEntry {
  index: number;
  startTime: string;
  endTime: string;
  text: string;
}

export function parseSRT(content: string): SubtitleEntry[] {
  const blocks = content.trim().split(/\n\s*\n/);
  return blocks.map(block => {
    const lines = block.split('\n').filter(line => line.trim());
    if (lines.length < 3) return null;

    const index = parseInt(lines[0]);
    const timeLine = lines[1];
    if (!timeLine || !timeLine.includes(' --> ')) return null;

    const [startTime, endTime] = timeLine.split(' --> ');
    const text = lines.slice(2).join('\n');
    return { index, startTime, endTime, text };
  }).filter((entry): entry is SubtitleEntry => entry !== null && typeof entry.index === 'number' && typeof entry.startTime === 'string');
}

export function parseVTT(content: string): SubtitleEntry[] {
  const lines = content.split('\n');
  const entries: SubtitleEntry[] = [];
  let index = 1;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // 跳过空行和头部
    if (!line || line.startsWith('WEBVTT') || line.startsWith('NOTE') || line.startsWith('Kind:') || line.startsWith('Language:')) {
      i++;
      continue;
    }

    // 检查是否是时间行
    if (line.includes(' --> ')) {
      const timeParts = line.split(' --> ');
      const startTime = timeParts[0].trim();
      const endTime = timeParts[1].split(' ')[0].trim(); // 移除样式信息

      // 收集文本行
      i++;
      const textLines: string[] = [];
      while (i < lines.length && lines[i].trim() && !lines[i].includes(' --> ')) {
        let text = lines[i].trim();
        // 移除VTT内联时间戳标记
        text = text.replace(/<\d{2}:\d{2}:\d{2}\.\d{3}>/g, '').replace(/<\/?c>/g, '');
        if (text) textLines.push(text);
        i++;
      }

      if (textLines.length > 0) {
        entries.push({
          index: index++,
          startTime,
          endTime,
          text: textLines.join(' ')
        });
      }
    } else {
      i++;
    }
  }

  return entries;
}

export function generateBilingualSRT(entries: SubtitleEntry[], translations: string[]): string {
  return entries.map((entry, i) => {
    const translation = translations[i] || '';
    return `${entry.index}\n${entry.startTime} --> ${entry.endTime}\n${entry.text}\n${translation}\n`;
  }).join('\n');
}
