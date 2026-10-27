"""Génère 4 variantes du post n°1 via Kie.ai (Nano Banana Pro, 4K). Usage : python3 _kie.py [prefixe] [variantes...]"""
import json, subprocess, time, sys
URL = "https://raw.githubusercontent.com/junecontentstudio-lab/JUNE/claude/github-context-file-p2663f/post-arrivee/photo.jpg"
import sys
PREFIXE = sys.argv[1] if len(sys.argv) > 1 else "kie"
BASE = ("Turn this photo into a cinematic, old-money editorial magazine cover for an Instagram post (June Content Studio). "
        "The photograph MUST stay full-bleed, edge to edge, covering the entire canvas: no borders, no frames, no paper margins, no inset picture. "
        "Keep the scene realistic and recognisable. Colour grade: warm film look, subtle Kodak Portra grain, creamy highlights, soft brown shadows, muted beige and cream tones, slightly faded blacks. "
        "Typography in warm cream and soft antique gold only, laid directly over the photo: tall condensed high-contrast Didone serif headlines (Vogue / old newspaper masthead feel), "
        "tiny tracked uppercase sans-serif header line, and, only where asked, a handwritten signature reading exactly \"June\". Quiet luxury, timeless, vintage journal. No other text, no logos, no watermark. ")
V = {
 "A": "Masthead layout: tiny header line at the very top spread across the width: \"@JUNECONTENTSTUDIO      ÉDITION D'HIVER      17.11.2026\". Huge condensed serif title across the top third: \"L'ALPE D'HUEZ\". Bottom left small italic serif line: \"Je m'installe pour la saison.\" Bottom right small handwritten signature \"June\".",
 "B": "Headline split like a fashion magazine: \"Nouvelle\" in large italic serif upper left, \"SAISON\" in huge condensed capitals below it. Small tracked line under it: \"JUNE CONTENT STUDIO · ALPE D'HUEZ\". Bottom centre a handwritten signature \"June\" and a tiny line \"N°01\".",
 "C": "Cinematic film-still look: thin letterbox-like darker band only as a soft gradient at the bottom (photo still full screen), centred small caps line \"CHAPITRE 01\", then a refined condensed serif title \"J'ARRIVE À L'ALPE D'HUEZ\", then a tiny italic line \"17 novembre 2026\", then a small handwritten signature \"June\". Top left tiny \"JUNE\", top right tiny \"ÉDITION D'HIVER\".",
 "D": "Old newspaper front-page feel over the photo: top masthead in condensed serif capitals \"LE JOURNAL DE JUNE\" with a thin cream rule under it and a tiny dateline \"ALPE D'HUEZ — NOVEMBRE 2026 — N°01\". Centre right a short elegant italic serif quote: \"Une saison, un village, des lieux à raconter.\" with a small handwritten signature \"June\" below.",
}
def sh(a, d=None):
    c = ["curl","-sS","-m","60"] + a + (["-H","Content-Type: application/json","-d",json.dumps(d)] if d else [])
    return json.loads(subprocess.run(c, capture_output=True, text=True).stdout)
ids = {}
CHOIX = sys.argv[2:] or list(V)
for k, v in V.items():
    if k not in CHOIX: continue
    r = sh(["https://api.kie.ai/api/v1/jobs/createTask"], {"model":"nano-banana-pro","input":{"prompt":BASE+v,"image_input":[URL],"aspect_ratio":"4:5","resolution":"4K","output_format":"png"}})
    print(k, r); ids[k] = r["data"]["taskId"]
json.dump(ids, open(f"_taches-{PREFIXE}.json","w"))
