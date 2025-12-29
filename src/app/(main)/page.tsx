import { Metadata } from "next"; // 
import HeroSection from "@/components/landing/HeroSection"; 
import HowItWorks from "@/components/landing/HowItWorks";
import ComparisonSlider from "@/components/landing/ComparisonSlider";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import Testimonials from "@/components/landing/Testimonials";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "YTVidHub | Bulk YouTube Subtitle Downloader for LLM & AI Training",
  description: "Extract clean, formatted subtitles from entire YouTube playlists or channels. The ultimate data preparation tool for LLM training and research. Start for free.",
  openGraph: {
    title: "YTVidHub - One-Click Bulk YouTube Subtitle Extraction",
    description: "Convert YouTube videos to clean TXT data for AI/LLM training. Supports playlists, channels, and multi-language subtitles.",
    url: "https://ytvidhub.com",
    images: [
      {
        url: "/image/og-home.webp", 
        width: 1200,
        height: 630,
        alt: "YTVidHub Homepage Preview",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "YTVidHub | Bulk YouTube Subtitle Downloader",
    description: "The fastest way to get YouTube data for your LLM projects.",
    images: ["/image/og-home.webp"],
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