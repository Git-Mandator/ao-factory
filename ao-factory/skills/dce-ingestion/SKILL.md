---
name: dce-ingestion
version: "3.6.0"
domain: AO_FACTORY
language: fr
description: >
  Ce skill doit être utilisé pour la Phase 0 de la factory AO : ingestion et normalisation
  des documents DCE. Déclencher dès qu'un dossier DCE est fourni pour commencer un AO,
  ou quand l'utilisateur demande "vérifier les documents DCE", "inventorier le DCE",
  "classer les pièces de l'appel d'offres", "vérification des documents AO".
---

# Skill : Ingestion & Normalisation DCE — Phase 0

Réalise l'inventaire structuré des documents DCE avant toute analyse.

## Processus d'exécution

### 1. Détection et classification des documents

Pour chaque fichier dans le dossier DCE, détecter le type par :
- Nom de fichier (RC, CCTP, CCAP, DQE, BPU, AE, Annexe...)
- Contenu textuel (mots-clés de détection par type)

| Type | Indicateurs | Obligatoire |
|------|-------------|-------------|
| **RC** | "règlement de consultation", "modalités", "critères de sélection", "pondération" | ✅ Bloquant |
| **CCTP** | "cahier des clauses techniques", "exigences", "spécifications fonctionnelles" | ✅ Bloquant |
| **CCAP** | "clauses administratives", "pénalités", "délais contractuels", "résiliation" | ⚠️ Important |
| **DQE/BPU** | "bordereau", "prix unitaires", "devis quantitatif estimatif", "tarif" | ✅ Bloquant Phase 5 |
| **AE** | "acte d'engagement", "soussigné", "candidat", "offre de prix totale" | ⚠️ Important |
| **Annexes** | Tout autre document | 🔵 Optionnel |

### 2. Extraction des métadonnées clés

Pour chaque document identifié, extraire :
- Référence du marché (numéro, intitulé)
- Acheteur (pouvoir adjudicateur, SIRET si disponible)
- Date limite de remise des offres (format : JJ/MM/AAAA à HH:MM)
- Procédure (MAPA / Appel d'offres ouvert / Procédure adaptée)
- Durée du marché + possibilité de reconduction
- Nombre de lots
- Volume estimé (nombre de véhicules / sites)
- Critères de notation et pondération (technique/prix)

### 3. Calcul du J-Deadline

Calculer le nombre de jours ouvrés restants jusqu'à la date limite.
Alerter si J < 5 jours ouvrés (délai critique).

### 4. Rapport d'inventaire

Produire un rapport structuré :

```
📦 INVENTAIRE DCE — [RÉFÉRENCE MARCHÉ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Acheteur       : [Nom]
Référence      : [Ref]
Date limite    : [Date] — J-[N] jours ouvrés
Procédure      : [Type]
Volume         : [N] véhicules

DOCUMENTS REÇUS :
✅ RC   — [nom_fichier] — [type détecté]
✅ CCTP — [nom_fichier]
❌ DQE  — MANQUANT ⚠️
✅ CCAP — [nom_fichier]

STATUT : [COMPLET ✅ | INCOMPLET ⚠️ — Documents manquants : RC / CCTP / DQE]

PROCHAINE ÉTAPE : /ao-gonogo
```

### 5. Création de la structure du dossier de réponse

Créer l'arborescence standard SOP dans le répertoire courant :

```
REPONSE_[YYYYMMDD]_[ACHETEUR_SHORT]/
├── 00-dce-source/          (copie des docs DCE reçus)
├── synthese/
├── gonogo/
├── matrice-conformite/
├── memoire-technique/
├── pricing/
├── admin/
├── qa/
└── remise/
    └── annexes/
```

## Règles

- Si RC ou CCTP manquant → STOP. Message clair à l'utilisateur avec liste des manquants.
- Copier les documents DCE dans `00-dce-source/` sans les modifier (gel des sources)
- Journaliser l'inventaire dans `synthese/DCE_INVENTORY.md`
