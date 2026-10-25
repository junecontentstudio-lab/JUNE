"""Envoie les résultats d'une analyse (rapports/donnees/*.json) dans Supabase.

Utilisation :  python3 scripts/charger_supabase.py 2026-10-25

Les clés sont lues dans les variables d'environnement SUPABASE_URL et
SUPABASE_SERVICE_ROLE_KEY : elles ne sont jamais affichées ni écrites.
Le script peut être relancé : ce qui est déjà chargé est ignoré (pas de doublons).
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

    def deja_charge(table, filtre=""):
        return bool(appel("GET", f"{table}?select=id{filtre}&limit=1"))

    def avec_compte(lignes, cle_handle, cle_id):
        sortie = []
        for l in lignes:
            ligne = {k: v for k, v in l.items() if k != cle_handle}
            ligne[cle_id] = ids.get(l.get(cle_handle))
            sortie.append(ligne)
        return sortie

    fait = []

    # (table, colonnes qui identifient une ligne, filtre de date éventuel, lignes, libellé)
    etapes = [
        ("account_snapshots", ["account_id"], f"&captured_at=gte.{date}T00:00:00Z&captured_at=lt.{date}T23:59:59Z",
         avec_compte(collecte["snapshots"], "handle", "account_id"), "photos de comptes"),
        ("audits", ["account_id", "axis"], f"&audit_date=eq.{date}",
         avec_compte(collecte["audits"], "handle", "account_id"), "notes d'audit"),
        ("brand_traits", ["source_account_id", "trait"], "",
         avec_compte(synthese["brand_traits"], "source", "source_account_id"), "traits"),
        ("content_ideas", ["title"], "",
         [{"for_account": "junecontentstudio", **i}
          for i in avec_compte(synthese["content_ideas"], "inspired_by", "inspired_by_account_id")], "idées"),
    ]
    for table, cles, filtre, lignes, libelle in etapes:
        # On n'envoie que les lignes absentes de la base : le script peut être relancé après un ajout
        existantes = appel("GET", f"{table}?select={','.join(cles)}{filtre}&limit=5000")
        deja = {tuple(e[c] for c in cles) for e in existantes}
        nouvelles = [l for l in lignes if tuple(l.get(c) for c in cles) not in deja]
        if not nouvelles:
            print(f"{table} : rien de nouveau.")
            continue
        appel("POST", table, nouvelles, prefer="return=minimal")
        fait.append(f"{len(nouvelles)} {libelle}")

    print(f"Comptes : {len(ids)}. Ajouté : " + (", ".join(fait) if fait else "rien (tout était déjà chargé)") + ".")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Utilisation : python3 scripts/charger_supabase.py AAAA-MM-JJ")
    main(sys.argv[1])
