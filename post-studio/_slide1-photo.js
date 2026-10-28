// Carrousel studio, slide 1 version photo (photo plein écran). Usage : node _slide1-photo.js
// La photo (prive/montagne.jpg) n'est pas versionnée.
const {chromium}=require('playwright');const fs=require('fs');
const IMG='data:image/jpeg;base64,'+fs.readFileSync('prive/montagne.jpg').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Archivo:wght@500;600&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#2E1D16;color:#F3ECE0}
.ph{position:absolute;left:0;right:0;top:0;bottom:0;background:url(${IMG}) 50% 0%/cover;filter:sepia(.22) saturate(.8) contrast(1.05) brightness(.97)}
.dg{position:absolute;left:0;right:0;top:0;bottom:0;background:linear-gradient(180deg,rgba(46,29,22,.45),rgba(46,29,22,.25) 45%,rgba(46,29,22,0) 62%)}
.t{font-family:'Instrument Serif',serif;font-size:104px;line-height:.86;letter-spacing:-.035em}
.s{font-family:'Archivo',sans-serif;font-weight:600;font-size:22px;letter-spacing:.06em;line-height:1.35;text-transform:uppercase;color:#F3ECE0;text-shadow:0 1px 6px rgba(30,18,12,.7)}`;
const html=`<div class="f">
<div class="ph"></div><div class="dg"></div>
<div style="position:absolute;left:78px;top:96px">
 <div class="t"><i>le studio de</i><br>communication<br>visuelle <i>&amp;</i><br>création<br>de contenu</div>
 <div class="s" style="margin-top:34px">Sur place, à l'Alpe d'Huez.</div>
 <div class="s" style="margin-top:14px">Toute la saison.</div>
</div>
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'prive/slide-1-photo.jpg',type:'jpeg',quality:93});await b.close()})();
