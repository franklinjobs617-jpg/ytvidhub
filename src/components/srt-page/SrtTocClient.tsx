"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight, FileText, Download, Sparkles,
  Code, Braces, Settings, BarChart3, Layers, FileCode, Cpu, HelpCircle
} from "lucide-react";

const sections = [
  { id: "anatomy",            label: "1. SRT File Anatomy",      icon: <Code size={12} /> },
  { id: "interactive",        label: "2. Syntax Breakdown",       icon: <Braces size={12} /> },
  { id: "advanced-formatting",label: "3. Advanced Formatting",    icon: <Settings size={12} /> },
  { id: "comparison",         label: "4. SRT vs VTT vs TXT",      icon: <BarChart3 size={12} /> },
  { id: "conversion",         label: "5. Format Conversion",      icon: <Layers size={12} /> },
  { id: "editing",            label: "6. Editing Tools",          icon: <FileCode size={12} /> },
  { id: "ai-use-cases",       label: "7. AI Research Use",        icon: <Cpu size={12} /> },
  { id: "faq",                label: "8. SRT FAQ",                icon: <HelpCircle size={12} /> },
];

export default function SrtTocClient() {
  const [activeSection, setActiveSection] = useState("anatomy");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-sm">
      <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 pl-4 border-l-4 border-blue-600 flex items-center gap-2">
        <FileText size={12} /> Table of Contents
      </p>
      <nav className="flex flex-col space-y-2">
        {sections.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
              activeSection === cat.id
                ? "bg-blue-50 text-blue-600 translate-x-2"
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <span className={`transition-transform ${activeSection === cat.id ? "scale-110" : ""}`}>
              {cat.icon}
            </span>
            <span>{cat.label}</span>
            <ChevronRight
              size={12}
              className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${activeSection === cat.id ? "opacity-100" : ""}`}
            />
          </a>
        ))}
      </nav>
      <div className="mt-8 pt-6 border-t border-slate-200">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-black uppercase bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full justify-center"
        >
          <Download size={12} /> Download SRT Files
        </Link>
        <p className="text-[10px] text-slate-400 mt-3 text-center">
          <Sparkles size={8} className="inline mr-1" /> Extract clean subtitles in minutes
        </p>
      </div>
    </div>
  );
}
