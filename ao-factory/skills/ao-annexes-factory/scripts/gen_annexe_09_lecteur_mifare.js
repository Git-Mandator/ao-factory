// Annexe Lecteur MIFARE RD200 USB - dispositif d'administration des badges agents
const fs = require('fs');
const path = require('path');
const lib = require('./lib.js');
const { P, H1, H2, H3, bullet, buildTable, pageBreak, buildDoc, save,
        AlignmentType, TextRun, Paragraph, BorderStyle } = lib;
const { ImageRun } = require('docx');

const IMG_DIR = path.join(__dirname, "..", "images");
const OUT = __dirname;

function image(filename, w, h) {
  const imgPath = path.join(IMG_DIR, filename);
  const ext = path.extname(filename).slice(1).toLowerCase();
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 60 },
    children: [new ImageRun({
      type: ext === 'jpg' ? 'jpeg' : ext,
      data: fs.readFileSync(imgPath),
      transformation: { width: w, height: h },
      altText: { title: filename, description: filename, name: filename },
    })],
  });
}

function caption(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
    children: [new TextRun({ text, italics: true, size: 18, color: "64748B", font: "Calibri" })],
  });
}

const c = [];

// ============================ COVER ============================
c.push(new Paragraph({ spacing: { before: 1800 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "ANNEXE TECHNIQUE", bold: true, size: 48, color: "1E3A8A", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 },
  children: [new TextRun({ text: "LECTEUR DE BADGES MIFARE", bold: true, size: 40, color: "1E3A8A", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Modèle SYRIS RD200 USB", bold: true, size: 32, color: "0F766E", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
  children: [new TextRun({ text: "Dispositif d'administration et d'enregistrement des badges agents", italics: true, size: 24, color: "374151", font: "Calibri" })] }));

c.push(new Paragraph({ spacing: { before: 2000 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Mémoire technique — Géolocalisation flotte municipale", bold: true, size: 24, color: "1F2937", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Marché 26.065 — LOT 1", size: 22, color: "374151", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Pouvoir adjudicateur : Ville de Garges-lès-Gonesse", size: 22, color: "374151", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Candidat : Geoloc Systems SAS — Mai 2026", size: 22, color: "374151", font: "Calibri" })] }));

c.push(pageBreak());

// ============================ 1. Présentation ============================
c.push(H1("1. Présentation du dispositif"));

c.push(image("schema_lecteur_rd200.png", 540, 304));
c.push(caption("Schéma technique du lecteur MIFARE SYRIS RD200 USB et de son usage avec un badge agent."));

c.push(H2("1.1  Objet de cette annexe"));
c.push(P("Le système de géolocalisation proposé à la Ville de Garges-lès-Gonesse repose, conformément à l'exigence du CCTP §3.1, sur l'identification systématique du conducteur à chaque démarrage par passage d'un badge MIFARE sur un lecteur embarqué dans chaque véhicule (lecteur raccordé au boîtier Teltonika — cf. Annexe 06)."));
c.push(P("Pour permettre à la Ville d'administrer son parc de badges agents (création de nouveaux badges, association d'un badge à un conducteur dans SuperFleet, test d'un badge avant remise au conducteur, recherche d'un conducteur à partir d'un badge), Geoloc Systems fournit en complément un lecteur de paillasse RFID MIFARE de type SYRIS RD200 USB, à installer au Centre Technique Municipal et/ou à l'Hôtel de Ville sur le poste de l'administrateur SuperFleet."));

c.push(H2("1.2  Compatibilité avec les badges agents existants de la Ville"));
c.push(P("Le RD200 lit l'identifiant unique (UID) de toutes les cartes et tags conformes à la norme ISO-14443A, fréquence 13,56 MHz. Cela couvre :"));
c.push(bullet("Cartes MIFARE Classic 1Ko (S50) — standard pour les badges agents collectivités"));
c.push(bullet("Cartes MIFARE Classic 4Ko (S70) — variante haute capacité"));
c.push(bullet("Cartes MIFARE Ultralight"));
c.push(bullet("Tags NFC NTAG 203 (porte-clés)"));
c.push(P("La compatibilité avec les badges agents existants de la Ville sera validée contradictoirement à la notification du marché (validation de la fréquence et du format de l'identifiant). Si les badges agents existants sont conformes à la norme ISO-14443A (cas le plus courant), aucun changement de badge n'est requis."));

c.push(pageBreak());

// ============================ 2. Fiche technique ============================
c.push(H1("2. Fiche technique détaillée"));

c.push(buildTable(
  ["Caractéristique", "Spécification"],
  [
    ["Modèle",                       "SYRIS RD200-MI"],
    ["Marque / Fabricant",           "SYRIS (Taïwan) — distribué en France par AESPRINT"],
    ["Type",                         "Lecteur RFID de paillasse"],
    ["Fréquence de fonctionnement",  "13,56 MHz"],
    ["Norme RFID",                   "ISO-14443A"],
    ["Technologies supportées",      "MIFARE Classic 1Ko (S50), MIFARE Classic 4Ko (S70), MIFARE Ultralight, NFC NTAG 203"],
    ["Antenne",                      "Antenne interne — pas d'antenne externe à installer"],
    ["Signalisation visuelle",       "LED rouge + LED verte"],
    ["Signalisation sonore",         "Haut-parleur intégré (buzzer) — paramétrable on/off"],
    ["Connexion",                    "USB (câble fourni)"],
    ["Mode de fonctionnement",       "Émulation Clavier USB (HID) ou émulation RS232"],
    ["Format de lecture",            "UID en décimal ou hexadécimal — paramétrable"],
    ["Paramétrages disponibles",     "Mode USB · Lecture (AUTO, beep, voyant) · Format (caractères de fin, ID inversé)"],
    ["Logiciel de paramétrage",      "Fourni sur CD-ROM, sans nécessité de driver Windows dans la plupart des cas"],
    ["Compatibilité système",        "Windows (natif) — fonctionne également sur macOS et Linux en mode clavier"],
    ["Dimensions",                   "105 × 72 × 16 mm — boîtier compact de bureau"],
    ["Poids",                        "Léger, posé directement sur le bureau de l'administrateur"],
    ["Alimentation",                 "Alimenté par le port USB — pas de bloc secteur"],
    ["Conformité matérielle",        "Marquage CE — directives RoHS et REACH"],
  ],
  [3000, 6638]
));

c.push(H2("Atouts techniques"));
c.push(bullet("Branchement plug & play : le lecteur est reconnu nativement par Windows comme un clavier — pas de driver à installer dans la plupart des cas."));
c.push(bullet("Mode émulation clavier : le scan d'un badge se traduit par la « frappe » de l'UID à la position du curseur — utilisable dans n'importe quelle application web ou logiciel (SuperFleet, Excel, navigateur)."));
c.push(bullet("Antenne intégrée : pas de problème d'orientation ou de réglage. Approcher le badge à 1-2 cm suffit."));
c.push(bullet("Signalisation immédiate : LED + buzzer confirment la lecture du badge à l'utilisateur."));
c.push(bullet("Paramétrable : format de sortie ajustable (décimal/hexadécimal, ajout de retour chariot, inversion de l'ID…) selon les besoins de la plateforme SuperFleet."));

c.push(pageBreak());

// ============================ 3. Usage administratif Garges ============================
c.push(H1("3. Usage administratif à la Ville de Garges-lès-Gonesse"));

c.push(H2("3.1  Quatre cas d'usage opérationnels"));

c.push(H3("Cas d'usage n°1 — Enregistrement initial des badges agents dans SuperFleet"));
c.push(P("À la notification du marché, le Parc Auto procède à l'enregistrement de chaque badge agent existant de la Ville dans SuperFleet :"));
c.push(bullet("L'administrateur ouvre la fiche conducteur dans SuperFleet (par exemple Karim MERZOUK)."));
c.push(bullet("Il clique dans le champ « UID badge MIFARE »."));
c.push(bullet("Il pose le badge de l'agent sur le lecteur RD200 : l'UID est saisi automatiquement (émulation clavier)."));
c.push(bullet("LED verte + buzzer court = lecture validée."));
c.push(bullet("L'administrateur sauvegarde — l'association conducteur ↔ badge est créée en quelques secondes."));
c.push(P("Bénéfice opérationnel : enregistrement de ~150 à 200 conducteurs en quelques heures, sans saisie manuelle d'identifiants à 8 chiffres (source d'erreurs)."));

c.push(H3("Cas d'usage n°2 — Création d'un nouveau conducteur en cours de marché"));
c.push(P("Lorsqu'un nouvel agent est embauché ou qu'un agent reçoit son premier badge, le gestionnaire Parc Auto :"));
c.push(bullet("Crée une fiche conducteur dans SuperFleet avec ses informations administratives."));
c.push(bullet("Pose le nouveau badge MIFARE sur le RD200 : l'UID est inscrit dans la fiche."));
c.push(bullet("Sauvegarde — l'agent peut immédiatement démarrer un véhicule du parc avec son badge."));

c.push(H3("Cas d'usage n°3 — Test d'un badge avant remise au conducteur"));
c.push(P("Avant de remettre un badge à un nouvel agent ou en cas de doute sur l'état d'un badge, l'administrateur peut le tester rapidement :"));
c.push(bullet("Ouvrir la page « Test badge » de SuperFleet ou simplement un éditeur de texte."));
c.push(bullet("Poser le badge sur le RD200."));
c.push(bullet("Lecture OK = LED verte + UID affiché. Lecture KO (badge défectueux, démagnétisé, mauvaise norme) = LED rouge ou silence."));

c.push(H3("Cas d'usage n°4 — Recherche d'un conducteur à partir d'un badge trouvé"));
c.push(P("Si un agent trouve un badge non identifié (perdu dans un véhicule, oublié au CTM), le gestionnaire peut rapidement identifier son propriétaire :"));
c.push(bullet("Ouvrir le champ de recherche conducteur dans SuperFleet."));
c.push(bullet("Poser le badge sur le RD200 : SuperFleet recherche directement par UID."));
c.push(bullet("Affichage instantané du conducteur associé."));

c.push(H2("3.2  Sites d'installation à Garges-lès-Gonesse"));
c.push(buildTable(
  ["Site", "Adresse", "Usage"],
  [
    ["Centre Technique Municipal", "108 rue Jean Moulin, 95140 Garges-lès-Gonesse",
     "Lecteur principal sur le poste du responsable Parc Auto — enregistrement quotidien des badges, tests, recherches"],
    ["Hôtel de Ville", "8 Place Nelly Olin, BP 2, 95141 Garges-lès-Gonesse Cedex",
     "Lecteur secondaire sur le poste du gestionnaire de flotte de l'administration centrale (optionnel)"],
  ],
  [2400, 3500, 3738]
));
c.push(P("Notre proposition inclut la fourniture d'un lecteur RD200 USB pour le site principal du CTM. Un second lecteur peut être fourni à l'Hôtel de Ville sur simple demande, sans surcoût.",
        { italic: true, bold: true }));

c.push(pageBreak());

// ============================ 4. Intégration SuperFleet ============================
c.push(H1("4. Intégration avec la plateforme SuperFleet"));

c.push(P("Le lecteur RD200 USB s'intègre nativement avec la plateforme SuperFleet sans nécessiter d'installation logicielle complémentaire : grâce à son mode d'émulation clavier, il fonctionne avec n'importe quel champ de saisie de l'interface web SuperFleet."));

c.push(H2("4.1  Flux fonctionnel détaillé"));
c.push(buildTable(
  ["Étape", "Action utilisateur", "Action système"],
  [
    ["1", "L'administrateur ouvre la fiche conducteur dans SuperFleet et clique sur le champ « UID badge MIFARE »", "Le curseur se positionne dans le champ"],
    ["2", "Il pose le badge MIFARE sur le RD200", "Le lecteur détecte le badge, lit l'UID, allume la LED verte et émet un beep"],
    ["3", "Le RD200 émule la frappe clavier de l'UID", "L'UID s'affiche dans le champ de SuperFleet (ex : 04A37F21 ou 04C18B0E)"],
    ["4", "L'administrateur valide la fiche conducteur (clic Sauvegarder)", "SuperFleet enregistre l'association conducteur ↔ badge"],
    ["5", "À chaque démarrage d'un véhicule équipé, le badge est lu par le lecteur embarqué (Teltonika)", "L'UID est transmis au boîtier puis à SuperFleet, qui identifie le conducteur"],
    ["6", "Si le badge n'est pas reconnu : anti-démarrage actif (relais coupure démarreur)", "Le véhicule ne démarre pas, alerte tracée dans SuperFleet"],
  ],
  [600, 4200, 4838]
));

c.push(H2("4.2  Cohérence avec les autres dispositifs MIFARE du marché"));
c.push(buildTable(
  ["Dispositif", "Localisation", "Fonction"],
  [
    ["Lecteur MIFARE embarqué (boîtier Teltonika)",
     "Dans l'habitacle de chacun des ~130 véhicules de la flotte",
     "Identification du conducteur à chaque démarrage (CCTP §3.1)"],
    ["Lecteur RD200 USB (la présente annexe)",
     "Au CTM (et optionnellement à l'Hôtel de Ville)",
     "Administration des badges, création de comptes conducteurs, tests"],
    ["Badge MIFARE agent",
     "Porté par chaque conducteur",
     "Identifiant unique 13,56 MHz lu par les deux dispositifs ci-dessus"],
  ],
  [3200, 3200, 3238]
));

c.push(H2("4.3  Sécurité et confidentialité"));
c.push(bullet("Le lecteur RD200 ne stocke aucune donnée — il transmet uniquement l'UID lu en temps réel à l'application active."));
c.push(bullet("L'UID transmis est l'identifiant matériel unique du badge, pas le nom de l'agent (le rapprochement nom ↔ UID se fait dans SuperFleet, conforme RGPD)."));
c.push(bullet("Aucun accès distant au lecteur : il ne fonctionne que branché en local sur USB. Pas de risque de captation à distance."));
c.push(bullet("Conformité matérielle CE, RoHS, REACH — fabricant agréé, distribution française."));

c.push(pageBreak());

// ============================ 5. Avantages opérationnels Garges ============================
c.push(H1("5. Avantages opérationnels pour la Ville de Garges-lès-Gonesse"));

c.push(buildTable(
  ["Bénéfice", "Description"],
  [
    ["Gain de temps Parc Auto",
     "Enregistrement de ~150-200 badges agents en quelques heures (vs plusieurs jours en saisie manuelle d'UID à 8 chiffres)"],
    ["Élimination des erreurs de saisie",
     "Lecture automatique de l'UID — pas de risque d'erreur humaine, contrairement à la saisie manuelle"],
    ["Réactivité sur les nouveaux conducteurs",
     "Création et activation d'un nouveau conducteur en moins de 60 secondes (vs procédure manuelle complexe)"],
    ["Diagnostic rapide des badges défectueux",
     "Test direct sur le RD200 — distinction immédiate badge défaillant vs lecteur véhicule défaillant"],
    ["Recherche d'un conducteur à partir d'un badge",
     "Outil de gestion utile en cas de badge perdu/oublié — identification du propriétaire en quelques secondes"],
    ["Compatibilité existante",
     "Fonctionne avec les badges MIFARE déjà en circulation à la Ville (ISO-14443A 13,56 MHz)"],
    ["Coût de possession",
     "Lecteur fourni par Geoloc Systems dans le cadre du marché — aucun achat ni licence à la charge de la Ville"],
    ["Maintenance",
     "Aucune maintenance nécessaire — boîtier sans pièce mobile, antenne interne, garantie constructeur 2 ans"],
  ],
  [3000, 6638]
));

c.push(H2("Modalités de fourniture et de maintenance"));
c.push(bullet("Lecteur fourni neuf par Geoloc Systems à la notification du marché, sous 5 jours ouvrés."));
c.push(bullet("Installation et paramétrage initial inclus — formation d'utilisation de 15 minutes intégrée au plan de formation Admin SuperFleet (cf. Annexe 07)."));
c.push(bullet("Garantie constructeur 2 ans — remplacement à charge intégrale de Geoloc Systems."));
c.push(bullet("Lecteur de remplacement disponible en stock tampon Île-de-France — remplacement < 24 h en cas de défaillance."));
c.push(bullet("Récupération du lecteur en fin de marché ou en cas de réforme — pas de coût de désinstallation pour la Ville."));

c.push(H2("Sources et références"));
c.push(P("Fabricant : SYRIS Technology Corp. (Taïwan) — leader mondial de la RFID 13,56 MHz."));
c.push(P("Distributeur français : AESPRINT — 112 Avenue du Gal de Gaulle, Tour Rosny 2, 93110 Rosny-sous-Bois."));
c.push(P("Fiche produit officielle : https://www.avenuedelacarte.fr/915-lecteur-mifare-rd200-usb.html"));
c.push(P("Documentation technique constructeur disponible sur demande à Geoloc Systems."));

c.push(new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Fin de l'Annexe Lecteur MIFARE RD200 USB", bold: true, italics: true, color: "1E3A8A", size: 22, font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Geoloc Systems SAS — 14 rue de Mantes, 92700 Colombes — SIRET 450 808 878 00026 — Marché 26.065 — Mai 2026",
                           italics: true, color: "64748B", size: 20, font: "Calibri" })] }));

(async () => {
  await save(buildDoc("Annexe — Lecteur Badge MIFARE RD200 USB", c),
             "09_Annexe_Lecteur_MIFARE_RD200_GARGES.docx", OUT);
})();
