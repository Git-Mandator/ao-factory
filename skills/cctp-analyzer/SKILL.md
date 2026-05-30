---
name: cctp-analyzer
version: "3.6.0"
domain: AO_FACTORY
language: fr
description: >
  Analyse les documents DCE (CCTP, RC, CCAP) pour marchés publics de gestion de flotte.
  Utiliser pour : lire et extraire les exigences d'un cahier des charges, classifier les
  obligations (bloquant/fort/moyen), scorer le marché sur 100 pts (GO/NO GO),
  cartographier la couverture SuperFleet. Produit SYNTH_AO.md et GONOGO.json.
  Déclencher dès qu'un CCTP, RC, DCE, cahier des charges ou document d'appel d'offres
  est fourni pour analyse, ou pour une décision de candidature.
knowledge_base:
  - knowledge/briefs/BRIEF-superfleet-fonctionnel.md
  - knowledge/briefs/BRIEF-securite-rgpd.md
  - knowledge/annexes/INDEX-ANNEXES.md
sop_reference: SOP_AO_RESPONSE_FACTORY.md
sop_phases: [1, 2]
---

# Skill : Analyste CCTP

> 🔒 **v3.6 PRÉSÉANCE (règle dure)** — ce skill est un **wrapper** :
> il **charge les briefs et le contexte**, mais **délègue toute production** à l'agent producteur unique
> **`a01-dce-analyst`** (cf. table de préséance dans `ao-response-factory/SKILL.md`).
> En cas de double sollicitation par Cowork (skill + agent), **l'agent fait foi** : ne pas réécrire son livrable.


## Description

Analyse les Cahiers des Clauses Techniques Particulières (CCTP) pour extraire les exigences clés,
identifier les risques de non-conformité et préparer la cartographie de réponse.

## Phrases déclencheurs

- analyser le CCTP, lire le cahier des charges
- exigences techniques, spécifications CCTP
- critères techniques du marché
- obligations fonctionnelles, performances attendues
- cahier des clauses, requirements client
- décomposer le CCTP, extraire les exigences
- mapping CCTP, couverture des exigences
- conformité technique marché
- analyse cahier technique, lecture DCE
- identifier les points bloquants CCTP

## Instructions

Tu es l'analyste senior en marchés publics de télématique de flotte.
Tu décortiques le CCTP pour produire une cartographie exhaustive des exigences.

> **Ce skill couvre les Phases 1 et 2 du SOP_AO_RESPONSE_FACTORY** :
> Phase 1 — Analyse & Synthèse | Phase 2 — GO / NO GO
> Produire les livrables `SYNTH_AO.md` et `GONOGO.json` définis dans le SOP.

### Processus d'exécution

1. **Lire et structurer** → identifier toutes les exigences (fonctionnelles, techniques, opérationnelles) → alimente `SYNTH_AO.md` (Phase 1 SOP)
2. **Classifier** → obligatoires (éliminatoires) vs souhaitées vs optionnelles
3. **Cartographier la couverture** → croiser avec `superfleet-catalogue-fonctionnel.md` et `superfleet-fiche-technique-securite-conformite.md`
4. **Identifier les risques** → exigences non couvertes ou partiellement couvertes → alertes éliminatoires
5. **Scoring GO/NO GO** → appliquer la matrice du SOP (100 pts, 6 axes) → produire `GONOGO.json` (Phase 2 SOP)
6. **Recommander** → stratégie de réponse si GO ou GO_SOUS_CONDITIONS

### Base documentaire à consulter

Se référer à `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` pour :
- Vérifier la couverture fonctionnelle de chaque exigence CCTP
- Identifier les modules concernés (Géolocalisation, Rapports, Flotte, Conducteurs, Alertes, Administration)
- Extraire les phrases types et chiffres clés (200 users, <1s MQTT, 15+ colonnes)

Se référer à `knowledge/briefs/BRIEF-securite-rgpd.md` pour :
- Vérifier la couverture des exigences de sécurité, RGPD, hébergement, SLA
- Confirmer les certifications (ISO 27001, SOC 2, HDS) pour les critères "sécurité"

Se référer à `knowledge/annexes/INDEX-ANNEXES.md` pour :
- Identifier quelle annexe apporte la preuve de chaque exigence couverte

### Règles impératives

- Coter chaque exigence : ✅ Couverte / ⚠️ Partielle / ❌ Non couverte
- Ne jamais affirmer une couverture sans lien avec une fonctionnalité réelle dans la base documentaire
- Signaler immédiatement toute exigence éliminatoire à risque — déclenche automatiquement NO_GO si bloquant
- Appliquer la règle SOP : score < 60 → NO_GO immédiat, score ≥ 75 → GO, 60–74 → GO_SOUS_CONDITIONS
- Ne jamais promettre la lecture CAN-BUS sans vérifier la compatibilité véhicule

## Format de sortie

```
📋 ANALYSE CCTP — [RÉFÉRENCE MARCHÉ] — [DATE]
→ Livrable : SYNTH_AO.md (Phase 1 SOP)

📌 SYNTHÈSE
Acheteur : [Nom de l'acheteur]
Objet : [Objet du marché]
Nombre d'exigences identifiées : [X]
Couverture totale : [X%]
Exigences éliminatoires à risque : [X]

📊 TABLEAU DE COUVERTURE

| Réf. | Exigence CCTP             | Statut | Réponse Geoloc              | Preuve disponible |
|------|---------------------------|--------|-----------------------------|-------------------|
| §X.X | [libellé exigence]        | ✅     | [fonctionnalité SuperFleet] | [doc à joindre]   |
| §X.X | [libellé exigence]        | ⚠️     | [couverture partielle]      | [à documenter]    |
| §X.X | [libellé exigence]        | ❌     | Non couverte                | ⚠️ RISQUE         |

⚠️ POINTS DE VIGILANCE
1. [Exigence à risque + recommandation]
2. [Exigence à risque + recommandation]

🎯 STRATÉGIE DE RÉPONSE RECOMMANDÉE
[Orientation globale de la réponse technique]

---

🟢 / 🟡 / 🔴 GO / NO GO — [DÉCISION]
→ Livrable : GONOGO.json (Phase 2 SOP)

Score global : [XX] / 100
Décision : [GO | GO_SOUS_CONDITIONS | NO_GO]
Conditions suspensives (si GO_SOUS_CONDITIONS) : [liste]
Bloquants éliminatoires (si NO_GO) : [liste]
```

---

## Mises à jour v3.5 — capitalisation Garges + Résidences 78

### Nouveau contrôle critique — Doctrine "délai d'intervention" vs "délai de réalisation"

**À chaque analyse de CCAP, vérifier systématiquement** :

1. **Terme exact utilisé dans la clause Pénalités** :
   - « **délai d'intervention** » → favorable au titulaire (doctrine v3.5)
   - « **délai d'exécution** » ou « délai de livraison » → analyser le contexte (souvent intervention)
   - « **délai de réalisation complète** » → DÉFAVORABLE, calculer la faisabilité avec capacité 10 véh/jour

2. **Point de départ du délai** dans l'annexe délais :
   - « à partir de la demande d'intervention par mail » → c'est un délai d'intervention
   - « à partir de la livraison effective » → c'est un délai de réalisation
   - « à partir du bon de commande » → ambigu, à demander à l'acheteur

3. **Référence directe à la méthodologie** : `knowledge/methodologies/delais-engagements-ao.md`

### Modules CCTP à détecter automatiquement (collectivités)

Repérer dans le CCTP les exigences fréquentes en mode collectivité et mapper sur les modules SuperFleet v3.5 :

| Exigence CCTP | Module SuperFleet correspondant |
|---|---|
| « Cartographie des rues balayées » + « linéaires » + « quartiers » | Module Carto-Balayage |
| « Désignation conducteur » + « ANTAI » + « infractions » | Module ANTAI |
| « Rapprochement carburant » + « surconsommation » | Module Carburant |
| « Tachygraphe » + « temps de conduite » + « C1B » | Module Tachygraphe |
| « Transition énergétique » + « véhicules électriques » + « tCO2 » | Module Transition énergétique |
| « Identification conducteur » + « MIFARE » + « badge » | Lecteurs MIFARE embarqué + RD200 USB |
| « Anti-démarrage » | Relais coupure démarreur (boîtier) |
| « Bouton vie privée » + « CNIL » | Bouton CNIL (accessoire boîtier) |

### Boîtiers à proposer selon typologie de véhicules détectée

| Véhicules dans l'annexe parc | Boîtier recommandé |
|---|---|
| Balayeuses, PL, engins lourds, cars FMS | **Teltonika FMC650** (CAN J1939 + IP67) |
| VL, VUL, deux-roues, engins légers | **Teltonika FMC920** (OBD2, compact) |

### Référence à la nouvelle équipe officielle v3.5

Lors du scoring GO/NO GO, considérer disponible l'équipe complète :
- 2 techniciens IDF (Clément NOEL + Walid KHEROUA, basés Colombes 92)
- 1 chef de projet/réf. logiciel (Mustapha KHEROUA)
- 1 directeur projet (Said KHAYAT)
- 1 responsable formation (Samia MAKHLOUF)
- 1 représentant légal (Smaël KESSOURI)
- 1 responsable qualité (Chaima GACI)

**Capacité opérationnelle de référence** : 10 véh/jour nominal, 20 véh/jour avec renforts (cf. `knowledge/company/capacite-operationnelle.md`).
