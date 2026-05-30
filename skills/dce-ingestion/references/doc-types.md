# Patterns de détection des types de documents DCE

## Par nom de fichier (priorité haute)

| Pattern | Type détecté |
|---------|-------------|
| `*RC*`, `*reglement*`, `*règlement*` | RC |
| `*CCTP*`, `*clauses_techniques*`, `*specifications*` | CCTP |
| `*CCAP*`, `*clauses_admin*`, `*administratives*` | CCAP |
| `*DQE*`, `*BPU*`, `*bordereau*`, `*devis*` | DQE/BPU |
| `*AE*`, `*acte_engagement*`, `*engagement*` | AE |
| `*DPGF*` | DPGF (Décomposition Prix Global Forfaitaire) |

## Par contenu textuel (priorité basse)

### RC — Règlement de Consultation
Mots-clés : "règlement de consultation", "modalités de remise", "critères d'attribution", "pondération", "procédure adaptée", "appel d'offres ouvert", "candidats admis"

### CCTP — Cahier des Clauses Techniques
Mots-clés : "cahier des clauses techniques", "spécifications techniques", "exigences fonctionnelles", "prestations attendues", "cahier technique", "clauses techniques particulières"

### CCAP — Clauses Administratives
Mots-clés : "clauses administratives et financières", "pénalités de retard", "résiliation", "prix révisable", "délais d'exécution", "garanties", "assurances"

### DQE/BPU — Tarification
Mots-clés : "bordereau de prix", "prix unitaires", "devis quantitatif estimatif", "quantités prévisionnelles", "désignation des prestations"

### AE — Acte d'Engagement
Mots-clés : "acte d'engagement", "candidat soussigné", "s'engage à réaliser", "offre de prix totale", "dénomination sociale"

## Procédures de marché public

| Type | Seuil indicatif | Caractéristiques |
|------|-----------------|-----------------|
| MAPA | < 215 000 € HT | Procédure adaptée, délais souples |
| AO Ouvert | ≥ 215 000 € HT | Procédure formalisée, BOAMP/JOUE |
| Procédure négociée | Variable | Avec/sans mise en concurrence |
| Accord-cadre | Variable | Mono ou multi-attributaires |
