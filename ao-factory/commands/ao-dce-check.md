---
description: Inventaire DCE rapide — liste manquants et questions ciblées
allowed-tools: Read, Glob, Grep, Write
argument-hint: [dossier ou chemin des documents DCE]
---

Effectue une vérification complète du DCE fourni dans : $ARGUMENTS

## 1. Détection et inventaire des documents

Recherche dans le dossier indiqué (ou le répertoire courant) tous les fichiers PDF, DOCX, XLSX.
Pour chaque fichier trouvé, détermine sa nature :

| Type | Indicateurs de détection |
|------|--------------------------|
| **RC** — Règlement de Consultation | "règlement", "RC", "modalités de candidature", "critères de sélection" |
| **CCTP** — Clauses Techniques | "CCTP", "cahier des clauses techniques", "spécifications", "exigences fonctionnelles" |
| **CCAP** — Clauses Administratives | "CCAP", "clauses administratives", "pénalités", "délais contractuels" |
| **DQE/BPU** — Tarification | "DQE", "BPU", "bordereau", "prix unitaires", "devis quantitatif" |
| **AE** — Acte d'Engagement | "acte d'engagement", "candidat soussigné", "offre de prix" |
| **Annexes** | Tous autres documents |

## 2. Affichage du rapport d'inventaire

```
📦 INVENTAIRE DCE — [RÉFÉRENCE MARCHÉ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Documents trouvés :
✅ RC   — [nom_fichier.pdf] — [taille]
✅ CCTP — [nom_fichier.pdf] — [pages estimées]
❌ DQE  — MANQUANT
⚠️ CCAP — [nom_fichier.pdf] — ⚠️ à vérifier

Statut global : [COMPLET | INCOMPLET — X documents manquants]

Documents manquants bloquants :
→ [liste]

Documents manquants importants :
→ [liste]

Questions à poser à l'acheteur avant remise :
1. [question issue des points ambigus détectés]
2. ...

Prochaine étape recommandée : /ao-gonogo pour démarrer l'analyse
```

## 3. Extraction des métadonnées clés (si documents lisibles)

Si les fichiers sont lisibles, extraire :
- Référence du marché
- Acheteur (pouvoir adjudicateur)
- Date limite de dépôt des offres
- Nombre de lots
- Volume estimé (nombre de véhicules)
- Critères de notation (pondération technique/prix)
