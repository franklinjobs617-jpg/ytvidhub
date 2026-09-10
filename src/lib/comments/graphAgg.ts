// 评论日期聚合（原 comment-viewer public/graph.js 算法的纯 TS 移植，本地时区）。
import type { GraphInterval } from "../commentsApi";

export const HOUR = 60 * 60 * 1000;
export const DAY = 24 * HOUR;
export const MONTH = 30 * DAY;
export const YEAR = 365 * DAY;

/** 日期向下取整到 interval 单位（本地时区）。 */
export function floorDate(date: Date, unit: GraphInterval): Date {
  const d = new Date(date);
  switch (unit) {
    case "year":
      d.setMonth(0);
    case "month":
      d.setDate(1);
    case "day":
      d.setHours(0);
    case "hour":
      d.setMinutes(0, 0, 0);
  }
  return d;
}

/** 日期按 interval 前进 amt 步。 */
export function shiftDate(date: Date, unit: GraphInterval, amt: number): Date {
  const d = new Date(date);
  switch (unit) {
    case "year":
      d.setFullYear(d.getFullYear() + amt);
      break;
    case "month":
      d.setMonth(d.getMonth() + amt);
      break;
    case "day":
      d.setDate(d.getDate() + amt);
      break;
    case "hour":
      d.setHours(d.getHours() + amt);
      break;
  }
  return d;
}

export type GraphDataset = {
  xs: number[]; // x 轴秒（与 graph.js 一致，Math.floor(key/1000)）
  ys: number[]; // 每桶评论数
};

/**
 * 把原始日期数组（毫秒，DESC）聚合成 uPlot 数据集。
 * 左边界 = min(视频发布时间, 最早评论时间) 向下取整；右边界 = 现在。
 */
export function aggregateDates(
  dates: number[],
  interval: GraphInterval,
  leftBoundMs: number
): GraphDataset {
  const dateMap = new Map<number, number>();

  const startDate = floorDate(new Date(leftBoundMs), interval);
  const endDate = floorDate(new Date(), interval);

  let currentDate = startDate;
  while (currentDate.getTime() <= endDate.getTime()) {
    dateMap.set(currentDate.getTime(), 0);
    currentDate = shiftDate(currentDate, interval, 1);
  }

  for (const rawDate of dates) {
    const key = floorDate(new Date(rawDate), interval).getTime();
    const count = dateMap.get(key);
    if (count !== undefined) {
      dateMap.set(key, count + 1);
    }
  }

  const xs: number[] = [];
  const ys: number[] = [];
  for (const [key, count] of dateMap) {
    xs.push(Math.floor(key / 1000));
    ys.push(count);
  }
  return { xs, ys };
}

/** 根据图域长度自动选择初始 interval（与 graph.js 一致）。 */
export function pickInitialInterval(domainLengthMs: number): GraphInterval {
  let interval: GraphInterval = "hour";
  if (domainLengthMs > 2 * DAY) interval = "day";
  if (domainLengthMs > 3 * YEAR) interval = "month";
  return interval;
}

/** 图域不足一个桶时禁用对应 interval（与 graph.js 一致）。 */
export function availableIntervals(domainLengthMs: number): Record<GraphInterval, boolean> {
  return {
    hour: domainLengthMs >= HOUR,
    day: domainLengthMs >= DAY,
    month: domainLengthMs >= MONTH,
    year: domainLengthMs >= YEAR,
  };
}
