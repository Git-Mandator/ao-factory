---
name: ao-annexes-factory
description: Génère les 9 annexes types d'un dossier de remise AO Geoloc Systems — tableau de bord projet, CR COPIL, CR COTECH, PV vérification, suivi installations, boîtier Teltonika, plan formation, illustrations SuperFleet, lecteur MIFARE. Utiliser dès qu'un dossier d'annexes doit être produit en complément du mémoire technique. Déclencher pour "produire annexes AO", "générer tableau de bord projet", "modèle CR COPIL", "PV pose contradictoire", "suivi installations", "fiche boîtier Teltonika", "plan formation Admin/Gest/Terrain", "illustrations SuperFleet", "lecteur badges MIFARE".
---

# Skill : AO Annexes Factory — Production des 9 annexes types

Génère le dossier complet d'annexes techniques d'un AO Geoloc Systems, à partir de templates JavaScript paramétrables.

## Capitalisation

Issu de la capitalisation des AO :
- **26.065 Garges-lès-Gonesse** (mai 2026) — production initiale des 9 annexes
- **25-60 Résidences Yvelines** (mars 2026) — référentiel mémoire gagnant

## Les 9 annexes produites

### Famille 1 — Pilotage projet (4 annexes)

| N° | Annexe | Source | Pages | Script |
|---|---|---|---|---|
| 01 | Tableau de bord de suivi du projet | Capitalisation Résidences 78 | ~3 | `gen_annexe_01_tableau_bord.js` |
| 02 | Modèle de compte-rendu COPIL trimestriel | Capitalisation Résidences 78 | ~3 | `gen_annexe_02_cr_copil.js` |
| 03 | Modèle de compte-rendu COTECH mensuel | Capitalisation Résidences 78 | ~3 | `gen_annexe_03_cr_cotech.js` |
| 04 | Modèle de procès-verbal de vérification (VA / VSR / pose) | Capitalisation Résidences 78 | ~4 | `gen_annexe_04_pv_verification.js` |

### Famille 2 — Déploiement et suivi (1 annexe)

| N° | Annexe | Source | Pages | Script |
|---|---|---|---|---|
| 05 | Tableau de suivi des installations (pré-rempli avec véhicules du parc) | Garges-lès-Gonesse | ~3 | `gen_annexe_05_suivi_installations.js` |

### Famille 3 — Matériel et illustrations (3 annexes)

| N° | Annexe | Source | Pages | Script |
|---|---|---|---|---|
| 06 | Annexe Boîtier Teltonika (FMC650/FMC920 + accessoires) | Garges-lès-Gonesse | ~6 | `gen_annexe_06_boitier_teltonika.js` |
| 08 | Annexe Illustrations SuperFleet (10 modules captures) | Garges-lès-Gonesse | ~15 | `gen_annexe_08_illustrations.js` |
| 09 | Annexe Lecteur MIFARE RD200 USB (administration badges) | Garges-lès-Gonesse | ~6 | `gen_annexe_09_lecteur_mifare.js` |

### Famille 4 — Formation (1 annexe)

| N° | Annexe | Source | Pages | Script |
|---|---|---|---|---|
| 07 | Plan de formation (Admin 2h, Gestionnaires 1h30, Terrain 30 min) | Capitalisation Résidences 78 + Garges | ~4 | `gen_annexe_07_plan_formation.js` |

## Processus d'exécution

### 1. Préparation du contexte AO

Identifier les variables d'entrée :
- `CLIENT_NAME` (ex: "Ville de Garges-lès-Gonesse")
- `MARCHE_REF` (ex: "Marché 26.065 — LOT 1")
- `FLEET_SIZE` (ex: 130)
- `DEPLOY_WEEKS` (ex: 6)
- Liste des véhicules du parc (issue de l'annexe parc du DCE)

### 2. Génération en lot

```bash
# Depuis le répertoire scripts/
npm install   # première fois uniquement
node gen_all_annexes.js
```

Les 9 annexes sont produites en `.docx` dans `./output/`.

### 3. Conversion en PDF (optionnel)

```bash
libreoffice --headless --convert-to pdf output/*.docx
```

### 4. QA Red Team — vérification

- Aucune occurrence de "FleetWatcher" (uniquement "SuperFleet")
- Aucune occurrence du nom du client précédent (Résidences 78, Garges, etc.)
- Coordonnées équipe Geoloc à jour (cf. `knowledge/company/equipe-projet-detaillee.md`)
- Photos et logos référencés dans `assets/`

## Bibliothèque commune `lib.js`

Le fichier `scripts/lib.js` mutualise :
- Helpers de génération docx-js : `P()`, `H1()`, `H2()`, `H3()`, `bullet()`, `cell()`, `buildTable()`, `pageBreak()`
- Charte graphique (couleurs, polices, marges, format A4)
- Constructeur de Document avec en-tête/pied de page Geoloc Systems
- Fonction `save()` paramétrable

Toutes les annexes utilisent `lib.js` pour garantir la cohérence visuelle.

## Charte graphique respectée

| Élément | Valeur |
|---|---|
| Bleu marine principal | `#1E3A8A` |
| Teal accent | `#0F766E` |
| Light fond zebrage | `#F1F5F9` |
| Border tableaux | `#94A3B8` |
| Police | Calibri (par défaut docx) |
| Format | A4 — marges 0,8 inch (1134 DXA) |
| En-tête | `Annexe XX — [titre] · Marché XX.XXX · Client` (italique bleu) |
| Pied de page | `Geoloc Systems SAS — 14 rue de Mantes, 92700 Colombes — Page N` |

## Dépendances

```bash
npm install docx   # docx-js pour la génération .docx
```

## Sortie

Les 9 `.docx` (~1-7 Mo chacun selon images) sont produits dans `./output/`.
La conversion en PDF est optionnelle via LibreOffice headless.

## Sources

- Scripts originaux développés pour le marché 26.065 Garges-lès-Gonesse (mai 2026)
- Templates inspirés du mémoire gagnant 25-60 Résidences Yvelines
