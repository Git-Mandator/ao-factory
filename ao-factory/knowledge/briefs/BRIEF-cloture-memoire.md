# BRIEF — Clôture mémoire technique (annexes A→K + validité + signature)
## Chargement rapide — AO Factory v3.6

> Source de vérité pour les 3 derniers éléments d'un mémoire technique AO :
> liste des annexes, engagement de validité, cohérence pièces et signature.
> Capitalisé depuis SPL EBR DAF-2025-15. À adapter par marché (durée validité, date, signataire).

---

## 1. Liste des annexes au mémoire (A → K)

> Reprendre la liste ci-dessous ; cocher/retirer selon ce que tu joins réellement. Au minimum
> A, B, C, G, K sont attendus. D, E, F, H, I, J = bonus différenciants.

| Annexe | Contenu |
|---|---|
| **A** | Schéma d'architecture SaaS SuperFleet |
| **B** | Fiche technique boîtier Teltonika **FMC650 / FMC920** |
| **C** | Matrice de conformité aux [N] exigences DCE |
| **D** | Plan de pose type — protocole d'installation |
| **E** | CV anonymisés de l'équipe projet + habilitations |
| **F** | Politique RSE Geoloc Systems |
| **G** | Annexe illustrations SuperFleet — captures d'écran (jeu démo Démoville) |
| **H** | Plan de formation détaillé — 3 niveaux (Administrateur, Responsable de service, Utilisateur) |
| **I** | Plan de continuité d'activité (PCA) Geoloc Systems |
| **J** | Modèle de DPA (Data Processing Agreement) RGPD |
| **K** | Attestation RC Pro AXA (valide jusqu'au 01/01/2027) |

> ⚠️ Vérifier `INDEX-ANNEXES.md` : chaque annexe citée doit exister physiquement
> dans `knowledge/annexes/` et porter le statut 🟢 (ou être anonymisée).

---

## 2. Engagement de validité de l'offre

> Durée standard = **120 jours**. Vérifier l'article 4 du RC : certains AO imposent 180 j ou 90 j.

```
Geoloc Systems s'engage à maintenir les termes de la présente offre pendant [120 jours]
à compter de la date limite de remise des offres ([DATE LIMITE RC]), conformément à
l'article [N] du RC [RÉF MARCHÉ].
```

---

## 3. Cohérence des pièces (paragraphe de clôture)

```
Le présent mémoire technique est cohérent avec :
- Le CCP daté, paraphé et signé sans modification ;
- l'Annexe 1 (BPU) complétée ;
- l'Annexe 2 (attestation de confidentialité) signée ;
- l'Annexe 3 (attestation RGPD) signée ;
- l'Annexe 4 (état de parc) complétée avec ventilation natif / boîtier ;
- l'Annexe 5 (exigences SSI) complétée — 33 items renseignés ;
- l'Annexe A (DQE) complétée.
```

> Adapter la liste aux annexes du DCE réel (numérotation et nom acheteur peuvent varier).

---

## 4. Signature

```
Fait à Colombes, le [DATE DE SIGNATURE]

Said KHAYAT
*Co-fondateur — Directeur*
*Geoloc Systems*
[Signature]

*Document confidentiel — Geoloc Systems / SuperFleet — Mémoire technique [RÉF MARCHÉ] — version 1.0*
```

---

## Checklist clôture (avant export `.docx`)

- [ ] Liste annexes correspond aux fichiers réellement joints dans `remise/`
- [ ] Durée de validité vérifiée vs RC (généralement 120 j)
- [ ] Date limite de remise des offres recopiée correctement
- [ ] Numérotation annexes BPU/SSI/etc. alignée sur le DCE de l'acheteur
- [ ] Date de signature = jour du dépôt (pas une date passée)
- [ ] Ville de signature : **Colombes** (siège Geoloc)
- [ ] Signataire = Said KHAYAT (sauf délégation explicite)
