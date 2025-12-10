import { useEffect, useState } from 'react'
import { Phone, PhoneOff } from 'lucide-react'

// Dichiarazione globale per Vapi
declare global {
  interface Window {
    Vapi: any
  }
}

interface VapiCallButtonProps {
  publicKey: string
  assistantId: string
  buttonText?: {
    idle: string
    loading: string
    active: string
  }
  statusText?: {
    calling: string
  }
  className?: string
  language?: 'it' | 'en'
}

const VapiCallButton = ({
  publicKey,
  assistantId,
  buttonText,
  statusText,
  className = '',
  language = 'it'
}: VapiCallButtonProps) => {
  const [vapi, setVapi] = useState<any>(null)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Testi di default
  const defaultButtonText = {
    idle: language === 'it' ? '📞 CHIAMA ASSISTENTE' : '📞 CALL ASSISTANT',
    loading: language === 'it' ? 'CONNESSIONE...' : 'CONNECTING...',
    active: language === 'it' ? 'TERMINA CHIAMATA' : 'END CALL'
  }

  const defaultStatusText = {
    calling: language === 'it' ? 'IN CHIAMATA' : 'ON CALL'
  }

  const texts = buttonText || defaultButtonText
  const status = statusText || defaultStatusText

  useEffect(() => {
    // Carica lo script VAPI
    const script = document.createElement('script')
    script.src = 'https://cdn.vapi.ai/vapi.js'
    script.async = true
    script.onload = () => {
      if (window.Vapi) {
        const vapiInstance = new window.Vapi(publicKey)
        setVapi(vapiInstance)

        // Event listeners
        vapiInstance.on('call-start', () => {
          console.log('📞 Chiamata iniziata')
          setIsCallActive(true)
          setIsLoading(false)
        })

        vapiInstance.on('call-end', () => {
          console.log('📴 Chiamata terminata')
          setIsCallActive(false)
          setIsLoading(false)
        })

        vapiInstance.on('speech-start', () => {
          console.log('🎤 Utente sta parlando')
        })

        vapiInstance.on('speech-end', () => {
          console.log('🤫 Utente ha smesso di parlare')
        })

        vapiInstance.on('error', (error: any) => {
          console.error('❌ Errore VAPI:', error)
          setIsLoading(false)
          setIsCallActive(false)
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      if (vapi) {
        vapi.stop()
      }
      document.body.removeChild(script)
    }
  }, [publicKey])

  const handleCall = async () => {
    if (!vapi) {
      console.error('VAPI non ancora caricato')
      return
    }

    if (isCallActive) {
      // Termina chiamata
      vapi.stop()
      setIsCallActive(false)
      setIsLoading(false)
    } else {
      // Inizia chiamata
      setIsLoading(true)
      try {
        await vapi.start(assistantId)
      } catch (error) {
        console.error('Errore avvio chiamata:', error)
        setIsLoading(false)
      }
    }
  }

  const getCurrentText = () => {
    if (isLoading) return texts.loading
    if (isCallActive) return texts.active
    return texts.idle
  }

  return (
    <div className={`relative bg-black/40 hover:bg-black/60 border border-cyan-400/30 rounded-lg p-4 transition-all duration-300 group/item overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] ${className}`}>
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
      
      {/* Animated Borders */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-neon transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 z-10"></div>
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-neon transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-500 delay-100 z-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-neon transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 delay-200 z-10"></div>
      <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-neon transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-500 delay-300 z-10"></div>
      
      <div className="flex items-center gap-4 mb-3">
        <div className="relative bg-black/40 border border-cyan-400/30 rounded-lg p-3 group/icon overflow-hidden">
          {/* Animated Borders */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-neon transform scale-x-0 group-hover/icon:scale-x-100 transition-transform duration-500 z-10"></div>
          <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-neon transform scale-y-0 group-hover/icon:scale-y-100 transition-transform duration-500 delay-100 z-10"></div>
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-neon transform scale-x-0 group-hover/icon:scale-x-100 transition-transform duration-500 delay-200 z-10"></div>
          <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-neon transform scale-y-0 group-hover/icon:scale-y-100 transition-transform duration-500 delay-300 z-10"></div>
          {isCallActive ? (
            <PhoneOff className="w-6 h-6 text-red-400 font-semibold drop-shadow-[0_0_8px_rgba(248,113,113,0.8)] relative z-0 animate-pulse" />
          ) : (
            <Phone className="w-6 h-6 text-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] relative z-0" />
          )}
        </div>
        <h3 className="text-metal-3d text-xl md:text-2xl relative z-0 group-hover/item:scale-105 transition-transform leading-tight">
          {language === 'it' ? 'ASSISTENTE VOCALE AI' : 'AI VOICE ASSISTANT'}
        </h3>
      </div>
      
      <button
        onClick={handleCall}
        disabled={isLoading || !vapi}
        className={`inline-block px-4 py-2 rounded-lg bg-black/40 border text-lg md:text-xl font-semibold transition-all relative overflow-hidden group/link hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
          isCallActive 
            ? 'border-red-400/30 text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)] hover:bg-red-900/20 hover:border-red-400/50' 
            : 'border-cyan-400/30 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] hover:bg-black/60 hover:border-cyan-400/50 hover:drop-shadow-[0_0_12px_rgba(34,211,238,1)]'
        }`}
      >
        {/* Animated Borders */}
        <div className={`absolute top-0 left-0 w-full h-[2px] transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 z-10 ${
          isCallActive ? 'bg-gradient-to-r from-red-500 to-red-300' : 'bg-gradient-neon'
        }`}></div>
        <div className={`absolute top-0 right-0 w-[2px] h-full transform scale-y-0 group-hover/link:scale-y-100 transition-transform duration-500 delay-100 z-10 ${
          isCallActive ? 'bg-gradient-to-b from-red-500 to-red-300' : 'bg-gradient-neon'
        }`}></div>
        <div className={`absolute bottom-0 right-0 w-full h-[2px] transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 delay-200 z-10 ${
          isCallActive ? 'bg-gradient-to-r from-red-500 to-red-300' : 'bg-gradient-neon'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-[2px] h-full transform scale-y-0 group-hover/link:scale-y-100 transition-transform duration-500 delay-300 z-10 ${
          isCallActive ? 'bg-gradient-to-b from-red-500 to-red-300' : 'bg-gradient-neon'
        }`}></div>
        
        {/* Background Glow Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 ${
          isCallActive 
            ? 'bg-gradient-to-r from-red-400/0 via-red-400/10 to-red-400/0' 
            : 'bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0'
        }`}></div>
        
        <span className="relative z-10">
          {getCurrentText()}
        </span>
      </button>

      {/* Indicatore stato chiamata */}
      {isCallActive && (
        <div className="mt-3 flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 text-sm font-semibold">
            {status.calling}
          </span>
        </div>
      )}
    </div>
  )
}

export default VapiCallButton
