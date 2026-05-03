import { Link } from "@/i18n/routing";
import Image from "next/image";
import Share from "./share";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)] border-t border-[var(--footer-border)]">
      <div className="container mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              YT<span className="text-[var(--brand-500)]">Vid</span>Hub
            </h3>
            <p className="text-sm leading-relaxed text-[var(--footer-muted)] max-w-xs">
              {t("description")}
            </p>

            <a
              href="https://theresanaiforthat.com/ai/ytvidhub/?ref=featured&v=7340698"
              target="_blank"
              rel="nofollow"
            >
              <Image
                width={300}
                height={54}
                src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600"
                alt="Featured on TAAFT"
              />
            </a>
            <a href="https://submitaitools.org" target="_blank">
              <img
                src="https://submitaitools.org/static_submitaitools/images/submitaitools.png"
                alt="Submit AI Tools"
                className="border w-[200px] h-[60px] mt-4"
              />
            </a>
   
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("product")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-subtitle-downloader"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("downloader")}
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-subtitle-downloader"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("downloadSubs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/bulk-youtube-subtitle-downloader"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("bulkDownloader")}
                </Link>
              </li>
              <li>
                <Link
                  href="/add-on/youtube-subtitle-download"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  YouTube Subtitle Downloader Extension
                </Link>
              </li>
              <li>
                <Link
                  href="/add-on/youtube-transcript-generator"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  YouTube Transcript Generator Extension
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("guides")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/guide/how-to-download-youtube-subtitles-complete-guide"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("howToDownload")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/how-to-download-youtube-studio-subtitles"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("exportStudio")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/youtube-subtitles-for-llm-data"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("subsForAi")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/clean-transcript-no-timestamp"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("cleanText")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/srt-vs-vtt"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("srtVsVtt")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/mastering-vtt-data-analysis"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("analyzeData")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/youtube-subtitles-api-free"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("freeApi")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/data-prep-toolkit"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("prepareData")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/playlist-subtitles-bulk"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("playlistBulk")}
                </Link>
              </li>
              <li>
                <Link
                  href="/data-prep-guide"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("aiDataPrep")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-use"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("howToUse")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("blog")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/blog/how-to-get-youtube-video-transcript"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("getTranscript")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ai-youtube-video-summarizer"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("aiSummarizer")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/subtitle-accuracy-problem"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("whySubsWrong")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/creator-tutorials"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("creatorTutorials")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/spanish-yt-channels-subtitles"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("learnSpanish")}
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-subtitle-downloader"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("ytDownloader")}
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-transcript-generator"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("chatgptTranscripts")}
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-an-srt-file"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("whatIsSrt")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq/subtitle-settings-guide"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("settingsGuide")}
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube-subtitle-extractor"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("onlineExtractor")}
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("support")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("legal")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  {t("termsOfService")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dmca-policy"
                  className="hover:text-[var(--brand-400)] transition-colors"
                >
                  DMCA Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部装饰线 */}
        <div className="mt-12 pt-8 border-t border-[var(--footer-border)] flex flex-col items-center">
          {/* 分享区块 */}
          <div className="mb-8 text-center">
            <p className="text-xs font-medium text-[var(--footer-muted)] uppercase tracking-[0.2em] mb-4">
              {t("share")}
            </p>
            <div className="flex justify-center bg-slate-800/50 p-3 rounded-2xl backdrop-blur-sm">
              <Share />
            </div>
          </div>

          {/* 版权信息 */}
          <div className="text-center space-y-2">
            <p className="text-sm text-[var(--footer-muted)]">
              &copy; {new Date().getFullYear()} YTVidHub Technologies.{" "}
              {t("rights")}.
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-tight">
              {t("disclaimer")}
            </p>
            <p className="text-[11px] text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Users must ensure they have lawful rights to access and use
              subtitle content. YTVidHub provides technical tools only, grants
              no copyright license, and is not affiliated with YouTube.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
