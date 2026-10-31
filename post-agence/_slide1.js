// Carrousel « pas une agence », slide 1 : feuille crème sur photo de June. Usage : node _slide1.js
// La photo (../post-studio/prive/balcon.jpg) et le rendu (prive/) ne sont pas versionnés.
const {chromium}=require('playwright');const fs=require('fs');
const IMG='data:image/jpeg;base64,'+fs.readFileSync('../post-studio/prive/balcon.jpg').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Jost:wght@300;400;500&family=Caveat:wght@500;600&display=swap" rel="stylesheet">';
const CSS=`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#F1ECE4}
.ph{position:absolute;inset:0;background:url(${IMG}) 50% 30%/cover}
.feuille{position:absolute;left:120px;right:120px;top:700px;bottom:56px;background:#F6F2EA;box-shadow:0 30px 60px rgba(20,25,35,.35),0 2px 6px rgba(20,25,35,.2);transform:rotate(-1.2deg);display:flex;flex-direction:column;align-items:center;text-align:center;padding:58px 60px 34px;color:#2E2F31}
.feuille:before{content:'';position:absolute;inset:0;background:linear-gradient(100deg,rgba(0,0,0,.035),rgba(0,0,0,0) 12%,rgba(0,0,0,0) 88%,rgba(0,0,0,.03))}
.it{font-family:'Instrument Serif',serif;letter-spacing:-.02em}
.main{font-family:'Caveat',cursive;color:#5E7B6E}
.barre{position:relative;color:#7C7A76}.barre:after{content:'';position:absolute;left:-8px;right:-8px;top:52%;height:3px;background:#5E7B6E;border-radius:3px;transform:rotate(-4deg)}`;
const html=`<div class="f"><div class="ph"></div>
<div class="feuille">
 <div class="it" style="font-size:52px;line-height:1.02">Si vous cherchez une agence<br><i style="color:#5E7B6E">full marketing</i> cet hiver<br>à l'Alpe d'Huez ?</div>
 <div style="width:70px;height:1.5px;background:#2E2F31;opacity:.35;margin:26px 0 24px"></div>
 <div style="font-size:26px;line-height:1.4">Désolée, mais ce n'est pas ce que<br>vous trouverez chez moi…</div>
 <div class="it" style="font-size:38px;line-height:1.12;margin-top:28px">Les plans marketing <span class="barre">parfaits</span><br>sur 3 mois</div>
 <div class="main" style="font-size:44px;line-height:1;margin-top:6px;transform:rotate(-3deg)">ça n'existe pas ici.</div>
 <div style="margin-top:auto;font-size:13px;letter-spacing:.28em;font-weight:500;line-height:1.7">NOTE DE SAISON<br>PAR JUNE CONTENT STUDIO</div>
</div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);fs.mkdirSync('prive',{recursive:true});await p.screenshot({path:'prive/slide-1.jpg',type:'jpeg',quality:93});await b.close()})();
