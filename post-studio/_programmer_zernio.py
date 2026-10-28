"""Envoie les 7 slides du carrousel sur Zernio et programme le post Instagram.
Usage : python3 _programmer_zernio.py   (date et compte réglés ci-dessous)"""
import json, os, subprocess, uuid
API = "https://api.zernio.com/v1"
COMPTE = "6ae0953a03708a1c30ca68c6"  # @junecontentstudio
QUAND, FUSEAU = "2026-10-29T12:00:00", "Europe/Paris"
SLIDES = ["prive/slide-1-photo.jpg"] + [f"prive/slide-{i}.jpg" for i in range(2, 8)]

def appel(*args):
    r = subprocess.run(["curl", "-sS", "-m", "120", *args], capture_output=True, text=True)
    return json.loads(r.stdout) if r.stdout.strip().startswith(("{", "[")) else r.stdout

urls = []
for i, f in enumerate(SLIDES, 1):
    p = appel("-X", "POST", f"{API}/media/presign", "-H", "Content-Type: application/json",
              "-d", json.dumps({"filename": f"june-carrousel-{i}.jpg", "contentType": "image/jpeg", "size": os.path.getsize(f)}))
    code = subprocess.run(["curl", "-sS", "-m", "120", "-o", "/dev/null", "-w", "%{http_code}", "-X", "PUT",
                           "-H", "Content-Type: image/jpeg", "--data-binary", f"@{f}", p["uploadUrl"]],
                          capture_output=True, text=True).stdout
    print(i, code, p["publicUrl"]); assert code.startswith("2"), code
    urls.append(p["publicUrl"])

post = {"content": open("legende.md", encoding="utf-8").read().strip(),
        "mediaItems": [{"type": "image", "url": u} for u in urls],
        "platforms": [{"platform": "instagram", "accountId": COMPTE}],
        "scheduledFor": QUAND, "timezone": FUSEAU}
r = appel("-X", "POST", f"{API}/posts", "-H", "Content-Type: application/json",
          "-H", f"Idempotency-Key: {uuid.uuid4()}", "-d", json.dumps(post))
print(json.dumps(r, ensure_ascii=False)[:1500])
