import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { key: "nav.work", id: "work" },
    { key: "nav.skills", id: "skills" },
    { key: "nav.education", id: "education" },
    { key: "nav.contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 bg-black/80 ${
          scrolled ? "py-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]" : "py-3.5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
        }`}
        style={{
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
        }}
      >
        <div className="apple-container flex justify-between items-center">
          {/* Logo & Brand */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-[#f5f5f7] text-sm font-semibold tracking-tight group-hover:text-[#0071e3] transition-colors duration-300">
              cenk.dev
            </span>
          </motion.button>

          {/* Desktop Nav Links — Apple 12px, weight 400 */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[#f5f5f7]/70 hover:text-[#f5f5f7] text-xs font-normal transition-colors duration-300 relative pb-0.5 group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                {t(link.key)}
                <motion.span
                  className="absolute bottom-0 left-0 h-[1px] bg-[#0071e3]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <motion.button
              onClick={() => setLang(lang === "en" ? "tr" : "en")}
              className="text-[#f5f5f7]/70 hover:text-[#f5f5f7] text-xs font-medium px-3 py-2 rounded-lg bg-[#f5f5f7]/[0.06] hover:bg-[#f5f5f7]/10 transition-all duration-300 border border-[#f5f5f7]/[0.04] hover:border-[#f5f5f7]/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={lang === "en" ? "Türkçe'ye geç" : "Switch to English"}
            >
              {lang === "en" ? "TR" : "EN"}
            </motion.button>

            {/* CTA Button */}
            <motion.button
              onClick={() => scrollTo("contact")}
              className="hidden sm:block btn-primary-apple text-xs px-5 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t("nav.cta")}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#f5f5f7]/70 hover:text-[#f5f5f7] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[56px] left-0 right-0 z-40 lg:hidden bg-black/95 backdrop-blur-[20px] border-b border-[#f5f5f7]/10"
          >
            <div className="apple-container py-6 space-y-1">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="w-full text-left text-[#f5f5f7]/70 hover:text-[#f5f5f7] text-sm font-normal py-3 px-4 rounded-lg hover:bg-[#f5f5f7]/5 transition-colors duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  {t(link.key)}
                </motion.button>
              ))}
              <motion.div
                className="pt-2 mt-2 border-t border-[#f5f5f7]/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full btn-primary-apple py-2.5 text-sm"
                >
                  {t("nav.cta")}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer — Prevents content overlap */}
      <div className={`transition-all duration-500 ${scrolled ? "h-12" : "h-14 md:h-16"}`} />
    </>
  );
};

export default Navbar;
