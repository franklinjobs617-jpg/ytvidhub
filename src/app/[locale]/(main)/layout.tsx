import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackWidget from "@/components/FeedbackWidget";
import ScrollToTop from "@/components/ToTop";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />

      {/* 悬浮小组件放在这里 */}
      <ScrollToTop />
      <FeedbackWidget />
    </>
  );
}
