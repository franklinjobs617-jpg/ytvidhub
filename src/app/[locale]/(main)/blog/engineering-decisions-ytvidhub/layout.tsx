import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Engineering Decisions Behind YTVidHub | Blog',
    description: 'Technical insights into how we built the world\'s fastest bulk YouTube subtitle downloader. Scaling, performance, and architecture decisions.',
    alternates: {
        canonical: 'https://ytvidhub.com/blog/engineering-decisions-ytvidhub/',
    },
};

export default function EngineeringDecisionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
