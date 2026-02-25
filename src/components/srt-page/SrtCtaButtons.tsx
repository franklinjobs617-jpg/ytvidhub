"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import { Download, ArrowRight } from "lucide-react";

export function SrtCtaHero() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 mt-2 mb-4">
        <Link
          href="/"
          onClick={handleAction}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 text-sm uppercase tracking-widest"
        >
          <Download size={16} />
          Extract SRT from YouTube — Free
        </Link>
        <span className="text-xs text-slate-400">No credit card · 5 free downloads</span>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}

export function SrtCtaBulk() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <Link
        href="/"
        onClick={handleAction}
        className="bg-white text-blue-600 font-black px-8 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase text-xs tracking-widest whitespace-nowrap"
      >
        Start Bulk Extraction
      </Link>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}

export function SrtCtaFinal() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <Link
        href="/"
        onClick={handleAction}
        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-5 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-sm tracking-widest"
      >
        <span>Start Bulk Extraction Now</span>
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </Link>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
