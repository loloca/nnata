import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import FeaturedJobsSection from "./components/FeaturedJobsSection";
import CompaniesSection from "./components/CompaniesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PortfolioSection from "./components/PortfolioSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedJobsSection />
        <CompaniesSection />
        <HowItWorksSection />
        <PortfolioSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
