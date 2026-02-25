import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Frequently Asked Questions (FAQ) | YTVidHub Help Center',
    description: 'Find answers to common questions about our YouTube subtitle downloader. Learn about formats, bulk downloading, troubleshooting, privacy, and more in our FAQ.',
    alternates: buildAlternates(locale, '/faq'),
  };
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
