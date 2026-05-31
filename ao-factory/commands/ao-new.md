---
description: Lance la factory AO complète de A à Z (DCE → dossier remise)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, TodoWrite
argument-hint: [référence marché ou dossier DCE]
---

Lance la chaîne complète **AO Response Factory v3.0** pour le marché : $ARGUMENTS

## Étape 0 — Chargement du contexte Geoloc Systems

Charger en priorité les **briefs** (lecture rapide) puis les sources complètes si nécessaire :
- `knowledge/briefs/BRIEF-profil-geoloc.md` ← identité, chiffres, phrases types
- `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` ← modules, specs
- `knowledge/briefs/BRIEF-securite-rgpd.md` ← SLA, hébergement, RGPD
- `knowledge/annexes/INDEX-ANNEXES.md` ← bibliothèque d'annexes

## Étape 1 — Vérification DCE (OBLIGATOIRE)

Vérifie quels documents DCE sont disponibles dans le dossier courant ou dans `$ARGUMENTS`.

```
🏭 AO RESPONSE FACTORY v3.0 — DÉMARRAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 VÉRIFICATION DCE — [RÉFÉRENCE MARCHÉ]

✅/❌ RC  — Règlement de Consultation
✅/❌ CCTP — Cahier des Clauses Techniques
✅/❌ DQE  — Document de tarification
✅/❌ CCAP — Clauses Administratives

Statut : [PRÊT À DÉMARRER | ⛔ DOCUMENTS MANQUANTS]
```

Si RC ou CCTP manquant → STOP. Demander les pièces à l'utilisateur.

## Étape 2 — Création de la structure du dossier AO

Crée ce dossier dans le répertoire courant et initialise le journal de traçabilité :

```
REPONSE_[REF_MARCHE]/
├── TRACE.md                 ← Journal de décision (initié maintenant)
├── synthese/
│   ├── SYNTH_AO.md
│   └── EXIGENCES.json       ← Backbone inter-agents (schéma: knowledge/schemas/EXIGENCES_SCHEMA.md)
├── strategie/
│   └── STRATEGIE.md         ← Produit par Bid Strategist après GO
├── gonogo/
│   └── GONOGO.json
├── matrice-conformite/
│   └── MATRICE_CONFORMITE.md
├── memoire-technique/
│   └── MEMOIRE_TECHNIQUE.md
├── pricing/
├── admin/
├── qa/
└── remise/
    └── annexes/
```

Initialiser `TRACE.md` avec le header + Phase 0 (DCE reçu, documents inventoriés).

## Étape 3 — Exécution des phases (séquentiellement)

Active chaque agent dans l'ordre, en vérifiant la validation de chaque livrable :

**Phase 1** → Activer A01 DCE Analyst → `synthese/SYNTH_AO.md` + `synthese/EXIGENCES.json` (squelette REQ)
              → Journaliser dans TRACE.md (Phase 1 complète)

**Phase 2** → Activer A01 GO/NO GO → `gonogo/GONOGO.json` → STOP si NO_GO
              → Journaliser dans TRACE.md (Phase 2 + score détaillé)

**Phase 2b** → Activer **A00b Bid Strategist** → `strategie/STRATEGIE.md`
               → Enrichir EXIGENCES.json : ponderation + strategie
               → Journaliser dans TRACE.md (angle retenu, différenciateurs)

**Phase 3** → Activer A02 + A03 + A04 + A05 en parallèle :
              - A02 : enrichit EXIGENCES.json (statuts REQ, réponses)
              - A03 : enrichit EXIGENCES.json (preuves par REQ)
              - A04 : enrichit EXIGENCES.json (statuts RGPD/securite)
              - A05 : enrichit EXIGENCES.json (hardware/CAN-BUS)
              → Produit `matrice-conformite/MATRICE_CONFORMITE.md` depuis EXIGENCES.json
              → Journaliser dans TRACE.md (couverture, A_CONFIRMER remontés)

**Phase 4** → Activer A07 Writer → `memoire-technique/MEMOIRE_TECHNIQUE.md`
              - Ordre des sections = hiérarchie de STRATEGIE.md
              - Enrichit EXIGENCES.json (paragraphe_memoire par REQ)
              → Journaliser dans TRACE.md (sections rédigées, longueur)

**Phase 5** → Activer A06 Project Manager → `pricing/DQE_PRICING.md` + `admin/ADMIN_CHECKLIST.md`
              → Journaliser dans TRACE.md

**Phase 7** → Activer A08 QA Red Team → `qa/QA_CHECKLIST.md` → STOP si BLOQUANT
              - Calcule couverture_globale dans EXIGENCES.json
              → Journaliser dans TRACE.md (GO_DEPOT ou BLOQUANT)

**Phase 8** → Production .docx dans `remise/` (skill docx npm)
              - Sélectionne automatiquement les annexes depuis EXIGENCES.json
              → Journaliser dans TRACE.md (livrables produits, STATUT FINAL)

## Règles absolues (toutes phases)

- ❌ Ne jamais écrire "FleetWatcher" → toujours "SuperFleet"
- ❌ Ne jamais inventer une fonctionnalité → vérifier dans les briefs/sources
- ❌ Ne jamais inventer un chiffre → vérifier dans BRIEF-profil-geoloc.md
- ❌ Ne jamais inventer une référence client → 4 clients autorisés uniquement
- ✅ Tout doute → marquer `A_CONFIRMER` + journaliser dans TRACE.md
- ✅ EXIGENCES.json est la seule source de vérité inter-agents — toujours l'enrichir, jamais le contredire
