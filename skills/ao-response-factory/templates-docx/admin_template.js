const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, ExternalHyperlink, LevelFormat
} = require('docx');
const fs = require('fs');

const OUT = '/sessions/modest-laughing-knuth/mnt/Appels-Offres/En-cours/2026-02-24_SIRTOM/REPONSE/remise/ADMIN_CHECKLIST_SIRTOM.docx';

const C = {
  BLEU_FONCE: "1565C0", BLEU_MED: "4285F4", BLEU_LIGHT: "F1F5F9", BLEU_ALT: "E2E8F0",
  VERT: "375623", VERT_LIGHT: "E2EFDA",
  ORANGE: "C55A11", ORANGE_LIGHT: "FCE4D6",
  ROUGE: "C00000", ROUGE_LIGHT: "FFCCCC",
  GRIS: "F5F5F5", GRIS_DARK: "404040", BLANC: "FFFFFF",
};

const PAGE_W = 11906;
const PAGE_H = 16838;
const MARGIN = 1134; // ~2cm
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9638

const border = (color) => ({ style: BorderStyle.SINGLE, size: 4, color: color || "CCCCCC" });
const allBorders = (color) => ({ top: border(color), bottom: border(color), left: border(color), right: border(color) });

function cell(text, opts = {}) {
  const { w, bg, bold, color, align, italic, fontSize } = opts;
  return new TableCell({
    width: w ? { size: w, type: WidthType.DXA } : undefined,
    borders: allBorders(opts.borderColor || "CCCCCC"),
    shading: bg ? { fill: bg, type: ShadingType.CLEAR } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: align || AlignmentType.LEFT,
      children: [new TextRun({ text: String(text), bold: bold || false, italics: italic || false, color: color || "000000", font: "Arial", size: fontSize || 18 })]
    })]
  });
}

function hcell(text, w) {
  return cell(text, { w, bg: C.BLEU_FONCE, bold: true, color: C.BLANC, align: AlignmentType.CENTER, borderColor: C.BLEU_FONCE, fontSize: 18 });
}

function statusCell(status, w) {
  const map = {
    "OK": { bg: C.VERT_LIGHT, color: C.VERT, label: "✓ OK" },
    "A TELECHARGER": { bg: C.ORANGE_LIGHT, color: C.ORANGE, label: "⚠ A TELECHARGER" },
    "A COMMANDER": { bg: C.ORANGE_LIGHT, color: C.ORANGE, label: "⚠ A COMMANDER" },
    "A GENERER": { bg: C.ORANGE_LIGHT, color: C.ORANGE, label: "⚠ A GENERER" },
    "A COMPLETER": { bg: C.ORANGE_LIGHT, color: C.ORANGE, label: "⚠ A COMPLETER" },
    "A SIGNER": { bg: C.ORANGE_LIGHT, color: C.ORANGE, label: "⚠ A SIGNER" },
    "A CONSTITUER": { bg: C.ORANGE_LIGHT, color: C.ORANGE, label: "⚠ A CONSTITUER" },
    "A JOINDRE": { bg: C.ORANGE_LIGHT, color: C.ORANGE, label: "⚠ A JOINDRE" },
    "DISPONIBLE": { bg: C.VERT_LIGHT, color: C.VERT, label: "✓ DISPONIBLE" },
    "PRODUIT": { bg: C.VERT_LIGHT, color: C.VERT, label: "✓ PRODUIT" },
  };
  const s = map[status] || { bg: C.GRIS, color: C.GRIS_DARK, label: status };
  return cell(s.label, { w, bg: s.bg, bold: true, color: s.color, align: AlignmentType.CENTER, fontSize: 16 });
}

function makeHeader() {
  return new Header({
    children: [new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.BLEU_MED, space: 2 } },
      children: [
        new TextRun({ text: "CHECKLIST ADMINISTRATIVE — SIRTOM Marché n° 2/2026 — MP43040917", bold: true, font: "Arial", size: 18, color: C.BLEU_FONCE }),
        new TextRun({ text: "\t", font: "Arial", size: 18 }),
        new TextRun({ text: "Geoloc Systems", font: "Arial", size: 16, color: C.GRIS_DARK }),
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
        new TextRun({ text: "SARL Geoloc Systems — 14 rue de Mantes, 92700 Colombes — SIRET 450 808 878 00026 — Remise avant le 11/03/2026 à 12h00 — Page ", font: "Arial", size: 14, color: C.GRIS_DARK }),
        new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 14, color: C.GRIS_DARK }),
      ]
    })]
  });
}

function spacer(before, after) {
  return new Paragraph({ children: [], spacing: { before, after } });
}

function sectionTitle(text, color) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, font: "Arial", size: 32, bold: true, color: color || C.BLEU_FONCE })]
  });
}

function subTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, font: "Arial", size: 26, bold: true, color: C.BLEU_MED })]
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 20, bold: opts.bold, color: opts.color || "000000", italics: opts.italic })]
  });
}

// Alert box (colored paragraph with border)
function alertBox(text, type) {
  const map = {
    warning: { borderColor: C.ORANGE, bg: C.ORANGE_LIGHT, color: C.ORANGE },
    critical: { borderColor: C.ROUGE, bg: C.ROUGE_LIGHT, color: C.ROUGE },
    info: { borderColor: C.BLEU_MED, bg: C.BLEU_ALT, color: C.BLEU_MED },
    ok: { borderColor: C.VERT, bg: C.VERT_LIGHT, color: C.VERT },
  };
  const s = map[type] || map.info;
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [
      new TableCell({
        borders: { top: border(s.borderColor), bottom: border(s.borderColor), left: { style: BorderStyle.SINGLE, size: 16, color: s.borderColor }, right: border(s.borderColor) },
        shading: { fill: s.bg.replace('#', ''), type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 200, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: 20, bold: true, color: s.color })] })]
      })
    ]})]
  });
}

// Priority table
const COL_PRIO = [600, 3800, 2200, 2038];

// Main data tables column widths
const COL4 = [2400, 2000, 2438, 2800]; // piece | statut | source | action
const COL4_W = 9638;

function buildTableSection(rows, cols) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: cols,
    rows
  });
}

// Candidature - Juridique
const juridique = [
  { piece: "DC1 — Déclaration du candidat (situation juridique)", statut: "A GENERER", source: "formulaires.modernisation.gouv.fr", action: "Compléter et signer électroniquement" },
  { piece: "Attestation de régularité fiscale", statut: "A TELECHARGER", source: "impots.gouv.fr — Espace professionnel", action: "Attestation < 6 mois — avant 11/09/2026" },
  { piece: "Attestation de régularité sociale (URSSAF)", statut: "A TELECHARGER", source: "urssaf.fr — Attestation de vigilance", action: "Attestation < 6 mois — avant 11/09/2026" },
  { piece: "Extrait KBIS", statut: "A COMMANDER", source: "infogreffe.fr", action: "KBIS < 3 mois — SIRET 450 808 878 00026 — émis après 11/12/2025" },
  { piece: "Délégation de pouvoir", statut: "OK", source: "—", action: "Said KHAYAT = co-fondateur = habilité à signer" },
];

// Candidature - Financier
const financier = [
  { piece: "DC2 — Déclaration financière (capacité économique)", statut: "A GENERER", source: "formulaires.modernisation.gouv.fr", action: "Renseigner CA 2021 (1 041 378 €), 2022 (1 038 515 €), 2023 (1 006 398 €)" },
  { piece: "Attestation RC AXA", statut: "DISPONIBLE", source: "knowledge/annexes/09-attestation-rc-axa-2026.pdf", action: "Valide 08/02/2026 → 01/01/2027 ✓" },
  { piece: "RIB (Relevé d'Identité Bancaire)", statut: "A JOINDRE", source: "Banque Geoloc Systems", action: "Joindre RIB SARL Geoloc Systems" },
];

// Candidature - Références
const references = [
  { piece: "Liste des principales prestations (3 dernières années)", statut: "A CONSTITUER", source: "Références ENEDIS, ADANEV (1500 véh.), Transalys, Commune de Martigues", action: "Rédiger avec montants, dates et destinataires" },
  { piece: "Note méthodologique / Mémoire technique", statut: "PRODUIT", source: "phase4/MEMOIRE_TECHNIQUE.md → remise/MEMOIRE_TECHNIQUE_SIRTOM.docx", action: "Document Word produit — convertir en PDF signé pour la remise" },
];

// Offre - DCE
const offre = [
  { piece: "Acte d'Engagement (AE)", statut: "A COMPLETER", source: "DCE/AE_2026_...pdf", action: "Renseigner : prix global, délai pose (28 jours), sous-traitance (néant ou DC4), puis signer électroniquement" },
  { piece: "RC — Règlement de Consultation signé", statut: "A SIGNER", source: "DCE/RC_2026_...pdf", action: "Signer électroniquement + tampon + date — mention \"Lu et accepté sans réserve\"" },
  { piece: "CCAP signé", statut: "A SIGNER", source: "DCE/CCAP_2026_...pdf", action: "Signer électroniquement + tampon + date — accepté sans modification" },
  { piece: "CCTP signé", statut: "A SIGNER", source: "DCE/CCTP_2026_...pdf", action: "Signer électroniquement + tampon + date — accepté sans modification" },
  { piece: "Bordereau des prix complété (P1–P12)", statut: "A COMPLETER", source: "DCE/Bordereau_des_prix_GPS_2026.pdf + phase5/DQE_PRICING.xlsx", action: "Transférer les prix P1-P12 de DQE_PRICING.xlsx vers le BPU PDF — signer" },
  { piece: "Mémoire technique (Word signé)", statut: "PRODUIT", source: "remise/MEMOIRE_TECHNIQUE_SIRTOM.docx", action: "Signer électroniquement et tamponner le document Word" },
];

function buildChecklist(data, cols) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [hcell("Pièce", cols[0]), hcell("Statut", cols[1]), hcell("Source / Référence", cols[2]), hcell("Action requise", cols[3])]
      }),
      ...data.map((row, i) => new TableRow({
        children: [
          cell(row.piece, { w: cols[0], bg: i % 2 === 0 ? C.BLANC : C.GRIS, fontSize: 17 }),
          statusCell(row.statut, cols[1]),
          cell(row.source, { w: cols[2], bg: i % 2 === 0 ? C.BLANC : C.GRIS, fontSize: 15, color: C.GRIS_DARK, italic: true }),
          cell(row.action, { w: cols[3], bg: i % 2 === 0 ? C.BLANC : C.GRIS, fontSize: 16 }),
        ]
      }))
    ]
  });
}

// Priority actions
const PRIORITIES = [
  { n: "1", action: "Commander KBIS < 3 mois", lien: "infogreffe.fr", deadline: "Avant le 28/02/2026" },
  { n: "2", action: "Télécharger attestation fiscale", lien: "impots.gouv.fr", deadline: "Avant le 28/02/2026" },
  { n: "3", action: "Télécharger attestation URSSAF", lien: "urssaf.fr", deadline: "Avant le 28/02/2026" },
  { n: "4", action: "Contacter SIRTOM — spécifications BOM (REQ-005/010)", lien: "Stéphane ZANIER : 03.82.20.22.00", deadline: "Avant le 28/02/2026" },
  { n: "5", action: "Valider les prix P1-P12 dans DQE_PRICING.xlsx → compléter le BPU", lien: "phase5/DQE_PRICING.xlsx", deadline: "Avant le 04/03/2026" },
  { n: "6", action: "Générer DC1 + DC2 et renseigner les données financières", lien: "formulaires.modernisation.gouv.fr", deadline: "Avant le 04/03/2026" },
  { n: "7", action: "Compléter et signer électroniquement l'AE (délai = 28 jours)", lien: "—", deadline: "Avant le 09/03/2026" },
  { n: "8", action: "Signer électroniquement RC, CCAP, CCTP", lien: "—", deadline: "Avant le 09/03/2026" },
  { n: "9", action: "Mettre en forme et signer le mémoire technique + joindre toutes pièces", lien: "—", deadline: "Avant le 09/03/2026" },
  { n: "10", action: "DEPOSER L'OFFRE sur marches-demat.com", lien: "www.marches-demat.com", deadline: "11/03/2026 AVANT 12h00" },
];

function buildPrioTable() {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [600, 4200, 2438, 2400],
    rows: [
      new TableRow({ tableHeader: true, children: [hcell("#", 600), hcell("Action", 4200), hcell("Lien / Contact", 2438), hcell("Date cible", 2400)] }),
      ...PRIORITIES.map((row, i) => {
        const isFinal = i === PRIORITIES.length - 1;
        return new TableRow({
          children: [
            cell(row.n, { w: 600, bg: isFinal ? C.ROUGE : C.BLEU_ALT, bold: true, color: isFinal ? C.BLANC : C.BLEU_MED, align: AlignmentType.CENTER }),
            cell(row.action, { w: 4200, bg: isFinal ? C.ROUGE_LIGHT : (i % 2 === 0 ? C.BLANC : C.GRIS), bold: isFinal, fontSize: 17 }),
            cell(row.lien, { w: 2438, bg: isFinal ? C.ROUGE_LIGHT : (i % 2 === 0 ? C.BLANC : C.GRIS), italic: true, color: C.GRIS_DARK, fontSize: 15 }),
            cell(row.deadline, { w: 2400, bg: isFinal ? C.ROUGE : C.ORANGE_LIGHT, bold: true, color: isFinal ? C.BLANC : C.ORANGE, align: AlignmentType.CENTER, fontSize: isFinal ? 18 : 17 }),
          ]
        });
      })
    ]
  });
}

// Dates validity
const DATES = [
  { doc: "Attestation RC AXA", validite: "01/01/2027", statut: "VALIDE — 10+ mois restants", bg: C.VERT_LIGHT, color: C.VERT },
  { doc: "Attestation fiscale", validite: "< 6 mois avant le 11/03/2026 → émise après 11/09/2025", statut: "A TELECHARGER", bg: C.ORANGE_LIGHT, color: C.ORANGE },
  { doc: "Attestation URSSAF", validite: "< 6 mois avant le 11/03/2026 → émise après 11/09/2025", statut: "A TELECHARGER", bg: C.ORANGE_LIGHT, color: C.ORANGE },
  { doc: "Extrait KBIS", validite: "< 3 mois avant le 11/03/2026 → émis après 11/12/2025", statut: "A COMMANDER", bg: C.ORANGE_LIGHT, color: C.ORANGE },
  { doc: "Validité de l'offre", validite: "90 jours à compter du 11/03/2026 → jusqu'au 09/06/2026", statut: "OK — inclus dans AE", bg: C.VERT_LIGHT, color: C.VERT },
];

function buildDatesTable() {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [3200, 4200, 2238],
    rows: [
      new TableRow({ children: [hcell("Document", 3200), hcell("Validité requise", 4200), hcell("Statut au 24/02/2026", 2238)] }),
      ...DATES.map((row, i) => new TableRow({
        children: [
          cell(row.doc, { w: 3200, bg: i % 2 === 0 ? C.BLANC : C.GRIS, bold: true }),
          cell(row.validite, { w: 4200, bg: i % 2 === 0 ? C.BLANC : C.GRIS }),
          cell(row.statut, { w: 2238, bg: row.bg, bold: true, color: row.color, align: AlignmentType.CENTER }),
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
        size: { width: PAGE_W, height: PAGE_H },
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
        children: [new TextRun({ text: "CHECKLIST ADMINISTRATIVE", bold: true, font: "Arial", size: 48, color: C.BLEU_FONCE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 60 },
        children: [new TextRun({ text: "SIRTOM — Secteur de Briey, Vallée de l'Orne et du Jarnisy", font: "Arial", size: 24, color: C.BLEU_MED })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 40, after: 240 },
        children: [new TextRun({ text: "Marché n° 2/2026 — MP43040917 — Géolocalisation flotte — Date limite : 11/03/2026 à 12h00", font: "Arial", size: 18, color: C.GRIS_DARK })]
      }),

      // URGENT banner
      alertBox("⏰  DATE LIMITE ABSOLUE : MERCREDI 11 MARS 2026 À 12H00 — DEPOT ELECTRONIQUE SUR www.marches-demat.com — 15 JOURS CALENDAIRES RESTANTS AU 24/02/2026", "critical"),
      spacer(160, 80),

      // Priority actions
      sectionTitle("Actions prioritaires — Said KHAYAT"),
      bodyText("Les 10 actions suivantes sont requises pour compléter le dossier. Les 3 premières sont à traiter avant le 28/02/2026.", { bold: true }),
      spacer(80, 80),
      buildPrioTable(),
      spacer(240, 80),

      // Candidature section
      sectionTitle("Dossier de candidature"),
      subTitle("Pièces juridiques"),
      buildChecklist(juridique, COL4),
      spacer(120, 80),

      subTitle("Pièces financières et assurance"),
      buildChecklist(financier, COL4),
      spacer(120, 80),

      subTitle("Références professionnelles"),
      buildChecklist(references, COL4),
      spacer(240, 80),

      // Offre section
      sectionTitle("Dossier d'offre"),
      buildChecklist(offre, COL4),
      spacer(240, 80),

      // Dates validity
      sectionTitle("Validité des documents — Contrôle dates"),
      buildDatesTable(),
      spacer(240, 80),

      // Depot electronique
      sectionTitle("Remise électronique — Procédure"),
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [2800, 4438, 2400],
        rows: [
          new TableRow({ children: [hcell("Étape", 2800), hcell("Détail", 4438), hcell("Statut", 2400)] }),
          new TableRow({ children: [
            cell("Plateforme de dépôt", { w: 2800, bg: C.BLEU_ALT, bold: true }),
            cell("www.marches-demat.com — dépôt électronique obligatoire", { w: 4438, bg: C.BLEU_ALT }),
            cell("⚠ Vérifier accès compte", { w: 2400, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE }),
          ]}),
          new TableRow({ children: [
            cell("Date limite", { w: 2800, bg: C.ROUGE_LIGHT, bold: true }),
            cell("Mercredi 11 mars 2026 à 12h00 — dépôt avant cette heure", { w: 4438, bg: C.ROUGE_LIGHT }),
            cell("⏰ 15 jours restants", { w: 2400, bg: C.ROUGE, bold: true, color: C.BLANC, align: AlignmentType.CENTER }),
          ]}),
          new TableRow({ children: [
            cell("Format signature électronique", { w: 2800, bg: C.GRIS }),
            cell("XAdES, CAdES ou PAdES — certificat RGS (niveau *)", { w: 4438, bg: C.GRIS }),
            cell("⚠ Vérifier certificat RGS à jour", { w: 2400, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE }),
          ]}),
          new TableRow({ children: [
            cell("Format fichiers acceptés", { w: 2800, bg: C.BLANC }),
            cell(".zip, .pdf, .doc, .xls autorisés — pas de .rar", { w: 4438, bg: C.BLANC }),
            cell("✓ OK", { w: 2400, bg: C.VERT_LIGHT, bold: true, color: C.VERT, align: AlignmentType.CENTER }),
          ]}),
          new TableRow({ children: [
            cell("Transmission physique", { w: 2800, bg: C.GRIS }),
            cell("Non autorisée — dépôt électronique uniquement", { w: 4438, bg: C.GRIS }),
            cell("✓ OK", { w: 2400, bg: C.VERT_LIGHT, bold: true, color: C.VERT, align: AlignmentType.CENTER }),
          ]}),
        ]
      }),

      spacer(240, 80),

      // Récapitulatif
      sectionTitle("Récapitulatif global"),
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [3600, 1600, 1600, 2838],
        rows: [
          new TableRow({ children: [hcell("Catégorie", 3600), hcell("Total pièces", 1600), hcell("✓ Prêtes", 1600), hcell("⚠ À préparer", 2838)] }),
          new TableRow({ children: [cell("Candidature — Juridique", { w: 3600, bg: C.BLANC }), cell("5", { w: 1600, bg: C.BLANC, align: AlignmentType.CENTER }), cell("1", { w: 1600, bg: C.VERT_LIGHT, bold: true, color: C.VERT, align: AlignmentType.CENTER }), cell("4", { w: 2838, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE, align: AlignmentType.CENTER })] }),
          new TableRow({ children: [cell("Candidature — Financier", { w: 3600, bg: C.GRIS }), cell("3", { w: 1600, bg: C.GRIS, align: AlignmentType.CENTER }), cell("1", { w: 1600, bg: C.VERT_LIGHT, bold: true, color: C.VERT, align: AlignmentType.CENTER }), cell("2", { w: 2838, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE, align: AlignmentType.CENTER })] }),
          new TableRow({ children: [cell("Candidature — Références", { w: 3600, bg: C.BLANC }), cell("2", { w: 1600, bg: C.BLANC, align: AlignmentType.CENTER }), cell("1", { w: 1600, bg: C.VERT_LIGHT, bold: true, color: C.VERT, align: AlignmentType.CENTER }), cell("1", { w: 2838, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE, align: AlignmentType.CENTER })] }),
          new TableRow({ children: [cell("Offre — Pièces DCE", { w: 3600, bg: C.GRIS }), cell("6", { w: 1600, bg: C.GRIS, align: AlignmentType.CENTER }), cell("1", { w: 1600, bg: C.VERT_LIGHT, bold: true, color: C.VERT, align: AlignmentType.CENTER }), cell("5", { w: 2838, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE, align: AlignmentType.CENTER })] }),
          new TableRow({ children: [
            cell("TOTAL", { w: 3600, bg: C.BLEU_LIGHT, bold: true }),
            cell("16", { w: 1600, bg: C.BLEU_LIGHT, bold: true, align: AlignmentType.CENTER }),
            cell("4", { w: 1600, bg: C.VERT_LIGHT, bold: true, color: C.VERT, align: AlignmentType.CENTER }),
            cell("12", { w: 2838, bg: C.ORANGE_LIGHT, bold: true, color: C.ORANGE, align: AlignmentType.CENTER }),
          ]}),
        ]
      }),

      spacer(240, 80),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.BLEU_MED, space: 4 } },
        spacing: { before: 120 },
        children: [new TextRun({ text: "Document produit par AO Response Factory — SARL Geoloc Systems — 14 rue de Mantes, 92700 Colombes — SIRET 450 808 878 00026 — 24/02/2026", font: "Arial", size: 16, color: C.GRIS_DARK, italics: true })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log('✅ ' + OUT);
});
