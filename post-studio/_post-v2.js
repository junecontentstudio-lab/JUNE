// Post studio v2 : uniquement la phrase centrée, fond café au lait. Usage : node _post-v2.js
const {chromium}=require('playwright');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#BFA387;color:#3A2B22;display:flex;flex-direction:column;justify-content:center;align-items:center}
.grain{position:absolute;inset:0;opacity:.3;mix-blend-mode:overlay}
.vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(255,248,236,.22),rgba(58,43,34,.22) 90%)}
.serif{font-family:'Cormorant Garamond',serif;font-weight:500}
.tag{position:absolute;background:#F3ECE0;color:#3A2B22;font-size:27px;padding:6px 16px 8px;box-shadow:0 4px 10px rgba(58,43,34,.22);font-weight:400;white-space:nowrap}
.tag b{font-weight:600;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px}`;
const html=`<div class="f">
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div class="vig"></div>
<div style="position:absolute;top:56px;left:76px;font-size:26px;letter-spacing:.06em"><span class="serif" style="font-style:italic;font-size:30px">by</span> <b style="font-weight:600">JUNE</b>CONTENTSTUDIO</div>
<div style="position:absolute;top:44px;right:72px;border:1.5px solid rgba(58,43,34,.6);border-radius:30px;padding:10px 28px;font-size:20px;letter-spacing:.08em">HIVER <span class="serif" style="font-style:italic;font-size:28px">à</span> L'ALPE <b style="font-weight:600">D'HUEZ</b></div>
<div style="position:relative;text-align:center">
 <div style="font-size:32px;letter-spacing:.04em;margin-bottom:10px">Le studio de</div>
 <div class="serif" style="font-size:104px;line-height:.93;letter-spacing:-.01em">COMMUNICATION<br>VISUELLE ET<br>CRÉATION DE<br>CONTENU.</div>
 <div class="tag" style="left:-20px;top:205px;transform:rotate(-4deg)"><b>Sur place</b>.</div>
 <div class="tag" style="right:-30px;top:440px;transform:rotate(3deg)">Toute la <b>saison</b>.</div>
</div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'post-studio-v2.jpg',type:'jpeg',quality:93});await b.close()})();
