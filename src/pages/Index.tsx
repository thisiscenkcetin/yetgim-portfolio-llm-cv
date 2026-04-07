import { useState } from "react";
import { LangProvider } from "@/contexts/LangContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import ChatOverlay from "@/components/ChatOverlay";
import Footer from "@/components/Footer";

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <LangProvider>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection onCanvasClick={() => setChatOpen(true)} />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
        <ChatOverlay isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </LangProvider>
  );
};

export default Index;
