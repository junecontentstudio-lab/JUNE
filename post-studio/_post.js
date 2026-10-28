// Post « JUNE » papier déchiré + phrase du studio. Usage : node _post.js
const {chromium}=require('playwright');
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@300;400;500;600&family=Homemade+Apple&display=swap" rel="stylesheet">';
// bord déchiré : contour irrégulier (pseudo-aléatoire reproductible)
let seed=7;const rnd=()=>((seed=(seed*9301+49297)%233280)/233280);
function trou(x0,y0,x1,y1,j){const p=[];const n=140;let d=0;
 const pas=()=>{d=d*.6+(rnd()-.5)*j;return d+(rnd()<.06?(rnd()-.5)*j*2.2:0)};
 for(let i=0;i<=n;i++)p.push([x0+(x1-x0)*i/n, y0+pas()]);
 for(let i=0;i<=24;i++)p.push([x1+pas()*1.4, y0+(y1-y0)*i/24]);
 for(let i=n;i>=0;i--)p.push([x0+(x1-x0)*i/n, y1+pas()]);
 return p.map(q=>q.map(Math.round).join(',')).join(' ')}
const bord=trou(150,258,928,490,14); seed=21; const int=trou(168,280,906,468,9);
const CSS=`:root{--papier:#F3ECE0;--laiton:#B38B4D;--cafe:#3A2B22}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Jost',sans-serif;font-weight:300}
.f{width:1080px;height:1350px;position:relative;overflow:hidden;background:#4E382C;color:var(--papier)}
.grain{position:absolute;inset:0;opacity:.35;mix-blend-mode:overlay}
.vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(255,255,255,.06),rgba(0,0,0,.28) 85%)}
.serif{font-family:'Cormorant Garamond',serif;font-weight:500}
.tag{position:absolute;background:#D8C7B3;color:var(--cafe);font-size:27px;padding:6px 16px 8px;box-shadow:0 4px 10px rgba(0,0,0,.25);font-weight:400;white-space:nowrap}
.tag b{font-weight:600;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px}
.pill{border:2px solid rgba(243,236,224,.75);border-radius:40px;padding:16px 38px;font-size:30px;font-weight:300}
u{text-underline-offset:6px;text-decoration-thickness:2px;font-weight:500}`;
const html=`<div class="f">
<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div class="vig"></div>
<div style="position:absolute;top:56px;left:76px;font-size:26px;letter-spacing:.06em"><span class="serif" style="font-style:italic;font-size:30px">by</span> <b style="font-weight:600">JUNE</b>CONTENTSTUDIO</div>
<div style="position:absolute;top:44px;right:72px;border:1.5px solid rgba(243,236,224,.7);border-radius:30px;padding:10px 28px;font-size:20px;letter-spacing:.08em">HIVER <span class="serif" style="font-style:italic;font-size:28px">à</span> L'ALPE <b style="font-weight:600">D'HUEZ</b></div>
<svg width="1080" height="1350" style="position:absolute;inset:0">
 <defs><radialGradient id="in" cx="50%" cy="50%" r="60%"><stop offset="55%" stop-color="#FBF8F2"/><stop offset="100%" stop-color="#E9D9C6"/></radialGradient>
 <filter id="ds"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-opacity=".45"/></filter>
 <linearGradient id="roll" x1="0" x2="1"><stop offset="0" stop-color="#9C8573"/><stop offset=".35" stop-color="#E9DCCB"/><stop offset=".7" stop-color="#D6C4B0"/><stop offset="1" stop-color="#8E7765"/></linearGradient>
 <clipPath id="c"><polygon points="${int}"/></clipPath></defs>
 <polygon points="${bord}" fill="#E4D5C2" filter="url(#ds)"/>
 <polygon points="${int}" fill="url(#in)"/>
 <text x="540" y="445" text-anchor="middle" clip-path="url(#c)" font-family="Cormorant Garamond" font-weight="500" font-size="250" fill="#4A3327" letter-spacing="14">JUNE</text>
 <g filter="url(#ds)"><path d="M118 238 C 95 300, 100 400, 135 500 L 205 505 C 175 420, 168 320, 190 245 Z" fill="url(#roll)"/>
 <path d="M190 245 C 215 250, 232 285, 222 320 C 205 300, 192 280, 190 245 Z" fill="#CDB9A4"/></g>
</svg>
<div class="tag" style="left:370px;top:478px;transform:rotate(-2deg)">Le studio qui <b>raconte</b> votre lieu.</div>
<div style="position:absolute;top:575px;left:0;right:0;display:flex;align-items:center;gap:26px;font-size:30px"><div style="flex:1;height:1.5px;background:rgba(243,236,224,.7)"></div><div><u>Avant</u> même d'arriver, vos clients se disent :</div><div style="flex:1;height:1.5px;background:rgba(243,236,224,.7)"></div></div>
<div style="position:absolute;top:650px;left:0;right:0;display:flex;justify-content:center;gap:28px"><div class="pill">« On a envie d'y être. »</div><div class="pill">« C'est là qu'on va. »</div></div>
<div style="position:absolute;top:850px;left:0;right:0;text-align:center">
 <div style="font-size:30px;letter-spacing:.04em;margin-bottom:6px">Le studio de</div>
 <div class="serif" style="font-size:100px;line-height:.93;letter-spacing:-.01em">COMMUNICATION<br>VISUELLE ET<br>CRÉATION DE<br>CONTENU.</div></div>
<div class="tag" style="left:70px;top:1040px;transform:rotate(-4deg)"><b>Sur place</b>.</div>
<div class="tag" style="left:745px;top:1252px;transform:rotate(3deg)">Toute la <b>saison</b>.</div>
</div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<html><head>${FONTS}<style>${CSS}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'post-studio.jpg',type:'jpeg',quality:93});await b.close()})();
