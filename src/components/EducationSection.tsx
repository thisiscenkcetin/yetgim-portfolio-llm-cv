import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const EducationSection = () => {
  const { t } = useLang();

  const education = [
    { school: "Istanbul University", program: t("edu.istanbul"), period: "2024 – Present" },
    { school: "Trakya University", program: t("edu.trakya"), period: "2024 – Present" },
  ];

  return (
    <section id="education" className="section-light py-28 md:py-36">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">
          {t("edu.label")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-[56px] font-bold apple-heading text-apple-text-primary mb-4 leading-[1.05]">
          {t("edu.title")}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-apple-text-secondary apple-body text-lg mb-16 max-w-xl">
          {t("edu.subtitle")}
        </motion.p>

        <div className="grid gap-5">
          {education.map((edu, i) => (
            <motion.div key={edu.school} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group bg-[#ffffff] rounded-[20px] p-8 md:p-10 shadow-apple hover:shadow-apple-hover hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-semibold text-apple-text-primary apple-heading">{edu.school}</h3>
                  <p className="text-apple-text-secondary text-base mt-2">{edu.program}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-pill bg-apple-blue/10 text-apple-blue whitespace-nowrap self-start">{edu.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
