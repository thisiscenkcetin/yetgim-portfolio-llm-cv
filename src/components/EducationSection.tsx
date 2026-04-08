import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const EducationSection = () => {
  const { t } = useLang();

  const education = [
    { school: "Istanbul University", program: t("edu.istanbul"), period: "2024 – Present" },
    { school: "Trakya University", program: t("edu.trakya"), period: "2024 – Present" },
  ];

  return (
    <section id="education" className="section-dark relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,113,227,0.06),transparent_30%)]" />
      <div className="max-w-[980px] mx-auto px-6">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">
          {t("edu.label")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="apple-section-heading apple-heading text-[#f5f5f7] mb-4">
          {t("edu.title")}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[#f5f5f7]/75 apple-body text-lg mb-16 max-w-xl">
          {t("edu.subtitle")}
        </motion.p>

        {/* Timeline Visual */}
        <div className="relative">
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-apple-blue/0 via-apple-blue/50 to-apple-blue/0 shadow-[0_0_20px_rgba(0,113,227,0.35)]"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          />

          <div className="grid gap-5 relative">
            {education.map((edu, i) => (
              <motion.div 
                key={edu.school} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
              >
                <div className="relative">
                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute left-0 md:left-1/2 top-6 w-3 h-3 bg-apple-blue rounded-full -translate-x-1.5 md:-translate-x-1.5 md:-translate-y-1/2 ring-2 ring-white shadow-[0_0_18px_rgba(0,113,227,0.45)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  />
                  
                  <motion.div 
                    className={`relative overflow-hidden glass-layer-2 glass-blue rounded-[20px] p-8 md:p-10 border border-white/30 shadow-[0_10px_32px_rgba(0,0,0,0.38)] hover:shadow-[0_14px_40px_rgba(0,113,227,0.18)] transition-all duration-500 md:[direction:ltr] ${i === 1 ? "md:text-left" : "md:text-right"}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_30%,rgba(0,113,227,0.04)_100%)]" />
                    <h3 className="text-2xl font-semibold text-[#f5f5f7] apple-heading">{edu.school}</h3>
                    <p className="text-[#f5f5f7]/75 text-base mt-2">{edu.program}</p>
                    <motion.span 
                      className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#0071e3]/20 text-[#4da6ff] border border-[#4da6ff]/40 whitespace-nowrap mt-4 animate-glow-pulse"
                      animate={{ boxShadow: ["0 0 5px rgba(0, 113, 227, 0.3)", "0 0 15px rgba(0, 113, 227, 0.5)", "0 0 5px rgba(0, 113, 227, 0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {edu.period}
                    </motion.span>
                  </motion.div>
                </div>

                {/* Timeline content spacer for alignment */}
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
