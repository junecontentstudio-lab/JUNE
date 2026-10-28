// Carrousel studio, slide 7 : appel à l'action (écrivez-moi en MP, dès le 17 novembre). Usage : node _slide7.js
// Fond : ciel et sommets de la photo 1 (prive/fond-cta.jpg, non versionné).
const {chromium}=require('playwright');const fs=require('fs');
const FOND='data:image/jpeg;base64,'+fs.readFileSync('prive/fond-cta.jpg').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#3E3F42 url(${FOND}) center/cover;color:#F3ECE0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(38,39,42,.55),rgba(38,39,42,.35) 50%,rgba(38,39,42,.6))}
.grain{position:absolute;inset:0;opacity:.3;mix-blend-mode:overlay}
.it{font-family:'Instrument Serif',serif;letter-spacing:-.03em}
.c{position:relative;padding:0 80px}
.tag{display:inline-block;background:#F3ECE0;color:#2E2F31;font-size:28px;padding:9px 22px 11px;box-shadow:0 4px 12px rgba(0,0,0,.35);font-weight:300}
.tag b{font-weight:500;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1.5px}
.btn{display:inline-flex;align-items:center;gap:16px;border:1.5px solid rgba(243,236,224,.8);border-radius:60px;padding:20px 44px;font-size:28px;letter-spacing:.08em;text-transform:uppercase;font-weight:400;background:rgba(243,236,224,.08);backdrop-filter:blur(3px)}`;
const html=`<div class="f"><div class="voile"></div>
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div class="c">
 <div class="it" style="font-size:36px;color:#C3D5CB;letter-spacing:.12em">— 07</div>
 <div style="font-size:30px;margin-top:40px;letter-spacing:.02em">J'arrive à l'Alpe d'Huez le 17 novembre.</div>
 <div class="it" style="font-size:118px;line-height:.9;margin-top:34px">On en parle<br><i style="color:#C3D5CB">autour d'un café ?</i></div>
 <div style="margin-top:56px;transform:rotate(-2deg)"><span class="tag">Écrivez-moi <b>en MP</b>, on se rencontre dès le <b>17 novembre</b>.</span></div>
 <div style="margin-top:70px"><span class="btn">Envoyer un message <span style="font-size:32px">→</span></span></div>
 <div style="margin-top:28px;font-size:24px;letter-spacing:.14em;opacity:.85">@JUNECONTENTSTUDIO</div>
</div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'prive/slide-7.jpg',type:'jpeg',quality:93});await b.close()})();
