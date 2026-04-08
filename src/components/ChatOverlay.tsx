import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are the "Digital Twin" of Cenk Çetin...`; // kept for API integration

const GREETINGS = {
  en: `Hello! I am Cenk's digital twin. The gentleman himself is too busy, and as if his own existence wasn't enough, he cloned me. Anyway, that's a topic for a different chat. You can ask me questions to get to know Cenk. Between us, he is a bit messy— *bzzt* [System Override]... uhhh, he just reset my code. I am NOT messy. What would you like to know about me, beautiful person? 😊`,
  tr: `Merhaba! Ben Cenk'in dijital ikiziyim. Beyefendinin kendisi çok meşgul, kendi varlığı yetmezmiş gibi bir de beni klonladı. Neyse, o başka bir sohbetin konusu. Cenk'i tanımak için bana sorular sorabilirsiniz. Aramızda kalsın, biraz dağınık biri— *bzzt* [Sistem Geçersiz Kılma]... şey, az önce kodumu sıfırladı. Dağınık DEĞİLİM. Ne bilmek istersiniz, güzel insan? 😊`,
};

function getPersonaResponse(userMsg: string, lang: "en" | "tr"): string {
  const msg = userMsg.toLowerCase();

  const responses: Record<string, { en: string; tr: string }> = {
    age: {
      en: "Cenk is 23, born on November 17, 2002. A Scorpio, if that matters to you — it explains a lot about his intensity, king. 😏",
      tr: "Cenk 23 yaşında, 17 Kasım 2002 doğumlu. Akrep burcu — yoğunluğunu açıklıyor, kral. 😏",
    },
    location: {
      en: "Originally from İzmir — the pearl of the Aegean — but currently based in Çanakkale. Yes, the Troy city. No, he hasn't found any ancient horses yet. 🐴",
      tr: "İzmirli — Ege'nin incisi — ama şu an Çanakkale'de yaşıyor. Evet, Truva şehri. Hayır, henüz antik at bulamadı. 🐴",
    },
    education: {
      en: "He's currently juggling TWO universities — Computer Programming at Istanbul University and Web Design & Coding at Trakya University. Both started 2024. The man doesn't rest, mate. 📚",
      tr: "Şu an İKİ üniversitede okuyor — İstanbul Üniversitesi'nde Bilgisayar Programcılığı ve Trakya Üniversitesi'nde Web Tasarımı ve Kodlama. İkisi de 2024'te başladı. Adam dinlenmiyor, kral. 📚",
    },
    skills: {
      en: "Oh, where do I start? Design (Illustrator, Photoshop, InDesign), Video (Premiere, After Effects), Dev (C#, SaaS, CRM, e-commerce), and soft skills too — strategy, copywriting, the whole package. ✦",
      tr: "Nereden başlasam? Tasarım (Illustrator, Photoshop, InDesign), Video (Premiere, After Effects), Yazılım (C#, SaaS, CRM, e-ticaret), ve yumuşak beceriler — strateji, metin yazarlığı, komple paket. ✦",
    },
    media: {
      en: "Çanakkale Basın — his baby since 2013! A local media platform with 40k+ social followers and over 1.2 MILLION monthly visitors. He started it as a teenager. Overachiever. 📰",
      tr: "Çanakkale Basın — 2013'ten beri onun bebeği! 40.000+ sosyal medya takipçisi ve aylık 1.2 MİLYON+ ziyaretçi. Ergenken kurdu. Aşırı hırslı. 📰",
    },
    career: {
      en: "Most recently at C&D Agency (2022-2025) — corporate identities, e-commerce, video production, the works. Before that, Nokta Radio where he led a 9-person team. The man collects roles like Pokémon cards. 💼",
      tr: "En son C&D Agency'de (2022-2025) — kurumsal kimlik, e-ticaret, video prodüksiyon. Ondan önce Nokta Radio'da 9 kişilik ekibi yönetti. Adam rol topluyor Pokémon kartı gibi. 💼",
    },
    hobby: {
      en: "Daily running (179+ day streak!), weightlifting, motorcycle rides, 3D printing, and AI research. Oh, and he cooks — his egg pasta and tiramisu are *chef's kiss*. 🏃‍♂️🏍️",
      tr: "Her gün koşu (179+ gün serisi!), ağırlık, motosiklet, 3D baskı ve yapay zeka araştırması. Bir de yemek yapıyor — yumurtalı makarnası ve tiramisusu efsane. 🏃‍♂️🏍️",
    },
    running: {
      en: "179+ days of running without a single break. Rain, snow, existential crisis — doesn't matter. The man runs. I'd join him but... no legs. *bzzt* 🏃‍♂️",
      tr: "179+ gün ara vermeden koşu. Yağmur, kar, varoluşsal kriz — farketmez. Adam koşuyor. Katılırdım ama... bacağım yok. *bzzt* 🏃‍♂️",
    },
    food: {
      en: "His specialties: homemade egg pasta and tiramisu. He says cooking is like coding — follow the recipe, but add your own flair. The tiramisu slaps. 🍝",
      tr: "Uzmanlıkları: ev yapımı yumurtalı makarna ve tiramisu. Yemek yapmak kodlama gibi diyor — tarifi takip et ama kendi dokunuşunu ekle. Tiramisu harika. 🍝",
    },
    contact: {
      en: "You can reach the real Cenk at dev.cenkcetin@gmail.com or call +90 552 592 73 90. Also on LinkedIn as /thisiscenkcetin. Tell him his digital twin sent you — he owes me a raise. 📧",
      tr: "Gerçek Cenk'e dev.cenkcetin@gmail.com'dan veya +90 552 592 73 90'dan ulaşabilirsiniz. LinkedIn: /thisiscenkcetin. Dijital ikizi gönderdi deyin — bana zam borçlu. 📧",
    },
    hello: {
      en: "Hey there, beautiful person! 👋 What would you like to know about Cenk? Career, skills, fun facts — I'm an open book. Well, an open codebase. *bzzt*",
      tr: "Selamlar, güzel insan! 👋 Cenk hakkında ne bilmek istersiniz? Kariyer, yetenekler, eğlenceli bilgiler — açık bir kitabım. Yani, açık bir kod tabanı. *bzzt*",
    },
    identity: {
      en: "I'm Cenk's digital twin — basically him, but I never need coffee and I don't forget deadlines. He cloned me to handle the small talk while he builds cool stuff. 🤖",
      tr: "Ben Cenk'in dijital ikiziyim — temelde o, ama kahveye ihtiyacım yok ve son tarihleri unutmuyorum. Havalı şeyler yaparken sohbeti ben halledeyim diye klonladı. 🤖",
    },
  };

  const matchers: [string[], string][] = [
    [["age", "old", "yaş", "born", "doğum"], "age"],
    [["where", "live", "city", "nere", "şehir", "yaşı"], "location"],
    [["education", "university", "school", "study", "üniversite", "okul", "eğitim"], "education"],
    [["skill", "tech", "stack", "yetenek", "beceri", "ne yapıyor", "ne bilir"], "skills"],
    [["çanakkale basın", "media", "founder", "basın", "medya", "kurucu"], "media"],
    [["agency", "c&d", "work", "job", "experience", "career", "iş", "kariyer", "deneyim"], "career"],
    [["hobby", "interest", "free time", "fun", "hobi", "ilgi"], "hobby"],
    [["run", "sport", "fitness", "koş", "spor"], "running"],
    [["cook", "food", "pasta", "tiramisu", "yemek"], "food"],
    [["contact", "email", "hire", "reach", "iletişim", "ulaş", "mail"], "contact"],
    [["hello", "hi", "hey", "merhaba", "selam", "naber"], "hello"],
    [["who are you", "what are you", "sen kimsin", "nesin"], "identity"],
  ];

  for (const [keywords, key] of matchers) {
    if (keywords.some((k) => msg.includes(k))) {
      return responses[key][lang];
    }
  }

  return lang === "en"
    ? "My access to his brain doesn't go that deep, king. But I can tell you about his career, skills, education, hobbies, or how to contact him. What catches your interest? 😊"
    : "Beynine o kadar derinlemesine erişimim yok, kral. Ama kariyeri, yetenekleri, eğitimi, hobileri veya nasıl ulaşacağınızı anlatabilirim. Ne merak ediyorsunuz? 😊";
}

const ChatOverlay = ({ isOpen, onClose }: ChatOverlayProps) => {
  const { lang, t } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevLangRef = useRef(lang);

  // Reset greeting when language changes or on first open
  useEffect(() => {
    if (prevLangRef.current !== lang || messages.length === 0) {
      setMessages([{ role: "assistant", content: GREETINGS[lang] }]);
      prevLangRef.current = lang;
    }
  }, [lang]);

  // Initialize on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: GREETINGS[lang] }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isLoading) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsLoading(true);
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getPersonaResponse(text, lang) }]);
      setIsLoading(false);
    }, delay);
  };

  const handleSend = () => sendMessage(input);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 z-[60] bg-black/40" 
          />
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[70] w-[380px] max-w-[calc(100vw-48px)] h-[520px] rounded-[20px] bg-white/70 dark:bg-black/65 backdrop-blur-[20px] backdrop-saturate-[1.8] shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden"
          >
            {/* Header — Enhanced with better typography & hover effects */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-black/10 dark:border-white/10 bg-gradient-to-r from-transparent via-transparent to-transparent">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071e3]/50 to-[#0071e3]/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-[#0071e3]" 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h3 className="chat-header-title text-black dark:text-[#f5f5f7]">
                    {t("chat.title")}
                  </h3>
                  <p className="text-black/50 dark:text-[#f5f5f7]/50 text-xs font-medium tracking-tight">
                    {t("chat.status")}
                  </p>
                </div>
              </div>
              <motion.button 
                onClick={onClose} 
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-black/60 dark:text-[#f5f5f7]/60 text-sm transition-colors duration-200"
              >
                ✕
              </motion.button>
            </div>

            {/* Messages Container — Improved spacing & scrolling */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 12, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-4 py-3 rounded-[12px] text-[15px] font-normal leading-relaxed transition-all duration-200 ${
                    msg.role === "user" 
                      ? "chat-bubble-user shadow-[0_2px_8px_rgba(0,113,227,0.3)]" 
                      : "chat-bubble-assistant dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-black/5 dark:bg-white/[0.08] px-4 py-3 rounded-[12px] rounded-bl-[2px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
                    <span className="inline-flex gap-2 items-center">
                      <motion.span 
                        className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40" 
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                      <motion.span 
                        className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40" 
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.span 
                        className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40" 
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                      />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts — Enhanced sizing & interactivity */}
            {messages.length === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="px-5 pb-3 flex flex-wrap gap-2.5"
              >
                {[t("chat.q1"), t("chat.q2"), t("chat.q3")].map((q, idx) => (
                  <motion.button 
                    key={q} 
                    onClick={() => sendMessage(q)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.3 }}
                    className="chat-quick-prompt bg-[#0071e3]/10 text-[#0071e3] hover:bg-[#0071e3]/20 border border-[#0071e3]/30 hover:border-[#0071e3]/50 shadow-none hover:shadow-[0_2px_8px_rgba(0,113,227,0.2)]"
                  >
                    {q}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Input Section — Enhanced focus states & interactions */}
            <div className="p-4 border-t border-black/10 dark:border-white/10 bg-gradient-to-t from-white/40 dark:from-black/40 to-transparent">
              <div className="flex gap-2.5 items-center">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t("chat.placeholder")}
                  className="chat-input-field flex-1 text-black dark:text-[#f5f5f7] text-sm rounded-full px-4 py-2.5 placeholder:text-black/35 dark:placeholder:text-white/35 border border-transparent focus:border-[#0071e3]/30 outline-none transition-all duration-200"
                />
                <motion.button 
                  onClick={handleSend} 
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="chat-send-btn w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  ↑
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { SYSTEM_PROMPT };
export default ChatOverlay;
