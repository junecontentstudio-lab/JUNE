// Carrousel studio, slide 4 : objection « On poste déjà un peu nous-mêmes ». Usage : node _slide4.js
// Fond : ciel flouté de la photo 1 (prive/ciel.jpg, non versionné).
const {chromium}=require('playwright');const fs=require('fs');
const CIEL='data:image/jpeg;base64,'+fs.readFileSync('prive/ciel.jpg').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">';
const CSS=`.f{text-shadow:0 2px 16px rgba(20,25,35,.55),0 1px 3px rgba(20,25,35,.4)}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#3E3F42 url(${CIEL}) center/cover;color:#F3ECE0}
.voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(30,35,45,.26),rgba(30,35,45,.34))}
.grain{position:absolute;inset:0;opacity:.3;mix-blend-mode:overlay}
.it{font-family:'Instrument Serif',serif;letter-spacing:-.03em}
.p{font-size:32px;line-height:1.45;max-width:880px}
.tag{text-shadow:none;display:inline-block;background:#F3ECE0;color:#2E2F31;font-size:26px;padding:7px 18px 9px;box-shadow:0 4px 10px rgba(0,0,0,.3);font-weight:300;margin:0 10px 12px 0}
s{text-decoration:none;position:relative;color:#B9B6B0}s:after{content:'';position:absolute;left:-6px;right:-6px;top:55%;height:4px;background:#A9BDB3;transform:rotate(-3deg)}`;
const html=`<div class="f"><div class="voile"></div>
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div style="position:absolute;left:84px;right:84px;top:250px">
 <div class="it" style="font-size:88px;line-height:.92;margin-top:30px"><i>« On poste déjà un peu<br>nous-mêmes. <s>Ça suffit.</s> »</i></div>
 <div style="width:90px;height:2px;background:#A9BDB3;margin:48px 0 40px"></div>
 <div class="p">Ce soir, un client hésite entre vous et la terrasse d'à côté. Il ouvre votre Instagram. Il tombe sur…</div>
 <div style="margin-top:26px">
  <div class="tag" style="transform:rotate(-2deg)">une photo de l'<b style="font-weight:500">hiver dernier</b>,</div><br>
  <div class="tag" style="transform:rotate(1deg);margin-left:40px">une story <b style="font-weight:500">floue</b> prise en plein service,</div><br>
  <div class="tag" style="transform:rotate(-1deg);margin-left:12px">rien depuis <b style="font-weight:500">trois semaines</b>.</div>
 </div>
 <div class="p" style="margin-top:30px;max-width:none;white-space:nowrap;font-size:30px">Pendant ce temps, votre terrasse est pleine, l'ambiance est parfaite…</div>
 <div class="it" style="font-size:112px;line-height:.9;margin-top:18px;color:#C3D5CB"><i>et personne ne le voit.</i></div>
</div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'prive/slide-4.jpg',type:'jpeg',quality:93});await b.close()})();
