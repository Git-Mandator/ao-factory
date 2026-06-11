# PHASE 7 — QA Finale + Production Remise

> Agent producteur : **`a08-qa-red-team`** (appel DIRECT — les wrappers `bid-manager`/`evidence-builder` ne sont plus invoqués par l'orchestrateur depuis la v3.6.3)
> ⛔ Phase bloquante — le dossier ne peut pas être soumis tant que la QA n'est pas 100% verte.
> Si bloquants corrigeables → **Phase 7bis** (boucle a07↔a08, max 3 itérations — cf. a00-orchestrator).

---

## ✅ Contrôles QA obligatoires

### Branding
- [ ] Aucune occurrence de "FleetWatcher" dans le dossier (remplacé par "SuperFleet")
- [ ] Logo et nom "Geoloc Systems" cohérents partout

### Anti-hallucination
- [ ] Chaque chiffre cité est sourcé dans la knowledge base
- [ ] Aucune certification inventée (ISO 27001 Geoloc ≠ certif AWS/OVH — distinguer clairement)
- [ ] Aucune fonctionnalité fictive (catalogue fonctionnel uniquement)
- [ ] Hébergement écrit "100% UE — AWS Frankfurt (DE) + OVH Gravelines (FR)" — jamais "datacenter en France" seul
- [ ] Aucune mention `A_CONFIRMER` non résolue dans le mémoire final
- [ ] CAN-BUS mentionné uniquement avec condition de compatibilité véhicule

### Conformité formelle
- [ ] Tous les critères du RC ont une section dédiée dans le mémoire (structure miroir grille RC)
- [ ] Pondération des critères respectée (sections les plus longues = critères les plus pondérés)
- [ ] **Volume du mémoire ≥ 5 500 mots** (cible 6 000-8 000) — compté avec `wc -w`, pas estimé (cf. a08 §6bis)
- [ ] Toutes les annexes citées dans le mémoire sont incluses dans le dossier
- [ ] Format de fichier conforme aux exigences RC (PDF, Word, taille max, etc.)
- [ ] Date limite de remise vérifiée et respectée

### Administratif
- [ ] `ADMIN_CHECKLIST.md` complète → toutes les pièces ✅ présentes
- [ ] Attestation RC AXA valide jusqu'au 01/01/2027 ✅ incluse
- [ ] GONOGO.json présent et en statut GO ou GO_SOUS_CONDITIONS

### Format QA_CHECKLIST.md à produire

```markdown
# QA_CHECKLIST — [RÉFÉRENCE MARCHÉ] — [DATE QA]

## Branding
- [x] FleetWatcher absent ✅
- [ ] ❌ Logo incorrect → corriger avant envoi

## Anti-hallucination
- [x] Tous les chiffres sourcés ✅
- [x] Hébergement = "100% UE" ✅
- [ ] ❌ REQ-014 : mention A_CONFIRMER non résolue → escalader à Said KHAYAT

## Conformité formelle
- [x] Tous critères RC couverts ✅
- [x] Annexes toutes présentes ✅

## Statut global : 🟡 EN COURS — 2 points bloquants à résoudre
```

---

## 📦 PRODUCTION DU DOSSIER REMISE (après QA verte)

### Structure du dossier final

```
REPONSE/
├── synthese/                     ← SYNTH_AO.md + EXIGENCES.json
├── gonogo/                       ← GONOGO.json
├── matrice-conformite/           ← MATRICE_CONFORMITE.md
├── memoire-technique/            ← MEMOIRE_TECHNIQUE.md
├── pricing/                      ← DQE_PRICING.xlsx + PRICING_ALERTS.md
├── admin/                        ← ADMIN_CHECKLIST.md
├── qa/                           ← QA_CHECKLIST.md
└── remise/                       ← Dossier final à remettre
    ├── AO_META.md
    ├── MEMOIRE_TECHNIQUE_[ACHETEUR].docx
    ├── MATRICE_CONFORMITE_[ACHETEUR].docx
    ├── ADMIN_CHECKLIST_[ACHETEUR].docx
    ├── QA_CHECKLIST_[ACHETEUR].docx
    ├── DQE_PRICING_[ACHETEUR].xlsx
    ├── LISEZ_MOI.md
    └── annexes/
        ├── 09-attestation-rc-axa-2026.pdf
        └── [autres pièces disponibles]
```

### Procédure de production des .docx

> ⚠️ **CHARTE OFFICIELLE v1.0 (fév. 2026) — geoloc-brand skill**
> Lire le skill `docx` (anthropic-skills:docx) AVANT d'écrire le moindre script.
> NE PLUS utiliser l'ancienne palette `#1F3864 / #2E75B6 / #D6E4F7` ni la police Arial
> (la palette officielle est `#1565C0 / #F1F5F9` + Calibri — cf. bloc ci-dessous).

```bash
# 1. Scripts JS (bibliothèque docx npm v9+ — installée globalement)
#
#    PALETTE OFFICIELLE (geoloc-brand v1.0) :
#    const BLUE       = "1565C0";   // Primary — titres, en-têtes tableau, barre en-tête
#    const BLUE_LIGHT = "F1F5F9";   // Muted — lignes paires des tableaux
#    const WHITE      = "FFFFFF";   // Texte sur fond bleu
#    const DARK       = "1F2937";   // Foreground — corps de texte
#    const MUTED      = "64748B";   // Texte secondaire, footers
#    const BORDER     = "E2E8F0";   // Bordures de tableaux
#    const WARN       = "FBBC04";   // Accent warning — blocs [A_CONFIRMER]
#
#    Police     : Calibri (size en half-points : 24=12pt, 36=18pt, 48=24pt)
#    Page       : A4 (11906 × 16838 DXA) — Marges 1134 DXA (~2cm)
#    En-tête    : fond #1565C0, texte blanc, "SuperFleet — By Geoloc Systems | [Marché]"
#    Pied page  : bordure top #E2E8F0, "SuperFleet — By Geoloc Systems | Page X"
#    Tableaux   : TOUJOURS columnWidths + width par cellule (WidthType.DXA uniquement)
#    ShadingType: TOUJOURS ShadingType.CLEAR (jamais SOLID)

# 2. Générer et valider
node gen_memoire.js
node gen_dqe_admin.js
# Validation : via le script validate.py du skill docx si présent dans l'environnement ;
# sinon, ouvrir chaque .docx généré (unzip -l + relecture) avant copie dans remise/

# 3. Copier dans remise/ (nommage selon RC — vérifier si un préfixe candidat est exigé, ex. GEOLOC_)
cp MEMOIRE_TECHNIQUE.docx  "remise/MEMOIRE_TECHNIQUE_[ACHETEUR].docx"
cp DQE_PRICING.docx        "remise/DQE_PRICING_[ACHETEUR].docx"
cp ADMIN_CHECKLIST.docx    "remise/ADMIN_CHECKLIST_[ACHETEUR].docx"

# 4. Créer remise/LISEZ_MOI.md avec la liste des pièces manquantes pour Said KHAYAT
#    (ne JAMAIS y copier INDEX-ANNEXES.md tel quel — c'est un document interne)
```

### Livrables

| # | Fichier remise | Source | Format |
|---|---|---|---|
| R1 | `MEMOIRE_TECHNIQUE_[ACHETEUR].docx` | `memoire-technique/MEMOIRE_TECHNIQUE.md` | .docx (docx npm) |
| R2 | `MATRICE_CONFORMITE_[ACHETEUR].docx` | `matrice-conformite/MATRICE_CONFORMITE.md` | .docx (docx npm) |
| R3 | `ADMIN_CHECKLIST_[ACHETEUR].docx` | `admin/ADMIN_CHECKLIST.md` | .docx (docx npm) |
| R4 | `QA_CHECKLIST_[ACHETEUR].docx` | `qa/QA_CHECKLIST.md` | .docx (docx npm) |
| R5 | `DQE_PRICING_[ACHETEUR].xlsx` | `pricing/DQE_PRICING.xlsx` | .xlsx (copie directe) |
| R6 | `annexes/` | RC AXA + pièces dispo | PDF (copie directe) |
