import VapiCallButton from '../VapiCallButton'

/**
 * ESEMPIO BASE
 * 
 * Utilizzo minimo del componente con solo le props obbligatorie
 */

function BasicExample() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Contattaci</h1>
      
      <VapiCallButton
        publicKey="la-tua-vapi-public-key"
        assistantId="il-tuo-assistant-id"
      />
    </div>
  )
}

export default BasicExample
