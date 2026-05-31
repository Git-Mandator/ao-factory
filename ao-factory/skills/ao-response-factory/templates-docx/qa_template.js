const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const OUT = '/sessions/modest-laughing-knuth/mnt/Appels-Offres/En-cours/2026-02-24_SIRTOM/REPONSE/remise/QA_CHECKLIST_SIRTOM.docx';

const C = {
  BLEU_FONCE: "1565C0", BLEU_MED: "4285F4", BLEU_LIGHT: "F1F5F9", BLEU_ALT: "E2E8F0",
  VERT: "375623", VERT_LIGHT: "E2EFDA",
  ORANGE: "C55A11", ORANGE_LIGHT: "FCE4D6",
  ROUGE: "C00000", ROUGE_LIGHT: "FFCCCC",
  GRIS: "F5F5F5", GRIS_DARK: "404040", BLANC: "FFFFFF",
  JAUNE: "7F6000", JAUNE_LIGHT: "FFFF99",
};

const PAGE_W = 11906;
const MARGIN = 1134;
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9638

const border = (color) => ({ style: BorderStyle.SINGLE, size: 4, color: color || "CCCCCC" });
const allBorders = (color) => ({ top: border(color), bottom: border(color), left: border(color), right: border(color) });

function cell(text, opts = {}) {
  return new TableCell({
    width: opts.w ? { size: opts.w, type: WidthType.DXA } : undefined,
    borders: allBorders(opts.borderColor || "CCCCCC"),
    shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({ text: String(text), bold: opts.bold || false, italics: opts.italic || false, color: opts.color || "000000", font: "Arial", size: opts.fontSize || 18 })]
    })]
  });
}

function hcell(text, w) {
  return cell(text, { w, bg: C.BLEU_FONCE, bold: true, color: C.BLANC, align: AlignmentType.CENTER, borderColor: C.BLEU_FONCE, fontSize: 18 });
}

function sCell(status, w) {
  const map = {
    "OK": { bg: C.VERT_LIGHT, color: C.VERT, label: "✓ OK" },
    "EN COURS": { bg: C.JAUNE_LIGHT, color: C.JAUNE, label: "~ EN COURS" },
    "INCOMPLET": { bg: C.ROUGE_LIGHT, color: C.ROUGE, label: "✗ INCOMPLET" },
    "BLOQUANT": { bg: C.ROUGE_LIGHT, color: C.ROUGE, label: "✗ BLOQUANT" },
  };
  const s = map[status] || { bg: C.GRIS, color: C.GRIS_DARK, label: status };
  return cell(s.label, { w, bg: s.bg, bold: true, color: s.color, align: AlignmentType.CENTER, fontSize: 17 });
}

function makeHeader() {
  return new Header({
    children: [new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.BLEU_MED, space: 2 } },
      children: [
        new TextRun({ text: "QA CHECKLIST — SIRTOM Marché n° 2/2026 — MP43040917", bold: true, font: "Arial", size: 18, color: C.BLEU_FONCE }),
        new TextRun({ text: "\t", font: "Arial", size: 18 }),
        new TextRun({ text: "Contrôle Qualité Final — AO Response Factory", font: "Arial", size: 16, color: C.GRIS_DARK }),
      ],
      tabStops: [{ type: "right", position: CONTENT_W }]
    })]
  });
}

function makeFooter() {
  return new Footer({
    children: [new Paragraph({
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.BLEU_MED, space: 2 } },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "CONFIDENTIEL — Geoloc Systems — AO Response Factory — 24/02/2026 — Remise : 11/03/2026 à 12h00 — Page ", font: "Arial", size: 14, color: C.GRIS_DARK }),
        new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 14, color: C.GRIS_DARK }),
      ]
    })]
  });
}

function spacer(before, after) {
  return new Paragraph({ children: [], spacing: { before, after } });
}

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, font: "Arial", size: 30, bold: true, color: C.BLEU_FONCE })] });
}

function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, font: "Arial", size: 24, bold: true, color: C.BLEU_MED })] });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 60 },
    children: [new TextRun({ text, font: "Arial", size: 20, bold: opts.bold, color: opts.color || "000000", italics: opts.italic })]
  });
}

// Check item row
function checkRow(done, text, w1, w2) {
  return new TableRow({
    children: [
      cell(done ? "✓" : "✗", { w: w1, bg: done ? C.VERT_LIGHT : C.ROUGE_LIGHT, bold: true, color: done ? C.VERT : C.ROUGE, align: AlignmentType.CENTER }),
      cell(text, { w: w2, bg: done ? C.BLANC : C.ROUGE_LIGHT, fontSize: 17 }),
    ]
  });
}

function checkTable(items, label) {
  const colW = [600, CONTENT_W - 600];
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colW,
    rows: [
      new TableRow({ tableHeader: true, children: [hcell("", colW[0]), hcell(label, colW[1])] }),
      ...items.map(item => checkRow(item.done, item.text, colW[0], colW[1])),
    ]
  });
}

// Section 1: Branding ✅
const brandingItems = [
  { done: true, text: "Aucune occurrence de \"FleetWatcher\" dans le dossier" },
  { done: true, text: "Nom \"SuperFleet\" utilisé de manière cohérente dans tous les livrables" },
  { done: true, text: "Logo et nom \"Geoloc Systems\" cohérents dans tous les documents" },
  { done: true, text: "Référence correcte : SARL Geoloc Systems — 14 rue de Mantes, 92700 Colombes" },
  { done: true, text: "SIRET correct : 450 808 878 00026" },
];

// Section 2: Anti-hallucination ✅
const antiHalluItems = [
  { done: true, text: "CA Geoloc Systems sourcé : 1 041 378 € (2021), 1 038 515 € (2022), 1 006 398 € (2023) — source profil-geoloc-systems.md" },
  { done: true, text: "Effectifs sourcés : 10 employés — source profil-geoloc-systems.md" },
  { done: true, text: "Années d'expérience : +22 ans — source profil-geoloc-systems.md" },
  { done: true, text: "Parc géré : +10 000 véhicules — source profil-geoloc-systems.md" },
  { done: true, text: "ADANEV : 1 500 véhicules — source profil-geoloc-systems.md" },
  { done: true, text: "Stock boîtiers : +1 000 — source profil-geoloc-systems.md" },
  { done: true, text: "SLA disponibilité : 99,9% — source superfleet-fiche-technique-securite-conformite.md" },
  { done: true, text: "RPO < 1h / RTO < 4h — source superfleet-fiche-technique-securite-conformite.md" },
  { done: true, text: "Hébergement : OVH Gravelines (France) + Gurtam (Lituanie, UE) — 100% RGPD, hors Cloud Act" },
  { done: true, text: "Chiffrement AES-256 + TLS 1.3 — source superfleet-fiche-technique-securite-conformite.md" },
  { done: true, text: "Certifications ISO 27001 : attribuées à OVH/AWS, pas à Geoloc Systems directement" },
  { done: true, text: "Boîtiers Teltonika FMC130/FTC920 cités avec leurs vrais noms — source teltonika-product-capabilities-ao.md" },
  { done: true, text: "CAN-Bus mentionné avec condition : \"sous réserve de compatibilité constructeur\"" },
  { done: true, text: "Aucune fonctionnalité inventée — toutes sourçables dans le catalogue fonctionnel" },
  { done: true, text: "REQ-005 et REQ-010 marqués PARTIEL + A_CONFIRMER dans la matrice" },
  { done: true, text: "Aucune certification inventée pour Geoloc Systems (pas d'ISO 27001 Geoloc)" },
];

// Section 3: Conformité formelle
const conformiteItems = [
  { done: true, text: "Critère Prix (50%) : Bordereau des prix P1-P12 présent dans DQE_PRICING.xlsx (structure prête)" },
  { done: true, text: "Critère Valeur technique (40%) : Mémoire technique en 10 sections — document Word produit (MEMOIRE_TECHNIQUE_SIRTOM.docx)" },
  { done: true, text: "Critère Délai (10%) : Engagement 28 jours calendaires mentionné dans AE et mémoire" },
  { done: true, text: "Pondération respectée : sections BOM, déploiement et SLA les plus développées" },
  { done: true, text: "Langage conforme au RC : \"géolocalisation\", \"gestion de flotte\", \"véhicules de collecte\"" },
  { done: true, text: "Durée 60 mois prise en compte dans le DQE" },
  { done: false, text: "BLOQUANT : Prix P1-P12 à 0 dans DQE_PRICING.xlsx → Must fix avant remise" },
  { done: false, text: "BLOQUANT : Bordereau des prix PDF du SIRTOM non complété → Must fix avant remise" },
  { done: true, text: "Format dépôt électronique sur marches-demat.com — procédure documentée" },
];

// Section 4: Administratif
const adminItems = [
  { done: true, text: "ADMIN_CHECKLIST.md (Markdown) et ADMIN_CHECKLIST_SIRTOM.docx (Word) complets" },
  { done: true, text: "Attestation RC AXA valide jusqu'au 01/01/2027" },
  { done: true, text: "GONOGO.json présent — statut GO (79/100)" },
  { done: false, text: "BLOQUANT : KBIS < 3 mois → À commander sur infogreffe.fr" },
  { done: false, text: "BLOQUANT : Attestation fiscale → À télécharger sur impots.gouv.fr" },
  { done: false, text: "BLOQUANT : Attestation URSSAF → À télécharger sur urssaf.fr" },
  { done: false, text: "BLOQUANT : DC1 et DC2 → À générer sur formulaires.modernisation.gouv.fr et signer" },
  { done: false, text: "BLOQUANT : AE → À compléter et signer électroniquement (délai = 28 jours)" },
  { done: false, text: "BLOQUANT : RC, CCAP, CCTP → À signer électroniquement" },
  { done: false, text: "Vérifier certificat électronique RGS Geoloc Systems à jour" },
];

// Planning table
const PLANNING = [
  { tache: "Valider prix P1-P12 + compléter BPU", responsable: "Said KHAYAT", cible: "Avant le 04/03/2026", urgent: false },
  { tache: "Commander KBIS", responsable: "Said KHAYAT", cible: "Avant le 28/02/2026", urgent: true },
  { tache: "Télécharger attestation fiscale + URSSAF", responsable: "Said KHAYAT", cible: "Avant le 28/02/2026", urgent: true },
  { tache: "Contacter SIRTOM — spécifications BOM (REQ-005/010)", responsable: "Said KHAYAT", cible: "Avant le 28/02/2026", urgent: true },
  { tache: "Générer DC1 + DC2", responsable: "Said KHAYAT", cible: "Avant le 04/03/2026", urgent: false },
  { tache: "Mettre en forme mémoire technique (Word signé)", responsable: "Geoloc / AO Factory", cible: "Avant le 07/03/2026", urgent: false },
  { tache: "Compléter et signer AE + RC + CCAP + CCTP", responsable: "Said KHAYAT", cible: "Avant le 09/03/2026", urgent: false },
  { tache: "DEPOSER L'OFFRE sur marches-demat.com", responsable: "Said KHAYAT", cible: "11/03/2026 avant 12h00", urgent: true },
];

// Livrables
const LIVRABLES = [
  { n: "1", doc: "AO_META.md + SYNTH_AO.md", phase: "Phase 1", fichier: "phase1/SYNTH_AO.md", statut: "OK" },
  { n: "2", doc: "EXIGENCES.json", phase: "Phase 1", fichier: "phase1/EXIGENCES.json", statut: "OK" },
  { n: "3", doc: "GONOGO.json", phase: "Phase 2", fichier: "phase2/GONOGO.json", statut: "OK" },
  { n: "4", doc: "MATRICE_CONFORMITE.md + .docx", phase: "Phase 3", fichier: "remise/MATRICE_CONFORMITE_SIRTOM.docx", statut: "OK" },
  { n: "5", doc: "MEMOIRE_TECHNIQUE.md + .docx", phase: "Phase 4", fichier: "remise/MEMOIRE_TECHNIQUE_SIRTOM.docx", statut: "OK" },
  { n: "6", doc: "DQE_PRICING.xlsx", phase: "Phase 5", fichier: "phase5/DQE_PRICING.xlsx", statut: "EN COURS" },
  { n: "7", doc: "PRICING_ALERTS.md", phase: "Phase 5", fichier: "phase5/PRICING_ALERTS.md", statut: "OK" },
  { n: "8", doc: "ADMIN_CHECKLIST.md + .docx", phase: "Phase 6", fichier: "remise/ADMIN_CHECKLIST_SIRTOM.docx", statut: "OK" },
  { n: "9", doc: "QA_CHECKLIST.md + .docx", phase: "Phase 7", fichier: "remise/QA_CHECKLIST_SIRTOM.docx", statut: "OK" },
];

function buildPlanningTable() {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [4800, 2100, 2738],
    rows: [
      new TableRow({ children: [hcell("Tâche", 4800), hcell("Responsable", 2100), hcell("Date cible", 2738)] }),
      ...PLANNING.map((row, i) => new TableRow({
        children: [
          cell(row.tache, { w: 4800, bg: row.urgent ? C.ROUGE_LIGHT : (i % 2 === 0 ? C.BLANC : C.GRIS), bold: row.urgent, fontSize: 17 }),
          cell(row.responsable, { w: 2100, bg: row.urgent ? C.ROUGE_LIGHT : (i % 2 === 0 ? C.BLANC : C.GRIS), italic: true }),
          cell(row.cible, { w: 2738, bg: row.urgent ? C.ROUGE : C.ORANGE_LIGHT, bold: true, color: row.urgent ? C.BLANC : C.ORANGE, align: AlignmentType.CENTER }),
        ]
      }))
    ]
  });
}

function buildLivrablesTable() {
  const colW = [500, 3400, 1500, 2638, 1600];
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colW,
    rows: [
      new TableRow({ children: [hcell("#", 500), hcell("Livrable", 3400), hcell("Phase", 1500), hcell("Fichier", 2638), hcell("Statut", 1600)] }),
      ...LIVRABLES.map((row, i) => {
        const statutCfg = row.statut === "OK"
          ? { bg: C.VERT_LIGHT, color: C.VERT, label: "✓ OK" }
          : { bg: C.ORANGE_LIGHT, color: C.ORANGE, label: "~ EN COURS" };
        return new TableRow({
          children: [
            cell(row.n, { w: 500, bg: i % 2 === 0 ? C.BLANC : C.GRIS, bold: true, color: C.BLEU_MED, align: AlignmentType.CENTER }),
            cell(row.doc, { w: 3400, bg: i % 2 === 0 ? C.BLANC : C.GRIS }),
            cell(row.phase, { w: 1500, bg: i % 2 === 0 ? C.BLANC : C.GRIS, align: AlignmentType.CENTER }),
            cell(row.fichier, { w: 2638, bg: i % 2 === 0 ? C.BLANC : C.GRIS, italic: true, color: C.GRIS_DARK, fontSize: 14 }),
            cell(statutCfg.label, { w: 1600, bg: statutCfg.bg, bold: true, color: statutCfg.color, align: AlignmentType.CENTER }),
          ]
        });
      })
    ]
  });
}

// Statut global
function buildStatutGlobal() {
  const rows_data = [
    { section: "Branding", statut: "OK", bloquants: "0" },
    { section: "Anti-hallucination", statut: "OK", bloquants: "0" },
    { section: "Conformité formelle", statut: "EN COURS", bloquants: "2 (prix, BPU)" },
    { section: "Administratif", statut: "INCOMPLET", bloquants: "7 pièces à préparer" },
    { section: "A_CONFIRMER non résolus", statut: "EN COURS", bloquants: "3 points techniques + 1 logistique" },
  ];
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [3200, 2200, 4238],
    rows: [
      new TableRow({ children: [hcell("Section", 3200), hcell("Statut", 2200), hcell("Points bloquants", 4238)] }),
      ...rows_data.map((row, i) => new TableRow({
        children: [
          cell(row.section, { w: 3200, bg: i % 2 === 0 ? C.BLANC : C.GRIS, bold: true }),
          sCell(row.statut, 2200),
          cell(row.bloquants, { w: 4238, bg: i % 2 === 0 ? C.BLANC : C.GRIS }),
        ]
      }))
    ]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: C.BLEU_FONCE },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: C.BLEU_MED },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: 16838 },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
      }
    },
    headers: { default: makeHeader() },
    footers: { default: makeFooter() },
    children: [
      // Title
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.BLEU_MED, space: 4 } },
        children: [new TextRun({ text: "CONTRÔLE QUALITÉ FINAL — QA CHECKLIST", bold: true, font: "Arial", size: 40, color: C.BLEU_FONCE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { before: 80, after: 60 },
        children: [new TextRun({ text: "SIRTOM — Secteur de Briey, Vallée de l'Orne et du Jarnisy", font: "Arial", size: 22, color: C.BLEU_MED })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { before: 40, after: 240 },
        children: [new TextRun({ text: "Marché n° 2/2026 — MP43040917 — AO Response Factory v1.0.0 — 24/02/2026", font: "Arial", size: 18, color: C.GRIS_DARK })]
      }),

      // Warning banner
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [CONTENT_W],
        rows: [new TableRow({ children: [
          new TableCell({
            borders: { top: border(C.ROUGE), bottom: border(C.ROUGE), left: { style: BorderStyle.SINGLE, size: 20, color: C.ROUGE }, right: border(C.ROUGE) },
            shading: { fill: C.ROUGE_LIGHT, type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 240, right: 160 },
            children: [new Paragraph({ children: [new TextRun({ text: "⚠  CE DOSSIER NE PEUT PAS ETRE SOUMIS TANT QUE TOUS LES POINTS BLOQUANTS NE SONT PAS RESOLUS", font: "Arial", size: 22, bold: true, color: C.ROUGE })] })]
          })
        ]})]
      }),
      spacer(160, 80),

      // Statut global
      h1("Statut global QA"),
      buildStatutGlobal(),
      spacer(120, 80),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Statut global : EN COURS — 10 points à résoudre avant le 11/03/2026", bold: true, font: "Arial", size: 24, color: C.ORANGE })]
      }),
      spacer(240, 80),

      // 1. Branding
      h1("1. Branding"),
      checkTable(brandingItems, "Branding — Cohérence identitaire Geoloc Systems / SuperFleet"),
      spacer(80, 40),
      new Paragraph({
        children: [new TextRun({ text: "Statut branding : OK — 5/5 points validés", bold: true, font: "Arial", size: 20, color: C.VERT })]
      }),
      spacer(200, 80),

      // 2. Anti-hallucination
      h1("2. Anti-hallucination"),
      checkTable(antiHalluItems, "Anti-hallucination — Données sourcées et vérifiables"),
      spacer(80, 40),
      new Paragraph({
        children: [new TextRun({ text: "Statut anti-hallucination : OK — 16/16 données sourcées", bold: true, font: "Arial", size: 20, color: C.VERT })]
      }),
      spacer(200, 80),

      // 3. Conformité formelle
      h1("3. Conformité formelle"),
      checkTable(conformiteItems, "Conformité formelle — Critères RC et obligations légales"),
      spacer(80, 40),
      new Paragraph({
        children: [new TextRun({ text: "Statut conformité formelle : EN COURS — 2 points bloquants (prix à renseigner)", bold: true, font: "Arial", size: 20, color: C.ORANGE })]
      }),
      spacer(200, 80),

      // 4. Administratif
      h1("4. Administratif"),
      checkTable(adminItems, "Pièces administratives — Dossier de candidature et d'offre"),
      spacer(80, 40),
      new Paragraph({
        children: [new TextRun({ text: "Statut administratif : INCOMPLET — 7 pièces à préparer avant remise", bold: true, font: "Arial", size: 20, color: C.ROUGE })]
      }),
      spacer(200, 80),

      // 5. Points A_CONFIRMER
      h1("5. Points A_CONFIRMER non résolus"),
      bodyText("Ces points doivent être traités avant la rédaction de la version finale signée du mémoire :", { bold: true }),
      spacer(80, 40),
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [1200, 4400, 4038],
        rows: [
          new TableRow({ children: [hcell("REQ", 1200), hcell("Point A_CONFIRMER", 4400), hcell("Action Said KHAYAT", 4038)] }),
          new TableRow({ children: [
            cell("REQ-005", { w: 1200, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE, align: AlignmentType.CENTER }),
            cell("Disponibilité d'un signal électrique (PTO ou capteur de lèvre) sur les 16 BOM du SIRTOM", { w: 4400, bg: C.ORANGE_LIGHT }),
            cell("Contacter Stéphane ZANIER — SIRTOM 03.82.20.22.00 — demander spec benne BOM", { w: 4038, bg: C.ORANGE_LIGHT }),
          ]}),
          new TableRow({ children: [
            cell("REQ-010", { w: 1200, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE, align: AlignmentType.CENTER }),
            cell("Liste des capteurs benne à surveiller sur les BOM du SIRTOM", { w: 4400, bg: C.ORANGE_LIGHT }),
            cell("Idem — à traiter lors du même appel SIRTOM", { w: 4038, bg: C.ORANGE_LIGHT }),
          ]}),
          new TableRow({ children: [
            cell("REQ-024", { w: 1200, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE, align: AlignmentType.CENTER }),
            cell("Confirmer la disponibilité d'un technicien terrain Lorraine (ou partenaire local) pour garantir le SLA 48h", { w: 4400, bg: C.ORANGE_LIGHT }),
            cell("Décision interne Geoloc — à confirmer avec Clément NOEL / Walid KHEROUA", { w: 4038, bg: C.ORANGE_LIGHT }),
          ]}),
        ]
      }),
      spacer(80, 40),
      bodyText("Si non résolus avant remise : formuler dans le mémoire avec la condition \"sous réserve de validation lors du cadrage technique\" — acceptable en procédure adaptée (MAPA). Ne pas promettre ce qui n'est pas confirmé.", { italic: true, color: C.GRIS_DARK }),
      spacer(240, 80),

      // 6. Planning
      h1("6. Planning de finalisation"),
      buildPlanningTable(),
      spacer(240, 80),

      // 7. Livrables
      h1("7. Livrables produits — Récapitulatif dossier"),
      buildLivrablesTable(),

      spacer(240, 80),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.BLEU_MED, space: 4 } },
        spacing: { before: 120 },
        children: [new TextRun({ text: "QA réalisée par AO Response Factory — SARL Geoloc Systems — 14 rue de Mantes, 92700 Colombes — 24/02/2026 — Prochaine QA : après validation des prix et pièces administratives", font: "Arial", size: 16, color: C.GRIS_DARK, italics: true })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log('✅ ' + OUT);
});
