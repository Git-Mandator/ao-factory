# CHANGELOG — AO Factory Plugin

## v3.6.6 — 11 juin 2026 — Phase 4bis NON différable

Seconde faille relevée sur l'AO Charleville-Mézières 26F17 : la Phase 4bis (annexes + visuels)
n'a jamais été exécutée — `remise/` livrée sans aucun dossier `Annexes/`. Le run l'avait différée
« en attente des arbitrages Direction », alors que les 9 annexes types n'en dépendent pas
(seule l'annexe armoire à clés était liée au sourcing C3).

- ✅ **a00-orchestrator §Phase 4bis** : règle ⛔ NON DIFFÉRABLE — jamais de report pour cause
  d'arbitrages en attente ou d'ESCALADE_HUMAIN ; les 9 annexes types (tableau de bord, CR
  COPIL/COTECH, PV de vérification, suivi installations, fiche Teltonika, plan de formation,
  illustrations SuperFleet, lecteur MIFARE) sont produites systématiquement ; seule une annexe à
  donnée manquante passe en 🔴 sans bloquer les autres.
- ✅ **a08-qa-red-team §4bis** : nouveau contrôle BLOQUANT « Phase 4bis non exécutée » si
  `remise/Annexes/` est absent ou vide — corrigeable boucle (relancer les factories), pas une
  décision humaine ; vérification d'INDEX-REMISE.md et avertissement si pas d'illustration par
  section notée.
- ✅ **SKILL.md (workflow) + phases/phase7-qa-remise.md** : annotation NON DIFFÉRABLE + item de
  checklist correspondant.

## v3.6.5 — 11 juin 2026 — Correctifs audit Charleville-Mézières 26F17

Audit déclenché par les résultats décevants de l'AO Charleville-Mézières (traité sur la v3.6.2
installée alors que la v3.6.4 existait — mémoire sans visuels ni annexes, briefs non chargés).

- ✅ **Résolution des chemins `knowledge/`** : règle explicite dans SKILL.md + a07-writer — chemins
  relatifs à la racine du plugin, fallback Glob `~/.claude/plugins/marketplaces/*/ao-factory/`,
  STOP `[BRIEF_INTROUVABLE]` si brief absent (interdiction d'improviser). Cause racine des mémoires maigres.
- ✅ **Phase 2bis séquencée** : `a00b-bid-strategist` intégré au workflow (SKILL.md, state machine
  a00-orchestrator, phases/) — `STRATEGIE.md` + grille de pondération RC garantis avant la Phase 4
  (la structure miroir en dépend). Prérequis bloquant de a07-writer.
- ✅ **Garde-fou volume implémenté dans a08-qa-red-team** (§6bis) : `wc -w` obligatoire, BLOQUANT → LOOP_A07
  sous 5 500 mots, planchers de forme (20 tableaux, 80 chiffres, 5 intervenants), contrôle structure
  miroir. Ajout outil Bash à a08.
- ✅ **Contradiction « 14 sections » vs « miroir grille RC » levée** : le miroir RC fait foi partout
  (frontmatter, table de volume, KPIs, bannière de démarrage).
- ✅ **`phases/*.md` réalignés** : agents producteurs au lieu des wrappers bannis (`bid-manager`,
  `cctp-analyzer`, `evidence-builder`, `rgpd-security`), sources KB réelles (BRIEF-*) au lieu de
  fichiers inexistants, phase4-redaction.md réécrit (doctrine miroir + prérequis bloquants),
  contradiction de palette phase7 corrigée (l'ancienne palette est #1F3864/#2E75B6/#D6E4F7).
- ✅ **Annexe 08 illustrations** : version éditable `.docx` restaurée (était référencée par README,
  INDEX-ANNEXES et EXIGENCES_SCHEMA mais supprimée du paquet).
- ✅ **Parsing annexes** : `grep "Annexe [A-Z0-9]+"` couvre lettres ET numéros (3 conventions coexistantes).
- ✅ **Versioning réconcilié** : README 2.1.0→3.6.5, marketplace.json 3.6.2→3.6.5, bannière SKILL
  3.6.3→3.6.5, chemins Cowork `/mnt/.skills/` remplacés par des références portables, `sop_reference`
  mort supprimé, CHANGELOG complété (3.6.0→3.6.5 ci-dessous).

## v3.6.4 — 2 juin 2026 — Structure mémoire GAGNANT (miroir grille de notation)

- 🆕 **`BRIEF-structure-memoire-gagnant.md`** (brief MAÎTRE) : structure miroir RC sous-critère/points,
  4 patterns de forme gagnants — capitalisation Garges 49,5/50 + Résidences 78 gagné.
- 🔄 **a07-writer** : la structure générique « 14 sections » est remplacée par le calque exact de la
  grille de notation du RC (1 section par sous-critère noté, points dans le titre).
- 🔄 **ao-visuels-factory** : organigramme avec photos/silhouettes (fonction `avatar()`), fix polices
  macOS (`/System/Library/Fonts/Supplemental/Arial.ttf` — accents français corrects).

## v3.6.3 — 30 mai-2 juin 2026 — Correction régression volume + boucle QA

- 🐛 **Fix régression v3.6.0-3.6.2** : la Phase 4 passait par le wrapper `bid-manager` qui ne chargeait
  ni les briefs ni la cible de volume → mémoires de 4 000-5 000 mots. Délégation DIRECTE aux agents
  a01-a08 + `knowledge_base` étendue 5→12 briefs + cible 6 000-8 000 mots (plancher 5 500).
- 🆕 **Phase 4bis** : production automatique des annexes citées (`ao-annexes-factory` + `ao-visuels-factory`),
  INDEX-REMISE, contrôle « chaque annexe citée existe physiquement ».
- 🆕 **Phase 7bis** : boucle auto-correction QA (max 3 itérations, anti-régression, critères d'escalade) ;
  a08 passe en sortie machine-readable avec décision GO_DEPOT / LOOP_A07 / ESCALADE_HUMAIN.
- 🆕 **`BRIEF-teltonika-wiki.md`** : codecs + 60 AVL IDs critiques.
- 🧹 Retrait du DOCX 22 Mo annexe 08 (réintroduit en v3.6.5 — il était toujours référencé).

## v3.6.2 — 30 mai 2026

- Comble 4 manques secondaires détectés au test SPL EBR DAF-2025-15 — score 9,1/10 (dépasse
  l'original humain 9,0).

## v3.6.1 — 30 mai 2026

- Combles SSI / API / clôture : `BRIEF-api-catalog.md` (18 REST + 4 JMS), `BRIEF-ssi-matrice-33items.md`,
  `BRIEF-cloture-memoire.md` + a07-writer mis à jour.

## v3.6.0 — 29-30 mai 2026

- Base v3.5 riche + correctifs ciblés : 0 chemin mort, palette charte officielle, hook déterministe
  `guard-forbidden`, boîtiers EOL → FMC650/FMC920, fix a00b (tools manquants — agent inopérant),
  règle de préséance agent ↔ skill wrapper, a07-writer enrichi des patterns gagnants SPL EBR + Garges.

## v3.5.0 — 28 mai 2026 — Capitalisation Garges-lès-Gonesse + Résidences Yvelines

### 🎯 Origine

Cette version capitalise les acquis de deux AO récents :
- **AO 25-60 Résidences Yvelines** (mars 2026) — mémoire technique gagnant
- **AO 26.065 Garges-lès-Gonesse** (mai 2026) — mémoire technique 49,5 / 50

### 🆕 Nouveaux fichiers de connaissance (Volet 1)

- ✅ **`knowledge/methodologies/delais-engagements-ao.md`** — Doctrine critique « délai d'intervention » vs « délai de réalisation » (issue de l'ambiguïté CCAP Garges)
- ✅ **`knowledge/company/equipe-projet-detaillee.md`** — Équipe officielle complète avec rôles, expériences, photos
- ✅ **`knowledge/company/capacite-operationnelle.md`** — Cadences engageables (10 véh/jour nominal, 20 max), durées par typologie
- ✅ **`knowledge/references/boitiers-teltonika-detail.md`** — Fiches techniques complètes FMC650 + FMC920 + RD200 USB + accessoires

### 🔄 BRIEFs mis à jour

- ✅ **`BRIEF-profil-geoloc.md`** :
  - Équipe élargie : ajout Samia MAKHLOUF (Resp. formation, 13 ans), Smaël KESSOURI (DG/Représentant Légal), **Chaima GACI** (Resp. Support & Qualité, remplace Coumba MBENGUE)
  - Capacité opérationnelle chiffrée
  - Adresse siège Colombes intégrée (argument proximité IDF)
  - Triptyque hébergement AWS + OVH + **Flespi Vilnius**
  - + 10 000 véhicules supervisés, fourchette 10-1 500 véh.
  - CA 2022 et 2023 (en plus de 2021)
  - Phrases types proximité IDF
  - Bilan environnemental indicatif (30:1 bénéfice/coût)

- ✅ **`BRIEF-superfleet-fonctionnel.md`** :
  - Passage de 6 à **11 modules** documentés
  - Nouveaux modules : Carto-Balayage, ANTAI, Carburant, Tachygraphe, Transition énergétique, **IA SuperFleet Agent** (Chat + Voix + Data)
  - Boîtiers : FMC650 + FMC920 (au lieu de FTC640/FMM640)
  - Latence MQTT < 1 sec, 200 utilisateurs simultanés
  - Référence aux 10 captures d'écran types réutilisables

### 🆕 Nouveau skill `ao-visuels-factory` (Volet 2)

Production automatique des 5 visuels génériques du mémoire technique :

| Visuel | Script |
|---|---|
| Organigramme projet | `gen_all_visuels.py::visuel_organigramme()` |
| Mini-carte siège ↔ client | `gen_all_visuels.py::visuel_carte()` |
| Gantt 6 semaines | `gen_all_visuels.py::visuel_gantt()` |
| Schéma logistique stock | `gen_all_visuels.py::visuel_logistique()` |
| Infographie résumé page de garde | `gen_all_visuels.py::visuel_infographie()` |

Tous paramétrables via la section `CONFIG` en tête de script (CLIENT_NAME, DISTANCE_MIN, FLEET_SIZE, DEPLOY_WEEKS, etc.).

### 🆕 Nouveau skill `ao-annexes-factory` (Volet 3)

Production des 9 annexes types du dossier de remise :

| N° | Annexe |
|---|---|
| 01 | Tableau de bord de suivi du projet |
| 02 | Modèle de compte-rendu COPIL |
| 03 | Modèle de compte-rendu COTECH |
| 04 | Modèle de procès-verbal de vérification |
| 05 | Tableau de suivi des installations |
| 06 | Annexe Boîtier Teltonika (FMC650/FMC920 + accessoires) |
| 07 | Plan de formation (Admin 2h / Gestionnaires 1h30 / Terrain 30 min) |
| 08 | Annexe Illustrations SuperFleet (10 modules captures) |
| 09 | Annexe Lecteur MIFARE RD200 USB (administration badges) |

Scripts JS auto-portés avec `lib.js` mutualisé (docx-js).

### 🔧 Skills existants enrichis (Volet 5)

- **`no-invention-guard`** : ajout équipe v3.5 autorisée (Samia, Smaël, Chaima), 11 modules SuperFleet, cadences engageables, boîtiers autorisés (FMC650/FMC920/RD200), pénalités CCAP types
- **`qa-red-team`** : nouveaux contrôles bloquants (équipe nommée, organigramme, doctrine délais, visuels intégrés, modules v3.5)
- **`cctp-analyzer`** : détection automatique « délai d'intervention » vs « délai de réalisation », mapping CCTP → modules SuperFleet, recommandation boîtier par typologie
- **`bid-manager`** : références aux nouvelles ressources (visuels, annexes, captures, photos équipe)
- **`rgpd-security`** : triptyque hébergement AWS + OVH + Flespi
- **`evidence-builder`** : grille de preuves enrichie (12 annexes, 5 visuels, 10 captures, 5 photos)
- **`geoloc-brand`** : palette codifiée, typographie, format A4 0,8in, mise en page mémoire et annexes

### ⚠️ Breaking changes

- **Coumba MBENGUE** retirée de l'équipe officielle, **remplacée par Chaima GACI**
- Tous les nouveaux mémoires v3.5+ doivent utiliser Chaima GACI

### 📊 Métriques

- Avant v3.5 : 6 modules SuperFleet documentés, 4 personnes équipe, 0 annexe type prête à générer
- Après v3.5 : **11 modules SuperFleet**, **7 personnes équipe**, **9 annexes auto-portées**, **5 visuels paramétrables**

### 🎓 Précédents utilisés

- AO 26.065 Garges-lès-Gonesse — annexe délais lot 1, CCAP §Pénalités (terminologie "délais d'intervention")
- AO 25-60 Résidences Yvelines — mémoire gagnant (structure et scoring)

---

## v3.0.1 — Versions antérieures

Voir le `README.md` pour l'historique pré-v3.5.
