// Bibliothèque partagée pour les annexes Garges-lès-Gonesse
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak, ImageRun,
} = require('docx');

const COLOR_PRIMARY = "1E3A8A";
const COLOR_SECONDARY = "0F766E";
const COLOR_HEADER_BG = "1E3A8A";
const COLOR_HEADER_TX = "FFFFFF";
const COLOR_BORDER = "94A3B8";
const COLOR_LIGHT = "F1F5F9";

const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;
const CONTENT_W = PAGE_W - 2*MARGIN;

const border = { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER };
const allBorders = { top: border, bottom: border, left: border, right: border };

function P(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before ?? 60, after: opts.after ?? 60 },
    alignment: opts.align ?? AlignmentType.JUSTIFIED,
    children: [new TextRun({
      text, bold: opts.bold ?? false, italics: opts.italic ?? false,
      color: opts.color ?? "1F2937", size: opts.size ?? 22, font: "Calibri",
    })],
  });
}
function H1(text) {
  return new Paragraph({
    spacing: { before: 240, after: 180 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, bold: true, color: COLOR_PRIMARY, size: 36, font: "Calibri" })],
  });
}
function H2(text) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, color: COLOR_PRIMARY, size: 26, font: "Calibri" })],
  });
}
function H3(text) {
  return new Paragraph({
    spacing: { before: 180, after: 80 },
    children: [new TextRun({ text, bold: true, color: COLOR_SECONDARY, size: 22, font: "Calibri" })],
  });
}
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 22, font: "Calibri", color: "1F2937" })],
  });
}
function cell(text, opts = {}) {
  return new TableCell({
    borders: allBorders,
    width: { size: opts.width, type: WidthType.DXA },
    shading: { fill: opts.fill ?? "FFFFFF", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    verticalAlign: VerticalAlign.CENTER,
    children: (Array.isArray(text) ? text : [text]).map(t => new Paragraph({
      alignment: opts.align ?? AlignmentType.LEFT,
      children: [new TextRun({
        text: String(t), bold: opts.bold ?? false, color: opts.color ?? "1F2937",
        size: opts.size ?? 20, font: "Calibri",
      })],
    })),
  });
}
function headerCell(text, width) {
  return cell(text, { width, fill: COLOR_HEADER_BG, color: COLOR_HEADER_TX, bold: true, align: AlignmentType.CENTER, size: 20 });
}
function buildTable(headers, rows, widths) {
  const totalW = widths.reduce((a,b)=>a+b, 0);
  return new Table({
    width: { size: totalW, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h,i) => headerCell(h, widths[i])) }),
      ...rows.map((r, ri) => new TableRow({
        children: r.map((c,i) => cell(c, { width: widths[i], fill: ri % 2 === 0 ? "FFFFFF" : COLOR_LIGHT })),
      })),
    ],
  });
}
function pageBreak() { return new Paragraph({ children: [new PageBreak()] }); }

function buildDoc(title, children) {
  return new Document({
    creator: "Geoloc Systems SAS",
    title: title,
    description: title + " — Marché 26.065 Garges-lès-Gonesse",
    numbering: {
      config: [
        { reference: "bullets", levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 480, hanging: 240 } } } },
        ]},
      ],
    },
    sections: [{
      properties: {
        page: { size: { width: PAGE_W, height: PAGE_H },
                margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } },
      },
      headers: { default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: `${title}  |  Marché 26.065 — Ville de Garges-lès-Gonesse`,
                                   color: COLOR_PRIMARY, italics: true, size: 18, font: "Calibri" })],
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY, space: 4 } },
        })],
      }) },
      footers: { default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Geoloc Systems SAS — 14 rue de Mantes, 92700 Colombes — Page ", color: "64748B", size: 18, font: "Calibri" }),
            new TextRun({ children: [PageNumber.CURRENT], color: "64748B", size: 18, font: "Calibri" }),
          ],
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY, space: 4 } },
        })],
      }) },
      children,
    }],
  });
}

async function save(doc, filename, outdir) {
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(outdir, filename), buf);
  console.log("OK", filename, buf.length, "bytes");
}

module.exports = {
  P, H1, H2, H3, bullet, cell, headerCell, buildTable, pageBreak, buildDoc, save,
  AlignmentType, BorderStyle, WidthType, ShadingType, TextRun, Paragraph, Table, TableRow,
  COLOR_PRIMARY, COLOR_SECONDARY, COLOR_LIGHT, CONTENT_W,
};
