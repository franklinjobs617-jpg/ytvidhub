import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Prep Toolkit: Complete Guide for YouTube Subtitles",
  description: "Comprehensive guide to preparing YouTube subtitles for data analysis, AI training, and research. Includes tools and best practices for clean data extraction.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/data-prep-toolkit/",
  },
};

export default function DataPrepToolkitLayout({ children }: { children: React.ReactNode }) {
  return children;
}