import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Terms of Service | YTVidHub - Usage Guidelines',
    description: 'Review the Terms of Service for using YTVidHub. This document outlines your responsibilities, our liability, and the proper use of our free subtitle downloader.',
    alternates: buildAlternates(locale, '/terms-of-service'),
  };
}

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
