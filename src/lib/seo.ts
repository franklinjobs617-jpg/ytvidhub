import { buildCanonicalUrl } from './url'
import { routing } from '@/i18n/routing'

export function buildAlternates(locale: string, pathname: string, isMultilingual = false) {
  const canonicalLocale = isMultilingual ? locale : 'en';
  const languages: Record<string, string> = {
    'en': buildCanonicalUrl({ locale: 'en', pathname }),
    'x-default': buildCanonicalUrl({ locale: 'en', pathname }),
  };

  if (isMultilingual) {
    routing.locales.forEach(l => {
      if (l !== 'en') {
        languages[l] = buildCanonicalUrl({ locale: l, pathname });
      }
    });
  }

  return {
    canonical: buildCanonicalUrl({ locale: canonicalLocale, pathname }),
    languages,
  };
}
