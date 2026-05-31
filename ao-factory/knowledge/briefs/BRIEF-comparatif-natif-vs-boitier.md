# BRIEF — Comparatif Natif vs Boîtier (14 familles de données)
## Chargement rapide — AO Factory v3.6

> Source de vérité pour rédiger le § « Comparatif télématique native constructeur vs boîtier embarqué Teltonika » d'un mémoire technique.
> Issu de la capitalisation SPL EBR DAF-2025-15 (OLD_MEMOIRE §9.2). À reprendre tel quel ; n'ajuster que les références véhicules / marques selon le parc réel de l'acheteur.

---

## Contexte d'usage

Ce comparatif est destiné à aider un acheteur — typiquement **[ACHETEUR]** sur le marché **[RÉF MARCHÉ]** — à arbitrer en transparence entre :

- la **télématique native constructeur** (modules Stellantis Peugeot/Citroën, Renault, Toyota, Renault ZOE pour le VE…), activable à distance sans pose matériel ;
- la **télématique par boîtier embarqué Teltonika** (FMC920 pour VL/VUL, FMC650 pour PL/engins), posée par un installateur agréé Geoloc Systems.

**Position professionnelle de Geoloc Systems** : recommandation du **boîtier Teltonika en première intention** pour la totalité du parc, y compris sur les marques éligibles au natif. Le natif n'est conseillé que lorsque la pose d'un boîtier est rendue impossible (clause leasing constructeur, garantie véhicule, configuration non installable). Ce choix est présenté en transparence à l'acheteur lors de la phase d'audit parc.

---

## Comparatif famille par famille — 14 familles de données

| # | Famille de données | Remontée native (marques majeures) | Remontée boîtier Teltonika (FMC920 / FMC650) | Commentaire |
|---|---|---|---|---|
| 1 | Kilométrage | OUI (odomètre constructeur) | OUI (odomètre boîtier + recoupement GPS) | Boîtier : double source, fiabilisation par recoupement |
| 2 | Position GPS temps réel | OUI — fréquence variable selon constructeur | OUI — fréquence configurable (30 s mouvement / 5 min arrêt) | Boîtier : paramétrage fin par profil véhicule |
| 3 | Statuts véhicule (roulant / arrêt / moteur tournant) | OUI — couverture partielle selon marque | OUI — 5 états complets (FONC-14) | Granularité supérieure côté boîtier |
| 4 | Carburant — niveau / consommation | OUI sur certaines marques | OUI — précision supérieure | Sous réserve de compatibilité véhicule par véhicule pour le CAN-BUS |
| 5 | Sessions de recharge VE (date, durée, kWh) | OUI (Renault ZOE notamment) | OUI | Natif déjà robuste sur ZOE ; boîtier couvre les marques non équipées |
| 6 | Accélérations / freinages / vitesse (éco-conduite fine) | Partiel — granularité dépendante constructeur | OUI — accéléromètre intégré, événements temps réel précis | Boîtier indispensable pour un score éco-conduite homogène multi-marques |
| 7 | Codes défaut (DTC) | OUI selon marque | OUI — lecture CAN-BUS étendue | Sous réserve de compatibilité véhicule par véhicule pour le CAN-BUS |
| 8 | Anti-démontage / anti-désactivation (SSE-11) | NON | OUI — alertes coupure alimentation, mouvement hors usage, ouverture boîtier | Exigence sécurité réservée au boîtier |
| 9 | Vie privée (bouton physique) | NON | OUI — bouton CNIL conforme | Conformité RGPD / délibération CNIL réservée au boîtier |
| 10 | Stockage embarqué + retransmission (tunnels, sous-sols, zones blanches) | NON | OUI — buffer 128 Mo + Dead Reckoning inertiel | Continuité de service en zone non couverte réservée au boîtier |
| 11 | Compatibilité autopartage MIFARE | NON | OUI — sortie relais pilotant anti-démarrage + lecteur MIFARE | Autopartage / identification conducteur réservés au boîtier |
| 12 | Indépendance vis-à-vis des évolutions constructeur | NON | OUI — boîtier homogène multi-marques | Le natif peut être dégradé sans préavis par évolution de protocole constructeur |
| 13 | Garantie matériel sur la durée de location | Variable selon constructeur | OUI — toute la durée du marché (MAT-10) | Coût matériel intégralement à charge Geoloc Systems côté boîtier |
| 14 | Couverture multi-marques homogène | NON — fragmentée (marques non éligibles : Ford, Iveco, autres utilitaires) | OUI — un seul standard de données, un seul outil de supervision | Le boîtier garantit une chaîne de captation unique et une responsabilité unique |

---

## Limites du natif — ce que la télématique constructeur ne remonte JAMAIS

- **Anti-démontage / anti-désactivation** (exigence sécurité type SSE-11) ;
- **Bouton vie privée physique** conforme délibération CNIL ;
- **Stockage embarqué + retransmission différée** en zone non couverte (tunnels, sous-sols, zones blanches) ;
- **Lecteur MIFARE / sortie relais** pour autopartage et anti-démarrage badge ;
- **Indépendance** vis-à-vis des évolutions de protocole constructeur (qui peuvent dégrader la remontée sans préavis) ;
- **Couverture homogène multi-marques** : le natif laisse hors couverture les marques non éligibles (typiquement Ford, Iveco, certains utilitaires).

---

## Apport du boîtier Teltonika seul — ce que le boîtier apporte au-delà du natif

- **Une chaîne de captation unique** sur l'ensemble du parc, indépendamment de la marque du véhicule ;
- **Une garantie matériel** sur toute la durée de la location (aucun coût matériel pour l'acheteur, remplacement à charge Geoloc Systems sous SLA) ;
- **Une fréquence de remontée paramétrable** (30 s en mouvement / 5 min à l'arrêt par défaut) ;
- **Un accéléromètre intégré** pour une éco-conduite fine et homogène multi-marques ;
- **Un buffer de 128 Mo + Dead Reckoning inertiel** (FMC650) pour la continuité de service hors couverture réseau ;
- **Une responsabilité unique** de bout en bout sur la chaîne capteur → broker → plateforme SuperFleet ;
- **Une indépendance** vis-à-vis des évolutions de protocole constructeur.

> 💡 **Synthèse à reprendre en mémoire** : « Le boîtier Teltonika apporte une couverture plus large, plus fine, plus homogène et plus indépendante. C'est la raison pour laquelle Geoloc Systems le recommande en première intention. »

---

## Précisions techniques à toujours rappeler

- **Modèles boîtiers** : **FMC920** pour VL / VUL (habitacle, IP41) ; **FMC650** pour PL / engins (IP67, renforcé, Dead Reckoning inertiel, stockage 128 Mo). **Jamais** mentionner FMC640 / FMM640 / FTC640 (EOL).
- **Lecture CAN-BUS** : toujours assortir de la mention **« sous réserve de compatibilité véhicule par véhicule »**.
- **Hébergement plateforme** : OVHcloud France, datacenter Tier 3+, **certifié ISO 27001 (certification hébergeur)**. Ne jamais attribuer ISO 27001 directement à Geoloc Systems.
- **Nom plateforme** : toujours **SuperFleet** (jamais « FleetWatcher »).

---

## Checklist de relecture

- [ ] Les **14 familles de données** sont bien présentes dans le tableau (≥ 10 minimum exigé).
- [ ] Le tableau respecte l'ordre canonique : Kilométrage → Position → Statuts → Carburant → VE → Éco-conduite → DTC → Anti-démontage → Vie privée → Stockage embarqué → MIFARE → Indépendance → Garantie → Couverture multi-marques.
- [ ] La mention **« sous réserve de compatibilité véhicule par véhicule »** apparaît bien pour le **CAN-BUS** (familles 4 et 7).
- [ ] Aucune mention de boîtier **EOL** (FMC640 / FMM640 / FTC640).
- [ ] Uniquement **FMC920** (VL/VUL) et **FMC650** (PL/engins) cités.
- [ ] Aucune mention de **« FleetWatcher »** — uniquement **« SuperFleet »**.
- [ ] **ISO 27001** rattaché à l'hébergeur (OVHcloud), jamais à Geoloc Systems directement.
- [ ] Le paragraphe **« Limites natif »** liste au minimum : anti-démontage, bouton vie privée, stockage embarqué, MIFARE, indépendance constructeur, couverture marques non éligibles.
- [ ] Le paragraphe **« Apport boîtier »** mentionne explicitement la **garantie matériel sur la durée du marché** (exigence type MAT-10).
- [ ] La **position professionnelle** (boîtier recommandé en première intention, natif en repli si pose impossible) est clairement énoncée.
- [ ] Les placeholders **[ACHETEUR]** et **[RÉF MARCHÉ]** ont été remplacés (pour SPL EBR : « SPL Eau du Bassin Rennais » / « DAF-2025-15 »).
- [ ] Aucun chiffre inventé : tout chiffre absent des sources DCE / catalogue Geoloc est marqué **[A_CONFIRMER : description]**.
