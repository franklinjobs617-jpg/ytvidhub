"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components = {
  h1: ({ children }: any) => (
    <h1 className="text-2xl font-black text-slate-900 mb-6 mt-2 tracking-tighter border-b pb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="flex items-center gap-2 text-slate-800 text-lg font-bold mt-10 mb-4">
      <div className="w-1.5 h-5 bg-violet-500 rounded-full flex-shrink-0" />
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-slate-800 text-base font-semibold mt-6 mb-3">{children}</h3>
  ),
  blockquote: ({ children }: any) => (
    <div className="relative my-6 p-5 bg-gradient-to-br from-violet-50 to-indigo-50 border-l-4 border-violet-500 rounded-r-2xl shadow-sm">
      <div className="absolute top-2 right-4 text-4xl text-violet-200 font-serif opacity-30">"</div>
      <div className="text-slate-700 leading-relaxed italic font-medium">{children}</div>
    </div>
  ),
  table: ({ children }: any) => (
    <div className="my-6 overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white">
      <table className="w-full text-sm text-left border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-slate-50 font-bold text-slate-600 border-b">{children}</thead>
  ),
  th: ({ children }: any) => <th className="px-4 py-3">{children}</th>,
  td: ({ children }: any) => (
    <td className="px-4 py-3 border-t border-slate-50 text-slate-600">{children}</td>
  ),
  li: ({ children }: any) => (
    <li className="flex items-start gap-3 mb-2.5 text-slate-600 leading-relaxed group">
      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 group-hover:scale-125 transition-transform flex-shrink-0" />
      <div className="flex-1">{children}</div>
    </li>
  ),
  ul: ({ children }: any) => <ul className="my-3 space-y-0.5 list-none pl-0">{children}</ul>,
  p: ({ children }: any) => (
    <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-slate-800">{children}</strong>
  ),
  code: ({ children, className }: any) => {
    const isBlock = className?.includes('language-');
    return isBlock ? (
      <code className={`block bg-slate-900 text-slate-100 rounded-xl p-4 text-sm font-mono overflow-x-auto my-4 ${className}`}>
        {children}
      </code>
    ) : (
      <code className="bg-slate-100 text-violet-700 rounded px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    );
  },
};

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <article className={`prose prose-slate max-w-none ${className}`}>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
