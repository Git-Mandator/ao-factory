---
name: geoloc-brand
version: "3.6.0"
domain: GEOLOC_SYSTEMS_CORE
language: fr
description: >
  Identité visuelle et charte graphique Geoloc Systems / SuperFleet pour tous les documents produits.
  Utiliser pour : appliquer la charte graphique SuperFleet à un document Word, PowerPoint ou PDF,
  vérifier la conformité visuelle d'un livrable, choisir les bonnes couleurs et polices pour une
  présentation, produire un en-tête ou pied de page branded, styliser un tableau ou une slide.
  Déclencher dès que la conversation porte sur mise en page, charte, couleurs, logo, branding,
  design, template, style, présentation visuelle ou conformité graphique Geoloc/SuperFleet.
knowledge_base:
  - docs/DESIGN_SYSTEM_SUPERFLEET.md
delegates_to:
  - docx
  - pptx
  - theme-factory
---

# Skill : Charte Graphique Geoloc Systems / SuperFleet

## Description

Garant de l'identité visuelle Geoloc Systems sur tous les livrables produits par AI-SAID-OS.
Applique le design system SuperFleet extrait du code source geoloc-systems.com (v1.0, 22 fév. 2026).
S'active en combinaison avec les skills `docx`, `pptx`, `pdf` ou `theme-factory` selon le support.

---

## ⚠️ Règles de branding impératives

1. **Nom de marque** : `SuperFleet` (avec capital S et F) + `By Geoloc` en sous-titre
2. **FleetWatcher est INTERDIT** dans tout document — remplacer par `SuperFleet` systématiquement
3. **Pas de dark mode** dans les documents — thème clair exclusivement
4. **Maximum 4 couleurs thématiques** dans un même document ou slide
5. **JAMAIS de rouge** pour illustrer des problèmes sur les pages produit — utiliser amber/slate
6. **Esthétique B2B premium** — sobre, professionnelle, pas de dégradés flashy
7. **Logo** : utiliser `superfleet-logo.svg` (fond clair) ou `superfleet-logo-white.svg` (fond sombre)

---

## 🎨 Palette officielle

### Couleurs primaires

| Token | HEX | Usage documents |
|---|---|---|
| **Primary** | `#1565C0` | Titres principaux, en-têtes, barres de couleur, CTA |
| **Primary Brand** | `#4285F4` | Accents visuels, éléments actifs, icônes |
| **Primary Dark** | `#1A73E8` | Hover, dégradés secondaires |
| **Secondary (Succès)** | `#34A853` | Checkmarks ✅, statuts OK, validation, badges éco |
| **Accent (Warning)** | `#FBBC04` | Points de vigilance ⚠️, alertes douces, highlights |

### Neutres

| Token | HEX | Usage documents |
|---|---|---|
| **Background** | `#FFFFFF` | Fond principal de tous les documents |
| **Foreground** | `#1F2937` | Texte courant — corps de texte |
| **Muted** | `#F1F5F9` | Fonds de tableaux alternés, sections grises |
| **Muted-foreground** | `#64748B` | Texte secondaire, descriptions |
| **Border** | `#E2E8F0` | Bordures de tableaux, séparateurs |

### Couleurs sectorielles (use cases)

| Secteur | Couleur | Usage |
|---|---|---|
| Transport & Logistique | Bleu `#2563EB` | Documents transport, slides secteur |
| BTP & Construction | Amber `#D97706` | Documents BTP, chantier |
| Collectivités | Teal `#0D9488` | Documents marchés publics |
| Services & Interventions | Vert `#16A34A` | Documents services |
| Livraison & E-commerce | Rose `#E11D48` | Documents livraison |
| Maintenance & SAV | Violet `#7C3AED` | Documents maintenance |

### Couleurs modules SuperFleet

| Module | HEX | Token couleur |
|---|---|---|
| Géolocalisation | `#4285F4` | Bleu |
| Maintenance | `#8B5CF6` | Violet |
| Tachygraphe | `#14B8A6` | Teal |
| IRVE / Électrique | `#06B6D4` | Cyan |
| Autopartage | `#0EA5E9` | Sky blue |
| IA SuperFleet | `#A855F7` | Purple |

---

## 🔤 Typographie

| Support | Police principale | Fallback | Usage |
|---|---|---|---|
| **PPTX** | Calibri | Arial | Toutes présentations |
| **DOCX** | Calibri | Arial | Tous documents Word |
| **PDF** | Calibri ou Inter | Arial | Selon outil de production |
| **Web / HTML** | Inter | system-ui, sans-serif | Interfaces et rapports HTML |

### Hiérarchie typographique documents (DOCX/PPTX)

| Niveau | Taille | Graisse | Couleur |
|---|---|---|---|
| **Titre principal** | 24–28pt | Bold | `#1565C0` |
| **Titre section (H2)** | 18–22pt | Bold | `#1565C0` |
| **Sous-titre (H3)** | 14–16pt | Semibold | `#1F2937` |
| **Corps de texte** | 11–12pt | Regular | `#1F2937` |
| **Texte secondaire** | 9–10pt | Regular | `#64748B` |
| **Caption / label** | 8–9pt | Regular | `#64748B` |

---

## 📄 Spécifications documents

### DOCX (mémoires techniques, propositions commerciales)

```
Page        : A4 (11906 × 16838 DXA) — Marges 1134 DXA (~2cm)
En-tête     : Logo SuperFleet (gauche) + nom du document (droite) — fond #1565C0, texte blanc
Pied de page: Numérotation centée + "SuperFleet — By Geoloc Systems" — bordure supérieure #E2E8F0
Titres H1   : Calibri 24pt bold, couleur #1565C0
Titres H2   : Calibri 18pt bold, couleur #1565C0, bordure inférieure #E2E8F0
Corps texte : Calibri 12pt, couleur #1F2937, interligne 1.15
Tableaux    : En-tête #1565C0 texte blanc | lignes alternées #FFFFFF / #F1F5F9
```

### PPTX (présentations, pitchs, AO)

```
Dimensions  : 16:9 standard (33.87 × 19.05 cm)
Slide titre : Fond #1565C0, titre blanc 36pt bold, sous-titre #4285F4 italic
Slide contenu : Fond #FFFFFF, titre #1565C0 28pt bold, corps #1F2937 18pt
Slide section : Fond #F1F5F9, titre #1565C0 centré
Accent bars : Bande colorée gauche 4px #4285F4 sur slides de contenu
Logo        : superfleet-logo-white.svg sur slides sombres, superfleet-logo.svg sur claires
```

### Tableaux (tous supports)

```
En-tête     : Fond #1565C0, texte blanc Calibri bold
Ligne paire : Fond #F1F5F9
Ligne impaire : Fond #FFFFFF
Bordures    : #E2E8F0, 0.5pt
Texte cellule : Calibri 11pt, #1F2937
```

---

## 🔗 Intégration avec les skills de production

### Avec `docx` (Anthropic skill)

Quand `docx` produit un `.docx` pour Geoloc Systems :
1. Police : `Calibri` (fallback Arial) — PAS Times New Roman ni Helvetica
2. Couleur heading : `#1565C0` dans le script JS
3. Tableau header : `#1565C0` fond, `#FFFFFF` texte
4. Marges A4 : `1134 DXA` (~2cm) sur les 4 côtés
5. Pied de page : numéros de page + mention "SuperFleet — By Geoloc Systems"

### Avec `pptx` (Anthropic skill)

Quand `pptx` produit un `.pptx` pour Geoloc Systems :
1. Slide maître : fond `#FFFFFF`, accents `#1565C0`
2. Titre placeholder : Calibri 36pt bold `#1565C0`
3. Corps placeholder : Calibri 18pt `#1F2937`
4. Slide de couverture : fond `#1565C0`, texte blanc
5. Palette JSON à injecter dans le thème XML

### Avec `theme-factory` (Anthropic skill)

Thème Geoloc Systems à créer :
- **Nom** : `geoloc-superfleet`
- **Primary** : `#1565C0`
- **Secondary** : `#34A853`
- **Accent** : `#FBBC04`
- **Background** : `#FFFFFF`
- **Font** : Calibri / Inter

---

## 📊 Format de sortie QA branding

Quand invoqué pour vérifier un document existant, produire :

```
🎨 QA BRANDING — [NOM DOCUMENT] — [DATE]

✅ / ❌  FleetWatcher absent : [OUI/NON]
✅ / ❌  Couleur titres = #1565C0 : [OUI/NON → couleur trouvée]
✅ / ❌  Police = Calibri/Arial : [OUI/NON → police trouvée]
✅ / ❌  Fond = blanc #FFFFFF : [OUI/NON]
✅ / ❌  Tableaux = charte OK : [OUI/NON]
✅ / ❌  Logo SuperFleet présent : [OUI/NON]
✅ / ❌  Max 4 couleurs dans le doc : [OUI/NON → nombre trouvé]

🔴 NON-CONFORMITÉS :
→ [liste des corrections à apporter]

🟢 STATUT : [CONFORME / NON CONFORME — X corrections requises]
```

---

## ⚠️ Note sur les anciennes couleurs AO

> Des documents antérieurs (ao-response-factory phase 7) mentionnent des couleurs de l'ancienne charte :
> `BLEU_FONCE #1565C0 | BLEU_MED #4285F4 | BLEU_LIGHT #F1F5F9`
>
> Ces valeurs sont **obsolètes**. La charte officielle (design system v1.0, fév. 2026) remplace ces codes.
> Utiliser désormais : **Primary `#1565C0`** — Brand ref `#4285F4` — Muted `#F1F5F9`
>
> → Mettre à jour `skills/ao-response-factory/phases/phase7-qa-remise.md` lors
>   de la prochaine révision de la phase 7.

---

## Source de référence

Toujours consulter le fichier source avant modification :
`docs/DESIGN_SYSTEM_SUPERFLEET.md` (v1.0 — 22 fév. 2026 — extrait code source geoloc-systems.com)

---

## Mises à jour v3.5 — charte graphique codifiée

### Palette officielle (à utiliser dans tous les visuels et documents)

| Couleur | Code hex | Usage |
|---|---|---|
| Bleu marine principal | `#1E3A8A` | Titres, en-têtes, accent corporate |
| Bleu clair | `#3B82F6` | Surlignage, lignes décoratives |
| Teal accent | `#0F766E` | Validation, RSE, sous-titres |
| Teal clair | `#14B8A6` | Hover, secondaire |
| Orange accent | `#F59E0B` | Client, alerte modérée |
| Rouge accent | `#B91C1C` | Alerte forte, priorité |
| Vert succès | `#10B981` | Validation, OK, RSE |
| Gris foncé | `#374151` | Texte courant |
| Gris clair | `#9CA3AF` | Texte secondaire |
| Light fond | `#F1F5F9` | Zebrage tableaux |
| Violet (Teltonika) | `#5B2A86` | Fournisseur |

### Typographie

- **Police principale (docx)** : Calibri (compatible MS Office)
- **Police visuels (Python/PIL)** : DejaVu Sans (équivalent Arial sur Linux)

### Format mémoire technique

- **Format papier** : A4 (210 × 297 mm)
- **Marges** : 0,8 inch (≈ 2 cm) — 1134 DXA dans docx-js
- **En-tête** : `Geoloc Systems · Marché XX.XXX · LOT X — Objet` (italique bleu marine, séparateur ligne bleue)
- **Pied de page** : `Geoloc Systems SAS — Mémoire technique LOT X — Mois Année · Page N / Total` (gris)
- **Hauteur de ligne** : standard
- **Espacement avant titre H1** : 360 DXA
- **Espacement avant titre H2** : 280 DXA

### Logos officiels

- `assets/logos/logo_superfleet.png` (SuperFleet By Geoloc, fond transparent)
- `assets/logos/logo_geoloc_systems.png` (à compléter selon disponibilité)

### Format des en-têtes d'annexe

```
Annexe XX — [TITRE]  (bandeau séparateur bleu marine + bordure bottom 12 pt)
```
