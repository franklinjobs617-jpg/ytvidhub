"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function EditorialToc() {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll(".editorial-main article h2")
    ) as HTMLHeadingElement[];

    const items = els.map((el) => {
      if (!el.id) {
        el.id = slugify(el.textContent || "");
      }
      return { id: el.id, text: el.textContent || "" };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed right-[max(1rem,calc((100vw-80rem)/2+1rem))] top-28 w-56"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm p-4">
        <p className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">
          <List size={12} />
          On this page
        </p>
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => handleClick(h.id)}
                className={`block w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                  activeId === h.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
