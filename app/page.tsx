import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Audiences } from "@/components/home/Audiences";
import { QuizBanner } from "@/components/home/QuizBanner";
import { Needs } from "@/components/home/Needs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Differentials } from "@/components/home/Differentials";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Audiences />
      <QuizBanner />
      <Needs />
      <HowItWorks />
      <Differentials />
      <AboutPreview />
      <FAQ />
      <FinalCTA />
    </>
  );
}
