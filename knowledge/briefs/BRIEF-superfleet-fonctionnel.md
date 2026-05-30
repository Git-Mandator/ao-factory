# BRIEF — Catalogue Fonctionnel SuperFleet
## Chargement rapide — AO Factory v3.5

> Source complète : `knowledge/references/superfleet-catalogue-fonctionnel.md`
> **Version 3.5 — mai 2026** — capitalisation Garges-lès-Gonesse (26.065) et Résidences Yvelines (25-60).

---

## 11 modules — couverture CCTP en un coup d'œil

| # | Module | Fonctionnalités clés | Critères CCTP typiques |
|---|---|---|---|
| 1 | **Géolocalisation temps réel** | Cartographie MQTT < 1 sec, fréquence 30 sec mouvement / 5 min arrêt, événement immédiat, stockage embarqué + retransmission auto | Localisation TR, suivi multi-véhicules |
| 2 | **Fiche véhicule détaillée** | VIN, immat, conducteur identifié, km, heures moteur, état (PTO), boîtier/SIM, dernière position | Suivi parc, identification véhicule |
| 3 | **Historique et Replay** | Rejeu animé sur période librement choisie, recherche entre 2 dates, points d'arrêt, événements | Historique trajets, optimisation tournées |
| 4 | **Géofencing** | Zones polygonales illimitées, alertes entrée/sortie temps réel + e-mail + notification mobile | Périmètre zones, alertes hors-zone |
| 5 | **Éco-conduite** | Score conducteur, freinage/accélération brusques, excès vitesse, ralenti excessif, rapport PDF | Conduite, sécurité, RSE, transition éco |
| 6 | **Rapports & KPIs** | Tableau de bord, exports Excel/PDF, programmables et envoyés par e-mail, multi-utilisateurs | Reporting, tableaux de bord, exports xlsx |
| 7 | **Carto-Balayage** ⭐ | Spécifique propreté urbaine : cartographie quotidienne rues balayées, % par quartier, linéaires en m/km, code couleur graduel par nb passages, détection via PTO balayeuses Schmidt | Collectivités, propreté urbaine, balayage |
| 8 | **Module Carburant** | Rapprochement automatique fichier pétrolier × kilomètres SuperFleet, surconsommation vs moyenne flotte, **délai engagé 3 j** (vs 5 j max CCTP standard) | Carburant, contrôle conso, écarts |
| 9 | **Module Tachygraphe** | Lecture FMS (cars) + CAN J1939 (PL), conformité Règl. (CE) 561/2006, téléchargements C1B 100 %, Smart Tacho 2, alertes dépassement | Transport routier, conformité européenne |
| 10 | **Module ANTAI** ⭐ | Désignation automatique du conducteur sur infractions reçues, rapprochement géolocalisation × MIFARE × GPS, conformité aux délais légaux, télédéclaration ANTAI directe | Collectivités, flotte municipale, ZFE, ZFE-m |
| 11 | **Module Transition énergétique** | Pilotage de la part électrique du parc (% km EV, tCO₂ évitées, top véhicules EV, donut répartition énergétique), tendance mensuelle | RSE, ZFE, Crit'Air, verdissement flotte |
| 12 | **IA SuperFleet Agent** ⭐ NEW | Assistant conversationnel chat + voix, réponse < 3 sec, accessible web et mobile, requêtes en langage naturel sur la flotte | Innovation, ergonomie, accélération usage |

> ⭐ **Modules différenciants pour les collectivités** : Carto-Balayage, ANTAI, IA SuperFleet Agent.

## Application mobile SuperFleet (iOS & Android)

| Fonctionnalité | Disponibilité |
|---|---|
| Carte temps réel | ✅ |
| Réception alertes poussées | ✅ |
| Indicateurs éco-conduite par véhicule | ✅ |
| Tournées en cours | ✅ |
| Identification badge MIFARE | ✅ (côté véhicule, lecture par boîtier) |
| Multi-utilisateurs | ✅ sans surcoût |

## Spécifications techniques clés

| Spec | Valeur |
|---|---|
| Technologie | SaaS, React/TypeScript, PostgreSQL |
| Interface | Web responsive + PWA mobile (iOS/Android) |
| **Utilisateurs simultanés** | **200** (latence < 1 sec) |
| **Latence MQTT** | **< 1 seconde** (architecture événementielle) |
| **Niveaux de droits** | **4** (Administrateur, Gestionnaire, Consultation, Conducteur) |
| **Modules fonctionnels** | **11** (cf. tableau) |
| Colonnes personnalisables | 15+ |
| Rafraîchissement GPS véhicule en mouvement | 30 secondes (paramétrable) |
| Rafraîchissement GPS véhicule à l'arrêt | 5 minutes |
| Événement (allumage, alerte) | Transmission immédiate < 1 sec |
| Perte réseau (tunnel, sous-sol) | Stockage embarqué + retransmission auto |
| Historique conservé | Archivage 12 mois sur interface (configurable) |
| Exports | Excel (.xlsx), PDF, CSV, API JSON |
| Boîtiers compatibles | Teltonika **FMC650** (PL/engins/balayeuses) + **FMC920** (VL/VUL légers) — voir `knowledge/references/boitiers-teltonika-detail.md` |
| Accessoires embarqués | Lecteur MIFARE 13,56 MHz, bouton CNIL, faisceau CAN J1939/FMS/OBD2, relais anti-démarrage |
| Lecteur administratif | SYRIS RD200 USB pour enregistrement des badges agents côté Hôtel de Ville/Parc Auto |
| CAN-BUS | ⚠️ Compatible sur véhicules supportés — vérification véhicule par véhicule obligatoire |
| Multi-parc | Oui — groupes, sous-flottes, multi-sites, arborescence libre paramétrable |
| Hébergement | 100 % UE : AWS Frankfurt + OVH Gravelines + Flespi Vilnius |

## ⚠️ Points de vigilance

- **CAN-BUS** : NE JAMAIS promettre CAN-BUS sans la mention « sous réserve de compatibilité du véhicule avec le protocole CAN-BUS ».
- **Tachygraphe** : module disponible et démontré (cars Mercedes 59 pl. + PL DAF/MAN à Garges) — à confirmer selon type de véhicule.
- **Module ANTAI** : module natif disponible, particulièrement précieux pour les collectivités exposées aux infractions ZFE-m.
- **IA SuperFleet Agent** : nouveauté produit 2026, à mettre en avant comme évolution récente — démontre dynamisme R&D.
- **Carto-Balayage** : nécessite une balayeuse instrumentable via le bus CAN J1939 + capteur PTO. Démontré sur Schmidt Cleango 500 et Swingo 200.
- **API JSON** : disponible — préciser REST sur documentation si demandé.
- **PWA mobile** : pas d'app native store iOS/Android, mais expérience mobile complète. Nuance à apporter si exigé natif.
- **Compatibilité badges MIFARE** : compatible ISO-14443A 13,56 MHz, à valider avec les badges agents existants de la collectivité à la notification.

## Captures d'écran réutilisables (assets/captures-superfleet/)

| Capture | Fichier | Modules illustrés |
|---|---|---|
| Cartographie temps réel | `01_Carto_temps_reel.png` | Géolocalisation, suivi multi-véhicules |
| Fiche véhicule détaillée | `03_Fiche_vehicule_BALAY07.png` | Fiche véhicule, PTO, MIFARE |
| Module ANTAI | `04_Module_ANTAI.png` | ANTAI, désignation conducteur |
| Inventaire matériel | `06_Inventaire_materiel_embarque.png` | Traçabilité, stock tampon |
| Application mobile (3 écrans) | `07_Application_mobile.png` | App mobile, éco-conduite, alertes |
| Transition énergétique | `08_Transition_energetique.png` | Flotte EV, tCO₂ évitées |
| Module Carburant | `09_Carburant_rapprochement.png` | Carburant, surconsommation |
| Module Tachygraphe | `10_Tachygraphe_conformite.png` | Tachygraphe, Règl. CE 561/2006 |
| IA Agent chat web | `11_IA_Agent_chat_web.png` | IA conversationnel web |
| IA Agent mobile | `12_IA_Agent_mobile.png` | IA conversationnel mobile |

> À adapter au contexte client (nom du donneur d'ordres, véhicules réels) à chaque AO en utilisant le skill `ao-annexes-factory`.

## Mises à jour de cette version v3.5

- Ajout du module **Carto-Balayage** (différenciant collectivités)
- Ajout du module **Carburant** (rapprochement pétrolier 3j vs 5j)
- Ajout du module **Tachygraphe** complet (FMS + CAN J1939 + Smart Tacho 2)
- Ajout du module **ANTAI** (désignation auto conducteur, ZFE-m)
- Ajout du module **Transition énergétique**
- Ajout de l'**IA SuperFleet Agent** (Chat + Voix + Data — nouveauté 2026)
- Mise à jour boîtiers : FMC650 et FMC920 (avec spécifications détaillées dans le brief boîtiers)
- Mise à jour latence MQTT < 1 seconde et chiffres 200 utilisateurs simultanés
- Ajout précisions hébergement (Flespi Vilnius en plus d'AWS et OVH)
- Ajout référence aux 10 captures d'écran types réutilisables
