export const SITE_ORIGIN = 'https://ytvidhub.com'

type CanonicalUrlParams = {
  locale?: string
  pathname?: string
}

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, '')

export const buildCanonicalUrl = ({ locale, pathname }: CanonicalUrlParams = {}): string => {
  const localeSegment = locale && locale !== 'en' ? trimSlashes(locale) : ''
  const pathSegment = pathname ? trimSlashes(pathname) : ''

  const joinedPath = [localeSegment, pathSegment].filter(Boolean).join('/')
  const finalPath = `/${joinedPath}`.replace(/\/+$/, '') + '/'

  return new URL(finalPath, SITE_ORIGIN).toString()
}
