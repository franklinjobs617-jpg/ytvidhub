'use client';

export default function ScrollToTopButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-all shadow-xl active:scale-95 relative z-10 hover:shadow-white/10"
    >
      {children}
    </button>
  );
}
