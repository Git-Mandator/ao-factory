---
description: Rédige le mémoire technique complet (CMT) piloté par EXIGENCES.json et STRATEGIE.md
allowed-tools: Read, Write, Edit, Glob
argument-hint: [référence marché]
---

Rédige le mémoire technique complet pour : $ARGUMENTS

## Prérequis — lire avant de rédiger

**Backbone stratégique (lire EN PREMIER) :**
1. `strategie/STRATEGIE.md` — angle retenu, hiérarchie des sections, phrase fil rouge
2. `synthese/EXIGENCES.json` — REQ-XXX avec statuts, pondération critères

**Bases documentaires (briefs d'abord) :**
3. `knowledge/briefs/BRIEF-profil-geoloc.md` — phrases types, références, chiffres
4. `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` — modules, specs
5. `knowledge/briefs/BRIEF-securite-rgpd.md` — SLA, RGPD, formulations prêtes

**Contenu étendu (si nécessaire) :**
6. `matrice-conformite/MATRICE_CONFORMITE.md` — réponses par REQ
7. `knowledge/memoire-exemple/analyse-memoire-25-60.md` — blocs réutilisables annotés

## Règle d'or — structure pilotée par la stratégie

L'ordre des sections du mémoire suit la **hiérarchie de STRATEGIE.md**, pas l'ordre arbitraire du CCTP.
Les sections à fort poids reçoivent plus de mots et au moins 1 preuve documentaire.

La **phrase fil rouge** de STRATEGIE.md doit apparaître en tête de chaque section prioritaire (⭐⭐⭐).

## Pour chaque section du mémoire — structure 6 blocs :

```
1. ENGAGEMENT (1–2 phrases) — ce que Geoloc Systems s'engage à faire
2. MÉTHODOLOGIE — comment nous le faisons (avec chiffres)
3. MOYENS — avec quoi / qui / quand
4. PREUVES — référence REQ-XXX → annexe ou document source
5. BÉNÉFICES CLIENT — ce que l'acheteur y gagne concrètement
6. INDICATEURS — chiffres mesurables (délais, taux, volumes)
```

## Traçabilité REQ ↔ mémoire (obligatoire)

Pour chaque paragraphe rédigé, mettre à jour EXIGENCES.json :
```json
"paragraphe_memoire": {
  "section": "[numéro section] — [titre]",
  "statut": "REDIGE",
  "longueur_mots": [N]
}
```

## Sources obligatoires par section

| Section mémoire | Source à consulter |
|-----------------|-------------------|
| Propos liminaire | BRIEF-profil-geoloc → "Phrases types" + "Mot du Directeur" |
| Présentation solution | BRIEF-superfleet-fonctionnel + Annexe 08 (illustrations) |
| Conformité fonctionnelle CCTP | MATRICE_CONFORMITE.md (REQ par REQ) |
| Méthodologie déploiement | BRIEF-profil-geoloc → Section déploiement 5 phases |
| Équipe projet | BRIEF-profil-geoloc → équipe nommée |
| Délais engagés | BRIEF-profil-geoloc → délais contractuels |
| Formation | Annexe 07 Plan de formation (4 modules / 4 profils) |
| Support / SLA | BRIEF-securite-rgpd → SLA chiffres certifiés |
| Sécurité / RGPD | BRIEF-securite-rgpd → formulations prêtes |
| Hébergement | BRIEF-securite-rgpd → AWS Frankfurt + OVH Gravelines |
| RSE | BRIEF-profil-geoloc → engagements RSE |
| Réversibilité | profil-geoloc-systems.md Section 11 |
| Références clients | BRIEF-profil-geoloc → 4 clients autorisés uniquement |

## Style rédactionnel

- **Langage acheteur public** : citer les articles du CCP si pertinents
- **Factuel** : chaque affirmation suivie d'une preuve ou d'un chiffre
- **Mesurable** : délais en heures/jours, taux en %, volumes en unités
- **INTERDIT** : "solution innovante", "approche globale", "partenaire de confiance" sans preuve
- **Mots du CCTP** : reprendre les intitulés exacts dans les titres de section
- **INTERDIT** : "FleetWatcher" → toujours "SuperFleet"

## Format de sortie — MEMOIRE_TECHNIQUE.md

Crée `memoire-technique/MEMOIRE_TECHNIQUE.md` avec :
- En-tête : acheteur, référence, date limite, phrase fil rouge
- Sections numérotées dans l'ordre stratégique (STRATEGIE.md)
- Tableau de synthèse des engagements en fin de document
- Références aux annexes (📎 Annexe XX — [fichier])
- Longueur : sections prioritaires ⭐⭐⭐ = 200–350 mots | sections standard ⭐ = 100–200 mots

Après rédaction complète, afficher :
- Nombre de sections rédigées
- REQ-XXX non couverts dans le mémoire (si > 0 → alerter)
- A_CONFIRMER résiduels dans le texte (à baliser `[A_CONFIRMER: question]`)
