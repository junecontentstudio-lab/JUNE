// Carrousel studio, slide 3 : « Je connais la station de l'intérieur » + photo détourée. Usage : node _slide3.js
// La photo détourée (prive/sticker.png) n'est pas versionnée.
const {chromium}=require('playwright');const fs=require('fs');
const IMG='data:image/png;base64,'+fs.readFileSync('prive/sticker.png').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Italiana&family=Cormorant+Garamond:ital,wght@1,500&family=Jost:wght@300;400;500;600&family=Pinyon+Script&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#F3ECE0;color:#3A2B22}
.grain{position:absolute;inset:0;opacity:.22;mix-blend-mode:multiply}
.it{font-family:'Italiana',serif}.cg{font-family:'Cormorant Garamond',serif;font-style:italic}
.tag{display:inline-block;background:#3A2B22;color:#F3ECE0;font-size:26px;padding:8px 18px 10px;box-shadow:0 4px 10px rgba(58,43,34,.25);font-weight:300}
.tag b{font-weight:500;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1.5px}`;
const html=`<div class="f">
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div style="position:absolute;top:56px;left:76px;font-size:26px;letter-spacing:.06em"><span class="cg" style="font-size:30px">by</span> <b style="font-weight:600">JUNE</b>CONTENTSTUDIO</div>
<div style="position:absolute;top:44px;right:72px;border:1.5px solid rgba(58,43,34,.55);border-radius:30px;padding:10px 28px;font-size:20px;letter-spacing:.08em">HIVER <span class="cg" style="font-size:28px">à</span> L'ALPE <b style="font-weight:600">D'HUEZ</b></div>
<div style="position:absolute;right:-40px;top:250px;width:560px;height:1150px;background:#D9C6AE;border-radius:280px 280px 0 0"></div>
<img src="${IMG}" style="position:absolute;right:20px;bottom:-60px;height:1120px;filter:drop-shadow(0 18px 24px rgba(58,43,34,.28))">
<div style="position:absolute;left:84px;top:250px;width:560px">
 <div class="it" style="font-size:40px;color:#B38B4D;letter-spacing:.2em">— 03</div>
 <div class="it" style="font-size:118px;line-height:.98;margin-top:40px">JE<br>CONNAIS<br>LA STATION</div>
 <div style="font-family:'Pinyon Script',cursive;font-size:90px;color:#B38B4D;line-height:1;margin:10px 0 0 20px">de l'intérieur.</div>
</div>
<div style="position:absolute;left:84px;top:1010px;transform:rotate(-3deg)"><span class="tag">Je suis aussi <b>saisonnière</b></span></div>
<div style="position:absolute;left:130px;top:1072px;transform:rotate(-1deg)"><span class="tag">cet <b>hiver</b>.</span></div>
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'prive/slide-3.jpg',type:'jpeg',quality:93});await b.close()})();
