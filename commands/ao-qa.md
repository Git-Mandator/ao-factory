---
description: QA Red Team finale (bloquante) — aucun dépôt sans QA validé
allowed-tools: Read, Write, Grep, Glob
argument-hint: [référence marché]
---

Lance la QA Red Team finale (bloquante) pour : $ARGUMENTS

## Lecture obligatoire de tous les livrables

Lire dans cet ordre :
1. `synthese/EXIGENCES.json` — couverture_globale + A_CONFIRMER résiduels
2. `strategie/STRATEGIE.md` — différenciateurs à vérifier en cohérence
3. `memoire-technique/MEMOIRE_TECHNIQUE.md`
4. `matrice-conformite/MATRICE_CONFORMITE.md`
5. `pricing/DQE_PRICING.md`
6. `admin/ADMIN_CHECKLIST.md`
7. `TRACE.md` — décisions journalisées (vérifier A_CONFIRMER non résolus)

## Contrôles à effectuer (liste exhaustive)

### 🔴 Contrôles bloquants (1 seul = STOP)

| Contrôle | Méthode |
|----------|---------|
| "FleetWatcher" absent | grep dans tous les fichiers → doit être 0 |
| Fonctionnalité inventée non sourcée | Croiser chaque affirmation avec briefs + catalogues |
| Chiffre inventé (CA, délai, taux) | Chaque chiffre sourcé dans BRIEF-profil-geoloc.md |
| Incohérence mémoire ↔ DQE | Volumes, périmètre, nb véhicules doivent correspondre |
| Pièce administrative bloquante manquante | RC AXA, DC1, DC2 selon exigences RC |
| Engagement impossible à tenir | Délais irréalistes, SLA au-delà des capacités documentées |
| REQ MUST avec statut NON sans alternative | Chercher dans EXIGENCES.json les MUST+NON |
| Ancienne palette couleurs (#1F3864) | grep dans tout fichier de présentation |

### 🟡 Contrôles importants (signaler sans bloquer)

| Contrôle | Vérification |
|----------|-------------|
| Couverture CCTP pondérée | Score couverture EXIGENCES.json ≥ 70% |
| Items A_CONFIRMER résiduels | < 5% des REQ en A_CONFIRMER acceptable |
| Différenciateurs STRATEGIE.md bien présents | Phrase fil rouge dans sections ⭐⭐⭐ |
| Titres alignés sur critères RC | Mots exacts du RC dans les titres de section |
| Preuves annexées | Chaque REQ MUST → annexe référencée dans EXIGENCES.json |
| Lisibilité acheteur | Structure claire, pas de jargon interne |
| TRACE.md complet | Toutes les phases journalisées |

### 🔍 Contrôle cohérence stratégique

- Les 3 différenciateurs de STRATEGIE.md sont-ils bien développés dans le mémoire ?
- Les 2 risques identifiés sont-ils bien neutralisés dans les sections concernées ?
- La phrase fil rouge apparaît-elle dans chaque section prioritaire ?

### 🔍 Contrôle No-Invention Guard

Passer en revue systématiquement :
- Toute certification mentionnée → vérifier dans BRIEF-securite-rgpd.md
- Tout module mentionné → vérifier dans BRIEF-superfleet-fonctionnel.md
- Toute référence client → uniquement ENEDIS, ADANEV, Transalys, Commune de Martigues
- CAN-BUS → uniquement si condition de compatibilité véhicule mentionnée

## Calcul du score de couverture (depuis EXIGENCES.json)

```
Score pondéré = Σ (poids_critere × couverture_req) / Σ poids_critere

Seuils :
≥ 85% → Très bonne couverture
70–84% → Couverture acceptable (signaler les lacunes)
< 70% → ALERTE — risque scoring faible
```

Mettre à jour `couverture_globale` dans EXIGENCES.json.

## Format de sortie — QA_CHECKLIST.md

Crée `qa/QA_CHECKLIST.md` :

```markdown
# QA Red Team — [RÉFÉRENCE MARCHÉ] — [DATE]
Score couverture EXIGENCES.json : [X]%

## 🔴 Contrôles bloquants
| Contrôle | Statut | Détail | Action requise |
|----------|--------|--------|----------------|
| FleetWatcher absent | ✅/❌ | [N] occurrences | [fichier:ligne] |
| No-Invention Guard | ✅/❌ | ... | ... |
| MUST NON sans alternative | ✅/❌ | [liste REQ] | [action] |

## 🟡 Contrôles importants
| Contrôle | Statut | Détail |
|----------|--------|--------|
| Couverture pondérée | ✅/⚠️ | [X]% |
| Cohérence stratégique | ✅/⚠️ | [détail] |
| TRACE.md complet | ✅/⚠️ | Phases manquantes : [liste] |

## ⚠️ Items A_CONFIRMER non résolus — action urgente Said KHAYAT
| REQ | Question | Impact si non résolu |
|---|---|---|
| [REQ-XXX] | [question] | [impact] |

## DÉCISION FINALE

**GO_DEPOT** ✅ — Aucun bloquant. Score couverture : [X]%. Prêt pour dépôt.
OU
**BLOQUANT** ❌ — [N] points bloquants → corrections obligatoires avant dépôt.
Corrections prioritaires :
1. [correction urgente]
2. [correction urgente]
```

Journaliser la décision finale dans `TRACE.md` Phase 7.

Aucun dépôt ne peut avoir lieu sans QA_CHECKLIST.md avec décision **GO_DEPOT**.
