#!/bin/bash

# 🚀 QUICK PUBLISH SCRIPT
# Pubblica automaticamente il repository su GitHub

echo "🚀 VAPI Call Button - Quick Publish"
echo "===================================="
echo ""

# Controlla se siamo nella directory corretta
if [ ! -f "VapiCallButton.tsx" ]; then
    echo "❌ Errore: Esegui questo script dalla directory vapi-call-button"
    exit 1
fi

# Chiedi username GitHub
echo "📝 Inserisci il tuo username GitHub:"
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username non può essere vuoto"
    exit 1
fi

echo ""
echo "✅ Username: $GITHUB_USERNAME"
echo ""
echo "📋 PROSSIMI PASSI:"
echo ""
echo "1. Vai su: https://github.com/new"
echo "2. Repository name: vapi-call-button"
echo "3. Visibility: Public"
echo "4. NON aggiungere README, .gitignore, License"
echo "5. Clicca 'Create repository'"
echo ""
echo "Premi INVIO quando hai creato il repository..."
read

echo ""
echo "🔗 Collegamento al repository GitHub..."

# Rimuovi remote esistente (se presente)
git remote remove origin 2>/dev/null

# Aggiungi nuovo remote
git remote add origin "https://github.com/$GITHUB_USERNAME/vapi-call-button.git"

echo "✅ Remote aggiunto"
echo ""

# Rinomina branch in main
git branch -M main
echo "✅ Branch rinominato in 'main'"
echo ""

# Push
echo "📤 Push in corso..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 PUBBLICAZIONE COMPLETATA!"
    echo ""
    echo "🔗 Repository disponibile su:"
    echo "   https://github.com/$GITHUB_USERNAME/vapi-call-button"
    echo ""
    echo "📝 Prossimi passi consigliati:"
    echo "   1. Aggiungi topics: vapi, voice-ai, react, typescript"
    echo "   2. Aggiungi una stella ⭐ al tuo stesso repo"
    echo "   3. Condividi il link!"
    echo ""
else
    echo ""
    echo "❌ Errore durante il push"
    echo ""
    echo "🔧 Possibili soluzioni:"
    echo "   1. Verifica di aver creato il repository su GitHub"
    echo "   2. Controlla le credenziali Git"
    echo "   3. Prova manualmente:"
    echo "      git push -u origin main"
    echo ""
fi
