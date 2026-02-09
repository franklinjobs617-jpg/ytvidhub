import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BulkDownloaderRedirect({ params }: Props) {
  const { locale } = await params;
  
  // Redirect to the correct bulk downloader page
  redirect(`/${locale}/bulk-youtube-subtitle-downloader`);
}