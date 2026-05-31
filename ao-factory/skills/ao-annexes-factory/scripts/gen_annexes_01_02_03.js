// Génération des 7 annexes Garges-lès-Gonesse
const lib = require('./lib.js');
const { P, H1, H2, H3, bullet, buildTable, pageBreak, buildDoc, save, AlignmentType } = lib;
const path = require('path');

const OUT = __dirname;

// ====================================================================
// ANNEXE 01 - TABLEAU DE BORD DE SUIVI PROJET
// ====================================================================
async function annexe01() {
  const c = [];
  c.push(H1("ANNEXE 01 — TABLEAU DE BORD DE SUIVI PROJET"));
  c.push(P("Projet SuperFleet — Ville de Garges-lès-Gonesse", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 22 }));
  c.push(P("Marché 26.065 — LOT 1 Géolocalisation de la flotte", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 20 }));
  c.push(P("Date de mise à jour : JJ/MM/AAAA", { align: AlignmentType.CENTER, size: 20 }));

  c.push(H2("1. État d'avancement global"));
  c.push(buildTable(
    ["Phase", "Description", "Date début", "Date fin prévue", "% Avancement", "Statut"],
    [
      ["S0-S1",  "Cadrage + audit parc Garges (130 véh.)",        "JJ/MM/AA", "JJ/MM/AA", "XX %", "En cours"],
      ["S1-S2",  "Paramétrage SuperFleet + pose pilote (8 véh.)", "JJ/MM/AA", "JJ/MM/AA", "XX %", "Planifié"],
      ["S2-S5",  "Déploiement généralisé (~120 véh. restants)",   "JJ/MM/AA", "JJ/MM/AA", "XX %", "Non démarré"],
      ["S5-S6",  "Formation utilisateurs + recette VSR",          "JJ/MM/AA", "JJ/MM/AA", "XX %", "Non démarré"],
    ],
    [1100, 3000, 1400, 1500, 1300, 1338]
  ));
  c.push(P("Indicateur global d'avancement du projet : XX %", { bold: true }));

  c.push(H2("2. Synthèse des indicateurs clés (KPI)"));
  c.push(buildTable(
    ["Indicateur", "Objectif", "Réel", "Écart", "Tendance", "Commentaire"],
    [
      ["Respect des délais (vs CCAP)",                  "100 %", "XX %", "XX %", "↗ / ↘ / →", ""],
      ["Conformité du périmètre (CCTP)",                "100 %", "XX %", "XX %", "↗ / ↘ / →", ""],
      ["Réussite tests fonctionnels SuperFleet",        "100 %", "XX %", "XX %", "↗ / ↘ / →", ""],
      ["Réussite tests Carto-Balayage (Schmidt)",       "100 %", "XX %", "XX %", "↗ / ↘ / →", ""],
      ["Satisfaction utilisateurs Ville",               "> 90 %","XX %", "XX %", "↗ / ↘ / →", ""],
      ["Formations réalisées (Admin/Gest./Terrain)",    "100 %", "XX %", "XX %", "↗ / ↘ / →", ""],
      ["Disponibilité plateforme (SLA)",                "≥ 99,5 %","XX %","XX %","↗ / ↘ / →", ""],
    ],
    [3200, 1100, 1100, 1100, 1500, 1638]
  ));

  c.push(H2("3. Avancement détaillé par composant"));
  c.push(H3("Solution logicielle SuperFleet"));
  c.push(buildTable(
    ["Composant", "% avancement", "Statut", "Commentaire"],
    [
      ["Paramétrage initial des comptes",         "XX %", "Terminé / En cours / À venir", ""],
      ["Configuration des quartiers (Carto-Balayage)", "XX %", "Terminé / En cours / À venir", ""],
      ["Paramétrage rapports auto P. Urbaine",    "XX %", "Terminé / En cours / À venir", ""],
      ["Paramétrage module ANTAI",                "XX %", "Terminé / En cours / À venir", ""],
      ["Recette fonctionnelle contradictoire",    "XX %", "Terminé / En cours / À venir", ""],
    ],
    [3600, 1500, 2500, 2038]
  ));

  c.push(H3("Boîtiers Teltonika FMC650 / FMC920"));
  c.push(buildTable(
    ["Catégorie de véhicules", "Nombre prévu", "Nombre équipé", "% avancement", "Statut"],
    [
      ["Balayeuses Schmidt (Cleango 500, Swingo 200)", "4",  "X", "XX %", "Terminé / En cours / À venir"],
      ["Poids lourds (DAF, MAN)",                      "2",  "X", "XX %", "Terminé / En cours / À venir"],
      ["Cars Mercedes MB E 17 UE 59 places",           "2",  "X", "XX %", "Terminé / En cours / À venir"],
      ["VL pool mairie (C3, 208, Clio, Aygo)",         "~30","X", "XX %", "Terminé / En cours / À venir"],
      ["VL/VUL électriques (Zoe, Twingo ZE, Kangoo ZE)", "~30","X", "XX %", "Terminé / En cours / À venir"],
      ["VUL thermiques (Master, Trafic, Transit)",     "~25","X", "XX %", "Terminé / En cours / À venir"],
      ["Engins (Kubota, JCB, Wacker-Neuson, Toro)",    "~10","X", "XX %", "Terminé / En cours / À venir"],
      ["Goupil G4/G6, Ligier Pulse 4, Piaggio NP6",    "~10","X", "XX %", "Terminé / En cours / À venir"],
      ["Motos Yamaha Tracer 09 (Police Municipale)",   "2",  "X", "XX %", "Terminé / En cours / À venir"],
      ["TOTAL",                                        "~130","X", "XX %", ""],
    ],
    [3200, 1300, 1400, 1300, 2438]
  ));

  c.push(pageBreak());

  c.push(H2("4. Suivi des jalons du projet"));
  c.push(buildTable(
    ["Jalon", "Date prévue", "Date réelle / prévision", "Écart (j)", "Statut", "Commentaire"],
    [
      ["Notification du marché",                "JJ/MM/AA", "JJ/MM/AA", "+/- XX", "Atteint",     ""],
      ["Réunion de lancement",                  "JJ/MM/AA", "JJ/MM/AA", "+/- XX", "Atteint",     ""],
      ["Recensement parc équipable",            "JJ/MM/AA", "JJ/MM/AA", "+/- XX", "À venir",     ""],
      ["Mise en ordre de marche (MOM) 8 véh.",  "JJ/MM/AA", "JJ/MM/AA", "+/- XX", "À venir",     ""],
      ["Vérification d'Aptitude (VA)",          "JJ/MM/AA", "JJ/MM/AA", "+/- XX", "À venir",     ""],
      ["Vérification Service Régulier (VSR)",   "JJ/MM/AA", "JJ/MM/AA", "+/- XX", "À venir",     ""],
      ["Recette finale 100 % flotte",           "JJ/MM/AA", "JJ/MM/AA", "+/- XX", "À venir",     ""],
    ],
    [2800, 1300, 1900, 1100, 1100, 1438]
  ));

  c.push(H2("5. Suivi budgétaire"));
  c.push(buildTable(
    ["Poste", "Budget prévu (HT)", "Engagé", "Reste à engager", "% Consommation"],
    [
      ["Location boîtiers + SIM + plateforme",  "XX XXX €", "XX XXX €", "XX XXX €", "XX %"],
      ["Pose / dépose / maintenance",           "XX XXX €", "XX XXX €", "XX XXX €", "XX %"],
      ["Formation (Admin + Gest. + Terrain)",   "XX XXX €", "XX XXX €", "XX XXX €", "XX %"],
      ["TOTAL (cohérence avec DQE)",            "XX XXX €", "XX XXX €", "XX XXX €", "XX %"],
    ],
    [3600, 1800, 1500, 1500, 1238]
  ));

  c.push(H2("6. Cartographie des risques"));
  c.push(buildTable(
    ["ID", "Risque", "Impact (1-5)", "Probabilité (1-5)", "Criticité", "Actions de mitigation"],
    [
      ["R1", "Indisponibilité véhicule à l'heure prévue (Parc Auto)", "3", "3", "Moyenne", "Reprogrammation, créneau alternatif"],
      ["R2", "CAN-BUS spécifique balayeuse Schmidt",                  "4", "2", "Moyenne", "Escalade ingénierie Geoloc, retour < 24 h"],
      ["R3", "Retard livraison badges MIFARE",                        "3", "2", "Faible",  "Stock tampon Colombes, multi-fournisseurs"],
      ["R4", "Évolution réglementaire CNIL géolocalisation",          "4", "1", "Faible",  "Veille juridique DPO Geoloc + Ville"],
      ["R5", "Acquisition véhicule nouveau protocole CAN",            "2", "3", "Faible",  "Remplacement boîtier sans surcoût"],
    ],
    [600, 3000, 1200, 1500, 1200, 2138]
  ));

  c.push(H2("7. Prochaines étapes clés"));
  c.push(buildTable(
    ["Étape", "Responsable Geoloc", "Date prévue", "Prérequis", "Statut"],
    [
      ["Visite contradictoire parc CTM 108 rue Jean Moulin", "Mustapha KHEROUA", "JJ/MM/AA", "Notification", "À venir"],
      ["Pose pilote des 8 véhicules critiques (S1)",         "Clément NOEL + Walid KHEROUA", "JJ/MM/AA", "MOM", "À venir"],
      ["Formation administrateurs Ville",                    "Samia MAKHLOUF", "JJ/MM/AA", "10 véh. opérationnels", "À venir"],
      ["COPIL n°1",                                          "Said KHAYAT", "JJ/MM/AA", "S+2 semaines", "À venir"],
    ],
    [3600, 2200, 1300, 1300, 1238]
  ));

  c.push(H2("8. Historique des mises à jour"));
  c.push(buildTable(
    ["Date", "Version", "Auteur", "Principales modifications"],
    [
      ["JJ/MM/AAAA", "V1.0", "Said KHAYAT — Geoloc Systems", "Version initiale, notification du marché"],
      ["JJ/MM/AAAA", "V1.1", "",                              ""],
    ],
    [1500, 1000, 3000, 4138]
  ));

  return save(buildDoc("Annexe 01 — Tableau de bord projet", c), "01_Tableau_de_bord_suivi_projet_GARGES.docx", OUT);
}

// ====================================================================
// ANNEXE 02 - COMPTE-RENDU COPIL
// ====================================================================
async function annexe02() {
  const c = [];
  c.push(H1("ANNEXE 02 — MODÈLE DE COMPTE-RENDU DE COMITÉ DE PILOTAGE (COPIL)"));
  c.push(P("Projet SuperFleet — Ville de Garges-lès-Gonesse", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 22 }));
  c.push(P("Marché 26.065 — LOT 1 Géolocalisation", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 20 }));

  c.push(H2("Informations générales"));
  c.push(buildTable(
    ["Champ", "Valeur"],
    [
      ["Date de la réunion",       "JJ/MM/AAAA"],
      ["Heure",                    "HH:HH – HH:HH"],
      ["Lieu",                     "Hôtel de Ville (8 Place Nelly Olin) / CTM (108 rue Jean Moulin) / Visioconférence"],
      ["Rédacteur",                "Said KHAYAT — Geoloc Systems"],
      ["N° COPIL",                 "n° (Initial, intermédiaire, phase X, etc.)"],
      ["Cadence prévue",           "Trimestrielle"],
    ],
    [3000, 6638]
  ));

  c.push(H2("1. Participants"));
  c.push(H3("Présents"));
  c.push(buildTable(
    ["Nom Prénom", "Fonction", "Organisation"],
    [
      ["Said KHAYAT",        "Directeur Projet — Co-fondateur",        "Geoloc Systems"],
      ["Mustapha KHEROUA",   "Chef de projet / Réf. logiciel",         "Geoloc Systems"],
      ["[À compléter]",      "Directeur Général Services Techniques",  "Ville de Garges-lès-Gonesse"],
      ["[À compléter]",      "Responsable Parc Auto",                  "Ville de Garges-lès-Gonesse"],
      ["[À compléter]",      "Responsable Propreté Urbaine",           "Ville de Garges-lès-Gonesse"],
    ],
    [2800, 3600, 3238]
  ));
  c.push(H3("Excusés"));
  c.push(buildTable(
    ["Nom Prénom", "Fonction", "Organisation"],
    [["[À compléter]", "", ""]],
    [2800, 3600, 3238]
  ));

  c.push(H2("2. Ordre du jour"));
  c.push(bullet("Point 1 — Bilan de la période écoulée (avancement déploiement, formations, incidents)"));
  c.push(bullet("Point 2 — Indicateurs de service (taux de disponibilité plateforme, délais d'intervention, satisfaction)"));
  c.push(bullet("Point 3 — Risques et actions correctives"));
  c.push(bullet("Point 4 — Évolutions plateforme SuperFleet (notes de version, roadmap trimestrielle)"));
  c.push(bullet("Point 5 — Demandes spécifiques de la Ville (nouvelles fonctionnalités, ajouts/retraits véhicules)"));
  c.push(bullet("Point 6 — Bilan budgétaire et reconductions"));

  c.push(H2("3. Résumé de la situation actuelle"));
  c.push(bullet("Rappel de l'avancement global du projet (% terminé)"));
  c.push(bullet("Synthèse des actions clés réalisées depuis le dernier COPIL"));
  c.push(bullet("Point sur les délais (respect planning CCAP, retards éventuels et pénalités)"));
  c.push(bullet("Point sur le budget (consommation budgétaire vs DQE, reste à engager)"));
  c.push(bullet("Taux de disponibilité plateforme du trimestre (engagement SLA ≥ 99,5 %)"));

  c.push(H2("4. Jalons atteints et décisions prises"));
  c.push(buildTable(
    ["Jalon / Livrable", "Statut", "Date prévue", "Date réelle", "Commentaires"],
    [
      ["Jalon 1", "", "JJ/MM/AA", "JJ/MM/AA", ""],
      ["Jalon 2", "", "JJ/MM/AA", "JJ/MM/AA", ""],
      ["Jalon 3", "", "JJ/MM/AA", "JJ/MM/AA", ""],
    ],
    [3000, 1400, 1500, 1500, 2238]
  ));

  c.push(H2("5. Points traités et décisions prises"));
  c.push(H3("Point 1 : [Titre du point]"));
  c.push(bullet("Contexte : [Description du contexte]"));
  c.push(bullet("Discussion : [Résumé de la discussion]"));
  c.push(bullet("Décision : [Description de la décision prise]"));
  c.push(bullet("Responsable : [Nom du responsable]"));
  c.push(bullet("Échéance : [Date limite]"));

  c.push(H3("Point 2 : [Titre du point]"));
  c.push(bullet("Contexte : [Description du contexte]"));
  c.push(bullet("Discussion : [Résumé de la discussion]"));
  c.push(bullet("Décision : [Description de la décision prise]"));
  c.push(bullet("Responsable : [Nom du responsable]"));
  c.push(bullet("Échéance : [Date limite]"));

  c.push(H2("6. Tableau de suivi des risques"));
  c.push(buildTable(
    ["Risque identifié", "Impact", "Probabilité", "Criticité", "Actions de mitigation", "Responsable", "Échéance"],
    [
      ["Risque 1", "H / M / L", "H / M / L", "H / M / L", "", "", "JJ/MM/AA"],
      ["Risque 2", "H / M / L", "H / M / L", "H / M / L", "", "", "JJ/MM/AA"],
    ],
    [2400, 900, 1100, 900, 1900, 1200, 1238]
  ));

  c.push(H2("7. Plan d'action"));
  c.push(buildTable(
    ["Action", "Responsable", "Échéance", "Statut", "Commentaires"],
    [
      ["", "", "JJ/MM/AA", "", ""],
      ["", "", "JJ/MM/AA", "", ""],
    ],
    [3200, 2000, 1400, 1200, 1838]
  ));

  c.push(H2("8. Prochaines étapes"));
  c.push(bullet("Étape 1 (date prévue) — JJ/MM/AA"));
  c.push(bullet("Étape 2 (date prévue) — JJ/MM/AA"));
  c.push(bullet("Étape 3 (date prévue) — JJ/MM/AA"));

  c.push(H2("9. Prochaine réunion COPIL"));
  c.push(bullet("Date : JJ/MM/AAAA"));
  c.push(bullet("Heure : HH:HH"));
  c.push(bullet("Lieu : Hôtel de Ville de Garges-lès-Gonesse (8 Place Nelly Olin) / Visioconférence"));
  c.push(bullet("Participants attendus : Liste des participants"));

  c.push(H2("10. Annexes"));
  c.push(bullet("Annexe 1 : [Nom du document]"));
  c.push(bullet("Annexe 2 : [Nom du document]"));

  c.push(H2("Validation du compte-rendu"));
  c.push(buildTable(
    ["Pour Geoloc Systems", "Pour la Ville de Garges-lès-Gonesse"],
    [
      ["Nom : Said KHAYAT", "Nom : [À compléter]"],
      ["Fonction : Directeur Projet", "Fonction : [À compléter]"],
      ["Date :", "Date :"],
      ["Signature :", "Signature :"],
    ],
    [4819, 4819]
  ));

  return save(buildDoc("Annexe 02 — Compte-rendu COPIL", c), "02_Modele_CR_COPIL_GARGES.docx", OUT);
}

// ====================================================================
// ANNEXE 03 - COMPTE-RENDU COTECH
// ====================================================================
async function annexe03() {
  const c = [];
  c.push(H1("ANNEXE 03 — MODÈLE DE COMPTE-RENDU DE COMITÉ TECHNIQUE (COTECH)"));
  c.push(P("Projet SuperFleet — Ville de Garges-lès-Gonesse", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 22 }));
  c.push(P("Marché 26.065 — LOT 1 Géolocalisation", { align: AlignmentType.CENTER, italic: true, color: "64748B", size: 20 }));

  c.push(H2("Informations générales"));
  c.push(buildTable(
    ["Champ", "Valeur"],
    [
      ["Date de la réunion",       "JJ/MM/AAAA"],
      ["Heure",                    "HH:HH – HH:HH"],
      ["Lieu / Mode",              "CTM (108 rue Jean Moulin) — présentiel / Visioconférence"],
      ["Rédacteur",                "Mustapha KHEROUA — Geoloc Systems"],
      ["N° COTECH",                "n°"],
      ["Phase en cours",           "Phase X (S1 / S2-S5 / S5-S6)"],
      ["Cadence",                  "Mensuelle pendant déploiement, trimestrielle en exploitation"],
    ],
    [3000, 6638]
  ));

  c.push(H2("1. Participants"));
  c.push(H3("Présents"));
  c.push(buildTable(
    ["Nom Prénom", "Fonction", "Organisation"],
    [
      ["Mustapha KHEROUA", "Chef de projet / Réf. logiciel", "Geoloc Systems"],
      ["Clément NOEL",     "Responsable technique terrain",  "Geoloc Systems"],
      ["[À compléter]",    "Référent technique Parc Auto",   "Ville de Garges-lès-Gonesse"],
      ["[À compléter]",    "Référent technique Propreté Urbaine", "Ville de Garges-lès-Gonesse"],
    ],
    [2800, 3600, 3238]
  ));
  c.push(H3("Excusés"));
  c.push(buildTable(
    ["Nom Prénom", "Fonction", "Organisation"],
    [["[À compléter]", "", ""]],
    [2800, 3600, 3238]
  ));

  c.push(H2("2. Ordre du jour"));
  c.push(bullet("Point 1 — Avancement des poses (par catégorie : balayeuses, PL, cars, VL, VUL, engins)"));
  c.push(bullet("Point 2 — Paramétrage Carto-Balayage et rapports Propreté Urbaine"));
  c.push(bullet("Point 3 — Tests fonctionnels et techniques (CAN-BUS, FMS, MIFARE)"));
  c.push(bullet("Point 4 — Incidents et tickets ouverts"));
  c.push(bullet("Point 5 — Préparation des actions de la semaine suivante"));

  c.push(H2("3. État d'avancement global — SYNTHÈSE"));
  c.push(bullet("Pourcentage d'avancement de la phase en cours : XX %"));
  c.push(bullet("Indicateurs clés de performance (KPI) : [à renseigner]"));
  c.push(bullet("Écarts constatés par rapport au planning : [+/- XX jours]"));

  c.push(H2("4. Suivi des actions précédentes"));
  c.push(buildTable(
    ["Action", "Responsable", "Échéance initiale", "Nouvelle échéance", "Statut", "Commentaires"],
    [
      ["", "", "JJ/MM/AA", "JJ/MM/AA", "", ""],
      ["", "", "JJ/MM/AA", "JJ/MM/AA", "", ""],
    ],
    [2400, 1500, 1500, 1500, 1100, 1638]
  ));

  c.push(H2("5. Points techniques traités"));

  c.push(H3("Aspect 1 — Plateforme SuperFleet et paramétrage"));
  c.push(bullet("État actuel : [à compléter]"));
  c.push(bullet("Avancement du paramétrage des comptes utilisateurs et groupes (Parc Auto / Propreté Urbaine / Bâtiments)"));
  c.push(bullet("Points bloquants éventuels : [à compléter]"));
  c.push(bullet("Décisions opérationnelles : [à compléter]"));

  c.push(H3("Aspect 2 — Boîtiers Teltonika FMC650 / FMC920"));
  c.push(bullet("État actuel : XX véhicules équipés vs XX à équiper"));
  c.push(bullet("Détail par typologie : balayeuses Schmidt (XX/4), cars Mercedes (XX/2), PL (XX/2), VL électriques (XX/30), VUL (XX/55), engins (XX/10), Goupil/Ligier/Piaggio (XX/10), motos (XX/2)"));
  c.push(bullet("Points bloquants éventuels : [à compléter]"));
  c.push(bullet("Décisions opérationnelles : [à compléter]"));

  c.push(H3("Aspect 3 — Lecteurs MIFARE et bouton CNIL (interrupteur vie privée)"));
  c.push(bullet("Compatibilité badges Ville : [à valider à la notification]"));
  c.push(bullet("Position du bouton CNIL : conforme CCTP §3.1 « position très discrète »"));
  c.push(bullet("Décisions opérationnelles : [à compléter]"));

  c.push(H3("Aspect 4 — Module ANTAI"));
  c.push(bullet("Paramétrage du rapprochement automatique géolocalisation / identification conducteur"));
  c.push(bullet("Tests sur cas réels de désignation"));

  c.push(H2("6. Tableau de suivi technique"));
  c.push(buildTable(
    ["Composant", "Nb prévu", "Nb réalisé", "% avancement", "Observations"],
    [
      ["Boîtiers Teltonika FMC650 (PL/engins/balayeuses)", "30",  "X", "XX %", ""],
      ["Boîtiers Teltonika FMC920 (VL/VUL légers)",        "100", "X", "XX %", ""],
      ["Lecteurs MIFARE",                                  "130", "X", "XX %", ""],
      ["Boutons CNIL (interrupteur vie privée)",           "130", "X", "XX %", ""],
      ["Faisceaux adaptateurs CAN J1939 (balayeuses)",     "4",   "X", "XX %", ""],
      ["Faisceaux adaptateurs FMS (cars)",                 "2",   "X", "XX %", ""],
      ["Comptes utilisateurs créés",                       "XX",  "X", "XX %", ""],
      ["Sessions de formation réalisées",                  "3",   "X", "XX %", ""],
    ],
    [3500, 1300, 1300, 1500, 2038]
  ));

  c.push(H2("7. Points d'attention et risques opérationnels"));
  c.push(buildTable(
    ["Risque", "Impact technique", "Probabilité", "Criticité", "Plan d'action", "Responsable", "Échéance"],
    [
      ["", "", "", "", "", "", "JJ/MM/AA"],
    ],
    [2200, 1300, 1100, 1100, 1900, 1100, 938]
  ));

  c.push(H2("8. Nouvelles actions définies"));
  c.push(buildTable(
    ["Action", "Description détaillée", "Responsable", "Échéance", "Priorité", "Dépendances"],
    [
      ["", "", "", "JJ/MM/AA", "Haute / Moyenne / Basse", ""],
    ],
    [1600, 2800, 1600, 1300, 1300, 1038]
  ));

  c.push(H2("9. Planning prévisionnel des 2 prochaines semaines"));
  c.push(buildTable(
    ["Semaine", "Actions prévues", "Intervenants", "Prérequis", "Observations"],
    [
      ["Semaine X",   "", "", "", ""],
      ["Semaine X+1", "", "", "", ""],
    ],
    [1300, 3200, 1900, 1500, 1738]
  ));

  c.push(H2("10. Prochaine réunion COTECH"));
  c.push(bullet("Date : JJ/MM/AAAA"));
  c.push(bullet("Heure : HH:HH"));
  c.push(bullet("Mode : Présentiel CTM / Visioconférence"));
  c.push(bullet("Participants attendus : Liste des participants"));

  c.push(H2("11. Points à remonter au prochain COPIL"));
  c.push(bullet("Point 1 — [à compléter]"));
  c.push(bullet("Point 2 — [à compléter]"));

  c.push(H2("12. Annexes techniques"));
  c.push(bullet("Annexe 1 : [Nom du document]"));
  c.push(bullet("Annexe 2 : [Nom du document]"));

  c.push(P("Document envoyé le JJ/MM/AAAA aux participants. Validation tacite sous 48 h sans retour.",
           { italic: true, color: "64748B" }));

  return save(buildDoc("Annexe 03 — Compte-rendu COTECH", c), "03_Modele_CR_COTECH_GARGES.docx", OUT);
}

// Exécution
(async () => {
  await annexe01();
  await annexe02();
  await annexe03();
})();
