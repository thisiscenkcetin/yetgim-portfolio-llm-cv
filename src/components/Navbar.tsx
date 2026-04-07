import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LangContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
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
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 glass-nav ${
        scrolled ? "py-2.5 shadow-[0_1px_0_rgba(245,245,247,0.06)]" : "py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[#f5f5f7] text-sm font-semibold tracking-tight cursor-pointer hover:text-apple-blue-dark transition-colors duration-300"
        >
          cenk.dev
        </span>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-[#f5f5f7]/70 hover:text-[#f5f5f7] text-xs font-normal transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-apple-blue-dark after:transition-all after:duration-300 hover:after:w-full"
            >
              {t(link.key)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "en" ? "tr" : "en")}
            className="text-[#f5f5f7]/60 hover:text-[#f5f5f7] text-xs font-medium px-3 py-1.5 rounded-pill bg-[#f5f5f7]/[0.06] hover:bg-[#f5f5f7]/10 transition-all duration-300 border border-[#f5f5f7]/[0.04]"
          >
            {lang === "en" ? "🇹🇷 TR" : "🇬🇧 EN"}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="bg-apple-blue hover:bg-apple-blue/90 text-[#f5f5f7] text-xs font-medium px-5 py-2 rounded-pill transition-all duration-300 hover:shadow-[0_2px_12px_rgba(0,113,227,0.35)]"
          >
            {t("nav.cta")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
