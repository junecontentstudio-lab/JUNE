// Carrousel studio, slide 1 version photo (photo plein écran). Usage : node _slide1-photo.js
// La photo (prive/montagne.jpg) et la silhouette posée devant le titre (prive/s1-perso.png) ne sont pas versionnées.
const {chromium}=require('playwright');const fs=require('fs');
const PERSO='data:image/png;base64,'+fs.readFileSync('prive/s1-perso.png').toString('base64');
const IMG='data:image/jpeg;base64,'+fs.readFileSync('prive/montagne.jpg').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Archivo:wght@500;600&family=Jost:wght@300;500&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#2E1D16;color:#F3ECE0}
.ph{position:absolute;left:0;right:0;top:0;bottom:0;background:url(${IMG}) 50% 0%/cover}
.dg{position:absolute;left:0;right:0;top:0;bottom:0;background:linear-gradient(180deg,rgba(30,35,45,.22) 0%,rgba(30,35,45,.3) 25%,rgba(30,35,45,.2) 42%,rgba(30,35,45,0) 55%)}
.t{font-family:'Instrument Serif',serif;font-size:104px;line-height:.86;letter-spacing:-.035em;text-shadow:0 2px 22px rgba(20,25,35,.7),0 1px 4px rgba(20,25,35,.5)}
.s{font-family:'Archivo',sans-serif;font-weight:600;font-size:22px;letter-spacing:.06em;line-height:1.35;text-transform:uppercase;color:#F3ECE0;text-shadow:0 1px 6px rgba(30,18,12,.7)}`;
const html=`<div class="f">
<div class="ph"></div><div class="dg"></div>
<div class="t" style="position:absolute;left:78px;top:205px"><i>un studio de</i><br>communication,<br>sur place,<br>toute la saison.</div>
<img src="${PERSO}" style="position:absolute;left:0;top:0;width:1080px;height:1350px">
<div style="position:absolute;left:78px;top:770px">
 <div style="display:inline-block;transform:rotate(-2deg);background:#F3ECE0;color:#2E2F31;font-family:'Jost',sans-serif;font-size:28px;font-weight:300;padding:8px 20px 10px;box-shadow:0 4px 12px rgba(0,0,0,.35)">Ça change <b style="font-weight:500;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1.5px">quoi</b> pour vous ? →</div>
</div>
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'prive/slide-1-photo.jpg',type:'jpeg',quality:93});await b.close()})();
