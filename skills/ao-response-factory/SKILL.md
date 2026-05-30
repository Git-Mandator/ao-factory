---
name: ao-response-factory
version: "3.6.0"
domain: AO_FACTORY
language: fr
role: orchestrateur
description: >
  Orchestrateur principal pour répondre aux appels d'offres publics Geoloc Systems — de la
  réception du DCE jusqu'au dossier complet prêt à déposer. Utiliser pour TOUT nouvel appel
  d'offres public : analyser le CCTP, produire la décision GO/NO GO, construire la matrice
  de conformité, rédiger le mémoire technique, compléter le DQE, vérifier les pièces admin,
  QA finale, production des .docx remise. Point d'entrée OBLIGATOIRE pour tout AO — ne jamais
  appeler bid-manager ou cctp-analyzer directement sans passer par ce skill en premier.
  Déclencher dès qu'un appel d'offres, marché public, DCE, consultation ou BOAMP est mentionné.
sop_reference: SOP_AO_RESPONSE_FACTORY.md
sop_phases: [0, 1, 2, 3, 4, 5, 6, 7]
output_formats:
  default: docx
  intermediate: md+json
  pricing: xlsx
knowledge_base:
  - knowledge/briefs/BRIEF-profil-geoloc.md
  - knowledge/briefs/BRIEF-superfleet-fonctionnel.md
  - knowledge/briefs/BRIEF-securite-rgpd.md
  - knowledge/references/boitiers-teltonika-detail.md
  - knowledge/briefs/BRIEF-superfleet-fonctionnel.md
  - knowledge/annexes/INDEX-ANNEXES.md
delegates_to:
  - cctp-analyzer        # Phases 1–2 → phases/phase1-2-analyse-gonogo.md
  - bid-manager          # Phases 3–5, 7 → phases/phase3-matrice.md + phase4-redaction.md
  - rgpd-security        # Phase 3 sécurité → phases/phase3-matrice.md
  - evidence-builder     # Phases 3, 6 → phases/phase5-6-dqe-admin.md
phases_detail:
  - phases/phase1-2-analyse-gonogo.md
  - phases/phase3-matrice.md
  - phases/phase4-redaction.md
  - phases/phase5-6-dqe-admin.md
  - phases/phase7-qa-remise.md
---

# Skill : AO Response Factory — Orchestrateur Maître

Ce skill industrialise la chaîne complète : **DCE → Analyse → GO/NO GO → Matrice → Mémoire → DQE → Admin → QA → Remise.**

> ⚠️ **Point d'entrée unique** pour tout nouveau marché public.
> Ne pas appeler `bid-manager` ou `cctp-analyzer` directement sans passer par ce skill.
> Pour le détail de chaque phase, lire les fichiers dans `phases/`.

---

## Phrases déclencheurs

- nouveau appel d'offres, nouvel AO, traiter un AO
- on a reçu un DCE, analyser ce DCE
- répondre à ce marché public, préparer notre réponse AO
- lancer la factory AO, démarrer la procédure AO
- on se positionne sur cet AO, on candidate
- appel d'offres public, consultation, BOAMP, JOUE, MAPA
- pipeline AO, chaîne de réponse AO, tout faire de A à Z pour cet AO

---

## ⛔ ÉTAPE 0 — VÉRIFICATION DCE (OBLIGATOIRE — avant tout)

| Document | Requis |
|---|---|
| **RC** — Règlement de Consultation | ✅ OBLIGATOIRE — STOP si absent |
| **CCTP** — Cahier des Clauses Techniques Particulières | ✅ OBLIGATOIRE — STOP si absent |
| **DQE ou BPU** — Document de tarification | ✅ OBLIGATOIRE — Phase 5 bloquée si absent |
| **CCAP** — Clauses Administratives et Financières | ⚠️ Important |
| **AE** — Acte d'Engagement | ⚠️ Important |
| Contexte flotte (nb véhicules, secteur, usage) | 🔵 Optionnel mais utile |

**Message type :**
```
📋 VÉRIFICATION DCE — [RÉFÉRENCE MARCHÉ]

Documents reçus :
✅/❌ RC — [nom du fichier ou MANQUANT]
✅/❌ CCTP — [nom du fichier ou MANQUANT]
✅/❌ DQE — [nom du fichier ou MANQUANT]

Statut : [PRÊT À DÉMARRER | ⛔ ARRÊT — documents manquants]
```

---

## 🔄 WORKFLOW GLOBAL (8 phases)

```
⛔ Phase 0 — Vérification DCE
   ↓
Phase 1 — Analyse DCE         → cctp-analyzer    → SYNTH_AO.md + EXIGENCES.json
   ↓
Phase 2 — GO / NO GO          → cctp-analyzer    → GONOGO.json  (STOP si NO_GO)
   ↓
Phase 3 — Matrice conformité  → bid-manager      → MATRICE_CONFORMITE.md
          + rgpd-security
          + telematics-expert (cross-domain)
   ↓
Phase 4 — Mémoire technique   → bid-manager      → MEMOIRE_TECHNIQUE.md
   ↓
Phase 5 — DQE & Pricing       → bid-manager      → DQE_PRICING.xlsx + PRICING_ALERTS.md
   ↓
Phase 6 — Admin               → evidence-builder → ADMIN_CHECKLIST.md
   ↓
Phase 7 — QA finale ⛔        → bid-manager      → QA_CHECKLIST.md
   ↓
Remise — Production .docx     → skill docx       → Dossier remise/ complet
   ↓
✅ DOSSIER PRÊT À SIGNER ET DÉPOSER
```

**Pour le détail complet de chaque phase → lire le fichier correspondant dans `phases/`.**

---

## 🎭 RÔLES EXPERTS (10 rôles, 4 skills)

| # | Rôle | Skill | Phase | Fichier détail |
|---|---|---|---|---|
| 1 | Analyste AO | `cctp-analyzer` | 1 | `phases/phase1-2-analyse-gonogo.md` |
| 2 | Décideur GO/NO GO | `cctp-analyzer` | 2 | `phases/phase1-2-analyse-gonogo.md` |
| 3 | Expert SuperFleet ⭐ | `bid-manager` | 3 | `phases/phase3-matrice.md` |
| 4 | Expert matériel télématique | `telematics-expert` (cross-domain) | 3 | `phases/phase3-matrice.md` |
| 5 | Expert RSE | `bid-manager` | 3 | `phases/phase3-matrice.md` |
| 6 | Expert Sécurité & RGPD | `rgpd-security` | 3 | `phases/phase3-matrice.md` |
| 7 | Expert conformité admin | `evidence-builder` | 6 | `phases/phase5-6-dqe-admin.md` |
| 8 | Rédacteur technique | `bid-manager` | 4 | `phases/phase4-redaction.md` |
| 9 | Contrôleur DQE | `bid-manager` | 5 | `phases/phase5-6-dqe-admin.md` |
| 10 | Vérificateur QA | `bid-manager` + `evidence-builder` | 7 | `phases/phase7-qa-remise.md` |
| 11 | Producteur .docx ⭐ | `docx` skill | Remise | `phases/phase7-qa-remise.md` |

---

### 🔒 TABLE DE PRÉSÉANCE — règle dure v3.6 (agent ↔ skill)

<!-- v3.6 P2 : formalise les 5 doublons agent↔skill. Chaque skill listé "wrapper" charge le contexte
     et délègue la PRODUCTION à l'agent producteur unique. En cas de conflit, l'AGENT FAIT FOI. -->

> **Règle dure** : pour chaque livrable, **un seul agent producteur**. Les skills homonymes sont
> des **wrappers** : ils sont les points d'entrée (mots-clés Cowork), chargent les briefs et le
> contexte, mais **ne réécrivent pas** le livrable de l'agent. En cas de double sollicitation,
> **l'agent fait foi**.

| Domaine | Producteur unique (AGENT) | Wrapper (skill, point d'entrée) | Livrable produit |
|---|---|---|---|
| Analyse DCE + GO/NO GO | **`a01-dce-analyst`** | `cctp-analyzer` | `SYNTH_AO.md` + `EXIGENCES.json` + `GONOGO.json` |
| Stratégie de réponse | **`a00b-bid-strategist`** | (aucun) | `strategie/STRATEGIE.md` |
| Matrice fonctionnelle | **`a02-requirements-miner`** | `bid-manager` | `MATRICE_CONFORMITE.md` (volet fonctionnel) |
| Preuves / annexes | **`a03-evidence-librarian`** | `evidence-builder` | `annexes/PLAN_ANNEXES.md` |
| Conformité RGPD / sécurité | **`a04-compliance-lead`** | `rgpd-security` | volet sécurité du mémoire + Annexe RGPD |
| Architecture télématique | **`a05-telematics-architect`** | (aucun) | volet matériel du mémoire |
| DQE / pricing / admin | **`a06-project-manager`** | `bid-manager` | `DQE_PRICING` + `ADMIN_CHECKLIST` |
| Rédaction mémoire | **`a07-writer`** | `bid-manager` | `MEMOIRE_TECHNIQUE.md` |
| QA finale (bloquante) | **`a08-qa-red-team`** | `qa-red-team` | `QA_CHECKLIST.md` + verdict GO_DEPOT |
| Production .docx | (aucun agent) | `docx` skill (cross-domain) | fichiers `.docx` du dossier remise |

> Chaque skill wrapper porte en tête le bloc « 🔒 v3.6 PRÉSÉANCE » qui rappelle cette règle.

### 📄 RÈGLE .DOCX OBLIGATOIRE (toute factory AO)

> La factory produit TOUJOURS des fichiers `.docx` à la fin. Les `.md` sont des fichiers
> de travail internes — jamais remis à l'acheteur. Le dossier `remise/` doit contenir
> UNIQUEMENT des `.docx`, `.xlsx` et `.pdf`.

**Livrables remise obligatoires :**
- `MEMOIRE_TECHNIQUE_[ACHETEUR].docx` — produit via script JS + `docx` npm v9+
- `DQE_PRICING_[ACHETEUR].docx` — estimation préliminaire jusqu'à réception DQE officiel
- `ADMIN_CHECKLIST_[ACHETEUR].docx` — pièces de candidature

**Charte graphique :** Toujours appliquer la charte Geoloc officielle (geoloc-brand v1.0) :
- Police : **Calibri** — Couleur principale : **`#1565C0`** — Fond tableaux pairs : **`#F1F5F9`**
- Lire `/mnt/.skills/skills/docx/SKILL.md` AVANT tout script JS

### 🔗 Règle cross-domain — Accès à GEOLOC_SYSTEMS_CORE (Phase 3 uniquement)

Lire `10_GEOLOC_SYSTEMS_CORE/skills/telematics-expert/SKILL.md` pour les arguments hardware.

**Ce qui traverse la frontière AO ← Geoloc :** arguments techniques boîtiers (IP67, Dead Reckoning, Cat M1, 4G), protocoles (CAN-BUS, FMS, OBD, Smart Tacho), pérennité matériel.

**Ce qui NE traverse PAS :** vocabulaire SAV / terrain, tarifs matériels, contextes clients non validés AO.

---

## 🚫 RÈGLES ANTI-HALLUCINATION (absolues — toutes phases)

1. Jamais inventer une fonctionnalité → `superfleet-catalogue-fonctionnel.md` uniquement
2. Jamais inventer une certification → distinguer certifs AWS/OVH vs Geoloc
3. Jamais inventer un chiffre de CA ou d'effectif → `profil-geoloc-systems.md` uniquement
4. Jamais inventer une référence client → ENEDIS, ADANEV, Transalys, Commune de Martigues uniquement
5. Jamais promettre CAN-BUS sans vérifier la compatibilité véhicule
6. Information absente de la base → marquer `A_CONFIRMER` et remonter à Said KHAYAT
7. Jamais écrire "FleetWatcher" → toujours "SuperFleet"

---

## 📈 KPIs DE PERFORMANCE

| Indicateur | Cible |
|---|---|
| Taux de GO | > 60% des marchés analysés |
| Taux de succès | > 40% des candidatures |
| Délai de production | < 3 jours ouvrés (GO → QA OK) |
| Couverture CCTP | > 85% |
| Items A_CONFIRMER en QA finale | < 5% des REQ |
| Occurrences FleetWatcher en QA | 0 |

---

## 🎯 FORMAT DE DÉMARRAGE

```
🏭 AO RESPONSE FACTORY — DÉMARRAGE

📋 VÉRIFICATION DCE — [RÉFÉRENCE MARCHÉ si connue]

✅/❌ RC — [nom fichier ou MANQUANT]
✅/❌ CCTP — [nom fichier ou MANQUANT]
✅/❌ DQE — [nom fichier ou MANQUANT]
✅/❌ CCAP — [nom fichier ou MANQUANT]

Statut : [PRÊT À DÉMARRER | DOCUMENTS MANQUANTS]

⚙️ Phase 1 en cours — Activation Analyste AO (cctp-analyzer)...
```
