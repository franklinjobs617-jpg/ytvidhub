import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import BreadcrumbSchema, { resourceBreadcrumbs } from '@/components/seo/BreadcrumbSchema';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Frequently Asked Questions (FAQ) | YTVidHub Help Center',
    description: 'Find answers to common questions about our YouTube subtitle downloader. Learn about formats, bulk downloading, troubleshooting, privacy, and more in our FAQ.',
    keywords: [
      'ytvidhub faq',
      'youtube subtitle downloader faq',
      'ytvidhub help center',
      'youtube subtitle questions',
      'bulk subtitle download help',
    ],
    alternates: buildAlternates(locale, '/faq'),
  };
}

export default async function FAQLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = resourceBreadcrumbs(locale, '/faq', 'FAQ');
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
