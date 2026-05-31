// Génération de l'Annexe 08 — Illustrations SuperFleet — adaptée Garges-lès-Gonesse
const fs = require('fs');
const path = require('path');
const lib = require('./lib.js');
const { P, H1, H2, H3, bullet, buildTable, pageBreak, buildDoc, save,
        AlignmentType, TextRun, Paragraph, BorderStyle } = lib;
const { ImageRun, Document, Packer, Header, Footer, PageNumber } = require('docx');

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

function captionUnder(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
    children: [new TextRun({ text, italics: true, size: 18, color: "64748B", font: "Calibri" })],
  });
}

function annexHeader(num, title) {
  return new Paragraph({
    spacing: { before: 360, after: 240 },
    alignment: AlignmentType.LEFT,
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: "1E3A8A", space: 4 } },
    children: [new TextRun({
      text: `ANNEXE ${num} — ${title}`,
      bold: true, size: 32, color: "1E3A8A", font: "Calibri",
    })],
  });
}

function subHead(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, size: 22, color: "0F766E", font: "Calibri" })],
  });
}

const c = [];

// ============================ COVER ============================
c.push(new Paragraph({ spacing: { before: 1800 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "ANNEXES TECHNIQUES", bold: true, size: 56, color: "1E3A8A", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 },
  children: [new TextRun({ text: "SOLUTION SUPERFLEET — ILLUSTRATIONS", bold: true, size: 36, color: "1E3A8A", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Captures d'écran de la plateforme appliquées au parc de la Ville", italics: true, size: 24, color: "0F766E", font: "Calibri" })] }));

c.push(new Paragraph({ spacing: { before: 2000 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Mémoire technique — Géolocalisation flotte municipale", bold: true, size: 26, color: "1F2937", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Marché 26.065 — LOT 1", size: 22, color: "374151", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Pouvoir adjudicateur : Ville de Garges-lès-Gonesse", size: 22, color: "374151", font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Candidat : Geoloc Systems SAS — Date : Mai 2026", size: 22, color: "374151", font: "Calibri" })] }));

c.push(pageBreak());

// ============================ SOMMAIRE ============================
c.push(H1("Sommaire des annexes"));
const toc = [
  ["1",  "Localisation en temps réel — 130 véhicules de Garges-lès-Gonesse"],
  ["2",  "Module Carto-Balayage — pilotage de la Propreté urbaine par quartier"],
  ["3",  "Fiche véhicule détaillée — exemple balayeuse Schmidt BALAY07"],
  ["4",  "Module ANTAI — désignation automatique du conducteur"],
  ["5",  "Module Carburant — rapprochement pétrolier et surconsommation"],
  ["6",  "Module Tachygraphe — conformité Règlement (CE) 561/2006 (cars + PL)"],
  ["7",  "Inventaire matériel embarqué — traçabilité véhicule × boîtier × SIM"],
  ["8",  "Application mobile SuperFleet — agents et gestionnaires sur le terrain"],
  ["9",  "Transition énergétique — pilotage de la flotte électrique de la Ville"],
  ["10", "IA SuperFleet Agent — assistant conversationnel chat & voix"],
];
toc.forEach(([n, t]) => c.push(new Paragraph({
  spacing: { before: 60, after: 60 },
  children: [
    new TextRun({ text: `Annexe ${n}  ·  `, bold: true, size: 22, color: "1E3A8A", font: "Calibri" }),
    new TextRun({ text: t, size: 22, color: "1F2937", font: "Calibri" }),
  ],
})));

c.push(pageBreak());

// ============================ ANNEXE 1 ============================
c.push(annexHeader("1", "LOCALISATION EN TEMPS RÉEL"));
c.push(image("01_Carto_temps_reel.png", 540, 304));
c.push(captionUnder("Capture SuperFleet — Cartographie temps réel des véhicules de Garges-lès-Gonesse."));

c.push(subHead("Description de la fonctionnalité"));
c.push(P("SuperFleet offre une interface de supervision en temps réel permettant de visualiser l'état instantané de l'ensemble du parc de la Ville. La vue consolidée présente les indicateurs clés de performance : nombre total de véhicules (130), véhicules en circulation (87 sur la capture), véhicules à l'arrêt (43). Ces indicateurs sont rafraîchis en moins d'une seconde grâce à l'architecture événementielle MQTT, permettant une prise de décision rapide par le Parc Auto et la Direction Propreté Urbaine."));
c.push(P("Les filtres latéraux permettent de segmenter par service (Propreté urbaine, Parc auto/pool, Espaces verts, Bâtiments, Police municipale), par type de véhicule (Balayeuses, PL/Cars, VL, VUL, Engins) et par énergie (Électrique 30, Diesel 58, Essence 39, Hybride 3). Le suivi multi-véhicules est illimité et compatible avec les 130 véhicules équipables du parc identifiés à l'annexe parc du DCE."));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Couvre directement l'exigence CCTP §3.1 « visualiser sur l'écran du PC en temps réel l'activité d'un ou plusieurs véhicules »."));
c.push(bullet("Recherche du véhicule le plus proche d'un point d'intérêt sur la carte (clic droit) — exigence CCTP."));
c.push(bullet("Fond cartographique OpenStreetMap avec voies internes de Garges-lès-Gonesse et du CTM (108 rue Jean Moulin)."));

// ============================ ANNEXE 2 ============================
c.push(annexHeader("2", "MODULE CARTO-BALAYAGE — PILOTAGE PROPRETÉ URBAINE"));
c.push(subHead("Description de la fonctionnalité"));
c.push(P("Le Module Carto-Balayage est un module dédié développé par Geoloc Systems pour répondre spécifiquement aux exigences du CCTP §3.1 sur le pilotage de la Direction Propreté urbaine. Il s'appuie sur la détection du mode balayage actif via le capteur de prise de force (PTO) raccordé à l'entrée numérique du boîtier Teltonika FMC650 sur chacune des 4 balayeuses Schmidt du parc Garges (1 Cleango 500 + 3 Swingo 200)."));
c.push(P("Le module produit automatiquement les rapports demandés par le CCTP :"));
c.push(bullet("Cartographie quotidienne des rues balayées sur la commune."));
c.push(bullet("Pourcentage de rues balayées sur la commune et par quartier (Garges centre, Dame Blanche Nord/Sud, La Lutèce, La Muette, Les Doucettes)."));
c.push(bullet("Linéaire de rue balayé sur la commune et par quartier, en mètres ou kilomètres."));
c.push(bullet("Hebdomadaire et mensuel : carte cumulée avec code couleur graduel par nombre de passages (gris=0 passage / vert=1 / jaune=2 / orange=3 / rouge=4+)."));
c.push(bullet("Nombre de passages par rue, par quartier et par période."));
c.push(P("Rapports envoyés automatiquement par e-mail à la Direction Propreté urbaine selon la cadence demandée (journalier, hebdomadaire, mensuel) et également consultables sur l'interface WEB, avec archivage de 12 mois (au-delà des 2 mois exigés CCTP §3.1).",
        { italic: true }));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Module spécifiquement conçu pour le métier de la propreté urbaine — différenciant par rapport aux solutions génériques."));
c.push(bullet("Engagement Geoloc : transmission garantie dès J+1 (au-dessus du délai max CCAP de 1 jour, pénalité 50 €/jour évitée)."));
c.push(bullet("Paramétrage spécifique des 4 balayeuses livré sous 15 jours ouvrés (vs 30 jours max CCAP, pénalité 200 €/heure évitée)."));

// ============================ ANNEXE 3 ============================
c.push(annexHeader("3", "FICHE VÉHICULE DÉTAILLÉE — BALAYEUSE SCHMIDT BALAY07"));
c.push(image("03_Fiche_vehicule_BALAY07.png", 480, 672));
c.push(captionUnder("Fiche véhicule SuperFleet — Schmidt Cleango 500 (BALAY07), PTO actif 4h12, conducteur identifié par MIFARE."));

c.push(subHead("Description de la fonctionnalité"));
c.push(P("La fiche véhicule numérique centralise l'ensemble des informations administratives, techniques et opérationnelles d'un véhicule. Sur l'exemple présenté, la balayeuse Schmidt Cleango 500 du parc Garges (immatriculée BALAY07) affiche les indicateurs clés : kilométrage cumulé (4 302 km), heures moteur (3 187 h), état actuel (En balayage), statut PTO (ACTIF), durée de balayage du jour (4h12)."));
c.push(P("Le conducteur est identifié par badge MIFARE — l'exemple montre Karim MERZOUK identifié à 06:08 avec validation de l'anti-démarrage. L'historique d'activité du jour est listé heure par heure avec localisation (Garges centre, Av. de la Division Leclerc, Dame Blanche Nord, CTM Jean Moulin, Les Doucettes), événement (sortie CTM, balayage actif PTO ON, vidage benne) et linéaire balayé."));
c.push(P("Le panneau de droite consolide les attributs techniques : immatriculation, marque/modèle (Schmidt Cleango 500), type (Balayeuse compacte 4 m³), énergie (Diesel), service affecté (Propreté urbaine), boîtier GPS (Teltonika FMC650 — n° série 865209071142338), carte SIM, lecture bus (CAN J1939 + capteur PTO), dernière position GPS."));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Couvre l'exigence CCTP §3.1 « relever les paramètres de travail pour engin » et « évaluer une distance balayée par une balayeuse »."));
c.push(bullet("Identification systématique du conducteur à chaque démarrage par badge MIFARE (CCTP §3.1)."));
c.push(bullet("Traçabilité 100 % véhicule ↔ boîtier ↔ SIM — preuve d'inventaire à fournir contradictoirement à la Ville."));
c.push(bullet("Export Excel direct depuis la fiche, conformément au CCTP §3.1 (extractions xlsx)."));

c.push(pageBreak());

// ============================ ANNEXE 4 ============================
c.push(annexHeader("4", "MODULE ANTAI — DÉSIGNATION AUTOMATIQUE DU CONDUCTEUR"));
c.push(image("04_Module_ANTAI.png", 540, 304));
c.push(captionUnder("Module ANTAI — désignation automatique du conducteur sur infractions reçues."));

c.push(subHead("Description de la fonctionnalité"));
c.push(P("Le Module ANTAI (Agence Nationale de Traitement Automatisé des Infractions) intégré nativement à SuperFleet répond à un enjeu fort pour les collectivités gérant une flotte municipale : la désignation du conducteur effectif d'un véhicule lors de la réception d'un avis de contravention. La capture présente le tableau de bord opérationnel du Parc Auto avec les indicateurs clés :"));
c.push(bullet("Avis reçus sur 30 jours : 23 (sur l'exemple)"));
c.push(bullet("Désignés automatiquement : 21 (91 % sans saisie manuelle)"));
c.push(bullet("Conformité aux délais légaux : 100 % (0 hors délai à 45 j)"));
c.push(bullet("Délai moyen de désignation : 2,4 jours"));
c.push(P("Le rapprochement automatique s'effectue par croisement de l'historique de géolocalisation (position GPS au moment de l'infraction) avec l'identification du conducteur par badge MIFARE au démarrage du véhicule. Le système propose alors le conducteur le plus probable, indique le statut (Désigné automatiquement / À valider / Désigné) et permet la télédéclaration directe à l'ANTAI depuis la plateforme."));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Module particulièrement précieux pour une flotte municipale recevant régulièrement des avis (excès de vitesse, stationnement, ZFE-m Grand Paris en cours de durcissement)."));
c.push(bullet("Fait gagner un temps significatif au Parc Auto (élimination de la recherche manuelle conducteur dans les plannings)."));
c.push(bullet("Sécurise la conformité de la Ville en matière de désignation de conducteur dans les délais légaux."));
c.push(bullet("Réduit l'exposition financière de la Ville en cas de non-désignation (amendes à charge de l'employeur)."));

// ============================ ANNEXE 5 ============================
c.push(annexHeader("5", "MODULE CARBURANT — RAPPROCHEMENT PÉTROLIER"));
c.push(image("09_Carburant_rapprochement.png", 540, 304));
c.push(captionUnder("Module Carburant — rapprochement automatique du fichier pétrolier avec les kilomètres SuperFleet."));

c.push(subHead("Description de la fonctionnalité"));
c.push(P("Le Module Carburant répond directement à l'exigence du CCTP §3.1 sur le suivi du carburant. Le pétrolier de la Ville fournit mensuellement un fichier Excel des consommations effectives ; Geoloc Systems récupère ce fichier par dépôt SFTP sécurisé, e-mail dédié ou import manuel via l'interface SuperFleet."));
c.push(P("Le rapprochement automatique croise les consommations pétrolier avec les kilomètres parcourus SuperFleet par chaque véhicule thermique de la flotte, et produit le tableau de surconsommation par rapport aux moyennes flotte. L'exemple présente :"));
c.push(bullet("Conso flotte mai 2026 : 14 820 L pour un coût de 22 130 €"));
c.push(bullet("3 véhicules en surconsommation à analyser par le Parc Auto"));
c.push(bullet("Écart moyen vs référence flotte : +4,1 %"));
c.push(bullet("Détection automatique : DAF AE116C (+20 %), Peugeot 208 (+27 %), Peugeot Boxer (+15 %)"));
c.push(bullet("Comparaisons : MAN TGM (+7 %), Schmidt Cleango (+6 %), Renault Midlum (+3 %)"));
c.push(P("Le bandeau supérieur affiche explicitement « Rapprochement en 3 j (max CCTP 5 j) » — preuve visible de notre engagement opérationnel sur le délai d'analyse.",
        { bold: true }));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Respecte l'exigence CCTP §3.1 « fournir dans un délai de 5 jours un tableau permettant de repérer une surconsommation »."));
c.push(bullet("Engagement Geoloc : délai effectif 3 jours ouvrés (vs 5 j max CCTP) — 2 jours d'avance contractuels."));
c.push(bullet("Bilan accessible en permanence sur l'interface WEB, conformément à l'exigence CCTP §3.1."));
c.push(bullet("Tri direct par surconsommation pour priorisation du Parc Auto + export Excel."));

c.push(pageBreak());

// ============================ ANNEXE 6 ============================
c.push(annexHeader("6", "MODULE TACHYGRAPHE — CONFORMITÉ RÈGL. (CE) 561/2006"));
c.push(image("10_Tachygraphe_conformite.png", 540, 304));
c.push(captionUnder("Module Tachygraphe — conformité temps de conduite/repos (cars Mercedes + PL DAF/MAN)."));

c.push(subHead("Description de la fonctionnalité"));
c.push(P("Le Module Tachygraphe répond aux besoins spécifiques du parc Garges en matière de véhicules soumis à la réglementation européenne du temps de conduite : les 2 cars Mercedes MB E 17 UE de 59 places et les 2 poids lourds (DAF AE116C et MAN TGM ampliroll). La remontée des données s'effectue automatiquement via :"));
c.push(bullet("Le bus FMS pour les cars Mercedes 59 places"));
c.push(bullet("Le CAN J1939 pour les PL DAF AE116C et MAN TGM"));
c.push(bullet("Compatibilité Smart Tacho 2 — chronotachygraphe intelligent de 2e génération"));
c.push(P("La capture présente le tableau de conformité opérationnel avec les indicateurs clés pour le Parc Auto :"));
c.push(bullet("4 véhicules à tachygraphe (2 cars Mercedes + 2 PL)"));
c.push(bullet("100 % de conformité aux temps conduite/repos"));
c.push(bullet("100 % des téléchargements C1B (carte conducteur + véhicule) à jour"));
c.push(bullet("0 alerte de dépassement"));
c.push(P("L'activité journalière est visualisée par diagrammes colorés (Conduite, Autre travail, Disponibilité, Repos) avec totaux par conducteur (Karim MERZOUK, Daniel FONSECA, Nadia BENALI, Walid KHEROUA), véhicule, pauses, repos et amplitude. Le statut « Conforme » est validé automatiquement."));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Couvre l'exigence CCTP §3.1 « informations délivrées par les tachygraphes pour les véhicules concernés »."));
c.push(bullet("Données exploitables par le Parc Auto pour le pilotage du temps de conduite, des pauses et des repos."));
c.push(bullet("Sécurise la conformité réglementaire de la Ville (transports routiers et transport en commun)."));
c.push(bullet("Téléchargements C1B automatiques sans intervention manuelle des conducteurs."));

// ============================ ANNEXE 7 ============================
c.push(annexHeader("7", "INVENTAIRE MATÉRIEL EMBARQUÉ"));
c.push(image("06_Inventaire_materiel_embarque.png", 540, 304));
c.push(captionUnder("Inventaire matériel — 126 boîtiers installés + 14 en stock tampon Île-de-France + 1 en maintenance."));

c.push(subHead("Description de la fonctionnalité"));
c.push(P("L'inventaire centralisé du matériel embarqué permet à la Ville de disposer à tout moment de la vision complète de son parc télématique. Les indicateurs clés présentés :"));
c.push(bullet("126 boîtiers installés (FMC650 + FMC920)"));
c.push(bullet("14 boîtiers en stock tampon Île-de-France (≥ 10 % du parc)"));
c.push(bullet("1 boîtier en maintenance"));
c.push(bullet("100 % de traçabilité véhicule ↔ boîtier ↔ SIM"));
c.push(P("Le tableau détaillé liste chaque équipement avec son véhicule associé, modèle/équipement (Schmidt Cleango 500, MAN TGM, DAF AE116C, Mercedes 59 places, Renault Zoe, Twingo ZE, Kangoo ZE, Goupil G4, Ligier Pulse 4…), boîtier (FMC650 pour les PL/engins/balayeuses, FMC920 pour les VL/VUL), numéro de série unique, opérateur SIM (SFR M2M, Orange M2M), IMEI SIM, date de pose, technicien (Clément NOEL ou Walid KHEROUA) et statut (En service / Stock tampon)."));
c.push(P("Un bouton « Exporter Excel » permet l'export à la demande, conformément au CCTP §3.1."));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Modèle 100 % location conforme à l'exigence CCTP §3.1 — propriété Geoloc Systems, pas d'achat par la Ville."));
c.push(bullet("Traçabilité complète pour facilitation du recettage contradictoire (PV de pose, PV de remplacement)."));
c.push(bullet("Stock tampon physiquement situé à 30 minutes du CTM (Colombes 92 → Garges 95) — remplacement < 24h."));
c.push(bullet("Rapport d'inventaire transmis automatiquement chaque mois au Parc Auto."));

c.push(pageBreak());

// ============================ ANNEXE 8 ============================
c.push(annexHeader("8", "APPLICATION MOBILE SUPERFLEET"));
c.push(image("07_Application_mobile.png", 540, 412));
c.push(captionUnder("Application mobile SuperFleet (iOS & Android) — agents et gestionnaires sur le terrain."));

c.push(subHead("Description de la fonctionnalité"));
c.push(P("L'application mobile SuperFleet est disponible sur iOS et Android, sans surcoût ni licence supplémentaire pour la Ville. Elle reproduit les fonctionnalités essentielles de l'interface web dans une expérience mobile pensée pour les agents terrain et les gestionnaires en déplacement."));
c.push(P("Les 3 écrans présentés illustrent les usages principaux :"));
c.push(bullet("Écran 1 — Carte temps réel : visualisation de la flotte avec position des véhicules et statut (en mouvement, à l'arrêt). Exemple : balayeuse BALAY07 Schmidt Cleango en balayage à 8 km/h à Dame Blanche."));
c.push(bullet("Écran 2 — Éco-conduite véhicule : score sur 100 par véhicule (exemple GF-791-BY Renault Twingo ZE : score 82, 2 freinages brusques, vitesse max 68 km/h, 6 min de ralenti excessif). Module éco-conduite native."));
c.push(bullet("Écran 3 — Alertes poussées en temps réel : exemple « Sortie de zone détectée — BALAY07 sorti de la zone Secteur Dame Blanche à 11:46 » et « Surconsommation détectée — EZ-088-ZF DAF, écart +14 % vs moyenne flotte »."));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Conforme à l'exigence CCTP §3.1 « les services web et applications smartphone »."));
c.push(bullet("Indicateurs d'éco-conduite disponibles sur smartphone du conducteur (exigence CCTP §3.1)."));
c.push(bullet("Réception des alertes en temps réel pour gestionnaires en déplacement (Parc Auto, Propreté urbaine)."));
c.push(bullet("Pas de surcoût utilisateur — multi-utilisateurs sans restriction."));

// ============================ ANNEXE 9 ============================
c.push(annexHeader("9", "TRANSITION ÉNERGÉTIQUE — PILOTAGE FLOTTE ÉLECTRIQUE"));
c.push(image("08_Transition_energetique.png", 540, 304));
c.push(captionUnder("Module Transition énergétique — pilotage de la part électrique du parc Garges-lès-Gonesse."));

c.push(subHead("Description de la fonctionnalité"));
c.push(P("La Ville de Garges-lès-Gonesse a engagé une transition énergétique forte de sa flotte municipale, avec une trentaine de véhicules électriques déjà déployés (Renault Zoe, Twingo ZE, Kangoo ZE, Dacia Spring, Goupil G4 et G6, Ligier Pulse 4, Peugeot E208, Citroën E-C3, Peugeot Expert XL EV, Ford Transit atelier EV). Le Module Transition énergétique de SuperFleet est l'outil de pilotage opérationnel et politique de cette stratégie."));
c.push(P("Les indicateurs clés présentés :"));
c.push(bullet("Part des km en électrique : 38 % (+10 points sur 6 mois — tendance positive)"));
c.push(bullet("tCO₂ évitées YTD 2026 : 14,8 tonnes vs équivalent thermique"));
c.push(bullet("30 véhicules électriques sur 130 (23 % du parc)"));
c.push(bullet("Énergie consommée : 6 920 kWh sur la période"));
c.push(P("La répartition des kilomètres est visualisée par donut (Électrique 38 % / Hybride+essence 26 % / Diesel 36 %), avec une tendance mensuelle ascendante (28 % en décembre → 38 % en mai) démontrant l'accélération de la transition. Le top 5 des véhicules électriques par kilométrage est listé (Zoe, Twingo ZE, Kangoo ZE, Goupil G4, Ligier Pulse 4) — tous à 100 % électriques."));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Réponse directe aux conditions d'exécution environnementales du RC (offre irrégulière sinon)."));
c.push(bullet("Outil de pilotage de la transition énergétique de la Ville, exploitable en communication politique et reporting interne."));
c.push(bullet("Calcul automatique des tCO₂ évitées — alimente le bilan RSE annuel remis à la Ville."));
c.push(bullet("Démontre la valeur ajoutée environnementale directe de SuperFleet (au-delà de la conformité)."));

c.push(pageBreak());

// ============================ ANNEXE 10 ============================
c.push(annexHeader("10", "IA SUPERFLEET AGENT — CHAT & VOIX"));
c.push(image("11_IA_Agent_chat_web.png", 380, 470));
c.push(captionUnder("IA SuperFleet Agent (web) — « Parlez à votre flotte. Elle vous répond. » Géo répond en moins de 3 secondes."));

c.push(image("12_IA_Agent_mobile.png", 360, 500));
c.push(captionUnder("IA SuperFleet Agent (mobile) — assistant conversationnel par chat et par voix avec rapport véhicule structuré."));

c.push(subHead("Description de la fonctionnalité"));
c.push(P("L'IA SuperFleet Agent est la dernière évolution majeure de la plateforme SuperFleet. C'est un assistant conversationnel par chat et par voix qui permet à tout utilisateur d'interroger la flotte en langage naturel, depuis le navigateur web ou depuis l'application mobile, sans devoir maîtriser l'interface graphique complète."));
c.push(P("Exemples d'usages applicables à Garges-lès-Gonesse :"));
c.push(bullet("« Où est la balayeuse BALAY07 ? » → position GPS + dernière activité + conducteur identifié"));
c.push(bullet("« Quel véhicule est le plus proche du quartier Dame Blanche ? » → top 3 véhicules par distance"));
c.push(bullet("« Combien de km en électrique ce mois-ci ? » → bilan énergétique de la flotte EV"));
c.push(bullet("« Quels véhicules sont sortis hors zone aujourd'hui ? » → liste avec horodatage et conducteur"));
c.push(bullet("« Donne-moi le rapport du DAF EZ-088-ZF » → fiche véhicule structurée avec mini-carte"));
c.push(P("La réponse arrive en moins de 3 secondes, en mode chat (texte) ou en mode vocal (synthèse vocale). Sur la version mobile, un bouton micro permet la commande vocale, particulièrement utile pour les gestionnaires en déplacement ou en intervention sur le terrain."));

c.push(subHead("Pertinence pour le marché 26.065"));
c.push(bullet("Réduit significativement la courbe d'apprentissage des agents non-experts (formation Terrain de 30 min suffit)."));
c.push(bullet("Accélère les usages opérationnels du Parc Auto et de la Propreté urbaine."));
c.push(bullet("Permet l'usage de SuperFleet en mobilité, sans interrompre une intervention terrain."));
c.push(bullet("Évolution récente du produit — démonstration du dynamisme R&D Geoloc Systems."));
c.push(bullet("Aucun surcoût pour la Ville — inclus dans l'abonnement SuperFleet."));

c.push(pageBreak());

// ============================ CONCLUSION ============================
c.push(H1("Conclusion — synthèse fonctionnelle"));
c.push(P("Les 10 annexes ci-dessus illustrent par capture d'écran réelle les modules opérationnels de SuperFleet appliqués au contexte spécifique de la Ville de Garges-lès-Gonesse. L'ensemble couvre intégralement les attentes fonctionnelles du CCTP §3.1, et apporte trois valeurs ajoutées différenciantes :"));
c.push(bullet("Un module Carto-Balayage dédié à la Propreté urbaine, conçu pour le métier des collectivités."));
c.push(bullet("Un module ANTAI natif particulièrement précieux pour une flotte municipale exposée aux infractions urbaines (ZFE-m, stationnement, excès de vitesse)."));
c.push(bullet("Un module IA SuperFleet Agent (chat + voix) qui transforme l'usage quotidien de la plateforme par les agents non-experts."));
c.push(P("Geoloc Systems se tient à la disposition de la Ville pour une démonstration en temps réel sur ordinateur, conformément à l'invitation formulée au CCTP §3.1. Notre proximité (siège Colombes à 30 minutes du CTM) permet une présence physique de notre équipe au CTM ou à l'Hôtel de Ville sous 48 heures après votre demande."));

c.push(new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Fin de l'Annexe Illustrations SuperFleet", bold: true, italics: true, color: "1E3A8A", size: 22, font: "Calibri" })] }));
c.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Geoloc Systems SAS — 14 rue de Mantes, 92700 Colombes — SIRET 450 808 878 00026 — Marché 26.065 — Mai 2026",
                           italics: true, color: "64748B", size: 20, font: "Calibri" })] }));

(async () => {
  await save(buildDoc("Annexe 08 — Illustrations SuperFleet", c), "08_Annexe_Illustrations_SuperFleet_GARGES.docx", OUT);
})();
