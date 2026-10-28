// Post du 29/10 : 2 photos empilées + cartes « notification » (style agenda). Usage : node _post.js
const {chromium}=require('playwright'); const fs=require('fs');
const img=f=>'data:image/jpeg;base64,'+fs.readFileSync(f).toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@300;400;500&family=Homemade+Apple&display=swap" rel="stylesheet">';
const CSS=`:root{--papier:#F3ECE0;--laiton:#B38B4D;--cafe:#3A2B22;--rose:#D9B8A6}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:var(--cafe)}
.ph{position:absolute;left:0;width:1080px;height:675px;background-size:cover;filter:sepia(.18) saturate(.85) contrast(1.02) brightness(1.02)}
.card{position:absolute;left:190px;width:700px;background:rgba(250,246,239,.97);border-radius:30px;padding:26px 30px 30px;box-shadow:0 10px 40px rgba(58,43,34,.25)}
.h{display:flex;align-items:center;gap:22px;color:#8a7d72;font-size:30px;font-weight:300}.h:after{content:'';flex:1;height:2px;background:#e6ddd0}
.ev{margin:14px 0 0 82px;background:#F1E6D6;border-left:6px solid var(--laiton);border-radius:8px;padding:18px 24px}
.t{font-size:37px;color:var(--cafe);font-weight:500;line-height:1.15}.s{font-size:20px;color:var(--laiton);margin-top:8px;font-weight:400;letter-spacing:.04em}
.sign{position:absolute;right:42px;bottom:30px;font-family:'Homemade Apple',cursive;color:var(--cafe);font-size:28px}`;
const H=img('photo-haut.jpg'), B=img('photo-bas.jpg');
const carte=(top,h,t,s)=>`<div class="card" style="top:${top}px"><div class="h">${h}</div><div class="ev"><div class="t">${t}</div><div class="s">◷ ${s}</div></div></div>`;
const V={
 plans:[['07:30','Le plan de dos, face à la vue','Celui qui fait rêver'],['14:30',"Le plan d'arrivée au chalet",'Celui qui fait réserver']],
 saisonniere:[['07:30','Saisonnière, mode service','7:30 · Alpe d\'Huez'],['14:30','Créatrice, mode studio','14:30 · June Content Studio']],
};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const [k,[a,c]] of Object.entries(V)){
 await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body><div class="f">
 <div class="ph" style="top:0;background-image:url(${H});background-position:50% 52%"></div>
 <div class="ph" style="top:675px;background-image:url(${B});background-position:50% 74%"></div>
 ${carte(395,...a)}${carte(1045,...c)}<div class="sign">June</div></div></body></html>`,{waitUntil:'networkidle'});
 await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:`instagram/2910-${k}.jpg`,type:'jpeg',quality:92});console.log(k)}
await b.close()})();
