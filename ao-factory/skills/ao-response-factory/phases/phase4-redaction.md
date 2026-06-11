# PHASE 4 — Rédaction du Mémoire Technique

> Agent producteur : **`a07-writer`** (appel DIRECT — ⛔ ne JAMAIS passer par le wrapper `bid-manager`,
> cause de la régression v3.6.0-3.6.2 : mémoires de 4 000-5 000 mots rejetés)

### Règle d'or — structure MIROIR de la grille de notation

> Le mémoire calque **sous-critère par sous-critère, dans l'ordre EXACT du RC**, avec la pondération
> en points affichée dans chaque titre. Le sommaire vient de `STRATEGIE.md` (Phase 2bis), jamais d'une
> structure générique. Détail complet : `knowledge/briefs/BRIEF-structure-memoire-gagnant.md`
> (brief MAÎTRE — à lire EN PREMIER) et a07-writer §« Structure — MIROIR EXACT ».

---

## Prérequis (bloquants)

| Prérequis | Produit par | Si absent |
|---|---|---|
| `STRATEGIE.md` (grille pondération RC + hiérarchie) | a00b — Phase 2bis | ⛔ STOP — lancer la Phase 2bis |
| `MATRICE_CONFORMITE.md` | a02+a04+a05 — Phase 3 | ⛔ STOP |
| `EXIGENCES.json` à jour | a01 — Phase 1 | ⛔ STOP |
| Les 12 briefs `knowledge/briefs/` chargés | racine plugin (cf. SKILL.md §Résolution des chemins) | ⛔ STOP — `[BRIEF_INTROUVABLE]`, jamais improviser |

## Ossature (rappel — cf. BRIEF-structure-memoire-gagnant)

```
[Page de garde] + [Sommaire reprenant l'ordre RC]
1. Propos liminaire (signé Said KHAYAT)
2. Compréhension du besoin de [ACHETEUR]
3 → N. UNE SECTION PAR SOUS-CRITÈRE NOTÉ  ← cœur, 60-70 % du volume, ordre = grille RC
N+1. Synthèse des engagements de service
N+2. Liste des annexes jointes
```

Dans chaque section notée, les 4 patterns obligatoires : engagement d'ouverture, tableau de
couverture point par point du CCTP, illustration/capture annotée (produite en Phase 4bis),
clôture « Preuve / Annexe : Annexe X ».

## Sources par contenu (chemins relatifs à la racine du plugin)

| Contenu | Source |
|---|---|
| Structure, forme, ton gagnants | `knowledge/briefs/BRIEF-structure-memoire-gagnant.md` ⭐ |
| Entreprise, équipe, références, phrases types | `knowledge/briefs/BRIEF-profil-geoloc.md` + `knowledge/company/` |
| Modules SuperFleet, specs | `knowledge/briefs/BRIEF-superfleet-fonctionnel.md` |
| Sécurité, RGPD, hébergement, SLA | `knowledge/briefs/BRIEF-securite-rgpd.md` + `BRIEF-ssi-matrice-33items.md` |
| Matériel embarqué, AVL IDs, accessoires | `knowledge/references/boitiers-teltonika-detail.md` + `knowledge/briefs/BRIEF-teltonika-wiki.md` |
| API, cartographie parc, coach, dépose tiers, clôture | briefs ciblés correspondants (cf. a07-writer Étape 3) |
| Annexes disponibles | `knowledge/annexes/INDEX-ANNEXES.md` |
| Délais contractuels capitalisés | `knowledge/methodologies/delais-engagements-ao.md` |

## Règles rédactionnelles

- **Volume total : 6 000-8 000 mots** — ⛔ sous 5 500 mots = brouillon rejeté en QA (contrôle chiffré a08 §6bis)
- Sections les plus longues = sous-critères les plus pondérés (60-70 % du volume sur les sections notées)
- Chaque affirmation suivie d'une preuve, d'un chiffre ou d'un renvoi annexe
- Titres = mots exacts du RC/CCTP + points du sous-critère
- Mettre à jour `EXIGENCES.json` (champ `paragraphe_memoire`) au fil des sections

## Livrable

Produire `memoire-technique/MEMOIRE_TECHNIQUE.md`, puis enchaîner **Phase 4bis** (annexes + visuels —
chaque « Annexe X » citée doit exister physiquement dans `remise/Annexes/`).
