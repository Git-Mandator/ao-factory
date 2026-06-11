---
name: ao-response-factory
version: "3.6.8"
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
sop_phases: [0, 1, 2, "2bis", 3, 4, "4bis", 5, 6, 7, "7bis"]
output_formats:
  default: docx
  intermediate: md+json
  pricing: xlsx
knowledge_base:
  - knowledge/briefs/BRIEF-structure-memoire-gagnant.md
  - knowledge/briefs/BRIEF-profil-geoloc.md
  - knowledge/briefs/BRIEF-superfleet-fonctionnel.md
  - knowledge/briefs/BRIEF-securite-rgpd.md
  - knowledge/briefs/BRIEF-api-catalog.md
  - knowledge/briefs/BRIEF-ssi-matrice-33items.md
  - knowledge/briefs/BRIEF-cloture-memoire.md
  - knowledge/briefs/BRIEF-comparatif-natif-vs-boitier.md
  - knowledge/briefs/BRIEF-cartographie-parc.md
  - knowledge/briefs/BRIEF-coach-embarque.md
  - knowledge/briefs/BRIEF-desinstallation-tiers.md
  - knowledge/briefs/BRIEF-teltonika-wiki.md
  - knowledge/references/boitiers-teltonika-detail.md
  - knowledge/annexes/INDEX-ANNEXES.md
  - knowledge/company/equipe-projet-detaillee.md
  - knowledge/company/capacite-operationnelle.md
  - knowledge/methodologies/delais-engagements-ao.md
delegates_to:
  - a01-dce-analyst       # Phases 0-2 — Analyse DCE + GO/NO GO
  - a00b-bid-strategist   # Phase 2bis — Stratégie de réponse + grille de pondération RC (OBLIGATOIRE avant Phase 3)
  - a02-requirements-miner # Phase 3 — Matrice fonctionnelle
  - a03-evidence-librarian # Phases 3, 4bis, 6 — Preuves + annexes
  - a04-compliance-lead   # Phase 3 — Volet RGPD/SSI du mémoire
  - a05-telematics-architect # Phase 3 — Volet matériel du mémoire
  - a06-project-manager   # Phases 5, 6 — DQE + Admin
  - a07-writer            # Phase 4 — Rédaction du mémoire (OBLIGATOIRE — pas de wrapper)
  - a08-qa-red-team       # Phases 7 + 7bis — QA + boucle correction
phases_detail:
  - phases/phase1-2-analyse-gonogo.md
  - phases/phase3-matrice.md
  - phases/phase4-redaction.md
  - phases/phase5-6-dqe-admin.md
  - phases/phase7-qa-remise.md
target_volume_memoire:
  mots_min: 6000
  mots_max: 8000
  sections_cible: "miroir grille RC — 1 section par sous-critère noté (cf. BRIEF-structure-memoire-gagnant)"
  pages_docx_estimees: "25-35"
---

# Skill : AO Response Factory — Orchestrateur Maître v3.6.8

Ce skill industrialise la chaîne complète : **DCE → Analyse → GO/NO GO → Matrice → Mémoire → Annexes → DQE → Admin → QA → Remise.**

> ⚠️ **Point d'entrée unique** pour tout nouveau marché public.
> Ne pas appeler `bid-manager` ou `cctp-analyzer` directement sans passer par ce skill.
> Pour le détail de chaque phase, lire les fichiers dans `phases/`.

---

## 📍 RÉSOLUTION DES CHEMINS `knowledge/` (règle pour TOUS les agents — lire avant toute phase)

> ⛔ **Les chemins `knowledge/...`, `phases/...` et `templates-docx/...` sont relatifs à la RACINE DU PLUGIN,
> PAS au dossier AO de travail.** Les agents délégués démarrent dans le dossier du marché : un Read
> relatif y échouera systématiquement.

1. **Racine plugin** = le dossier qui contient `.claude-plugin/plugin.json` (ce SKILL.md est dans
   `<racine>/skills/ao-response-factory/`). L'orchestrateur transmet ce chemin absolu à chaque agent délégué.
2. **Si un fichier `knowledge/` est introuvable en relatif** → le localiser par Glob :
   `~/.claude/plugins/marketplaces/*/ao-factory/knowledge/briefs/BRIEF-*.md` (plugin installé)
   puis `~/Documents/ao-factory-final/ao-factory/knowledge/**` (source de développement).
3. **⛔ INTERDIT de rédiger sans les briefs.** Si un brief obligatoire reste introuvable après l'étape 2 :
   **STOP**, signaler `[BRIEF_INTROUVABLE : <chemin>]` à Said KHAYAT. Ne JAMAIS improviser le contenu
   d'un brief de mémoire — c'est la cause racine des mémoires de 4 000 mots rejetés.

---

## 🚨 CIBLE DE VOLUME — MÉMOIRE TECHNIQUE (obligatoire)

> **Le mémoire technique livré DOIT respecter ces seuils — sinon le résultat est éliminé en commission.**

| Métrique | Cible | Plancher absolu | Référence |
|---|---|---|---|
| **Volume corps mémoire** | **6 000 à 8 000 mots** | **5 500 mots minimum** | Étalon SPL EBR v3.0 = 7 487 mots |
| **Structure** | **Miroir grille RC** : 1 section par sous-critère noté, points dans le titre | Ossature invariante (propos liminaire, compréhension, synthèse, annexes) | Cf. a07-writer §"Structure — MIROIR EXACT" + BRIEF-structure-memoire-gagnant |
| **Tableaux structurés** | 30+ (matrice SSI, API, annexes, équipe, planning, etc.) | 20 minimum | Garges 26.065 (49,5/50) |
| **Chiffres engagés** (SLA, délais, %, volumes) | 100+ | 80 minimum | Étalon v3.6.2 = ~120 |
| **Citations CCP/RC** (renvois articles) | 40+ | 30 minimum | Étalon v3.6.2 = ~50 |
| **Intervenants nommés** | **7** (Said, Mustapha, Clément, Walid, Samia, Smaël, Chaima) | 5 minimum | Cf. BRIEF-profil-geoloc + équipe-projet-detaillee |

**⛔ Si le mémoire produit fait moins de 5 500 mots, ce n'est PAS un mémoire d'AO public sérieux — c'est un brouillon. La QA Phase 7 doit refuser GO_DEPOT.**

**a07-writer DOIT charger TOUS les 12 briefs de la `knowledge_base` ci-dessus avant rédaction** (en les résolvant depuis la racine du plugin — cf. §Résolution des chemins). L'usage du seul `BRIEF-profil-geoloc.md` (par défaut) produit un mémoire de 4 000 à 5 000 mots = REJETÉ.

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

## 🔄 WORKFLOW GLOBAL (11 phases avec 2bis, 4bis et 7bis)

```
⛔ Phase 0 — Vérification DCE
   ↓
Phase 1 — Analyse DCE             → a01-dce-analyst        → SYNTH_AO.md + EXIGENCES.json
   ↓                                                          (cible REQ proportionnée au DCE :
   ↓                                                           ~50-100 petit marché, 150-300 gros DCE)
Phase 2 — GO / NO GO              → a01-dce-analyst        → GONOGO.json  (STOP si NO_GO)
   ↓
Phase 2bis — Stratégie de réponse → a00b-bid-strategist    → STRATEGIE.md
   ↓                                                          ⛔ OBLIGATOIRE : grille de pondération RC
   ↓                                                          (critères + sous-critères + points) extraite
   ↓                                                          ou estimée — a07 en dépend (structure miroir)
Phase 3 — Matrice conformité      → a02-requirements-miner → MATRICE_CONFORMITE.md
          + a04-compliance-lead     (volet SSI/RGPD)
          + a05-telematics-architect (volet matériel)
          + a03-evidence-librarian   (planification preuves)
   ↓                                                          (cible : couverture > 80%)
Phase 4 — Mémoire technique       → a07-writer (DIRECT)    → MEMOIRE_TECHNIQUE.md
   ↓                                                          ⛔ CIBLE 6000-8000 mots, 14 sections
Phase 4bis — Production annexes   → ao-annexes-factory     → remise/Annexes/Annexe_A...K.docx
            + ao-visuels-factory   (organigramme, Gantt, etc.)
   ↓                                                          ⛔ chaque annexe citée DOIT exister
   ↓                                                          ⛔ NON DIFFÉRABLE — les 9 annexes types ne
   ↓                                                          dépendent d'aucun arbitrage humain ; seule
   ↓                                                          une annexe à donnée manquante passe en 🔴
Phase 5 — DQE & Pricing           → a06-project-manager    → DQE_PRICING.xlsx + PRICING_ALERTS.md
   ↓
Phase 6 — Admin                   → a03-evidence-librarian → ADMIN_CHECKLIST.md
          + a06-project-manager
   ↓
Phase 7 — QA finale ⛔            → a08-qa-red-team        → QA_CHECKLIST.md (machine-readable)
   ↓                                                          → décision : GO_DEPOT / LOOP_A07 / ESCALADE_HUMAIN
Phase 7bis — Boucle correction    → a07-writer + a08       → MEMOIRE_TECHNIQUE.md corrigé (max 3 itérations)
   ↓                                                          → re-passe Phase 7
Remise — Production .docx         → skill docx             → Dossier remise/ complet
   ↓
✅ DOSSIER PRÊT À SIGNER ET DÉPOSER
```

**Pour le détail complet de chaque phase → lire le fichier correspondant dans `phases/`.**

---

## 🎭 RÔLES EXPERTS — délégation directe aux AGENTS PRODUCTEURS

> ⚠️ **v3.6.3** : Les wrappers de skills (`bid-manager`, `cctp-analyzer`, `evidence-builder`,
> `rgpd-security`, `qa-red-team`) ne SONT PLUS invoqués par cet orchestrateur.
> L'orchestrateur appelle directement les agents producteurs `a01` à `a08` pour garantir que
> chaque agent charge ses briefs spécialisés et applique sa cible de volume.

| Phase | Agent producteur (appelé directement) | Livrable | Briefs obligatoires à charger |
|---|---|---|---|
| 0-2 | `a01-dce-analyst` | SYNTH_AO.md + EXIGENCES.json + GONOGO.json | (analyse pure du DCE) |
| **2bis stratégie** | **`a00b-bid-strategist`** | **STRATEGIE.md (grille pondération RC + angle + hiérarchie)** | BRIEF-structure-memoire-gagnant, BRIEF-profil-geoloc |
| 3 fonctionnel | `a02-requirements-miner` | volet fonctionnel matrice | BRIEF-superfleet-fonctionnel |
| 3 SSI/RGPD | `a04-compliance-lead` | volet sécurité matrice + §4 mémoire | BRIEF-securite-rgpd, BRIEF-ssi-matrice-33items |
| 3 matériel | `a05-telematics-architect` | volet hardware matrice + §3 mémoire | boitiers-teltonika-detail, **BRIEF-teltonika-wiki** (60 AVL IDs), BRIEF-comparatif-natif-vs-boitier |
| 3 preuves | `a03-evidence-librarian` | annexes/PLAN_ANNEXES.md | INDEX-ANNEXES |
| **4 rédaction** | **`a07-writer`** | **MEMOIRE_TECHNIQUE.md (6000-8000 mots, miroir grille RC)** | **TOUS les 12 briefs + KB enrichie + STRATEGIE.md (Phase 2bis)** |
| 4bis annexes | skills `ao-annexes-factory` + `ao-visuels-factory` | remise/Annexes/A→K | (basés sur templates) |
| 5 DQE | `a06-project-manager` | DQE_PRICING.xlsx | BRIEF-cartographie-parc (volumes) |
| 6 admin | `a06-project-manager` + `a03-evidence-librarian` | ADMIN_CHECKLIST.md | INDEX-ANNEXES |
| 7 QA | `a08-qa-red-team` | QA_CHECKLIST.md (machine-readable) | (tous, en lecture) |
| 7bis boucle | `a07-writer` + `a08-qa-red-team` | MEMOIRE corrigé + re-QA | (idem Phase 4) |

---

### 🔒 TABLE DE PRÉSÉANCE — règle dure v3.6 (agent ↔ skill)

> **Règle dure** : pour chaque livrable, **un seul agent producteur**. Les skills wrappers
> historiques (`bid-manager`, etc.) restent disponibles comme points d'entrée Cowork pour des
> requêtes ponctuelles, mais **ne sont PLUS appelés par l'orchestrateur principal** — c'est
> l'orchestrateur qui invoque directement les agents producteurs pour garantir le chargement
> des briefs spécialisés.

| Domaine | Producteur unique (AGENT) | Wrapper historique (skill) | Statut wrapper en v3.6.3 |
|---|---|---|---|
| Analyse DCE + GO/NO GO | **`a01-dce-analyst`** | `cctp-analyzer` | Wrapper actif (entrée Cowork) — l'agent fait foi |
| Stratégie de réponse | **`a00b-bid-strategist`** | (aucun) | — |
| Matrice fonctionnelle | **`a02-requirements-miner`** | `bid-manager` | Wrapper actif — l'agent fait foi |
| Preuves / annexes | **`a03-evidence-librarian`** | `evidence-builder` | Wrapper actif — l'agent fait foi |
| Conformité RGPD/sécurité | **`a04-compliance-lead`** | `rgpd-security` | Wrapper actif — l'agent fait foi |
| Architecture télématique | **`a05-telematics-architect`** | (aucun) | — |
| DQE / pricing / admin | **`a06-project-manager`** | `bid-manager` | Wrapper actif — l'agent fait foi |
| **Rédaction mémoire** | **`a07-writer`** | `bid-manager` | ⛔ **NE PLUS PASSER PAR LE WRAPPER** — appeler a07-writer en direct (cible volume) |
| QA finale (bloquante) | **`a08-qa-red-team`** | `qa-red-team` | Wrapper actif — l'agent fait foi |
| Production .docx | (aucun agent) | `docx` skill (cross-domain) | Skill direct |

### 📄 RÈGLE .DOCX OBLIGATOIRE (toute factory AO)

> La factory produit TOUJOURS des fichiers `.docx` à la fin. Les `.md` sont des fichiers
> de travail internes — jamais remis à l'acheteur. Le dossier `remise/` doit contenir
> UNIQUEMENT des `.docx`, `.xlsx` et `.pdf`.

**Livrables remise obligatoires :**
- `MEMOIRE_TECHNIQUE_[ACHETEUR].docx` — produit via script JS + `docx` npm v9+
- `DQE_PRICING_[ACHETEUR].docx` — estimation préliminaire jusqu'à réception DQE officiel
- `ADMIN_CHECKLIST_[ACHETEUR].docx` — pièces de candidature
- `Annexes/Annexe_[A→K]_[nom]_[ACHETEUR].docx` — produites en Phase 4bis

**Mise en page OBLIGATOIRE du mémoire .docx (contrôlée en QA — a08 §6ter) :**
1. **Page de garde dédiée** : titre du marché + référence + acheteur + cartouche candidat + date +
   validité de l'offre, charte Geoloc — suivie d'un **saut de page**.
2. **Sommaire automatique avec numéros de page** : `TableOfContents` (hyperlink, niveaux 1-3) et
   Document construit avec `features: { updateFields: true }` (sans cette option le sommaire reste
   vide à l'ouverture dans Word) — suivi d'un **saut de page**.
3. **Saut de page avant chaque section de niveau 1** (`pageBreakBefore: true`).
4. **Pagination en pied de page** (`PageNumber.CURRENT`) + en-tête charte sur tout le corps.

> ⛔ **Base obligatoire : `templates-docx/memoire_template.js`** (+ `matrice/admin/qa_template.js`) —
> copier le template, remplacer le CONTENU (exemple SIRTOM) par celui du marché, conserver la
> STRUCTURE (garde/sommaire/sauts/pagination). Chemin de sortie en argument :
> `node memoire_template.js "remise/MEMOIRE_TECHNIQUE_[ACHETEUR].docx"`.
> **INTERDIT d'écrire un script ad hoc sans ces 4 éléments** — cause des docx Charleville livrés
> sans page de garde, sans sommaire et sans sauts de page.

**Charte graphique :** Toujours appliquer la charte Geoloc officielle (geoloc-brand v1.0) :
- Police : **Calibri** — Couleur principale : **`#1565C0`** — Fond tableaux pairs : **`#F1F5F9`**
- Lire le skill `docx` (anthropic-skills:docx) AVANT tout script JS — s'il est indisponible dans
  l'environnement, utiliser directement `docx` npm v9+ avec la palette geoloc-brand ci-dessus

### 🔗 Règle cross-domain — Accès à GEOLOC_SYSTEMS_CORE (Phase 3 uniquement)

Lire `10_GEOLOC_SYSTEMS_CORE/skills/telematics-expert/SKILL.md` pour les arguments hardware
**en complément** de `BRIEF-teltonika-wiki.md` (qui est désormais la source principale AVL IDs/codecs).

**Ce qui traverse la frontière AO ← Geoloc :** arguments techniques boîtiers (IP67, Dead Reckoning, Cat M1, 4G), protocoles (CAN-BUS, FMS, OBD, Smart Tacho), pérennité matériel.

**Ce qui NE traverse PAS :** vocabulaire SAV / terrain, tarifs matériels, contextes clients non validés AO.

---

## 🚫 RÈGLES ANTI-HALLUCINATION (absolues — toutes phases)

1. Jamais inventer une fonctionnalité → `BRIEF-superfleet-fonctionnel.md` uniquement
2. Jamais inventer une certification → distinguer certifs AWS/OVH vs Geoloc
3. Jamais inventer un chiffre de CA ou d'effectif → `BRIEF-profil-geoloc.md` uniquement
4. Jamais inventer une référence client → ENEDIS, ADANEV, Transalys, Commune de Martigues uniquement
5. Jamais promettre CAN-BUS sans vérifier la compatibilité véhicule → assortir de "sous réserve de compatibilité véhicule par véhicule"
6. Information absente de la base → marquer `[A_CONFIRMER : description]` et remonter à Said KHAYAT
7. Jamais écrire "FleetWatcher" → toujours "SuperFleet"
8. Jamais citer FMC640/FMM640/FTC640 (EOL) → uniquement FMC650 (PL/engins) ou FMC920 (VL/VUL)
9. Jamais attribuer ISO 27001 à Geoloc Systems directement → toujours aux hébergeurs (AWS, OVH)

---

## 📈 KPIs DE PERFORMANCE

| Indicateur | Cible | Plancher |
|---|---|---|
| Taux de GO | > 60% des marchés analysés | — |
| Taux de succès | > 40% des candidatures | — |
| Délai de production | < 3 jours ouvrés (GO → QA OK) | — |
| **Volume mémoire produit** | **6000-8000 mots** | **5500 mots — rejet sous ce seuil (compté en QA)** |
| **Structure miroir grille RC** | **1 section par sous-critère noté, points dans le titre** | **100% (hard)** |
| Couverture CCTP | > 85% | 75% |
| Items A_CONFIRMER en QA finale | < 5% des REQ | 10% max |
| Occurrences FleetWatcher en QA | 0 | 0 (hard) |
| Annexes citées physiquement présentes | 100% | 100% (hard) |

---

## 🎯 FORMAT DE DÉMARRAGE

```
🏭 AO RESPONSE FACTORY v3.6.8 — DÉMARRAGE

📋 VÉRIFICATION DCE — [RÉFÉRENCE MARCHÉ si connue]

✅/❌ RC — [nom fichier ou MANQUANT]
✅/❌ CCTP — [nom fichier ou MANQUANT]
✅/❌ DQE — [nom fichier ou MANQUANT]
✅/❌ CCAP — [nom fichier ou MANQUANT]

Statut : [PRÊT À DÉMARRER | DOCUMENTS MANQUANTS]

🎯 CIBLE LIVRABLE : mémoire 6000-8000 mots, structure miroir grille RC (1 section par sous-critère noté),
   100+ chiffres engagés, 40+ citations CCP/RC, 7 intervenants nommés,
   annexes citées présentes physiquement, QA GO_DEPOT.

⚙️ Phase 1 en cours — Activation a01-dce-analyst (DIRECT, sans wrapper)...
```

---

## 🔧 NOTES DE RELEASE v3.6.5 (audit Charleville-Mézières 26F17)

**Correctifs v3.6.5 :**
1. ✅ Règle de résolution des chemins `knowledge/` (racine plugin + fallback Glob + STOP si brief introuvable)
2. ✅ Phase 2bis (a00b-bid-strategist) intégrée au séquencement — STRATEGIE.md et grille de pondération garantis avant rédaction
3. ✅ Comptage de mots et planchers de forme implémentés dans a08-qa-red-team (rejet < 5 500 mots effectif)
4. ✅ Contradiction « 14 sections » vs « miroir grille RC » levée — le miroir RC fait foi partout
5. ✅ `phases/*.md` réalignés (agents producteurs au lieu des wrappers, sources KB réelles)
6. ✅ Annexe 08 illustrations : version éditable .docx restaurée

## 🔧 NOTES DE RELEASE v3.6.3 (correction régression volume mémoire)

**Problème détecté en v3.6.0–v3.6.2** : ce skill déléguait au wrapper `bid-manager` pour la rédaction (Phase 4). Le wrapper ne chargeait pas les 11 briefs spécialisés et n'avait pas d'instruction de volume cible — résultat : mémoires de **4 000-5 000 mots** (= pires que v3.5) au lieu des **6 000-8 000 mots** attendus.

**Correctifs v3.6.3 :**
1. ✅ Délégation directe aux agents `a01-a08` (plus de wrappers intermédiaires)
2. ✅ `knowledge_base` étendue de 5 à 11 briefs (+ KB company/methodologies)
3. ✅ Cible de volume mémoire explicite (6000-8000 mots) + seuil de rejet QA (5500 mots)
4. ✅ Phases 4bis (annexes) et 7bis (boucle QA) intégrées au workflow
5. ✅ `BRIEF-teltonika-wiki.md` (60 AVL IDs) chargé pour la Phase 3 matériel
6. ✅ Anti-hallucination renforcé (EOL FMC640 + ISO 27001 hébergeur uniquement)
