// Carrousel studio, slide 5 : « Ce n'est pas l'envie qui manque. C'est le temps. » Usage : node _slide5.js
// Fond : ciel flouté de la photo 1 (prive/ciel.jpg, non versionné).
const {chromium}=require('playwright');const fs=require('fs');
const CIEL='data:image/jpeg;base64,'+fs.readFileSync('prive/ciel.jpg').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#3E3F42 url(${CIEL}) center/cover;color:#F3ECE0}
.voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(38,39,42,.6),rgba(38,39,42,.7))}
.grain{position:absolute;inset:0;opacity:.3;mix-blend-mode:overlay}
.it{font-family:'Instrument Serif',serif;letter-spacing:-.03em}
.p{font-size:32px;line-height:1.45;max-width:880px}
.tag{display:inline-block;background:#F3ECE0;color:#2E2F31;font-size:26px;padding:7px 18px 9px;box-shadow:0 4px 10px rgba(0,0,0,.3);font-weight:300;margin:0 10px 12px 0}
s{text-decoration:none;position:relative;color:#B9B6B0}s:after{content:'';position:absolute;left:-6px;right:-6px;top:55%;height:4px;background:#A9BDB3;transform:rotate(-3deg)}`;
const html=`<div class="f"><div class="voile"></div>
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div style="position:absolute;left:84px;right:84px;top:220px">
 <div class="it" style="font-size:40px;color:#A9BDB3;letter-spacing:.12em">— 05</div>
 <div class="it" style="font-size:96px;line-height:.92;margin-top:30px"><i>Ce n'est pas l'envie<br>qui manque.</i><br>C'est le temps.</div>
 <div style="width:90px;height:2px;background:#A9BDB3;margin:48px 0 40px"></div>
 <div class="p">En pleine saison…</div>
 <div style="margin-top:24px">
  <div class="tag" style="transform:rotate(-2deg)">vous <b style="font-weight:500">servez</b>,</div><br>
  <div class="tag" style="transform:rotate(1.5deg);margin-left:46px">vous gérez <b style="font-weight:500">l'équipe</b>,</div><br>
  <div class="tag" style="transform:rotate(-1deg);margin-left:14px">les <b style="font-weight:500">livraisons</b>,</div><br>
  <div class="tag" style="transform:rotate(2deg);margin-left:70px">les <b style="font-weight:500">imprévus</b>.</div>
 </div>
 <div class="p" style="margin-top:30px">Et votre communication, elle…</div>
 <div class="it" style="font-size:118px;line-height:.9;margin-top:14px;color:#C3D5CB"><i>passe après tout.</i></div>
</div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'prive/slide-5.jpg',type:'jpeg',quality:93});await b.close()})();
