import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "tr";

interface Translations {
  [key: string]: { en: string; tr: string };
}

const translations: Translations = {
  // Navbar
  "nav.work": { en: "Work", tr: "Deneyim" },
  "nav.skills": { en: "Skills", tr: "Yetenekler" },
  "nav.education": { en: "Education", tr: "Eğitim" },
  "nav.contact": { en: "Contact", tr: "İletişim" },
  "nav.cta": { en: "Let's Talk", tr: "İletişime Geç" },

  // Hero
  "hero.subtitle": { en: "Developer, Designer, Digital Creator.", tr: "Geliştirici, Tasarımcı, Dijital İçerik Üretici." },
  "hero.learn": { en: "Learn more", tr: "Daha fazla" },
  "hero.bubble": { en: "Click to chat with my AI twin ✨", tr: "AI ikizimle sohbet et ✨" },

  // Experience
  "exp.label": { en: "Professional Journey", tr: "Profesyonel Yolculuk" },
  "exp.title": { en: "Experience.", tr: "Deneyim." },
  "exp.subtitle": { en: "A decade of building brands, products, and digital experiences.", tr: "On yıllık marka, ürün ve dijital deneyim inşası." },
  "exp.active": { en: "Active", tr: "Aktif" },

  "exp.canakkale.role": { en: "Founder", tr: "Kurucu" },
  "exp.canakkale.desc": {
    en: "Founded and managed a local media platform reaching 40,000+ social media followers and over 1,200,000 monthly website visitors. Oversees content strategy, editorial direction, and digital growth.",
    tr: "40.000+ sosyal medya takipçisi ve aylık 1.200.000+ web sitesi ziyaretçisine ulaşan yerel bir medya platformu kurdu ve yönetti. İçerik stratejisi, editöryal yön ve dijital büyümeyi denetler."
  },
  "exp.nokta.role": { en: "Web Developer & Graphic Designer", tr: "Web Geliştirici & Grafik Tasarımcı" },
  "exp.nokta.desc": {
    en: "Launched an online radio project, creating the technical infrastructure and brand identity. Led a 9-person team, producing programs with politicians and artists.",
    tr: "Teknik altyapı ve marka kimliği oluşturarak online radyo projesi başlattı. 9 kişilik ekibi yönetti, politikacılar ve sanatçılarla programlar üretti."
  },
  "exp.cd.role": { en: "Web Developer & Graphic Designer", tr: "Web Geliştirici & Grafik Tasarımcı" },
  "exp.cd.desc": {
    en: "Designed corporate identities, created digital content, managed social media campaigns, and built websites and e-commerce platforms. Produced video content and drone footage for visual storytelling.",
    tr: "Kurumsal kimlik tasarladı, dijital içerik oluşturdu, sosyal medya kampanyalarını yönetti, web siteleri ve e-ticaret platformları geliştirdi. Görsel hikaye anlatımı için video içerik ve drone çekimleri üretti."
  },

  // Skills
  "skills.label": { en: "Capabilities", tr: "Yetenekler" },
  "skills.title": { en: "Skills.", tr: "Beceriler." },
  "skills.subtitle": { en: "A versatile toolkit refined across design, code, and creative storytelling.", tr: "Tasarım, kod ve yaratıcı hikaye anlatımında rafine edilmiş çok yönlü bir araç seti." },
  "skills.design": { en: "Design", tr: "Tasarım" },
  "skills.design.desc": { en: "Pixel-perfect visuals & brand systems", tr: "Piksel mükemmelliğinde görseller & marka sistemleri" },
  "skills.dev": { en: "Development", tr: "Geliştirme" },
  "skills.dev.desc": { en: "Modern web platforms & tools", tr: "Modern web platformları & araçları" },
  "skills.video": { en: "Video & Animation", tr: "Video & Animasyon" },
  "skills.video.desc": { en: "Cinematic storytelling & motion", tr: "Sinematik hikaye anlatımı & hareket" },
  "skills.marketing": { en: "Digital Marketing", tr: "Dijital Pazarlama" },
  "skills.marketing.desc": { en: "Growth, strategy & engagement", tr: "Büyüme, strateji & etkileşim" },

  // Education
  "edu.label": { en: "Education", tr: "Eğitim" },
  "edu.title": { en: "Learning.", tr: "Öğrenim." },
  "edu.subtitle": { en: "Currently pursuing dual degrees in Computer Science and Web Technologies.", tr: "Bilgisayar Bilimleri ve Web Teknolojileri alanlarında çift diploma programına devam ediyor." },
  "edu.istanbul": { en: "Computer Programming", tr: "Bilgisayar Programcılığı" },
  "edu.trakya": { en: "Web Design and Coding", tr: "Web Tasarımı ve Kodlama" },

  // Contact
  "contact.label": { en: "Get in Touch", tr: "İletişime Geç" },
  "contact.title": { en: "Let's work together.", tr: "Birlikte çalışalım." },
  "contact.subtitle": { en: "Whether you need a website, brand identity, or digital strategy — I'm ready to create something extraordinary.", tr: "Web sitesi, marka kimliği veya dijital strateji — olağanüstü bir şey yaratmaya hazırım." },

  // Chat
  "chat.title": { en: "Cenk's Digital Twin", tr: "Cenk'in Dijital İkizi" },
  "chat.status": { en: "Online • Ask me anything", tr: "Çevrimiçi • Bana her şeyi sor" },
  "chat.placeholder": { en: "Ask me anything...", tr: "Bana bir şey sor..." },
  "chat.q1": { en: "What does Cenk do?", tr: "Cenk ne yapıyor?" },
  "chat.q2": { en: "His hobbies?", tr: "Hobileri neler?" },
  "chat.q3": { en: "How to contact?", tr: "Nasıl ulaşırım?" },

  // Footer
  "footer.copy": { en: "Built with precision.", tr: "Hassasiyetle tasarlandı." },
};

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
