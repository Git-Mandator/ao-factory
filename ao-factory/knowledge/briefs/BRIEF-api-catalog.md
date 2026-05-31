# BRIEF — Catalogue API SuperFleet (REST + JMS)
## Chargement rapide — AO Factory v3.6

> Source de vérité pour rédiger le § « Catalogue d'API » d'un mémoire technique.
> Issu de la capitalisation SPL EBR DAF-2025-15. À reprendre tel quel ; ajuster
> uniquement les endpoints exotiques selon CCTP particulier.

---

## API REST — 18 endpoints principaux (OpenAPI / Swagger documenté)

| Domaine | Endpoint | Méthode | Usage |
|---|---|---|---|
| Authentification | `/auth/login` | POST | Obtention jeton JWT |
| Authentification | `/auth/refresh` | POST | Renouvellement jeton |
| Véhicules | `/vehicles` | GET | Liste véhicules + filtres |
| Véhicules | `/vehicles/{id}` | GET | Fiche véhicule complète |
| Véhicules | `/vehicles/{id}/positions` | GET | Historique positions |
| Véhicules | `/vehicles/{id}/trips` | GET | Trajets sur période |
| Conducteurs | `/drivers` | GET | Liste conducteurs |
| Conducteurs | `/drivers/{id}/score` | GET | Score éco-conduite |
| Sites | `/sites` | GET / POST / PUT | Points d'intérêt et géofences |
| Alertes | `/alerts` | GET | Historique alertes |
| Alertes | `/alerts/subscribe` | POST | Abonnement push |
| Rapports | `/reports` | GET | Liste modèles de rapport |
| Rapports | `/reports/{id}/run` | POST | Génération à la demande |
| Carburant | `/fuel` | POST | Saisie événement carburant |
| Recharge VE | `/charging` | GET | Historique sessions de recharge |
| Autopartage | `/bookings` | GET / POST | Réservations |
| Badges | `/badges` | GET / POST | Gestion badges MIFARE |
| Audit | `/audit/logs` | GET | Traçabilité accès et actions |
| Export | `/exports/csv` | POST | Génération export CSV |

## API asynchrone (JMS / ActiveMQ) — 4 files

| File | Direction | Usage |
|---|---|---|
| `superfleet.positions.in` | Entrée | Ingestion massive de positions externes |
| `superfleet.events.out` | Sortie | Diffusion événements (alertes, trajets) |
| `superfleet.exports.out` | Sortie | Exports volumineux (BI, archivage) |
| `superfleet.dlq` | DLQ | Dead Letter Queue (reprise sur erreur après 3 tentatives) |

## Sécurité API & supervision (à formuler dans le mémoire)

- Utilisateurs techniques **dédiés par applicatif consommateur**
- Jetons **JWT dynamiques**, durée paramétrable (15 min par défaut)
- **Scopes** par ressource (vehicles, drivers…) et action (read, write, delete)
- **Supervision** : console métriques exposant accès, consommation, temps de réponse, taux d'erreur
- **Rate limiting** configurable par utilisateur technique
- **Audit trail** complet des appels API

## Interopérabilité confirmée
- **ETL Talend** : connecteur REST + vues SQL dédiées
- **BI** : 3 modalités (API REST, vues SQL dédiées, export massif quotidien)
- **Documentation OpenAPI** complète remise à la notification

> 💡 Si le CCTP demande un format spécifique (SOAP, GraphQL, webhooks…) → marquer `A_CONFIRMER` plutôt que d'affirmer.
