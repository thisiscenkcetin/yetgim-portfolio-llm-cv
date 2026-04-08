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
    <section id="work" className="section-light py-28 md:py-36">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">
          {t("exp.label")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="apple-section-heading apple-heading text-[#1d1d1f] mb-4">
          {t("exp.title")}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-apple-text-secondary apple-body text-lg mb-16 max-w-xl">
          {t("exp.subtitle")}
        </motion.p>

        <div className="grid gap-6">
          {experiences.map((exp, i) => (
            <motion.div key={exp.company} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className={`group card-glass-light rounded-[20px] p-8 md:p-10 hover:shadow-apple-lg transition-all duration-500 hover:-translate-y-1 ${exp.highlight ? "ring-1 ring-[#0071e3]/20" : ""}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-semibold text-apple-text-primary apple-heading">{exp.company}</h3>
                    {exp.highlight && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3]">{t("exp.active")}</span>
                    )}
                  </div>
                  <p className="text-apple-text-secondary text-base mt-1.5">{exp.role}</p>
                </div>
                <span className="text-apple-grey text-sm font-medium whitespace-nowrap md:mt-1">{exp.period}</span>
              </div>
              <p className="text-[#1d1d1f]/70 apple-body text-base leading-relaxed mb-6">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-black/5 text-[#1d1d1f] group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3] transition-colors duration-300">{tag}</span>
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
