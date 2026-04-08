import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const SkillsSection = () => {
  const { t } = useLang();

  const skills = [
    { category: t("skills.design"), description: t("skills.design.desc"), items: ["Adobe Illustrator", "Photoshop", "InDesign", "UI/UX", "Branding"], icon: "✦" },
    { category: t("skills.dev"), description: t("skills.dev.desc"), items: ["Corporate & Custom Websites", "E-Commerce", "SaaS & CRM", "C# Projects"], icon: "⟨/⟩" },
    { category: t("skills.video"), description: t("skills.video.desc"), items: ["Premiere Pro", "After Effects", "Audition", "Drone Footage"], icon: "▶" },
    { category: t("skills.marketing"), description: t("skills.marketing.desc"), items: ["SEO", "Social Media Management", "Digital Advertising", "Copywriting"], icon: "◎" },
  ];

  return (
    <section id="skills" className="section-dark py-28 md:py-36">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">
          {t("skills.label")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="apple-section-heading apple-heading text-[#f5f5f7] mb-4">
          {t("skills.title")}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-apple-grey apple-body text-lg mb-16 max-w-xl">
          {t("skills.subtitle")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skills.map((skill, i) => (
            <motion.div key={skill.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group card-glass-dark rounded-[20px] p-8 hover:shadow-apple-lg transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-semibold text-[#f5f5f7] apple-heading">{skill.category}</h3>
                  <p className="text-[#f5f5f7]/40 text-sm mt-1">{skill.description}</p>
                </div>
                <span className="text-apple-blue/60 text-lg">{skill.icon}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="text-sm font-medium px-4 py-2 rounded-full bg-[#f5f5f7]/10 text-[#f5f5f7]/80 group-hover:bg-[#0071e3]/20 group-hover:text-[#f5f5f7] transition-colors duration-300">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
