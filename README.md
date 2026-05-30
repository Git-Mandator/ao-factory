# AO Factory Plugin — Geoloc Systems

**Version :** 2.1.0
**Auteur :** Said KHAYAT — Geoloc Systems
**Domaine :** Réponses aux appels d'offres publics (télématique de flotte)

---

## Vue d'ensemble

Ce plugin industrialise la chaîne complète de réponse aux appels d'offres publics de Geoloc Systems :
du DCE reçu jusqu'au dossier `.docx` prêt à signer et déposer, en 8 phases structurées.

**Objectif :** Maximiser le score technique de Geoloc Systems à chaque consultation publique.

**v2.1.0 — Nouveautés :**
- ✅ Skill `geoloc-brand` : charte graphique officielle SuperFleet (design system v1.0)
- ✅ 9 annexes types bundlées (PDF réels, organisation-projet, superfleet)
- ✅ 4 templates Word JS (`memoire_template.js`, `matrice_template.js`, `admin_template.js`, `qa_template.js`)
- ✅ Palette couleurs mise à jour : Primary `#1565C0` (ancienne palette obsolète)

---

## Prérequis

Ce plugin est conçu pour fonctionner dans le dossier de travail **20_AO_FACTORY** de Geoloc Systems.
Les skills référencent les fichiers dans `knowledge/` — ces chemins sont relatifs au dossier de travail sélectionné dans Cowork.

**Structure attendue dans le dossier de travail :**
```
knowledge/
├── company/profil-geoloc-systems.md
├── references/
│   ├── superfleet-catalogue-fonctionnel.md
│   ├── superfleet-fiche-technique-securite-conformite.md
│   └── teltonika-product-capabilities-ao.md
├── memoire-exemple/analyse-memoire-25-60.md
└── annexes-types/INDEX-ANNEXES.md
```

---

## Commandes disponibles

| Commande | Description | Phase SOP |
|----------|-------------|-----------|
| `/ao-new` | Lance la factory AO complète de A à Z | 0 → 8 |
| `/ao-dce-check` | Inventaire DCE — liste manquants | 0 |
| `/ao-gonogo` | Scoring GO/NO GO sur 100 points | 1–2 |
| `/ao-matrice` | Génère la matrice de conformité CCTP | 3 |
| `/ao-memoire` | Rédige le mémoire technique (CMT) | 4 |
| `/ao-qa` | QA Red Team finale (bloquante) | 7 |
| `/ao-export` | Produit le dossier remise/ (.docx) | 8 |
| `/ao-status` | Dashboard d'avancement du dossier | — |

---

## Agents spécialisés

| Agent | Rôle |
|-------|------|
| `a00-orchestrator` | State machine maître — séquence et valide |
| `a01-dce-analyst` | Lit et classe les documents DCE |
| `a02-requirements-miner` | Extrait les REQ-XXX avec criticité |
| `a03-evidence-librarian` | Cartographie les preuves disponibles |
| `a04-compliance-lead` | RGPD, sécurité, hébergement, SLA |
| `a05-telematics-architect` | Boîtiers GPS, CAN-BUS, installation |
| `a06-project-manager` | Planning, RACI, DQE, admin |
| `a07-writer` | Rédige le mémoire technique miroir CCTP |
| `a08-qa-red-team` | Détecte erreurs, contradictions, FleetWatcher |

---

## Skills intégrés

| Skill | Rôle | Phases |
|-------|------|--------|
| `ao-response-factory` | Orchestrateur — point d'entrée unique | 0–8 |
| `cctp-analyzer` | Analyse DCE + GO/NO GO | 1–2 |
| `bid-manager` | Matrice conformité + Mémoire + DQE + QA | 3–5, 7 |
| `rgpd-security` | Sécurité, RGPD, hébergement, SLA | 3 |
| `evidence-builder` | Preuves, annexes, administratif | 3, 6 |
| `dce-ingestion` | Phase 0 : classification et inventaire DCE | 0 |
| `no-invention-guard` | Détecte les claims non sourcés | 7 |
| `qa-red-team` | QA Red Team bloquante | 7 |
| `geoloc-brand` ⭐ NEW | Charte graphique SuperFleet — si AO sans cadre imposé | Export |

---

## Bibliothèque d'annexes (bundlées)

```
knowledge/annexes/
├── INDEX-ANNEXES.md                      ← Catalogue avec guide d'utilisation par critère CCTP
├── NOTE-TRANSITION-FLEETWATCHER-SUPERFLEET.md
├── 06-plan-installation-armoires-cles.pdf
├── 07-plan-de-formation.pdf
├── 09-attestation-rc-axa-2026.pdf        ← RC valide 08/02/2026 → 01/01/2027
├── superfleet/
│   ├── 08-annexe-illustrations-superfleet.pdf   ← 8 modules — brandé SuperFleet
│   └── 08-annexe-illustrations-superfleet.docx  ← Version éditable
└── organisation-projet/
    ├── 01-tableau-de-bord-suivi-projet.pdf
    ├── 02-modele-cr-copil.pdf
    ├── 03-modele-cr-cotech.pdf
    ├── 04-modele-pv-verification.pdf
    └── 05-tableau-suivi-installations.pdf
```

> ⚠️ Annexes 06 et 07 : remplacer FleetWatcher → SuperFleet avant toute remise.

---

## Hooks automatiques

| Hook | Événement | Effet |
|------|-----------|-------|
| **Context Loader** | Démarrage de session | Charge les règles Geoloc + charte graphique + commandes |
| **No-Invention Guard** | Avant écriture (Write/Edit) | Bloque FleetWatcher, claims non sourcés, ancienne palette |
| **AO + Brand Detector** | Message utilisateur | Détecte mots-clés AO → commandes / branding → geoloc-brand |

---

## Charte graphique Geoloc Systems (SuperFleet v1.0)

> Utiliser quand l'AO ne définit pas de cadre graphique imposé.

| Token | HEX | Usage |
|---|---|---|
| Primary | `#1565C0` | Titres, en-têtes, barres, CTA |
| Brand accent | `#4285F4` | Icônes, éléments actifs |
| Muted bg | `#F1F5F9` | Lignes alternées, sections grises |
| Text | `#1F2937` | Corps de texte |
| Border | `#E2E8F0` | Bordures tableaux |

Police : **Calibri** (fallback Arial) — JAMAIS Times New Roman.

> ⚠️ Ancienne palette (`#1F3864`, `#2E75B6`, `#D6E4F7`) obsolète depuis fév. 2026.

---

## Flux de travail standard

```
1. Déposer les documents DCE dans un dossier
2. Taper : /ao-new [nom du marché]
3. L'orchestrateur guide phase par phase
4. /ao-qa valide avant dépôt
5. /ao-export produit le dossier remise/ final
```

---

## Règles absolues (rappel)

- ❌ Jamais "FleetWatcher" → toujours "SuperFleet"
- ❌ Jamais inventer une fonctionnalité → catalogue SuperFleet uniquement
- ❌ Jamais inventer un chiffre → profil-geoloc-systems.md uniquement
- ❌ Jamais inventer une référence client → ENEDIS, ADANEV, Transalys, Martigues uniquement
- ❌ Jamais promettre CAN-BUS sans condition de compatibilité véhicule
- ❌ Jamais utiliser l'ancienne palette couleurs → `#1565C0` / `#4285F4` / `#F1F5F9`
- 🔵 Doute → marquer `A_CONFIRMER` et remonter à Said KHAYAT

---

## Arborescence de livrables par marché

```
REPONSE_[YYYYMMDD]_[ACHETEUR]/
├── 00-dce-source/           ← DCE gelé (sources originales)
├── synthese/                ← SYNTH_AO.md + EXIGENCES.json
├── gonogo/                  ← GONOGO.json
├── matrice-conformite/      ← MATRICE_CONFORMITE.md
├── memoire-technique/       ← MEMOIRE_TECHNIQUE.md
├── pricing/                 ← DQE_PRICING.md + PRICING_ALERTS.md
├── admin/                   ← ADMIN_CHECKLIST.md
├── qa/                      ← QA_CHECKLIST.md (GO_DEPOT requis)
└── remise/                  ← DOSSIER FINAL À DÉPOSER
    ├── MEMOIRE_TECHNIQUE_[ACHETEUR].docx
    ├── MATRICE_CONFORMITE_[ACHETEUR].docx
    ├── ADMIN_CHECKLIST_[ACHETEUR].docx
    ├── QA_CHECKLIST_[ACHETEUR].docx
    ├── DQE_PRICING_[ACHETEUR].xlsx
    ├── LISEZ_MOI.md
    └── annexes/
        ├── 08-annexe-illustrations-superfleet.pdf
        └── 09-attestation-rc-axa-2026.pdf
```

---

*AO Factory Plugin v2.1.0 — Geoloc Systems — Said KHAYAT — Mars 2026*
