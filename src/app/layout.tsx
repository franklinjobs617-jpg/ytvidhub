import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Redirecting...",
  description: "Redirecting to English version",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}