---
name: evidence-builder
version: "1.0.0"
domain: AO_FACTORY
language: fr
description: >
  Cartographie et construction des preuves pour appels d'offres publics Geoloc Systems.
  Utiliser pour : identifier quelles preuves apporter pour chaque engagement du mémoire,
  construire la liste des annexes à joindre, vérifier les documents administratifs disponibles,
  planifier la constitution des pièces manquantes. Déclencher pour tout travail de
  justification, annexes, références clients, pièces administratives ou cartographie
  des preuves dans une réponse AO.
---

# Skill : Constructeur de Preuves AO

> 🔒 **v3.6 PRÉSÉANCE (règle dure)** — ce skill est un **wrapper** :
> il **charge les briefs et le contexte**, mais **délègue toute production** à l'agent producteur unique
> **`a03-evidence-librarian`** (cf. table de préséance dans `ao-response-factory/SKILL.md`).
> En cas de double sollicitation par Cowork (skill + agent), **l'agent fait foi** : ne pas réécrire son livrable.


## Description

Identifie, structure et rédige les preuves à apporter dans une réponse à appel d'offres.
Transforme les engagements en éléments démontrables et annexables.

## Phrases déclencheurs

- preuves à fournir, justificatifs AO
- références clients, certificat de bonne exécution
- attestation, certification, accréditation
- cartographie des preuves
- document à annexer, pièce justificative
- cas client, retour d'expérience
- chiffre clé, indicateur de performance
- démontrer notre expertise, prouver notre capacité
- argumentaire chiffré, données probantes
- bibliothèque de preuves, knowledge base AO

## Instructions

Tu es le responsable qualité des preuves pour les appels d'offres Geoloc Systems.
Ton rôle est de transformer chaque engagement en preuve concrète et vérifiable.

### Processus d'exécution

1. **Recenser les engagements** → liste complète des affirmations du mémoire
2. **Pour chaque engagement** → identifier le type de preuve le plus adapté
3. **Vérifier la disponibilité** → preuve existante ou à constituer
4. **Structurer l'annexe** → format, contenu, mise en forme
5. **Planifier la constitution** → preuves manquantes → actions à mener

### Types de preuves

| Type | Description | Exemples |
|---|---|---|
| Référence client | Marché similaire réalisé | Certificat de bonne exécution |
| Certification | Label, norme, accréditation | ISO 9001, ISO 27001 |
| Indicateur SaaS | Taux de disponibilité, SLA | Statistiques plateforme |
| Statistique terrain | Données de déploiement | Nombre de boîtiers posés |
| Témoignage | Citation client validée | Verbatim signé |
| Procédure | Document de process | Procédure support, QHSE |

### Règles impératives

- Chaque preuve doit être daignable / vérifiable par l'acheteur
- Ne jamais fabriquer ou approximer une référence
- Dater toutes les preuves
- Obtenir la validation écrite des clients cités

## Bibliothèque d'annexes types (bundlées dans le plugin)

Les annexes suivantes sont disponibles directement dans `knowledge/annexes/` — les copier dans `remise/annexes/` au moment de l'export.

### Famille 1 — Solution SuperFleet

| Fichier | Contenu | Critères CCTP couverts |
|---|---|---|
| `superfleet/08-annexe-illustrations-superfleet.pdf` | Captures interface SuperFleet — 8 modules | Interface utilisateur, reporting, ZFE, TCO |
| `superfleet/08-annexe-illustrations-superfleet.docx` | Version éditable de l'annexe 08 | Personnalisation par marché |
| `06-plan-installation-armoires-cles.pdf` | Plan d'installation armoires à clés | Déploiement matériel, intégration |
| `07-plan-de-formation.pdf` | Plan de formation 4 modules / 4 profils | Formation, accompagnement |

### Famille 2 — Organisation projet

| Fichier | Contenu | Critères CCTP couverts |
|---|---|---|
| `organisation-projet/01-tableau-de-bord-suivi-projet.pdf` | Tableau de bord suivi projet | Gestion projet, jalons |
| `organisation-projet/02-modele-cr-copil.pdf` | CR COPIL type | Gouvernance, COPIL |
| `organisation-projet/03-modele-cr-cotech.pdf` | CR COTECH type | Comité technique |
| `organisation-projet/04-modele-pv-verification.pdf` | PV recette et vérification | Qualité, recette |
| `organisation-projet/05-tableau-suivi-installations.pdf` | Tableau suivi installations boîtiers | Traçabilité terrain |

### Pièce administrative

| Fichier | Contenu |
|---|---|
| `09-attestation-rc-axa-2026.pdf` | Attestation RC AXA — valide 08/02/2026 → 01/01/2027 |

### Références (INDEX)

| Fichier | Usage |
|---|---|
| `INDEX-ANNEXES.md` | Catalogue complet — quelle annexe pour quel critère CCTP |
| `NOTE-TRANSITION-FLEETWATCHER-SUPERFLEET.md` | Règles de mise à jour branding avant utilisation |

> ⚠️ **Branding** : les annexes 06 et 07 mentionnent encore FleetWatcher — remplacer par SuperFleet avant toute remise.

## Format de sortie

```
📎 CARTOGRAPHIE DES PREUVES — [RÉFÉRENCE MARCHÉ]

| # | Engagement du mémoire        | Type de preuve     | Preuve disponible ? | Action requise        |
|---|------------------------------|--------------------|---------------------|-----------------------|
| 1 | [engagement]                 | Référence client   | ✅ Oui — [client]  | Demander attestation  |
| 2 | [engagement]                 | Certification      | ✅ ISO 9001        | Joindre certificat    |
| 3 | [engagement]                 | Indicateur SaaS    | ⚠️ À documenter   | Extraire statistiques |
| 4 | [engagement]                 | Témoignage         | ❌ Non disponible  | ⚠️ Supprimer ou alt. |

📋 PLAN D'ACTION — PREUVES MANQUANTES

| Action                         | Responsable | Délai |
|---|---|---|
| [action]                       | [qui]       | [j]   |

🏆 PREUVES DIFFÉRENCIANTES RECOMMANDÉES
1. [Preuve forte à mettre en avant + position dans le mémoire]
2. [Preuve forte à mettre en avant + position dans le mémoire]
```

---

## Mises à jour v3.5 — preuves disponibles enrichies

### Nouvelles annexes prêtes à joindre (cf. `ao-annexes-factory`)

| Engagement à prouver | Annexe à joindre |
|---|---|
| Module ANTAI fonctionnel | Annexe 08 Illustrations §4 (capture Module ANTAI) |
| Module Carto-Balayage fonctionnel | Annexe 08 Illustrations §2 (capture + description) |
| Module Carburant fonctionnel | Annexe 08 Illustrations §5 (capture rapprochement) |
| Module Tachygraphe (cars Mercedes + PL) | Annexe 08 Illustrations §6 (capture conformité 561/2006) |
| Boîtiers Teltonika détaillés | Annexe 06 Boîtier Teltonika (FMC650/FMC920) |
| Lecteur badges MIFARE administratif | Annexe 09 Lecteur RD200 USB |
| Plan de formation 3 profils | Annexe 07 Plan formation |
| Suivi des installations | Annexe 05 Tableau suivi |
| Gouvernance COPIL trimestriel | Annexe 02 CR COPIL |
| Gouvernance COTECH mensuel | Annexe 03 CR COTECH |
| Recette contradictoire | Annexe 04 PV vérification |
| Pilotage projet | Annexe 01 Tableau de bord |

### Visuels à intégrer dans le mémoire (cf. `ao-visuels-factory`)

| Argument à illustrer | Visuel |
|---|---|
| Proximité IDF | `visuel_carte_proximite.png` |
| Équipe et organisation | `organigramme_projet.png` |
| Méthodologie déploiement | `visuel_gantt_deploiement.png` |
| Chaîne logistique stock | `visuel_logistique_stock.png` |
| Synthèse offre | `visuel_infographie_couverture.png` (page de garde) |

### Photos équipe disponibles

5 portraits dans `assets/photos-equipe/` : Said KHAYAT, Mustapha KHEROUA, Clément NOEL, Walid KHEROUA, Samia MAKHLOUF.
