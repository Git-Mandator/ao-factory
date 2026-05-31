---
description: Analyse GO/NO GO sur 100 pts — décision de candidature documentée
allowed-tools: Read, Write, Glob
argument-hint: [référence marché ou chemin SYNTH_AO.md]
---

Lance l'analyse GO / NO GO pour le marché : $ARGUMENTS

## Prérequis

Lire dans l'ordre :
1. `synthese/SYNTH_AO.md` (si disponible) ou les documents DCE bruts
2. `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` — pour évaluer le fit produit
3. `knowledge/briefs/BRIEF-profil-geoloc.md` — pour évaluer la capacité delivery

## Scoring sur 100 points (6 axes)

Évalue chaque axe et justifie chaque score :

| Axe | Poids max | Questions clés |
|-----|-----------|----------------|
| **Fit produit** | 25 pts | SuperFleet couvre > 80% des exigences ? Module ANTAI demandé ? Armoires à clés ? |
| **Capacité delivery** | 15 pts | Délai déploiement réalisable ? Équipe disponible ? Stock boîtiers suffisant ? |
| **Risque contractuel** | 15 pts | Pénalités excessives ? SLA impossibles ? Clauses abusives ? Garanties inaccessibles ? |
| **Marge estimée** | 20 pts | Prix cible réaliste ? TCO hardware + SaaS couvert ? Reconduction rentable ? |
| **Compétitivité** | 10 pts | Concurrents identifiés ? Geoloc a des références similaires ? Secteur maîtrisé ? |
| **Intérêt stratégique** | 15 pts | Secteur cible ? Référence valorisable en AO suivants ? Effet levier ? |

## Règles de décision

| Score | Décision | Action |
|-------|----------|--------|
| ≥ 75 | ✅ **GO** | Démarrer Phase 3 |
| 60–74 | ⚠️ **GO_SOUS_CONDITIONS** | Identifier les conditions + arbitrage Said KHAYAT |
| < 60 | ❌ **NO_GO** | Documenter et archiver |
| Bloquant critique présent | ❌ **NO_GO automatique** | Peu importe le score total |

## Bloquants critiques automatiques (NO_GO immédiat)

- Délai de déploiement impossible (< 1 semaine pour > 100 véhicules)
- Certification non détenue exigée (ex : HDS obligatoire, non couvert par Geoloc)
- Volume < 10 véhicules → non rentable
- Acheteur géographiquement inaccessible pour la maintenance terrain
- Exigence de module non disponible dans SuperFleet (après vérification catalogue)

## Format de sortie — GONOGO.json

Crée le fichier `gonogo/GONOGO.json` avec ce format exact :

```json
{
  "marche": "[RÉFÉRENCE]",
  "acheteur": "[NOM ACHETEUR]",
  "date_analyse": "YYYY-MM-DD",
  "scoring": {
    "fit_produit":        { "score": 0, "max": 25, "commentaire": "" },
    "capacite_delivery":  { "score": 0, "max": 15, "commentaire": "" },
    "risque_contractuel": { "score": 0, "max": 15, "commentaire": "" },
    "marge_estimee":      { "score": 0, "max": 20, "commentaire": "" },
    "competitivite":      { "score": 0, "max": 10, "commentaire": "" },
    "interet_strategique":{ "score": 0, "max": 15, "commentaire": "" },
    "total": 0
  },
  "bloquants": [],
  "decision": "GO|GO_SOUS_CONDITIONS|NO_GO",
  "conditions": [],
  "recommandation": "",
  "validateur": "Said KHAYAT"
}
```

Affiche également un résumé lisible en français avec la décision mise en évidence.
