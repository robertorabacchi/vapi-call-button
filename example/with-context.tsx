import { createContext, useContext, useState } from 'react'
import VapiCallButton from '../VapiCallButton'

/**
 * ESEMPIO CON LANGUAGE CONTEXT
 * 
 * Mostra come integrare il componente con un sistema di gestione lingua
 */

// Context per la lingua
interface LanguageContextType {
  language: 'it' | 'en'
  setLanguage: (lang: 'it' | 'en') => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'it',
  setLanguage: () => {}
})

export const useLanguage = () => useContext(LanguageContext)

// Provider
function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'it' | 'en'>('it')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Componente che usa il context
function ContactPage() {
  const { language, setLanguage } = useLanguage()

  const translations = {
    it: {
      title: 'Contattaci',
      subtitle: 'Parla con il nostro assistente vocale AI'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'Talk to our AI voice assistant'
    }
  }

  return (
    <div className="p-8">
      {/* Language Switcher */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setLanguage('it')}
          className={`px-4 py-2 rounded ${
            language === 'it' ? 'bg-cyan-500 text-white' : 'bg-gray-200'
          }`}
        >
          🇮🇹 Italiano
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded ${
            language === 'en' ? 'bg-cyan-500 text-white' : 'bg-gray-200'
          }`}
        >
          🇬🇧 English
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        {translations[language].title}
      </h1>
      <p className="text-gray-600 mb-6">
        {translations[language].subtitle}
      </p>

      <VapiCallButton
        publicKey="la-tua-vapi-public-key"
        assistantId="il-tuo-assistant-id"
        language={language}
      />
    </div>
  )
}

// App wrapper
function WithContextExample() {
  return (
    <LanguageProvider>
      <ContactPage />
    </LanguageProvider>
  )
}

export default WithContextExample

