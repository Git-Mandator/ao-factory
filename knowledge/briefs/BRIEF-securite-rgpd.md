# BRIEF — Sécurité, RGPD & Hébergement SuperFleet
## Chargement rapide — AO Factory v3.0

> Source complète : `knowledge/references/superfleet-fiche-technique-securite-conformite.md`

---

## Hébergement — réponse prête

"SuperFleet est hébergé exclusivement au sein de l'Union Européenne :
- **AWS Frankfurt 🇩🇪** (infrastructure principale, ISO 27001, SOC 2)
- **OVH Gravelines 🇫🇷** (backup / redondance, ISO 27001, HDS)
- **Flespi Lituanie 🇱🇹** (middleware télématique, données UE)

Aucune donnée n'est hébergée hors UE. Aucun transfert vers des pays tiers."

## SLA & Continuité — chiffres certifiés

| Indicateur | Valeur contractuelle |
|---|---|
| Disponibilité | **99,9% / an** (< 8h45 d'indisponibilité) |
| RPO (perte données max) | **< 1 heure** |
| RTO (reprise activité) | **< 4 heures** |
| Sauvegardes | Quotidiennes — conservation 30 jours |
| Astreinte support | **7j/7** |
| Support P1 (critique) | Intervention < 1h — résolution < 4h |
| Support P2 (majeur) | Résolution < 8h |
| Support P3 (mineur) | Résolution < 48h |

## Sécurité technique — réponse prête

| Mécanisme | Détail |
|---|---|
| Chiffrement repos | AES-256 |
| Chiffrement transit | TLS 1.3 |
| Auth | JWT + sessions sécurisées |
| Isolation données | RLS PostgreSQL (Row Level Security) |
| Accès admin | MFA obligatoire |
| Logs sécurité | Audit trail complet |

## RGPD — articles applicables (géolocalisation salariés)

| Article | Application |
|---|---|
| Art. L.1121-1 Code travail | Proportionnalité du traitement |
| Art. L.1222-4 Code travail | Information préalable des salariés obligatoire |
| RGPD Art. 6 | Base légale : intérêt légitime ou contrat |
| RGPD Art. 13-14 | Information des personnes concernées |
| RGPD Art. 17 | Droit à l'effacement |
| RGPD Art. 28 | Contrat sous-traitant (DPA disponible) |
| RGPD Art. 30 | Registre des traitements |
| CNIL Reco. géoloc | Respect paramètre horaires, pas géoloc repos |

## Formulation type RGPD pour mémoire

"SuperFleet intègre nativement les exigences RGPD applicables à la géolocalisation des salariés (Art. L.1121-1 et L.1222-4 du Code du travail). La solution permet de désactiver automatiquement la localisation en dehors des heures de travail et de garantir l'information préalable des conducteurs. Un contrat de sous-traitance (DPA) conforme à l'article 28 du RGPD est fourni à la signature du marché."
