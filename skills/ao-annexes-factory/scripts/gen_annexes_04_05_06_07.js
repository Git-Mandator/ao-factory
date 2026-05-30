// Génération des annexes 04, 05, 07 et nouvelle Boîtier
const lib = require('./lib.js');
const { P, H1, H2, H3, bullet, buildTable, pageBreak, buildDoc, save, AlignmentType } = lib;

const OUT = __dirname;

// ====================================================================
// ANNEXE 04 - PROCÈS-VERBAL DE VÉRIFICATION
// ====================================================================
async function annexe04() {
  const c = [];
  c.push(H1("ANNEXE 04 — MODÈLE DE PROCÈS-VERBAL DE VÉRIFICATION"));
  c.push(P("Projet SuperFleet — Ville de Garges-lès-Gonesse", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 22 }));
  c.push(P("Marché 26.065 — LOT 1 Géolocalisation", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 20 }));

  c.push(H2("Informations générales"));
  c.push(buildTable(
    ["Champ", "Valeur"],
    [
      ["Type de vérification",       "☐ Vérification d'Aptitude (VA)    ☐ Vérification de Service Régulier (VSR)    ☐ PV de pose contradictoire"],
      ["Phase concernée",            "☐ Pose pilote S1    ☐ Déploiement S2-S5    ☐ Recette finale S6"],
      ["Date",                       "JJ/MM/AAAA"],
      ["Référence",                  "PV-[Phase]-[VA/VSR/Pose]-[Date]"],
      ["Lieu",                       "Centre Technique Municipal — 108 rue Jean Moulin, 95140 Garges-lès-Gonesse / Hôtel de Ville — 8 Place Nelly Olin"],
      ["Bon de commande de référence","[Numéro et date du bon de commande]"],
    ],
    [3000, 6638]
  ));

  c.push(H2("1. Représentants présents"));
  c.push(H3("Pour la Ville de Garges-lès-Gonesse"));
  c.push(buildTable(
    ["Nom Prénom", "Fonction"],
    [
      ["[À compléter]", "Responsable Parc Auto"],
      ["[À compléter]", "Référent Propreté Urbaine"],
    ],
    [4819, 4819]
  ));
  c.push(H3("Pour Geoloc Systems"));
  c.push(buildTable(
    ["Nom Prénom", "Fonction"],
    [
      ["Said KHAYAT",      "Directeur Projet"],
      ["Mustapha KHEROUA", "Chef de projet / Réf. logiciel"],
      ["Clément NOEL",     "Responsable technique terrain"],
    ],
    [4819, 4819]
  ));

  c.push(H2("2. Contexte et objet de la vérification"));
  c.push(P("Périmètre de la vérification :"));
  c.push(bullet("☐ Plateforme SuperFleet (web + mobile)"));
  c.push(bullet("☐ Boîtiers télématiques Teltonika FMC650 / FMC920 — Nombre de véhicules : [Nombre]"));
  c.push(bullet("☐ Lecteurs MIFARE et identification conducteur"));
  c.push(bullet("☐ Boutons CNIL (interrupteur vie privée)"));
  c.push(bullet("☐ Carto-Balayage (Propreté Urbaine)"));
  c.push(bullet("☐ Module ANTAI"));
  c.push(bullet("☐ Rapports automatiques (journalier / hebdo / mensuel)"));
  c.push(bullet("☐ Formation des utilisateurs"));
  c.push(bullet("☐ Autre : [Préciser]"));

  c.push(pageBreak());

  c.push(H2("3. Liste des éléments vérifiés et résultats"));

  c.push(H3("3.1  Vérification fonctionnelle SuperFleet"));
  c.push(buildTable(
    ["Fonctionnalité", "Cas de test", "Résultat attendu", "Résultat constaté", "Statut"],
    [
      ["Ajout d'un véhicule",
       "Création de fiche véhicule (immat, marque, modèle, énergie, service)",
       "Véhicule correctement ajouté avec tous ses attributs", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Cartographie temps réel",
       "Visualisation de la flotte sur fonds OSM + IGN",
       "Affichage de tous les véhicules avec position < 30 sec", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Identification conducteur",
       "Passage du badge MIFARE",
       "Conducteur identifié, véhicule démarre", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Anti-démarrage",
       "Démarrage sans badge",
       "Démarreur coupé pendant le délai paramétré", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Bouton CNIL (vie privée)",
       "Activation interrupteur on/off",
       "Remontée géolocalisation suspendue, journalisée", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Alerte véhicule muet (3 jours)",
       "Véhicule sans données 3 jours consécutifs",
       "E-mail alerte automatique au Parc Auto", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Géofencing",
       "Création d'une zone polygonale et alerte de sortie",
       "Alerte temps réel sur l'interface et par e-mail", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Carto-Balayage",
       "Tournée balayeuse Schmidt avec PTO actif",
       "Linéaire balayé tracé, % par quartier visible", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Rapports automatiques",
       "Envoi mail journalier Propreté Urbaine + Parc Auto",
       "Réception J+1 avant 8h", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Module Carburant",
       "Import fichier Excel pétrolier",
       "Surconsommation détectée < 3 j ouvrés", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Module ANTAI",
       "Désignation conducteur sur infraction de test",
       "Identification automatique via badge + position", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Extractions Excel",
       "Export par véhicule, période librement choisie",
       "Fichier .xlsx généré et téléchargeable", "",
       "☐ Conforme  ☐ Non conforme"],
    ],
    [2200, 2400, 2400, 1300, 1338]
  ));

  c.push(H3("3.2  Vérification technique"));
  c.push(buildTable(
    ["Élément", "Exigence", "Résultat attendu", "Résultat constaté", "Statut"],
    [
      ["Temps de réponse interface",
       "Conforme au CCTP",
       "< 1 seconde sur les pages courantes", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Fréquence remontée GPS",
       "1 point / 30 sec en mouvement",
       "Données reçues à 30 sec ± 5 sec", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Sécurité — authentification",
       "Login nominatif + politique mot de passe forte",
       "Compte verrouillé après 5 erreurs", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Hébergement",
       "100 % Union européenne (AWS Frankfurt + OVH Gravelines)",
       "Confirmé par attestation hébergeur", "",
       "☐ Conforme  ☐ Non conforme"],
      ["Disponibilité",
       "SLA ≥ 99,5 %",
       "Accès au service en heures ouvrées", "",
       "☐ Conforme  ☐ Non conforme"],
      ["API et exports",
       "Formats conformes (CSV, XLSX, API JSON)",
       "Tous les exports fonctionnels", "",
       "☐ Conforme  ☐ Non conforme"],
    ],
    [2200, 2400, 2400, 1300, 1338]
  ));

  c.push(H3("3.3  Vérification des livraisons matérielles"));
  c.push(buildTable(
    ["Équipement", "Quantité attendue", "Quantité livrée", "État", "Statut"],
    [
      ["Boîtiers Teltonika FMC650",       "30",  "",  "", "☐ Conforme  ☐ Non conforme"],
      ["Boîtiers Teltonika FMC920",       "100", "",  "", "☐ Conforme  ☐ Non conforme"],
      ["Lecteurs MIFARE",                 "130", "",  "", "☐ Conforme  ☐ Non conforme"],
      ["Boutons CNIL (vie privée)",       "130", "",  "", "☐ Conforme  ☐ Non conforme"],
      ["Faisceaux CAN-BUS spécifiques",   "30",  "",  "", "☐ Conforme  ☐ Non conforme"],
      ["Cartes SIM activées",             "130", "",  "", "☐ Conforme  ☐ Non conforme"],
    ],
    [3000, 1500, 1500, 1500, 2138]
  ));

  c.push(H2("4. Anomalies constatées"));
  c.push(buildTable(
    ["ID", "Description de l'anomalie", "Criticité", "Impact", "Action corrective prévue", "Délai"],
    [
      ["A001", "", "Majeure / Mineure", "", "", "JJ/MM/AA"],
      ["A002", "", "Majeure / Mineure", "", "", "JJ/MM/AA"],
      ["A003", "", "Majeure / Mineure", "", "", "JJ/MM/AA"],
    ],
    [800, 2800, 1400, 1400, 1900, 1338]
  ));

  c.push(H2("5. Conclusion et décision"));
  c.push(P("Sur la base des vérifications effectuées, il est décidé de :"));
  c.push(bullet("☐ PRONONCER la vérification sans réserve"));
  c.push(bullet("☐ PRONONCER la vérification avec réserves (voir anomalies constatées)"));
  c.push(P("Date limite de correction des réserves : JJ/MM/AAAA"));
  c.push(bullet("☐ AJOURNER la vérification jusqu'à correction des anomalies majeures"));
  c.push(P("Nouvelle date de vérification fixée au : JJ/MM/AAAA"));
  c.push(bullet("☐ REJETER la vérification en raison d'écarts majeurs par rapport aux exigences"));

  c.push(H2("6. Remarques complémentaires"));
  c.push(P("[Espace pour observations et commentaires supplémentaires]"));

  c.push(H2("7. Suites à donner"));
  c.push(buildTable(
    ["Action", "Responsable", "Échéance"],
    [["", "", "JJ/MM/AA"], ["", "", "JJ/MM/AA"]],
    [4500, 3000, 2138]
  ));

  c.push(H2("8. Signatures"));
  c.push(P("En signant ce document, les parties reconnaissent avoir procédé aux vérifications décrites ci-dessus et confirment les résultats consignés dans le présent procès-verbal."));
  c.push(buildTable(
    ["Pour la Ville de Garges-lès-Gonesse", "Pour Geoloc Systems"],
    [
      ["Nom : [À compléter]",     "Nom : Said KHAYAT"],
      ["Fonction : [À compléter]", "Fonction : Directeur Projet"],
      ["Date :",                  "Date :"],
      ["Signature :",             "Signature :"],
    ],
    [4819, 4819]
  ));
  c.push(P("Document établi en deux exemplaires originaux.", { italic: true, color: "64748B" }));

  return save(buildDoc("Annexe 04 — PV de vérification", c), "04_Modele_PV_Verification_GARGES.docx", OUT);
}

// ====================================================================
// ANNEXE 05 - TABLEAU DE SUIVI DES INSTALLATIONS
// ====================================================================
async function annexe05() {
  const c = [];
  c.push(H1("ANNEXE 05 — TABLEAU DE SUIVI DES INSTALLATIONS"));
  c.push(P("Projet SuperFleet — Ville de Garges-lès-Gonesse", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 22 }));
  c.push(P("Marché 26.065 — LOT 1 Géolocalisation", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 20 }));

  c.push(H2("1. Suivi d'installation des boîtiers télématiques — extrait du parc Garges"));
  c.push(P("Ce tableau est pré-rempli à partir de l'annexe « Parc de véhicules » du DCE. Il sera complété au fur et à mesure des poses contradictoires.", { italic: true, color: "64748B" }));

  c.push(buildTable(
    ["ID", "Immat.", "Service", "Marque / Modèle", "Type liaison", "Boîtier", "Statut"],
    [
      ["VH001", "BALAY07",   "Propreté U.", "Schmidt Cleango 500",         "CAN J1939 + PTO", "FMC650", "JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH002", "BALAY00",   "Propreté U.", "Schmidt Swingo 200",          "CAN J1939 + PTO", "FMC650", "JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH003", "BALAY01",   "Propreté U.", "Schmidt Swingo 200",          "CAN J1939 + PTO", "FMC650", "JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH004", "BALAY08",   "Propreté U.", "Schmidt Swingo 200",          "CAN J1939 + PTO", "FMC650", "JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH005", "GQ-900-QZ", "Transport",   "Mercedes MB E 17 UE 59 pl.",  "Bus FMS + Tacho","FMC650", "JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH006", "GQ-971-QZ", "Transport",   "Mercedes MB E 17 UE 59 pl.",  "Bus FMS + Tacho","FMC650", "JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH007", "EZ-088-ZF", "Parc Auto",   "DAF AE116C",                  "CAN J1939 + Tacho","FMC650","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH008", "HC-686-CS", "Parc Auto",   "MAN TGM (ampliroll)",          "CAN J1939 + Tacho","FMC650","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH009", "GN-232-KT", "Pool mairie", "Renault Zoe",                 "OBD2 + Constructeur","FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH010", "GN-150-KT", "Pool mairie", "Renault Zoe",                 "OBD2 + Constructeur","FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH011", "GF-791-BY", "Pool mairie", "Renault Twingo ZE",           "OBD2 + Constructeur","FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH012", "GP-914-DP", "Pool mairie", "Renault Twingo ZE",           "OBD2 + Constructeur","FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH013", "GP-609-VN", "Services T.", "Renault Kangoo ZE",           "OBD2 + Constructeur","FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH014", "GE-890-FX", "Services T.", "Renault Kangoo ZE",           "OBD2 + Constructeur","FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH015", "HB-131-FD", "Pool mairie", "Dacia Spring",                "OBD2 + Constructeur","FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH016", "HB-404-KJ", "Pool mairie", "Dacia Spring",                "OBD2 + Constructeur","FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH017", "HB-458-BP", "Pool mairie", "Dacia Spring",                "OBD2 + Constructeur","FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH018", "EQ-210-CS", "Propreté U.", "Goupil G4",                   "Alim. 12V",        "FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH019", "EL-013-QZ", "Propreté U.", "Goupil G4",                   "Alim. 12V",        "FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH020", "GV-587-GB", "Services T.", "Goupil G6",                   "Alim. 12V",        "FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH021", "GD-674-YR", "Services T.", "Ligier Pulse 4",              "Alim. 12V",        "FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH022", "DX-056-VS", "Services T.", "Kubota tracteur L9STW",       "Alim. 12V + horomètre","FMC650","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH023", "CHARG01",   "Services T.", "JCB 407 (tracto-pelle)",      "CAN + horomètre",  "FMC650","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH024", "HB-506-MD", "Police M.",   "Yamaha Tracer 09",            "Alim. 12V",        "FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["VH025", "HB-421-MD", "Police M.",   "Yamaha Tracer 09",            "Alim. 12V",        "FMC920","JJ/MM/AA  ☐ ✓ ☐ ⚠ ☐ ✗"],
      ["…", "(parc complet de ~130 véhicules ; tableau complet maintenu dans SuperFleet)", "", "", "", "", ""],
    ],
    [700, 1100, 1200, 2400, 1800, 1100, 1338]
  ));

  c.push(P("Légende des statuts : ✓ Installation réalisée et validée  |  ⚠ Installation en attente ou partiellement réalisée  |  ✗ Installation non réalisée ou problème identifié",
           { italic: true, color: "64748B", size: 18 }));

  c.push(pageBreak());

  c.push(H2("2. Suivi des sites d'intervention"));
  c.push(buildTable(
    ["ID", "Site", "Adresse", "Type véhicules concernés", "Statut"],
    [
      ["SITE01", "Centre Technique Municipal", "108 rue Jean Moulin, 95140 Garges-lès-Gonesse",
        "Balayeuses, PL, cars, engins, VUL", "☐ Validé  ☐ En cours  ☐ À venir"],
      ["SITE02", "Hôtel de Ville", "8 Place Nelly Olin, BP 2, 95141 Garges-lès-Gonesse Cedex",
        "Pool mairie, VL direction", "☐ Validé  ☐ En cours  ☐ À venir"],
    ],
    [800, 2200, 3000, 2400, 1238]
  ));

  c.push(H2("3. Suivi des rendez-vous d'installation"));
  c.push(buildTable(
    ["Date", "Créneau horaire", "Véhicule / Site", "Contact Ville", "Confirmation", "Statut", "Commentaire"],
    [
      ["JJ/MM/AA", "8h-12h",   "VH001-VH004 (balayeuses)", "[Nom Parc Auto]", "☐ ✓ ☐ ✗", "Planifié / Réalisé / Reporté", ""],
      ["JJ/MM/AA", "13h30-17h", "VH005-VH006 (cars Mercedes)", "[Nom Parc Auto]", "☐ ✓ ☐ ✗", "Planifié / Réalisé / Reporté", ""],
      ["JJ/MM/AA", "8h-12h",   "VH007-VH008 (PL)", "[Nom Parc Auto]", "☐ ✓ ☐ ✗", "Planifié / Réalisé / Reporté", ""],
    ],
    [1300, 1400, 2400, 1500, 1100, 1600, 338]
  ));

  c.push(H2("4. Résumé de l'avancement global"));
  c.push(buildTable(
    ["Semaine", "Catégorie", "Nombre prévu", "Nombre réalisé", "% avancement", "Date MAJ"],
    [
      ["S1", "Engins prioritaires (4 balayeuses + 2 PL + 2 cars)", "8",   "X", "XX %", "JJ/MM/AA"],
      ["S2", "VL pool mairie + VL électriques",                    "30",  "X", "XX %", "JJ/MM/AA"],
      ["S3", "VUL Kangoo ZE, Master, Trafic, Transit, Boxer",      "30",  "X", "XX %", "JJ/MM/AA"],
      ["S4", "Goupil, Ligier, Piaggio, engins",                    "30",  "X", "XX %", "JJ/MM/AA"],
      ["S5", "Reste flotte (motos, vélos, trottinette)",           "25",  "X", "XX %", "JJ/MM/AA"],
      ["S6", "Recette finale 100 % flotte",                        "130", "X", "XX %", "JJ/MM/AA"],
    ],
    [1100, 3700, 1300, 1300, 1300, 938]
  ));

  c.push(H2("5. Synthèse des problèmes rencontrés"));
  c.push(buildTable(
    ["ID", "Véhicule concerné", "Description du problème", "Date identif.", "Action corrective", "Statut", "Date résolution"],
    [
      ["P001", "", "", "JJ/MM/AA", "", "Ouvert / Résolu / En cours", "JJ/MM/AA"],
      ["P002", "", "", "JJ/MM/AA", "", "Ouvert / Résolu / En cours", "JJ/MM/AA"],
    ],
    [600, 1500, 2400, 1300, 1900, 1500, 438]
  ));

  c.push(P("Document mis à jour le : JJ/MM/AAAA — Par : Mustapha KHEROUA — Geoloc Systems",
           { italic: true, color: "64748B" }));

  return save(buildDoc("Annexe 05 — Suivi des installations", c), "05_Tableau_Suivi_Installations_GARGES.docx", OUT);
}

// ====================================================================
// ANNEXE 07 - PLAN DE FORMATION
// ====================================================================
async function annexe07() {
  const c = [];
  c.push(H1("ANNEXE 07 — PLAN DE FORMATION"));
  c.push(P("Projet SuperFleet — Ville de Garges-lès-Gonesse", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 22 }));
  c.push(P("Marché 26.065 — LOT 1 Géolocalisation", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 20 }));

  c.push(H2("1. Présentation générale"));
  c.push(P("Le présent document définit le plan de formation pour la mise en œuvre de la solution SuperFleet au sein de la Ville de Garges-lès-Gonesse. Ce plan couvre l'ensemble des profils utilisateurs identifiés dans le CCTP §3.1 et garantit une appropriation progressive et efficace du système par les différents acteurs du projet (Parc Auto, Propreté Urbaine, services techniques, conducteurs)."));

  c.push(H2("2. Objectifs de la formation"));
  c.push(bullet("Maîtriser les fonctionnalités de la solution SuperFleet selon le profil utilisateur"));
  c.push(bullet("S'approprier les bonnes pratiques d'utilisation (notamment la conformité CNIL géolocalisation des salariés)"));
  c.push(bullet("Être autonomes dans la gestion quotidienne du système"));
  c.push(bullet("Connaître les procédures de demande d'assistance auprès de Geoloc Systems"));
  c.push(bullet("Contribuer à l'optimisation de la gestion du parc automobile (objectif : −10 à −15 % de kilomètres parcourus sur 3 ans)"));

  c.push(H2("3. Publics cibles et besoins spécifiques"));
  c.push(buildTable(
    ["Profil", "Description", "Effectif estimé", "Besoins spécifiques"],
    [
      ["Administrateurs",
       "Référents Parc Auto et services techniques, administrateurs SuperFleet",
       "2 à 5",
       "Paramétrage complet, gestion utilisateurs / droits, configuration alertes / zones, import / export, module ANTAI"],
      ["Gestionnaires (DGST, Parc Auto, Propreté U.)",
       "Agents chargés du suivi opérationnel de la flotte et de l'analyse des données",
       "5 à 15",
       "Consultation, replay, extraction Excel, tableaux de bord, Carto-Balayage, gestion conducteurs, rapports"],
      ["Utilisateurs terrain (conducteurs)",
       "Agents conduisant les véhicules municipaux (services techniques, propreté, mairie)",
       "~130 véhicules → ~150 à 200 conducteurs",
       "Bouton CNIL (interrupteur vie privée), fonctionnement du badge MIFARE, signalement d'incidents, application mobile"],
    ],
    [2400, 3000, 1600, 2638]
  ));

  c.push(H2("4. Modules de formation proposés"));

  c.push(H3("Module 1 — Formation Administrateurs"));
  c.push(bullet("Durée : 2 heures"));
  c.push(bullet("Nombre de participants maximum : 5"));
  c.push(bullet("Mode : Présentiel — CTM ou Hôtel de Ville — animée par Samia MAKHLOUF (13 ans d'expérience formation)"));
  c.push(P("Programme détaillé :", { bold: true }));
  c.push(bullet("Présentation de la plateforme SuperFleet (architecture, accès web et mobile)"));
  c.push(bullet("Gestion des comptes utilisateurs et des groupes (Parc Auto, Propreté Urbaine, services techniques)"));
  c.push(bullet("Matrice de droits granulaires (lecture, écriture, suppression par fonctionnalité)"));
  c.push(bullet("Configuration des alertes (entrée/sortie de zone, surconsommation, véhicule muet 3 jours)"));
  c.push(bullet("Configuration des zones de géofencing (par quartier, par secteur de balayage)"));
  c.push(bullet("Paramétrage des rapports automatiques journaliers, hebdomadaires, mensuels (Propreté U. + Parc Auto)"));
  c.push(bullet("Paramétrage du module ANTAI (rapprochement automatique infraction ↔ conducteur ↔ position)"));
  c.push(bullet("Import du fichier Excel pétrolier — module Carburant"));
  c.push(bullet("Export et exploitation des données"));
  c.push(bullet("Procédures de support et d'escalade Geoloc"));
  c.push(bullet("Exercices pratiques sur l'environnement de production"));

  c.push(H3("Module 2 — Formation Gestionnaires"));
  c.push(bullet("Durée : 1 h 30"));
  c.push(bullet("Nombre de participants maximum : 8"));
  c.push(bullet("Mode : Présentiel — CTM ou Hôtel de Ville — animée par Samia MAKHLOUF"));
  c.push(P("Programme détaillé :", { bold: true }));
  c.push(bullet("Présentation de l'interface SuperFleet et navigation"));
  c.push(bullet("Cartographie temps réel et recherche du véhicule le plus proche"));
  c.push(bullet("Historique des trajets et fonction Replay"));
  c.push(bullet("Consultation des indicateurs d'éco-conduite par véhicule et conducteur"));
  c.push(bullet("Module Carto-Balayage (Propreté Urbaine) : cartographie quotidienne, % par quartier, linéaires balayés, code couleur"));
  c.push(bullet("Lecture des rapports automatiques (journalier, hebdo, mensuel)"));
  c.push(bullet("Extractions Excel personnalisées (par véhicule, période, conducteur, groupe)"));
  c.push(bullet("Gestion des sorties hors horaires et hors zones autorisées (Parc Auto)"));
  c.push(bullet("Suivi des alertes véhicule muet (3 jours)"));
  c.push(bullet("Application mobile SuperFleet (iOS / Android)"));

  c.push(H3("Module 3 — Formation Utilisateurs terrain (conducteurs)"));
  c.push(bullet("Durée : 30 minutes"));
  c.push(bullet("Nombre de participants par session : illimité — possibilité de sessions multiples"));
  c.push(bullet("Mode : Présentiel sur site Ville (CTM ou Hôtel de Ville) + remise d'affichettes plastifiées d'utilisation"));
  c.push(P("Programme détaillé :", { bold: true }));
  c.push(bullet("Présentation des équipements embarqués (boîtier Teltonika, lecteur MIFARE, bouton CNIL)"));
  c.push(bullet("Utilisation du badge agent à chaque démarrage (identification conducteur)"));
  c.push(bullet("Comportement en cas d'oubli de badge (anti-démarrage)"));
  c.push(bullet("Utilisation du bouton de confidentialité (vie privée) — usage hors mission"));
  c.push(bullet("Information sur la conformité CNIL et le respect de la vie privée des agents"));
  c.push(bullet("Application mobile SuperFleet (pour les conducteurs autorisés)"));
  c.push(bullet("Procédure de signalement d'un incident matériel"));

  c.push(pageBreak());

  c.push(H2("5. Supports de formation fournis"));
  c.push(bullet("Manuel utilisateur adapté à chaque profil (Administrateur, Gestionnaire, Conducteur)"));
  c.push(bullet("Supports de présentation au format PDF (remis à la fin de chaque session)"));
  c.push(bullet("Fiches pratiques synthétiques (1 page par fonctionnalité majeure)"));
  c.push(bullet("Tutoriels vidéo accessibles en ligne sur le portail support Geoloc"));
  c.push(bullet("Affichettes plastifiées format A4 pour les conducteurs (pose, identification, bouton CNIL)"));
  c.push(bullet("Environnement de test SuperFleet pour les exercices pratiques"));

  c.push(H2("6. Calendrier prévisionnel"));
  c.push(buildTable(
    ["Phase", "Module", "Public", "Date prévisionnelle", "Lieu", "Formateur Geoloc"],
    [
      ["S3", "Module 1", "Administrateurs",  "S+3 semaines après notification", "Hôtel de Ville",        "Samia MAKHLOUF"],
      ["S4", "Module 2", "Gestionnaires",    "S+4 semaines après notification", "Hôtel de Ville / CTM",  "Samia MAKHLOUF"],
      ["S5", "Module 3", "Conducteurs (vague 1)", "S+5 semaines après notification", "CTM",              "Samia MAKHLOUF"],
      ["S6", "Module 3", "Conducteurs (vague 2)", "S+6 semaines après notification", "CTM",              "Samia MAKHLOUF"],
      ["Annuel", "Rappel", "Tous profils", "Selon besoins exprimés au COPIL",   "À définir",             "À définir"],
    ],
    [900, 1100, 2400, 2500, 1600, 1138]
  ));

  c.push(H2("7. Évaluation et suivi de la formation"));
  c.push(bullet("Évaluation des acquis : quiz à la fin de chaque module"));
  c.push(bullet("Enquête de satisfaction : formulaire remis à chaque participant en fin de session"));
  c.push(bullet("Suivi post-formation : assistance renforcée pendant 1 mois après la dernière session"));
  c.push(bullet("Sessions de rappel : proposées si nécessaire après évaluation, sans surcoût pour la Ville"));
  c.push(bullet("Indicateurs de suivi remontés en COPIL : taux de participation, taux de satisfaction, taux de maîtrise"));

  c.push(H2("8. Documentation et ressources complémentaires"));
  c.push(bullet("Base de connaissances en ligne SuperFleet"));
  c.push(bullet("FAQ interactive"));
  c.push(bullet("Guides utilisateurs détaillés (PDF téléchargeables)"));
  c.push(bullet("Vidéos tutorielles intégrées à l'interface"));
  c.push(bullet("Helpdesk Geoloc accessible L–V 8h–18h (CCTP §3.1) avec ticketing 24h/24"));

  c.push(H2("9. Moyens techniques et logistiques"));
  c.push(H3("Moyens fournis par Geoloc Systems"));
  c.push(bullet("Formatrice qualifiée (Samia MAKHLOUF, 13 ans d'expérience formation logiciels métier)"));
  c.push(bullet("Supports de formation imprimés et numériques"));
  c.push(bullet("Environnement de test SuperFleet (production miroir)"));
  c.push(bullet("Tablettes / ordinateurs de démonstration"));
  c.push(bullet("Documentation utilisateur complète"));
  c.push(H3("Moyens à fournir par la Ville de Garges-lès-Gonesse"));
  c.push(bullet("Salle de formation équipée (Hôtel de Ville ou CTM)"));
  c.push(bullet("Vidéoprojecteur"));
  c.push(bullet("Connexion internet"));
  c.push(bullet("Organisation des sessions et convocation des participants par le Parc Auto"));

  c.push(H2("Signature"));
  c.push(buildTable(
    ["Pour Geoloc Systems", "Pour la Ville de Garges-lès-Gonesse"],
    [
      ["Nom : Said KHAYAT",           "Nom : [À compléter]"],
      ["Fonction : Directeur Projet",  "Fonction : [À compléter]"],
      ["Date :",                      "Date :"],
      ["Signature :",                 "Signature :"],
    ],
    [4819, 4819]
  ));

  return save(buildDoc("Annexe 07 — Plan de formation", c), "07_Plan_Formation_GARGES.docx", OUT);
}

// ====================================================================
// ANNEXE BOÎTIER - Fiche technique Teltonika FMC650 / FMC920 (NOUVELLE)
// ====================================================================
async function annexeBoitier() {
  const c = [];
  c.push(H1("ANNEXE BOÎTIER — FICHE TECHNIQUE DU MATÉRIEL EMBARQUÉ"));
  c.push(P("Projet SuperFleet — Ville de Garges-lès-Gonesse", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 22 }));
  c.push(P("Marché 26.065 — LOT 1 Géolocalisation", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 20 }));

  c.push(H2("1. Présentation des boîtiers proposés"));
  c.push(P("Geoloc Systems propose deux références de boîtiers Teltonika, fabricant lituanien reconnu mondialement dans la télématique embarquée. La gamme retenue est sélectionnée par typologie de véhicule pour garantir la meilleure adéquation entre coût et fonctionnalités, tout en assurant une compatibilité ascendante sur la durée du marché."));

  c.push(buildTable(
    ["Modèle", "Périmètre d'usage", "Typologies du parc Garges"],
    [
      ["Teltonika FMC650",
       "Boîtier polyvalent pour véhicules lourds, engins et équipements professionnels avec lecture CAN-BUS J1939 / FMS et tachygraphe numérique",
       "Balayeuses Schmidt (Cleango 500, Swingo 200), poids lourds DAF AE116C et MAN TGM, cars Mercedes MB E 17 UE 59 places, tracto-pelle JCB 407, mini-pelle Wacker-Neuson 2503, tracteurs Kubota, tondeuses Toro Groundmaster"],
      ["Teltonika FMC920",
       "Boîtier compact pour véhicules légers, utilitaires et deux-roues, lecture OBD2 + connecteur constructeur",
       "Renault Zoe, Twingo ZE, Kangoo ZE, Dacia Spring, Goupil G4/G6, Ligier Pulse 4, Peugeot E208, Citroën E-C3, Master, Trafic, Ford Transit, Peugeot Boxer, motos Yamaha Tracer 09, vélos et trottinette électriques"],
    ],
    [2200, 2800, 4638]
  ));

  c.push(H2("2. Caractéristiques techniques — Teltonika FMC650"));
  c.push(buildTable(
    ["Caractéristique", "Spécification"],
    [
      ["Fabricant",                  "Teltonika Telematics UAB (Lituanie, Union européenne)"],
      ["Connectivité cellulaire",    "4G LTE Cat 4 (jusqu'à 150 Mbps / 50 Mbps) avec repli 3G UMTS / 2G GSM"],
      ["Bandes 4G",                  "Bandes européennes B1, B3, B7, B8, B20, B28 — couverture France et UE"],
      ["GNSS",                       "GPS, GLONASS, Galileo, BeiDou — précision typique < 3 m, Time-to-First-Fix < 30 s"],
      ["Antennes",                   "GNSS et cellulaire internes haute sensibilité"],
      ["Dead Reckoning",             "Capteur inertiel intégré — positionnement maintenu en perte GPS (tunnels, parkings souterrains)"],
      ["Bluetooth",                  "Bluetooth 4.0 LE pour accessoires (lecteur badge, sonde température, etc.)"],
      ["Mémoire interne",            "128 Mo (~47 000 enregistrements stockés en cas de perte réseau)"],
      ["Stockage embarqué",          "Stockage local + retransmission automatique au retour réseau (conforme CCTP §3.1)"],
      ["Tension d'alimentation",     "10 à 30 VDC — compatible 12 V (VL, motos) et 24 V (PL, cars, engins)"],
      ["Consommation",               "< 50 mA en veille — impact négligeable sur la batterie des engins peu roulants (Kubota, Toro)"],
      ["Indice de protection",       "IP67 — étanchéité totale poussière et immersion, idéal balayeuses Schmidt et engins extérieurs"],
      ["Plage de température",       "−40 °C à +85 °C — adaptée aux conditions d'usage municipal"],
      ["Dimensions et poids",        "Environ 79 × 79 × 27 mm — 91 g"],
      ["Entrées / Sorties",          "Entrées numériques (PTO, contact, bouton CNIL), sorties relais (anti-démarrage), entrée analogique (FuelLevel)"],
      ["Interfaces véhicule",        "CAN-BUS J1939 (PL, balayeuses), bus FMS (cars), interface tachygraphe DDS / Smart Tacho 2"],
      ["Protocoles supportés",       "Codec 8 Extended (Teltonika), MQTT, TCP/UDP — réception SuperFleet < 1 seconde"],
      ["Mise à jour firmware",       "Over-The-Air (OTA), sans intervention sur site"],
      ["Conformité réglementaire",   "Marquage CE, directives RoHS et REACH, R-118 (sécurité véhicule), GDPR by design"],
      ["Garantie constructeur",      "2 ans (à charge intégrale Geoloc Systems — la Ville n'a aucun coût matériel)"],
    ],
    [3000, 6638]
  ));

  c.push(pageBreak());

  c.push(H2("3. Caractéristiques techniques — Teltonika FMC920"));
  c.push(buildTable(
    ["Caractéristique", "Spécification"],
    [
      ["Fabricant",                  "Teltonika Telematics UAB (Lituanie, Union européenne)"],
      ["Connectivité cellulaire",    "4G LTE Cat 1 avec repli 2G — adapté aux usages VL / VUL"],
      ["GNSS",                       "GPS, GLONASS, Galileo — précision typique < 3 m"],
      ["Antennes",                   "GNSS et cellulaire internes"],
      ["Bluetooth",                  "Bluetooth 4.0 LE"],
      ["Mémoire interne",            "Stockage embarqué + retransmission automatique au retour réseau"],
      ["Tension d'alimentation",     "10 à 30 VDC"],
      ["Consommation",               "< 30 mA en veille"],
      ["Indice de protection",       "IP41 (boîtier intérieur véhicule, sous tableau de bord)"],
      ["Plage de température",       "−20 °C à +70 °C"],
      ["Dimensions et poids",        "Boîtier compact ~71 × 53 × 20 mm — environ 50 g"],
      ["Entrées / Sorties",          "Entrées numériques (contact, bouton CNIL), sortie relais (anti-démarrage), entrée OBD2"],
      ["Interfaces véhicule",        "Connecteur OBD2 ou raccordement direct sur le faisceau constructeur"],
      ["Protocoles supportés",       "Codec 8 Extended, MQTT, TCP/UDP"],
      ["Mise à jour firmware",       "Over-The-Air (OTA)"],
      ["Conformité réglementaire",   "Marquage CE, directives RoHS et REACH"],
      ["Garantie constructeur",      "2 ans (à charge intégrale Geoloc Systems)"],
    ],
    [3000, 6638]
  ));

  c.push(H2("4. Accessoires associés"));

  c.push(H3("4.1  Lecteur de badges MIFARE"));
  c.push(buildTable(
    ["Caractéristique", "Spécification"],
    [
      ["Modèle",                     "Lecteur RFID 13,56 MHz compatible MIFARE Classic 1K / 4K, DESFire EV1 / EV2"],
      ["Compatibilité badges Ville", "Compatible avec les badges agent existants de la Ville (à valider à la notification : fréquence et format de l'identifiant)"],
      ["Communication boîtier",      "Filaire (RS232 ou 1-Wire) — pas d'interférence radio"],
      ["Position d'installation",    "En habitacle, visible et accessible au conducteur (position validée contradictoirement avec le Parc Auto)"],
      ["Indicateurs",                "LED multicolore (verte = identifié, rouge = refusé) + buzzer discret"],
      ["Alimentation",               "Délivrée par le boîtier — pas de batterie indépendante à entretenir"],
      ["Indice de protection",       "IP54 (habitacle)"],
    ],
    [3000, 6638]
  ));

  c.push(H3("4.2  Bouton « CNIL » — interrupteur de confidentialité (vie privée)"));
  c.push(buildTable(
    ["Caractéristique", "Spécification"],
    [
      ["Fonction",                   "Désactivation temporaire de la remontée géolocalisation pour les usages hors mission, conformément à la délibération CNIL n° 2015-165"],
      ["Type",                       "Interrupteur ON/OFF discret, sans verrou, raccordé à une entrée numérique du boîtier"],
      ["Position d'installation",    "Position « très discrète » non accessible facilement par le conducteur (CCTP §3.1) — sous tableau de bord, derrière une trappe, en accord avec le Parc Auto"],
      ["Journalisation",             "Tous les passages ON/OFF sont horodatés et accessibles dans SuperFleet (audit RGPD)"],
      ["Conformité",                 "Délibération CNIL n° 2015-165 du 4 juin 2015, articles L.1121-1 et L.1222-4 du Code du travail"],
    ],
    [3000, 6638]
  ));

  c.push(H3("4.3  Faisceaux et adaptateurs"));
  c.push(buildTable(
    ["Type", "Usage", "Véhicules concernés"],
    [
      ["Faisceau CAN J1939",        "Lecture CAN-BUS poids lourds et balayeuses",       "Schmidt Cleango, Swingo, DAF AE116C, MAN TGM, JCB 407"],
      ["Faisceau bus FMS",          "Lecture tachygraphe numérique cars",               "Mercedes MB E 17 UE 59 places"],
      ["Faisceau OBD2",             "Lecture standardisée VL / VUL",                    "Renault, Peugeot, Citroën, Dacia, Ford, Toyota, Nissan"],
      ["Adaptateur Goupil / Ligier","Connexion directe sur faisceau constructeur",      "Goupil G4/G6, Ligier Pulse 4, Piaggio NP6"],
      ["Câble PTO",                 "Détection du mode balayage actif (prise de force)","4 balayeuses Schmidt"],
      ["Relais anti-démarrage",     "Coupure démarreur en l'absence de badge MIFARE",   "Tous véhicules avec lecteur MIFARE"],
    ],
    [2400, 3200, 4038]
  ));

  c.push(pageBreak());

  c.push(H2("5. Performances et engagements"));
  c.push(buildTable(
    ["Performance", "Engagement Geoloc / SuperFleet"],
    [
      ["Fréquence de remontée — véhicule en mouvement",                 "1 point toutes les 30 secondes (paramétrable)"],
      ["Fréquence de remontée — véhicule à l'arrêt",                     "1 point toutes les 5 minutes"],
      ["Événement (allumage, alerte, géofence)",                         "Transmission immédiate — réception SuperFleet < 1 seconde via MQTT"],
      ["Perte réseau (tunnel, sous-sol)",                                "Stockage local + retransmission automatique au retour réseau"],
      ["Précision GPS (95 % du temps en zone urbaine)",                  "< 5 m, < 3 m en ciel dégagé"],
      ["Time-to-First-Fix après pose",                                   "< 30 secondes"],
      ["Disponibilité plateforme SuperFleet",                            "≥ 99,5 % en heures ouvrées"],
      ["Mise à jour firmware",                                           "Over-The-Air, sans intervention sur site, planifiée hors horaires de service"],
    ],
    [4500, 5138]
  ));

  c.push(H2("6. Sécurité et conformité"));
  c.push(bullet("Chiffrement TLS 1.3 des communications entre boîtier et plateforme SuperFleet"));
  c.push(bullet("Authentification mutuelle boîtier ↔ serveur Flespi (Lituanie, UE) puis ↔ SuperFleet (AWS Frankfurt + OVH Gravelines)"));
  out_push_chain(c, [
    "Conformité RGPD by design : tous les flux et stockages sont localisés exclusivement en Union européenne",
    "Conformité CNIL géolocalisation des salariés (délibération n° 2015-165) — bouton CNIL natif, journalisation, droit à la déconnexion hors mission",
    "Conformité matérielle : marquage CE, directives RoHS et REACH, fiche de données techniques constructeur disponible",
    "Reconditionnement systématique en fin de vie matériel : ≥ 70 % du parc remis en service après inspection (engagement écologique)",
    "Matériel non reconditionnable transmis à un éco-organisme agréé DEEE professionnels (Ecologic ou ESR) avec bordereau de suivi remis à la Ville",
  ]);

  c.push(H2("7. Modalités de location et de service"));
  c.push(bullet("Location intégrale du matériel pendant toute la durée du marché, conformément au CCTP §3.1"));
  c.push(bullet("Aucun frais d'achat, aucun frais de remplacement à la charge de la Ville en cas de panne matérielle relevant de notre responsabilité"));
  c.push(bullet("Stock tampon dédié à la Ville situé au siège Geoloc (14 rue de Mantes, 92700 Colombes) — à 30 minutes du CTM de Garges-lès-Gonesse"));
  c.push(bullet("Remplacement de boîtier défaillant sous 1 jour ouvré (engagement vs 2 jours CCAP, pénalité 100 €/jour évitée)"));
  c.push(bullet("Reprise intégrale du matériel à la fin du marché, sans coût pour la Ville"));

  c.push(H2("8. Coordonnées et sources"));
  c.push(P("Fabricant : Teltonika Telematics UAB — Saltoniškių g. 9B-1, 08105 Vilnius, Lituanie — https://teltonika-gps.com"));
  c.push(P("Distributeur et intégrateur : Geoloc Systems SAS — 14 rue de Mantes, 92700 Colombes — SIRET 450 808 878 00026"));
  c.push(P("Les fiches constructeur officielles (datasheets) FMC650 et FMC920 sont disponibles sur simple demande à la Ville et lors de la phase de démonstration en temps réel proposée au CCTP."));

  c.push(P("Document établi par Geoloc Systems SAS pour le marché 26.065 — Ville de Garges-lès-Gonesse — Mai 2026",
           { italic: true, color: "64748B", align: AlignmentType.CENTER }));

  return save(buildDoc("Annexe Boîtier — Fiche technique matériel", c), "06_Annexe_Boitier_Teltonika_GARGES.docx", OUT);
}

function out_push_chain(arr, items) {
  items.forEach(t => arr.push(bullet(t)));
}

(async () => {
  await annexe04();
  await annexe05();
  await annexe07();
  await annexeBoitier();
})();
