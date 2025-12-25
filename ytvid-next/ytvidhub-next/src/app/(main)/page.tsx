import HeroSection from "@/components/landing/HeroSection"; // 假设你把第一部分也拆出去了
import HowItWorks from "@/components/landing/HowItWorks";
import ComparisonSlider from "@/components/landing/ComparisonSlider";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import Testimonials from "@/components/landing/Testimonials";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import FAQ from "@/components/landing/FAQ";

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