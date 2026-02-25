import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Privacy Policy | YTVidHub - Your Data Protection',
        description: 'Read the official Privacy Policy for YTVidHub. We explain what little data we collect, our commitment to anonymity, and how we protect your privacy.',
        alternates: buildAlternates(locale, '/privacy-policy'),
    };
}

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
