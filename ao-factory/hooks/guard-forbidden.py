#!/usr/bin/env python3
# OPTIMIZED v3.5 (lot 2) — Garde anti-hallucination DÉTERMINISTE.
# Lit le JSON d'un hook PreToolUse (Write|Edit|MultiEdit) sur stdin,
# extrait le contenu réellement écrit, et bloque (exit 2) si un terme
# interdit littéral est présent. Contrairement au hook "prompt", ce
# contrôle ne dépend pas du jugement du modèle : il est garanti.
import sys, json, re

# Termes interdits LITTÉRAUX (vérifiables sans interprétation) :
#  - ancien nom produit "FleetWatcher" (toujours → "SuperFleet")
#  - ancienne charte graphique (palette v0)
FORBIDDEN = re.compile(r"FleetWatcher|#1F3864|#2E75B6|#D6E4F7", re.IGNORECASE)

# Fichiers où ces termes sont LÉGITIMES (documentation de la règle elle-même).
ALLOW = ("NOTE-TRANSITION", "forbidden-claims", "AUDIT.md",
         "CHANGELOG_OPTIMIZATION", "guard-forbidden")

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)  # entrée illisible → ne pas bloquer (fail-open contrôlé)

    ti = data.get("tool_input", {}) or {}
    fp = ti.get("file_path", "") or ""
    if any(tag in fp for tag in ALLOW):
        sys.exit(0)  # fichier de doc de la règle → autorisé

    parts = []
    if ti.get("content") is not None:
        parts.append(str(ti.get("content")))
    if ti.get("new_string") is not None:
        parts.append(str(ti.get("new_string")))
    for e in (ti.get("edits") or []):
        if isinstance(e, dict) and e.get("new_string") is not None:
            parts.append(str(e.get("new_string")))
    text = "\n".join(parts)

    hits = sorted(set(m.group(0) for m in FORBIDDEN.finditer(text)))
    if hits:
        sys.stderr.write(
            "⛔ BLOQUÉ — garde anti-hallucination déterministe (AO Factory v3.5).\n"
            "Terme(s) interdit(s) détecté(s) : " + ", ".join(hits) + "\n"
            "Corrige avant d'écrire :\n"
            "  • 'FleetWatcher' → 'SuperFleet' (nom produit officiel unique)\n"
            "  • ancienne palette (#1F3864/#2E75B6/#D6E4F7) → "
            "#1565C0 (primaire) / #4285F4 (accent) / #F1F5F9 (fond pair)\n"
        )
        sys.exit(2)  # exit 2 = blocage du tool, stderr renvoyé à Claude
    sys.exit(0)

if __name__ == "__main__":
    main()
