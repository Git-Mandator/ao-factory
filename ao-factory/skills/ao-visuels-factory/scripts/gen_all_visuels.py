"""
AO Visuels Factory — Génération des 5 visuels du mémoire technique AO Geoloc Systems.

Version : v3.5 (mai 2026)
Source : capitalisation Garges-lès-Gonesse (26.065) + Résidences Yvelines (25-60)

USAGE :
    1. Éditer le bloc CONFIG ci-dessous avec les paramètres du nouvel AO
    2. python3 gen_all_visuels.py
    3. Les 5 PNG sont produits dans OUTPUT_DIR

DÉPENDANCES :
    pip install --break-system-packages Pillow
"""
from PIL import Image, ImageDraw, ImageFont
import os

# ============================================================================
# === CONFIG — À PERSONNALISER POUR CHAQUE AO ================================
# ============================================================================

# --- Identité du donneur d'ordres ---
CLIENT_NAME = "VILLE DE GARGES-LÈS-GONESSE"        # Pleine longueur, MAJ
CLIENT_SHORT = "GARGES-LÈS-GONESSE"                 # Nom court
CLIENT_ADDRESS = "108 rue Jean Moulin, 95140 Garges-lès-Gonesse"
CLIENT_SITE_NAME = "Centre Technique Municipal"     # CTM, Hôtel de Ville, siège…
MARCHE_REF = "Marché 26.065 — LOT 1"
LOT_OBJECT = "Géolocalisation flotte"

# --- Distance Geoloc Colombes ↔ Client ---
DISTANCE_MIN = 30
DISTANCE_KM = 25
ROAD_LABEL_LEFT = "A86"                              # Autoroute première moitié
ROAD_LABEL_RIGHT = "A1 / N1"                         # Autoroute seconde moitié

# --- Flotte ---
FLEET_SIZE = 130                                     # Nombre de véhicules équipables
DEPLOY_WEEKS = 6                                     # Durée déploiement initial

# --- Photos équipe (organigramme) ---
# Mettre le chemin absolu de la photo si disponible, sinon None → silhouette neutre.
# Photos connues : RH-Recrutement/CVs/ (Said, Mustapha, Samia). Les autres = silhouette.
PHOTOS = {
    "Said KHAYAT":      None,   # ex: "/Users/saidkhayat/Documents/_Personnel/photo said linkedin.jpeg"
    "Mustapha KHEROUA": None,   # ex: ".../RH-Recrutement/CVs/Mustapha KHEROUA.png"
    "Samia MAKHLOUF":   None,   # ex: ".../RH-Recrutement/CVs/Samia MAKHLOUF.png"
    "Clément NOEL":     None,   # silhouette
    "Walid KHEROUA":    None,   # silhouette
    "Smaël KESSOURI":   None,   # silhouette
    "Chaima GACI":      None,   # silhouette
}

# --- Sortie ---
OUTPUT_DIR = "./images"

# ============================================================================
# === PALETTE GEOLOC SYSTEMS (charte AO Factory v3.5) =======================
# ============================================================================
BLUE = "#1E3A8A"          # Bleu marine principal
BLUE_LIGHT = "#3B82F6"
TEAL = "#0F766E"          # Teal accent (RSE, validation)
TEAL_LIGHT = "#14B8A6"
ORANGE = "#F59E0B"        # Orange accent (client)
RED = "#B91C1C"           # Rouge accent (alertes, priorité)
GREEN = "#10B981"         # Vert succès
GRAY = "#374151"
GRAY_LIGHT = "#9CA3AF"
LIGHT = "#F1F5F9"
WHITE = "#FFFFFF"
PURPLE = "#5B2A86"        # Pour Teltonika/fabricant
PURPLE_DARK = "#3D1B5C"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def font(size, bold=False):
    # Ordre : Arial macOS (gère les accents FR), DejaVu Linux, fallback.
    # ⚠️ La police par défaut Pillow ne gère PAS les accents — toujours résoudre une vraie TTF.
    paths = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def avatar(d, img, cx, cy, r, name):
    """Colle la photo de `name` (cercle) si disponible dans PHOTOS, sinon dessine une
    silhouette neutre. Jamais de case vide, jamais de photo inventée."""
    photo_path = PHOTOS.get(name)
    if photo_path and os.path.exists(photo_path):
        try:
            ph = Image.open(photo_path).convert("RGB")
            # crop carré centré + resize
            w, h = ph.size; s = min(w, h)
            ph = ph.crop(((w-s)//2, (h-s)//2, (w-s)//2+s, (h-s)//2+s)).resize((2*r, 2*r))
            mask = Image.new("L", (2*r, 2*r), 0)
            ImageDraw.Draw(mask).ellipse([0, 0, 2*r, 2*r], fill=255)
            img.paste(ph, (cx-r, cy-r), mask)
            d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=PURPLE, width=3)
            return
        except Exception:
            pass
    # Silhouette neutre (avatar gris)
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill="#E2E8F0", outline=GRAY_LIGHT, width=2)
    # tête
    hr = int(r*0.38)
    d.ellipse([cx-hr, cy-int(r*0.45), cx+hr, cy-int(r*0.45)+2*hr], fill="#94A3B8")
    # épaules
    d.pieslice([cx-int(r*0.62), cy+int(r*0.05), cx+int(r*0.62), cy+int(r*1.25)], 180, 360, fill="#94A3B8")

# ============================================================================
# VISUEL 1 — Organigramme projet
# ============================================================================
def visuel_organigramme():
    W, H = 1800, 1240
    img = Image.new("RGB", (W, H), "#FAFAFA")
    d = ImageDraw.Draw(img)

    def rounded_box(x, y, w, h, fill, outline=None):
        d.rounded_rectangle([x, y, x+w, y+h], radius=16, fill=fill, outline=outline)

    # En-tête violet
    d.rectangle([60, 40, W-60, 110], fill=PURPLE_DARK)
    d.text((W//2, 75), f"ORGANIGRAMME PROJET — GEOLOC SYSTEMS / {CLIENT_NAME}",
           font=font(26, True), fill=WHITE, anchor="mm")

    # Section ADMINISTRATION
    d.text((W//2, 170), "ADMINISTRATION", font=font(22, True), fill=GRAY, anchor="mm")
    rounded_box(180, 210, 340, 110, PURPLE)
    d.text((350, 240), "Geoloc Systems", font=font(20, True), fill=WHITE, anchor="mm")
    d.text((350, 275), "Coordination projet", font=font(16), fill=WHITE, anchor="mm")
    d.text((350, 298), "Direction", font=font(14), fill=WHITE, anchor="mm")

    rounded_box(720, 210, 360, 110, BLUE)
    d.text((900, 240), CLIENT_NAME.title(), font=font(18, True), fill=WHITE, anchor="mm")
    d.text((900, 275), "Équipe projet interne", font=font(16), fill=WHITE, anchor="mm")
    d.text((900, 298), "Référents techniques", font=font(13), fill=WHITE, anchor="mm")

    # Représentant Légal
    rounded_box(1280, 200, 340, 70, ORANGE)
    d.text((1450, 224), "Représentant Légal", font=font(15, True), fill=PURPLE_DARK, anchor="mm")
    d.text((1450, 250), "Smaël KESSOURI", font=font(17, True), fill=PURPLE_DARK, anchor="mm")
    # Support & Qualité — Chaima GACI
    rounded_box(1280, 285, 340, 70, ORANGE)
    d.text((1450, 309), "Support & Qualité", font=font(15, True), fill=PURPLE_DARK, anchor="mm")
    d.text((1450, 335), "Chaima GACI", font=font(17, True), fill=PURPLE_DARK, anchor="mm")

    # Connexions
    d.line([(520, 265), (720, 265)], fill=PURPLE, width=3)
    d.line([(1080, 265), (1280, 265)], fill=PURPLE, width=3)
    d.line([(350, 320), (350, 360), (900, 360), (900, 320)], fill=PURPLE_DARK, width=2)

    # GESTION DE PROJET
    d.text((W//2, 420), "GESTION DE PROJET", font=font(22, True), fill=GRAY, anchor="mm")
    rounded_box(600, 470, 600, 150, PURPLE_DARK)
    avatar(d, img, 690, 545, 52, "Said KHAYAT")   # photo/silhouette à gauche de la box
    d.text((960, 502), "Directeur Projet", font=font(18, True), fill=ORANGE, anchor="mm")
    d.text((960, 540), "Said KHAYAT", font=font(28, True), fill=WHITE, anchor="mm")
    d.text((960, 575), "Co-fondateur — 22 ans d'expérience", font=font(15), fill=WHITE, anchor="mm")
    d.text((960, 600), "Pilotage stratégique • COPIL trimestriel", font=font(13), fill="#E5E7EB", anchor="mm")

    # Resp. Formation
    rounded_box(120, 700, 480, 240, "#FEF3C7", outline=ORANGE)
    avatar(d, img, 195, 775, 46, "Samia MAKHLOUF")
    d.text((400, 730), "Responsable Formation", font=font(15, True), fill=PURPLE_DARK, anchor="mm")
    d.text((400, 768), "Samia MAKHLOUF", font=font(20, True), fill=PURPLE_DARK, anchor="mm")
    d.text((400, 800), "13 ans d'expérience", font=font(13), fill=GRAY, anchor="mm")
    d.text((360, 850), "Plan formation Admin / Gest. / Terrain", font=font(13), fill=GRAY, anchor="mm")
    d.text((360, 875), "Affichettes plastifiées agents", font=font(13), fill=GRAY, anchor="mm")
    d.text((360, 912), "100 % phase formation puis à la demande", font=font(12, True), fill=PURPLE, anchor="mm")

    # Chef de projet
    rounded_box(660, 700, 480, 240, "#FEF3C7", outline=ORANGE)
    avatar(d, img, 735, 775, 46, "Mustapha KHEROUA")
    d.text((940, 730), "Chef de Projet / Réf. Logiciel", font=font(15, True), fill=PURPLE_DARK, anchor="mm")
    d.text((940, 768), "Mustapha KHEROUA", font=font(20, True), fill=PURPLE_DARK, anchor="mm")
    d.text((940, 800), "Ing. Efrei — 10+ ans SuperFleet", font=font(13), fill=GRAY, anchor="mm")
    d.text((900, 850), "Paramétrage plateforme, intégration ANTAI", font=font(13), fill=GRAY, anchor="mm")
    d.text((900, 875), "Support N2/N3, paramétrages spécifiques", font=font(13), fill=GRAY, anchor="mm")
    d.text((900, 912), "50 % déploiement, puis appui continu", font=font(12, True), fill=PURPLE, anchor="mm")

    # Resp. Technique (2 silhouettes : Clément + Walid)
    rounded_box(1200, 700, 480, 240, "#FEF3C7", outline=ORANGE)
    avatar(d, img, 1265, 770, 40, "Clément NOEL")
    avatar(d, img, 1340, 770, 40, "Walid KHEROUA")
    d.text((1470, 730), "Resp. Technique & Maintenance", font=font(15, True), fill=PURPLE_DARK, anchor="mm")
    d.text((1470, 768), "Clément NOEL", font=font(19, True), fill=PURPLE_DARK, anchor="mm")
    d.text((1470, 795), "+ Walid KHEROUA", font=font(16, True), fill=PURPLE_DARK, anchor="mm")
    d.text((1440, 838), "Techniciens 10+ ans — Hab. B2VL/BR", font=font(13), fill=GRAY, anchor="mm")
    d.text((1440, 863), "Pose / dépose / maintenance sur site", font=font(13), fill=GRAY, anchor="mm")
    d.text((1440, 912), "100 % installation, puis < 3 j ouvrés", font=font(12, True), fill=PURPLE, anchor="mm")

    # Lignes arbre
    d.line([(900, 610), (900, 650), (360, 650), (360, 700)], fill=PURPLE_DARK, width=2)
    d.line([(900, 650), (900, 700)], fill=PURPLE_DARK, width=2)
    d.line([(900, 650), (1440, 650), (1440, 700)], fill=PURPLE_DARK, width=2)

    # Bandeau bas
    d.rectangle([60, 990, W-60, 1180], fill=PURPLE_DARK)
    d.text((W//2, 1020), f"ENGAGEMENTS CONTRACTUELS — {MARCHE_REF} — {CLIENT_NAME.title()}",
           font=font(20, True), fill=ORANGE, anchor="mm")
    cols = [
        (f"~{FLEET_SIZE} véhicules", "instrumentables"),
        ("Déploiement", f"{DEPLOY_WEEKS} semaines max"),
        ("Installation", "30 min / véhicule"),
        ("Distance", f"Colombes → Site : {DISTANCE_MIN} min"),
        ("Support", "L–V 8h–18h"),
        ("SLA", "99,9 %"),
    ]
    xs = [(W-120)/len(cols)*i + 90 for i in range(len(cols))]
    for i, (label, val) in enumerate(cols):
        cx = xs[i] + (W-120)/(2*len(cols))
        d.text((cx, 1075), label, font=font(13), fill="#E5E7EB", anchor="mm")
        d.text((cx, 1110), val, font=font(17, True), fill=WHITE, anchor="mm")
    d.text((W//2, 1158), "Geoloc Systems SAS • 14 rue de Mantes, 92700 Colombes • SIRET 450 808 878 00026",
           font=font(12), fill="#CBD5E1", anchor="mm")

    out = f"{OUTPUT_DIR}/organigramme_projet.png"
    img.save(out, "PNG", dpi=(200, 200))
    print(f"OK organigramme: {os.path.getsize(out)} bytes")

# ============================================================================
# VISUEL 2 — Mini-carte siège ↔ client
# ============================================================================
def visuel_carte():
    W, H = 1600, 700
    img = Image.new("RGB", (W, H), "#F8FAFC")
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 75], fill=BLUE)
    d.text((W//2, 38), f"PROXIMITÉ GÉOGRAPHIQUE — GEOLOC SYSTEMS / {CLIENT_NAME}",
           font=font(22, True), fill=WHITE, anchor="mm")
    d.text((W//2, 105), f"Siège Geoloc Systems → {CLIENT_SITE_NAME} de {CLIENT_SHORT.title()}",
           font=font(18), fill=GRAY, anchor="mm")

    cx_g = 350
    cx_c = 1250
    cy = 380
    d.rounded_rectangle([100, 170, 1500, 590], radius=20, fill="#E0F2FE", outline=GRAY_LIGHT, width=2)
    pts = [(cx_g+60, cy), (550, cy-30), (750, cy+30), (950, cy-20), (1150, cy+10), (cx_c-60, cy)]
    for i in range(len(pts)-1):
        d.line([pts[i], pts[i+1]], fill=BLUE_LIGHT, width=8)
    d.text((600, cy-70), ROAD_LABEL_LEFT, font=font(20, True), fill=BLUE, anchor="mm")
    d.text((1050, cy-70), ROAD_LABEL_RIGHT, font=font(20, True), fill=BLUE, anchor="mm")

    # Point Geoloc
    d.ellipse([cx_g-50, cy-50, cx_g+50, cy+50], fill=BLUE, outline=WHITE, width=4)
    d.ellipse([cx_g-20, cy-20, cx_g+20, cy+20], fill=WHITE)
    d.text((cx_g, cy), "G", font=font(28, True), fill=BLUE, anchor="mm")
    d.text((cx_g, cy+85), "GEOLOC SYSTEMS", font=font(20, True), fill=BLUE, anchor="mm")
    d.text((cx_g, cy+115), "14 rue de Mantes", font=font(15), fill=GRAY, anchor="mm")
    d.text((cx_g, cy+138), "92700 COLOMBES (Hauts-de-Seine)", font=font(15), fill=GRAY, anchor="mm")
    d.text((cx_g, cy+165), "Siège + stock tampon IDF", font=font(13, True), fill=TEAL, anchor="mm")

    # Point client
    d.ellipse([cx_c-50, cy-50, cx_c+50, cy+50], fill=ORANGE, outline=WHITE, width=4)
    d.ellipse([cx_c-20, cy-20, cx_c+20, cy+20], fill=WHITE)
    d.text((cx_c, cy), "V", font=font(28, True), fill=ORANGE, anchor="mm")
    d.text((cx_c, cy+85), CLIENT_NAME, font=font(20, True), fill="#9A3412", anchor="mm")
    d.text((cx_c, cy+115), CLIENT_SITE_NAME, font=font(15), fill=GRAY, anchor="mm")
    d.text((cx_c, cy+138), CLIENT_ADDRESS, font=font(13), fill=GRAY, anchor="mm")
    d.text((cx_c, cy+165), MARCHE_REF, font=font(13, True), fill=TEAL, anchor="mm")

    # Étiquette centrale
    cx_lbl = (cx_g + cx_c) // 2
    d.rounded_rectangle([cx_lbl-130, cy-160, cx_lbl+130, cy-80], radius=20, fill=TEAL, outline=WHITE, width=3)
    d.text((cx_lbl, cy-130), f"{DISTANCE_MIN} MIN", font=font(36, True), fill=WHITE, anchor="mm")
    d.text((cx_lbl, cy-100), f"{DISTANCE_KM} KM", font=font(16), fill=WHITE, anchor="mm")
    d.polygon([(cx_lbl-15, cy-80), (cx_lbl+15, cy-80), (cx_lbl, cy-60)], fill=TEAL)

    # Bandeau bas
    d.rectangle([0, H-110, W, H], fill=BLUE)
    d.text((W//2, H-85), "AVANTAGES OPÉRATIONNELS DE LA PROXIMITÉ",
           font=font(16, True), fill="#FCD34D", anchor="mm")
    cols = [
        ("Intervention urgente", "< 60 minutes sur site"),
        ("Stock tampon physique", "Île-de-France · Colombes"),
        ("COPIL trimestriel", "Said KHAYAT sur site"),
        ("Démonstration/Formation", "Sous 48h sur site Ville"),
    ]
    w_col = W / len(cols)
    for i, (label, val) in enumerate(cols):
        cx = w_col * i + w_col/2
        d.text((cx, H-48), label, font=font(13), fill="#E5E7EB", anchor="mm")
        d.text((cx, H-22), val, font=font(15, True), fill=WHITE, anchor="mm")

    out = f"{OUTPUT_DIR}/visuel_carte_proximite.png"
    img.save(out, "PNG", dpi=(200, 200))
    print(f"OK carte: {os.path.getsize(out)} bytes")

# ============================================================================
# VISUEL 3 — Diagramme de Gantt 6 semaines
# ============================================================================
def visuel_gantt():
    W, H = 1800, 1000
    img = Image.new("RGB", (W, H), "#FFFFFF")
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 80], fill=BLUE)
    d.text((W//2, 40), f"PLAN DE DÉPLOIEMENT — {DEPLOY_WEEKS} SEMAINES — ~{FLEET_SIZE} VÉHICULES",
           font=font(24, True), fill=WHITE, anchor="mm")
    d.text((W//2, 110), f"{MARCHE_REF} · {CLIENT_NAME.title()} · {LOT_OBJECT}",
           font=font(16), fill=GRAY, anchor="mm")

    LEFT_W = 480
    X0 = LEFT_W
    Y0 = 170
    ROW_H = 65
    WEEKS = DEPLOY_WEEKS
    WEEK_W = (W - X0 - 60) / WEEKS

    d.rectangle([X0, Y0, X0 + WEEKS*WEEK_W, Y0+50], fill=LIGHT)
    for i in range(WEEKS):
        x = X0 + i*WEEK_W
        d.line([(x, Y0), (x, H-100)], fill=GRAY_LIGHT, width=1)
        d.text((x + WEEK_W/2, Y0+25), f"S{i+1}", font=font(20, True), fill=BLUE, anchor="mm")
    d.line([(X0 + WEEKS*WEEK_W, Y0), (X0 + WEEKS*WEEK_W, H-100)], fill=GRAY_LIGHT, width=1)

    activities = [
        ("Cadrage & audit parc",         "Said KHAYAT + Mustapha KHEROUA — visite site, recensement contradictoire", 0, 1, BLUE),
        ("Paramétrage SuperFleet",       "Mustapha KHEROUA — comptes, rapports, modules", 0, 2, BLUE_LIGHT),
        ("Pose engins prioritaires",     "Engins lourds/spéciaux — paramétrage spécifique", 1, 2, RED),
        ("Pose VL pool",                 "VL et VL électriques — cadence soutenue", 1, 3, ORANGE),
        ("Pose VUL",                     "Utilitaires thermiques et électriques", 2, 4, ORANGE),
        ("Pose engins légers",           "Quads, mini-pelles, tracteurs", 3, 5, ORANGE),
        ("Pose reste de flotte",         "Deux-roues, vélos, trottinettes électriques", 4, 5, ORANGE),
        ("Formation Administrateurs",    "Samia MAKHLOUF — site Ville (2h)", 2, 3, TEAL),
        ("Formation Gestionnaires",      "Samia MAKHLOUF — site Ville (1h30)", 3, 4, TEAL),
        ("Formation Conducteurs",        "Samia MAKHLOUF — sessions multiples + affichettes", 4, WEEKS, TEAL),
        ("Recette finale & VSR",         "PV contradictoire 100 % flotte + GO exploitation", WEEKS-1, WEEKS, GREEN),
    ]
    for ri, (title, sub, start, end, color) in enumerate(activities):
        y = Y0 + 50 + ri*ROW_H
        if ri % 2 == 1:
            d.rectangle([0, y, W, y+ROW_H], fill="#F9FAFB")
        d.text((20, y+ROW_H/2 - 10), title, font=font(15, True), fill=GRAY, anchor="lm")
        d.text((20, y+ROW_H/2 + 14), sub, font=font(11), fill=GRAY_LIGHT, anchor="lm")
        bx = X0 + start*WEEK_W + 6
        bw = (end - start)*WEEK_W - 12
        d.rounded_rectangle([bx, y+15, bx+bw, y+ROW_H-15], radius=8, fill=color)
        label = f"S{start+1}{('→S'+str(end)) if end-start>1 else ''}"
        d.text((bx + bw/2, y+ROW_H/2), label, font=font(13, True), fill=WHITE, anchor="mm")

    d.rectangle([0, H-90, W, H], fill=BLUE)
    d.text((W//2, H-58), "ÉQUIPE TERRAIN : 2 techniciens IDF (Clément NOEL + Walid KHEROUA) — Pilote : Mustapha KHEROUA — Formation : Samia MAKHLOUF",
           font=font(14), fill="#FCD34D", anchor="mm")
    d.text((W//2, H-30), "Cadence opérationnelle : 10 véhicules/jour nominal · jusqu'à 20 véh/jour avec dispositif de renforts mobilisables",
           font=font(13), fill=WHITE, anchor="mm")

    out = f"{OUTPUT_DIR}/visuel_gantt_deploiement.png"
    img.save(out, "PNG", dpi=(200, 200))
    print(f"OK gantt: {os.path.getsize(out)} bytes")

# ============================================================================
# VISUEL 4 — Schéma logistique stock
# ============================================================================
def visuel_logistique():
    W, H = 1800, 700
    img = Image.new("RGB", (W, H), "#FFFFFF")
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 80], fill=BLUE)
    d.text((W//2, 40), "CHAÎNE LOGISTIQUE — BOÎTIERS TELTONIKA & ACCESSOIRES",
           font=font(24, True), fill=WHITE, anchor="mm")
    d.text((W//2, 110), f"Approvisionnement direct constructeur · Stock tampon physique en Île-de-France · Livraison < 60 min sur site",
           font=font(15), fill=GRAY, anchor="mm")

    boxes = [
        {"x": 90,  "y": 220, "w": 480, "h": 280, "color": PURPLE,
         "title": "TELTONIKA TELEMATICS", "subtitle": "Saltoniškių g. 9B-1, 08105 Vilnius",
         "country": "LITUANIE — UNION EUROPÉENNE",
         "lines": ["Fabricant agréé UE", "Boîtiers FMC650 / FMC920", "Garantie 2 ans constructeur", "Livraison hebdomadaire programmée"]},
        {"x": 660, "y": 220, "w": 480, "h": 280, "color": BLUE,
         "title": "GEOLOC SYSTEMS", "subtitle": "14 rue de Mantes, 92700 Colombes",
         "country": f"ÎLE-DE-FRANCE — {DISTANCE_MIN} MIN DU SITE",
         "lines": [f"Stock tampon dédié : ≥ 10 % du parc ({FLEET_SIZE // 10}+ unités)", "Boîtiers + MIFARE + Bouton CNIL", "Faisceaux CAN J1939 / FMS / OBD2", "Préparation SIM + paramétrage amont"]},
        {"x": 1230, "y": 220, "w": 480, "h": 280, "color": ORANGE,
         "title": CLIENT_NAME, "subtitle": CLIENT_ADDRESS,
         "country": CLIENT_SITE_NAME.upper(),
         "lines": ["Pose sur site par Clément NOEL + Walid KHEROUA", "PV contradictoire à chaque pose", "Remplacement défaillant < 24h", "Inventaire mensuel transmis Parc Auto"]},
    ]
    for b in boxes:
        x, y, w, h = b["x"], b["y"], b["w"], b["h"]
        d.rounded_rectangle([x, y, x+w, y+h], radius=16, fill=b["color"])
        d.text((x+w/2, y+30), b["title"], font=font(18, True), fill=WHITE, anchor="mm")
        d.text((x+w/2, y+58), b["subtitle"], font=font(13), fill="#FED7AA" if b["color"]==ORANGE else "#DBEAFE", anchor="mm")
        d.text((x+w/2, y+82), b["country"], font=font(11, True), fill=WHITE, anchor="mm")
        d.line([(x+30, y+105), (x+w-30, y+105)], fill=WHITE, width=1)
        for i, line in enumerate(b["lines"]):
            d.text((x+25, y+135 + i*32), "• " + line, font=font(12), fill=WHITE, anchor="lm")

    arrow_y = 360
    d.line([(580, arrow_y), (645, arrow_y)], fill=GRAY, width=6)
    d.polygon([(645, arrow_y-12), (665, arrow_y), (645, arrow_y+12)], fill=GRAY)
    d.text((615, arrow_y-30), "Livraison", font=font(12, True), fill=GRAY, anchor="mm")
    d.text((615, arrow_y+30), "hebdo", font=font(11), fill=GRAY_LIGHT, anchor="mm")

    d.line([(1150, arrow_y), (1215, arrow_y)], fill=GRAY, width=6)
    d.polygon([(1215, arrow_y-12), (1235, arrow_y), (1215, arrow_y+12)], fill=GRAY)
    d.text((1185, arrow_y-30), "< 60 min", font=font(13, True), fill=TEAL, anchor="mm")
    d.text((1185, arrow_y+30), f"via {ROAD_LABEL_LEFT}/{ROAD_LABEL_RIGHT}", font=font(11), fill=GRAY_LIGHT, anchor="mm")

    d.rectangle([0, H-100, W, H], fill=BLUE)
    cols = [
        ("Stock tampon", "≥ 10 % du parc"),
        ("Délai approvisionnement", "Hebdo Teltonika"),
        ("Délai remplacement", "< 24h sur site"),
        ("Pénalité évitée", "100 €/jour CCAP"),
        ("Reconditionnement", "≥ 70 %"),
    ]
    w_col = W / len(cols)
    for i, (label, val) in enumerate(cols):
        cx = w_col * i + w_col/2
        d.text((cx, H-65), label, font=font(13), fill="#E5E7EB", anchor="mm")
        d.text((cx, H-32), val, font=font(17, True), fill="#FCD34D", anchor="mm")

    out = f"{OUTPUT_DIR}/visuel_logistique_stock.png"
    img.save(out, "PNG", dpi=(200, 200))
    print(f"OK logistique: {os.path.getsize(out)} bytes")

# ============================================================================
# VISUEL 5 — Infographie résumé page de garde
# ============================================================================
def visuel_infographie():
    W, H = 1800, 1000
    img = Image.new("RGB", (W, H), "#FFFFFF")
    d = ImageDraw.Draw(img)

    d.text((W//2, 70), "Géolocalisation & Gestion de Flotte",
           font=font(36, True), fill=BLUE, anchor="mm")
    d.text((W//2, 115), f"La proposition Geoloc Systems pour {CLIENT_NAME.title()}",
           font=font(18), fill=GRAY, anchor="mm")
    d.text((W//2, 145), f"{MARCHE_REF} · Mai 2026", font=font(14, True), fill=TEAL, anchor="mm")

    pillars = [
        {"x": 130, "color": TEAL, "num": "1",
         "title": "Déploiement Maîtrisé",
         "subtitle": f"en {DEPLOY_WEEKS} semaines",
         "items": [
             ("S1", "Audit + véh. prioritaires"),
             ("S2-S5", f"Déploiement échelonné ~{FLEET_SIZE} véh."),
             ("S5-S6", "Formation 3 profils + recette"),
             ("Pose unitaire", "30-45 min/véhicule"),
             ("Cadence nominale", "10 véh/jour (2 tech)"),
             ("Renforts", "Jusqu'à 20 véh/jour"),
         ]},
        {"x": 670, "color": BLUE, "num": "2",
         "title": "Solution Fiable & Souveraine",
         "subtitle": "100 % UE",
         "items": [
             ("Hébergement", "AWS Frankfurt + OVH + Flespi"),
             ("Disponibilité", "SLA 99,9 %"),
             ("Conformité", "RGPD + CNIL 2015-165"),
             ("Boîtiers", "Teltonika UE (Vilnius)"),
             ("Module ANTAI", "Désignation auto conducteur"),
             ("IA SuperFleet Agent", "Chat + Voix + Data"),
         ]},
        {"x": 1210, "color": ORANGE, "num": "3",
         "title": "Engagements Tenus",
         "subtitle": "& Proximité",
         "items": [
             ("Siège", f"Colombes (92) — {DISTANCE_MIN} min"),
             ("Équipe nommée", "Said, Mustapha, Clément, Walid, Samia"),
             ("Hotline", "L-V 8h-18h sans interruption"),
             ("Réactivité support", "< 2 h ouvrées"),
             ("SAV pénalité 200 €/h", "< 1 h Geoloc"),
             ("Bilan RSE", "−10 à −15 % km flotte"),
         ]},
    ]
    pillar_w = 460
    pillar_y = 190
    pillar_h = 680
    for p in pillars:
        x = p["x"]
        d.rounded_rectangle([x, pillar_y, x+pillar_w, pillar_y+pillar_h], radius=20, fill=p["color"])
        d.rounded_rectangle([x+15, pillar_y+15, x+pillar_w-15, pillar_y+150], radius=14, fill="#1F2937")
        d.text((x+pillar_w/2, pillar_y+50), p["title"], font=font(20, True), fill=WHITE, anchor="mm")
        d.text((x+pillar_w/2, pillar_y+82), p["subtitle"], font=font(15), fill="#FCD34D", anchor="mm")
        cx, cy_ic = x+pillar_w/2, pillar_y+128
        d.ellipse([cx-22, cy_ic-22, cx+22, cy_ic+22], fill=p["color"], outline=WHITE, width=2)
        d.text((cx, cy_ic), p["num"], font=font(22, True), fill=WHITE, anchor="mm")
        item_y = pillar_y + 175
        for i, (label, val) in enumerate(p["items"]):
            iy = item_y + i*80
            d.rounded_rectangle([x+30, iy, x+pillar_w-30, iy+70], radius=10, fill=WHITE)
            d.text((x+50, iy+22), label, font=font(13, True), fill=p["color"], anchor="lm")
            d.text((x+50, iy+50), val, font=font(13), fill=GRAY, anchor="lm")

    d.rectangle([0, H-110, W, H], fill=BLUE)
    d.text((W//2, H-85), f"ENGAGEMENTS CHIFFRÉS — {MARCHE_REF}",
           font=font(14, True), fill="#FCD34D", anchor="mm")
    cols = [
        ("Parc équipable", f"~{FLEET_SIZE} véhicules"),
        ("Déploiement initial", f"{DEPLOY_WEEKS} semaines"),
        ("Installation unitaire", "30-45 min/véh."),
        ("SLA disponibilité", "99,9 %"),
        ("Distance siège ↔ site", f"{DISTANCE_MIN} minutes"),
    ]
    w_col = W / len(cols)
    for i, (label, val) in enumerate(cols):
        cx = w_col * i + w_col/2
        d.text((cx, H-45), label, font=font(12), fill="#E5E7EB", anchor="mm")
        d.text((cx, H-20), val, font=font(17, True), fill=WHITE, anchor="mm")

    out = f"{OUTPUT_DIR}/visuel_infographie_couverture.png"
    img.save(out, "PNG", dpi=(200, 200))
    print(f"OK infographie: {os.path.getsize(out)} bytes")

# ============================================================================
# RUN
# ============================================================================
if __name__ == "__main__":
    print(f"Génération des 5 visuels pour {CLIENT_NAME}...")
    print(f"Sortie : {OUTPUT_DIR}/")
    visuel_organigramme()
    visuel_carte()
    visuel_gantt()
    visuel_logistique()
    visuel_infographie()
    print(f"\nDONE — 5 visuels produits dans {OUTPUT_DIR}/")
