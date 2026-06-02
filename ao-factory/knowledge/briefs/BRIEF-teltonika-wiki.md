# BRIEF — Wiki technique Teltonika (FMC650 / FMC920)
## Référence avancée — AO Factory

> Capitalisation du **wiki officiel Teltonika** (wiki.teltonika-gps.com) pour répondre aux CCTP
> exigeants sur le détail technique. Complète `boitiers-teltonika-detail.md` (fiche commerciale).
> Source : Teltonika Telematics UAB, Vilnius (UE).

---

## 1. Codecs de transmission (protocole binaire propriétaire)

| Codec | Usage | Champs principaux | Quand l'utiliser |
|---|---|---|---|
| **Codec 8** | Standard AVL (positions + I/O) | Timestamp, Priority, GPS Element (lon/lat/alt/angle/sat/speed), I/O Element | Cas d'usage standard flotte |
| **Codec 8 Extended** | AVL étendu — supporte IO ID sur 2 octets (>255 IDs) | Idem + ID large + champs X bytes | **Par défaut sur FMC650/FMC920** — capacité IDs étendue |
| **Codec 12** | Commandes serveur → boîtier (GPRS) | Command type + size + payload | Configuration à distance, déclenchements |
| **Codec 13** | Commandes avec horodatage | Idem + timestamp | Audit/traçabilité des commandes |
| **Codec 14** | Commandes vers boîtier par IMEI | Idem + IMEI | Gestion multi-boîtiers serveur |
| **Codec 16** | AVL avec ID événement généré | Codec 8E + Event ID | Workflow event-driven |

**Geoloc Systems / SuperFleet utilise Codec 8 Extended** — ingestion native, checksum CRC-16 contrôlé.

---

## 2. AVL IDs essentiels (sélection AO — 60 IDs critiques sur 600+)

> Liste sélective des IDs les plus demandés dans les CCTP collectivités / flottes pro.
> Chaque ID = un évènement ou une mesure remontée par le boîtier.

### 🚗 Données véhicule (universelles)

| ID | Nom | Unité | Source | Usage AO |
|---|---|---|---|---|
| 16 | Total Odometer | m | GPS / OBD | Kilométrage cumulé |
| 24 | Speed | km/h | GPS | Vitesse instantanée |
| 66 | External Voltage | mV | Batterie véhicule | Détection batterie faible / coupure |
| 67 | Battery Voltage | mV | Batterie interne boîtier | Autonomie autonome |
| 68 | Battery Current | mA | Boîtier | Diagnostic charge |
| 69 | GNSS Status | enum | GNSS | 0 GNSS off / 1 fix / 2 sleep / 3 over current |
| 80 | Data Mode | enum | Boîtier | Home/Roaming/Unknown |
| 113 | Battery Level | % | Boîtier | Charge restante |
| 181 | GNSS PDOP | — | GNSS | Précision position |
| 182 | GNSS HDOP | — | GNSS | Précision horizontale |
| 199 | Trip Odometer | m | GPS | Distance trajet en cours |
| 200 | Sleep Mode | enum | Boîtier | 0 No / 1 GPS / 2 Online / 3 Deep / 4 Online Deep / 5 Ultra Deep |
| 240 | Movement | bool | Accéléro | 0 stop / 1 mouvement |
| 247 | Crash Detection | enum | Accéléro | 1 limited / 2 full / 6 trace |
| 252 | Unplug | bool | Alim | 1 boîtier débranché — alerte anti-démontage |
| 253 | Green Driving Type | enum | Accéléro | 1 accel / 2 freinage / 3 virage rapide |
| 254 | Green Driving Value | g/10 | Accéléro | Force de l'évènement |
| 255 | Overspeeding | km/h | GPS | Survitesse — différence vs seuil |

### 🛻 CAN-BUS J1939 / FMS (PL, balayeuses, cars — FMC650)

| ID | Nom | Unité | Usage AO |
|---|---|---|---|
| 81 | Vehicle Speed (CAN) | km/h | Vitesse CAN véhicule |
| 82 | Accelerator Pedal Position | % | Eco-conduite |
| 83 | Total Fuel Used | L | Consommation cumulée FMS |
| 84 | Fuel Level (L) | L | Niveau réservoir |
| 85 | Engine RPM | rpm | Régime moteur |
| 86 | Engine Temperature | °C | Température moteur |
| 87 | Total Mileage (CAN) | km | Kilométrage CAN |
| 89 | Fuel Level (%) | % | Niveau réservoir |
| 100 | Fuel Rate | L/h | Consommation instantanée |
| 101 | AdBlue Level (%) | % | Niveau AdBlue PL |
| 102 | Engine Load | % | Charge moteur |
| 104 | Brake Switch | bool | Détection freinage |
| 105 | Wheel-Based Speed | km/h | Vitesse roue |
| 108 | Direction Indicator | enum | Clignotants L/R |
| 110 | Power Take Off | bool | PTO actif (balayeuse, hydraulique) |
| 114 | Engine Hours | s | Heures moteur — clé MAINTENANCE engins |
| 115 | Service Distance | km | Prochaine maintenance |
| 118 | Driver 1 Working State | enum | Tachy : repos/dispo/conduite/autre |
| 119 | Driver 1 Driving Time | min | Tachy : durée conduite continue |
| 120 | Driver 1 Card | bool | Carte conducteur présente |
| 124 | Driver 1 Continuous Driving Time | min | Tachy R(EC)561/2006 |
| 125 | Driver 1 Cumulative Break Time | min | Tachy : pauses cumulées |
| 126 | Driver 1 Working Time | min | Tachy : travail cumulé |
| 127 | Driver 1 Driving Time Day | min | Tachy : conduite journalière |
| 128 | Driver 1 Driving Time Week | min | Tachy : conduite hebdomadaire |
| 129 | Driver 2 Card | bool | Co-pilote |

### 🚙 OBD-II (VL/VUL — FMC920)

| ID | Nom | Unité | Usage AO |
|---|---|---|---|
| 30 | Number of DTC | count | Diagnostic défauts moteur |
| 31 | Engine Load | % | Charge OBD |
| 32 | Coolant Temperature | °C | Température liquide |
| 36 | Engine RPM | rpm | Régime |
| 37 | Vehicle Speed | km/h | Vitesse OBD |
| 40 | Throttle Position | % | Pédale |
| 41 | Run Time Since Engine Start | s | Durée moteur tournant |
| 42 | Distance Traveled MIL On | km | Diagnostic MIL |
| 48 | Fuel Level (OBD %) | % | Réservoir OBD |
| 49 | Distance Since Codes Cleared | km | Maintenance |

### 🔋 BLE / Bluetooth Sensors (FMC650 + FMC920)

| ID | Nom | Source | Usage AO |
|---|---|---|---|
| 25 | BLE Temperature #1 | Sonde BLE | Frigorifique, transport sensible |
| 26 | BLE Temperature #2 | Sonde BLE | Multi-zones |
| 27 | BLE Temperature #3 | Sonde BLE | — |
| 28 | BLE Temperature #4 | Sonde BLE | — |
| 29 | BLE Battery Voltage | Sonde BLE | Autonomie capteur |
| 264 | Barcode ID | Lecteur BLE | Traçabilité colis/intervention |

### 🪪 iButton / DALLAS 1-Wire (identification conducteur)

| ID | Nom | Usage AO |
|---|---|---|
| 78 | iButton ID | Identification conducteur par clé Dallas — autopartage, attribution course |

---

## 3. Sleep modes (gestion énergie — clé pour engins peu roulants)

| Mode | Conso | Réactivité | Cas d'usage |
|---|---|---|---|
| **No Sleep** | ~120 mA | Immédiate | Tracking continu |
| **GPS Sleep** | ~80 mA | < 5 s | GPS off, réseau on, logs OK |
| **Online Sleep** | ~25 mA | < 10 s | Réseau maintenu, GPS off, périphériques off |
| **Deep Sleep** | ~3 mA | < 30 s | Tout off sauf accéléro — réveil sur mouvement / digital input |
| **Online Deep Sleep** | ~10 mA | < 15 s | Idem Deep + réseau ouvert sur intervalle |
| **Ultra Deep Sleep** | < 100 µA | < 60 s | Veille profonde — utile sur engins stockés/saisonniers |

→ **Argumentaire AO** : *« Le boîtier Teltonika FMC650 protège la batterie des engins peu roulants (balayeuses saisonnières, JCB stockés hiver) via le mode Ultra Deep Sleep (< 100 µA), réveil instantané sur démarrage moteur (entrée numérique 1) ou mouvement (accéléro). »*

---

## 4. Scenarios opérationnels embarqués (clé pour CCTP fonctionnels)

| Scenario | Description | Cas d'usage AO |
|---|---|---|
| **Eco/Green Driving** | Détection accélération brutale, freinage brutal, virage rapide selon seuils paramétrables (g) | Score éco-conduite |
| **Crash Detection** | Détection choc selon seuil g + horodatage. Mode `limited` (accident sévère) ou `full` (tout choc) | Sécurité conducteur |
| **Over Speeding** | Détection survitesse selon seuil ou base de données zones | Bilan sécurité, alerte conducteur |
| **Jamming Detection** | Détection brouilleurs GSM | Anti-vol, alerte temps réel |
| **DOUT Control** | Pilotage sortie relais selon condition (anti-démarrage différé) | Anti-vol post-mise en garde |
| **Excessive Idling** | Détection ralenti prolongé | Réduction conso/CO₂ |
| **Towing Detection** | Détection remorquage non autorisé | Anti-vol VL |
| **Trip Mode** | Délimitation automatique trajets pro/perso (Private/Business) selon bouton ou plages horaires | Restitution fiscale |
| **Geofence Zones** | Jusqu'à 50 zones embarquées, déclenchement entrée/sortie indépendant du réseau | Sites sensibles, ZFE |
| **Auto Geofence** | Génération zone autour position de stationnement + alerte si mouvement | Anti-vol immédiat |
| **Driving Behavior Scoring** | Score 0-100 calculé localement | Coaching conducteur |
| **DOUT Scenarios** | Activation relais sur événements composites (eg : if Speed>0 AND DIN1=0 → DOUT1=ON pour buzzer ceinture) | Coach embarqué cabine |
| **iButton / DALLAS** | Authentification clé conducteur — autorisation démarrage | Autopartage / RH |
| **Bluetooth Auto Pairing** | Détection casque conducteur, sondes T° | Mains-libres, frigorifique |

---

## 5. Adaptateurs CAN — modules complémentaires

| Adapter | Cible véhicules | Source données |
|---|---|---|
| **LV-CAN200** | VL/VUL post-2000 avec CAN — Renault, Peugeot, Citroën, Ford, etc. | Décodage CAN véhicule sans intervention |
| **ALL-CAN300** | Toutes flottes mixtes | Base de données ~3000 véhicules |
| **ManCAN** | Bus Manuel pour véhicules spécifiques | Décodage personnalisé |
| **OBDII Bluetooth Dongle** | VL non-CAN | OBD2 → BT → FMC650/920 |
| **K-Line** | Véhicules anciens K-Line | Diagnostic legacy |

→ **Argumentaire AO** : *« L'usage de l'adaptateur LV-CAN200 permet une remontée native du carburant et du kilométrage CAN sur les VL Peugeot/Renault/Citroën du parc [ACHETEUR], sans intervention sur le faisceau d'origine (préservation garantie constructeur). »*

---

## 6. FOTA Web — Mise à jour à distance

| Capacité | Détail |
|---|---|
| Firmware OTA | Mise à jour firmware via portail Teltonika FOTA Web (HTTPS) |
| Configuration OTA | Push de configuration via fichiers `.cfg` |
| Multi-tenant | Géré par MAC/IMEI, groupes de boîtiers |
| Rollback | Possibilité de retour version antérieure |
| Bandwidth | Patch incrémental — minimisation data |
| Sécurité | Signature firmware + chiffrement TLS |

→ **Argumentaire AO** : *« Aucune intervention physique sur le boîtier durant les 8 ans du marché : Geoloc Systems assume l'intégralité du cycle de vie firmware via la plateforme FOTA Web Teltonika (TLS chiffré, signature numérique des firmwares). »*

---

## 7. Spécifications réseau cellulaire détaillées

| Spec | FMC650 | FMC920 |
|---|---|---|
| Catégorie LTE | Cat 4 (150/50 Mbps) | Cat 1 (10/5 Mbps) |
| Bandes 4G | B1, B3, B7, B8, B20, B28 | B1, B3, B7, B8, B20, B28 |
| Repli | 3G UMTS + 2G GSM | 2G GSM |
| NB-IoT / LTE-M | Variantes disponibles | Variantes disponibles |
| SIM | Slot SIM Mini (2FF) | Slot SIM Mini |
| Protocoles | TCP / UDP / SSL / HTTP / MQTT | TCP / UDP / SSL / HTTP / MQTT |
| Récepteur GNSS | Multi-constellation 33 canaux | Multi-constellation |
| Dead Reckoning | ✅ inertiel intégré | ❌ (FMC920 standard) |

---

## 8. Conformité réglementaire

| Cadre | Statut |
|---|---|
| **R10 (Régl. ONU)** | Compatibilité électromagnétique véhicule |
| **R-118** | Comportement au feu, sécurité véhicule |
| **CE / RoHS / REACH** | Marquages UE obligatoires |
| **RED 2014/53/UE** | Radio Equipment Directive — équipements émetteurs |
| **eCall (R144)** | Compatible (configurable) |
| **RGPD by design** | Pas d'identifiant personnel embarqué — anonymisable côté serveur |
| **R-141** | Système anti-démarrage |
| **AEC-Q100** | Composants électroniques automobiles (niveaux qualifiés) |

---

## 9. Phrases prêtes à coller dans le mémoire (cf. CCTP type)

### Sur la richesse données

> Le FMC650 remonte nativement les **IDs J1939/FMS** (RPM, conso instantanée Fuel Rate ID 100, AdBlue ID 101, PTO ID 110, Heures moteur ID 114, tachygraphe IDs 118-128) — soit l'intégralité de la donnée exigée par le CCTP §X.Y, **sans installation tierce ni adaptateur CAN supplémentaire**.

### Sur la flexibilité conducteur

> L'identification conducteur s'opère via **iButton / clé DALLAS (ID AVL 78)** — déploiement transparent (lecteur DS1990A monté en cabine, sans perçage tableau de bord), avec authentification cryptographique 1-Wire et autorisation de démarrage paramétrable.

### Sur la maîtrise énergétique

> Le **mode Ultra Deep Sleep** (< 100 µA) garantit la préservation de la batterie sur les véhicules peu roulants (balayeuses saisonnières, engins stockés). Réveil instantané sur démarrage moteur (digital input 1) ou détection mouvement (accéléromètre intégré). Aucun véhicule immobilisé suite à boîtier embarqué.

### Sur la mise à jour

> Le portail **FOTA Web Teltonika** permet la mise à jour firmware OTA chiffrée TLS, signée numériquement, sans intervention physique pendant les 8 ans du marché. Geoloc Systems gère le cycle de vie firmware (déploiement, rollback, audit).

### Sur la conformité tachygraphe

> Le FMC650 lit le tachygraphe numérique DDS / Smart Tacho 2 et expose les IDs J1939 **118 à 128** (état conducteur, temps de conduite continu R(EC)561/2006, temps de pause cumulé, temps de travail journalier et hebdomadaire). Les données sont restituées dans SuperFleet sous forme de rapports conformes aux articles 13 à 18 du R(EC)561/2006 et au Décret n°2007-1340.

### Sur le coaching embarqué

> Les **DOUT Scenarios** permettent de configurer des alertes embarquées (buzzer cabine, voyant LED) sur conditions composites — par exemple : *si vitesse > 80 km/h ET ceinture absente → buzzer*. Le coach embarqué fonctionne sans dépendance serveur, déclenchement local immédiat.

---

## 10. Checklist d'utilisation de ce brief

- [ ] Si le CCTP demande des IDs précis (carburant, tachygraphe, PTO, etc.) → reprendre les noms d'IDs J1939/FMS de §2
- [ ] Si le CCTP exige du détail sur la gestion énergétique → §3 Sleep modes
- [ ] Si le CCTP cite des scénarios fonctionnels (eco-driving, anti-démarrage, géofence) → §4 Scenarios
- [ ] Si le CCTP demande la couverture véhicule (constructeurs/modèles) → §5 Adaptateurs CAN
- [ ] Si le CCTP exige une stratégie de maintenance firmware → §6 FOTA Web
- [ ] Si conformité régulière demandée → §8 + citer R10, R-118, RGPD by design
- [ ] Toujours assortir CAN-BUS de *« sous réserve de compatibilité véhicule par véhicule »*
- [ ] Jamais affirmer EOL : FMC640/FMM640/FTC640 sont écartés (cf. hook anti-hallucination)

---

> **Source officielle** : `https://wiki.teltonika-gps.com/` (sections FMC650, FMC920, AVL IDs, Codecs, Sleep modes, Scenarios).
> Capitalisation Geoloc Systems / SuperFleet — pour rédaction AO française.
