# PHASE 3 — Matrice de Conformité ⭐ CŒUR DU SYSTÈME

> Rôles activés : Expert SuperFleet, Expert Télématique, Expert RSE, Expert Sécurité/RGPD
> Skills : `bid-manager` + `rgpd-security` + cross-domain `telematics-expert`

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

| Domaine CCTP | Source principale | Source secondaire |
|---|---|---|
| Géolocalisation, tableau de bord, rapports | `superfleet-catalogue-fonctionnel.md` | `analyse-memoire-25-60.md` |
| Matériel GPS, boîtiers, CAN-BUS, installation | `teltonika-product-capabilities-ao.md` | `profil-geoloc-systems.md` |
| Sécurité, RGPD, hébergement, SLA, PCA | `superfleet-fiche-technique-securite-conformite.md` | skill `rgpd-security` |
| RSE, éco-conduite, CO2, ZFE, Crit'Air | `superfleet-catalogue-fonctionnel.md` (Module 3) | `profil-geoloc-systems.md` (Section RSE) |
| Équipe, références, délais, formation | `profil-geoloc-systems.md` | `analyse-memoire-25-60.md` |
| Annexes et preuves à joindre | `INDEX-ANNEXES.md` | — |

**Pour les arguments hardware Teltonika :** consulter cross-domain → `10_GEOLOC_SYSTEMS_CORE/skills/telematics-expert/SKILL.md`

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
