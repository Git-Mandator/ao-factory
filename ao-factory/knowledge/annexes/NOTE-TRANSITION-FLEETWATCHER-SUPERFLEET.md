# Note de transition — FleetWatcher → SuperFleet
## AO Factory — Règle de branding obligatoire

> Version : 1.0.0 — 21 février 2026
> ⚠️ Document à lire AVANT toute utilisation des annexes types

---

## Contexte

**SuperFleet** est la nouvelle solution SaaS de gestion de flotte de Geoloc Systems.
Elle remplace l'ancienne solution **FleetWatcher**, désormais en fin de commercialisation.

Tous les documents types disponibles dans ce répertoire (`annexes-types/`) ont été produits dans le cadre de projets FleetWatcher. Leur contenu méthodologique reste entièrement valide et réutilisable — seul le branding doit être mis à jour.

---

## Règle absolue pour les AO

> **Ne jamais soumettre un document mentionnant FleetWatcher à un acheteur public.**
> Un acheteur qui recherche "FleetWatcher" sur internet trouvera des informations sur l'ancienne solution, ce qui fragilise la crédibilité de l'offre.

---

## Procédure de mise à jour avant utilisation

Pour chaque annexe type à réutiliser dans une réponse AO :

1. Ouvrir le document source (PDF ou source d'origine)
2. Effectuer un remplacement global :

| Ancien terme | Nouveau terme |
|---|---|
| FleetWatcher | SuperFleet |
| Fleet Watcher | SuperFleet |
| FLEET WATCHER | SUPERFLEET |
| fleetwatcher | superfleet |

3. Vérifier que le logo et l'identité visuelle sont ceux de **Geoloc Systems / SuperFleet**
4. Mettre à jour la date du document
5. Sauvegarder en PDF et renommer avec le suffixe `_SuperFleet_v[date]`

---

## Correspondance fonctionnelle FleetWatcher → SuperFleet

SuperFleet reprend l'ensemble des fonctionnalités de FleetWatcher et les étend. Les modules documentés dans les annexes types ont leurs équivalents directs dans SuperFleet :

| Fonctionnalité FleetWatcher | Équivalent SuperFleet | Évolution |
|---|---|---|
| Tableau de bord flotte | Tableau de bord SuperFleet | Amélioré — nouvelles vues |
| Suivi temps réel | Cartographie SuperFleet | Nouveaux filtres, clustering |
| Rapports conducteurs | Rapports SuperFleet | Nouvelles métriques |
| Gestion des alertes | Alertes SuperFleet | Personnalisation avancée |
| Export données | Export SuperFleet | Nouveaux formats |
| Administration | Console admin SuperFleet | Interface unifiée |

---

## Annexe SuperFleet à constituer (priorité haute)

Le dossier `superfleet/` manque d'une **annexe d'illustrations SuperFleet** montrant l'interface réelle de la solution. Cette annexe est indispensable dans les mémoires techniques pour les critères "présentation de la solution".

**Contenu à produire :**

1. **Capture tableau de bord principal** → vue générale, KPI flotte
2. **Capture cartographie temps réel** → positionnement véhicules, filtres
3. **Capture rapport éco-conduite** → scores conducteurs, alertes
4. **Capture gestion des alertes** → paramétrage, historique
5. **Capture vue mobile** → si disponible, fort argument différenciant
6. **Capture administration** → gestion des utilisateurs, droits

**Format recommandé :**
- Fichier PDF ou PPTX, 6 à 10 pages
- Légendes sur chaque capture expliquant ce qu'elles démontrent
- En lien avec les critères CCTP fréquents (ergonomie, accessibilité, reporting)

**Nommage :** `08-annexe-illustrations-superfleet.pdf`

---

*Note créée le 21 février 2026 — AO Factory / Geoloc Systems*
