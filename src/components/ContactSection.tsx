import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const ContactSection = () => {
  const { t } = useLang();

  return (
    <section id="contact" className="section-dark-alt py-28 md:py-36 relative overflow-hidden">
      {/* Core glow background */}
      <div className="absolute inset-0 pointer-events-none opacity-50 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-apple-blue/10 blur-[150px]" />
      </div>

      <div className="max-w-[980px] mx-auto px-6 text-center relative z-10">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">
          {t("contact.label")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-[56px] font-bold apple-heading text-[#f5f5f7] mb-6 leading-[1.05]">
          {t("contact.title")}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-apple-grey text-lg apple-body mb-12 max-w-lg mx-auto">
          {t("contact.subtitle")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:dev.cenkcetin@gmail.com" className="bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-[#f5f5f7] text-base font-medium px-8 py-3.5 rounded-pill transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,113,227,0.2)] hover:border-apple-blue/30 group flex items-center gap-2">
            dev.cenkcetin@gmail.com
            <span className="text-apple-blue/80 group-hover:text-apple-blue group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a href="tel:+905525927390" className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-[#f5f5f7] text-base font-medium px-8 py-3.5 rounded-pill transition-all duration-300">
            +90 552 592 73 90
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-12 flex justify-center gap-8">
          <a href="https://linkedin.com/in/thisiscenkcetin" target="_blank" rel="noopener noreferrer" className="text-apple-grey hover:text-[#f5f5f7] text-sm font-medium transition-colors duration-300 bg-white/5 px-6 py-2 rounded-pill border border-transparent hover:border-white/10 hover:bg-white/10 backdrop-blur-sm">LinkedIn</a>
          <a href="https://behance.net/cenkcetin" target="_blank" rel="noopener noreferrer" className="text-apple-grey hover:text-[#f5f5f7] text-sm font-medium transition-colors duration-300 bg-white/5 px-6 py-2 rounded-pill border border-transparent hover:border-white/10 hover:bg-white/10 backdrop-blur-sm">Behance</a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
