// Génère 4 variantes de couverture pour le post « J'arrive à l'Alpe d'Huez » (PNG 1080x1350).
const {chromium}=require('playwright');const IMG='data:image/jpeg;base64,'+require('fs').readFileSync('photo.jpg').toString('base64');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Jost:wght@300;400;500&family=Homemade+Apple&display=swap" rel="stylesheet">';
const CSS=()=>`:root{--papier:#F3ECE0;--laiton:#B38B4D;--cafe:#3A2B22;--rose:#D9B8A6}
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Jost',sans-serif;font-weight:300;color:var(--cafe)}
.f{position:relative;overflow:hidden;width:1080px;height:1350px;background:var(--papier)}
.serif{font-family:'Cormorant Garamond',serif;font-weight:600}.lab{font-size:22px;letter-spacing:.32em;text-transform:uppercase;color:var(--laiton);font-weight:500}
.sign{font-family:'Homemade Apple',cursive;color:var(--laiton);font-size:34px}
.img{position:absolute;background:url(${IMG}) center/cover}
.warm{position:absolute;inset:0;background:linear-gradient(180deg,rgba(179,139,77,.16),rgba(58,43,34,.18));mix-blend-mode:multiply}`;
const V={
// A : plein cadre, titre en bas sur voile café
A:`<div class="f"><div class="img" style="inset:0"></div><div class="warm"></div>
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(58,43,34,.0) 45%,rgba(58,43,34,.82))"></div>
<div style="position:absolute;inset:40px;border:2px solid rgba(243,236,224,.8)"></div>
<div class="lab" style="position:absolute;top:84px;left:0;right:0;text-align:center;color:var(--cafe)">June · Content Studio</div>
<div style="position:absolute;left:100px;right:100px;bottom:120px;color:var(--papier);text-align:center">
<div class="lab" style="color:#E4C98F">Novembre 2026</div>
<div class="serif" style="font-size:128px;line-height:.98;margin-top:22px">Je m'installe à <em style="color:#E4C98F">l'Alpe d'Huez</em></div>
<div style="width:110px;height:2px;background:#E4C98F;margin:34px auto 0"></div></div></div>`,
// B : cadre papier, photo encadrée, titre en haut (style couverture de magazine)
B:`<div class="f"><div style="position:absolute;inset:40px;border:2px solid var(--laiton)"></div><div style="position:absolute;inset:54px;border:1px solid var(--laiton);opacity:.7"></div>
<div class="lab" style="position:absolute;top:96px;left:0;right:0;text-align:center">N°01 · Édition d'hiver</div>
<div class="serif" style="position:absolute;top:140px;left:0;right:0;text-align:center;font-size:104px;line-height:1;color:var(--cafe)">June <em style="color:var(--laiton)">arrive</em></div>
<div class="img" style="left:140px;right:140px;top:300px;bottom:290px;border:2px solid var(--laiton);outline:14px solid var(--papier)"></div><div class="warm" style="inset:auto;left:140px;right:140px;top:300px;bottom:290px"></div>
<div style="position:absolute;left:0;right:0;bottom:112px;text-align:center"><div class="serif" style="font-size:50px;font-style:italic;color:var(--cafe)">à l'Alpe d'Huez, le 17 novembre</div><div class="sign" style="margin-top:12px;font-size:30px">June</div></div></div>`,
// C : photo en haut (2/3), bandeau crème en bas
C:`<div class="f"><div class="img" style="left:0;right:0;top:0;height:880px"></div><div class="warm" style="inset:auto;left:0;right:0;top:0;height:880px"></div>
<div style="position:absolute;left:0;right:0;top:880px;height:2px;background:var(--laiton)"></div>
<div class="lab" style="position:absolute;top:50px;left:60px;color:var(--cafe)">L'Atelier</div>
<div class="lab" style="position:absolute;top:50px;right:60px;color:var(--cafe)">Nov. 2026</div>
<div style="position:absolute;left:80px;right:80px;top:930px;text-align:center">
<div class="serif" style="font-size:96px;line-height:1;color:var(--cafe)">Nouvelle saison,<br><em style="color:var(--laiton)">nouvelle adresse</em></div>
<div style="font-size:28px;letter-spacing:.16em;margin-top:30px;text-transform:uppercase">Contenu pour hôtels, hébergements & boutiques</div>
<div class="sign" style="margin-top:22px;font-size:30px">June · Alpe d'Huez</div></div></div>`,
// D : fond crème, grande typo éditoriale, photo en arche
D:`<div class="f" style="background:var(--rose)"><div style="position:absolute;inset:40px;border:1.5px solid var(--cafe);opacity:.55"></div>
<div class="serif" style="position:absolute;top:70px;left:0;right:0;text-align:center;font-size:44px;letter-spacing:.35em;color:var(--cafe)">JUNE</div>
<div class="img" style="left:215px;right:215px;top:190px;height:760px;border-radius:340px 340px 0 0;border:2px solid var(--laiton);outline:12px solid var(--papier)"></div>
<div class="warm" style="inset:auto;left:215px;right:215px;top:190px;height:760px;border-radius:340px 340px 0 0"></div>
<div style="position:absolute;left:0;right:0;top:1000px;text-align:center">
<div class="lab" style="color:var(--cafe)">Bientôt à l'Alpe d'Huez</div>
<div class="serif" style="font-size:112px;line-height:1;margin-top:20px;color:var(--cafe)">C'est <em style="color:var(--papier)">l'heure</em></div>
<div class="sign" style="margin-top:24px;color:var(--cafe);font-size:30px">17 novembre</div></div></div>`};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const k in V){await p.setContent(`<html><head>${FONTS}<style>${CSS()}</style>
</head><body>${V[k]}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:`variante-${k}.png`});console.log(k)}
await b.close()})();
