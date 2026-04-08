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
    <section id="skills" className="section-dark py-28 md:py-36 relative overflow-hidden">
      {/* Fallback glow orbs for atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-apple-blue/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-apple-blue/5 blur-[120px]" />
      </div>

      <div className="max-w-[980px] mx-auto px-6 relative z-10">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">
          {t("skills.label")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-[56px] font-bold apple-heading text-[#f5f5f7] mb-4 leading-[1.05]">
          {t("skills.title")}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-apple-grey apple-body text-lg mb-16 max-w-xl">
          {t("skills.subtitle")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skills.map((skill, i) => (
            <motion.div key={skill.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[20px] p-8 transition-all duration-500 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:-translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            >
              {/* Subtle hover spotlight effect via css radial gradient trick built with group-hover opacity */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,113,227,0.1),transparent_70%)]" />
              <div className="relative z-10 flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-semibold text-[#f5f5f7] apple-heading">{skill.category}</h3>
                  <p className="text-[#f5f5f7]/40 text-sm mt-1">{skill.description}</p>
                </div>
                <span className="text-apple-blue/60 text-lg">{skill.icon}</span>
              </div>
              <div className="relative z-10 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="text-sm font-medium px-4 py-2 rounded-pill bg-white/5 text-[#f5f5f7]/70 group-hover:bg-apple-blue/[0.15] group-hover:text-apple-blue/90 border border-white/5 transition-colors duration-300 backdrop-blur-md">{item}</span>
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
