const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak, LevelFormat,
  TableOfContents, ExternalHyperlink, ImageRun
} = require('docx');
const fs = require('fs');

// ─── COULEURS SUPERFLEET ────────────────────────────────────────────────────
const C = {
  BLEU_FONCE:  "1F3864",
  BLEU_MED:    "2E75B6",
  BLEU_LIGHT:  "D6E4F7",
  BLEU_ALT:    "EBF3FB",
  BLANC:       "FFFFFF",
  GRIS:        "F5F5F5",
  GRIS_MED:    "CCCCCC",
  GRIS_TEXTE:  "444444",
  VERT_OK:     "1E7E34",
  ORANGE_WARN: "856404",
  OR:          "856404",
};

const PAGE_W = 11906; // A4
const MARGIN  = 1134; // ~2 cm
const CONTENT_W = PAGE_W - MARGIN * 2; // ~9638

const brd = (color = C.GRIS_MED, size = 4) => ({
  top:    { style: BorderStyle.SINGLE, size, color },
  bottom: { style: BorderStyle.SINGLE, size, color },
  left:   { style: BorderStyle.SINGLE, size, color },
  right:  { style: BorderStyle.SINGLE, size, color },
});

const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

// ─── HELPERS ────────────────────────────────────────────────────────────────
function cell(text, opts = {}) {
  const {
    bold = false, color = "000000", fill, cols = 1, width,
    align = AlignmentType.LEFT, valign = VerticalAlign.CENTER,
    size = 18, italic = false, colSpan
  } = opts;
  return new TableCell({
    columnSpan: colSpan || cols,
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    verticalAlign: valign,
    borders: brd(),
    margins: cellMargins,
    shading: fill ? { fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    children: [new Paragraph({
      alignment: align,
      spacing: { before: 0, after: 0 },
      children: [new TextRun({ text: String(text), bold, color, size, italics: italic, font: "Arial" })]
    })]
  });
}

function hdrCell(text, width, colSpan) {
  return cell(text, { bold: true, fill: C.BLEU_MED, color: C.BLANC, width, colSpan, size: 18, align: AlignmentType.CENTER });
}

function subHdrCell(text, width) {
  return cell(text, { bold: true, fill: C.BLEU_FONCE, color: C.BLANC, width, size: 17 });
}

function altCell(text, width, rowIdx = 0, opts = {}) {
  return cell(text, { fill: rowIdx % 2 === 0 ? C.BLEU_ALT : C.BLANC, width, ...opts });
}

function p(text, opts = {}) {
  const { bold = false, size = 20, color = "000000", spacing = { before: 80, after: 80 },
    align = AlignmentType.LEFT, indent, italic = false } = opts;
  return new Paragraph({
    alignment: align, spacing, indent,
    children: [new TextRun({ text, bold, size, color, font: "Arial", italics: italic })]
  });
}

function h1(text, addBreak = false) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: addBreak,
    spacing: { before: 300, after: 120 },
    children: [new TextRun({ text, bold: true, size: 28, color: C.BLEU_FONCE, font: "Arial" })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, size: 24, color: C.BLEU_MED, font: "Arial" })]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 140, after: 60 },
    children: [new TextRun({ text, bold: true, size: 20, color: C.BLEU_FONCE, font: "Arial", underline: {} })]
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 20, font: "Arial" })]
  });
}

function separator() {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.BLEU_MED, space: 1 } },
    children: []
  });
}

function sectionTitle(title) {
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    shading: { fill: C.BLEU_FONCE, type: ShadingType.CLEAR, color: "auto" },
    children: [new TextRun({ text: "  " + title, bold: true, size: 24, color: C.BLANC, font: "Arial" })]
  });
}

// ─── TABLES HELPER ──────────────────────────────────────────────────────────
function infoTable(rows) {
  // rows: [{label, value}]
  const labelW = 3000, valueW = CONTENT_W - 3000;
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [labelW, valueW],
    rows: rows.map((r, i) => new TableRow({
      children: [
        cell(r.label, { bold: true, fill: C.BLEU_LIGHT, width: labelW, size: 18 }),
        cell(r.value, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: valueW, size: 18 }),
      ]
    }))
  });
}

function engagementsTable(rows) {
  const col1 = 4200, col2 = CONTENT_W - 4200;
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [col1, col2],
    rows: [
      new TableRow({ children: [hdrCell("Engagement", col1), hdrCell("Valeur", col2)] }),
      ...rows.map((r, i) => new TableRow({
        children: [
          cell(r[0], { bold: true, fill: i % 2 === 0 ? C.BLEU_ALT : C.BLANC, width: col1, size: 18 }),
          cell(r[1], { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: col2, size: 18, bold: true }),
        ]
      }))
    ]
  });
}

// ─── DOCUMENT ────────────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: C.BLEU_FONCE },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: C.BLEU_MED },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 20, bold: true, font: "Arial", color: C.BLEU_FONCE },
        paragraph: { spacing: { before: 140, after: 60 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 900, hanging: 270 } } } },
      ]},
    ]
  },

  sections: [
    // ══════════════════════════════════════════════════════════════
    // PAGE DE COUVERTURE
    // ══════════════════════════════════════════════════════════════
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: 16838 },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN }
        }
      },
      children: [
        // Bandeau supérieur
        new Paragraph({
          spacing: { before: 0, after: 0 },
          shading: { fill: C.BLEU_FONCE, type: ShadingType.CLEAR, color: "auto" },
          children: [new TextRun({ text: "  GEOLOC SYSTEMS — RÉPONSE À APPEL D'OFFRES", bold: true, size: 22, color: C.BLANC, font: "Arial" })]
        }),
        new Paragraph({ spacing: { before: 800, after: 0 }, children: [] }),

        // Acheteur
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 40 },
          children: [new TextRun({ text: "SIRTOM", bold: true, size: 28, color: C.BLEU_MED, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 40 },
          children: [new TextRun({ text: "Secteur de Briey, Vallée de l'Orne et du Jarnisy", size: 22, color: C.GRIS_TEXTE, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 40 },
          children: [new TextRun({ text: "29, rue Gustave Eiffel — 54800 JARNY", size: 20, color: C.GRIS_TEXTE, font: "Arial" })]
        }),

        new Paragraph({ spacing: { before: 400, after: 0 }, children: [] }),
        separator(),
        new Paragraph({ spacing: { before: 400, after: 0 }, children: [] }),

        // Titre principal
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 80 },
          children: [new TextRun({ text: "MÉMOIRE TECHNIQUE", bold: true, size: 52, color: C.BLEU_FONCE, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 200 },
          children: [new TextRun({ text: "Note méthodologique", size: 28, color: C.BLEU_MED, font: "Arial", italics: true })]
        }),

        // Objet
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 60 },
          shading: { fill: C.BLEU_LIGHT, type: ShadingType.CLEAR, color: "auto" },
          children: [new TextRun({ text: "Fourniture, installation et maintenance d'un système de géolocalisation", bold: true, size: 24, color: C.BLEU_FONCE, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 60 },
          shading: { fill: C.BLEU_LIGHT, type: ShadingType.CLEAR, color: "auto" },
          children: [new TextRun({ text: "et de gestion de flotte des véhicules de collecte des déchets", bold: true, size: 24, color: C.BLEU_FONCE, font: "Arial" })]
        }),

        new Paragraph({ spacing: { before: 200, after: 0 }, children: [] }),

        // Référence marché
        infoTable([
          { label: "Référence marché", value: "Marché n° 2/2026 — Réf. MP43040917" },
          { label: "Date limite de remise", value: "11 mars 2026 à 12h00" },
          { label: "Procédure", value: "Procédure adaptée (MAPA)" },
          { label: "Durée du marché", value: "60 mois (5 ans) — prix fermes" },
        ]),

        new Paragraph({ spacing: { before: 300, after: 0 }, children: [] }),

        // Soumissionnaire
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 40 },
          children: [new TextRun({ text: "Soumissionnaire", bold: true, size: 22, color: C.BLEU_MED, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 20 },
          children: [new TextRun({ text: "SARL GEOLOC SYSTEMS", bold: true, size: 28, color: C.BLEU_FONCE, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 20 },
          children: [new TextRun({ text: "14 rue de Mantes — 92700 Colombes", size: 20, color: C.GRIS_TEXTE, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 20 },
          children: [new TextRun({ text: "SIRET : 450 808 878 00026", size: 20, color: C.GRIS_TEXTE, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 20 },
          children: [new TextRun({ text: "contact@geoloc-systems.fr | https://geoloc-systems.com", size: 20, color: C.BLEU_MED, font: "Arial" })]
        }),

        new Paragraph({ spacing: { before: 300, after: 0 }, children: [] }),
        separator(),
        new Paragraph({ spacing: { before: 100, after: 0 }, children: [] }),

        // Mot du directeur
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 0, after: 60 },
          shading: { fill: C.GRIS, type: ShadingType.CLEAR, color: "auto" },
          children: [new TextRun({ text: "« En tant que directeur, je tiens à vous assurer personnellement de notre détermination à faire de votre projet une réussite. Notre équipe multidisciplinaire est prête à vous offrir un accompagnement sur-mesure. Nous comprenons l'importance de cet appel d'offres pour le SIRTOM. Je m'engage à mettre en œuvre toutes les ressources et compétences nécessaires pour garantir son succès. »", size: 19, color: C.GRIS_TEXTE, italics: true, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { before: 0, after: 0 },
          shading: { fill: C.GRIS, type: ShadingType.CLEAR, color: "auto" },
          children: [new TextRun({ text: "Said KHAYAT — Co-fondateur, 22 ans d'expérience en télématique embarquée", bold: true, size: 18, color: C.BLEU_FONCE, font: "Arial" })]
        }),

        new Paragraph({ spacing: { before: 300, after: 0 }, children: [] }),
        // Bandeau inférieur
        new Paragraph({
          spacing: { before: 0, after: 0 },
          shading: { fill: C.BLEU_FONCE, type: ShadingType.CLEAR, color: "auto" },
          children: [new TextRun({ text: `  Document établi le 24 février 2026  |  Validité de l'offre : 90 jours`, size: 18, color: C.BLANC, font: "Arial" })]
        }),
      ]
    },

    // ══════════════════════════════════════════════════════════════
    // SOMMAIRE + CORPS DU DOCUMENT
    // ══════════════════════════════════════════════════════════════
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: 16838 },
          margin: { top: MARGIN + 400, bottom: MARGIN + 400, left: MARGIN + 200, right: MARGIN + 200 }
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              spacing: { before: 0, after: 0 },
              border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.BLEU_MED } },
              children: [
                new TextRun({ text: "Geoloc Systems", bold: true, size: 18, color: C.BLEU_FONCE, font: "Arial" }),
                new TextRun({ text: "  |  Mémoire technique — SIRTOM Marché n° 2/2026", size: 17, color: C.GRIS_TEXTE, font: "Arial" }),
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              spacing: { before: 0, after: 0 },
              border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.BLEU_MED } },
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: "SuperFleet by Geoloc Systems  |  Page ", size: 17, color: C.GRIS_TEXTE, font: "Arial" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 17, color: C.BLEU_MED, bold: true, font: "Arial" }),
              ]
            })
          ]
        })
      },
      children: [

        // ─── SOMMAIRE ───────────────────────────────────────────
        new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: false,
          spacing: { before: 0, after: 160 },
          children: [new TextRun({ text: "Sommaire", bold: true, size: 28, color: C.BLEU_FONCE, font: "Arial" })]
        }),
        new TableOfContents("Sommaire", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({ children: [new PageBreak()] }),

        // ══════════════════════════════════════════════════════
        // PARTIE 1 — COMPRÉHENSION DU BESOIN
        // ══════════════════════════════════════════════════════
        h1("1. Compréhension du besoin et contexte"),
        h2("1.1 Notre compréhension de votre projet"),
        p("Le SIRTOM du secteur de Briey, Vallée de l'Orne et du Jarnisy gère un parc de 29 véhicules de collecte des déchets ménagers composé de quatre typologies distinctes aux exigences opérationnelles différenciées.", { spacing: { before: 80, after: 80 } }),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [2200, 1400, 5038],
          rows: [
            new TableRow({ children: [
              hdrCell("Type de véhicule", 2200),
              hdrCell("Quantité", 1400),
              hdrCell("Exigences principales", 5038),
            ]}),
            new TableRow({ children: [
              cell("BOM 26 tonnes", { fill: C.BLEU_ALT, bold: true, width: 2200, size: 18 }),
              cell("16", { fill: C.BLANC, align: AlignmentType.CENTER, width: 1400, size: 18 }),
              cell("Guidage conducteurs, suivi modes collecte, capteurs benne, communication conducteur, anomalies", { fill: C.BLANC, width: 5038, size: 18 }),
            ]}),
            new TableRow({ children: [
              cell("Ampliroll 26t+", { fill: C.BLANC, bold: true, width: 2200, size: 18 }),
              cell("4", { fill: C.BLEU_ALT, align: AlignmentType.CENTER, width: 1400, size: 18 }),
              cell("Suivi GPS, consommation, km, rapports d'activités", { fill: C.BLEU_ALT, width: 5038, size: 18 }),
            ]}),
            new TableRow({ children: [
              cell("Tracteurs FMA 44t", { fill: C.BLEU_ALT, bold: true, width: 2200, size: 18 }),
              cell("4", { fill: C.BLANC, align: AlignmentType.CENTER, width: 1400, size: 18 }),
              cell("Suivi GPS, consommation, km, rapports d'activités", { fill: C.BLANC, width: 5038, size: 18 }),
            ]}),
            new TableRow({ children: [
              cell("Véhicules légers", { fill: C.BLANC, bold: true, width: 2200, size: 18 }),
              cell("5", { fill: C.BLEU_ALT, align: AlignmentType.CENTER, width: 1400, size: 18 }),
              cell("Suivi km et trajectoires journalières", { fill: C.BLEU_ALT, width: 5038, size: 18 }),
            ]}),
            new TableRow({ children: [
              cell("TOTAL", { fill: C.BLEU_FONCE, bold: true, color: C.BLANC, width: 2200, size: 18 }),
              cell("29", { fill: C.BLEU_FONCE, bold: true, color: C.BLANC, align: AlignmentType.CENTER, width: 1400, size: 18 }),
              cell("+ 1 boîtier supplémentaire optionnel (acquisition)", { fill: C.BLEU_FONCE, color: C.BLANC, width: 5038, size: 18 }),
            ]}),
          ]
        }),

        p(""),
        h2("1.2 Nos engagements fondamentaux"),
        p("Geoloc Systems répond à ce besoin avec trois engagements clés :", { spacing: { before: 60, after: 60 } }),

        engagementsTable([
          ["① Couverture fonctionnelle complète", "90,5 % des exigences CCTP couvertes — 0 refus"],
          ["② Déploiement rapide et maîtrisé", "29 véhicules opérationnels en 28 jours calendaires"],
          ["③ Réactivité de maintenance garantie", "Intervention sous 48 heures — stock +1 000 boîtiers"],
        ]),

        // ══════════════════════════════════════════════════════
        // PARTIE 2 — SOLUTION SUPERFLEET
        // ══════════════════════════════════════════════════════
        h1("2. Présentation de la solution SuperFleet", true),
        h2("2.1 Architecture générale"),
        p("SuperFleet est une plateforme SaaS de gestion de flotte éditée et exploitée en propre par Geoloc Systems depuis plus de 22 ans. Conçue sur une architecture web moderne (React/TypeScript, PostgreSQL, Edge Functions), elle est hébergée intégralement en Union Européenne, sur les infrastructures OVH à Gravelines (France)."),
        p("SuperFleet est accessible depuis tout navigateur web (PC, tablette) sans installation logicielle, ainsi que depuis une application mobile iOS et Android pour les gestionnaires et conducteurs terrain."),

        h2("2.2 Fonctionnalités couvertes pour les BOM (16 véhicules)"),
        h3("2.2.1 Guidage conducteurs remplaçants"),
        p("L'application mobile SuperFleet permet d'afficher les zones de collecte préprogrammées sur une carte interactive. Le conducteur remplaçant visualise sur son smartphone ou tablette la ou les zones qui lui sont attribuées, avec les délimitations géographiques et les points d'intérêt associés (dépôt, déchetteries, zones spécifiques). Les zones sont configurées par les gestionnaires du SIRTOM depuis l'interface web SuperFleet sans intervention de notre part après la formation initiale."),

        h3("2.2.2 Données de collecte BOM"),
        p("SuperFleet restitue, par véhicule et par période, l'ensemble des indicateurs demandés :"),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [3000, 1000, 5638],
          rows: [
            new TableRow({ children: [
              hdrCell("Donnée", 3000), hdrCell("Statut", 1000), hdrCell("Détail technique", 5638)
            ]}),
            ...[
              ["Consommation carburant", "✅ OK", "Lecture CAN-Bus native via Teltonika FMC130 — données constructeur directes sans capteur additionnel"],
              ["Kilométrage", "✅ OK", "Kilométrage officiel CAN-Bus — le plus précis disponible"],
              ["Vitesse et régime moteur", "✅ OK", "Graphiques temporels interactifs — zoom, export PDF/Excel"],
              ["Trajectoires — 4 modes séparés", "✅ OK*", "Arrêt moteur éteint / Collecte marche AV / Collecte marche AR / Transit — via I/O benne (PTO)"],
              ["Diagrammes et rapports d'activités", "✅ OK", "Générés automatiquement, envoi email programmable, comparaison inter-véhicules"],
              ["Anomalies de collecte", "✅ OK", "Remontée depuis app conducteur avec géolocalisation et horodatage"],
              ["Marche-arrières", "✅ OK", "Détection GPS + accéléromètre — événements listés"],
              ["Entrées / sorties de zones", "✅ OK", "Alertes temps réel, historique consultable et exportable"],
              ["États des capteurs benne", "✅ OK*", "Capteurs lèvre/compacteur/hayon raccordés aux entrées DIN du FMC130"],
              ["Points d'arrêt de collecte", "✅ OK", "Identification automatique, corrélation avec zones définies"],
            ].map(([d, s, t], i) => new TableRow({
              children: [
                cell(d, { fill: i % 2 === 0 ? C.BLEU_ALT : C.BLANC, width: 3000, size: 17 }),
                cell(s, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, bold: true, color: C.VERT_OK, align: AlignmentType.CENTER, width: 1000, size: 17 }),
                cell(t, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 5638, size: 17 }),
              ]
            }))
          ]
        }),
        p("* Sous réserve de disponibilité des sorties électriques (PTO ou capteurs) sur les bennes du SIRTOM — validé lors du cadrage technique préalable.", { italic: true, size: 17, spacing: { before: 40, after: 80 } }),

        h3("2.2.3 Communication bidirectionnelle avec les conducteurs"),
        p("Le module messagerie intégré de SuperFleet permet une communication en temps réel entre le PC central du SIRTOM et les conducteurs équipés de l'application mobile :"),
        bullet("Envoi de messages texte dans les deux sens avec accusé de lecture"),
        bullet("Messages géolocalisés et horodatés"),
        bullet("Menu de signalement préprogrammé configurable : bac défectueux, déchets non conformes, voie inaccessible, besoin d'assistance, etc."),
        bullet("Remontée immédiate vers le gestionnaire avec position GPS du signalement"),

        h2("2.3 Fonctionnalités Ampliroll, FMA et véhicules légers"),
        p("Pour les Ampliroll (4 véhicules) et les tracteurs FMA (4 véhicules) : suivi GPS temps réel, consommation CAN-Bus, kilométrage, graphiques vitesse et régime moteur, trajectoires avec replay, diagrammes d'activités, gestion des entrées/sorties de zones."),
        p("Pour les véhicules légers (5 VL) : suivi GPS temps réel, kilométrage, trajectoires journalières avec replay."),

        h2("2.4 Vue cartographique temps réel — Toute la flotte"),
        p("La page d'accueil SuperFleet affiche en temps réel la position de l'ensemble des 29 véhicules sur une carte. Chaque véhicule est représenté avec son icône personnalisée, sa vitesse instantanée, son état et sa dernière adresse connue. La mise à jour est paramétrable (30 secondes par défaut, jusqu'à 10 secondes)."),

        // ══════════════════════════════════════════════════════
        // PARTIE 3 — MATÉRIEL
        // ══════════════════════════════════════════════════════
        h1("3. Matériel embarqué et déploiement terrain", true),
        h2("3.1 Boîtiers sélectionnés par type de véhicule"),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [2500, 2500, 3638],
          rows: [
            new TableRow({ children: [
              hdrCell("Véhicule", 2500), hdrCell("Boîtier Teltonika", 2500), hdrCell("Justification", 3638)
            ]}),
            ...[
              ["BOM (16 véhicules)", "FMC130", "CAN-Bus natif + 6 entrées DIN (capteurs benne & PTO) + accéléromètre (marche-arrière) + 4G"],
              ["Ampliroll (4 véhicules)", "FTC920", "Standard poids lourds robuste, CAN-Bus, 4G pérenne"],
              ["Tracteurs FMA (4 véhicules)", "FTC920", "Idem Ampliroll — adapté aux grands ensembles articulés"],
              ["Véhicules légers (5 VL)", "FTC920", "Standard VL, CAN-Bus disponible, déploiement rapide"],
            ].map(([v, b, j], i) => new TableRow({
              children: [
                cell(v, { bold: true, fill: i % 2 === 0 ? C.BLEU_ALT : C.BLANC, width: 2500, size: 17 }),
                cell(b, { bold: true, color: C.BLEU_MED, fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 2500, size: 17 }),
                cell(j, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 3638, size: 17 }),
              ]
            }))
          ]
        }),

        p(""),
        p("Teltonika est le leader européen de la télématique embarquée. La gamme 4G/5G garantit une pérennité technologique sans risque d'obsolescence réseau et une durée de vie matériel de 10 ans avec pièces de rechange disponibles."),

        h2("3.2 Installation sans perçage"),
        p("Tous les boîtiers Geoloc Systems sont installés sans perçage de carrosserie, en respectant l'intégrité des véhicules. Le câblage est réalisé sous gaine protégée, raccordé directement sur les connecteurs constructeur existants. Aucune modification irréversible n'est effectuée."),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [3200, 5438],
          rows: [
            new TableRow({ children: [hdrCell("Type", 3200), hdrCell("Durée d'installation", 5438)] }),
            new TableRow({ children: [
              cell("BOM (avec câblage I/O benne)", { fill: C.BLEU_ALT, bold: true, width: 3200, size: 18 }),
              cell("30 à 45 minutes par véhicule", { width: 5438, size: 18 }),
            ]}),
            new TableRow({ children: [
              cell("Ampliroll, FMA, VL", { fill: C.BLANC, bold: true, width: 3200, size: 18 }),
              cell("20 à 30 minutes par véhicule", { fill: C.BLEU_ALT, width: 5438, size: 18 }),
            ]}),
          ]
        }),

        h2("3.3 Tablette conducteur (BOM)"),
        p("Pour les 16 BOM, nous proposons une tablette Android robuste fixée sur support magnétique amovible dans la cabine. L'application SuperFleet conducteur est pré-installée et paramétrée avec les zones de collecte du SIRTOM. La tablette est incluse dans l'offre de location-maintenance."),

        // ══════════════════════════════════════════════════════
        // PARTIE 4 — INFRASTRUCTURE & SÉCURITÉ
        // ══════════════════════════════════════════════════════
        h1("4. Infrastructure technique et sécurité", true),
        h2("4.1 Hébergement souverain 100 % Union Européenne"),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [2800, 2000, 1800, 2038],
          rows: [
            new TableRow({ children: [
              hdrCell("Données", 2800), hdrCell("Hébergeur", 2000), hdrCell("Localisation", 1800), hdrCell("Certification", 2038)
            ]}),
            ...[
              ["Données clients, positions, trajectoires", "OVH", "🇫🇷 Gravelines, France", "ISO 27001, HDS"],
              ["Données boîtiers télématiques", "Gurtam / Flespi", "🇱🇹 Lituanie, UE", "RGPD conforme"],
              ["Authentification et contrôle d'accès", "OVH", "🇫🇷 France", "ISO 27001"],
              ["Cartographie (Leaflet/OSM)", "OVH", "🇫🇷 France", "ISO 27001"],
            ].map(([d, h, l, c], i) => new TableRow({
              children: [
                cell(d, { fill: i % 2 === 0 ? C.BLEU_ALT : C.BLANC, width: 2800, size: 17 }),
                cell(h, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, bold: true, width: 2000, size: 17 }),
                cell(l, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 1800, size: 17 }),
                cell(c, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 2038, size: 17 }),
              ]
            }))
          ]
        }),

        p("Aucun transfert de données hors Union Européenne. Aucune dépendance au Cloud Act américain.", { bold: true, spacing: { before: 60, after: 60 } }),

        h2("4.2 Sécurité des données"),
        bullet("Chiffrement au repos : AES-256"),
        bullet("Chiffrement en transit : TLS 1.3"),
        bullet("Isolation multi-tenant : Row Level Security PostgreSQL — les données du SIRTOM sont strictement cloisonnées"),
        bullet("Authentification JWT avec expiration et gestion des droits par profil"),

        h2("4.3 Conformité RGPD"),
        p("SuperFleet est conforme aux recommandations CNIL sur la géolocalisation des salariés : finalité limitée aux heures de travail et aux véhicules professionnels, information des conducteurs facilitée (modèles de documents fournis), accès restreint aux données de localisation, durée de conservation paramétrable (12 mois par défaut)."),

        h2("4.4 Disponibilité et Plan de Continuité"),
        engagementsTable([
          ["Disponibilité annuelle garantie", "99,9 % (< 8h45 d'indisponibilité par an)"],
          ["RPO — Perte de données maximale", "< 1 heure"],
          ["RTO — Délai maximal de remise en service", "< 4 heures"],
          ["Sauvegardes automatiques", "Quotidiennes — rétention 30 jours"],
          ["Monitoring", "24h/7j — alertes automatiques"],
        ]),

        // ══════════════════════════════════════════════════════
        // PARTIE 5 — MÉTHODOLOGIE
        // ══════════════════════════════════════════════════════
        h1("5. Méthodologie de déploiement en 5 phases", true),
        p("Engagement Geoloc Systems : 100 % de la flotte opérationnelle dans les 28 jours calendaires suivant la notification du marché.", { bold: true, spacing: { before: 80, after: 120 } }),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [2600, 1400, 5038],
          rows: [
            new TableRow({ children: [
              hdrCell("Phase", 2600), hdrCell("Timing", 1400), hdrCell("Contenu", 5038)
            ]}),
            ...[
              ["Phase 1 — Cadrage & audit parc", "Semaine 1", "Réunion de lancement à Jarny — recueil liste 29 véhicules, validation planning, identification capteurs benne BOM, import SuperFleet"],
              ["Phase 2 — Paramétrage plateforme", "Semaine 1", "Arborescence par type, import véhicules/conducteurs, zones de collecte, alertes, droits utilisateurs, menu signalement conducteur"],
              ["Phase 3 — Déploiement pilote", "Semaine 2", "5 BOM + 2 VL — vérification GPS, CAN-Bus, I/O capteurs, communication conducteur, replay. Validation SIRTOM avant généralisation"],
              ["Phase 4 — Déploiement généralisé", "Semaines 2–3", "22 véhicules restants (10 à 15/jour selon disponibilité) — 2 à 3 journées terrain — contrôle immédiat post-installation"],
              ["Phase 5 — Formation & réception", "Semaine 4", "Sessions par profil (Admin 2h / Gestionnaire 1h30 / Conducteur 30 min) — livraison supports — PV de réception"],
            ].map(([ph, t, c], i) => new TableRow({
              children: [
                cell(ph, { bold: true, fill: i % 2 === 0 ? C.BLEU_ALT : C.BLANC, width: 2600, size: 17 }),
                cell(t, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, align: AlignmentType.CENTER, width: 1400, size: 17 }),
                cell(c, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 5038, size: 17 }),
              ]
            }))
          ]
        }),

        // ══════════════════════════════════════════════════════
        // PARTIE 6 — FORMATION
        // ══════════════════════════════════════════════════════
        h1("6. Formation et accompagnement"),
        h2("6.1 Programme par profil"),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [2400, 1200, 1600, 4038],
          rows: [
            new TableRow({ children: [
              hdrCell("Profil", 2400), hdrCell("Participants", 1200), hdrCell("Durée", 1600), hdrCell("Contenu principal", 4038)
            ]}),
            ...[
              ["Administrateurs SIRTOM", "4 responsables", "2 heures", "Gestion droits, zones, alertes, import/export, supervision flotte"],
              ["Gestionnaires de flotte", "4 responsables", "1h30", "Suivi tournées, rapports, signalements, replay de trajet, extraction données"],
              ["Conducteurs / Personnel terrain", "15 conducteurs", "30 minutes", "Application mobile : zones de collecte, signalement anomalies, messagerie"],
            ].map(([prof, part, dur, cont], i) => new TableRow({
              children: [
                cell(prof, { bold: true, fill: i % 2 === 0 ? C.BLEU_ALT : C.BLANC, width: 2400, size: 17 }),
                cell(part, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, align: AlignmentType.CENTER, width: 1200, size: 17 }),
                cell(dur, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, align: AlignmentType.CENTER, width: 1600, size: 17 }),
                cell(cont, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 4038, size: 17 }),
              ]
            }))
          ]
        }),

        p(""),
        h2("6.2 Supports pédagogiques fournis"),
        bullet("Guides utilisateurs PDF par profil (version imprimable)"),
        bullet("Affichettes plastifiées en cabine : marche à suivre simplifiée pour les conducteurs"),
        bullet("Tutoriels vidéo accessibles depuis la plateforme SuperFleet"),
        bullet("Formation de remise à niveau incluse sans surcoût en cas de renouvellement de personnel"),

        // ══════════════════════════════════════════════════════
        // PARTIE 7 — SLA & SUPPORT
        // ══════════════════════════════════════════════════════
        h1("7. SLA, support et continuité de service", true),
        h2("7.1 Niveaux de support"),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [1800, 2800, 1800, 3238],
          rows: [
            new TableRow({ children: [
              hdrCell("Priorité", 1800), hdrCell("Déclencheur", 2800), hdrCell("Prise en charge", 1800), hdrCell("Résolution", 3238)
            ]}),
            ...[
              ["P1 — Critique", "Plateforme inaccessible", "< 2 heures ouvrées", "< 4 heures ouvrées"],
              ["P2 — Panne boîtier", "Boîtier hors service", "< 24 heures", "< 48 heures calendaires ✅"],
              ["P3 — Question", "Question utilisateur", "< 1 jour ouvré", "< 2 jours ouvrés"],
            ].map(([p, d, pc, r], i) => new TableRow({
              children: [
                cell(p, { bold: true, fill: i % 2 === 0 ? C.BLEU_ALT : C.BLANC, width: 1800, size: 17 }),
                cell(d, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 2800, size: 17 }),
                cell(pc, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, align: AlignmentType.CENTER, width: 1800, size: 17 }),
                cell(r, { bold: true, fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 3238, size: 17 }),
              ]
            }))
          ]
        }),

        p(""),
        h2("7.2 Engagement maintenance 48h et pénalités"),
        p("Geoloc Systems s'engage formellement sur le délai de 48 heures calendaires pour tout dépannage ou remplacement de boîtier défaillant. En cas de dépassement, la mensualité afférente au véhicule concerné sera suspendue au prorata des jours d'indisponibilité, conformément aux exigences du CCTP."),
        p("Le remplacement est assuré depuis notre stock permanent de +1 000 boîtiers disponibles immédiatement — aucun délai d'approvisionnement."),

        h2("7.3 Garanties matériel"),
        bullet("Garantie totale : boîtier embarqué, carte SIM, câblage d'alimentation principal — remplacement intégral à charge de Geoloc Systems"),
        bullet("Garantie partielle : accessoires soumis à usure normale — remplacement à prix coûtant"),

        h2("7.4 Réversibilité en fin de marché"),
        bullet("Reprise intégrale de tous les boîtiers à charge exclusive de Geoloc Systems"),
        bullet("Export complet des données (Excel, CSV, JSON) — intégralité de l'historique du marché"),
        bullet("Suppression des données hébergées sous 1 mois avec PV daté et certificat de suppression"),
        bullet("Accompagnement à la transition vers un éventuel nouveau prestataire"),

        // ══════════════════════════════════════════════════════
        // PARTIE 8 — ÉQUIPE
        // ══════════════════════════════════════════════════════
        h1("8. Organisation et moyens humains dédiés", true),
        p("Geoloc Systems mobilise une équipe multidisciplinaire placée sous la Direction de projet de Said KHAYAT, véritable chef d'orchestre du marché."),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [2800, 3038, 3000],
          rows: [
            new TableRow({ children: [
              hdrCell("Intervenant", 2800), hdrCell("Rôle & mission", 3038), hdrCell("Disponibilité", 3000)
            ]}),
            ...[
              ["Said KHAYAT\nCo-fondateur, 22 ans d'exp.", "Direction de projet — Garant des engagements contractuels. Interlocuteur Direction SIRTOM. Préside les comités de suivi.", "Hebdomadaire + réunions clés"],
              ["Mustapha KHEROUA\nIng. Efrei, 10+ ans", "Référent logiciel & support — Configuration SuperFleet, modules BOM, support N2/N3. A piloté GEODECISION avec ENEDIS.", "100% déploiement puis appui continu"],
              ["Clément NOEL & Walid KHEROUA\n12 et 10 ans d'exp.", "Installation & maintenance terrain — Installation des 29 véhicules, maintenance sous 48h, remplacement boîtiers.", "100% installation puis < 48h/intervention"],
              ["Samia MAKHLOUF\n13 ans d'exp.", "Formation — Conception et animation des sessions par profil (Admin, Gestionnaire, Conducteur), supports pédagogiques.", "100% formation puis à la demande"],
              ["Smael KESSOURI & Coumba MBENGUE\nDG + Resp. Qualité", "Administration & qualité — Suivi admin du marché, facturation, indicateurs qualité, reporting contractuel.", "Soutien permanent — site Aix-en-Provence"],
            ].map(([interv, role, dispo], i) => new TableRow({
              children: [
                cell(interv, { bold: true, fill: i % 2 === 0 ? C.BLEU_ALT : C.BLANC, width: 2800, size: 17 }),
                cell(role, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 3038, size: 17 }),
                cell(dispo, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 3000, size: 17 }),
              ]
            }))
          ]
        }),

        // ══════════════════════════════════════════════════════
        // PARTIE 9 — RÉFÉRENCES
        // ══════════════════════════════════════════════════════
        h1("9. Références clients"),
        p("Fort de plus de vingt ans d'expérience en télématique embarquée, Geoloc Systems gère un parc actif de +10 000 véhicules sur toute la France, pour des clients allant de 10 à 1 500 véhicules."),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [2400, 2000, 4238],
          rows: [
            new TableRow({ children: [
              hdrCell("Référent", 2400), hdrCell("Secteur", 2000), hdrCell("Particularité", 4238)
            ]}),
            ...[
              ["Commune de Martigues", "Collectivité territoriale", "Référence secteur public local — gestion de flotte municipale"],
              ["ENEDIS", "Énergie / Services publics", "Client de référence stratégique — flotte d'intervention nationale"],
              ["ADANEV", "Transport de personnes", "1 500 véhicules gérés — la plus grande flotte Geoloc"],
              ["Transalys Service", "Transport / Services", "Client de référence longue durée"],
            ].map(([ref, sec, part], i) => new TableRow({
              children: [
                cell(ref, { bold: true, fill: i % 2 === 0 ? C.BLEU_ALT : C.BLANC, width: 2400, size: 17 }),
                cell(sec, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 2000, size: 17 }),
                cell(part, { fill: i % 2 === 0 ? C.BLANC : C.BLEU_ALT, width: 4238, size: 17 }),
              ]
            }))
          ]
        }),

        // ══════════════════════════════════════════════════════
        // PARTIE 10 — RSE
        // ══════════════════════════════════════════════════════
        h1("10. RSE et transition énergétique"),
        p("SuperFleet contribue directement aux objectifs de réduction de l'empreinte carbone du SIRTOM :"),
        bullet("Réduction kilométrique : -10 à -15 % des km dès la première année grâce à l'optimisation des tournées (retours d'expérience clients)"),
        bullet("Éco-conduite : analyse des comportements à risque (accélérations brusques, freinages, vitesses excessives, ralentis prolongés) avec scoring conducteur"),
        bullet("Reporting CO2 : estimation des émissions par véhicule et par service, intégrable au bilan carbone du SIRTOM"),
        bullet("Matériel responsable : boîtiers certifiés RoHS, durée de vie 10 ans, câblage optimisé, emballages recyclables"),
        bullet("Recyclage DEEE : reprise et recyclage certifiés de tous les équipements en fin de vie"),
        bullet("Infrastructure éco-responsable : serveurs OVH en énergie renouvelable, virtualisation et mutualisation des ressources"),
        bullet("Sobriété numérique : fréquence GPS calibrée à 30 secondes, échanges compressés"),
        p("Notre ambition : conjuguer performance technologique et éthique écologique, pour une gestion de flotte de collecte responsable et durable.", { italic: true, bold: true, spacing: { before: 100, after: 80 } }),

        // ══════════════════════════════════════════════════════
        // SYNTHÈSE DES ENGAGEMENTS
        // ══════════════════════════════════════════════════════
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("SYNTHÈSE DES ENGAGEMENTS GEOLOC SYSTEMS"),
        p(""),
        engagementsTable([
          ["Délai de mise en service", "28 jours calendaires (4 semaines)"],
          ["Délai de maintenance", "48 heures calendaires"],
          ["Disponibilité plateforme", "99,9 %"],
          ["Couverture CCTP", "90,5 % — 18 exigences sur 20 couvertes"],
          ["Stock boîtiers disponibles", "+1 000 unités immédiatement"],
          ["Durée de vie matériel", "10 ans"],
          ["Hébergement", "100 % Union Européenne"],
          ["Transfert données hors UE", "Aucun"],
        ]),

        p(""),
        separator(),
        p(""),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 40 },
          children: [new TextRun({ text: "SARL Geoloc Systems — SIRET 450 808 878 00026 — 14 rue de Mantes, 92700 Colombes", size: 17, color: C.GRIS_TEXTE, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 100 },
          children: [new TextRun({ text: "contact@geoloc-systems.fr | https://geoloc-systems.com", size: 17, color: C.BLEU_MED, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 60 },
          children: [new TextRun({ text: "Lu et approuvé,", size: 20, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 20 },
          children: [new TextRun({ text: "Le ___/___/2026 à ___________", size: 20, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 0 },
          children: [new TextRun({ text: "Said KHAYAT — Co-fondateur — Geoloc Systems", bold: true, size: 20, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 200 },
          children: [new TextRun({ text: "(Cachet et signature)", size: 18, color: C.GRIS_TEXTE, font: "Arial", italics: true })]
        }),
      ]
    }
  ]
});

const OUT = "/sessions/modest-laughing-knuth/mnt/Appels-Offres/En-cours/2026-02-24_SIRTOM/REPONSE/remise/MEMOIRE_TECHNIQUE_SIRTOM.docx";
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(OUT, buf); console.log("✅ " + OUT); });
