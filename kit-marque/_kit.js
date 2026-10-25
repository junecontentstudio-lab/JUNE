// Génère les visuels du kit de marque June (PNG) à partir de modèles HTML.
const {chromium}=require('playwright');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Jost:wght@300;400;500&family=Homemade+Apple&display=swap" rel="stylesheet">';
const CSS=`:root{--papier:#F3ECE0;--sapin:#2F4036;--laiton:#B38B4D;--cafe:#3A2B22;--rose:#D9B8A6}
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Jost',sans-serif;font-weight:300;color:var(--cafe)}
.f{position:relative;overflow:hidden;display:flex;flex-direction:column}
.serif{font-family:'Cormorant Garamond',serif;font-weight:600}.lab{font-size:22px;letter-spacing:.3em;text-transform:uppercase;color:var(--laiton);font-weight:500}
.frame{position:absolute;inset:40px;border:2px solid var(--laiton);pointer-events:none}.frame2{position:absolute;inset:54px;border:1px solid var(--laiton);opacity:.7;pointer-events:none}
.sign{font-family:'Homemade Apple',cursive;color:var(--laiton);font-size:34px}
.photo{background:linear-gradient(160deg,#c9a77c,#7d5a3c 55%,#3d2c22)}.photo2{background:linear-gradient(160deg,#8e9a8c,#4a5d50 60%,#2f4036)}
.ph{color:rgba(243,236,224,.55);font-size:22px;letter-spacing:.3em;text-transform:uppercase;position:absolute;top:50%;left:0;right:0;text-align:center}
`;
const W=1080;
const T={
'01-palette':{w:W,h:1350,html:`<div class="f" style="width:1080px;height:1350px;background:var(--papier);padding:90px 90px">
 <div class="frame"></div><div class="frame2"></div>
 <div class="lab" style="text-align:center">June · Maison de contenu</div>
 <div class="serif" style="font-size:92px;color:var(--sapin);text-align:center;margin-top:24px;line-height:1">Notre <em style="color:var(--laiton)">palette</em></div>
 <div style="display:flex;flex-direction:column;gap:0;margin-top:56px;flex:1;border:2px solid var(--laiton)">
  ${[['Papier','#F3ECE0','Fond principal · 60 %','#3A2B22'],['Sapin','#2F4036','Couleur de marque · 25 %','#F3ECE0'],['Rose poudré','#D9B8A6','Douceur · 10 %','#3A2B22'],['Laiton','#B38B4D','Détails dorés · 5 %','#fff'],['Café','#3A2B22','Texte','#F3ECE0']].map(c=>`<div style="flex:1;background:${c[1]};color:${c[3]};display:flex;align-items:center;justify-content:space-between;padding:0 48px;${c[0]=='Papier'?'border-bottom:1px solid #B38B4D':''}"><div class="serif" style="font-size:54px">${c[0]}</div><div style="text-align:right;font-size:24px;letter-spacing:.12em"><div style="font-weight:500">${c[1]}</div><div style="opacity:.8;margin-top:4px">${c[2]}</div></div></div>`).join('')}
 </div>
 <div style="text-align:center;margin-top:36px" class="sign">June</div></div>`},
'02-couverture-carrousel':{w:W,h:1350,html:`<div class="f" style="width:1080px;height:1350px;background:var(--papier);justify-content:center;align-items:center;text-align:center;padding:120px">
 <div class="frame"></div><div class="frame2"></div>
 <div class="lab">Le Comptoir · Conseil N°01</div>
 <div class="serif" style="font-size:112px;line-height:1.02;color:var(--sapin);margin:48px 0">Les 4 plans qui manquent à <em style="color:var(--laiton)">votre hôtel</em></div>
 <div style="width:120px;height:2px;background:var(--laiton);margin-bottom:36px"></div>
 <div style="font-size:30px;letter-spacing:.12em">Faites glisser →</div>
 <div class="sign" style="position:absolute;bottom:100px">June · Alpe d'Huez</div></div>`},
'03-slide-conseil':{w:W,h:1350,html:`<div class="f" style="width:1080px;height:1350px;background:var(--papier);padding:130px 110px">
 <div class="frame"></div><div class="frame2"></div>
 <div class="serif" style="font-size:260px;color:var(--laiton);line-height:.9">1</div>
 <div class="lab" style="margin-top:12px">Plan d'ambiance</div>
 <div class="serif" style="font-size:84px;color:var(--sapin);line-height:1.05;margin-top:30px">La lumière du <em style="color:var(--laiton)">réveil</em></div>
 <div style="font-size:38px;line-height:1.5;margin-top:44px;max-width:780px">Un plan lent sur la fenêtre, le rideau qui bouge, la neige dehors. En 3 secondes, le client se projette dans la chambre.</div>
 <div style="position:absolute;bottom:100px;left:110px;right:110px;display:flex;justify-content:space-between;align-items:center"><div class="lab">N°01 · 1/5</div><div class="sign">June</div></div></div>`},
'04-slide-cas-client':{w:W,h:1350,html:`<div class="f" style="width:1080px;height:1350px;background:var(--sapin);color:var(--papier);padding:130px 110px">
 <div class="frame"></div><div class="frame2"></div>
 <div class="lab">L'Atelier · Cas client</div>
 <div class="serif" style="font-size:120px;line-height:1;margin-top:36px">Chalet <em style="color:var(--laiton)">[Nom]</em></div>
 <div style="width:120px;height:2px;background:var(--laiton);margin:44px 0"></div>
 ${[['Le besoin','Des visuels prêts avant Noël'],['Ce que j\'ai fait','Une matinée de tournage'],['Livré','8 réels · 30 photos']].map(r=>`<div style="margin-bottom:38px"><div class="lab">${r[0]}</div><div class="serif" style="font-size:56px;margin-top:8px">${r[1]}</div></div>`).join('')}
 <div style="position:absolute;bottom:100px;right:110px" class="sign">June</div></div>`},
'05-carte-avis':{w:W,h:1350,html:`<div class="f" style="width:1080px;height:1350px;background:var(--rose);justify-content:center;padding:130px 120px">
 <div class="frame"></div><div class="frame2"></div>
 <div class="serif" style="font-size:240px;color:var(--laiton);line-height:.6;height:130px">“</div>
 <div class="serif" style="font-size:80px;line-height:1.12;color:var(--cafe)">Elle a vu notre lieu <em style="color:var(--sapin)">comme nos clients le vivent.</em></div>
 <div style="margin-top:56px" class="lab">— [Prénom], [Lieu] · Alpe d'Huez</div>
 <div class="sign" style="position:absolute;bottom:100px;left:120px">June</div></div>`},
'06-couverture-reel':{w:W,h:1920,html:`<div class="f photo" style="width:1080px;height:1920px"><div class="ph">photo du lieu ici</div>
 <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(47,64,54,.0) 45%,rgba(47,64,54,.85) 100%)"></div>
 <div style="position:absolute;top:70px;left:70px;right:70px;height:1780px;border:2px solid var(--laiton)"></div>
 <div style="position:absolute;top:150px;left:0;right:0;text-align:center"><span class="lab" style="background:var(--papier);padding:14px 26px;display:inline-block">N°01 · La Vitrine</span></div>
 <div style="position:absolute;bottom:230px;left:110px;right:110px;color:var(--papier)"><div class="serif" style="font-size:132px;line-height:1">POV : ta première matinée <em style="color:#e2c58d">dans ce chalet</em></div></div>
 <div class="sign" style="position:absolute;bottom:130px;left:110px">June · Alpe d'Huez</div></div>`},
'07-story':{w:W,h:1920,html:`<div class="f" style="width:1080px;height:1920px;background:var(--papier);justify-content:center;align-items:center;text-align:center;padding:160px 120px">
 <div style="position:absolute;inset:70px;border:2px solid var(--laiton)"></div><div style="position:absolute;inset:84px;border:1px solid var(--laiton);opacity:.7"></div>
 <div class="lab">Le Carnet</div>
 <div class="serif" style="font-size:130px;line-height:1.02;color:var(--sapin);margin:50px 0">À ne pas manquer cette <em style="color:var(--laiton)">semaine</em></div>
 <div style="font-size:40px;line-height:1.5">1 · [Événement]<br>2 · [Ouverture]<br>3 · [Bon plan]</div>
 <div class="sign" style="position:absolute;bottom:150px">June</div></div>`},
'08-photo-de-profil':{w:W,h:W,html:`<div class="f" style="width:1080px;height:1080px;background:var(--sapin);justify-content:center;align-items:center"><div style="width:880px;height:880px;border-radius:50%;border:3px solid var(--laiton);display:flex;align-items:center;justify-content:center;outline:2px solid var(--laiton);outline-offset:-26px"><div class="serif" style="font-size:520px;color:var(--papier);line-height:1;margin-top:-30px">J</div></div></div>`},
'09-tampon':{w:900,h:900,html:`<div class="f" style="width:900px;height:900px;background:transparent;justify-content:center;align-items:center"><div style="width:760px;height:760px;border-radius:50%;border:6px solid #B38B4D;outline:3px solid #B38B4D;outline-offset:-30px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#B38B4D;text-align:center"><div style="font-size:34px;letter-spacing:.35em;text-transform:uppercase;font-weight:500">Vu par</div><div class="serif" style="font-size:230px;line-height:1;letter-spacing:.06em">June</div><div style="width:260px;height:3px;background:#B38B4D;margin:14px 0 18px"></div><div style="font-size:30px;letter-spacing:.32em;text-transform:uppercase;font-weight:500">Alpe d'Huez</div></div></div>`,transparent:true},
};
const HL=['Vitrine','Comptoir','Atelier','Carnet','Avis','Offre'];
HL.forEach((n,i)=>{T['10-a-la-une-'+n.toLowerCase()]={w:W,h:W,html:`<div class="f" style="width:1080px;height:1080px;background:var(--sapin);justify-content:center;align-items:center"><div style="width:860px;height:860px;border-radius:50%;border:3px solid var(--laiton);display:flex;align-items:center;justify-content:center;text-align:center"><div><div class="serif" style="font-size:150px;color:var(--papier);line-height:1">${n}</div><div style="width:120px;height:3px;background:var(--laiton);margin:30px auto 0"></div></div></div></div>`}});
(async()=>{const b=await chromium.launch();
for(const [name,t] of Object.entries(T)){
 const p=await b.newPage({viewport:{width:t.w,height:t.h}});
 await p.setContent(`<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${CSS}</style></head><body style="background:${t.transparent?'transparent':'#fff'}">${t.html}</body></html>`,{waitUntil:'networkidle'});
 await p.waitForTimeout(600);
 await p.screenshot({path:name+'.png',omitBackground:!!t.transparent});await p.close();console.log('ok',name);}
await b.close();})();
