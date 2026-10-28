// Carrousel studio, slide 3 : « Je connais la station de l'intérieur » + toi sur le banc détourée (version B). Usage : node _slide3-banc.js
// La photo détourée (prive/sticker-banc.png) n'est pas versionnée.
const {chromium}=require('playwright');const fs=require('fs');
const CIEL='data:image/jpeg;base64,'+fs.readFileSync('prive/ciel.jpg').toString('base64');
const IMG='data:image/png;base64,'+fs.readFileSync('prive/sticker-banc.png').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cormorant+Garamond:ital,wght@1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">';
const CSS=`.f{text-shadow:0 2px 16px rgba(20,25,35,.55),0 1px 3px rgba(20,25,35,.4)}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#3E3F42 url(${CIEL}) center/cover;color:#F3ECE0}
.voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(30,35,45,.22),rgba(30,35,45,.3))}
.grain{position:absolute;inset:0;opacity:.3;mix-blend-mode:overlay}
.it{font-family:'Instrument Serif',serif}.cg{font-family:'Cormorant Garamond',serif;font-style:italic}
.tag{text-shadow:none;display:inline-block;background:#F3ECE0;color:#2E2F31;font-size:26px;padding:8px 18px 10px;box-shadow:0 4px 10px rgba(0,0,0,.3);font-weight:300}
.tag b{font-weight:500;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1.5px}`;
const html=`<div class="f">
<div class="voile"></div>
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<img src="${IMG}" style="position:absolute;left:0;bottom:30px;width:880px;filter:drop-shadow(0 18px 28px rgba(0,0,0,.4))">
<div style="position:absolute;left:78px;top:110px;width:620px">
 <div class="it" style="font-size:100px;line-height:.86;letter-spacing:-.035em;margin-top:40px">je connais<br>la station<br><i style="color:#C3D5CB">de l'intérieur.</i></div>
</div>
<div style="position:absolute;right:60px;top:560px;transform:rotate(-3deg)"><span class="tag">Je suis aussi <b>saisonnière</b></span></div>
<div style="position:absolute;right:110px;top:622px;transform:rotate(-1deg)"><span class="tag">cet <b>hiver</b>,</span></div>
<div style="position:absolute;right:50px;top:682px;transform:rotate(2deg)"><span class="tag">et ce depuis <b>2019</b>.</span></div>
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'prive/slide-3-banc.jpg',type:'jpeg',quality:93});await b.close()})();
