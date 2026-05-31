# Templates DOCX — AO Response Factory

> Version 1.1.0 — Initialisés sur le marché SIRTOM (24/02/2026)

Ces scripts Node.js servent de base pour générer les documents Word (.docx) de chaque
dossier de réponse AO. Ils utilisent la bibliothèque `docx` (npm v9+).

## Scripts disponibles

| Script | Livrable produit | Format page |
|---|---|---|
| `memoire_template.js` | `MEMOIRE_TECHNIQUE_[ACHETEUR].docx` | A4 Portrait |
| `matrice_template.js` | `MATRICE_CONFORMITE_[ACHETEUR].docx` | A4 Paysage |
| `admin_template.js` | `ADMIN_CHECKLIST_[ACHETEUR].docx` | A4 Portrait |
| `qa_template.js` | `QA_CHECKLIST_[ACHETEUR].docx` | A4 Portrait |

## Utilisation pour un nouvel AO

1. Copier les scripts dans le répertoire de travail `/sessions/<session>/`
2. Adapter les variables en début de fichier :
   - `OUT` : chemin de sortie → `remise/[NOM_LIVRABLE]_[ACHETEUR].docx`
   - `ACHETEUR` : sigle acheteur (ex : SIRTOM, ENEDIS, COMMUNE_MARTIGUES)
   - Contenu des sections : remplacer avec les données du nouvel AO depuis les phases 1–7
3. Exécuter avec `node <script>.js`
4. Valider avec `python3 .skills/skills/docx/scripts/office/validate.py <fichier>.docx`

## Palette couleurs (à ne pas modifier)

```javascript
const C = {
  BLEU_FONCE:    "1565C0",  // Titres H1, couverture
  BLEU_MED:      "4285F4",  // Titres H2, en-têtes tableaux
  BLEU_LIGHT:    "F1F5F9",  // Fonds de section
  BLEU_ALT:      "E2E8F0",  // Alternance lignes
  VERT_LIGHT:    "E2EFDA",  // Statuts OK
  ORANGE_LIGHT:  "FCE4D6",  // Statuts PARTIEL / alertes
  ROUGE_LIGHT:   "FFCCCC",  // Statuts NON / bloquants
  BLANC:         "FFFFFF",
  GRIS:          "F5F5F5",
};
```

## Standards de page

| Paramètre | Portrait | Paysage |
|---|---|---|
| Largeur (DXA) | 11906 | 16838 |
| Hauteur (DXA) | 16838 | 11906 |
| Marges (DXA) | 1134 (~2cm) | 720 (~1,27cm) |
| Police | Arial | Arial |
| Corps | 20 (10pt) | 18 (9pt) |

---

*AO Response Factory — Geoloc Systems — 24/02/2026*
