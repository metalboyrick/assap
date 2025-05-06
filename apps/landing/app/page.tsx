import {
  AboutSection,
  BackgroundElements,
  ComparisonSection,
  CTASection,
  Footer,
  HeroSection,
  HowItWorksSection,
  Navbar,
  ProblemsSolutionsSection,
  RevenueModelSection,
  UseCasesSection,
  VisionTimelineSection,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-black text-white relative overflow-hidden">
      <BackgroundElements />
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProblemsSolutionsSection />
        <ComparisonSection />
        <HowItWorksSection />
        <UseCasesSection />
        <RevenueModelSection />
        <VisionTimelineSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
