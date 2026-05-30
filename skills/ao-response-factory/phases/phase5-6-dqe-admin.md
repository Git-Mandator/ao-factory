# PHASES 5 & 6 — DQE Pricing + Vérification Administrative

---

## 💰 PHASE 5 — DQE & Pricing

> Rôle activé : **Contrôleur Pricing/DQE** → skill `bid-manager` section DQE

### Contrôles obligatoires

- Vérifier que chaque ligne du DQE est renseignée (aucun blanc)
- Calculer la marge nette estimée (seuil minimum : A_CONFIRMER avec Said KHAYAT)
- Alerter si prix unitaire en dessous du coût de revient connu
- Vérifier la cohérence hardware (boîtier + installation + SIM) vs SaaS (licence mensuelle)
- Contrôler les variantes si proposées

### Livrables

- `pricing/DQE_PRICING.xlsx` — DQE complété avec prix
- `pricing/PRICING_ALERTS.md` — alertes marges et incohérences détectées

---

## 📂 PHASE 6 — Vérification Administrative

> Rôle activé : **Expert conformité administrative** → skill `evidence-builder`

### Checklist standard Geoloc Systems

| Pièce administrative | Disponible | Chemin |
|---|---|---|
| KBIS ou extrait Sirene (< 3 mois) | À vérifier | `knowledge/annexes/administratif/` |
| Attestation RC professionnelle AXA 2026 | ✅ | `09-attestation-rc-axa-2026.pdf` — valide jusqu'au 01/01/2027 |
| Attestations fiscales et sociales (< 6 mois) | À vérifier | À télécharger sur impots.gouv.fr |
| DUME (Document Unique de Marché Européen) | À vérifier | À générer si exigé par le RC |
| Déclaration sur l'honneur | À vérifier | À signer par Said KHAYAT |
| Attestations assurance décennale (si travaux) | Non applicable | — |
| Certificat de bonne exécution (références) | À vérifier | `knowledge/annexes/administratif/` |

> **Règle absolue :** Tout document dont la validité expire avant la date limite de remise → **INVALIDE → STOP → escalade Said KHAYAT**.

### Livrable

`admin/ADMIN_CHECKLIST.md`
