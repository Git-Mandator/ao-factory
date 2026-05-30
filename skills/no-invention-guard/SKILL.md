---
name: no-invention-guard
version: "1.0.0"
domain: AO_FACTORY
language: fr
description: >
  Ce skill doit être utilisé pour détecter les claims non sourcés, hallucinations et affirmations
  inventées dans les documents AO de Geoloc Systems. Déclencher pour "vérifier qu'on n'a rien
  inventé", "contrôler les affirmations du mémoire", "QA anti-hallucination", "vérifier les
  chiffres du mémoire", "détecter les fonctionnalités inventées", ou en Phase 7 QA finale.
---

# Skill : No-Invention Guard — Anti-Hallucination AO

Détecte et signale tout claim non sourcé dans les documents de réponse AO Geoloc Systems.

## Principe

Toute affirmation dans un document AO doit être traçable à une source documentaire précise.
Un claim non traçable = BLOQUANT. Mieux vaut `A_CONFIRMER` qu'une invention.

## Sources de vérité autorisées

| Source | Contenu autorisé |
|--------|-----------------|
| `knowledge/briefs/BRIEF-profil-geoloc.md` | CA, effectifs, références clients, délais, SLA terrain |
| `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` | Toutes les fonctionnalités SuperFleet |
| `knowledge/briefs/BRIEF-securite-rgpd.md` | Sécurité, RGPD, SLA SaaS, certifications hébergeurs |
| `knowledge/references/boitiers-teltonika-detail.md` | Boîtiers GPS, protocoles, caractéristiques hardware |
| `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` | Blocs validés réutilisables |

## Catégories de claims à vérifier

### 1. Chiffres entreprise (source : profil-geoloc-systems.md)

| Chiffre | Valeur autorisée | Source |
|---------|-----------------|--------|
| Années d'expérience | +22 ans | Profil §2 |
| Véhicules gérés | +10 000 actifs en France | Profil §2 |
| Fourchette flotte | 10 à 1 500 véhicules | Profil §2 |
| Effectifs | 10 employés | Profil §2 |
| CA 2021 | 1 041 378 € | Profil §2 |
| CA 2022 | 1 038 515 € | Profil §2 |
| CA 2023 | 1 006 398 € | Profil §2 |

### 2. Références clients (uniquement ces 4)

- **ENEDIS** — Énergie / Services publics
- **ADANEV** — Transport PMR — 1 500 véhicules
- **Transalys Service** — Transport / Services
- **Commune de Martigues** — Collectivité territoriale

⚠️ Toute autre référence client non listée → BLOQUANT

### 3. Fonctionnalités SuperFleet (source : catalogue fonctionnel)

Vérifier que les modules mentionnés sont documentés dans le catalogue :
Géolocalisation, Maintenance, Conducteurs, Alertes, Tachygraphe, IRVE, Autopartage, IA SuperFleet.

Chiffres autorisés du catalogue :
- 200 utilisateurs simultanés
- Latence < 1 seconde (MQTT)
- 15+ colonnes personnalisables
- 4 niveaux de droits × 11 modules

### 4. SLA et certifications (source : fiche technique sécurité)

| Claim | Valeur autorisée |
|-------|-----------------|
| SLA disponibilité | 99,9% annuel |
| RPO | < 1 heure |
| RTO | < 4 heures |
| Hébergement | 100% UE (AWS Frankfurt + OVH Gravelines + Flespi Lituanie) |
| Certif AWS | ISO 27001, SOC 2 Type II (AWS uniquement — pas Geoloc) |
| Certif OVH | ISO 27001, HDS (OVH uniquement — pas Geoloc) |
| Support P1 | Intervention < 1h, résolution < 4h |

### 5. CAN-BUS — Règle spéciale

Ne jamais promettre la lecture CAN-BUS sans la condition explicite :
> "sous réserve de compatibilité du véhicule avec le protocole CAN-BUS"

### 6. Mots interdits absolus

- "FleetWatcher" → toujours remplacer par "SuperFleet"
- Toute certification ISO directe de Geoloc Systems (non certifié)
- Toute référence client autre que les 4 autorisées

## Format de sortie

```
🛡️ NO-INVENTION GUARD — [RÉFÉRENCE DOCUMENT]

RÉSULTAT : [✅ CONFORME | ❌ ERREURS DÉTECTÉES]

🔴 Claims non sourcés (BLOQUANTS) :
| # | Texte trouvé | Problème | Correction |
|---|-------------|----------|-----------|

🟡 Alertes (à vérifier) :
| # | Texte | Vérification recommandée |
|---|-------|--------------------------|

🔵 A_CONFIRMER identifiés :
[liste des items marqués A_CONFIRMER]

Sources consultées :
✅ profil-geoloc-systems.md
✅ superfleet-catalogue-fonctionnel.md
✅ superfleet-fiche-technique-securite-conformite.md
```
