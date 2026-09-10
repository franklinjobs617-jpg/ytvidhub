"use client";

import { FormEvent, useState } from "react";
import { Loader2, RotateCcw, Search } from "lucide-react";

type Props = {
  onSubmit: (url: string) => void;
  onClear: () => void;
  loading: boolean;
  hasVideo: boolean;
};

const EXAMPLES = [
  "https://www.youtube.com/watch?v=03CTOFbI58Y",
  "https://youtu.be/dQw4w9WgXcQ",
];

export default function UrlResolverPanel({ onSubmit, onClear, loading, hasVideo }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <label htmlFor="comments-url" className="text-sm font-semibold text-slate-900">
        Video URL
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="comments-url"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          disabled={loading}
        />
        {hasVideo ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            New video
          </button>
        ) : null}
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? "Resolving..." : "View comments"}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setValue(ex)}
            className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 transition hover:bg-blue-100"
          >
            {ex.replace("https://www.youtube.com/watch?v=", "…?v=")}
          </button>
        ))}
      </div>
    </form>
  );
}
