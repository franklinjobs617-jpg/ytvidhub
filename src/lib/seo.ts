import { buildCanonicalUrl } from './url'
import { routing } from '@/i18n/routing'

export function buildAlternates(locale: string, pathname: string) {
  return {
    canonical: buildCanonicalUrl({ locale, pathname }),
    languages: {
      ...Object.fromEntries(
        routing.locales.map(l => [l, buildCanonicalUrl({ locale: l, pathname })])
      ),
      'x-default': buildCanonicalUrl({ locale: 'en', pathname }),
    },
  }
}
