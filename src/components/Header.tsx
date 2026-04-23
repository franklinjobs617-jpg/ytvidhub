"use client";

import { useState, useRef, useEffect } from "react";
import { Link, usePathname } from '@/i18n/routing';
import Image from "next/image";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from 'next-intl';
import {
  Menu,
  X,
  ChevronDown,
  Coins,
  LogOut,
  Sparkles,
  History,
} from "lucide-react";
import { DailyRewardButton } from "@/components/ui/DailyRewardButton";

const resourceLinks = [
  { key: "guides", href: "/guide" },
  { key: "blog", href: "/blog" },
  { key: "subsForAi", href: "/guide/youtube-subtitles-for-llm-data" },
  { key: "cleanText", href: "/guide/clean-transcript-no-timestamp" },
  { key: "srtVsVtt", href: "/guide/srt-vs-vtt" },
  { key: "aiSummarizer", href: "/blog/ai-youtube-video-summarizer" },
];

const toolLinks = [
  { key: "transcriptGenerator", href: "/youtube-transcript-generator" },
  { key: "subtitleExtractor", href: "/youtube-subtitle-extractor" },
  { key: "bulkDownloader", href: "/bulk-youtube-subtitle-downloader" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { user, logout, isLoading, openLoginModal } = useAuth();
  const t = useTranslations('navigation');
  const footerT = useTranslations('footer');

  // Helper: Normalize path by removing trailing slash (unless it's root)
  const normalizePath = (p: string) => {
    if (!p) return "";
    return p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p;
  };

  const isActive = (path: string) => normalizePath(pathname) === normalizePath(path);
  const isParentActive = (items: { href: string }[]) => {
    return items.some((item) => normalizePath(pathname) === normalizePath(item.href));
  };
  const closeFloatingMenus = () => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl supports-[backdrop-filter]:bg-white/72">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
          {/* === Logo === */}
          <Link href="/" onClick={closeFloatingMenus} className="group flex shrink-0 items-center gap-2.5 rounded-full px-1.5 py-1 transition-colors hover:bg-slate-50">
            <Image
              src="/image/icon.webp"
              alt="YTVidHub Logo"
              width={36}
              height={36}
              priority
              className="h-8 w-auto transition-transform duration-300 group-hover:rotate-[-5deg] md:h-9"
            />
            <span className="hidden text-sm font-semibold tracking-[0.02em] text-slate-900 sm:inline">
              YTVidHub
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white px-2 py-1 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.45)] lg:flex">
            <Link
              href="/"
              onClick={closeFloatingMenus}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${isActive("/")
                ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              {t('home')}
            </Link>

            <div className="relative group flex items-center">
              <button
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${isParentActive(toolLinks)
                  ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                  : "text-slate-600 group-hover:bg-slate-50 group-hover:text-slate-900"
                  }`}
              >
                <span>{t('tools')}</span>
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>
              <div className="invisible absolute left-1/2 top-[92%] w-64 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_22px_44px_-24px_rgba(15,23,42,0.45)] backdrop-blur">
                  {toolLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={closeFloatingMenus}
                      className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${isActive(item.href)
                        ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                        : "text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              onClick={closeFloatingMenus}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${isActive("/pricing")
                ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              {t('pricing')}
            </Link>

            <Link
              href="/add-on"
              onClick={closeFloatingMenus}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${isActive("/add-on")
                ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              {t('extension')}
            </Link>

            <div className="relative group flex items-center">
              <button
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${isParentActive(resourceLinks)
                  ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                  : "text-slate-600 group-hover:bg-slate-50 group-hover:text-slate-900"
                  }`}
              >
                <span>{t('resources')}</span>
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>
              <div className="invisible absolute left-1/2 top-[92%] w-64 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_22px_44px_-24px_rgba(15,23,42,0.45)] backdrop-blur">
                  {resourceLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={closeFloatingMenus}
                      className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${isActive(item.href)
                        ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                        : "text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      {footerT(item.key)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-16 h-8 bg-slate-100 rounded-full animate-pulse hidden md:block" />
                <div className="w-8 h-8 bg-slate-100 rounded-full animate-pulse" />
              </div>
            ) : !user ? (
              <>
                <LanguageSwitcher />
                <button
                  onClick={openLoginModal}
                  className="rounded-full bg-[var(--brand-600)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_24px_-16px_rgba(37,99,235,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-700)] md:px-5"
                >
                  {t('login')}
                </button>
              </>
            ) : (
              <>
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full p-1 transition-all hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-1.5 rounded-full border border-[var(--brand-200)] bg-[var(--brand-50)] px-2.5 py-1">
                      <Coins size={14} className="text-[var(--brand-600)]" />
                      <span className="text-sm font-bold text-[var(--brand-700)]">{user.credits}</span>
                    </div>
                    <Image
                      src={user.picture || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full border-2 border-slate-200"
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-[0_20px_45px_-25px_rgba(15,23,42,0.45)]">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <div className="px-3 py-2 mb-1">
                          <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-[var(--brand-600)]" />
                            <span className="text-sm font-semibold text-slate-800">{t('freePlan')}</span>
                          </div>
                        </div>
                        <Link
                          href="/pricing"
                          onClick={closeFloatingMenus}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <Coins size={16} /> {t('buyCredits')}
                        </Link>
                        <Link
                          href="/history"
                          onClick={closeFloatingMenus}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <History size={16} /> {t('history')}
                        </Link>
                        <div className="md:hidden">
                          <DailyRewardButton />
                        </div>
                        <div className="h-px bg-slate-100 my-2"></div>
                        <button
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          <LogOut size={16} /> {t('logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="hidden md:block">
                  <DailyRewardButton />
                </div>
                <LanguageSwitcher />
              </>
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] flex flex-col lg:hidden transition-all duration-300 ${mobileMenuOpen ? "visible" : "invisible"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`relative flex h-full w-[85%] max-w-sm flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
            <span className="flex items-center gap-2 text-lg font-bold">
              <Image src="/image/icon.webp" alt="Logo" width={28} height={28} className="h-7 w-auto" />
              YTVidHub
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600"
            >
              <X size={22} />
            </button>
          </div>

          {user && (
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={user.picture || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-slate-200"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Coins size={12} className="text-amber-600" />
                    <span className="text-xs font-bold text-amber-700">{user.credits} {t('credits')}</span>
                  </div>
                </div>
              </div>
              <DailyRewardButton />
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <Link
              href="/"
              onClick={closeFloatingMenus}
              className={`block text-base font-semibold ${isActive("/") ? "text-[var(--brand-600)]" : "text-slate-900"}`}
            >
              {t('home')}
            </Link>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('tools')}
              </p>
              {toolLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeFloatingMenus}
                  className={`block pl-3 py-1.5 text-sm font-medium ${isActive(item.href) ? "text-[var(--brand-600)]" : "text-slate-600"}`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>

            <Link
              href="/pricing"
              onClick={closeFloatingMenus}
              className={`block text-base font-semibold ${isActive("/pricing") ? "text-[var(--brand-600)]" : "text-slate-900"}`}
            >
              {t('pricing')}
            </Link>
            <Link
              href="/add-on"
              onClick={closeFloatingMenus}
              className={`block text-base font-semibold ${isActive("/add-on") ? "text-[var(--brand-600)]" : "text-slate-900"}`}
            >
              {t('extension')}
            </Link>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('resources')}
              </p>
              {resourceLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeFloatingMenus}
                  className={`block pl-3 py-1.5 text-sm font-medium ${isActive(item.href) ? "text-[var(--brand-600)]" : "text-slate-600"}`}
                >
                  {footerT(item.key)}
                </Link>
              ))}
            </div>

            {user && (
              <>
                <div className="h-px bg-slate-200 my-4"></div>
                <Link
                  href="/history"
                  onClick={closeFloatingMenus}
                  className="flex items-center gap-2 text-base font-semibold text-slate-900"
                >
                  <History size={18} /> {t('history')}
                </Link>
              </>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-rose-600 font-semibold py-3 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <LogOut size={18} /> {t('logout')}
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full bg-[var(--brand-600)] text-white font-semibold py-3 rounded-lg hover:bg-[var(--brand-700)] transition-colors"
              >
                {t('login')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
