"""Envoie les résultats d'une analyse (rapports/donnees/*.json) dans Supabase.

Utilisation :  python3 scripts/charger_supabase.py 2026-10-25

Les clés sont lues dans les variables d'environnement SUPABASE_URL et
SUPABASE_SERVICE_ROLE_KEY : elles ne sont jamais affichées ni écrites.
Le script refuse de charger deux fois la même date (pas de doublons).
"""
import json
import os
import ssl
import sys
import urllib.error
import urllib.request

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = os.environ["SUPABASE_URL"].rstrip("/") + "/rest/v1/"
CLE = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
CA = "/root/.ccr/ca-bundle.crt"
CONTEXTE = ssl.create_default_context(cafile=CA if os.path.exists(CA) else None)


def appel(methode, chemin, corps=None, prefer="return=representation"):
    if isinstance(corps, list):
        # Supabase exige les mêmes colonnes sur toutes les lignes d'un envoi groupé
        colonnes = {k for ligne in corps for k in ligne}
        corps = [{k: ligne.get(k) for k in colonnes} for ligne in corps]
    requete = urllib.request.Request(
        URL + chemin,
        method=methode,
        data=json.dumps(corps).encode() if corps is not None else None,
        headers={
            "apikey": CLE,
            "Authorization": f"Bearer {CLE}",
            "Content-Type": "application/json",
            "Prefer": prefer,
        },
    )
    try:
        with urllib.request.urlopen(requete, context=CONTEXTE) as reponse:
            texte = reponse.read().decode()
            return json.loads(texte) if texte else []
    except urllib.error.HTTPError as erreur:
        sys.exit(f"Erreur Supabase sur {chemin} ({erreur.code}) : {erreur.read().decode()[:300]}")


def main(date):
    dossier = os.path.join(RACINE, "rapports", "donnees")
    collecte = json.load(open(os.path.join(dossier, f"collecte-{date}.json"), encoding="utf-8"))
    synthese = json.load(open(os.path.join(dossier, f"synthese-{date}.json"), encoding="utf-8"))

    # 1. Comptes (créés ou mis à jour)
    comptes = appel(
        "POST",
        "reference_accounts?on_conflict=platform,handle",
        collecte["accounts"],
        prefer="resolution=merge-duplicates,return=representation",
    )
    ids = {c["handle"]: c["id"] for c in comptes}

    # Garde-fou : cette date est-elle déjà chargée ?
    deja = appel("GET", f"audits?select=id&audit_date=eq.{date}&limit=1")
    if deja:
        sys.exit(f"Les données du {date} sont déjà dans Supabase : rien n'a été ajouté.")

    # 2. Photos des comptes
    snapshots = []
    for s in collecte["snapshots"]:
        ligne = {k: v for k, v in s.items() if k != "handle"}
        ligne["account_id"] = ids[s["handle"]]
        snapshots.append(ligne)
    appel("POST", "account_snapshots", snapshots, prefer="return=minimal")

    # 3. Audits
    audits = []
    for a in collecte["audits"]:
        ligne = {k: v for k, v in a.items() if k != "handle"}
        ligne["account_id"] = ids[a["handle"]]
        audits.append(ligne)
    appel("POST", "audits", audits, prefer="return=minimal")

    # 4. Traits de marque
    traits = []
    for t in synthese["brand_traits"]:
        ligne = {k: v for k, v in t.items() if k != "source"}
        ligne["source_account_id"] = ids.get(t["source"])
        traits.append(ligne)
    appel("POST", "brand_traits", traits, prefer="return=minimal")

    # 5. Idées de contenu
    idees = []
    for i in synthese["content_ideas"]:
        ligne = {k: v for k, v in i.items() if k != "inspired_by"}
        ligne["inspired_by_account_id"] = ids.get(i["inspired_by"]) if i["inspired_by"] else None
        idees.append(ligne)
    appel("POST", "content_ideas", idees, prefer="return=minimal")

    print(
        f"Chargé : {len(ids)} comptes, {len(snapshots)} photos de comptes, {len(audits)} notes d'audit, "
        f"{len(traits)} traits, {len(idees)} idées."
    )


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Utilisation : python3 scripts/charger_supabase.py AAAA-MM-JJ")
    main(sys.argv[1])
