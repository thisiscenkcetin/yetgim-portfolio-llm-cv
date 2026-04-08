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
          <motion.a 
            href="mailto:dev.cenkcetin@gmail.com" 
            className="btn-primary-apple shadow-apple hover:shadow-apple-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            dev.cenkcetin@gmail.com
          </motion.a>
          <motion.a 
            href="tel:+905525927390" 
            className="btn-pill-apple btn-pill-dark"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            +90 552 592 73 90
          </motion.a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-10 flex justify-center gap-6">
          <motion.a 
            href="https://linkedin.com/in/thisiscenkcetin" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-apple-blue bg-apple-blue/10 border border-apple-blue/30 hover:bg-apple-blue/20 transition-all duration-300"
            whileHover={{ scale: 1.08, boxShadow: "0 0 15px rgba(0, 113, 227, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            LinkedIn
          </motion.a>
          <motion.a 
            href="https://www.instagram.com/cenk.php/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-apple-blue bg-apple-blue/10 border border-apple-blue/30 hover:bg-apple-blue/20 transition-all duration-300"
            whileHover={{ scale: 1.08, boxShadow: "0 0 15px rgba(0, 113, 227, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Instagram
          </motion.a>
          <motion.a 
            href="https://behance.net/cenkcetin" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-apple-blue bg-apple-blue/10 border border-apple-blue/30 hover:bg-apple-blue/20 transition-all duration-300"
            whileHover={{ scale: 1.08, boxShadow: "0 0 15px rgba(0, 113, 227, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Behance
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
