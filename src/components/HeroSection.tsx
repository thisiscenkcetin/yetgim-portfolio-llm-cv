import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import { microAnimations } from "@/lib/microInteractions";

interface HeroSectionProps {
  onCanvasClick: () => void;
}

const HeroSection = ({ onCanvasClick }: HeroSectionProps) => {
  const { t } = useLang();

  return (
    <section className="relative h-screen flex flex-col items-center justify-center section-dark overflow-hidden">
      {/* 3-Layer Glass Background */}
      <div className="absolute inset-0 glass-layer-3 glass-blue pointer-events-none" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-apple-blue/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full bg-apple-blue/[0.04] blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-apple-blue/[0.03] blur-[100px]" />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(245,245,247,0.5) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-12"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -m-5 rounded-full border border-apple-blue/20"
          animate={{ scale: [1, 1.08, 1], opacity: [0.28, 0.08, 0.28] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -m-9 rounded-full border border-apple-blue/12"
          animate={{ scale: [1, 1.16, 1], opacity: [0.18, 0.04, 0.18] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        />
        <div
          onClick={onCanvasClick}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-apple-blue/25 via-apple-blue/15 to-apple-blue/5 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-700 shadow-[0_0_100px_rgba(0,113,227,0.25),inset_0_0_60px_rgba(0,113,227,0.1)]"
        >
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-apple-blue/40 via-apple-blue/20 to-transparent flex items-center justify-center backdrop-blur-sm">
            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-apple-blue/50 to-apple-blue/20 shadow-[0_0_40px_rgba(0,113,227,0.3)]"
              animate={{ scale: [1, 1.03, 1], boxShadow: ["0 0 34px rgba(0,113,227,0.24)", "0 0 48px rgba(0,113,227,0.36)", "0 0 34px rgba(0,113,227,0.24)"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.div
            aria-hidden="true"
            className="absolute inset-[10px] rounded-full border border-dashed border-apple-blue/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={onCanvasClick}
          className="absolute top-2 -right-4 md:top-4 md:-right-6 translate-x-full animate-float cursor-pointer"
        >
          <div className="glass-layer-2 glass-blue shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] rounded-2xl px-5 py-3.5 text-[13px] text-[#f5f5f7]/95 font-medium max-w-[200px] md:max-w-[220px] relative">
            {t("hero.bubble")}
            <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-[rgba(18,18,20,0.85)]" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        {...microAnimations.fadeUp}
        className="text-center px-6 max-w-3xl z-10"
      >
        <motion.h1 
          className="apple-display-hero apple-heading text-white mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Cenk Çetin
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl font-medium text-[#e8e8ed] apple-body leading-relaxed"
          initial={{ opacity: 0, y: 10, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0em" }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t("hero.subtitle")}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-12 z-10"
      >
        <a href="#work" className="group inline-flex flex-col items-center gap-2 text-apple-blue-dark hover:text-apple-blue transition-colors duration-300">
          <span className="text-lg font-normal">{t("hero.learn")}</span>
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="text-xl">↓</motion.span>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
