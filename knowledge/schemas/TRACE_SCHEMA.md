# Schéma TRACE.md — Traçabilité des décisions
## AO Factory v3.0 — Geoloc Systems

> Un fichier `TRACE.md` est généré automatiquement par l'orchestrateur A00 à chaque transition de phase.
> Il constitue le journal de décision du dossier — indispensable pour les révisions et l'amélioration continue.

---

## Format TRACE.md par dossier

```markdown
# TRACE — [RÉFÉRENCE AO] — Journal de décision
Généré par : A00-Orchestrateur
Dossier : REPONSE_[YYYYMMDD]_[ACHETEUR]/

---

## Phase 0 — Ingestion DCE
Date : YYYY-MM-DD HH:MM
Agent : dce-ingestion + a01-dce-analyst
Documents reçus : [N] fichiers
Documents identifiés : RC ✅ | CCTP ✅ | CCAP ✅ | DQE ✅ | AE ✅
Documents manquants : [liste]
Décision : [Dossier complet / Incomplet — attente [document]]
Durée estimée : J-[N] avant remise

---

## Phase 1-2 — Analyse + GO/NO GO
Date : YYYY-MM-DD HH:MM
Agent : a01-dce-analyst + cctp-analyzer
Score GO/NO GO : [XX]/100
Détail scores :
  - Fit produit : [X]/25
  - Delivery : [X]/15
  - Risque contractuel : [X]/15
  - Marge : [X]/20
  - Compétitivité : [X]/10
  - Intérêt stratégique : [X]/15
Décision : [GO / NO GO / GO conditionnel]
Conditions (si GO conditionnel) : [liste]
Validé par : Said KHAYAT | Auto (score > 80)

---

## Phase 2b — Stratégie de réponse
Date : YYYY-MM-DD HH:MM
Agent : a00b-bid-strategist
Pondération extraite : Technique [X]% / Prix [X]%
Angle retenu : [angle]
Phrase fil rouge : "[phrase]"
Différenciateurs : [D1] | [D2] | [D3]
Risques identifiés : [R1] | [R2]
Source pondération : [RC section X / Estimation]
Décision : [STRATEGIE VALIDEE / EN ATTENTE SAID]

---

## Phase 3 — Matrice de conformité
Date : YYYY-MM-DD HH:MM
Agent : a02-requirements-miner + a03-evidence-librarian + a04-compliance-lead
Exigences extraites : [N] REQ
  - OK : [N] ([X]%)
  - PARTIEL : [N] ([X]%)
  - NON : [N] ([X]%)
  - A_CONFIRMER : [N] ([X]%)
Exigences MUST avec statut NON : [liste ou "aucune"]
Points A_CONFIRMER remontés à Said : [liste ou "aucun"]
Preuves cartographiées : [N]/[N] REQ couvertes

---

## Phase 4 — Rédaction mémoire technique
Date : YYYY-MM-DD HH:MM
Agent : a07-writer
Sections rédigées : [N]/[N]
Mots totaux : ~[N]
Sections avec A_CONFIRMER dans le texte : [liste]
Déviations CCTP : [liste ou "aucune"]
FleetWatcher détecté et corrigé : [N occurrences / "aucune"]

---

## Phase 5-6 — DQE + Admin
Date : YYYY-MM-DD HH:MM
Agent : a06-project-manager
DQE complété : ✅ / ❌ ([raison])
Admin checklist : [N]/[N] pièces disponibles
Pièces manquantes : [liste ou "aucune"]
Actions SAID requises : [liste ou "aucune"]

---

## Phase 7 — QA Red Team
Date : YYYY-MM-DD HH:MM
Agent : a08-qa-red-team
Résultat QA : GO_DEPOT ✅ / BLOQUANT ❌
Points bloquants : [liste ou "aucun"]
Avertissements : [liste ou "aucun"]
Taux couverture REQ : [X]%
FleetWatcher scan : PROPRE ✅ / [N] occurrences trouvées ❌

---

## Phase 8 — Export
Date : YYYY-MM-DD HH:MM
Livrables produits : [liste fichiers]
Annexes sélectionnées : [liste]
Taille dossier remise : [X Mo]
STATUT FINAL : PRÊT POUR DÉPÔT ✅

---
*Fin du journal de décision — [RÉFÉRENCE AO]*
```

---

## Règles de traçabilité

1. L'orchestrateur **ajoute une entrée** à chaque fin de phase, jamais en milieu
2. Les décisions de Said KHAYAT sont **toujours nominativement journalisées**
3. Les `A_CONFIRMER` remontés mais non résolus sont listés en rouge dans la QA
4. Le TRACE.md est **archivé dans le dossier remise/** comme pièce interne
5. En cas de révision d'un dossier : rechercher les décisions précédentes dans TRACE.md avant de modifier

---

*Schéma v3.0 — AO Factory — Geoloc Systems*
