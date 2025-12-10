import VapiCallButton from '../VapiCallButton'

/**
 * ESEMPIO CON STILE PERSONALIZZATO
 * 
 * Mostra come personalizzare testi e aggiungere classi CSS custom
 */

function CustomStyleExample() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          Assistenza Clienti
        </h1>
        <p className="text-gray-300 mb-8">
          Parla con il nostro assistente AI per ricevere supporto immediato
        </p>
        
        <VapiCallButton
          publicKey="la-tua-vapi-public-key"
          assistantId="il-tuo-assistant-id"
          language="it"
          buttonText={{
            idle: '🤖 PARLA CON L\'AI',
            loading: 'ATTENDI...',
            active: '❌ CHIUDI'
          }}
          statusText={{
            calling: 'CONVERSAZIONE IN CORSO'
          }}
          className="shadow-2xl"
        />

        <div className="mt-8 text-gray-400 text-sm">
          <p>💡 Suggerimento: Permetti l'accesso al microfono quando richiesto</p>
        </div>
      </div>
    </div>
  )
}

export default CustomStyleExample
