# BOÎTIERS TELTONIKA — Référence technique détaillée
## AO Factory v3.5 — Spécifications complètes pour mémoires AO

> Source : capitalisation AO Garges-lès-Gonesse 26.065 (annexe Boîtier Teltonika produite mai 2026).
> Fabricant : Teltonika Telematics UAB — Saltoniškių g. 9B-1, 08105 Vilnius, **Lituanie (Union européenne)**.

---

## 1. Gamme proposée par Geoloc Systems

| Modèle | Périmètre d'usage | Typologies de véhicules |
|---|---|---|
| **Teltonika FMC650** | Véhicules lourds, engins, équipements professionnels avec CAN-BUS J1939 / FMS et tachygraphe numérique | Balayeuses Schmidt, poids lourds DAF/MAN, cars Mercedes, JCB, Wacker-Neuson, Kubota, Toro Groundmaster |
| **Teltonika FMC920** | Véhicules légers, utilitaires, deux-roues — OBD2 + connecteur constructeur | Renault Zoe/Twingo ZE/Kangoo ZE, Dacia Spring, Goupil G4/G6, Ligier Pulse 4, Peugeot E208, Citroën E-C3, Master/Trafic/Transit, motos Yamaha |

> Le choix par typologie permet une **adéquation coût/fonctionnalités optimale** tout en garantissant la compatibilité ascendante sur la durée du marché.

## 2. Fiche technique — Teltonika FMC650

| Caractéristique | Spécification |
|---|---|
| Fabricant | Teltonika Telematics UAB (Lituanie, Union européenne) |
| Connectivité cellulaire | 4G LTE Cat 4 (jusqu'à 150 Mbps / 50 Mbps) avec repli 3G UMTS / 2G GSM |
| Bandes 4G | Bandes européennes B1, B3, B7, B8, B20, B28 — couverture France et UE |
| GNSS | GPS, GLONASS, Galileo, BeiDou — précision typique < 3 m, TTFF < 30 s |
| Antennes | GNSS et cellulaire internes haute sensibilité |
| **Dead Reckoning** | Capteur inertiel intégré — positionnement maintenu en perte GPS (tunnels, parkings souterrains) |
| Bluetooth | Bluetooth 4.0 LE pour accessoires (lecteur badge, sonde température, etc.) |
| Mémoire interne | 128 Mo (~47 000 enregistrements stockés en cas de perte réseau) |
| Stockage embarqué | Local + retransmission automatique au retour réseau (conforme CCTP type) |
| Tension d'alimentation | 10 à 30 VDC — compatible 12 V (VL, motos) et 24 V (PL, cars, engins) |
| Consommation | < 50 mA en veille — impact négligeable sur batterie engins peu roulants |
| **Indice de protection** | **IP67** — étanchéité totale poussière et immersion, idéal balayeuses et engins extérieurs |
| Plage de température | −40 °C à +85 °C |
| Dimensions et poids | Env. 79 × 79 × 27 mm — 91 g |
| Entrées / Sorties | Entrées numériques (PTO, contact, bouton CNIL), sorties relais (anti-démarrage), entrée analogique (FuelLevel) |
| Interfaces véhicule | **CAN-BUS J1939** (PL, balayeuses), **bus FMS** (cars), interface tachygraphe DDS / Smart Tacho 2 |
| Protocoles | Codec 8 Extended (Teltonika), MQTT, TCP/UDP — réception SuperFleet < 1 sec |
| Mise à jour firmware | Over-The-Air (OTA), sans intervention sur site |
| Conformité | Marquage CE, directives RoHS et REACH, R-118 (sécurité véhicule), GDPR by design |
| Garantie | 2 ans (à charge intégrale Geoloc Systems — la Ville n'a aucun coût matériel) |

## 3. Fiche technique — Teltonika FMC920

| Caractéristique | Spécification |
|---|---|
| Fabricant | Teltonika Telematics UAB (Lituanie, Union européenne) |
| Connectivité cellulaire | 4G LTE Cat 1 avec repli 2G — adapté aux usages VL / VUL |
| GNSS | GPS, GLONASS, Galileo — précision typique < 3 m |
| Antennes | GNSS et cellulaire internes |
| Bluetooth | Bluetooth 4.0 LE |
| Mémoire interne | Stockage embarqué + retransmission auto au retour réseau |
| Tension d'alimentation | 10 à 30 VDC |
| Consommation | < 30 mA en veille |
| Indice de protection | IP41 (boîtier intérieur véhicule, sous tableau de bord) |
| Plage de température | −20 °C à +70 °C |
| Dimensions | Boîtier compact ~71 × 53 × 20 mm — env. 50 g |
| Entrées / Sorties | Entrées numériques (contact, bouton CNIL), sortie relais (anti-démarrage), entrée OBD2 |
| Interfaces véhicule | Connecteur OBD2 ou raccordement direct sur le faisceau constructeur |
| Protocoles | Codec 8 Extended, MQTT, TCP/UDP |
| Mise à jour firmware | OTA |
| Conformité | Marquage CE, RoHS, REACH |
| Garantie | 2 ans (à charge intégrale Geoloc Systems) |

## 4. Accessoires embarqués (raccordés aux boîtiers)

### Lecteur de badges MIFARE (embarqué)
- **Modèle** : Lecteur RFID 13,56 MHz compatible MIFARE Classic 1K / 4K, DESFire EV1 / EV2
- **Compatibilité badges Ville** : à valider à la notification (fréquence + format UID)
- **Communication boîtier** : filaire (RS232 ou 1-Wire) — pas d'interférence radio
- **Position d'installation** : en habitacle, visible et accessible au conducteur
- **Indicateurs** : LED multicolore (verte = identifié, rouge = refusé) + buzzer discret
- **Alimentation** : délivrée par le boîtier
- **Indice de protection** : IP54 (habitacle)

### Bouton CNIL (interrupteur vie privée)
- **Fonction** : désactivation temporaire de la remontée géolocalisation pour usages hors mission, conforme délibération CNIL n° 2015-165 du 4 juin 2015
- **Type** : interrupteur ON/OFF discret, sans verrou, raccordé à une entrée numérique du boîtier
- **Position d'installation** : « très discrète » non accessible facilement par le conducteur (sous tableau de bord, derrière une trappe, en accord avec le Parc Auto)
- **Journalisation** : tous les passages ON/OFF horodatés et accessibles dans SuperFleet (audit RGPD)
- **Conformité** : délibération CNIL n° 2015-165, articles L.1121-1 et L.1222-4 du Code du travail

### Faisceaux et adaptateurs

| Type | Usage | Véhicules concernés |
|---|---|---|
| Faisceau CAN J1939 | Lecture CAN-BUS PL et balayeuses | Schmidt Cleango/Swingo, DAF, MAN, JCB |
| Faisceau bus FMS | Lecture tachygraphe numérique cars | Mercedes MB E 17 UE 59 places |
| Faisceau OBD2 | Lecture standardisée VL/VUL | Renault, Peugeot, Citroën, Dacia, Ford, Toyota, Nissan |
| Adaptateur Goupil / Ligier | Connexion directe faisceau constructeur | Goupil G4/G6, Ligier Pulse 4, Piaggio NP6 |
| Câble PTO | Détection mode balayage actif (prise de force) | Balayeuses Schmidt |
| Relais anti-démarrage | Coupure démarreur sans badge MIFARE | Tous véhicules avec lecteur MIFARE |

## 5. Lecteur RFID administratif — SYRIS RD200 USB

> Dispositif **complémentaire** aux lecteurs embarqués, destiné à l'**administration des badges agents** côté collectivité (CTM, Hôtel de Ville).

| Caractéristique | Spécification |
|---|---|
| Modèle | SYRIS RD200-MI |
| Fabricant | SYRIS Technology Corp. (Taïwan) |
| Distributeur français | AESPRINT — Rosny-sous-Bois (93) |
| Type | Lecteur RFID de paillasse |
| Fréquence | 13,56 MHz |
| Norme | ISO-14443A |
| Technologies | MIFARE Classic 1Ko/4Ko, MIFARE Ultralight, NFC NTAG 203 |
| Antenne | Antenne interne |
| Indicateurs | LED rouge + LED verte + haut-parleur (buzzer paramétrable) |
| Connexion | USB (câble fourni) |
| Mode | Émulation Clavier USB (HID) ou émulation RS232 |
| Format UID | Décimal ou hexadécimal — paramétrable |
| Dimensions | 105 × 72 × 16 mm |
| Alimentation | Port USB (pas de bloc secteur) |
| Conformité | Marquage CE, RoHS, REACH |
| Prix indicatif fournisseur | 89,00 € HT (réf. 2026, avenuedelacarte.fr) |
| Source produit | https://www.avenuedelacarte.fr/915-lecteur-mifare-rd200-usb.html |

### Usages administratifs du RD200

1. **Enregistrement initial des badges agents** dans SuperFleet — création massive de comptes conducteurs
2. **Création d'un nouveau conducteur** en cours de marché — saisie automatique de l'UID
3. **Test d'un badge** avant remise au conducteur — diagnostic rapide
4. **Recherche d'un conducteur** à partir d'un badge non identifié — UID → fiche conducteur

### Engagement Geoloc Systems

- Lecteur fourni **sans surcoût** dans le cadre du marché
- Installation et paramétrage initial inclus
- Garantie constructeur 2 ans (à charge Geoloc)
- Lecteur de remplacement disponible en stock tampon Île-de-France
- Récupération en fin de marché — pas de coût de désinstallation

## 6. Stock tampon Geoloc — Île-de-France

| Composant | Quantité stock tampon | Justification |
|---|---|---|
| Boîtiers Teltonika FMC650 | ≥ 5 unités (typique) | ≥ 10 % du parc PL/engins/balayeuses |
| Boîtiers Teltonika FMC920 | ≥ 10 unités (typique) | ≥ 10 % du parc VL/VUL |
| Lecteurs MIFARE embarqués | ≥ 15 unités | ≥ 10 % de l'ensemble |
| Boutons CNIL | ≥ 15 unités | ≥ 10 % de l'ensemble |
| Faisceaux CAN J1939 / FMS / OBD2 | Lot complet | Couverture toutes typologies |
| Cartes SIM (SFR M2M, Orange M2M) | ≥ 20 unités | Multi-opérateurs pour redondance |
| Lecteur RD200 USB | 1-2 unités | Remplacement administratif |

> Stock physiquement localisé au siège Colombes — délai de livraison sur site Ville < 60 min en IDF.

## 7. Mises à jour de cette version v3.5

- ✅ Nouveau fichier dédié aux boîtiers (avant : mention disparate dans `teltonika-product-capabilities-ao.md`)
- ✅ Fiches techniques **complètes** FMC650 et FMC920
- ✅ Section **accessoires embarqués** (MIFARE, bouton CNIL, faisceaux)
- ✅ Section **Lecteur RD200 USB administratif** (avant : non documenté)
- ✅ Tableau **stock tampon IDF**
- ✅ Sources et liens fournisseurs documentés
