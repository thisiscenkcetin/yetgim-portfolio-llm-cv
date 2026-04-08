import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const ExperienceSection = () => {
  const { t } = useLang();

  const experiences = [
    {
      company: "Çanakkale Basın",
      role: t("exp.canakkale.role"),
      period: "2013 – Present",
      description: t("exp.canakkale.desc"),
      tags: ["Media", "Content Strategy", "Management", "Growth"],
      highlight: true,
    },
    {
      company: "C&D Agency",
      role: t("exp.cd.role"),
      period: "2022 – 2025",
      description: t("exp.cd.desc"),
      tags: ["Web Dev", "Branding", "Video", "E-Commerce"],
    },
    {
      company: "Nokta Radio",
      role: t("exp.nokta.role"),
      period: "2020 – 2022",
      description: t("exp.nokta.desc"),
      tags: ["Full-Stack", "Brand Identity", "Team Lead"],
    },
    {
      company: "Nokta Newspaper",
      role: t("exp.nokta_paper.role"),
      period: "2018 – 2019",
      description: t("exp.nokta_paper.desc"),
      tags: ["Editorial Design", "Print Media", "Fast-paced"],
    },
    {
      company: "Caprice Magazine",
      role: t("exp.caprice.role"),
      period: "2016 – 2018",
      description: t("exp.caprice.desc"),
      tags: ["Graphic Design", "Publishing", "Layout"],
    }
  ];

  return (
    <section id="work" className="section-dark py-28 md:py-36">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">
          {t("exp.label")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="apple-section-heading apple-heading text-[#f5f5f7] mb-4">
          {t("exp.title")}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[#f5f5f7]/75 apple-body text-lg mb-16 max-w-xl">
          {t("exp.subtitle")}
        </motion.p>

        <div className="grid gap-6">
          {experiences.map((exp, i) => (
            <motion.div key={exp.company} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className={`group glass-layer-2 glass-blue rounded-[20px] p-8 md:p-10 border border-white/25 hover:glass-glow-blue shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-all duration-500 ${exp.highlight ? "ring-1 ring-[#0071e3]/35" : ""}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-semibold text-white apple-heading">{exp.company}</h3>
                    {exp.highlight && (
                      <motion.span 
                        className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0071e3]/20 text-[#4da6ff] border border-[#4da6ff]/40 animate-glow-pulse"
                        animate={{ boxShadow: ["0 0 5px rgba(0, 113, 227, 0.3)", "0 0 15px rgba(0, 113, 227, 0.5)", "0 0 5px rgba(0, 113, 227, 0.3)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {t("exp.active")}
                      </motion.span>
                    )}
                  </div>
                  <p className="text-white/85 text-base mt-1.5">{exp.role}</p>
                </div>
                <motion.span 
                  className="text-sm font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#0071e3]/20 text-[#4da6ff] border border-[#4da6ff]/40 whitespace-nowrap md:mt-1 animate-glow-pulse"
                  animate={{ boxShadow: ["0 0 5px rgba(0, 113, 227, 0.3)", "0 0 15px rgba(0, 113, 227, 0.5)", "0 0 5px rgba(0, 113, 227, 0.3)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {exp.period}
                </motion.span>
              </div>
              <p className="text-white/75 apple-body text-base leading-relaxed mb-6">{exp.description}</p>
              <div className="flex flex-wrap gap-2.5">
                {exp.tags.map((tag) => (
                  <motion.span 
                    key={tag} 
                    className="text-xs font-semibold px-4 py-2 rounded-full bg-[#0071e3]/18 text-[#4da6ff] border border-[#4da6ff]/45 transition-all duration-300"
                    whileHover={{ 
                      backgroundColor: "rgba(0, 113, 227, 0.2)",
                      borderColor: "rgba(0, 113, 227, 0.6)",
                      scale: 1.05
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
