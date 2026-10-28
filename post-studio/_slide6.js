// Carrousel studio, slide 6 (finale) : « Cet hiver, avec June, concrètement ». Usage : node _slide6.js
// Bandeau : montagnes de la photo 1 (prive/bandeau.jpg, non versionné).
const {chromium}=require('playwright');const fs=require('fs');
const BAND='data:image/jpeg;base64,'+fs.readFileSync('prive/bandeau.jpg').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#F1ECE4;color:#2E2F31}
.grain{position:absolute;inset:0;opacity:.18;mix-blend-mode:multiply}
.it{font-family:'Instrument Serif',serif;letter-spacing:-.025em}
.band{position:absolute;left:0;right:0;top:0;height:320px;background:url(${BAND}) center/cover;filter:saturate(.75) contrast(1.03)}
.band:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(38,39,42,.15),rgba(241,236,228,0) 60%,#F1ECE4)}
ul{list-style:none;margin-top:30px}
li{display:flex;gap:22px;align-items:baseline;padding:19px 0;border-top:1px solid rgba(46,47,49,.18);font-size:27px;line-height:1.36}
li:last-child{border-bottom:1px solid rgba(46,47,49,.18)}
li .fl{color:#6F8A7E;font-size:30px;flex:none}
li i{font-family:'Instrument Serif',serif;font-size:34px;letter-spacing:-.01em;color:#2E2F31}`;
const L=[
 "Votre lieu filmé à ses <i>meilleurs moments</i>, chaque semaine : golden hour, après-ski, soirées, neige fraîche.",
 "Un compte qui <i>vit</i> de l'ouverture à la fermeture, même pendant le rush de février.",
 "Des clients qui vous <i>choisissent</i> avant même d'arriver en station.",
 "Une vidéo où je vis votre lieu <i>comme une cliente</i>, vue par vos abonnés et par les miens.",
 "Une image qui vous ressemble, <i>reconnaissable</i> au premier regard.",
 "Et vous, <i>zéro minute</i> à y passer.",
];
const html=`<div class="f"><div class="band"></div>
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div style="position:absolute;left:84px;right:84px;top:330px">
 <div class="it" style="font-size:84px;line-height:.95;margin-top:14px">Cet hiver, <i style="color:#6F8A7E">avec June</i>,<br>concrètement :</div>
 <ul>${L.map(t=>`<li><span class="fl">→</span><span>${t}</span></li>`).join('')}</ul>
 <div class="it" style="font-size:33px;line-height:1.25;margin-top:40px;text-align:center;color:#4A4C4F"><i>« Vous faites vivre votre lieu. Je fais ressentir ce qu'on y vit. »</i></div>
</div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'prive/slide-6.jpg',type:'jpeg',quality:93});await b.close()})();
