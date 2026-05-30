# Claims interdits — No-Invention Guard
## Version v3.5 — capitalisation Garges + Résidences 78

## Mots interdits absolus

```
FleetWatcher                → REMPLACER par "SuperFleet" sans exception
Montélimar-Agglomération    → Nom de précédent AO (modèle Résidences 78), NE PAS reprendre dans un nouveau AO
Coumba MBENGUE              → REMPLACÉE par Chaima GACI (Resp. Support & Qualité)
```

## Certifications non détenues par Geoloc Systems directement

```
ISO 27001     → Geoloc n'est PAS certifié ISO 27001 (AWS, OVH et Flespi le sont)
SOC 2         → Geoloc n'est PAS certifié SOC 2 (AWS l'est)
HDS           → Geoloc n'est PAS certifié HDS (OVH l'est)
ISO 9001      → Geoloc n'est PAS certifié ISO 9001
NF            → Aucune norme NF mentionnable sans source
ANSSI         → Aucune qualification ANSSI mentionnable sans source
```

⚠️ Ces certifications appartiennent aux HÉBERGEURS — toujours préciser :
- "hébergé sur **AWS Frankfurt** (ISO 27001, SOC 2 Type II)" pour la plateforme applicative
- "hébergé sur **OVH Gravelines** (ISO 27001, HDS)" pour le stockage et la redondance
- "**Flespi Vilnius** (ISO 27001)" pour la réception des trames boîtiers
- Ne JAMAIS mentionner "Azure" — Geoloc n'utilise pas Microsoft Azure

## Références clients non autorisées

Seules ces 4 références sont documentées et utilisables :
1. **ENEDIS** — distributeur d'électricité, forte présence Île-de-France
2. **ADANEV** — 1 500 véhicules supervisés en continu, transport PMR
3. **Transalys Service** — opérateur de transport et services
4. **Commune de Martigues** — collectivité territoriale

Toute autre référence (client, partenaire, collectivité) = BLOQUANT sauf si ajoutée à `profil-geoloc-systems.md` après validation écrite de Said KHAYAT.

## Équipe officielle — noms autorisés

Seuls ces noms sont autorisés pour mention dans un mémoire ou une annexe AO :

| Nom | Rôle officiel | Statut |
|---|---|---|
| **Said KHAYAT** | Co-fondateur et Directeur Projet | ✅ Autorisé |
| **Mustapha KHEROUA** | Chef de projet / Référent logiciel SuperFleet | ✅ Autorisé |
| **Clément NOEL** | Responsable technique terrain | ✅ Autorisé |
| **Walid KHEROUA** | Technicien installation | ✅ Autorisé |
| **Samia MAKHLOUF** | Responsable formation | ✅ Autorisé (v3.5) |
| **Smaël KESSOURI** | Représentant Légal / Directeur Général | ✅ Autorisé (v3.5) |
| **Chaima GACI** | Responsable Support & Qualité | ✅ Autorisé (v3.5, remplace Coumba MBENGUE) |

> Toute autre personne mentionnée = BLOQUANT.

## Expériences chiffrées autorisées

Seules ces expériences chiffrées peuvent être mentionnées pour l'équipe :

| Personne | Expérience autorisée |
|---|---|
| Said KHAYAT | **22 ans d'expérience** (Co-fondateur) |
| Mustapha KHEROUA | **Ing. Efrei, 10+ ans dev. SuperFleet** |
| Clément NOEL | **10+ ans, Hab. B2VL/BR** |
| Walid KHEROUA | **10+ ans, Hab. B2VL/BR** |
| Samia MAKHLOUF | **13 ans d'expérience formation** |
| Smaël KESSOURI | Pas d'expérience chiffrée publique |
| Chaima GACI | Pas d'expérience chiffrée publique |

## Chiffres jamais à inventer

- Chiffre d'affaires → uniquement CA 2021/2022/2023 listés dans le profil
  - CA 2021 : 1 041 378 €
  - CA 2022 : 1 038 515 €
  - CA 2023 : 1 006 398 €
- Nombre de clients → non mentionnable
- Taux de satisfaction → non mentionnable
- Note obtenue sur AO précédents → non mentionnable sauf preuve
- Part de marché → non mentionnable

## Chiffres autorisés Geoloc Systems

| Chiffre | Valeur autorisée |
|---|---|
| Années d'expérience | **+ 22 ans** |
| Véhicules supervisés en France | **+ 10 000** |
| Effectif | **10 collaborateurs** |
| Fourchette flottes gérées | **10 à 1 500 véhicules** (ex. ADANEV) |
| Adresse siège | **14 rue de Mantes, 92700 Colombes** |
| SIRET | **450 808 878 00026** |

## Cadences opérationnelles autorisées (engageables dans les mémoires)

| Cadence | Valeur engageable |
|---|---|
| Équipe IDF nominale | **≈ 10 véhicules/jour** (2 tech.) |
| Avec renforts mobilisables | **Jusqu'à 20 véhicules/jour** |
| Pic exceptionnel | 25 véh/jour (sous-traitance encadrée) |
| Durée pose VL standard | **30 à 45 minutes** |
| Durée pose PL / car FMS | **60 à 90 minutes** |

> ⚠️ NE JAMAIS surenchérir au-delà de 20 véh/jour engagé sans validation Said KHAYAT.

## SLA et engagements de service autorisés

| Engagement | Valeur autorisée |
|---|---|
| SLA disponibilité plateforme | **99,9 %** annuel |
| Support P1 critique | Intervention < 1h, résolution < 4h |
| RPO | < 1 h |
| RTO | < 4 h |
| Astreinte | 7j/7 |
| Hébergement | **100 % UE** (AWS Frankfurt + OVH Gravelines + Flespi Vilnius) |

## Modules SuperFleet autorisés (v3.5)

Tous les modules listés dans `BRIEF-superfleet-fonctionnel.md` v3.5 sont autorisés. En particulier les **nouveautés v3.5** :
- **Module Carto-Balayage** (propreté urbaine)
- **Module ANTAI** (désignation auto conducteur)
- **Module Carburant** (rapprochement pétrolier 3j vs 5j CCTP)
- **Module Tachygraphe** (FMS + CAN J1939 + Smart Tacho 2)
- **Module Transition énergétique** (pilotage flotte EV)
- **IA SuperFleet Agent** (Chat + Voix + Data) — nouveauté 2026

## Fonctionnalités à vérifier systématiquement

Ces fonctionnalités sont souvent demandées — vérifier qu'elles sont dans le catalogue avant de les promettre :
- Autopartage (réservation véhicule partagé) — DISPONIBLE (module dédié)
- Armoires à clés électroniques — DISPONIBLE pour autopartage uniquement
- Alertes ANTAI — **DISPONIBLE NATIF** (module v3.5)
- Application mobile iOS/Android — DISPONIBLE (PWA, pas store natif)
- API REST/JSON — DISPONIBLE
- Lecture RFID MIFARE — DISPONIBLE (lecteur embarqué + RD200 administratif)
- IA SuperFleet Agent (Chat + Voix) — **DISPONIBLE NATIF v3.5**
- Reconnaissance faciale — NON DISPONIBLE (ne pas mentionner)
- Détection conducteur par biométrie — NON DISPONIBLE

## Boîtiers Teltonika autorisés

Seuls ces 2 modèles sont actuellement référencés et autorisés :
- **Teltonika FMC650** : PL, engins, balayeuses, cars (CAN J1939/FMS + tachy)
- **Teltonika FMC920** : VL, VUL, deux-roues (OBD2 + constructeur)

Lecteur administratif autorisé :
- **SYRIS RD200 USB** : enregistrement des badges MIFARE côté Hôtel de Ville/Parc Auto

Ne JAMAIS mentionner d'autres modèles (FTC640, FMM640, etc.) sans validation.

## Pénalités CCAP types à connaître (Garges 26.065)

- 50 €/véh/jour : retard pose ou dépose
- 100 €/jour : retard remise en état matériel défaillant
- 50 €/heure : retard création identifiants ou indisponibilité interface
- **200 €/heure** : indisponibilité ligne SAV ou paramétrage spécifique balayeuses
- 50 €/jour : retard transmission rapports auto balayeuses

> Dans le mémoire, toujours engager des délais Geoloc < délais max CCAP pour chiffrer la "pénalité évitée".
