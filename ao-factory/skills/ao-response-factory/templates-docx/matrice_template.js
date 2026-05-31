const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak, LevelFormat
} = require('docx');
const fs = require('fs');

const OUT = '/sessions/modest-laughing-knuth/mnt/Appels-Offres/En-cours/2026-02-24_SIRTOM/REPONSE/remise/MATRICE_CONFORMITE_SIRTOM.docx';

// Colors
const C = {
  BLEU_FONCE: "1565C0",
  BLEU_MED: "4285F4",
  BLEU_LIGHT: "F1F5F9",
  BLEU_ALT: "E2E8F0",
  VERT: "375623",
  VERT_LIGHT: "E2EFDA",
  ORANGE: "C55A11",
  ORANGE_LIGHT: "FCE4D6",
  ROUGE: "C00000",
  ROUGE_LIGHT: "FFCCCC",
  GRIS: "F5F5F5",
  GRIS_DARK: "404040",
  BLANC: "FFFFFF",
};

const PAGE_W = 16838; // A4 landscape
const PAGE_H = 11906;
const MARGIN = 720; // 0.5 inch
const CONTENT_W = PAGE_W - 2 * MARGIN; // 15398

// Helper: thin border
const border = (color) => ({ style: BorderStyle.SINGLE, size: 4, color: color || "CCCCCC" });
const allBorders = (color) => ({ top: border(color), bottom: border(color), left: border(color), right: border(color) });

// Cell factory
function cell(text, opts = {}) {
  const { w, bg, bold, color, align, italic, wrap, vAlign, fontSize } = opts;
  return new TableCell({
    width: w ? { size: w, type: WidthType.DXA } : undefined,
    borders: allBorders(opts.borderColor || "CCCCCC"),
    shading: bg ? { fill: bg, type: ShadingType.CLEAR } : undefined,
    verticalAlign: vAlign || VerticalAlign.CENTER,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [new Paragraph({
      alignment: align || AlignmentType.LEFT,
      children: [new TextRun({
        text: String(text),
        bold: bold || false,
        italics: italic || false,
        color: color || "000000",
        font: "Arial",
        size: fontSize || 16,
      })]
    })]
  });
}

function hcell(text, w) {
  return cell(text, { w, bg: C.BLEU_FONCE, bold: true, color: C.BLANC, align: AlignmentType.CENTER, borderColor: C.BLEU_FONCE, fontSize: 17 });
}

// Status cell
function statusCell(status, w) {
  let bg, color, label;
  if (status === 'OK') { bg = C.VERT_LIGHT; color = C.VERT; label = '✓ OK'; }
  else if (status === 'PARTIEL') { bg = C.ORANGE_LIGHT; color = C.ORANGE; label = '~ PARTIEL'; }
  else if (status === 'NON') { bg = C.ROUGE_LIGHT; color = C.ROUGE; label = '✗ NON'; }
  else { bg = C.BLEU_ALT; color = C.BLEU_MED; label = '? A CONFIRMER'; }
  return cell(label, { w, bg, bold: true, color, align: AlignmentType.CENTER, fontSize: 16 });
}

// Header
function makeHeader() {
  return new Header({
    children: [
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.BLEU_MED, space: 2 } },
        children: [
          new TextRun({ text: "MATRICE DE CONFORMITÉ — SIRTOM Marché n° 2/2026 — MP43040917", bold: true, font: "Arial", size: 18, color: C.BLEU_FONCE }),
          new TextRun({ text: "\t", font: "Arial", size: 18 }),
          new TextRun({ text: "Geoloc Systems / SuperFleet", font: "Arial", size: 16, color: C.GRIS_DARK }),
        ],
        tabStops: [{ type: "right", position: 15398 }]
      })
    ]
  });
}

function makeFooter() {
  return new Footer({
    children: [
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.BLEU_MED, space: 2 } },
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "CONFIDENTIEL — Usage interne — Geoloc Systems — 24/02/2026 — Page ", font: "Arial", size: 14, color: C.GRIS_DARK }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 14, color: C.GRIS_DARK }),
        ]
      })
    ]
  });
}

// Column widths (landscape A4, total 15398)
// REQ | Exigence | Statut | Réponse Geoloc | Risque
const COL = [900, 3200, 1400, 7398, 2500];

// Matrix data
const MATRIX = [
  {
    req: "REQ-001", exigence: "Guidage conducteurs remplaçants sur zones de collecte préprogrammées (tablette/app)",
    status: "OK",
    reponse: "SuperFleet App iOS/Android : affichage des zones de collecte préprogrammées sur carte interactive. Le conducteur remplaçant visualise sa zone d'intervention en temps réel. Les tournées sont définies sous forme de zones géographiques paramétrables.",
    risque: "—"
  },
  {
    req: "REQ-002", exigence: "Restitution consommation par véhicule (BOM)",
    status: "OK",
    reponse: "Lecture CAN-Bus native via boîtier Teltonika FMC130 : consommation réelle issue du calculateur moteur, sans capteur additionnel. Disponible dans les rapports par véhicule sur SuperFleet.",
    risque: "Sous réserve compatibilité CAN constructeur BOM"
  },
  {
    req: "REQ-003", exigence: "Restitution km parcourus (tous véhicules)",
    status: "OK",
    reponse: "Kilométrage officiel via CAN-Bus natif (FMC130) ou calcul GPS (FTC920) selon disponibilité CAN. Disponible par véhicule et par période, export CSV/Excel.",
    risque: "—"
  },
  {
    req: "REQ-004", exigence: "Graphiques vitesse et régime moteur (BOM, Ampliroll, FMA)",
    status: "OK",
    reponse: "SuperFleet génère des graphiques temporels de vitesse et de régime moteur (RPM via CAN-Bus). Visualisation sur courbes interactives avec zoom. Export PDF/Excel disponible.",
    risque: "RPM via CAN — sous réserve compatibilité constructeur"
  },
  {
    req: "REQ-005", exigence: "Trajectoires BOM avec 4 modes séparés : arrêt moteur éteint / collecte marche avant / collecte marche arrière / conduite-transit",
    status: "PARTIEL",
    reponse: "SuperFleet distingue les états moteur ON/OFF et détecte les marches arrière via accéléromètre/GPS. La séparation collecte vs transit nécessite une entrée digitale I/O sur la benne (capteur PTO ou interrupteur de lèvre). Câblage inclus dans notre offre BOM.",
    risque: "A CONFIRMER : disponibilité sortie électrique sur les 16 BOM — à valider avec SIRTOM (Stéphane ZANIER 03.82.20.22.00)"
  },
  {
    req: "REQ-006", exigence: "Diagrammes et rapports d'activités (BOM, Ampliroll, FMA)",
    status: "OK",
    reponse: "SuperFleet génère des rapports d'activité automatiques : durée conduite, arrêts, kilométrage, consommation, événements. Diagrammes visuels par journée/semaine/mois. Export PDF/Excel/CSV. Envoi automatique par email programmable.",
    risque: "—"
  },
  {
    req: "REQ-007", exigence: "Anomalies de collecte (BOM)",
    status: "OK",
    reponse: "Signalement des anomalies depuis l'app mobile conducteur : menu préprogrammé (bac défectueux, déchets non conformes, accès impossible, etc.) avec horodatage et géolocalisation automatique. Remontée immédiate vers le PC central.",
    risque: "—"
  },
  {
    req: "REQ-008", exigence: "Détection marche-arrières (BOM)",
    status: "OK",
    reponse: "Détection automatique des marches arrière via GPS (inversion du vecteur vitesse) et accéléromètre intégré Teltonika. Événements enregistrés avec heure, position et durée. Rapport dédié disponible.",
    risque: "—"
  },
  {
    req: "REQ-009", exigence: "Entrées/sorties de zones (BOM, Ampliroll, FMA)",
    status: "OK",
    reponse: "Module Zones SuperFleet : définition illimitée de zones géographiques (dépôt, zones de collecte, déchetteries). Alertes en temps réel lors des franchissements. Historique des passages consultable et exportable.",
    risque: "—"
  },
  {
    req: "REQ-010", exigence: "États capteurs de benne (BOM)",
    status: "PARTIEL",
    reponse: "Lecture des états électriques des capteurs de benne (lèvre, compacteur, hayons) via entrées digitales DIN du boîtier FMC130 (6 DIN disponibles). Câblage réalisé lors de l'installation.",
    risque: "A CONFIRMER : disponibilité et accessibilité des capteurs électriques sur les 16 BOM du SIRTOM"
  },
  {
    req: "REQ-011", exigence: "Points d'arrêt de collecte (BOM)",
    status: "OK",
    reponse: "SuperFleet identifie et géolocalise automatiquement chaque arrêt véhicule avec position GPS, durée et heure. Visualisation sur carte avec historique. Corrélation avec les zones de collecte définies.",
    risque: "—"
  },
  {
    req: "REQ-012", exigence: "Trajectoires journalières Ampliroll et tracteurs FMA",
    status: "OK",
    reponse: "Traceur Teltonika FTC920 : enregistrement continu des positions GPS (paramétrable). Replay de trajet sur SuperFleet avec vitesse, accélération, arrêts.",
    risque: "—"
  },
  {
    req: "REQ-013", exigence: "Km parcourus VL",
    status: "OK",
    reponse: "Calcul kilométrique précis via GPS pour les 5 VL. Disponible par véhicule et par période.",
    risque: "—"
  },
  {
    req: "REQ-020", exigence: "Localisation instantanée de toute la flotte (temps réel)",
    status: "OK",
    reponse: "Vue cartographique en temps réel de l'ensemble de la flotte sur SuperFleet. Mise à jour toutes les 30 secondes (paramétrable). Disponible sur PC et smartphone.",
    risque: "—"
  },
  {
    req: "REQ-021", exigence: "Consultation depuis PC internet et/ou smartphone",
    status: "OK",
    reponse: "SuperFleet est une application web responsive accessible depuis tout navigateur sur PC. Application mobile iOS et Android disponible. Aucune installation logicielle requise côté client.",
    risque: "—"
  },
  {
    req: "REQ-022", exigence: "Communication bidirectionnelle PC ↔ personnel roulant",
    status: "OK",
    reponse: "Module messagerie intégré SuperFleet : envoi de messages texte gestionnaire vers conducteurs (et vice-versa). Accusé de lecture. Messages géolocalisés et horodatés.",
    risque: "—"
  },
  {
    req: "REQ-023", exigence: "Signalement anomalies via menu intuitif préprogrammé",
    status: "OK",
    reponse: "Application mobile conducteur SuperFleet : menu de signalement préprogrammé configurable par le SIRTOM. Chaque signalement est géolocalisé et remonté immédiatement au gestionnaire.",
    risque: "—"
  },
  {
    req: "REQ-024", exigence: "Maintenance/dépannage par le titulaire dans un délai de 48 heures",
    status: "OK",
    reponse: "Geoloc Systems s'engage sur un délai d'intervention de 48h calendaires max. Remplacement boîtier garanti sous 48h sur stock (+1 000 boîtiers disponibles). Équipe terrain mobilisable sur Lorraine.",
    risque: "Déplacements depuis Colombes (~320 km) — logistique à anticiper dans le prix P12"
  },
  {
    req: "REQ-025", exigence: "Suspension mensualité au prorata si indisponibilité > 48h",
    status: "OK",
    reponse: "Clause acceptée. La suspension de mensualité sera calculée au prorata des jours calendaires d'indisponibilité constatée au-delà des 48h de franchise.",
    risque: "—"
  },
  {
    req: "REQ-026", exigence: "Distinction garantie totale vs partielle",
    status: "OK",
    reponse: "Garantie totale : boîtier embarqué (remplacement à charge Geoloc). Garantie partielle : câblages et accessoires (usure normale). Détail fourni dans l'AE et le mémoire technique.",
    risque: "—"
  },
  {
    req: "REQ-027", exigence: "Mise en service dans un délai d'1 mois maximum",
    status: "OK",
    reponse: "Geoloc Systems s'engage sur 4 semaines (28 jours calendaires) à compter de la notification. Planning en 5 phases fourni dans le mémoire technique. 29 véhicules = 2-3 journées d'installation terrain.",
    risque: "—"
  },
];

// Synthèse data
const SYNTH_ROWS = [
  { label: "OK", count: 19, pct: "90,5%", bg: C.VERT_LIGHT, color: C.VERT },
  { label: "PARTIEL", count: 2, pct: "9,5%", bg: C.ORANGE_LIGHT, color: C.ORANGE },
  { label: "NON", count: 0, pct: "0%", bg: C.ROUGE_LIGHT, color: C.ROUGE },
];

function spacer(before, after) {
  return new Paragraph({ children: [], spacing: { before, after } });
}

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, font: "Arial", size: 32, bold: true, color: C.BLEU_FONCE })]
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, font: "Arial", size: 26, bold: true, color: C.BLEU_MED })]
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: { after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 20, bold: opts.bold, color: opts.color })]
  });
}

// Build matrix table rows
function buildMatrixRows() {
  const rows = [
    // Header row
    new TableRow({
      tableHeader: true,
      height: { value: 500, rule: "atLeast" },
      children: [
        hcell("REQ", COL[0]),
        hcell("Exigence CCTP", COL[1]),
        hcell("Statut", COL[2]),
        hcell("Réponse Geoloc Systems / SuperFleet", COL[3]),
        hcell("Risque / Vigilance", COL[4]),
      ]
    })
  ];

  MATRIX.forEach((row, i) => {
    const bg = i % 2 === 0 ? C.BLANC : C.GRIS;
    rows.push(new TableRow({
      height: { value: 400, rule: "atLeast" },
      children: [
        cell(row.req, { w: COL[0], bold: true, color: C.BLEU_MED, align: AlignmentType.CENTER, bg }),
        cell(row.exigence, { w: COL[1], bg, fontSize: 15 }),
        statusCell(row.status, COL[2]),
        cell(row.reponse, { w: COL[3], bg, fontSize: 15 }),
        cell(row.risque === "—" ? "—" : row.risque, { w: COL[4], bg, fontSize: 14, italic: row.risque !== "—", color: row.risque !== "—" ? C.ORANGE : "999999" }),
      ]
    }));
  });

  return rows;
}

// Synthèse table
const SYNTH_COL = [3000, 2000, 2000];
function buildSynthTable() {
  return new Table({
    width: { size: 7000, type: WidthType.DXA },
    columnWidths: SYNTH_COL,
    rows: [
      new TableRow({
        children: [
          hcell("Statut", SYNTH_COL[0]),
          hcell("Nombre", SYNTH_COL[1]),
          hcell("Couverture", SYNTH_COL[2]),
        ]
      }),
      ...SYNTH_ROWS.map(r => new TableRow({
        children: [
          cell(r.label, { w: SYNTH_COL[0], bg: r.bg, bold: true, color: r.color }),
          cell(r.count.toString(), { w: SYNTH_COL[1], bg: r.bg, bold: true, color: r.color, align: AlignmentType.CENTER }),
          cell(r.pct, { w: SYNTH_COL[2], bg: r.bg, bold: true, color: r.color, align: AlignmentType.CENTER }),
        ]
      })),
      new TableRow({
        children: [
          cell("TOTAL", { w: SYNTH_COL[0], bg: C.BLEU_LIGHT, bold: true }),
          cell("21", { w: SYNTH_COL[1], bg: C.BLEU_LIGHT, bold: true, align: AlignmentType.CENTER }),
          cell("100%", { w: SYNTH_COL[2], bg: C.BLEU_LIGHT, bold: true, align: AlignmentType.CENTER }),
        ]
      }),
    ]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: C.BLEU_FONCE },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: C.BLEU_MED },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838, orientation: "landscape" },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
      }
    },
    headers: { default: makeHeader() },
    footers: { default: makeFooter() },
    children: [
      // Title block
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.BLEU_MED, space: 4 } },
        children: [
          new TextRun({ text: "MATRICE DE CONFORMITÉ CCTP", bold: true, font: "Arial", size: 40, color: C.BLEU_FONCE }),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({ text: "SIRTOM — Secteur de Briey, Vallée de l'Orne et du Jarnisy", font: "Arial", size: 22, color: C.BLEU_MED }),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 40, after: 240 },
        children: [
          new TextRun({ text: "Marché n° 2/2026 — MP43040917 — Géolocalisation et gestion de flotte — Véhicules de collecte des déchets", font: "Arial", size: 18, color: C.GRIS_DARK }),
        ]
      }),

      // Synthèse
      heading2("Synthèse de conformité"),
      buildSynthTable(),
      spacer(160, 80),
      bodyText("Score de couverture CCTP : 90,5% — 19 exigences couvertes / 21 — 2 points partiels soumis à confirmation technique avec le SIRTOM.", { bold: true, color: C.BLEU_FONCE }),
      spacer(160, 80),

      // Main matrix heading
      heading2("Tableau de conformité détaillé"),
      spacer(80, 80),

      // Matrix table
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: COL,
        rows: buildMatrixRows()
      }),

      spacer(240, 80),

      // Points partiels detail
      heading1("Détail des points partiels et à confirmer"),

      heading2("REQ-005 — Séparation 4 modes BOM (PARTIEL / A CONFIRMER)"),
      bodyText("Exigence : Distinguer automatiquement camion arrêt moteur éteint / collecte marche avant / collecte marche arrière / conduite-transit.", { bold: true }),
      bodyText("Réponse Geoloc Systems :"),
      bodyText("L'état moteur ON/OFF est natif (CAN-Bus ou ACC). La marche arrière est détectée par GPS/accéléromètre. La distinction collecte vs transit nécessite un signal électrique de la benne (PTO prise de force, interrupteur de lèvre de chargement, ou tout autre sortie électrique disponible sur la BOM). Geoloc équipera le boîtier FMC130 (6 entrées digitales) pour lire ce signal."),
      bodyText("Action avant remise : Demander la confirmation que les 16 BOM disposent d'une sortie électrique exploitable (via Stéphane ZANIER : 03.82.20.22.00).", { bold: true, color: C.ORANGE }),
      bodyText("Formulation mémoire recommandée : \"La séparation des modes de collecte (marche avant, marche arrière) et de transit est assurée par la connexion d'une entrée digitale du boîtier au signal de prise de force (PTO) ou à tout capteur électrique disponible sur la benne. Cette installation sera validée lors du cadrage technique préalable au déploiement.\"", { italic: true }),

      spacer(120, 40),
      heading2("REQ-010 — Capteurs benne (PARTIEL / A CONFIRMER)"),
      bodyText("Exigence : Restitution des états des capteurs de la benne (lèvre de chargement, compacteur, hayons).", { bold: true }),
      bodyText("Réponse Geoloc Systems :"),
      bodyText("Techniquement faisable : chaque capteur électrique de la benne est raccordé à une entrée DIN du FMC130. SuperFleet affiche l'état de chaque capteur en temps réel et dans l'historique. Nécessite un câblage dédié lors de l'installation."),
      bodyText("Action avant remise : Confirmer avec le SIRTOM la liste des capteurs à surveiller sur les BOM (nombre de capteurs, type de signal).", { bold: true, color: C.ORANGE }),

      spacer(240, 80),

      // Stratégie
      heading1("Stratégie d'offre et différenciation"),
      bodyText("Axe de différenciation principal : Couverture fonctionnelle complète sur BOM (mode collecte, capteurs benne, communication conducteur) combinée à une expertise terrain éprouvée (déploiement 29 véhicules en 4 semaines).", { bold: true }),
      spacer(80, 40),
      bodyText("Critère Valeur technique (40%) : Maximiser la description des fonctionnalités BOM dans le mémoire — c'est là que se gagne la note. Détailler la séparation des 4 modes de trajet et la lecture des capteurs de benne."),
      spacer(40, 40),
      bodyText("Critère Délai (10%) : Proposer 4 semaines (28 jours calendaires) — meilleure note possible dans le délai CCTP (1 mois max)."),
      spacer(40, 40),

      heading2("Boîtiers recommandés par type de véhicule"),
      // Small table
      new Table({
        width: { size: 10000, type: WidthType.DXA },
        columnWidths: [2000, 2000, 6000],
        rows: [
          new TableRow({ children: [hcell("Type véhicule", 2000), hcell("Boîtier", 2000), hcell("Justification", 6000)] }),
          new TableRow({ children: [
            cell("16 BOM", { w: 2000, bg: C.BLEU_ALT, bold: true }),
            cell("Teltonika FMC130", { w: 2000, bg: C.BLEU_ALT, bold: true, color: C.BLEU_MED }),
            cell("CAN-Bus natif + 6 entrées digitales I/O + accéléromètre — lecture capteurs benne + 4 modes collecte", { w: 6000, bg: C.BLEU_ALT }),
          ]}),
          new TableRow({ children: [
            cell("4 Ampliroll", { w: 2000, bg: C.BLANC }),
            cell("Teltonika FTC920", { w: 2000, bg: C.BLANC, color: C.BLEU_MED }),
            cell("Traceur standard robuste 4G, CAN, GPS précis — suffisant pour les fonctions Ampliroll", { w: 6000, bg: C.BLANC }),
          ]}),
          new TableRow({ children: [
            cell("4 FMA", { w: 2000, bg: C.GRIS }),
            cell("Teltonika FTC920", { w: 2000, bg: C.GRIS, color: C.BLEU_MED }),
            cell("Idem Ampliroll — CAN disponible si tracteur équipé", { w: 6000, bg: C.GRIS }),
          ]}),
          new TableRow({ children: [
            cell("5 VL", { w: 2000, bg: C.BLANC }),
            cell("Teltonika FTC920 / FMT100", { w: 2000, bg: C.BLANC, color: C.BLEU_MED }),
            cell("FMT100 si OBD disponible sur VL récents (plug-and-play), FTC920 sinon", { w: 6000, bg: C.BLANC }),
          ]}),
        ]
      }),

      spacer(240, 80),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120 },
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.BLEU_MED, space: 4 } },
        children: [
          new TextRun({ text: "Document produit par AO Response Factory — SARL Geoloc Systems — 14 rue de Mantes, 92700 Colombes — 24/02/2026", font: "Arial", size: 16, color: C.GRIS_DARK, italics: true }),
        ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log('✅ ' + OUT);
});
