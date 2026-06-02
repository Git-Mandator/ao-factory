# BRIEF — Structure du mémoire technique GAGNANT (miroir RC)
## Référence maîtresse — AO Factory v3.6.4

> ⭐ **BRIEF LE PLUS IMPORTANT DE LA FACTORY.** Capitalisation des 2 mémoires gagnants :
> **Garges-lès-Gonesse 26.065 (noté 49,5/50)** et **Résidences Yvelines 25-60 (marché gagné)**.
> Ce brief impose la STRUCTURE et la FORME qui font gagner. a07-writer DOIT le suivre.

---

## 🎯 RÈGLE D'OR — Le mémoire est le MIROIR EXACT de la grille de notation du RC

**Ne JAMAIS utiliser une structure générique de 14 sections.** Le mémoire gagnant calque
**sous-critère par sous-critère, dans l'ordre EXACT du Règlement de Consultation**, avec la
**pondération en points affichée dans le titre**.

### Pourquoi c'est décisif
L'évaluateur a une **grille de notation** sous les yeux. Si ton mémoire suit l'ordre de sa grille,
il coche au fur et à mesure → note maximale. Si ton mémoire suit un ordre différent, il cherche,
il s'agace, il sous-note. **La lisibilité pour l'évaluateur est le 1ᵉʳ critère de réussite.**

### Exemple réel — Garges 26.065 (structure = grille RC)
```
1. Propos liminaire
2. Compréhension du besoin de la Ville de Garges-lès-Gonesse
3. Sous-critère 1 — Présentation des fonctionnalités du logiciel (10 pts)
4. Sous-critère 2 — Services de la société et contacts (5 pts)
5. Sous-critère 3 — Gestion des stocks du matériel (5 pts)
6. Sous-critère 4 — Délais d'installation et de désinstallation (10 pts)
7. Sous-critère 5 — Interventions sur le site client (10 pts)
8. Sous-critère 6 — Évolution et mise à jour du logiciel (5 pts)
9. Sous-critère 7 — Mesures environnementales (5 pts)
10. Synthèse des engagements de service
11. Liste des annexes jointes
```

### Exemple réel — Résidences 78 25-60 (structure = grille RC)
```
Sous-critère 1.1 — Méthodologie d'intervention (15 pts)
Sous-critère 1.2 — Qualité de l'outil (10 pts)
Sous-critère 1.3 — Qualité du support technique (10 pts)
Sous-critère 1.4 — RSE (5 pts)
```

> **PROCÉDURE OBLIGATOIRE** : avant de rédiger, extraire de `EXIGENCES.json` / du RC la liste exacte
> des critères et sous-critères NOTÉS avec leur pondération, et construire le sommaire du mémoire
> EXACTEMENT dans cet ordre, avec les points affichés. Si le RC découpe en « Sous-critère 1 à 7 »,
> le mémoire a 7 sections de notation. Si le RC découpe en « 1.1 / 1.2 / 1.3 / 1.4 », idem.

---

## 📐 SQUELETTE TYPE (à adapter à la grille du RC réel)

```
[Page de garde]  — titre marché + réf + lot + acheteur + logo Geoloc + date
[Sommaire]       — reprend l'ordre EXACT de la grille RC

1. PROPOS LIMINAIRE  (≈ 1 page)
   → adresse "Madame, Monsieur" ; cite la réf du marché ; reformule le besoin de l'acheteur ;
     pose Geoloc (éditeur français, Colombes, 22 ans, 10 000 véh, refs ENEDIS/ADANEV/Transalys/Martigues) ;
     ancre la proximité géographique (distance + autoroute + temps) ; annonce les 3 piliers ;
     propose la démonstration en temps réel ; signature Said KHAYAT — Co-fondateur et Directeur Projet.

2. COMPRÉHENSION DU BESOIN DE [ACHETEUR]  (≈ 1,5 page)
   → 2.1 Le contexte territorial (habitants, agglo, quartiers nommés, ZFE, enjeux)
   → 2.2 Le besoin opérationnel exprimé au CCTP (4-6 besoins métier en puces, citer date du CCTP)
   → 2.3 Les particularités de votre parc (ventilation par modèle/énergie, citer l'annexe parc)
   → 1 citation littérale du CCTP entre guillemets avec n° d'article

3 → N. UNE SECTION PAR SOUS-CRITÈRE NOTÉ  (cœur du mémoire — 60-70% du volume)
   Titre = "Sous-critère [n] — [intitulé exact RC] ([X] points)"
   Structure interne de CHAQUE sous-critère :
     [n].1, [n].2, [n].3… sous-sections thématiques
     - Engagement d'ouverture (verbe fort + nom acheteur)
     - 1 tableau de couverture point par point (cf. modèle ci-dessous)
     - 1 illustration / capture annotée (cf. visuels)
     - chiffres engagés (délais, %, volumes) à chaque paragraphe
     - clôture : "Preuve / Annexe : Annexe [X] — [intitulé]."

N+1. SYNTHÈSE DES ENGAGEMENTS DE SERVICE  (tableau récapitulatif)
   → tableau : Engagement | Valeur Geoloc | (vs maxi CCAP) | Renvoi annexe

N+2. LISTE DES ANNEXES JOINTES  (tableau numéroté)
   → N° | Nom du document joint | Pages — TOUTES les annexes citées dans le corps
```

---

## 🧩 LES 4 PATTERNS DE FORME QUI FONT GAGNER

### Pattern 1 — Tableau de couverture point par point (DÉCISIF)

Pour chaque exigence listée dans le CCTP, une ligne avec la réponse SuperFleet en regard.
**C'est ce qui transforme une note moyenne en note maximale** : l'évaluateur voit que CHAQUE
demande est traitée.

```markdown
| Donnée / exigence demandée au CCTP | Couverture SuperFleet |
|---|---|
| Potentiel des véhicules (km et horaires) | Compteur kilométrique CAN-BUS + compteur horaire moteur |
| Temps d'arrêt moteur tournant (ralenti) | Détection contact + régime moteur |
| Position de travail balayeuses/saleuses | Détection PTO via entrée numérique boîtier |
| … (reprendre TOUTES les lignes du tableau CCTP) | … |
```

### Pattern 2 — "Preuve / Annexe" en clôture de chaque section

Chaque sous-critère se termine par une ligne traçant la preuve jointe :
```
Preuve / Annexe : Annexe 4 — Organigramme Geoloc Systems et CV résumés de l'équipe dédiée [ACHETEUR].
```
→ Garantit la cohérence pièces (cf. Phase 4bis) et rassure l'évaluateur.

### Pattern 3 — Tableau d'engagements chiffrés vs maxi CCAP (sur-performance visible)

Montrer qu'on s'engage AU-DELÀ des seuils du CCAP :
```markdown
| Prestation | Engagement Geoloc | Maxi CCAP | Renvoi |
|---|---|---|---|
| Pose 1 véhicule | 1 j ouvré | 2 j CCAP | Annexe 1 |
| Création identifiants | 2 heures | 24 h CCAP | Annexe 1 |
| Reboot ligne SAV | < 1 h | (pénalité 200 €/h) | Annexe 1 |
```

### Pattern 4 — Illustrations annotées intégrées (cf. section visuels)

Chaque module-clé est illustré par une capture annotée avec une légende descriptive précise :
> *« SuperFleet — Cartographie temps réel des 130 véhicules de [ACHETEUR], filtrage par service et
> par énergie, fond OpenStreetMap avec voies internes. »*

---

## 🖼️ VISUELS À GÉNÉRER ET INTÉGRER (Phase 4bis — OBLIGATOIRE)

> ⚠️ Un mémoire gagnant SANS visuel n'existe pas. Garges = 9 visuels intégrés. La factory DOIT
> déclencher `ao-visuels-factory` puis intégrer les images dans le .docx.

| # | Visuel | Script | Placement dans le mémoire |
|---|---|---|---|
| 1 | **Organigramme projet** (équipe nommée + photos/silhouettes) | `gen_all_visuels.py` → organigramme | Sous-critère "Services/équipe" §2.4 |
| 2 | **Carte proximité** siège ↔ client (distance + autoroute) | `gen_all_visuels.py` → carte | Propos liminaire ou sous-critère interventions |
| 3 | **Gantt déploiement** (6 semaines, équipe nommée, cadences) | `gen_all_visuels.py` → gantt | Sous-critère délais |
| 4 | **Schéma logistique** stock (fournisseur → Geoloc → client) | `gen_all_visuels.py` → logistique | Sous-critère gestion stocks |
| 5 | **Infographie** page de garde (KPI clés) | `gen_all_visuels.py` → infographie | Page de garde ou synthèse |
| 6 | **Captures SuperFleet** (cartographie, fiche véhicule, modules) | `ANNEXE_ILLUSTRATIONS_SUPERFLEET_DEMO` (jeu Démoville) | Sous-critère fonctionnalités + Annexe illustrations |

### 📸 Organigramme — gestion des photos (règle v3.6.4)

- Photos disponibles : **Said KHAYAT**, **Mustapha KHEROUA**, **Samia MAKHLOUF** (dans `RH-Recrutement/CVs/`)
- Photos manquantes : Clément NOEL, Walid KHEROUA, Chaima GACI, Smaël KESSOURI
  → **placeholder silhouette neutre (avatar gris) + nom + rôle** (jamais de case vide, jamais inventer une photo)
- Le tableau équipe du mémoire reprend : Photo (ou silhouette) | Rôle | Personne & expérience | Mission auprès de [ACHETEUR]

---

## 👥 L'ÉQUIPE NOMMÉE (à reprendre tel quel — source équipe-projet-detaillee.md)

| Rôle | Personne & expérience | Mission |
|---|---|---|
| Direction de projet | **Said KHAYAT** — Co-fondateur, 22 ans | Pilotage stratégique, COPIL trimestriel sur site, escalade contractuelle |
| Chef de projet / Réf. logiciel | **Mustapha KHEROUA** — Ing. Efrei, 10+ ans, resp. dev SuperFleet | Configuration plateforme, paramétrage rapports, intégration ANTAI, support N2/N3 |
| Resp. technique terrain | **Clément NOEL** — Technicien spécialisé, 10+ ans, Hab. B2VL/BR | Installation, désinstallation, maintenance sur site. Intervention < 1h depuis Colombes |
| Technicien installation | **Walid KHEROUA** — Technicien spécialisé, 10+ ans, Hab. B2VL/BR | Co-responsable installations, binôme Clément NOEL |
| Responsable formation | **Samia MAKHLOUF** — 13 ans d'expérience formation | Conception supports, animation formations (Admin 2h, Gest. 1h30, Terrain 30 min) |
| Représentant Légal — DG | **Smaël KESSOURI** | Signature des actes contractuels, garant final des engagements |
| Support & Qualité | **Chaima GACI** | Suivi administratif, facturation, indicateurs qualité, reporting COPIL |

---

## ✍️ TON ET STYLE (capitalisé sur les gagnants)

1. **Adresse directe à l'acheteur** : « la Ville de… », « votre flotte », « vos quartiers ». Jamais « le client ».
2. **Citations littérales du CCTP** entre guillemets avec n° d'article : *« Le titulaire saura équiper tous nos véhicules sans distinction » — CCTP, article 02.*
3. **Ancrage hyper-local** : nommer les quartiers, les modèles de véhicules, les sites, la distance exacte.
4. **Honnêteté assumée** : « sans nous engager sur des fonctionnalités que nous ne maîtrisons pas ». Renforce la crédibilité.
5. **Proximité = argument n°1** pour les collectivités : distance siège ↔ site, temps d'intervention, COPIL sur site.
6. **Sur-performance chiffrée vs CCAP** : toujours montrer qu'on fait mieux que le seuil maximal imposé.
7. **Pas de formule creuse** : chaque phrase apporte un fait, un chiffre ou un engagement.

---

## ✅ CHECKLIST avant de livrer le mémoire (QA forme)

- [ ] Le sommaire suit l'ordre EXACT de la grille de notation du RC (sous-critères + points affichés)
- [ ] Chaque sous-critère noté a sa propre section avec la pondération dans le titre
- [ ] Chaque section "fonctionnalités" a 1+ tableau de couverture point par point du CCTP
- [ ] Chaque section se termine par "Preuve / Annexe : Annexe X — …"
- [ ] Au moins 5 visuels générés et intégrés (organigramme, carte, Gantt, logistique, captures)
- [ ] Organigramme avec photos OU silhouettes (jamais de case vide)
- [ ] 1 tableau de synthèse des engagements vs maxi CCAP
- [ ] 1 liste finale numérotée des annexes jointes
- [ ] Propos liminaire signé Said KHAYAT — Co-fondateur et Directeur Projet
- [ ] Volume 6000-8000 mots, ancrage local présent (quartiers, modèles, distance)
- [ ] Aucune formule générique, 1 chiffre minimum par paragraphe
