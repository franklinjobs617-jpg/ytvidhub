import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing | YTVidHub - Bulk YouTube Subtitle Downloader',
    description: 'Choose the perfect plan for your research or content creation. From free starter plans to high-volume researcher packages.',
    alternates: {
        canonical: 'https://ytvidhub.com/pricing/',
    },
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
