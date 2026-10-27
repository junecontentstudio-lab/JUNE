"""Génère 4 variantes du post n°1 via Kie.ai (Nano Banana Pro, 4K). Usage : python3 _kie.py"""
import json, subprocess, time, sys
URL = "https://raw.githubusercontent.com/junecontentstudio-lab/JUNE/claude/github-context-file-p2663f/post-arrivee/photo.jpg"
BASE = ("Transform this photo into a premium editorial magazine-cover Instagram post for 'June Content Studio'. "
        "Keep the photograph itself intact and realistic. Strict warm palette: cream paper #F3ECE0, coffee brown #3A2B22, brass gold #B38B4D, dusty rose #D9B8A6. "
        "Typography: elegant high-contrast serif (Cormorant Garamond style) with a small tracked sans-serif label. Quiet luxury, vintage boutique feel, generous spacing, no other text, no logos. ")
V = {
 "A": "Full-bleed photo with a soft warm brown gradient at the bottom. Headline in cream serif: \"Je m'installe à l'Alpe d'Huez\" (Alpe d'Huez in italic gold). Small label \"NOVEMBRE 2026\" above, thin cream frame inset around the image.",
 "B": "Cream paper background, double thin gold frame like a magazine cover. Top label \"N°01 · ÉDITION D'HIVER\", big serif title \"June arrive\" (arrive in italic gold), the photo framed in the middle, caption in italic serif below: \"à l'Alpe d'Huez, le 17 novembre\".",
 "C": "Photo fills the top two thirds, a thin gold line, then a cream band with the serif title \"Nouvelle saison, nouvelle adresse\" (second part italic gold) and a small caps line \"CONTENU POUR HÔTELS, HÉBERGEMENTS & BOUTIQUES\".",
 "D": "Dusty rose #D9B8A6 background, thin brown frame, the photo cropped in an arch shape with a cream border, \"JUNE\" in spaced serif capitals at the top, title below \"C'est l'heure\" (l'heure in cream italic) and small script line \"17 novembre\".",
}
def sh(a, d=None):
    c = ["curl","-sS","-m","60"] + a + (["-H","Content-Type: application/json","-d",json.dumps(d)] if d else [])
    return json.loads(subprocess.run(c, capture_output=True, text=True).stdout)
ids = {}
for k, v in V.items():
    r = sh(["https://api.kie.ai/api/v1/jobs/createTask"], {"model":"nano-banana-pro","input":{"prompt":BASE+v,"image_input":[URL],"aspect_ratio":"4:5","resolution":"4K","output_format":"png"}})
    print(k, r); ids[k] = r["data"]["taskId"]
json.dump(ids, open("_taches.json","w"))
