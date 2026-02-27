"use client";

import { useEffect, useState, useCallback } from "react";
import { Gift, Flame, Check, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface RewardStatus {
  canClaim: boolean;
  streak: number;
  nextClaimAt: string | null;
}

export function DailyRewardButton() {
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<RewardStatus | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [justClaimed, setJustClaimed] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  const fetchStatus = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      const res = await fetch("/api/daily-reward", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setStatus(await res.json());
    } catch {}
  }, []);

  useEffect(() => {
    fetchStatus().then(() => {});
  }, [fetchStatus]);

  useEffect(() => {
    if (status?.canClaim && !localStorage.getItem("daily_reward_intro_seen")) {
      setShowIntro(true);
    }
  }, [status?.canClaim]);

  const dismissIntro = () => {
    setShowIntro(false);
    localStorage.setItem("daily_reward_intro_seen", "1");
  };

  const handleClaim = async () => {
    if (!status?.canClaim || claiming) return;
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    dismissIntro();
    // Optimistic update — 立即响应，无感知延迟
    const prevStatus = status;
    setClaiming(true);
    setJustClaimed(3);
    setStatus({ canClaim: false, streak: (status.streak || 0) + 1, nextClaimAt: null });
    setTimeout(() => setJustClaimed(null), 3000);

    try {
      const res = await fetch("/api/daily-reward", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        // 用服务端真实数据同步（streak 等）
        setStatus({ canClaim: false, streak: data.streak, nextClaimAt: data.nextClaimAt });
        refreshUser(); // fire-and-forget，不阻塞
      } else {
        // 失败回滚
        setJustClaimed(null);
        setStatus(prevStatus);
      }
    } catch {
      setJustClaimed(null);
      setStatus(prevStatus);
    } finally {
      setClaiming(false);
    }
  };

  if (!status) return null;

  // Just claimed — brief success flash
  if (justClaimed !== null) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-green-700 text-xs font-bold animate-in fade-in slide-in-from-top-1">
        <Check size={12} />
        <span>+{justClaimed} Credits!</span>
      </div>
    );
  }

  // Claimable — pulsing amber button
  if (status.canClaim) {
    return (
      <div className="relative">
        {/* First-time intro popover */}
        {showIntro && (
          <div className="absolute top-full right-0 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="relative bg-slate-900 text-white text-xs rounded-xl px-3 py-2.5 shadow-xl w-52">
              <button
                onClick={dismissIntro}
                className="absolute top-1.5 right-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <X size={11} />
              </button>
              <p className="font-bold text-amber-400 mb-0.5">🎁 Free daily credits!</p>
              <p className="text-slate-300 leading-snug">Claim +3 credits every day. Build a streak for bonus rewards.</p>
              {/* Arrow */}
              <div className="absolute -top-1.5 right-4 w-3 h-3 bg-slate-900 rotate-45" />
            </div>
          </div>
        )}
        <button
          onClick={handleClaim}
          disabled={claiming}
          className="relative flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 disabled:opacity-70 text-white text-xs font-bold rounded-full transition-all shadow-sm"
          title="Claim your daily +3 credits"
        >
          <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-25 pointer-events-none" />
          <Gift size={13} className={claiming ? "animate-bounce" : ""} />
          <span>Daily +3</span>
        </button>
      </div>
    );
  }

  // Already claimed — show value clearly
  const nextTime = status.nextClaimAt
    ? new Date(status.nextClaimAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;
  const tooltipText = nextTime
    ? `+3 credits/day · Next claim at ${nextTime}`
    : "+3 credits/day · Come back tomorrow";

  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-400 text-xs font-bold cursor-default"
      title={tooltipText}
    >
      {status.streak > 1 && (
        <>
          <Flame size={11} className="text-orange-400" />
          <span className="text-orange-500">{status.streak}</span>
          <span className="text-slate-300">·</span>
        </>
      )}
      <Check size={11} className="text-slate-400" />
      <span>+3/day</span>
    </div>
  );
}
