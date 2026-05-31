# CHANGELOG — AO Factory Plugin

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
