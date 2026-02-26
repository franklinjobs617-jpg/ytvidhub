"use client";

import { useEffect, useState, useCallback } from "react";
import { Gift, Flame, Check } from "lucide-react";
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
    fetchStatus();
  }, [fetchStatus]);

  const handleClaim = async () => {
    if (!status?.canClaim || claiming) return;
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    setClaiming(true);
    try {
      const res = await fetch("/api/daily-reward", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStatus({ canClaim: false, streak: data.streak, nextClaimAt: data.nextClaimAt });
        setJustClaimed(data.creditsAdded);
        await refreshUser();
        setTimeout(() => setJustClaimed(null), 3000);
      }
    } catch {
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
    );
  }

  // Already claimed — always show something
  return (
    <div
      className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-400 text-xs font-bold cursor-default"
      title={status.streak > 1 ? `${status.streak}-day streak! Come back tomorrow.` : "Come back tomorrow for +3 credits"}
    >
      {status.streak > 1 ? (
        <>
          <Flame size={12} className="text-orange-400" />
          <span className="text-orange-500">{status.streak}</span>
        </>
      ) : (
        <>
          <Gift size={12} />
          <span>Tomorrow</span>
        </>
      )}
    </div>
  );
}
