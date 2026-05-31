---
description: État d'avancement du dossier AO en cours — dashboard de suivi
allowed-tools: Read, Glob
argument-hint: [référence marché ou dossier REPONSE_]
---

Affiche l'état d'avancement du dossier AO pour : $ARGUMENTS

## Recherche du dossier en cours

Cherche un dossier `REPONSE_*` dans le répertoire courant ou utilise l'argument fourni.

## Lecture de l'état de chaque phase

Vérifier l'existence et le contenu de ces fichiers :
- `synthese/SYNTH_AO.md` → Phase 1 terminée ?
- `gonogo/GONOGO.json` → Phase 2 terminée ? Décision GO/NO GO ?
- `matrice-conformite/MATRICE_CONFORMITE.md` → Phase 3 terminée ? Taux de couverture ?
- `memoire-technique/MEMOIRE_TECHNIQUE.md` → Phase 4 terminée ? Nombre de sections ?
- `pricing/DQE_PRICING.md` → Phase 5 terminée ?
- `admin/ADMIN_CHECKLIST.md` → Phase 6 terminée ? Pièces manquantes ?
- `qa/QA_CHECKLIST.md` → Phase 7 terminée ? Décision GO_DEPOT ou BLOQUANT ?
- `remise/` → Phase 8 terminée ? Fichiers .docx présents ?

## Format de sortie — Dashboard

```
📊 STATUS AO — [RÉFÉRENCE MARCHÉ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Acheteur : [Nom]
Date limite : [Date] — J-[N]
Décision : [GO | GO_SOUS_CONDITIONS | NO_GO | EN ATTENTE]

AVANCEMENT :

Phase 0 — DCE Vérification    [✅ OK | ❌ MANQUANT | ⏳ EN COURS]
Phase 1 — Analyse DCE         [✅ OK | ⏳ EN COURS | ⬜ À FAIRE]
Phase 2 — GO / NO GO          [✅ GO | ⚠️ CONDITIONS | ❌ NO_GO | ⬜ À FAIRE]
Phase 3 — Matrice conformité  [✅ [X%] couverts | ⏳ | ⬜]
Phase 4 — Mémoire technique   [✅ [N] sections | ⏳ | ⬜]
Phase 5 — DQE & Pricing       [✅ OK | ⏳ | ⬜]
Phase 6 — Admin               [✅ [N] pièces | ⚠️ [N] manquantes | ⬜]
Phase 7 — QA Red Team         [✅ GO_DEPOT | ❌ BLOQUANT | ⬜]
Phase 8 — Dossier remise/     [✅ [N] fichiers | ⏳ | ⬜]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROCHAINE ACTION : [commande à lancer]
BLOCAGES : [liste des points en attente]
A_CONFIRMER : [items à valider avec Said KHAYAT]
```
