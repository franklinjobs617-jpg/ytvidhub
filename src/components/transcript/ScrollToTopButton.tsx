'use client';

export default function ScrollToTopButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
    >
      {children}
    </button>
  );
}
