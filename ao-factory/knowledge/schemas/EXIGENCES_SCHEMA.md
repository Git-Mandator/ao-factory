# Schéma EXIGENCES.json — Backbone inter-agents
## AO Factory v3.0 — Geoloc Systems

> Ce fichier définit le **contrat de données** entre tous les agents.
> `EXIGENCES.json` est généré en Phase 2 (ao-matrice) et enrichi progressivement par chaque agent.
> C'est la seule source de vérité sur les exigences du marché.

---

## Schéma JSON complet

```json
{
  "meta": {
    "ao_ref": "AO-2026-XXX",
    "acheteur": "Nom de l'acheteur public",
    "date_creation": "YYYY-MM-DD",
    "date_remise": "YYYY-MM-DD",
    "version": "1.0",
    "generated_by": "a02-requirements-miner",
    "last_updated_by": "a07-writer",
    "statut_global": "EN_COURS | PRET_REMISE | BLOQUE"
  },
  "strategie": {
    "angle": "Expertise terrain 22 ans / Souveraineté données / ...",
    "phrase_fil_rouge": "...",
    "differenciateurs": ["D1", "D2", "D3"],
    "risques": ["R1", "R2"],
    "source": "STRATEGIE.md",
    "generated_by": "a00b-bid-strategist"
  },
  "ponderation": {
    "technique_pct": 60,
    "prix_pct": 40,
    "criteres": [
      {
        "id": "C01",
        "libelle": "Valeur technique de l'offre",
        "poids": 40,
        "sous_criteres": [
          { "id": "C01.1", "libelle": "Fonctionnalités solution", "poids": 20 },
          { "id": "C01.2", "libelle": "Architecture technique", "poids": 10 },
          { "id": "C01.3", "libelle": "Sécurité et RGPD", "poids": 10 }
        ]
      },
      {
        "id": "C02",
        "libelle": "Méthodologie de déploiement",
        "poids": 20,
        "sous_criteres": []
      },
      {
        "id": "C03",
        "libelle": "Prix",
        "poids": 40,
        "sous_criteres": []
      }
    ]
  },
  "exigences": [
    {
      "req_id": "REQ-001",
      "critere_parent": "C01.1",
      "section_cctp": "3.2.1",
      "libelle": "Géolocalisation temps réel avec rafraîchissement ≤ 30 secondes",
      "criticite": "MUST",
      "type": "FONCTIONNEL | TECHNIQUE | SECURITE | RGPD | CONTRACTUEL | ADMINISTRATIF",
      "statut": "OK | PARTIEL | NON | A_CONFIRMER",
      "couverture_pct": 100,
      "reponse_superfleet": "SuperFleet assure un rafraîchissement en temps réel toutes les 10 secondes (paramétrable) via boîtiers Teltonika FMC650/FMC920.",
      "source_knowledge": "knowledge/briefs/BRIEF-superfleet-fonctionnel.md#geolocalisation",
      "paragraphe_memoire": {
        "section": "3.2 — Géolocalisation temps réel",
        "statut": "REDIGE | A_REDIGER | VALIDE",
        "longueur_mots": 250
      },
      "preuves": [
        {
          "type": "ANNEXE",
          "fichier": "knowledge/annexes/superfleet/08-annexe-illustrations-superfleet.pdf",
          "page": "Annexe 1 — Localisation temps réel",
          "statut": "DISPONIBLE"
        }
      ],
      "trace": {
        "extrait_par": "a02-requirements-miner",
        "date": "YYYY-MM-DD",
        "note": ""
      }
    }
  ],
  "couverture_globale": {
    "total_req": 0,
    "ok": 0,
    "partiel": 0,
    "non": 0,
    "a_confirmer": 0,
    "taux_couverture_pct": 0,
    "alertes": []
  }
}
```

---

## Cycle de vie de EXIGENCES.json

```
Phase 0  → Créé par dce-ingestion : meta + squelette vide
Phase 2  → Rempli par a02-requirements-miner : toutes les exigences extraites
Phase 2bis → Enrichi par a00b-bid-strategist : ponderation + strategie (produit aussi STRATEGIE.md)
Phase 3  → Enrichi par a03-evidence-librarian : preuves par REQ
Phase 3b → Enrichi par a04-compliance-lead : statuts RGPD / SECURITE
Phase 4  → Enrichi par a07-writer : paragraphe_memoire par REQ
Phase 7  → Relu par a08-qa-red-team : couverture_globale calculée
Phase 8  → Utilisé par ao-export : annexes sélectionnées automatiquement
```

---

## Règles d'intégrité

1. **req_id** : format `REQ-XXX` (3 chiffres, séquentiel)
2. **criticite** : MUST (exigence éliminatoire) / SHOULD (important) / NICE (bonus)
3. **statut OK** : la fonctionnalité est documentée dans la base SuperFleet
4. **statut PARTIEL** : couverte en partie — préciser dans `reponse_superfleet`
5. **statut NON** : ne pas cacher — mentionner une alternative ou une variante
6. **statut A_CONFIRMER** : information à vérifier par Said KHAYAT avant remise
7. **couverture_pct** : 100 = OK complet / 50 = PARTIEL / 0 = NON
8. **Aucune donnée inventée** — toujours référencer `source_knowledge`

---

## Calcul du score de couverture

```
Score technique = Σ (poids_critere × couverture_req) / Σ poids_critere

Si score_couverture < 70% → ALERTE dans ao-qa
Si un MUST = NON → BLOQUANT dans ao-qa (sauf variante proposée)
```

---

*Schéma v3.0 — AO Factory — Geoloc Systems*
