import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | YTVidHub',
    description: 'Learn how we protect your data and privacy while using YTVidHub services.',
    alternates: {
        canonical: 'https://ytvidhub.com/privacy-policy',
    },
};

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
