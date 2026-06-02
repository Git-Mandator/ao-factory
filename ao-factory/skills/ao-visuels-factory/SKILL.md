---
name: ao-visuels-factory
version: "3.6.4"
description: Génère les 5 visuels génériques d'un mémoire technique AO Geoloc Systems — organigramme projet, mini-carte siège ↔ client, diagramme de Gantt 6 semaines, schéma logistique stock, infographie résumé page de garde. Utiliser dès qu'un mémoire technique AO est à produire et qu'il faut illustrer la proposition par des visuels professionnels et personnalisés au contexte du donneur d'ordres. Déclencher pour "générer organigramme projet AO", "produire carte proximité siège-client", "Gantt déploiement 6 semaines", "schéma logistique stock", "infographie page de garde mémoire AO".
---

# Skill : AO Visuels Factory — Production des 5 visuels génériques du mémoire technique

Génère automatiquement les 5 visuels professionnels qui structurent visuellement tout mémoire technique AO Geoloc Systems.

## Capitalisation

Ce skill est issu de la capitalisation des marchés :
- **26.065 Garges-lès-Gonesse** (mai 2026) — production initiale des 5 visuels
- **25-60 Résidences Yvelines** (mars 2026) — référentiel mémoire gagnant

## Les 5 visuels produits

### 1. Organigramme projet — `gen_organigramme.py`
Schéma hiérarchique structuré en 2 zones (Administration / Gestion de projet) avec :
- Box Geoloc Systems + Box client + Smaël KESSOURI (RL) + Chaima GACI (Qualité)
- Said KHAYAT en Directeur Projet central
- 3 colonnes équipe : Samia MAKHLOUF (Formation), Mustapha KHEROUA (Logiciel), Clément NOEL + Walid KHEROUA (Technique)
- Bandeau bas avec 6 KPI contractuels (parc, déploiement, installation, distance, support, SLA)

### 2. Mini-carte siège ↔ client — `gen_carte_proximite.py`
Carte schématique illustrant :
- Point Geoloc (Colombes 92) à gauche, point Client à droite
- Tracé autoroute A86/A1 ou autre selon le client
- Étiquette centrale "X MIN" + "Y KM"
- Bandeau bas avec 4 avantages opérationnels (intervention, stock tampon, COPIL, démonstration)

### 3. Diagramme de Gantt 6 semaines — `gen_gantt.py`
Plan de déploiement type sur 6 semaines avec :
- 11 activités (Cadrage, Paramétrage, Pose engins prioritaires, Pose VL, Pose VUL, Pose engins légers, Pose reste, 3 formations, Recette)
- Barres colorées (bleu cadrage, rouge critique, orange déploiement, teal formation, vert recette)
- Bandeau bas avec équipe nommée et cadences (10 véh/j nominal, 20 max)

### 4. Schéma logistique stock — `gen_logistique.py`
Chaîne fournisseur → Geoloc → client :
- Box Teltonika Vilnius (violet) → Box Geoloc Colombes (bleu) → Box client (orange)
- Flèches avec annotations délais (livraison hebdo, < 60 min)
- Bandeau bas avec 5 KPI (stock tampon, délai approvisionnement, remplacement, pénalité évitée, reconditionnement)

### 5. Infographie résumé page de garde — `gen_infographie.py`
Visuel de couverture en 3 piliers numérotés :
- 1. Déploiement Maîtrisé (en X semaines)
- 2. Solution Fiable & Souveraine (100 % UE)
- 3. Engagements Tenus & Proximité

Chaque pilier contient 6 cartes blanches avec indicateur + valeur. Bandeau bas avec 5 KPI chiffrés.

## Processus d'exécution

1. **Lire le contexte AO** : récupérer le nom du donneur d'ordres, son adresse, la distance siège ↔ client, le nombre de véhicules, les jalons spécifiques.
2. **Personnaliser les scripts** : éditer les variables en tête de chaque script Python (CLIENT_NAME, CLIENT_ADDRESS, DISTANCE_MIN, FLEET_SIZE, DEPLOY_WEEKS, etc.).
3. **Exécuter les scripts** : `python3 gen_organigramme.py` etc., génère 5 PNG dans le dossier de sortie.
4. **Vérifier visuellement** chaque PNG produit.
5. **Intégrer les visuels** dans le mémoire technique aux sections appropriées (cf. mapping `MAPPING_VISUELS_MEMOIRE.md`).

## Mapping visuel → section mémoire (recommandé)

| Visuel | Section mémoire | Position |
|---|---|---|
| `visuel_infographie_couverture.png` | Page de garde | Sous le titre, avant identité Geoloc |
| `visuel_carte_proximite.png` | Compréhension du besoin + SC5 §5.1 | En haut de section |
| `visuel_gantt_deploiement.png` | SC4 §4.4 (Plan de déploiement) | Après le tableau délais |
| `visuel_logistique_stock.png` | SC3 §3.2 (Stock tampon et logistique) | Au début de la section |
| `organigramme_projet.png` | SC2 §2.3 (Organigramme projet) | Centré sur la section |

## Charte graphique respectée

| Élément | Valeur |
|---|---|
| Bleu marine principal | `#1E3A8A` |
| Teal accent (RSE, validation) | `#0F766E` |
| Orange accent (client) | `#F59E0B` |
| Rouge accent (alertes, priorité) | `#B91C1C` |
| Vert succès | `#10B981` |
| Gris fonds | `#F1F5F9` (clair) / `#374151` (foncé) |
| Police | DejaVu Sans / Arial (équivalent Calibri pour cohérence avec mémoire docx) |
| Format | PNG haute résolution (200 DPI) |
| Ratios | Paysage 16:9 ou 16:10 pour insertion docx |

## Variables paramétrables par script

Chaque script expose au début un bloc `# === PARAMÈTRES À PERSONNALISER ===` que l'agent doit éditer pour chaque AO :

```python
CLIENT_NAME = "VILLE DE GARGES-LÈS-GONESSE"
CLIENT_SHORT = "GARGES-LÈS-GONESSE"
CLIENT_ADDRESS = "108 rue Jean Moulin, 95140 Garges-lès-Gonesse"
CLIENT_SITE_NAME = "Centre Technique Municipal"
MARCHE_REF = "Marché 26.065 — LOT 1"
DISTANCE_MIN = 30
DISTANCE_KM = 25
ROAD_LABEL = "A86 → A1"
FLEET_SIZE = 130
DEPLOY_WEEKS = 6
```

## Dépendances Python

- `Pillow` (PIL) — `pip install --break-system-packages Pillow`
- Police DejaVu Sans (installée par défaut sur Linux)

## Sortie

Les 5 PNG sont produits dans le répertoire de travail (par défaut `./images/` ou paramétrable via `OUTPUT_DIR`).

## Sources

- Scripts originaux développés pour le marché 26.065 Garges-lès-Gonesse (mai 2026)
- Visuels validés visuellement par Said KHAYAT
