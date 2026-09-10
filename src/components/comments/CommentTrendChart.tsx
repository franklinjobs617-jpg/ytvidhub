"use client";

// 评论趋势图：uPlot 折线图（与原始 comment-viewer graph.js 同构）。
// - 单一序列（评论数）→ 标题即图例，无需 legend
// - 调色板 token 通过 CSS 变量注入（dataviz 参考调色板，浅色面已过校验）
// - 拖拽框选缩放（setSelect）+ 双击重置；interval 切换保持缩放范围
import { useEffect, useMemo, useRef, useState } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import {
  aggregateDates,
  availableIntervals,
  pickInitialInterval,
  type GraphDataset,
} from "@/lib/comments/graphAgg";
import type { GraphInterval } from "@/lib/commentsApi";

const INTERVALS: Array<{ value: GraphInterval; label: string }> = [
  { value: "hour", label: "Hour" },
  { value: "day", label: "Day" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

// ---- 从 CSS 变量读调色板 token（与 dataviz palette.md 一致）----
function cssVar(root: HTMLElement, name: string, fallback: string): string {
  const value = getComputedStyle(root).getPropertyValue(name).trim();
  return value || fallback;
}

function makeIntervalLabel(tsSec: number, interval: GraphInterval): string {
  const date = new Date(tsSec * 1000);
  switch (interval) {
    case "year":
      return String(date.getFullYear());
    case "month":
      return date.toLocaleString("en-US", { month: "short", year: "numeric" });
    case "day":
      return date.toLocaleDateString("en-US");
    case "hour":
      return date.toLocaleDateString("en-US", { hour: "numeric", hour12: true });
  }
}

function tooltipPlugin() {
  function init(u: uPlot) {
    const over = u.root.querySelector(".u-over");
    if (!over) return;

    const tooltip = (u as uPlot & { cursortt: HTMLDivElement }).cursortt =
      document.createElement("div");
    tooltip.className = "cv-tooltip";
    tooltip.style.display = "none";
    over.appendChild(tooltip);

    over.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
    over.addEventListener("mouseenter", () => {
      tooltip.style.display = "";
    });
  }

  function setCursor(u: uPlot) {
    const { left = 0, top = 0, idx } = u.cursor;
    // idx 类型为 number | null | undefined，用 == null 同时排除两者
    if (idx == null || !u.data[0][idx]) return;

    const xVal = u.data[0][idx] as number;
    const yVal = u.data[1][idx] as number;
    const interval = ((u as uPlot & { cvInterval: GraphInterval }).cvInterval ?? "day");
    const el = (u as uPlot & { cursortt: HTMLDivElement }).cursortt;
    if (!el) return;

    el.innerHTML = `<b>${makeIntervalLabel(xVal, interval)}</b><br>Comments: ${yVal.toLocaleString()}`;

    let xPos = left + 10;
    const yPos = top + 10;
    const tooltipWidth = el.offsetWidth;
    const graphOffset = u.root.querySelector(".u-over")?.getBoundingClientRect().left ?? 0;

    if (graphOffset + xPos + tooltipWidth * 1.2 > document.documentElement.clientWidth) {
      xPos -= tooltipWidth + 20;
    }
    el.style.left = `${xPos}px`;
    el.style.top = `${yPos}px`;
  }

  return { hooks: { init, setCursor } };
}

// 与 graphUtils.js calcAxisSpace 一致的 x 轴刻度间距
function calcAxisSpace(
  interval: GraphInterval,
  scaleMin: number,
  scaleMax: number,
  plotDim: number
): number {
  const rangeSecs = scaleMax - scaleMin;
  let space = 50;
  switch (interval) {
    case "year": {
      const pxPerDay = plotDim / (rangeSecs / 86400);
      space = pxPerDay * 360;
      break;
    }
    case "month": {
      const pxPerDay = plotDim / (rangeSecs / 86400);
      space = pxPerDay * 28;
      break;
    }
    case "day": {
      const pxPerHour = plotDim / (rangeSecs / 3600);
      space = pxPerHour * 23;
      break;
    }
    case "hour": {
      const pxPerMin = plotDim / (rangeSecs / 60);
      space = pxPerMin * 59;
      break;
    }
  }
  return Math.max(50, space);
}

type Props = {
  dates: number[];
  videoPublishedAtMs: number;
};

export default function CommentTrendChart({ dates, videoPublishedAtMs }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<uPlot | null>(null);
  const [interval, setIntervalState] = useState<GraphInterval | null>(null);

  // 左边界 = min(视频发布时间, 最早评论时间)；dates 为 DESC
  const leftBoundMs = useMemo(
    () => Math.min(videoPublishedAtMs, dates[dates.length - 1] ?? videoPublishedAtMs),
    [dates, videoPublishedAtMs]
  );
  const domainLengthMs = useMemo(() => Date.now() - leftBoundMs, [leftBoundMs]);
  const available = useMemo(() => availableIntervals(domainLengthMs), [domainLengthMs]);
  const initialInterval = useMemo(
    () => pickInitialInterval(domainLengthMs),
    [domainLengthMs]
  );

  // 惰性数据集缓存（切换 interval 时算一次）
  const datasetsRef = useRef<Partial<Record<GraphInterval, GraphDataset>>>({});
  const getDataset = (iv: GraphInterval): GraphDataset => {
    if (!datasetsRef.current[iv]) {
      datasetsRef.current[iv] = aggregateDates(dates, iv, leftBoundMs);
    }
    return datasetsRef.current[iv]!;
  };

  // 首次创建图表
  useEffect(() => {
    const root = rootRef.current;
    if (!root || plotRef.current || dates.length === 0) return;

    const iv = initialInterval;
    setIntervalState(iv);
    const ds = getDataset(iv);

    const SERIES = cssVar(root, "--cv-series", "#2a78d6");
    const INK = cssVar(root, "--cv-ink", "#0b0b0b");
    const MUTED = cssVar(root, "--cv-muted", "#898781");
    const GRID = cssVar(root, "--cv-grid", "#e1e0d9");
    const AXIS = cssVar(root, "--cv-axis", "#c3c2b7");

    const axisBase = {
      font: "12px system-ui, -apple-system, 'Segoe UI', sans-serif",
      grid: { stroke: GRID, width: 1 },
      ticks: { show: true, size: 5, stroke: MUTED },
      stroke: INK,
    };

    const opts: uPlot.Options = {
      width: root.clientWidth,
      height: 300,
      tzDate: (ts) => new Date(ts * 1000),
      plugins: [tooltipPlugin()],
      scales: {
        x: { time: true },
        y: {
          // 强制最小值为 0，最大值由 uPlot 自动计算
          range: (_self, _min, max) => uPlot.rangeNum(0, max, 0.1, true),
        },
      },
      axes: [
        {
          ...axisBase,
          stroke: AXIS,
          space: (_self, _axisIdx, scaleMin, scaleMax, plotDim) =>
            calcAxisSpace(iv, scaleMin, scaleMax, plotDim),
        },
        {
          ...axisBase,
          size: (_self, values) => {
            const size = 50;
            let increment = 0;
            if (values) {
              const longestLen = String(values[values.length - 1]).length;
              increment = Math.max(longestLen - 5, 0) * 8;
            }
            return size + increment;
          },
          // y 轴只显示整数
          space: (_self, _axisIdx, _scaleMin, scaleMax, plotDim) =>
            Math.max(plotDim / scaleMax, 30),
        },
      ],
      series: [
        {},
        {
          stroke: SERIES,
          width: 2,
          points: { show: false },
          spanGaps: true,
        },
      ],
      legend: { show: false },
      cursor: {
        y: false,
        drag: { dist: 5 },
        points: { size: 8 }, // 命中目标不小于 8px
      },
      hooks: {
        setSelect: [
          (u) => {
            const min = u.posToVal(u.select.left, "x");
            const max = u.posToVal(u.select.left + u.select.width, "x");
            u.setSelect({ left: 0, top: 0, width: 0, height: 0 }, false);
            u.setScale("x", { min, max });
          },
        ],
      },
    };

    const plot = new uPlot(opts, [ds.xs, ds.ys], root);
    (plot as uPlot & { cvInterval: GraphInterval }).cvInterval = iv;
    plotRef.current = plot;

    // 双击重置缩放
    const over = root.querySelector(".u-over");
    const handleDblClick = () => {
      const current = datasetsRef.current[iv];
      if (current) {
        plot.setScale("x", { min: current.xs[0], max: current.xs[current.xs.length - 1] });
      }
    };
    over?.addEventListener("dblclick", handleDblClick);

    // 窗口/容器尺寸变化自适应
    const ro = new ResizeObserver(() => {
      plot.setSize({ width: root.clientWidth, height: 300 });
    });
    ro.observe(root);

    return () => {
      ro.disconnect();
      over?.removeEventListener("dblclick", handleDblClick);
      plot.destroy();
      plotRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // interval 切换（保持缩放范围，port of graph.js intervalChange）
  const handleIntervalChange = (iv: GraphInterval) => {
    const plot = plotRef.current;
    if (!plot) return;
    const currentIv = (plot as uPlot & { cvInterval: GraphInterval }).cvInterval;
    if (iv === currentIv) return;

    const ds = getDataset(iv);
    const currentTimestamps = plot.data[0] as number[];
    // uPlot 类型里 scale 范围可为 undefined，取默认 0
    const scaleMin = plot.scales.x.min ?? 0;
    const scaleMax = plot.scales.x.max ?? 0;
    const isZoomed =
      scaleMin > currentTimestamps[0] ||
      scaleMax < currentTimestamps[currentTimestamps.length - 1];

    let leftBound = ds.xs[0];
    let rightBound = ds.xs[ds.xs.length - 1];

    if (isZoomed) {
      leftBound = Math.max(scaleMin, leftBound);
      rightBound = Math.min(scaleMax, rightBound);

      // 旧左边界超出新范围（如 day→month）：回退一个点，保证图上至少 2 个点
      if (leftBound > ds.xs[ds.xs.length - 1]) {
        leftBound = ds.xs[Math.max(ds.xs.length - 2, 0)];
      }
    }

    (plot as uPlot & { cvInterval: GraphInterval }).cvInterval = iv;
    plot.setData([ds.xs, ds.ys], false);
    plot.setScale("x", { min: leftBound, max: rightBound });
    setIntervalState(iv);
  };

  return (
    <div className="cv-chart rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <style>{`
        .cv-chart {
          --cv-series: #2a78d6;   /* 调色板 categorical slot 1 (blue) */
          --cv-ink:    #0b0b0b;
          --cv-muted:  #898781;
          --cv-grid:   #e1e0d9;
          --cv-axis:   #c3c2b7;
        }
        .cv-chart .u-over { overflow: visible; }
        .cv-chart .cv-tooltip {
          position: absolute;
          z-index: 10;
          background: #0b0b0b;
          color: #fcfcfb;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          line-height: 1.5;
          pointer-events: none;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(11, 11, 11, 0.18);
        }
      `}</style>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Comments over time</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            {dates.length.toLocaleString()} comments · drag to zoom · double-click to reset
          </p>
        </div>
        {/* 筛选控件：一行，interval 切换 */}
        <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
          {INTERVALS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleIntervalChange(value)}
              disabled={!available[value]}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                interval === value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div ref={rootRef} className="w-full" />
    </div>
  );
}
