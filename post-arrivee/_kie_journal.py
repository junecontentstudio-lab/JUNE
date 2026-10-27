"""Post « June arrive à l'Alpe d'Huez » : June dans une télécabine qui lit un journal (Kie.ai, Nano Banana Pro, 4K).
Usage : python3 _kie_journal.py <url_selfie> [variantes...]   puis   python3 _recup.py journal"""
import json, subprocess, sys
SELFIE = sys.argv[1]
CHALETS = "https://raw.githubusercontent.com/junecontentstudio-lab/JUNE/claude/github-context-file-p2663f/post-arrivee/photo.jpg"
BASE = ("Photorealistic cinematic editorial photo, analog film look with soft grain, 4:5. "
        "The woman is the exact same person as in image 1: keep her face, eyes, eyebrows, freckles, skin tone and blonde-brown long hair perfectly recognisable. "
        "She sits inside a ski gondola cabin at Alpe d'Huez, French Alps, large windows with snowy mountains, fog and pine trees outside, soft overcast winter light. "
        "She wears a fluffy cream faux-fur hat and a cream and brown vintage faux-fur coat, gold rings, dark manicure. Old-money, quiet luxury, après-ski mood. "
        "She holds open a large printed broadsheet newspaper in cream off-white paper with black and brown ink. Newspaper layout: top masthead in blackletter \"Alpe d'Huez, FR\" "
        "with a small boxed \"ÉDITION SPÉCIALE\", then directly thin double rules with no small text line under the masthead, a huge bold condensed headline \"JUNE ARRIVE\", below it a thin elegant serif line \"À L'ALPE D'HUEZ\", "
        "then a large printed photo on the newspaper reproducing image 2 (wooden chalets in the snow). All newspaper text must be spelled exactly as given (headline is exactly the two words J-U-N-E  A-R-R-I-V-E), no other words. "
        "Warm, muted palette: cream, beige, camel, brown. No logos, no watermark. ")
V = {
 "A": "Framing like a fashion campaign: the newspaper covers her nose and mouth, only her eyes and the fur hat peek above it, playful look at the camera.",
 "B": "The newspaper is held slightly lower, at chest height, so her whole face is visible, soft confident smile, looking at the camera.",
 "C": "Three-quarter view, she leans back on the gondola seat reading the newspaper, face visible in profile with a light smile, mountains blurred behind.",
 "E": "Exactly like a fashion campaign shot: she holds the newspaper high and very close to the camera, its top edge sits just under her eyes, covering her nose, mouth and chin completely. Only her eyes, eyebrows and the fur hat are visible above the paper, intense playful gaze straight into the camera. The newspaper fills the lower two thirds of the frame, headline large and perfectly readable.",
 "D": "Close framing from slightly above, she lowers the top corner of the newspaper with one hand and looks over it at the camera, face fully visible, headline still readable.",
}
ids = {}
for k in (sys.argv[2:] or list(V)):
    d = {"model":"nano-banana-pro","input":{"prompt":BASE+V[k],"image_input":[SELFIE, CHALETS],"aspect_ratio":"4:5","resolution":"4K","output_format":"png"}}
    r = json.loads(subprocess.run(["curl","-sS","-m","60","https://api.kie.ai/api/v1/jobs/createTask","-H","Content-Type: application/json","-d",json.dumps(d)],capture_output=True,text=True).stdout)
    print(k, r); ids[k] = r["data"]["taskId"]
json.dump(ids, open("_taches-journal.json","w"))
