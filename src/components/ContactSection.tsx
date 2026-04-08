import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const ContactSection = () => {
  const { t } = useLang();

  return (
    <section id="contact" className="section-dark-alt py-28 md:py-36">
      <div className="max-w-[980px] mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">
          {t("contact.label")}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="apple-section-heading apple-heading text-[#f5f5f7] mb-6">
          {t("contact.title")}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[#f5f5f7]/60 text-lg apple-body mb-12 max-w-lg mx-auto">
          {t("contact.subtitle")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:dev.cenkcetin@gmail.com" className="btn-primary-apple shadow-apple hover:shadow-apple-lg">
            dev.cenkcetin@gmail.com
          </a>
          <a href="tel:+905525927390" className="btn-pill-apple btn-pill-dark">
            +90 552 592 73 90
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-10 flex justify-center gap-8">
          <a href="https://linkedin.com/in/thisiscenkcetin" target="_blank" rel="noopener noreferrer" className="text-apple-grey hover:text-apple-blue text-sm transition-colors duration-300">LinkedIn</a>
          <a href="https://behance.net/cenkcetin" target="_blank" rel="noopener noreferrer" className="text-apple-grey hover:text-apple-blue text-sm transition-colors duration-300">Behance</a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
