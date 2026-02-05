import { Link } from '@/i18n/routing';
import Share from "./share";
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">

          {/* Company Info - 占据 2 列宽在移动端以保证醒目 */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              YT<span className="text-violet-500">Vid</span>Hub
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('product')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-violet-400 transition-colors">{t('home')}</Link>
              </li>
              <li>
                <Link href="/youtube-subtitle-downloader" className="hover:text-violet-400 transition-colors">{t('downloader')}</Link>
              </li>
              <li>
                <Link href="/download-subs-from-youtube" className="hover:text-violet-400 transition-colors">{t('downloadSubs')}</Link>
              </li>
              <li>
                <Link href="/bulk-youtube-subtitle-downloader" className="hover:text-violet-400 transition-colors">{t('bulkDownloader')}</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-violet-400 transition-colors">{t('pricing')}</Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('resources')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/data-prep-guide" className="hover:text-violet-400 transition-colors">{t('dataPrepGuide')}</Link>
              </li>
              <li>
                <Link href="/guide/clean-transcript-no-timestamp" className="hover:text-violet-400 transition-colors">{t('cleanTranscript')}</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-violet-400 transition-colors">{t('faq')}</Link>
              </li>
              <li>
                <Link href="/how-to-use" className="hover:text-violet-400 transition-colors">{t('howToUse')}</Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('legal')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-violet-400 transition-colors">{t('aboutUs')}</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-violet-400 transition-colors">{t('privacyPolicy')}</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-violet-400 transition-colors">{t('termsOfService')}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部装饰线 */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col items-center">

          {/* 分享区块 */}
          <div className="mb-8 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-[0.2em] mb-4">
              {t('share')}
            </p>
            <div className="flex justify-center bg-slate-800/50 p-3 rounded-2xl backdrop-blur-sm">
              <Share />
            </div>
          </div>

          {/* 版权信息 */}
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} YTVidHub Technologies. {t('rights')}.
            </p>
            <p className="text-[10px] text-slate-600 uppercase tracking-tight">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}