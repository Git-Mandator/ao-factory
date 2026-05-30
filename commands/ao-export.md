---
description: Produit le dossier remise/ complet (.docx, .xlsx, annexes, LISEZ_MOI)
allowed-tools: Read, Write, Bash, Glob
argument-hint: [référence marché] [nom acheteur]
---

Produit le dossier `remise/` final pour : $ARGUMENTS

## Prérequis bloquants

Vérifier que ces fichiers existent et sont validés :
- `qa/QA_CHECKLIST.md` avec décision **GO_DEPOT** → sinon STOP
- `memoire-technique/MEMOIRE_TECHNIQUE.md`
- `matrice-conformite/MATRICE_CONFORMITE.md`
- `admin/ADMIN_CHECKLIST.md`
- `pricing/DQE_PRICING.md`

## Étape 1 — Lecture des livrables sources

Lire tous les fichiers listés ci-dessus pour extraire le contenu à convertir en .docx.

## Étape 2 — Production des documents Word

Utiliser le skill `docx` (npm) pour produire dans `remise/` :

```bash
# Installer docx si nécessaire
npm install docx --prefix /tmp/ao-docx

# Produire chaque document
node /tmp/memoire.js   → remise/MEMOIRE_TECHNIQUE_[ACHETEUR].docx
node /tmp/matrice.js   → remise/MATRICE_CONFORMITE_[ACHETEUR].docx
node /tmp/admin.js     → remise/ADMIN_CHECKLIST_[ACHETEUR].docx
node /tmp/qa.js        → remise/QA_CHECKLIST_[ACHETEUR].docx
```

## Standards de mise en forme Word (Geoloc Systems)

Appliquer impérativement la charte graphique **geoloc-brand v1.0** (skill `geoloc-brand`) :
- Police : **Calibri** (corps 11pt, titres 14/12pt)
- Couleur titre H1 : `1565C0` (Primary — bleu Geoloc)
- Couleur titre H2 : `4285F4` (Brand — bleu medium)
- Fond en-têtes tableau : `1565C0` texte blanc
- Alternance lignes tableau : `F1F5F9` / blanc (Muted)
- Statuts ✅ OK : fond `E2EFDA` (vert clair)
- Statuts ⚠️ PARTIEL : fond `FCE4D6` (orange clair)
- Statuts ❌ NON : fond `FFCCCC` (rouge clair)
- Format page : A4 portrait (mémoire) / A4 paysage (matrice)
- En-tête : "[Nom marché] — [Référence]  |  Geoloc Systems"
- Pied de page : "CONFIDENTIEL — [Date] — Page X"

> ❌ INTERDIT : couleurs obsolètes `1F3864`, `2E75B6`, `D6E4F7`, `EBF3FB` — palette abandonnée.

## Étape 3 — Copier DQE et annexes

```bash
# DQE (si xlsx disponible)
cp pricing/DQE_PRICING.xlsx "remise/DQE_PRICING_[ACHETEUR].xlsx"

# Annexes disponibles
mkdir -p remise/annexes
cp knowledge/annexes/09-attestation-rc-axa-2026.pdf remise/annexes/
cp knowledge/annexes/superfleet/08-annexe-illustrations-superfleet.pdf remise/annexes/
```

## Étape 4 — Créer LISEZ_MOI.md

Créer `remise/LISEZ_MOI.md` listant :
- Tous les fichiers présents dans `remise/`
- Pièces manquantes à compléter manuellement (Kbis, DC1, DC2, attestations fiscales)
- Instructions de dépôt (plateforme, format, nommage attendu selon RC)
- Date limite de dépôt avec marge restante

## Étape 5 — Récapitulatif final

Afficher :
```
✅ DOSSIER REMISE/ COMPLET — [RÉFÉRENCE MARCHÉ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 MEMOIRE_TECHNIQUE_[ACHETEUR].docx  ✅
📊 MATRICE_CONFORMITE_[ACHETEUR].docx ✅
✅ ADMIN_CHECKLIST_[ACHETEUR].docx    ✅
🔍 QA_CHECKLIST_[ACHETEUR].docx       ✅
💰 DQE_PRICING_[ACHETEUR].xlsx        ✅
📁 annexes/ (N fichiers)               ✅
📋 LISEZ_MOI.md                        ✅

⚠️ Pièces à compléter manuellement :
→ [liste des pièces manquantes]

🚀 PRÊT À SIGNER ET DÉPOSER
```
