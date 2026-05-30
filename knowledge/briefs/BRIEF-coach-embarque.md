# BRIEF — Module Coach embarqué SuperFleet
## Chargement rapide — AO Factory v3.6

> Source de vérité pour rédiger le § « Coach embarqué / outil utilisateur complémentaire » d'un mémoire technique.
> Issu de la capitalisation [ACHETEUR] [RÉF MARCHÉ] (origine : SPL Eau du Bassin Rennais DAF-2025-15, §3.8 OLD_MEMOIRE v3.5).
> À reprendre tel quel ; ajuster uniquement les références BPU (D, S, ou équivalentes) selon le DCE particulier.

---

## 1. Positionnement de l'offre

Le **Module Coach embarqué SuperFleet** répond à l'exigence type « outil embarqué complémentaire utilisateur » fréquemment rencontrée dans les CCTP/CCP de géolocalisation (cf. CCP §5.2 [ACHETEUR], références **BPU D et S** [A_CONFIRMER : libellés exacts selon BPU de [ACHETEUR]]).

Geoloc Systems propose une **alternative équivalente fondée sur l'application mobile chauffeur SuperFleet** (iOS + Android), qui porte la fonction de coach embarqué sans dépendance à un écran propriétaire embarqué :

- Pas de matériel additionnel à installer dans l'habitacle ;
- Pas de coût d'écran dédié ni d'obsolescence matérielle ;
- Expérience moderne sur smartphone (personnel ou attribué) — écran haute résolution, autonomie native, mises à jour OTA via stores.

> **Variante hardware** : un écran propriétaire embarqué reste techniquement envisageable via accessoire Teltonika compatible (FMC650 / FMC920) — à chiffrer en supplément si exigé explicitement. [A_CONFIRMER : référence accessoire selon catalogue Teltonika en vigueur]

---

## 2. Description fonctionnelle — UX cabine

| Composante | Description |
|---|---|
| **Support** | Smartphone du conducteur (BYOD ou attribué) installé en habitacle sur support adapté |
| **Application** | App mobile chauffeur SuperFleet (iOS + Android) — profil « coach mobile » activé |
| **Couplage véhicule** | Identification conducteur via badge MIFACE 13,56 MHz sur boîtier embarqué (FMC650 / FMC920) ; corrélation événements véhicule ↔ session conducteur |
| **Retour temps réel** | Score d'éco-conduite courant (0-100), événements détectés, conseils contextuels |
| **Bilan post-trajet** | Récapitulatif du trajet : score final, événements horodatés, comparaison historique, axes de progrès |
| **Mode vie privée** | Bouton CNIL côté véhicule + mode privée applicatif (TECH-02, délibération CNIL n° 2015-165) |

---

## 3. Évènements détectés (liste exhaustive)

| Évènement | Source de détection | Seuils paramétrables |
|---|---|---|
| Accélération brutale | Accéléromètre intégré boîtier Teltonika | Oui (mg, durée) |
| Freinage brutal | Accéléromètre intégré boîtier Teltonika | Oui (mg, durée) |
| Virage rapide | Accéléromètre + gyroscope | Oui (mg latéral) |
| Survitesse absolue (vs limite GPS) | GPS + base limitations | Oui (km/h, durée tolérée) |
| Survitesse relative (vs limite véhicule) | Paramétrage profil véhicule | Oui (km/h) |
| Ralenti excessif (idling) | Allumage moteur + vitesse 0 | Oui (durée minutes) |
| Conduite sans ceinture | CAN-BUS véhicule (sous réserve de compatibilité véhicule par véhicule) | Oui (durée tolérée) |
| Durée de conduite continue | Cumul session conducteur | Oui (heures) |
| Pause non prise / pause insuffisante | Cumul + détection arrêt | Oui (durée pause min.) |
| Conduite hors créneau autorisé | Horodatage + plages paramétrées | Oui (jour/nuit/week-end) |
| Sortie de géofence métier | Géofences SuperFleet | Oui (par zone) |
| Coupure d'alimentation boîtier (anti-démontage) | Boîtier (SSE-11) | N/A — alerte gestionnaire |
| Mouvement hors usage | Boîtier + planning | Oui (créneau) |

> ⚠️ **CAN-BUS (ceinture, conso instantanée, régime moteur, codes DTC)** : compatible **sous réserve de compatibilité du véhicule avec le protocole CAN-BUS** — vérification véhicule par véhicule obligatoire.

---

## 4. Modalités de feedback conducteur

| Canal | Disponibilité | Détail |
|---|---|---|
| **Visuel temps réel** | ✅ | Score + jauge + pictogramme évènement sur l'écran smartphone |
| **Sonore temps réel** | ✅ | Bip discret paramétrable par typologie d'évènement |
| **Vocal temps réel** | ✅ | Notification vocale TTS optionnelle (intégration IA SuperFleet Agent — nouveauté v3.5) |
| **Vibration (haptic)** | ✅ | Sur smartphones compatibles |
| **Bilan post-trajet (in-app)** | ✅ | Synthèse trajet + tendance 7 / 30 jours |
| **Bilan hebdo / mensuel push** | ✅ | E-mail PDF + notification push (FONC-23) |
| **Mode hors-ligne** | ✅ | Stockage embarqué + retransmission auto (continuité tunnel/sous-sol) |
| **Bilan gestionnaire (RH / chef de service)** | ✅ | Rapports éco-conduite multi-conducteurs côté web SuperFleet (FONC-17) |

---

## 5. Intégration au score éco-conduite SuperFleet

Le coach embarqué **n'est pas un module isolé** : il alimente et restitue le **score éco-conduite SuperFleet** unique et partagé entre :

- L'app mobile conducteur (vue individuelle) ;
- L'interface web gestionnaire (vue flotte + classement + analyse) ;
- Les rapports programmés PDF/Excel (FONC-23) ;
- L'IA SuperFleet Agent (interrogation en langage naturel — nouveauté 2026).

| Caractéristique | Valeur |
|---|---|
| Échelle de score | 0-100 (paramétrable) |
| Critères ajustables | Oui — par typologie de véhicule (VL, VUL, PL, engin, balayeuse) |
| Pondération évènements | Configurable côté Admin SuperFleet |
| Historisation | 12 mois en interface (archivage paramétrable) |
| Comparaison flotte / pair / soi-même | Oui |
| Export | Excel (.xlsx), PDF, CSV, API JSON `/drivers/{id}/score` |

---

## 6. Chiffrage BPU — alignement DCE

| Référence BPU type | Objet | Périmètre |
|---|---|---|
| **Ref S** (installation) | Paramétrage du profil « coach mobile », onboarding utilisateur, support à l'usage | Par véhicule / conducteur équipé |
| **Ref D** (abonnement) | Licence coach dédiée pour les conducteurs concernés | Par conducteur / mois |

> [A_CONFIRMER : libellés et unités exactes des refs D et S selon BPU [ACHETEUR] — la nomenclature D/S est issue du DCE SPL EBR DAF-2025-15. Vérifier au DCE en cours et adapter.]
> Volumétrie indicative SPL EBR : **10 véhicules** équipés du profil coach (cf. DQE indicative §3.8 OLD_MEMOIRE).

---

## 7. Bénéfices mesurés

| Bénéfice | Ordre de grandeur | Statut |
|---|---|---|
| Réduction consommation carburant | **-10 à -15 %** sur flottes accompagnées | [A_CONFIRMER : source — bibliographie sectorielle ADEME / FNTR / retour client Geoloc Systems] |
| Réduction sinistralité / accidentologie | **-25 %** sur flottes avec coaching actif | [A_CONFIRMER : source — bibliographie assureurs flotte / retour client Geoloc Systems] |
| Réduction émissions CO₂ | Proportionnelle à la baisse de consommation | Corrélation directe |
| Réduction usure mécanique (freins, pneus) | Significative | Qualitatif — à éviter de chiffrer sans source |
| Engagement conducteur / RSE | Qualitatif | Mesurable via score moyen flotte |

> ⚠️ **Règle d'or** : si les chiffres -10/-15 % et -25 % ne sont pas sourcés dans le DCE ou dans un livrable Geoloc Systems validé, les présenter comme **fourchettes observées sur le marché** et non comme un engagement contractuel.

---

## 8. Compatibilité matérielle

| Élément | Compatibilité |
|---|---|
| **Boîtier PL / engins / balayeuses** | Teltonika **FMC650** ✅ |
| **Boîtier VL / VUL** | Teltonika **FMC920** ✅ |
| Lecteur MIFARE 13,56 MHz embarqué | ✅ (ISO-14443A Classic 1K/4K, DESFire EV1/EV2) |
| Bouton CNIL (mode vie privée) | ✅ |
| Faisceau CAN J1939 / FMS / OBD2 | ✅ (sous réserve de compatibilité véhicule par véhicule) |
| Smartphone conducteur | iOS 14+ / Android 9+ |
| Support smartphone habitacle | À la charge de l'exploitant (préconisations fournies) |
| Écran propriétaire embarqué (variante hardware) | Possible en supplément — [A_CONFIRMER : référence accessoire Teltonika] |

> ❌ **JAMAIS** proposer FMC640 / FMM640 / FTC640 (EOL). Uniquement FMC650 (PL/engins) et FMC920 (VL/VUL).

---

## 9. Points de vigilance

- **Refs BPU D et S** : vérifier systématiquement la nomenclature au DCE en cours. La numérotation D/S provient du marché SPL EBR DAF-2025-15 et n'est pas universelle.
- **CAN-BUS (ceinture, conso, DTC)** : toujours assortir de la mention « sous réserve de compatibilité du véhicule avec le protocole CAN-BUS ».
- **Chiffres -10/-15 % conso et -25 % accidentologie** : ne pas présenter comme engagement contractuel sans source explicite — utiliser une formulation « fourchette observée sur le marché ».
- **BYOD vs téléphone attribué** : préciser la politique de l'acheteur ([ACHETEUR]) si elle figure au CCTP — l'app SuperFleet supporte les deux.
- **Mode vie privée (CNIL)** : rappeler la conformité délibération CNIL n° 2015-165 et l'existence du bouton CNIL côté véhicule.
- **PWA mobile** : l'app conducteur SuperFleet est disponible en PWA + apps store ; nuancer si le CCTP exige strictement du natif.
- **Pas de FleetWatcher** : la marque produit est **SuperFleet** uniquement.

---

## 10. Captures d'écran réutilisables

| Capture | Fichier | Modules illustrés |
|---|---|---|
| Application mobile (3 écrans) | `07_Application_mobile.png` | App mobile, éco-conduite, alertes |
| IA Agent mobile | `12_IA_Agent_mobile.png` | Restitution score + conseils en langage naturel |

> À adapter au contexte client ([ACHETEUR], véhicules réels) via `ao-annexes-factory`.

---

## 11. Trame § mémoire prête à coller

> *À paramétrer : remplacer [ACHETEUR], [RÉF MARCHÉ], [REF BPU D], [REF BPU S], [N VÉHICULES] avant export.*

**Module coach embarqué — alternative app mobile**

L'exigence CCP §[X.Y] mentionne un « outil embarqué complémentaire utilisateur » (références BPU **[REF BPU D] et [REF BPU S]**). Geoloc Systems propose une alternative équivalente fondée sur l'**application mobile chauffeur SuperFleet**, intégrant la fonctionnalité de coach embarqué :

- **Retour visuel et sonore temps réel** : score d'éco-conduite, événements détectés (freinage brutal, accélération brutale, virage rapide, survitesse, ralenti excessif, ceinture sous réserve de compatibilité CAN-BUS), conseils contextuels affichés sur le smartphone du conducteur installé en habitacle ;
- **Bilan post-trajet** : récapitulatif horodaté, comparaison historique, axes de progrès ;
- **Pas de dépendance à un écran propriétaire** : l'expérience est portée par le smartphone (durabilité, écran moderne, autonomie, mises à jour OTA) ;
- **Intégration native au score éco-conduite SuperFleet** : un score unique partagé entre app conducteur, web gestionnaire, rapports programmés et IA SuperFleet Agent ;
- **Installation au tarif [REF BPU S]** : paramétrage du profil « coach mobile », onboarding utilisateur, support à l'usage ;
- **Abonnement coach [REF BPU D]** : licence dédiée pour les conducteurs concernés ([N VÉHICULES] véhicules selon volumétrie indicative).

**Bénéfices pour [ACHETEUR]** : pas de matériel additionnel à installer, pas de coût d'écran dédié, expérience moderne sur device personnel ou attribué, baisse observée de la consommation (fourchette marché -10 à -15 %) et de la sinistralité (fourchette marché -25 %), conformité CNIL by design (mode vie privée + délibération n° 2015-165).

---

## Sources

- `01_Geoloc-Systems/Appels-Offres/En-cours/SPL_Eau_Bassin_Rennais_DAF-2025-15/_TEST-v3.5/00_DCE_extrait/OLD_MEMOIRE.txt` §3.8 (lignes 312-318)
- `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` (module 5 Éco-conduite + app mobile)
- `knowledge/references/boitiers-teltonika-detail.md` [A_CONFIRMER : présence du brief boîtiers]
- DCE SPL EBR DAF-2025-15 — CCP §5.2 et BPU (refs D et S)
