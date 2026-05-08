import BreadcrumbSchema, { toolBreadcrumbs } from '@/components/seo/BreadcrumbSchema';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function BulkDownloaderLayout({ children, params }: Props) {
    const { locale } = await params;
    const items = toolBreadcrumbs(locale, '/bulk-youtube-subtitle-downloader', 'Bulk Subtitle Downloader');
    return (
        <>
            <BreadcrumbSchema items={items} />
            {children}
        </>
    );
}
