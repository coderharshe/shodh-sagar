import ScrollRevealHero from "@/components/UI/ScrollRevealHero";
import ServicesGrid from "@/components/UI/ServicesGrid";
import ThinkTankSection from "@/components/UI/ThinkTankSection";
import TeamSection from "@/components/UI/TeamSection";
import EditorMessage from "@/components/UI/EditorMessage";
import EnquiryForm from "@/components/UI/EnquiryForm";
import PrivacyStatement from "@/components/UI/PrivacyStatement";
import Footer from "@/components/UI/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#f5f5f7] min-h-screen">
      
      <ScrollRevealHero />

      {/* Sections */}
      <ServicesGrid />
      <ThinkTankSection />
      <TeamSection />
      <EditorMessage />
      <EnquiryForm />
      <PrivacyStatement />
      
      <Footer />
    </main>
  );
}
