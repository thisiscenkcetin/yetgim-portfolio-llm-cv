import { useLang } from "@/contexts/LangContext";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="section-dark py-10 border-t border-[#f5f5f7]/[0.04]">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[#f5f5f7]/30 text-sm font-medium">cenk.dev</span>
          <p className="text-[#f5f5f7]/30 text-xs">
            © {new Date().getFullYear()} Cenk Çetin. {t("footer.copy")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
