"""Génère le calendrier de contenu de June (CSV + Markdown + PDF) à partir de la liste ci-dessous.
Utilisation :  python3 calendrier/_generer.py
Pour modifier le calendrier, on change la liste POSTS puis on relance.
"""
import csv
import html
import os
import subprocess

ICI = os.path.dirname(os.path.abspath(__file__))
BASE = "calendrier-2026-10-26-au-11-29"

# compte : J = @junecontentstudio, P = @ludii_cdt (perso)
# Les textes entre [crochets] sont à compléter par June (nom du lieu, prénom, nombre de saisons...).
POSTS = [
    # ---------- Semaine 1 : 26 oct - 1 nov (June n'est pas encore à l'Alpe : contenus d'archives et pédagogiques)
    dict(date="Mar 27/10", heure="18h", compte="June", rayon="L'Atelier", format="Carrousel 6 slides",
         titre="Qui est June : saisonnière à l'Alpe d'Huez",
         couverture="Saisonnière à l'Alpe d'Huez depuis [X] saisons",
         plan="1. Ta photo de dos devant la montagne\n2. Pourquoi l'Alpe d'Huez\n3. Ce que tu fais (photos + réels pour les lieux de la station)\n4. Ta façon de travailler : seule, légère, rapide\n5. Ce que tu proposes cet hiver : 3 places fondateurs\n6. « Écrivez-moi FONDATEUR »",
         legende="Je m'appelle Ludivine, je fais ma saison à l'Alpe d'Huez et je crée des photos et des réels pour les lieux de la station.\n\nMon idée : faire ressentir votre lieu avant même que vos clients arrivent.\n\nCet hiver, je prends 3 lieux « fondateurs ». Si vous avez un hôtel, un hébergement ou une boutique ici, écrivez-moi FONDATEUR en message.",
         hashtags="#alpedhuez #oisans #creationdecontenu", cta="Écrivez-moi FONDATEUR", visuel="Kit : couverture de carrousel + slide conseil"),
    dict(date="Jeu 29/10", heure="18h", compte="June", rayon="Le Comptoir", format="Réel éducatif 25 s",
         titre="Les 4 plans qui manquent à votre hôtel",
         couverture="Les 4 plans qui manquent à votre hôtel",
         plan="Accroche (3 s) : « Votre hôtel a déjà des photos de chambre. »\n1. Le plan d'ambiance : lumière du réveil\n2. Le plan détail : tasse, plaid, clé\n3. Le plan de vie : quelqu'un de dos, une main\n4. Le plan d'arrivée : la porte qui s'ouvre\nFin : tampon June + « Lequel manque chez vous ? »",
         legende="Une chambre vide ne donne pas envie de réserver. Une chambre qu'on ressent, si.\n\nVoici les 4 plans que je filme dans chaque hôtel pour que le client se projette.\n\nLequel manque sur votre compte ? Dites-le-moi en commentaire.",
         hashtags="#hotellerie #alpedhuez #reelsconseils", cta="Question en commentaire", visuel="Kit : couverture de réel"),
    dict(date="Sam 31/10", heure="11h", compte="June", rayon="La Vitrine", format="Réel immersif 15-20 s",
         titre="POV : ta première matinée dans ce chalet",
         couverture="POV : ta première matinée dans ce chalet",
         plan="Utiliser tes rushs d'archives (fenêtre, montagne, de dos)\n1. Plan sur la fenêtre\n2. Le rideau qui bouge\n3. La vue\n4. Fin sur le tampon June\nSon d'ambiance + musique douce, volume bas",
         legende="Certains lieux se vivent avant même d'y entrer.\n\nUn réveil, une fenêtre, la montagne en face. C'est tout ce qu'il faut pour donner envie.\n\nVous avez un lieu qui mérite d'être ressenti ? Écrivez-moi.",
         hashtags="#alpedhuez #montagne #hospitality", cta="Écrivez-moi", visuel="Étalonnage June sur les rushs d'archives"),
    # ---------- Semaine 2 : 2 - 8 nov
    dict(date="Mar 03/11", heure="18h", compte="June", rayon="Le Comptoir", format="Carrousel 6 slides",
         titre="Testez votre compte en 30 secondes",
         couverture="Testez votre compte en 30 secondes",
         plan="1. Ouvrez votre profil, regardez vos 9 dernières publications\n2. Vos photos ont-elles la même ambiance ?\n3. Comprend-on en 5 secondes ce que vous proposez ?\n4. Le lieu est-il visible sur chaque publication ?\n5. Un client sait-il comment réserver ou vous écrire ?\n6. Mon résultat : « 3 oui ou plus ? Vous êtes sur la bonne voie »",
         legende="Un test rapide pour savoir si votre compte donne envie.\n\nOuvrez votre profil et répondez par oui ou non aux 5 questions. Si vous avez 2 non ou plus, on peut corriger ça ensemble.\n\nEnregistrez cette publication pour la refaire dans un mois.",
         hashtags="#hotellerie #instagramconseils #alpedhuez", cta="Enregistrer + écrire", visuel="Kit : couverture + slide conseil"),
    dict(date="Jeu 05/11", heure="18h", compte="June", rayon="La Vitrine", format="Carrousel photo 8 images",
         titre="Chambre avec vue : épisode 1",
         couverture="Chambre avec vue, épisode 1",
         plan="Choisir 8 photos d'archives d'un lieu (chambre, fenêtre, détails)\nOrdre : vue large → détail → vue large\nPhotos étalonnées avec le preset June\nDernière slide : « Épisode 2 bientôt, à l'Alpe d'Huez »",
         legende="Chambre avec vue, épisode 1.\n\nLe détail qui fait la différence : la lumière du matin sur le linge, la tasse près de la fenêtre.\n\nÀ partir de décembre, je filme les chambres de l'Alpe d'Huez. Lesquelles voulez-vous voir ?",
         hashtags="#alpedhuez #chambreavecvue #hotel", cta="Question en commentaire", visuel="Kit : cadre étiquette N°"),
    dict(date="Sam 07/11", heure="11h", compte="June", rayon="L'Atelier", format="Carrousel 5 slides",
         titre="Cas client : le salon de massage",
         couverture="Elle n'avait plus le temps de poster. Voilà ce qu'on a fait",
         plan="1. Le lieu : salon de massage\n2. Le besoin : ne plus avoir à réfléchir pour poster\n3. Ce que j'ai fait : photos + réels + légendes prêtes\n4. Livré : [chiffres réels de la prestation]\n5. Son avis (à demander avant publication)",
         legende="Elle voulait juste ne plus avoir à réfléchir à ses réseaux.\n\nPhotos, réels, légendes prêtes à copier-coller : elle n'avait plus qu'à publier.\n\nSi vous manquez de temps pour vos réseaux, c'est exactement ce que je fais.",
         hashtags="#casclient #creationdecontenu #alpedhuez", cta="Écrivez-moi", visuel="Kit : slide cas client + carte avis. À publier seulement avec l'accord du salon et son avis"),
    # ---------- Semaine 3 : 9 - 15 nov
    dict(date="Mar 10/11", heure="18h", compte="June", rayon="Le Comptoir", format="Réel éducatif 30 s",
         titre="3 erreurs qui font fuir vos clients avant qu'ils réservent",
         couverture="3 erreurs qui font fuir vos clients",
         plan="Accroche : « Vos clients décident en quelques secondes. »\n1. Un profil sans lieu ni ville dans la bio\n2. Des photos qui n'ont pas la même ambiance\n3. Aucune façon simple de vous écrire ou de réserver\nFin : « Vous en avez combien ? »",
         legende="Un client qui hésite regarde votre profil avant de réserver.\n\nVoici 3 erreurs que je vois souvent sur les comptes de lieux touristiques, et elles se corrigent vite.\n\nCombien en reconnaissez-vous chez vous ?",
         hashtags="#hotellerie #instagramconseils #alpedhuez", cta="Question en commentaire", visuel="Kit : couverture de réel"),
    dict(date="Jeu 12/11", heure="18h", compte="June", rayon="L'Atelier", format="Carrousel 5 slides",
         titre="J'arrive à l'Alpe d'Huez : 3 places fondateurs",
         couverture="3 places fondateurs cet hiver",
         plan="1. J'arrive le 17 novembre\n2. Ce que je propose : 8 réels, 30 photos retouchées, rushs, calendrier\n3. Pour qui : hôtels, hébergements, boutiques de la station\n4. Ce que je demande en échange : un avis et le droit d'utiliser le contenu\n5. « Écrivez-moi FONDATEUR »\n(les conditions et le prix seront fixés plus tard : ne pas annoncer de tarif)",
         legende="Dans 5 jours, je suis à l'Alpe d'Huez.\n\nJe prends 3 lieux « fondateurs » pour cet hiver : un tournage chez vous, du contenu prêt à publier avant les vacances de Noël.\n\nHôtel, hébergement, boutique : écrivez-moi FONDATEUR et on se retrouve autour d'un café.",
         hashtags="#alpedhuez #oisans #hotellerie", cta="Écrivez-moi FONDATEUR", visuel="Kit : couverture + slide conseil"),
    dict(date="Sam 14/11", heure="11h", compte="June", rayon="Le Comptoir", format="Réel éducatif 25 s",
         titre="Ce que vos clients regardent en premier sur votre profil",
         couverture="Ce que vos clients voient en premier",
         plan="Écran partagé : un profil d'exemple\n1. La photo de profil\n2. La bio : lieu + service\n3. Les 3 premières lignes de la grille\n4. Le bouton pour écrire\nFin : « Corrigez ces 4 points ce week-end »",
         legende="Avant de lire une légende, un client regarde quatre choses sur votre profil.\n\nSi elles sont claires, il vous écrit. Sinon, il passe à un autre lieu.\n\nVoulez-vous que je regarde votre profil ? Écrivez-moi PROFIL.",
         hashtags="#hotellerie #instagramconseils #alpedhuez", cta="Écrivez-moi PROFIL", visuel="Capture d'écran d'un profil d'exemple (anonymisé)"),
    # ---------- Semaine 4 : 16 - 22 nov (arrivée le 17)
    dict(date="Mar 17/11", heure="18h", compte="June", rayon="Le Carnet", format="Réel POV 15 s",
         titre="Je suis arrivée à l'Alpe d'Huez",
         couverture="14h30 : le trépied est prêt",
         plan="1. La valise qui se pose\n2. Le trépied sur le balcon\n3. La vue sur la station\n4. Tu relèves la tête\nTexte final : « C'est parti. »",
         legende="Je suis arrivée.\n\nLes lieux de l'Alpe d'Huez se préparent pour l'hiver, et moi aussi : trépied, appareil, carnet de notes.\n\nSi vous voulez qu'on se rencontre cette semaine, écrivez-moi.",
         hashtags="#alpedhuez #saisonniere #oisans", cta="Écrivez-moi", visuel="Tournage perso + étalonnage June"),
    dict(date="Jeu 19/11", heure="18h", compte="June", rayon="Le Comptoir", format="Réel éducatif 25 s",
         titre="Pourquoi publier avant le 15 décembre",
         couverture="Publiez avant le 15 décembre",
         plan="Accroche : « Les vacances de Noël se préparent maintenant. »\n1. Les clients cherchent avant de réserver\n2. Votre contenu doit déjà exister\n3. Un tournage, 4 à 6 contenus\nFin : « On s'y met cette semaine ? »",
         legende="Les vacances de Noël se préparent maintenant, pas en décembre.\n\nPour que vos clients vous trouvent et vous choisissent, votre contenu doit être prêt avant le 15 décembre.\n\nOn s'y met cette semaine ? Écrivez-moi.",
         hashtags="#alpedhuez #hotellerie #saison", cta="Écrivez-moi", visuel="Kit : couverture de réel"),
    dict(date="Sam 21/11", heure="11h", compte="June", rayon="L'Atelier", format="Réel coulisses 20 s",
         titre="Seule avec mon trépied : premier repérage",
         couverture="Seule avec mon trépied",
         plan="Accéléré d'un repérage dans un lieu (avec l'accord du lieu)\n1. J'arrive\n2. Je repère la lumière\n3. Je pose le trépied\nFin : tampon June",
         legende="Pas d'équipe, juste moi, un trépied et une bonne lumière.\n\nPremier repérage dans un lieu de la station : je regarde la lumière, les angles, ce qui donne envie.\n\nQuel lieu de l'Alpe d'Huez voulez-vous voir en vidéo ?",
         hashtags="#alpedhuez #coulisses #creationdecontenu", cta="Question en commentaire", visuel="Tournage sur place (demander l'accord du lieu)"),
    # ---------- Semaine 5 : 23 - 29 nov
    dict(date="Mar 24/11", heure="18h", compte="June", rayon="La Vitrine", format="Réel immersif 20 s",
         titre="Premier lieu de la station : l'ouverture de porte",
         couverture="N°01 · [Nom du lieu]",
         plan="Réel signature : la porte s'ouvre → on découvre le lieu → plans lents → tampon June\nÀ tourner chez le premier lieu fondateur (avec son accord)",
         legende="N°01 : [Nom du lieu].\n\nIci, [une phrase sur ce qui donne envie : la lumière, la vue, l'accueil].\n\nMerci à [nom] de m'avoir ouvert sa porte. Le prochain lieu, c'est peut-être le vôtre.",
         hashtags="#alpedhuez #oisans #[nomdulieu]", cta="Écrivez-moi", visuel="Tournage chez le premier lieu fondateur"),
    dict(date="Jeu 26/11", heure="18h", compte="June", rayon="Le Comptoir", format="Réel éducatif 30 s",
         titre="Comment filmer un petit-déjeuner qui donne envie",
         couverture="Un petit-déjeuner qui donne envie",
         plan="1. La lumière : près d'une fenêtre\n2. Le plan large : la table\n3. Le plan détail : la vapeur du café\n4. Le plan de vie : une main qui se sert\nFin : « Votre petit-déjeuner mérite mieux qu'une photo de plateau »",
         legende="Un petit-déjeuner bien filmé, c'est souvent la première raison de réserver.\n\nQuatre plans, une fenêtre, 30 secondes. Voilà comment je m'y prends.\n\nVotre salle de petit-déjeuner mérite d'être filmée ? Écrivez-moi.",
         hashtags="#hotellerie #petitdejeuner #alpedhuez", cta="Écrivez-moi", visuel="Kit : couverture de réel"),
    dict(date="Sam 28/11", heure="11h", compte="June", rayon="Le Carnet", format="Réel ou carrousel",
         titre="Pros de l'Alpe d'Huez, présentez-vous",
         couverture="Pros de l'Alpe : présentez-vous",
         plan="Carrousel 3 slides ou réel 10 s\n1. « Hôtels, hébergements, boutiques de l'Alpe d'Huez »\n2. « Dites en commentaire : votre nom, votre lieu, ce que vous proposez »\n3. « Je passe voir ceux qui répondent cette semaine »",
         legende="Vous avez un lieu à l'Alpe d'Huez ?\n\nPrésentez-vous en commentaire : votre nom, votre lieu et ce que vous proposez. Je passe voir ceux qui répondent cette semaine.\n\nL'idée : qu'on se connaisse avant le début de la saison.",
         hashtags="#alpedhuez #oisans #commercelocal", cta="Commentaire", visuel="Kit : carte Papier avec filet laiton"),
    # ---------- Compte perso @ludii_cdt (3 contenus sur la période)
    dict(date="Mar 17/11", heure="20h", compte="Perso", rayon="Le Carnet", format="Story + reel de partage",
         titre="Arrivée à l'Alpe d'Huez (reprise du réel June)",
         couverture="Retour à l'Alpe",
         plan="Reprendre le réel d'arrivée en collab avec @junecontentstudio\nStories : trajet, première vue sur la station",
         legende="Retour à l'Alpe d'Huez pour la saison.\n\nEt cette année, j'y lance aussi @junecontentstudio : photos et réels pour les lieux de la station.\n\nVous êtes ici cet hiver ? Dites-moi en commentaire.",
         hashtags="#alpedhuez #saisonniere #oisans", cta="Commentaire", visuel="Story + collab"),
    dict(date="Ven 20/11", heure="19h", compte="Perso", rayon="Le Carnet", format="Réel lifestyle 20 s",
         titre="La station se réveille",
         couverture="Quand la station se réveille…",
         plan="Plans d'ambiance de la station avant la saison, sons réels, légende de 2 lignes",
         legende="Quand la station se réveille…\n\nLes volets s'ouvrent, les commerces se préparent. J'adore cette période.\n\nEt vous, vous préférez la station avant ou pendant la saison ?",
         hashtags="#alpedhuez #oisans #avantsaison", cta="Question en commentaire", visuel="Ambiance réelle, étalonnage June"),
    dict(date="Dim 29/11", heure="18h", compte="Perso", rayon="Le Carnet", format="Story + réel",
         titre="La semaine avant l'ouverture",
         couverture="Dernière semaine avant la saison",
         plan="Stories quotidiennes : les lieux qui se préparent\n1 réel de récap le dimanche",
         legende="Dernière semaine avant le début de la saison.\n\nJ'ai passé la semaine à rencontrer des lieux de la station pour mon studio, et à repérer les adresses que j'ai envie de vous montrer.\n\nUne adresse à ne pas rater cet hiver ? Dites-la-moi.",
         hashtags="#alpedhuez #oisans #saison", cta="Commentaire", visuel="Récap de tes stories"),
]

COLONNES = ["date", "heure", "compte", "rayon", "format", "titre", "couverture", "plan", "legende", "hashtags", "cta", "visuel"]
NOMS = ["Date", "Heure", "Compte", "Rayon", "Format", "Titre", "Texte de couverture", "Plan / script", "Légende", "Hashtags", "Appel à l'action", "Visuel à préparer"]


def csv_file():
    with open(os.path.join(ICI, BASE + ".csv"), "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(NOMS + ["Statut"])
        for p in POSTS:
            w.writerow([p[c] for c in COLONNES] + ["À préparer"])


def markdown():
    out = ["# Calendrier de contenu : du 26 octobre au 29 novembre 2026\n",
           "> 3 publications par semaine sur @junecontentstudio (mardi 18h, jeudi 18h, samedi 11h) et 3 contenus sur @ludii_cdt.",
           "> Les textes entre [crochets] sont à compléter. **Aucun prix n'est annoncé** (tarifs reportés).",
           "> Les cas clients ne sont publiés qu'avec l'accord du client et son avis.\n"]
    semaines = {"27/10": "Semaine 1 (26 oct - 1 nov) : avant l'arrivée, contenus d'archives et pédagogiques",
                "03/11": "Semaine 2 (2 - 8 nov) : pédagogie et preuve",
                "10/11": "Semaine 3 (9 - 15 nov) : annonce de l'offre fondateurs",
                "17/11": "Semaine 4 (16 - 22 nov) : arrivée à l'Alpe d'Huez (17 nov)",
                "24/11": "Semaine 5 (23 - 29 nov) : premiers lieux de la station"}
    for p in POSTS:
        for k, v in semaines.items():
            if p["date"].endswith(k) and p["compte"] == "June" and p["date"].startswith("Mar"):
                out.append(f"\n## {v}\n")
        if p["compte"] == "Perso" and p is [q for q in POSTS if q["compte"] == "Perso"][0]:
            out.append("\n## Compte perso @ludii_cdt\n")
        out.append(f"### {p['date']} · {p['heure']} · {p['compte']} · {p['rayon']} · {p['format']}")
        out.append(f"**{p['titre']}**  \nCouverture : *{p['couverture']}*\n")
        out.append("**Plan / script**\n\n" + "\n".join("- " + l for l in p["plan"].split("\n")) + "\n")
        out.append("**Légende**\n\n" + "\n".join("> " + l if l else ">" for l in p["legende"].split("\n")) + "\n")
        out.append(f"{p['hashtags']} · Appel à l'action : {p['cta']} · Visuel : {p['visuel']}\n")
    open(os.path.join(ICI, BASE + ".md"), "w", encoding="utf-8").write("\n".join(out))


def pdf():
    e = html.escape
    cartes = []
    for p in POSTS:
        plan = "".join(f"<li>{e(l)}</li>" for l in p["plan"].split("\n"))
        leg = "<br>".join(e(l) for l in p["legende"].split("\n"))
        cartes.append(f"""<div class="c {'perso' if p['compte']=='Perso' else ''}"><div class="h"><span class="d">{e(p['date'])} · {e(p['heure'])}</span><span class="r">{e(p['compte'])} · {e(p['rayon'])} · {e(p['format'])}</span></div>
<h3>{e(p['titre'])}</h3><div class="cov">Couverture : <em>{e(p['couverture'])}</em></div>
<div class="g"><div><div class="l">Plan / script</div><ul>{plan}</ul></div><div><div class="l">Légende</div><div class="leg">{leg}</div><div class="m">{e(p['hashtags'])}<br>Appel à l'action : {e(p['cta'])}<br>Visuel : {e(p['visuel'])}</div></div></div></div>""")
    doc = f"""<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<style>body{{font-family:'Jost',sans-serif;font-weight:300;font-size:9.2pt;line-height:1.45;color:#3A2B22;background:#F3ECE0}}
h1{{font-family:'Cormorant Garamond',serif;font-size:26pt;color:#2F4036;margin:0 0 4px}}.sub{{color:#B38B4D;letter-spacing:.2em;text-transform:uppercase;font-size:8pt;font-weight:500}}
.note{{border-left:3px solid #B38B4D;background:#ece2d2;padding:6px 12px;margin:10px 0 14px}}
.c{{border:1px solid #B38B4D;padding:10px 14px;margin:0 0 10px;page-break-inside:avoid;background:#F3ECE0}}.c.perso{{background:#ece2d2}}
.h{{display:flex;justify-content:space-between;font-size:7.8pt;letter-spacing:.14em;text-transform:uppercase;color:#B38B4D;font-weight:500}}
h3{{font-family:'Cormorant Garamond',serif;font-size:14.5pt;color:#2F4036;margin:4px 0 2px}}.cov{{font-size:8.6pt;margin-bottom:6px}}
.g{{display:grid;grid-template-columns:1fr 1.25fr;gap:14px}}.l{{font-size:7.5pt;letter-spacing:.18em;text-transform:uppercase;color:#B38B4D;font-weight:500;margin-bottom:2px}}
ul{{margin:0;padding-left:14px}}.leg{{background:#fff8ee;border:1px solid #e0d2bd;padding:6px 8px}}.m{{margin-top:5px;font-size:8pt;color:#6b5a4c}}</style></head><body>
<div class="sub">June Content Studio · Calendrier de contenu</div><h1>26 octobre → 29 novembre 2026</h1>
<div class="note">3 publications par semaine sur @junecontentstudio (mardi 18h, jeudi 18h, samedi 11h) et 3 contenus sur @ludii_cdt. Les textes entre [crochets] sont à compléter. <b>Aucun prix n'est annoncé.</b> Les cas clients ne sont publiés qu'avec l'accord du client et son avis.</div>
{''.join(cartes)}</body></html>"""
    p_html = os.path.join(ICI, "_calendrier.html")
    open(p_html, "w", encoding="utf-8").write(doc)
    js = f"""const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://{p_html}',{{waitUntil:'networkidle'}});await p.waitForTimeout(1200);
await p.pdf({{path:'{os.path.join(ICI, BASE + '.pdf')}',format:'A4',margin:{{top:'14mm',bottom:'14mm',left:'13mm',right:'13mm'}},printBackground:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="font-size:8px;width:100%;text-align:center;color:#B38B4D;font-family:sans-serif">June Content Studio · <span class=pageNumber></span>/<span class=totalPages></span></div>'}});await b.close();}})();"""
    subprocess.run(["node", "-e", js], check=True)
    os.remove(p_html)


if __name__ == "__main__":
    csv_file()
    markdown()
    pdf()
    print(f"{len(POSTS)} contenus : {sum(1 for p in POSTS if p['compte']=='June')} June, {sum(1 for p in POSTS if p['compte']=='Perso')} perso")
