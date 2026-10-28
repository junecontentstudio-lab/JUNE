// Carrousel studio, slide 2 : « Je suis sur place ». Usage : node _slide2.js
const {chromium}=require('playwright');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#3A2B22;color:#F3ECE0}
.grain{position:absolute;inset:0;opacity:.3;mix-blend-mode:overlay}
.vig{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 45%,rgba(255,240,220,.07),rgba(0,0,0,.3) 90%)}
.serif{font-family:'Bodoni Moda',serif}.cg{font-family:'Cormorant Garamond',serif}
.tag{display:inline-block;background:#F3ECE0;color:#3A2B22;font-size:28px;padding:6px 18px 8px;box-shadow:0 4px 10px rgba(0,0,0,.3);font-weight:400}
.tag b{font-weight:600;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px}
s{text-decoration:none;position:relative;color:#BFA387}s:after{content:'';position:absolute;left:-6px;right:-6px;top:54%;height:4px;background:#B38B4D;transform:rotate(-3deg)}`;
const html=`<div class="f">
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div class="vig"></div>
<div style="position:absolute;top:56px;left:76px;font-size:26px;letter-spacing:.06em"><span class="cg" style="font-style:italic;font-size:30px">by</span> <b style="font-weight:600">JUNE</b>CONTENTSTUDIO</div>
<div style="position:absolute;top:44px;right:72px;border:1.5px solid rgba(243,236,224,.6);border-radius:30px;padding:10px 28px;font-size:20px;letter-spacing:.08em">HIVER <span class="cg" style="font-style:italic;font-size:28px">à</span> L'ALPE <b style="font-weight:600">D'HUEZ</b></div>
<div style="position:absolute;left:96px;right:90px;top:260px">
 <div class="serif" style="font-size:150px;line-height:1;color:#B38B4D;font-style:italic;font-weight:400">02</div>
 <div style="width:90px;height:2px;background:#B38B4D;margin:26px 0 54px"></div>
 <div class="serif" style="font-size:84px;line-height:1.08;font-style:italic;font-weight:400">Je suis sur place,</div>
 <div class="serif" style="font-size:84px;line-height:1.08;font-weight:400;margin-top:6px">pas à <s>2 heures</s><br><s>de route</s>.</div>
 <div style="margin-top:80px;font-size:34px;letter-spacing:.02em;line-height:1.5">Je passe chez vous</div>
 <div class="serif" style="font-size:104px;line-height:.98;font-weight:400;letter-spacing:-.01em">CHAQUE SEMAINE.</div>
</div>
<div style="position:absolute;right:90px;bottom:120px;transform:rotate(3deg)"><span class="tag">Votre studio <b>du coin</b>.</span></div>
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'slide-2.jpg',type:'jpeg',quality:93});await b.close()})();
