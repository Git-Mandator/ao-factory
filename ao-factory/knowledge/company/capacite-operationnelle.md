# CAPACITÉ OPÉRATIONNELLE TERRAIN — Geoloc Systems
## AO Factory v3.5 — chiffres engagés dans les AO

> Source : capitalisation Garges-lès-Gonesse 26.065 et Résidences Yvelines 25-60.
> Ce fichier liste les chiffres opérationnels engagés dans les mémoires techniques.

---

## 1. Équipe terrain Île-de-France (base d'engagement)

| Composante | Valeur |
|---|---|
| Techniciens IDF dédiés | **2** : Clément NOEL + Walid KHEROUA |
| Habilitations | B2VL et BR (véhicules électriques) |
| Base territoriale | Siège Colombes (14 rue de Mantes, 92700) |
| Distance moyenne intervention IDF | ≤ 30 minutes (A86/A1) |

## 2. Cadences de pose engagées

### Capacité nominale (équipe IDF seule)

| Période | Cadence engagée |
|---|---|
| Quotidienne | **≈ 10 véhicules/jour** |
| Hebdomadaire (5 j) | **≈ 50 véhicules/semaine** |
| Mensuelle (20 j) | ≈ 200 véhicules/mois |

### Capacité avec dispositif de renforts

| Période | Cadence engagée |
|---|---|
| Quotidienne max | **Jusqu'à 20 véhicules/jour** |
| Hebdomadaire max | ≈ 100 véhicules/semaine |

### Capacité pic (renforts + sous-traitance encadrée)

| Période | Cadence engagée |
|---|---|
| Quotidienne pic | 25 véhicules/jour |

> ⚠️ Ces chiffres sont les **chiffres officiels Geoloc Systems pour 2026**. NE PAS surenchérir au-delà sans validation de Said KHAYAT.

## 3. Durée d'installation par typologie de véhicule

| Typologie de véhicule | Durée pose (min) | Spécificité technique |
|---|---|---|
| VL standard (Citroën C3, Peugeot 208, Renault Clio, Toyota Aygo…) | 30 à 45 min | OBD2 + alimentation |
| VL/VUL électriques (Zoe, Twingo ZE, Kangoo ZE, Dacia Spring, E208, E-C3) | 45 min | OBD2 + Constructeur + isolation HT |
| VUL thermiques (Master, Trafic, Transit, Boxer, Nissan NV200/NV400) | 45 min | OBD2 + alimentation permanente |
| Goupil G4/G6, Ligier Pulse 4, Piaggio NP6 | 30 à 45 min | Alim. 12V directe |
| PL DAF / MAN (avec tachygraphe) | 60 à 90 min | CAN J1939 + Smart Tacho 2 |
| Car Mercedes 59 places (FMS) | 60 à 90 min | Bus FMS + tachygraphe numérique |
| Balayeuse Schmidt (Cleango / Swingo) | 60 min | CAN J1939 + capteur PTO |
| Engins (Kubota, JCB, Wacker-Neuson, Toro Groundmaster) | 30 min | Alim. 12V + horomètre |
| Motos Yamaha Tracer 09 (PM) | 30 min | Alim. 12V + boîtier IP67 |

## 4. Calcul théorique de capacité

**Formule** : capacité = (nb techniciens × heures journée utiles) ÷ durée moyenne par véhicule

- **Hypothèse standard** (utilisée dans les mémoires) :
  - 2 techniciens IDF
  - 7 heures effectives par jour (hors trajets, pauses, déjeuner, accueil sur site)
  - 1 heure par véhicule (45 min pose + 15 min tampon : préparation, PV)
  - **= 2 × 7 ÷ 1 = 14 véh/jour théorique**
  - **Capacité prudente engagée : 10 véh/jour**

- **Hypothèse renforts** :
  - 4-5 techniciens (équipe nationale ou partenaires)
  - Même méthode → 28-35 véh/jour théorique
  - **Capacité prudente engagée : 20 véh/jour**

## 5. Plan de déploiement type pour 100-150 véhicules

| Semaine | Volume cumulé | Périmètre traité | Notes |
|---|---|---|---|
| S1 | 8-10 véh. | Engins prioritaires (balayeuses, PL, cars) | Paramétrage spécifique CAN/FMS |
| S2 | + 30 véh. | VL pool mairie + VL électriques | Cadence soutenue |
| S3 | + 30 véh. | VUL (Master, Trafic, Transit) | Cadence soutenue |
| S4 | + 30 véh. | Goupil, Ligier, Piaggio, engins | Cadence soutenue |
| S5 | + 25 véh. | Reste flotte (motos, deux-roues) | Pic + formation |
| S6 | 100 % flotte | Recette finale, VSR, formation conducteurs | Recette contradictoire |

**Total : ~130 véhicules en 6 semaines** = cadence moyenne ~5 véh/jour ouvré (compatible avec capacité nominale 10 véh/jour qui inclut les imprévus).

## 6. Stock tampon et logistique

| Élément | Valeur |
|---|---|
| Localisation stock tampon | Siège Colombes (14 rue de Mantes 92700) |
| Distance siège ↔ chantier IDF (moyenne) | 30 minutes (A86/A1) |
| Dimensionnement stock tampon | ≥ 10 % de la flotte équipée |
| Délai livraison sur site Ville | < 60 minutes après signalement |
| Délai approvisionnement Teltonika (Vilnius) | Livraison hebdomadaire programmée |
| Remplacement boîtier défaillant sur site | < 24 h (vs 2 j max CCAP standard) |
| Taux de reconditionnement matériel retiré | ≥ 70 % |

## 7. Gestion des aléas

| Type d'aléa | Action Geoloc | Impact planning |
|---|---|---|
| Véhicule non disponible à l'heure prévue | Reprogrammation immédiate avec Parc Auto | Pas de pénalité Ville |
| Défaut matériel à l'installation | Stock tampon mobilisé, intervention le jour même | Pas de retard |
| Difficulté technique inattendue (CAN spécifique) | Escalade pôle ingénierie Mustapha KHEROUA, retour < 24 h | Ajustement planning |
| Commande > 30 véh. lourde | Mobilisation renforts sous 48h | Cadence max 20 véh/jour |

## 8. Engagements à pénalité — délais Geoloc (vs CCAP standard)

| Prestation | Délai max CCAP type | **Délai Geoloc engagé** | Pénalité évitée |
|---|---|---|---|
| Pose 1 véhicule | 2 j ouvrés | **1 j ouvré (-50 %)** | 50 €/véh/j |
| Pose 2-10 véh. | 2 j ouvrés | 2 j ouvrés (= CCAP) | 50 €/véh/j |
| Pose 11-50 véh. (intervention) | 2 j ouvrés | 2 j ouvrés (= CCAP) | 50 €/véh/j |
| Pose 51-100 véh. (intervention + renforts) | 3 j ouvrés | 3 j ouvrés (= CCAP) | 50 €/véh/j |
| Remise en état matériel défaillant | 2 j ouvrés | **1 j ouvré** | 100 €/jour |
| Création identifiants utilisateurs | 24 h | **2 heures** | 50 €/heure |
| Indisponibilité interface WEB/mobile | 24 h | **< 2 heures** | 50 €/heure |
| Plateforme téléphonique injoignable | 2 heures | **< 1 heure** | **200 €/heure** |
| Paramétrages spécifiques balayeuses début | 30 jours | **15 jours** | **200 €/heure** |
| Transmission rapports auto balayeuses | 1 jour | **J+1 garanti** | 50 €/jour |

---

## Sources et précédents

- AO 26.065 Garges-lès-Gonesse — annexe délais lot 1 (mai 2026)
- AO 25-60 Résidences Yvelines — engagement 4 semaines (sans découpage volume)
- Référence ADANEV — 1 500 véhicules supervisés en continu (preuve capacité)
