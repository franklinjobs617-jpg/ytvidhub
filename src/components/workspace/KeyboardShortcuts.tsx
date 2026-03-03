"use client";

import { useState, useEffect } from "react";
import { Keyboard, X } from "lucide-react";

export function KeyboardShortcuts() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // 检查用户是否已经看过快捷键提示
    const hasSeenShortcuts = localStorage.getItem('ytvidhub_shortcuts_seen');
    if (!hasSeenShortcuts) {
      // 延迟3秒显示提示
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const shortcuts = [
    { key: "Space", description: "Play/Pause video" },
    { key: "← →", description: "Seek backward/forward 5s" },
    { key: "Ctrl+F", description: "Focus search box" },
  ];

  const handleDismissTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem('ytvidhub_shortcuts_seen', 'true');
  };

  return (
    <>
      {/* 快捷键按钮 */}
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg transition-all hover:scale-105"
        title="Keyboard shortcuts"
      >
        <Keyboard size={18} />
      </button>

      {/* 首次提示气泡 */}
      {showTooltip && (
        <div className="fixed bottom-16 right-4 z-50 bg-violet-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <Keyboard size={14} />
            <span>Try keyboard shortcuts!</span>
            <button onClick={handleDismissTooltip} className="ml-1 hover:bg-violet-700 rounded p-0.5">
              <X size={12} />
            </button>
          </div>
          <div className="absolute bottom-0 right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-violet-600 translate-y-full"></div>
        </div>
      )}

      {/* 快捷键面板 */}
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Keyboard Shortcuts</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-mono text-slate-700">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 text-center">
              Press these keys while focused on the workspace
            </div>
          </div>
        </div>
      )}
    </>
  );
}