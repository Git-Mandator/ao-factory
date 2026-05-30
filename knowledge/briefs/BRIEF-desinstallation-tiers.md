# BRIEF — Désinstallation du matériel télématique tiers (sortie d'un précédent prestataire)
## Chargement rapide — AO Factory v3.6

> Source de vérité : §6.3 OLD_MEMOIRE SPL EBR DAF-2025-15 (lignes 575-579) + §10 politique environnementale (lignes 740-741, 760).
> Pattern capitalisé pour tout AO où l'acheteur sort d'un précédent prestataire télématique
> et exige la dépose du matériel résiduel avant ou pendant la pose du nouveau parc.
> À adapter par marché (nombre de véhicules à déposer, cadence, ligne BPU dédiée).

---

## 1. Cadre contractuel et référence BPU

> Vérifier dans le BPU de l'acheteur la présence d'une **ligne dédiée à la désinstallation du matériel tiers**.
> Sur SPL EBR DAF-2025-15 : **réf. N du BPU — [NB VÉH À DÉPOSER, ex. 56] véhicules estimés**.

| Élément | Référence | Valeur sur SPL EBR (exemple) |
|---|---|---|
| Ligne BPU dédiée désinstallation tiers | [RÉF BPU, ex. réf. N] | réf. N |
| Volume estimé | [NB VÉH À DÉPOSER] | 56 véhicules |
| Prestataire sortant | [NOM SI CONNU / "non communiqué"] | non communiqué |
| Type de matériel à déposer | [GPS / boîtier / faisceau / antenne] | boîtier télématique + faisceau |
| Coordination prestataire sortant | [Souhaitée / non souhaitée / au choix acheteur] | au choix [ACHETEUR] |

> ⚠️ Si le BPU ne prévoit **aucune ligne** pour la désinstallation tiers, signaler la
> question dans `ao-dce-check` : risque de surfacturation hors marché ou de litige.

---

## 2. Méthodologie de dépose en 4 phases

### Phase 1 — Audit pré-dépose ([DÉLAI, ex. J+5 après notification])

- Cartographie exhaustive du matériel à déposer par véhicule (modèle, génération, emplacement,
  type de raccordement : OBD2, faisceau direct, CAN-BUS) ;
- Identification des points sensibles : faisceaux modifiés, soudures non réversibles,
  équipements imbriqués (alarme, anti-démarrage, autoradio) ;
- Recensement contradictoire avec [ACHETEUR] : production d'un **état des lieux pré-dépose**
  par véhicule, signé contradictoirement ;
- Définition du protocole spécifique en cas de matériel dégradé par le prestataire sortant
  (photos avant intervention, réserves contractuelles).

### Phase 2 — Protocole de sécurité électrique

- Déconnexion batterie systématique avant intervention sur faisceau ;
- Vérification absence de tension par technicien habilité ;
- Respect des préconisations constructeur (procédure réinitialisation calculateur si nécessaire) ;
- Plan de prévention systématique pour chantiers > 400h ou opérations dangereuses
  (exigence ORG-05 type) ;
- PIT signé contradictoirement avant chaque intervention sensible.

### Phase 3 — Démontage propre et remise en état

- Démontage du boîtier tiers et de ses accessoires (antenne, lecteur badge, câblage) ;
- **Remise en état du câblage d'origine** : reconnexion des faisceaux constructeur,
  vérification du bon fonctionnement des équipements véhicule (autoradio, plafonnier,
  prise OBD2, etc.) ;
- Nettoyage des emplacements (résidus d'adhésif double-face, fixations) ;
- **Engagement de non-dégradation** : aucune trace visible, aucune perforation
  supplémentaire de la carrosserie ou du tableau de bord ;
- Restitution du véhicule à l'état d'origine, équivalente à la dépose du matériel
  Geoloc en fin de marché (cohérence avec exigence MAT-09 pose réversible).

### Phase 4 — Traçabilité et PV

- **PV de désinstallation** signé contradictoirement par le technicien Geoloc habilité
  et le représentant [ACHETEUR] ;
- Photos avant/après par véhicule archivées dans le SI Geoloc ;
- PV joint à la facturation (ligne BPU [RÉF BPU]) — pas de facturation sans PV ;
- Numéro de série du matériel déposé enregistré pour traçabilité DEEE.

---

## 3. Filière de recyclage DEEE professionnelle

> Engagement contractuel cohérent avec exigence ENV-03 type (politique environnementale).

| Élément | Engagement Geoloc Systems |
|---|---|
| Filière | **DEEE professionnels** — partenariat éco-organisme agréé ([A_CONFIRMER : Ecologic ou équivalent]) |
| Acheminement | Matériel déposé acheminé vers la plateforme de tri Geoloc (siège Colombes) puis remis à l'éco-organisme |
| Traçabilité | **Bordereau de Suivi de Déchets (BSD)** émis pour chaque collecte, archivage 5 ans |
| Reporting | Volumes recyclés et bordereaux DEEE intégrés au **rapport annuel environnemental** transmis à [ACHETEUR] (cohérence ENV-02 type) |
| Conformité | Décret n° 2014-928 du 19 août 2014 (DEEE pro) — directive 2012/19/UE |

> ⚠️ Ne **PAS** prétendre que Geoloc Systems exploite sa propre filière agréée.
> Geoloc adhère à un éco-organisme tiers — le nom exact (Ecologic, ESR, Soren…)
> doit être [A_CONFIRMER : éco-organisme partenaire Geoloc Systems].

---

## 4. Cadence de dépose et planification

> La dépose est typiquement **plus rapide que la pose** (pas de paramétrage,
> pas de vérification de remontée plateforme), mais reste contrainte par la
> disponibilité véhicule et l'audit pré-dépose.

| Indicateur | Engagement type | Valeur sur SPL EBR (exemple) |
|---|---|---|
| Cadence de dépose seule | [CADENCE, ex. 12-15 véh/jour/technicien] | 15 véh/jour/technicien |
| Cadence pose + dépose simultanée | [CADENCE SIMULTANÉE, ex. 6-8 véh/jour/technicien] | 8 véh/jour/technicien |
| Délai total pour [NB VÉH À DÉPOSER] | [DÉLAI TOTAL] | ~4 jours ouvrés (1 technicien dédié) ou 2 jours (2 techniciens) sur les 56 véhicules SPL EBR |
| Mutualisation interventions | Campagnes groupées par site | Beauregard / Villejean / Bruz / Montreuil / Rophémel / Mézières |

---

## 5. Coordination dépose / pose : deux options

> Présenter systématiquement les deux scénarios pour laisser [ACHETEUR] choisir.
> Sur SPL EBR : option simultanée recommandée pour minimiser l'immobilisation véhicule.

### Option A — Dépose + pose **simultanée** (recommandée)

**Bénéfices :**
- Une seule immobilisation par véhicule (~1h au lieu de 2 × 30 min) ;
- Optimisation du déplacement technicien Geoloc — moins de CO2 (cohérence politique RSE) ;
- Continuité de service immédiate : véhicule sort du garage déjà équipé SuperFleet ;
- Pas de période « sans télématique » (perte de visibilité parc pour [ACHETEUR]).

**Conditions :**
- Audit pré-dépose réalisé en amont (Phase 1) ;
- Boîtiers Geoloc disponibles en stock tampon Colombes ;
- Créneau véhicule de ~1h confirmé par responsable exploitation [ACHETEUR].

### Option B — Dépose **séquentielle** (avant pose)

**Bénéfices :**
- Permet à [ACHETEUR] de basculer prestataire en fin de marché précédent
  sans recouvrement contractuel ;
- Audit complet du véhicule possible entre les deux interventions
  (détection anomalies faisceau d'origine).

**Inconvénients :**
- Double immobilisation véhicule ;
- Période sans télématique (à arbitrer si gestion flotte critique).

---

## 6. Engagement contractuel — pas de surfacturation

> Verrou anti-litige à inscrire explicitement dans le mémoire.

```
Geoloc Systems s'engage contractuellement, dans le cadre de la ligne [RÉF BPU]
du BPU [RÉF MARCHÉ] :
1. À facturer la désinstallation du matériel tiers exclusivement au prix unitaire
   de la ligne [RÉF BPU], sans aucun supplément lié à la complexité de dépose,
   au type de matériel rencontré ou au temps réellement passé ;
2. À ne facturer aucun matériel résiduel (boîtier tiers, faisceau, antenne)
   à [ACHETEUR] — la propriété du matériel déposé reste celle du prestataire sortant
   ou est transférée à la filière DEEE selon les directives de [ACHETEUR] ;
3. À fournir, pour chaque véhicule déposé, une attestation de dépose conforme
   précisant : état du véhicule avant/après, matériel déposé (référence, n° de série),
   destination du matériel (restitution prestataire sortant ou filière DEEE),
   absence de dégradation ;
4. À prendre à sa charge toute remise en état nécessaire en cas de dégradation
   constatée a posteriori et imputable à l'intervention de dépose Geoloc Systems.
```

---

## 7. Placeholders standardisés (à instancier par marché)

| Placeholder | Description |
|---|---|
| `[ACHETEUR]` | Nom complet de l'acheteur public (ex. « SPL Eau du Bassin Rennais ») |
| `[RÉF MARCHÉ]` | Référence marché (ex. « DAF-2025-15 ») |
| `[RÉF BPU]` | Référence ligne BPU dédiée désinstallation tiers (ex. « réf. N ») |
| `[NB VÉH À DÉPOSER]` | Nombre de véhicules concernés par la dépose tiers (ex. « 56 ») |
| `[CADENCE]` | Cadence quotidienne par technicien (ex. « 15 véh/jour ») |
| `[DÉLAI TOTAL]` | Délai global estimé pour la campagne de dépose |
| `[NOM PRESTATAIRE SORTANT]` | Si communiqué dans le DCE, sinon « non communiqué » |
| `[A_CONFIRMER : éco-organisme]` | Nom exact de l'éco-organisme DEEE partenaire Geoloc |
| `[DATE DÉBUT CAMPAGNE]` | Date prévisionnelle de démarrage |

---

## ⚠️ Points de vigilance

- **Pas d'invention de chiffres** : le nombre de véhicules à déposer, la cadence et le délai
  total doivent venir du DCE ou être marqués `[A_CONFIRMER]`.
- **DEEE** : Geoloc Systems n'est **pas** un éco-organisme agréé — adhère à un éco-organisme tiers
  (Ecologic ou équivalent). Ne pas écrire « notre filière agréée DEEE ».
- **Coordination prestataire sortant** : optionnelle, à la discrétion de l'acheteur. Ne pas
  imposer ; proposer comme service.
- **CAN-BUS** : si le matériel tiers déposé exploitait le CAN-BUS, la dépose doit inclure
  la déconnexion propre du faisceau CAN — vérification véhicule par véhicule (cohérence
  règle anti-hallucination CAN-BUS).
- **PV de dépose ≠ PV de désinstallation tiers** : bien distinguer (le premier concerne
  la dépose du matériel Geoloc en fin de marché, le second la dépose du matériel d'un
  prestataire antérieur en début de marché).
- **Engagement de non-dégradation** : à formuler comme engagement contractuel ferme, pas
  comme « best effort ». Geoloc Systems prend à sa charge toute remise en état.
- **Facturation conditionnée au PV** : verrou anti-litige — pas de PV signé, pas de
  facturation possible sur la ligne [RÉF BPU].

---

## Checklist insertion mémoire

- [ ] Ligne BPU dédiée désinstallation tiers identifiée et référencée
- [ ] Nombre de véhicules à déposer confirmé depuis DCE (Annexe 4 type ou équivalent)
- [ ] Cadence et délai total instanciés (pas de placeholder résiduel)
- [ ] Option simultanée vs séquentielle présentée — recommandation Geoloc explicite
- [ ] Éco-organisme DEEE nommé ou marqué `[A_CONFIRMER]`
- [ ] Engagement de non-dégradation présent en clair
- [ ] Engagement de non-surfacturation présent en clair
- [ ] Attestation de dépose conforme mentionnée comme livrable
- [ ] PV de désinstallation distinct du PV de pose et du PV de dépose fin de marché
- [ ] Cohérence avec §6.3 du mémoire (protocole pose et dépose) vérifiée
- [ ] Cohérence avec §10 (politique environnementale, DEEE, ENV-02/ENV-03) vérifiée
