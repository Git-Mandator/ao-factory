---
name: qa-red-team
version: "3.6.0"
domain: AO_FACTORY
language: fr
description: >
  Ce skill doit être utilisé pour la QA finale bloquante (Phase 7 SOP) d'un dossier AO Geoloc.
  Déclencher pour "valider le dossier avant dépôt", "contrôle qualité final AO", "QA Red Team",
  "vérifier avant remise", "check final mémoire technique", "prêt à déposer ?".
  Ce skill est BLOQUANT — aucun dépôt sans son GO_DEPOT.
---

# Skill : QA Red Team — Validation Finale Bloquante

> 🔒 **v3.6 PRÉSÉANCE (règle dure)** — ce skill est un **wrapper** :
> il **charge les briefs et le contexte**, mais **délègue toute production** à l'agent producteur unique
> **`a08-qa-red-team`** (cf. table de préséance dans `ao-response-factory/SKILL.md`).
> En cas de double sollicitation par Cowork (skill + agent), **l'agent fait foi** : ne pas réécrire son livrable.


Réalise le contrôle qualité complet d'un dossier AO avant tout dépôt.
Ce skill est bloquant : un seul défaut critique = pas de dépôt.

## Processus Red Team (7 contrôles)

### Contrôle 1 — FleetWatcher Hunt (bloquant)

Rechercher "FleetWatcher" dans TOUS les fichiers du dossier :
- `memoire-technique/*.md`
- `matrice-conformite/*.md`
- `pricing/*.md`
- `admin/*.md`
- `remise/*.docx` (si accessibles)

Résultat attendu : **0 occurrence**. Sinon BLOQUANT.

### Contrôle 2 — No-Invention Guard (bloquant)

Appliquer le skill `no-invention-guard` sur le mémoire technique.
Résultat attendu : 0 claim non sourcé. Sinon BLOQUANT.

### Contrôle 3 — Contradiction Detector (bloquant)

Vérifier la cohérence entre tous les documents :
- Nombre de véhicules : SYNTH_AO ↔ Mémoire ↔ DQE — doit être identique
- Délais : section déploiement ↔ planning DQE — cohérents
- SLA mémoire ↔ SLA fiche technique — identiques
- Lots/périmètre : RC ↔ Mémoire — alignés

### Contrôle 4 — Couverture CCTP (bloquant si REQ BLOQUANT non traité)

Pour chaque REQ de `synthese/EXIGENCES.json` :
- REQ Criticité BLOQUANT → doit être traitée dans le mémoire → sinon BLOQUANT
- REQ Criticité FORT → doit être adressée → sinon AVERTISSEMENT
- REQ A_CONFIRMER restante → lister pour validation Said KHAYAT

### Contrôle 5 — Conformité RC

- Format de remise respecté (PDF, DOCX, formats spécifiés)
- Nommage des fichiers selon RC
- Volume du mémoire dans les limites imposées
- Date limite : vérifier J restants (alerte si < 2 jours ouvrés)

### Contrôle 6 — Pièces administratives (important)

- RC AXA 2026 présente dans remise/annexes/ → disponible : `09-attestation-rc-axa-2026.pdf`
- DC1, DC2 listés dans ADMIN_CHECKLIST avec statut
- Kbis, attestations fiscales/sociales identifiés

### Contrôle 7 — Qualité rédactionnelle (conseil)

- Titres de sections alignés sur les critères RC
- Chaque section ≥ 150 mots
- Preuves référencées (📎 Annexe XX) pour chaque engagement fort
- Pas de jargon interne inconnu de l'acheteur

## Décision finale

```
GO_DEPOT ✅ : tous les contrôles bloquants passent → dépôt autorisé
BLOQUANT ❌ : au moins 1 contrôle bloquant en échec → corrections obligatoires
```

La décision `GO_DEPOT` doit être explicitement inscrite dans `qa/QA_CHECKLIST.md`.
Sans ce fichier avec GO_DEPOT, le skill `/ao-export` ne peut pas être lancé.

## Format de sortie complet

```markdown
# QA Red Team — [RÉFÉRENCE] — [DATE HEURE]

## Résumé exécutif
Contrôles effectués : 7 | Bloquants : [N] | Avertissements : [N]
DÉCISION : GO_DEPOT ✅ / BLOQUANT ❌

## 🔴 Contrôles bloquants
| # | Contrôle | Résultat | Localisation | Correction requise |
|---|---------|---------|-------------|-------------------|
| 1 | FleetWatcher | ✅ 0 occurrence | — | — |
| 2 | No-Invention Guard | ✅ Conforme | — | — |
| 3 | Contradictions | ✅ Aucune | — | — |
| 4 | Couverture REQ BLOQUANT | ✅ 100% | — | — |

## 🟡 Avertissements
| # | Contrôle | Résultat | Recommandation |
|---|---------|---------|---------------|

## 🔵 A_CONFIRMER à valider avec Said KHAYAT avant dépôt
1. [REQ-XXX] — [question spécifique]

## Corrections prioritaires (si BLOQUANT)
1. [Correction 1 — fichier + ligne]
2. [Correction 2]

---
**DÉCISION FINALE : GO_DEPOT ✅**
Dossier validé par QA Red Team — Prêt à signer et déposer
```

---

## Mises à jour v3.5 — capitalisation Garges + Résidences 78

### Contrôles supplémentaires bloquants (v3.5)

#### Contrôle 8 — Équipe officielle nommée (bloquant)

Vérifier que le mémoire technique cite explicitement l'équipe officielle dans le sous-critère « Services et contacts » :

- Said KHAYAT (Co-fondateur, Directeur Projet, 22 ans)
- Mustapha KHEROUA (Chef de projet / Réf. logiciel)
- Clément NOEL (Resp. technique terrain)
- Walid KHEROUA (Technicien installation)
- Samia MAKHLOUF (Resp. formation)
- Smaël KESSOURI (Représentant Légal)
- **Chaima GACI** (Resp. Support & Qualité — remplace Coumba MBENGUE)

> ❌ **Bloquant** : si "Coumba MBENGUE" apparaît encore dans le mémoire ou les annexes → corriger immédiatement.

#### Contrôle 9 — Organigramme projet présent (bloquant)

L'organigramme projet doit figurer dans le SC2 du mémoire (visuel généré par `ao-visuels-factory`). Sans organigramme → −1 point sur SC2.

#### Contrôle 10 — Doctrine "délai d'intervention" (bloquant si CCAP ambigu)

Si le CCAP utilise le terme « délai d'intervention » dans la clause Pénalités, le mémoire DOIT engager les délais selon la doctrine `knowledge/methodologies/delais-engagements-ao.md` :
- Délai d'intervention engagé (= CCAP)
- Cadence de réalisation engagée séparément (≈ 10 véh/jour nominal, jusqu'à 20 avec renforts)
- Échelonnement COTECH proposé pour volumes > 30 véh.

> ❌ **Bloquant** : si le mémoire engage une cadence intenable (ex. 50 véh en 2 j) → corriger avant dépôt.

#### Contrôle 11 — Visuels intégrés (avertissement)

Vérifier la présence des 5 visuels génériques au minimum dans le mémoire :
- Page de garde : `visuel_infographie_couverture.png`
- Compréhension du besoin + SC5 : `visuel_carte_proximite.png`
- SC4 : `visuel_gantt_deploiement.png`
- SC3 : `visuel_logistique_stock.png`
- SC2 : `organigramme_projet.png`

#### Contrôle 12 — Captures SuperFleet intégrées (avertissement)

Vérifier la présence des captures SuperFleet types dans le SC1 du mémoire (au minimum 4-6 captures sur les 10 disponibles dans `assets/captures-superfleet/`).

#### Contrôle 13 — Modules v3.5 cités (avertissement)

Les modules différenciants v3.5 doivent être cités au moins une fois dans le mémoire :
- **Module ANTAI** (collectivités, ZFE-m, désignation auto)
- **Module Carto-Balayage** (collectivités, propreté urbaine)
- **IA SuperFleet Agent** (nouveauté 2026, chat + voix + data)
- **Module Carburant** (rapprochement pétrolier 3j vs 5j CCTP)
- **Module Tachygraphe** (Smart Tacho 2)

### Mots interdits supplémentaires v3.5

```
Coumba MBENGUE          → BLOQUANT (remplacée par Chaima GACI)
Montélimar-Agglomération → BLOQUANT si présent (résidu modèle Résidences 78)
FleetWatcher             → BLOQUANT (toujours, voir Contrôle 1)
```

### Référence aux nouvelles connaissances v3.5

- `knowledge/briefs/BRIEF-profil-geoloc.md` (équipe complète)
- `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` (11 modules)
- `knowledge/company/equipe-projet-detaillee.md` (rôles et expériences)
- `knowledge/company/capacite-operationnelle.md` (cadences engageables)
- `knowledge/references/boitiers-teltonika-detail.md` (FMC650/FMC920 + RD200)
- `knowledge/methodologies/delais-engagements-ao.md` (doctrine délais)
