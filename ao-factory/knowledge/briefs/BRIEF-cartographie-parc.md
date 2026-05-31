# BRIEF — Cartographie Parc à équiper (méthodologie + tableaux types)
## Capitalisation AO Factory v3.5

> Pattern extrait de : `SPL_Eau_Bassin_Rennais_DAF-2025-15/_TEST-v3.5/00_DCE_extrait/OLD_MEMOIRE.txt` (§ 2.2)
> **Objectif** : produire une cartographie parc PRÉCISE et DÉFENDABLE, ventilée selon 3 critères croisés :
> 1. éligibilité native constructeur
> 2. type de remontée requise (natif vs boîtier)
> 3. type d'énergie (Diesel / Essence / Électrique / Hybride)
>
> Cette précision est un différenciant fort vis-à-vis des concurrents qui se contentent d'annoncer "compatible tous véhicules" sans démontrer leur lecture du parc.

---

## 1. Méthodologie de ventilation — 3 critères croisés

### Critère 1 — Éligibilité aux données natives constructeur

| Constructeur | Données natives SuperFleet | Action |
|---|---|---|
| **Peugeot** (Stellantis) | OUI | Éligible natif (sous réserve année / motorisation) |
| **Citroën** (Stellantis) | OUI | Éligible natif (sous réserve année / motorisation) |
| **Renault** | OUI | Éligible natif (inclut ZOE électrique) |
| **Toyota** | OUI | Éligible natif |
| **Ford** | NON | Boîtier obligatoire (FMC920 ou FMC650) |
| **Iveco** | NON | Boîtier obligatoire (typiquement FMC650 si PL/utilitaire lourd) |
| **Fiat** | NON | Boîtier obligatoire |
| **Autres marques** (Mercedes, MAN, DAF, Volvo, etc.) | NON natif chez Geoloc | Boîtier obligatoire — vérification CAN-BUS au cas par cas |

> **Règle de décision** : VL Peugeot / Renault / Citroën / Ford / Toyota récent → natif éligible (sous réserve audit) ; sinon → **FMC920 (VL/VUL)** ou **FMC650 (PL / engins / véhicules exposés)**.

### Critère 2 — Type de remontée requise

3 catégories à distinguer dans tout AO :

- **Éligible natif** → remontée via API constructeur, pas de pose physique requise.
- **Boîtier obligatoire** → marque hors périmètre natif OU exigence d'éco-conduite fine OU véhicule exposé.
- **À confirmer en pose** → véhicule dont l'éligibilité native n'est pas certaine sans diagnostic OBD2 sur place. Sera audité **sous 5 jours** après notification (audit parc systématique).

### Critère 3 — Type d'énergie

Ventilation Diesel / Essence / Électrique / Hybride — chiffres à extraire de l'Annexe État de Parc fournie au DCE. Cette ventilation justifie :
- la compatibilité **tous carburants** des boîtiers Teltonika (exigence MAT-01 type) ;
- le module **Transition énergétique** (% km EV, tCO₂ évitées) ;
- la pertinence du suivi des **sessions de recharge VE**.

---

## 2. Tableau type — Cartographie du parc à équiper

> À instancier acheteur par acheteur. Les chiffres ci-dessous sont des **placeholders** : ne JAMAIS les recopier sans vérification dans l'Annexe État de Parc.

### 2.1 Tableau principal (4 colonnes)

| Catégorie | Nombre véhicules | Solution | Justification |
|---|---|---|---|
| **Total parc à équiper** | **[TOTAL VÉH]** | Plateforme SuperFleet multi-tenant | Capacité multi-tenant éprouvée (> 10 000 véhicules en production France) |
| Véhicules éligibles **données natives** | **[NB NATIF]** | API constructeurs (Stellantis / Renault / Toyota) | Marques [LISTE MARQUES NATIVES IDENTIFIÉES] — modules natifs actifs |
| Véhicules nécessitant un **boîtier obligatoire** | **[NB BOÎTIER]** | **FMC920** (VL/VUL) ou **FMC650** (PL/engins) selon typologie | Marques hors périmètre natif : Ford, Iveco, Fiat, autres |
| Véhicules **à confirmer en pose** | **[NB A_CONFIRMER]** | Audit OBD2 sur site sous **5 jours** après notification | Année / motorisation / éligibilité protocole à valider véhicule par véhicule |

> **Règle de cohérence** : `[NB NATIF] + [NB BOÎTIER] + [NB A_CONFIRMER] = [TOTAL VÉH]`

### 2.2 Tableau ventilation énergétique

| Énergie | Nombre de véhicules | Implication SuperFleet |
|---|---|---|
| **Diesel** | [NB DIESEL] | Suivi conso via fichier pétrolier × km SuperFleet |
| **Essence** | [NB ESSENCE] | Suivi conso via fichier pétrolier × km SuperFleet |
| **Électrique** | [NB ELEC] | Module Transition énergétique + suivi sessions de recharge |
| **Hybride** | [NB HYBRIDE] | Suivi double (carburant + électrique), reporting unifié |
| **Total** | **[TOTAL VÉH]** | Compatibilité tous carburants (exigence MAT-01 type) |

> **Règle de cohérence** : `[NB DIESEL] + [NB ESSENCE] + [NB ELEC] + [NB HYBRIDE] = [TOTAL VÉH]`

### 2.3 Répartition par constructeur (ligne synthèse)

> Une ligne libre à insérer après le tableau principal :
>
> *Répartition constructeurs : Peugeot [N1] — Renault [N2] — Ford [N3] — Citroën [N4] — Toyota [N5] — Iveco [N6] — Fiat [N7] — Autres [N8].*

---

## 3. Section "Compatibilité par marque" — 5 marques principales

> À adapter selon les marques effectivement présentes dans l'Annexe État de Parc. Cette section transforme l'analyse parc en preuve d'expertise terrain.

### Peugeot (Stellantis)
- **Natif** : OUI sur gamme Stellantis Connect (Partner, Expert, 208, 308, 3008 récents)
- **Boîtier** : FMC920 en habitacle si véhicule ancien (< Stellantis Connect) ou exigence éco-conduite fine
- **Cas SPL EBR type** : Partner / Expert utilitaires → natif éligible majoritairement

### Renault
- **Natif** : OUI sur véhicules connectés Renault (Kangoo, Trafic, Master, **ZOE**)
- **Boîtier** : FMC920 si véhicule pré-connecté ou ZOE non-équipée du pack connectivité
- **Cas type** : ZOE électriques → natif si pack connectivité actif, sinon boîtier (sous réserve compatibilité)

### Citroën (Stellantis)
- **Natif** : OUI sur gamme Stellantis Connect (Berlingo, Jumpy, C3)
- **Boîtier** : FMC920 si non Stellantis Connect
- **Cas type** : Berlingo utilitaires → natif éligible

### Ford
- **Natif** : **NON** — basculement boîtier obligatoire systématique
- **Boîtier** : FMC920 sur Transit Custom / Connect / Ranger légers ; FMC650 si Transit châssis cabine ou véhicule exposé
- **Cas type** : Transit utilitaires → FMC920 systématique

### Toyota
- **Natif** : OUI sur gamme Toyota Hilux, Proace, RAV4 récents avec module télématique
- **Boîtier** : FMC920 si non éligible ou exigence éco-conduite fine
- **Cas type** : Hilux / Proace utilitaires → natif éligible si année récente

> **CAN-BUS** : pour TOUS les véhicules ci-dessus, la lecture des paramètres CAN (km précis, niveau carburant, état moteur) est **sous réserve de compatibilité véhicule par véhicule** — à valider en pose.

---

## 4. Position professionnelle Geoloc (recommandation type)

> Pattern repris de l'OLD_MEMOIRE SPL EBR — à conserver tel quel :

« Notre expertise nous conduit à recommander le **boîtier Teltonika en première intention**, y compris sur les véhicules éligibles au natif. Le boîtier garantit en effet :
- Une qualité de données supérieure (échantillonnage plus fin, accéléromètre intégré, événements éco-conduite fiables) ;
- Une traçabilité homogène quelle que soit la marque ;
- Une responsabilité unique sur la chaîne de captation ;
- Une indépendance vis-à-vis des évolutions de protocole constructeur (qui peuvent dégrader le natif sans préavis).

Le natif est conseillé uniquement lorsque l'installation d'un boîtier est impossible (véhicules en leasing constructeur avec interdiction de pose, véhicules futurs livrés en cours de marché). »

---

## 5. Audit parc systématique (engagement type)

À mentionner systématiquement dans la section cartographie :

- **Audit parc complet sous 5 jours** après réunion de mise en place ;
- Vérification de l'éligibilité native véhicule par véhicule ;
- Confirmation du modèle de boîtier (**FMC650** ou **FMC920**) selon typologie ;
- Identification des véhicules en commande à équiper à la livraison ;
- Confirmation des **[NB A_CONFIRMER]** véhicules indéterminés par diagnostic **OBD2** sur site.

---

## 6. Exemple concret — instanciation SPL EBR (référence)

> Ne JAMAIS recopier ces chiffres sur un autre AO. Ils sont conservés ici uniquement comme exemple d'instanciation correcte.

| Catégorie | Nombre | Solution | Justification |
|---|---|---|---|
| Total parc | **128** | SuperFleet | Multi-tenant éprouvé |
| Éligibles natif | **76** | API Stellantis + Renault + Toyota | Peugeot 64 + Citroën 12 + Renault 23 + Toyota 6 (recoupement) |
| Boîtier obligatoire | **35** | FMC920 majoritaire | Ford 21 + Iveco 1 + autres non éligibles natif |
| À confirmer | **17** | Audit OBD2 sous 5 j | Année / motorisation à valider en pose |

Ventilation énergétique SPL EBR : **81 Diesel — 25 Essence — 21 Électrique — 1 Hybride** (= 128 ✓).

Répartition constructeurs SPL EBR : Peugeot 64 — Renault 23 — Ford 21 — Citroën 12 — Toyota 6 — Iveco 1 — Fiat 1 (= 128 ✓).

> Note de cohérence sur l'exemple SPL EBR : 64 + 12 + 23 + 6 = 105 véhicules de marques natives sur 128 ; seulement 76 sont effectivement éligibles natif → écart de 29 véhicules à reverser dans "à confirmer" / "boîtier" selon audit (ancienneté, motorisation, pack connectivité). C'est exactement ce que la colonne **À confirmer (17)** + une partie du **Boîtier obligatoire** capture. Vérifier ce raisonnement à chaque nouvel AO.

---

## 7. Placeholders à remplir lors de l'instanciation

| Placeholder | Description | Source |
|---|---|---|
| `[ACHETEUR]` | Nom du donneur d'ordres | Page de garde DCE |
| `[RÉF MARCHÉ]` | Référence du marché | RC / AAPC |
| `[TOTAL VÉH]` | Nombre total de véhicules à équiper | Annexe État de Parc (xlsx) |
| `[NB NATIF]` | Véhicules éligibles données natives | Calcul croisé constructeur × année |
| `[NB BOÎTIER]` | Véhicules nécessitant boîtier obligatoire | Marques hors natif + cas exposés |
| `[NB A_CONFIRMER]` | Véhicules à confirmer en pose | Solde après natif + boîtier certains |
| `[NB DIESEL]` `[NB ESSENCE]` `[NB ELEC]` `[NB HYBRIDE]` | Ventilation énergétique | Colonne carburant Annexe État de Parc |
| `[LISTE MARQUES NATIVES IDENTIFIÉES]` | Marques natives effectivement présentes | Colonne marque Annexe État de Parc |
| `[N1]…[N8]` | Répartition par constructeur | Comptage Annexe État de Parc |

---

## 8. Checklist anti-erreur (à exécuter avant export)

- [ ] **Somme cohérente** : `[NB NATIF] + [NB BOÎTIER] + [NB A_CONFIRMER] = [TOTAL VÉH]`
- [ ] **Ventilation énergétique cohérente** : `[NB DIESEL] + [NB ESSENCE] + [NB ELEC] + [NB HYBRIDE] = [TOTAL VÉH]`
- [ ] **Répartition constructeurs cohérente** : somme par marque = `[TOTAL VÉH]`
- [ ] **Aucun chiffre inventé** : chaque nombre tracé à l'Annexe État de Parc (sinon `[A_CONFIRMER : description]`)
- [ ] **Aucune mention "FleetWatcher"** — uniquement **SuperFleet**
- [ ] **Aucun boîtier EOL** (FMC640 / FMM640 / FTC640) — uniquement **FMC650** (PL/engins) ou **FMC920** (VL/VUL)
- [ ] **CAN-BUS** toujours assorti de « sous réserve de compatibilité véhicule par véhicule »
- [ ] **ISO 27001** : jamais attribué à Geoloc Systems directement — uniquement aux hébergeurs (AWS Frankfurt / OVH Gravelines)
- [ ] **Marques natives** alignées avec la position officielle Geoloc (Peugeot / Citroën / Renault / Toyota — pas plus)
- [ ] **Audit parc 5 jours** mentionné si la catégorie "à confirmer" est non nulle
- [ ] **Position professionnelle** (boîtier en première intention) reprise si l'acheteur valorise la rigueur technique
- [ ] **Référence à l'Annexe État de Parc** explicite dans le mémoire
- [ ] Cohérence avec la section **Compatibilité par marque** (les marques citées doivent toutes figurer dans le parc)
