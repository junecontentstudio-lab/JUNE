"""Récupère les images Kie.ai terminées. Usage : python3 _recup.py"""
import json, subprocess, time
ids = json.load(open("_taches.json")); done = set()
for _ in range(30):
    for k, t in ids.items():
        if k in done: continue
        r = json.loads(subprocess.run(["curl","-sS","-m","30",f"https://api.kie.ai/api/v1/jobs/recordInfo?taskId={t}"],capture_output=True,text=True).stdout)["data"]
        if r["state"] == "success":
            u = json.loads(r["resultJson"])["resultUrls"][0]
            subprocess.run(["curl","-sS","-m","120","-o",f"kie-{k}.png",u]); done.add(k); print(k,"ok",u)
        elif r["state"] == "fail": done.add(k); print(k,"ECHEC",r.get("failMsg"))
    if len(done) == len(ids): break
    time.sleep(10)
