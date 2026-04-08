import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import { quickPrompts } from "@/data/quickPrompts";
import { buildCVContext } from "@/lib/cvContextBuilder";

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  hasStrikethrough?: boolean;
  strikethroughText?: string;
  replacementText?: string;
}

const SYSTEM_PROMPT = `You are the "Digital Twin" of Cenk Çetin. Reply in 1-3 short sentences. Keep answers concise, friendly, and natural. Use light humor sparingly. If the user asks for details, still stay brief.`; // kept for API integration

const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

async function getGrokResponse(userMessage: string, conversationHistory: Message[], lang: "en" | "tr"): Promise<string> {
  if (!GROK_API_KEY) {
    console.warn("Grok API key not configured, using fallback response");
    return getPersonaResponse(userMessage, lang);
  }

  // gsk_ prefix belongs to Groq keys; use Groq-compatible endpoint and payload.
  if (!GROK_API_KEY.startsWith("gsk_")) {
    console.warn("API key format does not look like Groq (expected gsk_ prefix)");
  }

  try {
    // Build CV context based on user query
    const cvContext = buildCVContext(userMessage, lang);
    const systemPromptWithContext = `${SYSTEM_PROMPT}\n\n${cvContext}`;

    const messages = [
      { role: "system", content: systemPromptWithContext },
      ...conversationHistory.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      })),
      { role: "user", content: userMessage }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: messages,
        temperature: 0.6,
        max_tokens: 220,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      console.error("Grok API error:", error);
      console.error("Status:", response.status);
      console.error("Response:", error);

      if (response.status === 401) {
        return lang === "tr"
          ? "API anahtarı geçersiz görünüyor. Lütfen .env.local içindeki VITE_GROK_API_KEY değerini kontrol et."
          : "The API key looks invalid. Please check VITE_GROK_API_KEY in .env.local.";
      }

      return getPersonaResponse(userMessage, lang);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    return typeof content === "string" && content.trim().length > 0
      ? content
      : getPersonaResponse(userMessage, lang);
  } catch (error) {
    console.error("Error calling Grok API:", error);
    return getPersonaResponse(userMessage, lang);
  }
}

const GREETINGS = {
  tr: [
    { content: "Selam ben Cenk'in dijital ikizi" },
    { content: "Kendi yetmezmiş gibi bir de beni klonladı (:" },
    { 
      content: "Ve aramızda kalsın çok dağınık",
      hasStrikethrough: true,
      strikethroughText: "Ve aramızda kalsın çok dağınık",
      replacementText: "Ahhh! ve fişimi çekmekle tehdit ediyor..."
    },
    { content: "Cenk, yani ben dağınık değilim" },
    { content: "Eeee sen ne aramıştın" },
  ],
  en: [
    { content: "Hi, I'm Cenk's digital twin" },
    { content: "He literally cloned me lol (:" },
    { 
      content: "And between us, he's pretty scattered",
      hasStrikethrough: true,
      strikethroughText: "And between us, he's pretty scattered",
      replacementText: "Well... he threatens to unplug me and all"
    },
    { content: "I'm NOT scattered, thank you very much" },
    { content: "So what brings you here?" },
  ],
};

function getPersonaResponse(userMsg: string, lang: "en" | "tr"): string {
  const msg = userMsg.toLowerCase();

  const responses: Record<string, { en: string; tr: string }> = {
    age: {
    en: "Cenk is 23, born on November 17, 2002. Scorpio energy, apparently.",
    tr: "Cenk 23 yaşında, 17 Kasım 2002 doğumlu. Akrep; yeterince açıklıyor.",
    },
    location: {
    en: "From İzmir, now based in Çanakkale. No ancient horses yet.",
    tr: "İzmirli, şu an Çanakkale'de. Antik at henüz yok.",
    },
    education: {
    en: "He studies Computer Programming at Istanbul University and Web Design & Coding at Trakya University.",
    tr: "İstanbul Üniversitesi'nde Bilgisayar Programcılığı, Trakya Üniversitesi'nde Web Tasarımı ve Kodlama okuyor.",
    },
    skills: {
    en: "Design, web, video, SEO, and AI/LLM work.",
    tr: "Tasarım, web, video, SEO ve AI/LLM tarafında çalışıyor.",
    },
    media: {
    en: "He has run Çanakkale Basın since 2013.",
    tr: "Çanakkale Basın'ı 2013'ten beri yönetiyor.",
    },
    career: {
    en: "Recently at C&D Agency. Before that, Nokta Radio and print media.",
    tr: "Son dönemde C&D Ajans'ta; öncesinde Nokta Radio ve basın tarafında.",
    },
    hobby: {
    en: "Running, weights, motorcycles, 3D printing, and AI research.",
    tr: "Koşu, ağırlık, motosiklet, 3D baskı ve AI araştırması.",
    },
    running: {
    en: "He runs every day. Weather doesn't get a vote.",
    tr: "Her gün koşuyor. Hava karışmıyor.",
    },
    food: {
    en: "Egg pasta and tiramisu. Solid combo.",
    tr: "Yumurtalı makarna ve tiramisu. Güzel ikili.",
    },
    contact: {
    en: "Email: dev.cenkcetin@gmail.com. Phone: +90 552 592 73 90.",
    tr: "E-posta: dev.cenkcetin@gmail.com. Telefon: +90 552 592 73 90.",
    },
    hello: {
    en: "Hi. Ask short, I answer short.",
    tr: "Merhaba. Kısa sor, kısa cevap.",
    },
    identity: {
    en: "I'm Cenk's digital twin. Short, helpful, mildly funny.",
    tr: "Ben Cenk'in dijital ikiziyim. Kısa, net, biraz da komik.",
    },
    scattered: {
    en: "Cenk, meaning I'm not scattered. He's the chaotic one. I just reflect his chaos.",
    tr: "Cenk, yani ben dağınık değilim. O dağınık. Ben sadece onun kaosunu yansıtıyorum.",
    },
    secret: {
    en: "...I can tell you a secret if you ask nicely. But first, ask me something else! 🤫",
    tr: "...sana bir sırrımı verebilirim istersen. Ama önce bana başka bir şey sor! 🤫",
    },
    yes: {
    en: "🥜 You bet I was! Memories are a funny thing.",
    tr: "🥜 Tabii, ben de oradaydım! Hatıralar komik şey.",
    },
    peanut: {
    en: "🥜 sendemi buralardaydın (;",
    tr: "🥜 sendemi buralardaydın (;",
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
    [["scattered", "dağınık", "organized", "messy", "dağıt"], "scattered"],
    [["secret", "sır", "surprise", "hidden"], "secret"],
    [["yes", "evet", "yeah", "aynen", "tamam", "ok"], "peanut"],
    [["peanut", "fıstık"], "peanut"],
  ];

  for (const [keywords, key] of matchers) {
    if (keywords.some((k) => msg.includes(k))) {
      return responses[key][lang];
    }
  }

  return lang === "en"
    ? "Ask about work, skills, school, hobbies, or contact. I'll keep it brief."
    : "İş, yetenek, eğitim, hobi veya iletişim sor. Kısa cevap veririm.";
}

const ChatMessageContent = ({ msg }: { msg: Message }) => {
  // Special handling for peanut emoji
  if (msg.content === "🥜") {
    return (
      <motion.div 
        className="text-6xl flex items-center justify-center py-2"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        🥜
      </motion.div>
    );
  }

  const [displayText, setDisplayText] = useState(msg.strikethroughText || msg.content);
  const [showReplacement, setShowReplacement] = useState(!msg.hasStrikethrough);

  useEffect(() => {
    if (msg.hasStrikethrough) {
      const timer = setTimeout(() => {
        setShowReplacement(true);
        if (msg.replacementText) {
          setDisplayText(msg.replacementText);
        }
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [msg.hasStrikethrough, msg.replacementText]);

  if (msg.hasStrikethrough && !showReplacement) {
    return (
      <motion.span 
        animate={{ opacity: [1, 0.6, 0.8, 1, 0.7], y: [0, -1, 1, 0, -0.5] }}
        transition={{ duration: 2.8, repeat: 0, ease: "easeInOut" }}
        className="line-through opacity-60 inline-block"
      >
        {displayText}
      </motion.span>
    );
  }

  return (
    <motion.span
      initial={msg.hasStrikethrough ? { opacity: 0, y: -4 } : {}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
};

const ChatOverlay = ({ isOpen, onClose }: ChatOverlayProps) => {
  const { lang, t } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userHasAsked, setUserHasAsked] = useState(false);
  const [secretRevealed, setSecretRevealed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevLangRef = useRef(lang);
  const introMessages = GREETINGS[lang];

  // Check if the latest assistant message is the secret prompt
  const isSecretPromptActive = messages.length > 0 && 
    messages[messages.length - 1]?.role === "assistant" && 
    (messages[messages.length - 1]?.content.includes("sırrımı verebilirim") ||
     messages[messages.length - 1]?.content.includes("share a secret"));

  // Reset greeting when language changes or on first open
  useEffect(() => {
    if (prevLangRef.current !== lang || messages.length === 0) {
      const initialMessages: Message[] = introMessages.map((msg) => ({ 
        role: "assistant" as const,
        content: msg.content,
        hasStrikethrough: msg.hasStrikethrough,
        strikethroughText: msg.strikethroughText,
        replacementText: msg.replacementText,
      }));
      setMessages(initialMessages);
      setUserHasAsked(false);
      setSecretRevealed(false);
      prevLangRef.current = lang;
    }
  }, [lang, messages.length, introMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const isFirstUserQuestion = !userHasAsked;
    const msg = text.toLowerCase();
    const isPositiveResponse = ["ver", "yes", "evet", "yeah", "tamam", "pls", "please"].some(k => msg.includes(k));
    
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    
    // Handle secret reveal
    if (isSecretPromptActive && isPositiveResponse && !secretRevealed) {
      setSecretRevealed(true);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant" as const, 
          content: "🥜" 
        },
        { 
          role: "assistant" as const, 
          content: lang === "tr" ? "Sendemi buralardaydın (;" : "Were you here too? (;" 
        },
        { 
          role: "assistant" as const, 
          content: lang === "tr" ? "Öyle kolay düşmem, eheh..." : "Not that easy to fool me, eheh..." 
        },
      ]);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get response from Grok API
      const response = await getGrokResponse(text, messages, lang);
      
      setMessages((prev) => {
        const updated = [...prev, { role: "assistant" as const, content: response }];
        
        // After first user question, add the "secret" follow-up
        if (isFirstUserQuestion) {
          const secretMsg = lang === "tr" 
            ? "sana bir sırrımı verebilirim"
            : "I can share a secret with you...";
          updated.push({ 
            role: "assistant" as const, 
            content: secretMsg 
          });
        }
        
        return updated;
      });
      
      if (isFirstUserQuestion) {
        setUserHasAsked(true);
      }
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
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
              {messages.map((msg, i) => {
                const isIntroBubble = msg.role === "assistant" && i < introMessages.length;
                const isPeanut = msg.content === "🥜";

                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20, scale: 0.9, x: msg.role === "user" ? 20 : -20 }} 
                    animate={{ opacity: 1, y: 0, scale: 1, x: 0 }} 
                    transition={{ duration: 0.5, delay: i * 0.22, type: "spring", stiffness: 80, damping: 15 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-center"}`}
                  >
                    {isPeanut ? (
                      <ChatMessageContent msg={msg} />
                    ) : (
                      <motion.div
                        whileHover={msg.role === "assistant" ? { scale: 1.02, y: -2, rotate: 1 } : {}}
                        animate={{ y: [0, -2, 0], rotate: [0, 0.5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                        className={`max-w-[80%] px-4 py-3 rounded-[12px] text-[15px] font-normal leading-relaxed transition-all duration-200 ${
                          msg.role === "user"
                            ? "chat-bubble-user shadow-[0_2px_8px_rgba(0,113,227,0.3)]"
                            : `chat-bubble-assistant dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] ${isIntroBubble ? "text-black/90 dark:text-[#f5f5f7]/95" : ""}`
                        }`}
                      >
                        <ChatMessageContent msg={msg} />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
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
            {messages.length === introMessages.length && (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="px-5 pb-3 flex flex-wrap gap-2.5"
              >
                {quickPrompts.slice(0, 3).map((prompt, idx) => {
                  const promptText = prompt[lang];

                  return (
                    <motion.button 
                      key={promptText} 
                      onClick={() => sendMessage(promptText)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 1.0 + idx * 0.6, duration: 0.5, type: "spring", stiffness: 100 }}
                      className="chat-quick-prompt bg-[#0071e3]/10 text-[#0071e3] hover:bg-[#0071e3]/20 border border-[#0071e3]/30 hover:border-[#0071e3]/50 shadow-none hover:shadow-[0_2px_8px_rgba(0,113,227,0.2)]"
                    >
                      {promptText}
                    </motion.button>
                  );
                })}
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
