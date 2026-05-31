---
description: Génère la matrice de conformité CCTP et enrichit EXIGENCES.json
allowed-tools: Read, Write, Edit, Glob, Grep
argument-hint: [référence marché]
---

Génère la matrice de conformité complète pour : $ARGUMENTS

## Prérequis — charger les sources dans l'ordre optimal

**Briefs (lecture rapide, priorité):**
1. `knowledge/briefs/BRIEF-superfleet-fonctionnel.md`
2. `knowledge/briefs/BRIEF-securite-rgpd.md`
3. `knowledge/briefs/BRIEF-profil-geoloc.md`

**Backbone:**
4. `synthese/EXIGENCES.json` — REQ-XXX extraits + pondération stratégie
5. `strategie/STRATEGIE.md` — angle retenu, différenciateurs

**Sources complètes (si besoin de détail):**
6. `knowledge/briefs/BRIEF-superfleet-fonctionnel.md`
7. `knowledge/briefs/BRIEF-securite-rgpd.md`
8. `knowledge/annexes/INDEX-ANNEXES.md`

## Pour chaque exigence REQ-XXX

Renseigner TOUS les champs du schéma EXIGENCES.json :

| Champ | Valeurs possibles |
|-------|-------------------|
| **statut** | `OK` / `PARTIEL` / `NON` / `A_CONFIRMER` |
| **reponse_superfleet** | Explication précise, sourcée, chiffrée |
| **source_knowledge** | Fichier exact + section (ex: `catalogue-fonctionnel.md#geolocalisation`) |
| **preuves** | Fichiers d'annexes disponibles dans `knowledge/annexes/` |
| **paragraphe_memoire.statut** | `A_REDIGER` (à ce stade) |

## Règle de priorité stratégique

Les REQ rattachés aux critères à fort poids (depuis `ponderation` dans EXIGENCES.json) doivent recevoir une réponse plus développée et référencer au moins 1 preuve documentaire.

## Règle anti-hallucination — STRICTE

- `OK` uniquement si la fonctionnalité est documentée dans la base documentaire
- `A_CONFIRMER` si doute — jamais inventer
- ❌ Jamais promettre CAN-BUS sans "sous réserve de compatibilité véhicule par véhicule"
- ❌ Jamais attribuer ISO 27001 / SOC 2 à Geoloc Systems directement

## Format de sortie dual

### 1. Mise à jour EXIGENCES.json (obligatoire)

Enrichir chaque entrée `exigences[]` avec statut, reponse_superfleet, source_knowledge, preuves.
Calculer `couverture_globale` après traitement de toutes les REQ.

### 2. Création MATRICE_CONFORMITE.md (pour lecture humaine)

```markdown
# Matrice de Conformité — [RÉFÉRENCE MARCHÉ]
Acheteur : [Nom] | Date : [Date] | Exigences totales : [N]
Pondération : Technique [X]% / Prix [X]%

## Synthèse de couverture

| Statut | Nombre | % |
|---|---|---|
| ✅ OK | [N] | [X]% |
| 🟡 PARTIEL | [N] | [X]% |
| ❌ NON | [N] | [X]% |
| 🔵 A_CONFIRMER | [N] | [X]% |

Score de couverture pondéré : [X]%

## ⚠️ Points A_CONFIRMER à remonter à Said KHAYAT

| REQ | Exigence | Question |
|---|---|---|
| [REQ-XXX] | [libellé] | [ce qu'il faut vérifier] |

## ❌ Exigences NON couvertes — traitement requis

| REQ | Criticité | Exigence | Alternative proposée |
|---|---|---|---|
| [REQ-XXX] | MUST/SHOULD | [libellé] | [variante ou position] |

## Matrice détaillée complète

| REQ | Critère | Exigence CCTP | Poids | Statut | Réponse SuperFleet | Source | Annexe |
|---|---|---|---|---|---|---|---|
| REQ-001 | C01.1 | [texte exact] | [X]% | ✅ OK | [réponse] | [source] | [annexe] |
```

Affiche les `A_CONFIRMER` en priorité — ce sont les actions urgentes pour Said KHAYAT.
