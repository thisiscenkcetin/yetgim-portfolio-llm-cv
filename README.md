# Cenk Çetin Portfolio CV

Kişisel portföy ve CV sitesi. React, Vite ve Tailwind ile hazırlandı; içinde kısa bir dijital ikiz sohbeti, iletişim alanı ve CV verileri var.

### Proje Önizlemeleri

![Demo 1](https://github.com/thisiscenkcetin/yetgim-portfolio-llm-cv/blob/main/demo/demo%20(1).png?raw=true)

![Demo 2](https://github.com/thisiscenkcetin/yetgim-portfolio-llm-cv/blob/main/demo/demo%20(2).png?raw=true)

![Demo 3](https://github.com/thisiscenkcetin/yetgim-portfolio-llm-cv/blob/main/demo/demo%20(3).png?raw=true)

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Ortam Değişkeni

Sohbet özelliği için `.env.local` dosyasına API anahtarını ekle:

```env
VITE_GROK_API_KEY=your_groq_key_here
```

## Not

Sohbet, CV verilerinden beslenen kısa cevaplar üretir. API anahtarı yoksa basit yedek cevaplar kullanır.

