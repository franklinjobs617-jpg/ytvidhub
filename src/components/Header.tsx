"use client";

import { useState, useRef, useEffect } from "react";
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import LoginModal from "@/components/LoginModel";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from 'next-intl';
import {
  Menu,
  X,
  ChevronDown,
  Coins,
  LogOut,
  User as UserIcon,
  Sparkles,
} from "lucide-react";

const navigation = {
  guides: [
    { name: "Data Prep Guide", href: "/data-prep-guide" },
    { name: "Subtitle Extractor", href: "/tools/subtitle-extractor-online" },
    { name: "Data Prep Toolkit", href: "/guide/data-prep-toolkit" },
    {
      name: "Clean Transcript Guide",
      href: "/guide/clean-transcript-no-timestamp",
    },
    { name: "Bulk Playlist Download", href: "/guide/playlist-subtitles-bulk" },
    {
      name: "Mastering Vtt Data Analysis",
      href: "/guide/mastering-vtt-data-analysis",
    },
    { name: "YouTube API Alt", href: "/guide/youtube-subtitles-api-free" },
    { name: "Youtube Subtitles For Llm Data", href: "/guide/youtube-subtitles-for-llm-data" },
    {
      name: "Srt Vs Vtt Format",
      href: "/guide/srt-vs-vtt"
    }
  ],
  blog: [
    {
      name: "YouTube Subtitle Downloader",
      href: "/youtube-subtitle-downloader",
    },
    {
      name: "Download Subs",
      href: "/download-subs-from-youtube",
    },
    {
      name: "How to Get YouTube Transcript",
      href: "/blog/how-to-get-youtube-video-transcript",
    },
    {
      name: 'ai Youtube Video Summarizer',
      href: "/blog/ai-youtube-video-summarizer",
    },
    {
      name: "Subtitle Accuracy Problem",
      href: "/blog/subtitle-accuracy-problem",
    },
    { name: "Creator Tutorials", href: "/blog/creator-tutorials" },
    { name: "Subtitle Settings", href: "/faq/subtitle-settings-guide" },
    {
      name: "Engineering Decisions",
      href: "/blog/engineering-decisions-ytvidhub",
    },
    {
      name: "Spanish Learning Guide",
      href: "/blog/spanish-yt-channels-subtitles",
    },
    { name: "How to Use", href: "/how-to-use" },
    { name: "FAQ", href: "/faq" },
    { name: "what-is-an-srt-file", href: "/what-is-an-srt-file" },
  ],
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const t = useTranslations('navigation');
  const tAuth = useTranslations('auth');

  const isActive = (path: string) => pathname === path;
  const isParentActive = (items: { href: string }[]) => {
    return items.some((item) => pathname === item.href);
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

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/80 transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* === Logo === */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/image/icon.webp"
              alt="YTVidHub Logo"
              className="h-8 w-auto md:h-9 transition-transform duration-300 group-hover:rotate-[-5deg]"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className={`text-sm font-bold uppercase tracking-wide transition-colors ${isActive("/")
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-900"
                }`}
            >
              {t('home')}
            </Link>

            <Link
              href="/bulk-youtube-subtitle-downloader"
              className={`text-sm font-bold uppercase tracking-wide transition-colors ${isActive("/bulk-youtube-subtitle-downloader")
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-900"
                }`}
            >
              {t('bulkDownloader')}
            </Link>

            <div className="relative group h-20 flex items-center">
              <button
                className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors ${isParentActive(navigation.guides)
                  ? "text-blue-600"
                  : "text-slate-500 group-hover:text-blue-600"
                  }`}
              >
                <span>{t('guide')}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 group-hover:rotate-180 ${isParentActive(navigation.guides)
                    ? "text-blue-600"
                    : "text-slate-400"
                    }`}
                />
              </button>
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 ring-1 ring-black/5 p-2 overflow-hidden text-left">
                  {navigation.guides.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive(item.href)
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group h-20 flex items-center">
              <button
                className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors ${isParentActive(navigation.blog)
                  ? "text-blue-600"
                  : "text-slate-500 group-hover:text-blue-600"
                  }`}
              >
                <span>{t('blog')}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 group-hover:rotate-180 ${isParentActive(navigation.blog)
                    ? "text-blue-600"
                    : "text-slate-400"
                    }`}
                />
              </button>
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 ring-1 ring-black/5 p-2 overflow-hidden text-left">
                  {navigation.blog.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive(item.href)
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              className={`text-sm font-bold uppercase tracking-wide transition-colors ${isActive("/pricing")
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-900"
                }`}
            >
              {t('pricing')}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4 pl-2">
            {isLoading ? (
              // Loading Skeleton
              <div className="flex items-center gap-2">
                <div className="w-16 h-8 bg-slate-100 rounded-full animate-pulse hidden md:block" />
                <div className="w-8 h-8 bg-slate-100 rounded-full animate-pulse" />
              </div>
            ) : !user ? (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-slate-900 hover:bg-blue-600 text-white text-xs md:text-sm font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-all duration-200 shadow-md uppercase tracking-wide"
                >
                  {t('login')}
                </button>
              </>
            ) : (
              <>
                <Link href="/pricing" className="group">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 md:px-3 md:py-1.5 bg-amber-50 border border-amber-100 rounded-full hover:border-amber-300 transition-all cursor-pointer">
                    <Coins
                      size={14}
                      className="text-amber-600"
                      fill="currentColor"
                    />
                    <span className="text-xs md:text-sm font-bold text-amber-700 tabular-nums">
                      {user.credits}
                    </span>
                    <span className="hidden lg:inline text-[10px] font-bold text-amber-600/70 uppercase tracking-wide">
                      {t('credits')}
                    </span>
                  </div>
                </Link>

                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 group p-0.5 rounded-full hover:bg-slate-50 border border-transparent transition-all focus:outline-none"
                  >
                    <img
                      src={
                        user.picture ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                      }
                      alt={user.name}
                      className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover bg-slate-100 border border-slate-200 group-hover:border-blue-300 transition-colors"
                    />
                    <div className="text-left hidden lg:block pr-2">
                      <p className="text-xs font-bold text-slate-700 leading-none group-hover:text-blue-600 transition-colors">
                        {user.name}
                      </p>
                    </div>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-60 rounded-xl bg-white border border-slate-100 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 origin-top-right">
                      <div className="lg:hidden px-4 py-3 bg-slate-50/50 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="p-1.5">
                        <div className="px-3 py-2 mb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            {t('currentPlan')}
                          </span>
                          <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-blue-500" />
                            <span className="text-sm font-bold text-slate-800">
                              {t('freePlan')}
                            </span>
                          </div>
                        </div>

                        <Link
                          href="/pricing"
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <Coins size={16} /> {t('buyCredits')}
                        </Link>

                        <div className="h-px bg-slate-100 my-1"></div>

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
              </>
            )}

            <LanguageSwitcher />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -mr-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] flex flex-col md:hidden transition-all duration-300 ${mobileMenuOpen ? "visible" : "invisible"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`relative w-[80%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 flex flex-col ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center px-6 h-16 border-b border-slate-100 shrink-0">
            <span className="font-bold text-lg uppercase tracking-tighter flex items-center gap-2">
              <img src="/image/icon.webp" alt="Logo" className="h-7 w-auto" />
              YTVidHub
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <Link
              href="/"
              className={`block text-lg font-bold ${isActive("/") ? "text-blue-600" : "text-slate-900"
                }`}
            >
              {t('home')}
            </Link>
            <Link
              href="/bulk-youtube-subtitle-downloader"
              className={`block text-lg font-bold ${isActive("/bulk-youtube-subtitle-downloader")
                ? "text-blue-600"
                : "text-slate-900"
                }`}
            >
              {t('bulkDownloader')}
            </Link>

            {/* Guides Group */}
            <div className="space-y-3">
              <p
                className={`text-xs font-bold uppercase tracking-widest ${isParentActive(navigation.guides)
                  ? "text-blue-600"
                  : "text-slate-400"
                  }`}
              >
                {t('guide')}
              </p>
              {navigation.guides.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-4 py-1 text-base font-medium ${isActive(item.href) ? "text-blue-600" : "text-slate-600"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="space-y-3">
              <p
                className={`text-xs font-bold uppercase tracking-widest ${isParentActive(navigation.blog)
                  ? "text-blue-600"
                  : "text-slate-400"
                  }`}
              >
                {t('blog')}
              </p>
              {navigation.blog.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-4 py-1 text-base font-medium ${isActive(item.href) ? "text-blue-600" : "text-slate-600"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link
              href="/pricing"
              className={`block text-lg font-bold ${isActive("/pricing") ? "text-blue-600" : "text-slate-900"
                }`}
            >
              {t('pricing')}
            </Link>
          </div>

          {/* Mobile Drawer Footer (Login/Logout) */}
          <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-rose-600 font-bold py-3 rounded-xl hover:bg-rose-50 transition-colors"
              >
                <LogOut size={18} /> {t('logout')}
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLoginModal(true);
                }}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
              >
                {t('login')} / {t('signup')}
              </button>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
