# PHASES 1 & 2 — Analyse DCE + GO / NO GO

> Rôle activé : **Analyste AO** + **Décideur GO/NO GO** → skill `cctp-analyzer`

---

## 📋 PHASE 1 — Analyse du DCE

### Tâches

1. Lire RC, CCTP, CCAP
2. Extraire les métadonnées (acheteur, objet, procédure, date limite, volumes)
3. Identifier la structure de notation : critères + pondération + sous-critères
4. Lister toutes les exigences CCTP sous format `REQ-XXX`
5. Classifier : BLOQUANT / FORT / MOYEN / FAIBLE
6. Détecter les clauses éliminatoires et risques contractuels
7. Produire les questions de clarification (si ambiguïtés)

### Livrable

Produire `synthese/SYNTH_AO.md` + `synthese/EXIGENCES.json`

---

## 🟢 PHASE 2 — GO / NO GO ⚠️ ÉTAPE NON CONTOURNABLE

> **Cette étape ne peut jamais être sautée.** Tout GO doit être documenté dans `gonogo/GONOGO.json`.

### Matrice de scoring (100 pts)

| Axe | Poids | Questions clés |
|---|---|---|
| **Fit produit** | 25 pts | SuperFleet couvre > 80% des exigences ? ANTAI demandé ? |
| **Capacité delivery** | 15 pts | Délai réalisable ? Équipe disponible ? Zone géographique OK ? |
| **Risque contractuel** | 15 pts | Pénalités raisonnables ? SLA atteignables ? Clauses abusives ? |
| **Marge estimée** | 20 pts | Prix cible réaliste ? TCO hardware + SaaS couvert ? |
| **Compétitivité** | 10 pts | Concurrents identifiés ? Références Geoloc similaires ? |
| **Intérêt stratégique** | 15 pts | Secteur cible ? Référence valorisable ? Effet levier ? |

### Règles de décision

| Score | Décision | Action |
|---|---|---|
| ≥ 75 | ✅ **GO** | Démarrer Phase 3 immédiatement |
| 60–74 | ⚠️ **GO_SOUS_CONDITIONS** | Lister les conditions + soumettre à Said KHAYAT |
| < 60 | ❌ **NO_GO** | Archiver, documenter les raisons, ne pas poursuivre |
| Bloquant critique détecté | ❌ **NO_GO automatique** | Quelle que soit la note totale |

### Bloquants critiques automatiques (NO_GO immédiat)

- Délai de déploiement impossible (ex : < 1 semaine pour > 100 véhicules)
- Certification exigée non détenue par Geoloc (ex : HDS obligatoire)
- Volume < 10 véhicules → non rentable économiquement
- Zone géographique hors périmètre d'intervention
- Exigence matérielle impossible à tenir (ex : protocole propriétaire exclusif)

### Livrable

Produire `gonogo/GONOGO.json`
