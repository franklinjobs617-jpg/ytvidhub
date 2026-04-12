"use client";

import { useState, useEffect } from "react";
import { Keyboard, X } from "lucide-react";

export function KeyboardShortcuts() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleDismissTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem("ytvidhub_shortcuts_seen", "true");
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const hasSeenShortcuts = localStorage.getItem("ytvidhub_shortcuts_seen");
    if (!hasSeenShortcuts) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!showTooltip) return;

    const autoHide = setTimeout(() => {
      handleDismissTooltip();
    }, 9000);

    return () => clearTimeout(autoHide);
  }, [showTooltip]);

  const shortcuts = [
    { key: "Space", description: "Play/Pause video" },
    { key: "← / →", description: "Seek backward/forward 5s" },
    { key: "Ctrl+F", description: "Focus search box" },
  ];

  if (!isDesktop) return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-slate-900 p-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-slate-800"
        title="Keyboard shortcuts"
      >
        <Keyboard size={18} />
      </button>

      {showTooltip && (
        <div className="fixed bottom-20 right-6 z-50 rounded-lg bg-violet-600 px-3 py-2 text-sm text-white shadow-lg animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <Keyboard size={14} />
            <span>Try keyboard shortcuts!</span>
            <button onClick={handleDismissTooltip} className="ml-1 rounded p-0.5 hover:bg-violet-700">
              <X size={12} />
            </button>
          </div>
          <div className="absolute bottom-0 right-6 h-0 w-0 translate-y-full border-l-4 border-r-4 border-t-4 border-transparent border-t-violet-600" />
        </div>
      )}

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm animate-in zoom-in-95 rounded-xl bg-white p-6 shadow-2xl duration-200">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Keyboard Shortcuts</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="rounded-lg p-1 transition-colors hover:bg-slate-100"
              >
                <X size={18} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{shortcut.description}</span>
                  <kbd className="rounded border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4 text-center text-xs text-slate-400">
              Press these keys while focused on the workspace
            </div>
          </div>
        </div>
      )}
    </>
  );
}
