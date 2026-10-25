"""Ajoute des idées de contenu (rapports/donnees/idees-AAAA-MM-JJ.json) dans la table content_ideas de Supabase.

Utilisation :  python3 scripts/ajouter_idees.py 2026-10-26 [--simulation]

Format du fichier JSON : une liste d'objets avec
  title (obligatoire), format, hook, description, inspired_by (handle d'un compte déjà connu), target, for_account
Les idées dont le titre existe déjà sont ignorées (pas de doublons).
Les clés sont lues dans SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY et ne sont jamais affichées.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from charger_supabase import RACINE, appel  # noqa: E402

CHAMPS = {"title", "format", "hook", "description", "target", "for_account", "planned_for"}


def main(date, simulation):
    chemin = os.path.join(RACINE, "rapports", "donnees", f"idees-{date}.json")
    idees = json.load(open(chemin, encoding="utf-8"))
    comptes = {c["handle"]: c["id"] for c in appel("GET", "reference_accounts?select=id,handle")}
    existants = {i["title"] for i in appel("GET", "content_ideas?select=title&limit=5000")}

    nouvelles, ignorees, inconnus = [], 0, set()
    for i in idees:
        if not i.get("title"):
            sys.exit("Une idée n'a pas de titre : fichier non chargé.")
        if i["title"] in existants:
            ignorees += 1
            continue
        ligne = {k: v for k, v in i.items() if k in CHAMPS}
        ligne.setdefault("for_account", "junecontentstudio")
        source = i.get("inspired_by")
        if source and source not in comptes:
            inconnus.add(source)
        ligne["inspired_by_account_id"] = comptes.get(source)
        nouvelles.append(ligne)

    print(f"{len(idees)} idées lues : {len(nouvelles)} nouvelles, {ignorees} déjà présentes.")
    if inconnus:
        print("Sources inconnues (laissées vides, à ajouter dans reference_accounts) : " + ", ".join(sorted(inconnus)))
    if simulation or not nouvelles:
        print("Simulation : rien n'a été écrit." if simulation else "Rien à ajouter.")
        return
    appel("POST", "content_ideas", nouvelles, prefer="return=minimal")
    print(f"{len(nouvelles)} idées ajoutées dans Supabase.")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 1:
        sys.exit("Utilisation : python3 scripts/ajouter_idees.py AAAA-MM-JJ [--simulation]")
    main(args[0], "--simulation" in sys.argv)
