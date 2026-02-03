import { Metadata } from "next"; // 
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ComparisonSlider from "@/components/landing/ComparisonSlider";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import Testimonials from "@/components/landing/Testimonials";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "YouTube Subtitle Downloader | Bulk Extract SRT, VTT & TXT Captions | YTVidHub",
  description: "Professional YouTube subtitle downloader for single videos and bulk playlist extraction. Download SRT, VTT, TXT captions for AI training, accessibility, and content creation. Free tool with 5 daily credits.",
  openGraph: {
    title: "YouTube Subtitle Downloader | Bulk Extract Captions from Videos & Playlists",
    description: "Download YouTube subtitles from single videos or entire playlists. Professional tool for AI training, content creation, and accessibility projects.",
    url: "https://ytvidhub.com",
    images: [
      {
        url: "/image/og-home.webp",
        width: 1200,
        height: 630,
        alt: "YTVidHub YouTube Subtitle Downloader Tool",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "YouTube Subtitle Downloader | Extract Captions & Transcripts",
    description: "Download subtitles from YouTube videos and playlists. Perfect for AI training and content creation.",
    images: ["/image/og-home.webp"],
  },
  alternates: {
    canonical: "https://ytvidhub.com",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ComparisonSlider />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <CoreCapabilities />
      <FAQ />
    </>
  );
}