// Carrousel studio, slide 2 : « Je suis sur place » (fond : ciel flouté de la photo 1, non versionné). Usage : node _slide2.js
const {chromium}=require('playwright');const fs=require('fs');
const CIEL='data:image/jpeg;base64,'+fs.readFileSync('prive/ciel.jpg').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&family=Instrument+Serif:ital@0;1&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#3E3F42 url(${CIEL}) center/cover;color:#F3ECE0}
.grain{position:absolute;inset:0;opacity:.3;mix-blend-mode:overlay}
.vig{position:absolute;inset:0;background:linear-gradient(180deg,rgba(38,39,42,.55),rgba(38,39,42,.62)),radial-gradient(ellipse at 30% 45%,rgba(255,255,255,.05),rgba(0,0,0,.3) 90%)}
.serif{font-family:'Instrument Serif',serif;letter-spacing:-.03em}.cg{font-family:'Cormorant Garamond',serif}
.tag{display:inline-block;background:#F3ECE0;color:#2E2F31;font-size:28px;padding:6px 18px 8px;box-shadow:0 4px 10px rgba(0,0,0,.3);font-weight:400}
.tag b{font-weight:600;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px}
s{text-decoration:none;position:relative;color:#B9B6B0}s:after{content:'';position:absolute;left:-6px;right:-6px;top:54%;height:4px;background:#A9BDB3;transform:rotate(-3deg)}`;
const html=`<div class="f">
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div class="vig"></div>
<div style="position:absolute;left:96px;right:90px;top:400px">
 <div class="serif" style="font-size:104px;line-height:.9;font-style:italic;font-weight:400">Je suis sur place,</div>
 <div class="serif" style="font-size:104px;line-height:.9;font-weight:400;margin-top:6px">pas à <s>2 heures</s><br><s>de route</s>.</div>
 <div style="margin-top:80px;font-size:34px;letter-spacing:.02em;line-height:1.5">Je peux passer prendre le café chez vous</div>
 <div class="serif" style="font-size:132px;line-height:.86;font-weight:400;letter-spacing:-.035em">chaque <i>semaine.</i></div>
</div>
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'slide-2.jpg',type:'jpeg',quality:93});await b.close()})();
