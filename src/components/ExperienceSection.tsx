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
      company: "Nokta Radio",
      role: t("exp.nokta.role"),
      period: "2020 – 2022",
      description: t("exp.nokta.desc"),
      tags: ["Full-Stack", "Brand Identity", "Team Lead"],
    },
    {
      company: "C&D Agency",
      role: t("exp.cd.role"),
      period: "2022 – 2025",
      description: t("exp.cd.desc"),
      tags: ["Web Dev", "Branding", "Video", "E-Commerce"],
    },
  ];

  return (
    <section id="work" className="section-light py-28 md:py-36 relative overflow-hidden">
      {/* Light atmospheric background */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-apple-blue/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-apple-blue/5 blur-[120px]" />
      </div>

      <div className="max-w-[980px] mx-auto px-6 relative z-10">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">
          {t("exp.label")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-[56px] font-bold apple-heading text-apple-text-primary mb-4 leading-[1.05]">
          {t("exp.title")}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-apple-text-secondary apple-body text-lg mb-16 max-w-xl">
          {t("exp.subtitle")}
        </motion.p>

        <div className="grid gap-6">
          {experiences.map((exp, i) => (
            <motion.div key={exp.company} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className={`group relative overflow-hidden rounded-[20px] p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,113,227,0.08)] ${exp.highlight ? "ring-1 ring-apple-blue/20" : ""}`}
            >
              {/* Subtle spotlight effect for light background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_100%_100%,rgba(0,113,227,0.03),transparent_70%)]" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-semibold text-apple-text-primary apple-heading">{exp.company}</h3>
                    {exp.highlight && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-pill bg-apple-blue/10 text-apple-blue">{t("exp.active")}</span>
                    )}
                  </div>
                  <p className="text-apple-text-secondary text-base mt-1.5">{exp.role}</p>
                </div>
                <span className="text-apple-grey text-sm font-medium whitespace-nowrap md:mt-1">{exp.period}</span>
              </div>
              <p className="relative z-10 text-apple-text-secondary apple-body text-base leading-relaxed mb-6">{exp.description}</p>
              <div className="relative z-10 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium px-3.5 py-1.5 rounded-pill bg-[#ffffff]/60 border border-black/5 text-apple-text-secondary group-hover:bg-apple-blue/[0.08] group-hover:border-apple-blue/10 group-hover:text-apple-blue transition-colors duration-300 backdrop-blur-sm shadow-sm">{tag}</span>
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
