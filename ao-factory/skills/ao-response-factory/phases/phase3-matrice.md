# PHASE 3 — Matrice de Conformité ⭐ CŒUR DU SYSTÈME

> Agents producteurs (appel DIRECT) : **`a02-requirements-miner`** (fonctionnel) + **`a04-compliance-lead`**
> (SSI/RGPD) + **`a05-telematics-architect`** (matériel) + **`a03-evidence-librarian`** (preuves)
> — les wrappers `bid-manager`/`rgpd-security` ne sont plus invoqués par l'orchestrateur depuis la v3.6.3

> La qualité de la matrice détermine directement la note technique obtenue.
> Chaque exigence `REQ-XXX` doit être traitée sans exception.

---

## Pour chaque REQ, renseigner

| Champ | Valeurs | Source obligatoire |
|---|---|---|
| **Statut** | `OK` / `PARTIEL` / `NON` / `A_CONFIRMER` | Catalogue fonctionnel ou fiche technique |
| **Réponse argumentée** | Texte précis, sourcé, chiffré si possible | Base documentaire AO_FACTORY |
| **Preuve associée** | Annexe, doc, référence, certif | INDEX-ANNEXES.md |
| **Risque identifié** | Impact si non couvert | — |

## Sources par domaine d'exigence

| Domaine CCTP | Source principale (chemins relatifs à la racine du plugin) | Source secondaire |
|---|---|---|
| Géolocalisation, tableau de bord, rapports | `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` | `knowledge/briefs/BRIEF-structure-memoire-gagnant.md` |
| Matériel GPS, boîtiers, CAN-BUS, installation | `knowledge/references/boitiers-teltonika-detail.md` | `knowledge/briefs/BRIEF-teltonika-wiki.md` (60 AVL IDs) + `BRIEF-comparatif-natif-vs-boitier.md` |
| Sécurité, RGPD, hébergement, SLA, PCA | `knowledge/briefs/BRIEF-securite-rgpd.md` | `knowledge/briefs/BRIEF-ssi-matrice-33items.md` |
| RSE, éco-conduite, CO2, ZFE, Crit'Air | `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` (modules Transition énergétique / éco-conduite) | `knowledge/briefs/BRIEF-coach-embarque.md` |
| Équipe, références, délais, formation | `knowledge/briefs/BRIEF-profil-geoloc.md` | `knowledge/company/` + `knowledge/methodologies/delais-engagements-ao.md` |
| Annexes et preuves à joindre | `knowledge/annexes/INDEX-ANNEXES.md` | — |

## Format de la matrice

```markdown
# MATRICE_CONFORMITE — [RÉFÉRENCE MARCHÉ]

| REQ | Exigence CCTP | Statut | Réponse Geoloc Systems | Preuve / Annexe | Risque |
|---|---|---|---|---|---|
| REQ-001 | [Texte exact CCTP] | OK | [SuperFleet module X — chiffre clé] | [Annexe N°] | — |
| REQ-002 | [Texte exact CCTP] | PARTIEL | [Couverture partielle — préciser] | [à constituer] | Moyen |
| REQ-003 | [Texte exact CCTP] | A_CONFIRMER | [Besoin de vérification] | — | ⚠️ Fort |
| REQ-004 | [Texte exact CCTP] | NON | Non couvert par SuperFleet | — | ❌ Bloquant |
```

## Livrable

Produire `matrice-conformite/MATRICE_CONFORMITE.md`
