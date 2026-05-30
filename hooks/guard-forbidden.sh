#!/usr/bin/env bash
# OPTIMIZED v3.5 (lot 2) — Garde anti-hallucination DÉTERMINISTE (wrapper).
# Hook PreToolUse (Write|Edit|MultiEdit). Exit 2 = blocage. Exit 0 = autorisé.
# Robuste à l'environnement Cowork : utilise python3 si présent, sinon grep brut.
set -u
input="$(cat)"
here="$(cd "$(dirname "$0")" && pwd)"

if command -v python3 >/dev/null 2>&1; then
  printf '%s' "$input" | python3 "$here/guard-forbidden.py"
  exit $?
fi

# Fallback sans python3 : grep brut sur le JSON d'entrée.
# (Peut sur-bloquer si un terme apparaît hors du contenu écrit — comportement
#  volontairement prudent ; surclassable en désactivant le hook ponctuellement.)
# Exclut les fichiers de documentation de la règle.
if printf '%s' "$input" | grep -qiE 'NOTE-TRANSITION|forbidden-claims|AUDIT\.md|CHANGELOG_OPTIMIZATION|guard-forbidden'; then
  exit 0
fi
if printf '%s' "$input" | grep -qiE 'FleetWatcher|#1F3864|#2E75B6|#D6E4F7'; then
  echo "⛔ BLOQUÉ — garde anti-hallucination déterministe (AO Factory v3.5) : terme interdit détecté (FleetWatcher ou ancienne palette). Remplacer par 'SuperFleet' / palette #1565C0 #4285F4 #F1F5F9." >&2
  exit 2
fi
exit 0
