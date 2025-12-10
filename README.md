# 📞 VAPI Call Button Component

**Componente React per chiamate vocali AI tramite browser con VAPI**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6.svg)](https://www.typescriptlang.org/)

---

## 🎯 **Cosa fa?**

Pulsante React che permette di **chiamare un assistente vocale AI direttamente dal browser** usando [VAPI](https://vapi.ai).

- ✅ Click → Chiama l'assistente AI
- ✅ Microfono + Speaker del browser
- ✅ Indicatori di stato (connessione, in chiamata, terminata)
- ✅ Animazioni cyber-neon
- ✅ Supporto bilingue (IT/EN)
- ✅ Completamente personalizzabile

---

## 🚀 **Demo Live**

Vedi il componente in azione su: [ecservicesrl.com/contatti](https://ecservicesrl.com/contatti)

---

## 📦 **Installazione**

### 1. Installa le dipendenze

```bash
npm install lucide-react
```

### 2. Copia il componente

Copia `VapiCallButton.tsx` nella tua cartella `src/components/`

### 3. Configura le tue chiavi VAPI

```typescript
// Nel componente VapiCallButton.tsx
const VAPI_PUBLIC_KEY = 'la-tua-public-key'
const ASSISTANT_ID = 'il-tuo-assistant-id'
```

---

## 🔧 **Utilizzo Base**

```tsx
import VapiCallButton from './components/VapiCallButton'

function App() {
  return (
    <div>
      <h1>Contattaci</h1>
      <VapiCallButton />
    </div>
  )
}
```

---

## 🎨 **Personalizzazione**

### Cambia i testi

```tsx
// Modifica buttonText() nel componente
const buttonText = () => {
  if (isLoading) return 'CONNESSIONE...'
  if (isCallActive) return 'TERMINA CHIAMATA'
  return '📞 CHIAMA ASSISTENTE'
}
```

### Cambia lo stile

Il componente usa **Tailwind CSS** con classi custom. Puoi modificare:

- Colori: `text-cyan-300`, `border-cyan-400/30`
- Animazioni: `animate-pulse`, `transition-all`
- Effetti: `drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]`

### Rimuovi le animazioni neon

Se vuoi uno stile più semplice, rimuovi le classi:
- `bg-gradient-neon`
- `cyber-glow`
- `glassmorphism-strong`

---

## 🔑 **Configurazione VAPI**

### 1. Crea un account VAPI

Vai su [vapi.ai](https://vapi.ai) e registrati.

### 2. Crea un assistente

Dashboard → Assistants → Create New

Configura:
- **Nome**: Es. "Rachele"
- **Voce**: ElevenLabs (Rachel, Raquelle, ecc.)
- **Modello**: Claude 3.5 Sonnet, GPT-4o, Groq Llama
- **Lingua**: Italiano (transcriber: Deepgram Nova-2)

### 3. Ottieni le chiavi

- **Public Key**: Dashboard → Settings → API Keys
- **Assistant ID**: Dashboard → Assistants → Copia l'ID

---

## 📱 **Funzionalità**

### Stati del pulsante

| Stato | Testo | Colore | Icona |
|-------|-------|--------|-------|
| Idle | "📞 CHIAMA RACHELE" | Cyan | Phone |
| Loading | "CONNESSIONE..." | Cyan | Phone |
| Active | "TERMINA CHIAMATA" | Red | PhoneOff |

### Eventi VAPI

Il componente ascolta questi eventi:

```typescript
vapi.on('call-start', () => {
  // Chiamata iniziata
})

vapi.on('call-end', () => {
  // Chiamata terminata
})

vapi.on('speech-start', () => {
  // Utente sta parlando
})

vapi.on('speech-end', () => {
  // Utente ha smesso di parlare
})

vapi.on('error', (error) => {
  // Errore
})
```

---

## 🌍 **Supporto Multilingua**

Il componente supporta IT/EN tramite `LanguageContext`:

```tsx
const { language } = useLanguage()

const text = language === 'it' 
  ? 'CHIAMA RACHELE' 
  : 'CALL RACHELE'
```

Se non usi un context, puoi hardcodare la lingua:

```tsx
const buttonText = () => {
  if (isLoading) return 'CONNECTING...'
  if (isCallActive) return 'END CALL'
  return '📞 CALL ASSISTANT'
}
```

---

## 🛠️ **Requisiti**

- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- lucide-react (per le icone)
- Account VAPI (gratuito per iniziare)

---

## 📄 **Struttura File**

```
vapi-call-button/
├── VapiCallButton.tsx       # Componente principale
├── README.md                # Questa guida
├── LICENSE                  # Licenza MIT
├── package.json             # Dipendenze
└── example/                 # Esempi di utilizzo
    ├── basic.tsx            # Esempio base
    ├── custom-style.tsx     # Esempio con stile custom
    └── with-context.tsx     # Esempio con LanguageContext
```

---

## 🧪 **Testing**

### Test locale

```bash
npm run dev
```

Apri il browser e clicca sul pulsante. Dovresti:
1. Vedere "CONNESSIONE..."
2. Sentire l'assistente dire il messaggio di benvenuto
3. Poter parlare con l'assistente
4. Terminare la chiamata cliccando di nuovo

### Troubleshooting

| Problema | Soluzione |
|----------|-----------|
| "VAPI non ancora caricato" | Aspetta che lo script si carichi |
| Nessun audio | Controlla permessi microfono/speaker |
| Errore 401 | Verifica la Public Key |
| Assistente non risponde | Verifica l'Assistant ID |

---

## 🤝 **Contribuire**

Pull requests benvenute! Per modifiche importanti, apri prima un issue.

1. Fork il progetto
2. Crea il tuo branch (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

---

## 📝 **Licenza**

MIT License - vedi [LICENSE](LICENSE) per dettagli.

---

## 👨‍💻 **Autore**

**Roberto Rabacchi Santagata**  
E.C. Service S.r.L.  
[ecservicesrl.com](https://ecservicesrl.com)

---

## 🔗 **Link Utili**

- [VAPI Documentation](https://docs.vapi.ai)
- [ElevenLabs Voices](https://elevenlabs.io/voice-library)
- [Deepgram Languages](https://developers.deepgram.com/docs/languages)
- [Tailwind CSS](https://tailwindcss.com)

---

## ⭐ **Supporto**

Se questo progetto ti è utile, lascia una stella ⭐ su GitHub!

Per supporto: [info@ecservicesrl.com](mailto:info@ecservicesrl.com)
