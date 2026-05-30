# BRIEF — Matrice point-par-point SSI (33 items HSE + SSE)
## Chargement rapide — AO Factory v3.6

> Source de vérité pour le § « Réponse point par point à l'Annexe 5 SSI ».
> Capitalisé depuis SPL EBR DAF-2025-15 — 21 items Hébergement + 12 Sécurité système = **33 items**.
> Réponses formatées **conformes / conformes avec réserve** prêtes à reprendre.

> ⚠️ Adapter le nom de l'acheteur et les renvois d'articles à chaque marché.

---

## Hébergement (HSE-01 → HSE-21)

| Item | Exigence | Réponse Geoloc Systems |
|---|---|---|
| HSE-01 | Stockage UE | Conforme. AWS Frankfurt + OVH Gravelines + Flespi Lituanie — 100 % UE. Aucune donnée hors UE. |
| HSE-02 | Politique sauvegarde documentée | Conforme. Quotidienne, conservation 30 j, RPO < 1h, RTO < 4h, tests annuels. Politique en annexe. |
| HSE-03 | Aucune communication sans notification | Conforme. Engagement contractuel de notification immédiate de toute requête (autorités, tiers). |
| HSE-04 | Gestion du changement | Conforme. Procédure formalisée, validation préalable [ACHETEUR] pour toute évolution impactante. |
| HSE-05 | Responsabilité unique | Conforme. Geoloc Systems responsable unique vis-à-vis [ACHETEUR], y compris sous-traitance hébergeurs. |
| HSE-06 | Matrice sécurité | Conforme. Matrice initiale jointe à l'offre, version actualisée à la mise en place (J+15). |
| HSE-07 | Audit possible | Conforme. Clause d'audit acceptée (préavis 30 j). |
| HSE-08 | PSSI + certification | Conforme. PSSI Geoloc Systems formalisée. Certification hébergeurs ISO/IEC 27001 + HDS (OVH). Certification éditeur Geoloc Systems : `[A_CONFIRMER : statut ISO 27001 propre]`. |
| HSE-09 | Datacenter Tier 3 | Conforme. OVHcloud France positionné Tier 3+. Documentation OVH jointe. |
| HSE-10 | PCA | Conforme. PCA Geoloc Systems joint : redondance multi-site, RPO < 1h, RTO < 4h, plan testé annuellement. |
| HSE-11 | Réversibilité | Conforme. Exports CSV/JSON/API à tout moment, suppression certifiée fin de contrat, transition 30 j. |
| HSE-12 | Ségrégation des devoirs | Conforme. Séparation rôles dev/ops/sécurité, comptes nominatifs, MFA, audit trail. |
| HSE-13 | Stricte confidentialité | Conforme. Annexe 2 signée. Clauses confidentialité dans contrats de sous-traitance. |
| HSE-14 | Authentification MFA | Conforme. MFA obligatoire admin, politique mot de passe robuste. |
| HSE-15 | Politique mot de passe alignée | Conforme. Alignement sur politique [ACHETEUR] à la mise en place. |
| HSE-16 | [ACHETEUR] admin unique des users | Conforme. SuperAdmin [ACHETEUR] délivré à la notification, gestion autonome. |
| HSE-17 | Traçabilité | Conforme. Audit trail complet, logs alignés sur politique [ACHETEUR]. |
| HSE-18 | Cloisonnement | Conforme. Row Level Security PostgreSQL, isolation stricte par tenant. |
| HSE-19 | Intégrité | Conforme. Transactions ACID PostgreSQL, TLS 1.3, Codec 8 Extended checksum. |
| HSE-20 | RGPD | Conforme. DPA Art. 28, registre Art. 30, information Art. 13-14, droits Art. 15-22, sécurité Art. 32. |
| HSE-21 | Maintenance + patches | Conforme. Veille CVE continue, patches critiques < 48h, majeurs < 7j, MAJ continue applicative. |

## Sécurité système (SSE-01 → SSE-12)

| Item | Exigence | Réponse Geoloc Systems |
|---|---|---|
| SSE-01 | Description mécanismes | Conforme. Section §4 du mémoire entièrement dédiée. |
| SSE-02 | Protection données perso | Conforme. Chiffrement AES-256 + TLS 1.3, anonymisation, RBAC + RLS, DPA. |
| SSE-03 | Traces uniformes | Conforme. Logs JSON uniformes, horodatage NTP, ID uniques. |
| SSE-04 | Outil consultation traces | Conforme. Console d'audit SuperFleet à disposition [ACHETEUR]. |
| SSE-05 | Suppression contrôlée | Conforme. Procédure documentée, suppression logique puis physique, attestation. |
| SSE-06 | Scripts anonymisation | Conforme. Scripts prêts (conducteur, plaques, géolocalisation pseudonymisée). |
| SSE-07 | Notification 1re connexion | Conforme. Bandeau RGPD à la 1re connexion, acceptation tracée. |
| SSE-08 | Contact sécurité | Conforme. RSSI Geoloc Systems identifié dans la section « Moyens humains ». |
| SSE-09 | Notification divulgation | Conforme. Engagement contractuel de notification immédiate. |
| SSE-10 | Notification incidents | Conforme. Incident majeur < 24h, violation données personnelles < 72h (Art. 33 RGPD). |
| SSE-11 | Anti-démontage | Conforme. Alerte coupure alimentation, mouvement hors usage, ouverture boîtier, notification temps réel. |
| SSE-12 | Intégrité conditions extrêmes | Conforme avec réserve. **Teltonika FMC650 IP67** (engins/PL/extérieur), **FMC920 IP41** (VL/VUL en habitacle). Choix par typologie. |

---

## Accompagnement DPO (à inclure après la matrice)

Geoloc Systems s'engage à mettre son **DPO** (`[A_CONFIRMER : nom et coordonnées du DPO]`) à
disposition du DPO de [ACHETEUR] pendant toute la durée du marché.

**Accompagnement opéré :**
- Interlocution directe DPO ↔ DPO sur sollicitation
- Mise à jour du DPA en cas d'évolution réglementaire
- Co-rédaction de l'AIPD si [ACHETEUR] le souhaite
- Notification des incidents de sécurité dans les délais Art. 33 RGPD (< 72h pour violation de données personnelles)
- Conservation et purge alignées sur la politique [ACHETEUR]

**Indicateur engagé** : délai de réponse aux sollicitations DPO < 5 jours ouvrés.
