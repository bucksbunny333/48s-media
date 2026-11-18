// Ben-Akte 01 – Das Handy auf dem Tisch (Ward et al. 2017)
let CFG;
function initCues(){
 Object.assign(T,{stumm:cue('Stumm.'),umg:cue('Umgedreht.'),und1:cue('Und',1),duemmer:cue('dümmer.'),ben:cue('Ben',1),handy2:cue('Handy',2),fasst:cue('fasst'),egal:cue('Egal,'),forscher:cue('Forscher'),fuenf:cue('fünfhundert'),drei:cue('drei'),
  h3:cue('Handy',3),h4:cue('Handy',4),h5:cue('Handy',5),alle:cue('Alle'),dann:cue('Dann:'),denk:cue('Denkaufgaben.'),die1:cue('Die',1),schlecht:cue('schlechtesten'),die2:cue('Die',2),besten:cue('besten.'),
  dein:cue('Dein'),wie:cue('Wie'),akku:cue('Akku'),und2:cue('Und',2),wo:cue('Wo'),rechts:cue('rechts.'),wahr:cue('Wahrscheinlich'),und3:cue('Und',3),aEnd:cueEnd('spannend.'),
  dannB:cue('Dann'),test:cue('Test.'),h8:cue('Handy',8),ben2:cue('Ben',2),kopf2:cue('Kopf',2),heute:cue('heute'),folge:cue('Folge')});
 CFG={capStart:T.ben,
  HL:{'dümmer':RED,'egal':RED,'texas':WHITE,'fünfhundert':WHITE,'tisch':RED,'tasche':WHITE,'raum':GREEN,'lautlos':WHITE,'schlechtesten':RED,'besten':GREEN,'akku':RED,'du':GREEN,'rechts':GREEN,'hand':RED,'spannend':GREEN,'da':GREEN,'test':GREEN,'achtzehn':GREEN,'uhr':GREEN,'folge':GREEN},
  src:[[T.forscher,T.dein,'Quelle: Ward et al., Journal of the Association for Consumer Research (2017)']],
  head:[[T.ben,'01 · BEN LERNT'],[T.forscher,'02 · DIE STUDIE'],[T.dein,'03 · DEIN KOPF'],[T.und2,'04 · UND DU?'],[T48+1,''],[T.folge,'']]};
}
window.SFXC=()=>[[T.stumm,'pop'],[T.umg,'whoosh'],[T.duemmer,'boom'],[T.ben,'whoosh'],[T.fasst,'pop'],[T.egal,'boom'],[T.forscher,'whoosh'],[T.h3,'pop'],[T.h4,'pop'],[T.h5,'pop'],[T.alle,'pop'],[T.dann,'whoosh'],[T.schlecht,'buzz'],[T.besten,'ding'],[T.dein,'whoosh'],[T.akku,'buzz'],[T.und2,'whoosh'],[T.rechts,'pop'],[T.wahr,'boom'],[T.und3,'whoosh'],[T.test,'pop'],[T.h8,'whoosh'],[T.heute,'boom'],[T.folge,'pop']];
function phoneDown(x,y,sc,op=1){return `<g transform="translate(${x},${y}) scale(${sc})" opacity="${op}"><rect x="-24" y="-40" width="48" height="80" rx="9" fill="#1a1a1a" stroke="${WHITE}" stroke-width="5"/><circle cx="-8" cy="-26" r="5" fill="none" stroke="${GREY}" stroke-width="3"/><circle cx="6" cy="-26" r="5" fill="none" stroke="${GREY}" stroke-width="3"/></g>`}
function mute(x,y,sc,op=1){return `<g transform="translate(${x},${y}) scale(${sc})" opacity="${op}" fill="none" stroke="${WHITE}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"><path d="M-40,-18 L-18,-18 L8,-42 L8,42 L-18,18 L-40,18 Z"/><line x1="24" y1="-20" x2="56" y2="20" stroke="${RED}"/><line x1="56" y1="-20" x2="24" y2="20" stroke="${RED}"/></g>`}
function door(x,y,op=1){return `<g opacity="${op}" stroke="${WHITE}" stroke-width="8" fill="none"><rect x="${x-55}" y="${y-95}" width="110" height="190" rx="6"/><circle cx="${x+30}" cy="${y}" r="7" fill="${WHITE}"/></g>`}
function bag(x,y,op=1){return `<g opacity="${op}" stroke="${WHITE}" stroke-width="8" fill="none" stroke-linejoin="round"><path d="M${x-95},${y-30} L${x+95},${y-30} L${x+80},${y+80} L${x-80},${y+80} Z"/><path d="M${x-50},${y-30} Q${x-50},${y-70} ${x},${y-70} Q${x+50},${y-70} ${x+50},${y-30}"/></g>`}
function scenes(t){let s='';
 // S1 HOOK frame 0
 if(t<T.ben+0.1){const o=cl((T.ben+0.05-t)/0.25);let g='';
  g+=txt(540,500,'ES LIEGT NUR DA.',112,WHITE,900,1,'middle',-3);
  const fl=cl((t-T.umg)/0.35);const sc=2.6;
  g+=`<g transform="translate(540,830)"><g transform="scale(${Math.cos(Math.PI*fl)>=0?1:-1},1) scale(${Math.abs(Math.cos(Math.PI*fl))+0.02},1)">${fl<0.5?phone(0,0,sc,'#2b2b2b',0):phoneDown(0,0,sc)}</g></g>`;
  if(t>T.stumm-0.1)g+=mute(800,760,1.2,cl((t-T.stumm+0.1)/0.2));
  g+=txt(540,1110,'UND MACHT DICH',96,WHITE,900,1,'middle',-2)+txt(540,1310,'DÜMMER.',170,RED,900,1,'middle',-6);
  s+=`<g opacity="${o}">${g}</g>`;}
 // S2 Ben learns, phone next to him
 if(t>T.ben-0.1&&t<T.egal+0.1){const o=env(t,T.ben-0.05,T.egal+0.05,0.2,0.2);let g=desk(200,1040,480)+chair(760,1110);
  const f=FIG.draw(Object.assign({x:760,y:1110,s:1.15},P.read));g+=f.svg+book((f.lh[0]+f.rh[0])/2,(f.lh[1]+f.rh[1])/2-10,WHITE);
  const pk=eb((t-T.handy2)/0.3);g+=`<g transform="translate(330,1022) rotate(90) scale(${pk})">${phoneDown(0,0,1.1)}</g>`;
  if(t>T.handy2)g+=`<circle cx="330" cy="1022" r="${70+10*Math.sin(t*8)}" fill="none" stroke="${RED}" stroke-width="6" opacity=".7"/>`;
  g+=txt(540,1300,'BEN',54,'#8a8a8a',800,1,'middle',8);
  if(t>T.fasst-0.1)g+=pill(540,560,'FASST ES NICHT AN',WHITE,'#000',52,cl((t-T.fasst+0.1)/0.2));
  s+=`<g opacity="${o}">${g}</g>`;}
 // S3 EGAL
 if(t>T.egal-0.1&&t<T.forscher+0.1){const o=env(t,T.egal-0.05,T.forscher+0.05,0.15,0.2);const k=eb((t-T.egal)/0.3);
  s+=`<g opacity="${o}"><g transform="translate(540,900) scale(${k})">${txt(0,60,'EGAL.',220,RED,900,1,'middle',-8)}</g>${txt(540,1080,'SAGT DIE FORSCHUNG',56,'#aaa',800,1,'middle',6)}</g>`;}
 // S4 study + groups + results (one continuous scene)
 if(t>T.forscher-0.1&&t<T.dein+0.1){const o=env(t,T.forscher-0.05,T.dein+0.05,0.2,0.2);let g='';
  if(t<T.h3+0.2){const k=cl((T.h3+0.2-t)/0.25);const n=Math.floor(500*eio((t-T.fuenf+0.2)/0.9));
   g+=`<g opacity="${k}">${txt(540,520,'UNIVERSITY OF TEXAS',54,'#aaa',800,1,'middle',3)}${txt(540,760,(t>T.fuenf-0.2?n:0)+(n>=500?'+':''),200,WHITE,900,1,'middle',-6)}${txt(540,850,'STUDENTEN',56,'#888',800,1,'middle',6)}`;
   for(let i=0;i<30;i++){const c=i%10,r=Math.floor(i/10);const grp=t>T.drei?Math.floor(c/3.34):-1;const col=grp===0?RED:grp===1?WHITE:grp===2?GREEN:GREY;g+=mini(170+c*82,1050+r*130,0.28,col,cl((t-T.fuenf-i*0.02)/0.2))}
   g+='</g>';}
  else{const cols=[[230,'TISCH',RED,T.h3],[540,'TASCHE',WHITE,T.h4],[850,'ANDERER RAUM',GREEN,T.h5]];
   const up=eio((t-T.dann)/0.5);const y0=700-200*up;
   cols.forEach(([x,l,c,tt],i)=>{if(t<tt-0.1)return;const k=eb((t-tt+0.1)/0.3);let ic='';
    if(i===0)ic=`<line x1="${x-90}" y1="${y0+40}" x2="${x+90}" y2="${y0+40}" stroke="${WHITE}" stroke-width="8"/>`+`<g transform="translate(${x},${y0+5}) rotate(90)">${phoneDown(0,0,0.8)}</g>`;
    if(i===1)ic=bag(x,y0,1)+phoneDown(x,y0+25,0.6);
    if(i===2)ic=door(x,y0,1);
    g+=`<g transform="translate(${x},${y0}) scale(${k}) translate(${-x},${-y0})">${ic}</g>`+txt(x,y0+150,l,40,c,900,k,'middle',2);
    if(t>T.alle-0.1&&t<T.dann+0.3)g+=mute(x+70,y0-90,0.6,cl((t-T.alle+0.1)/0.2)*(1-cl((t-T.dann)/0.3)));
    // result bars
    if(t>T.die1-0.1){const hts=[0.7,0.82,1.0];const lit=i===0?t>T.die1:(i===2?t>T.die2:t>T.die1+0.8);const h=380*hts[i]*eio((t-(i===2?T.die2:T.die1))/0.8);
     g+=`<rect x="${x-70}" y="${1240-h}" width="140" height="${h}" rx="12" fill="${c}" opacity="${lit?1:0.3}"/>`;}
   });
   if(t>T.dann-0.1&&t<T.die1+0.2)g+=`<g opacity="${cl((t-T.dann)/0.3)*(1-cl((t-T.die1)/0.3))}">${txt(540,950,'DENKAUFGABEN',90,WHITE,900,1,'middle',-2)}${txt(540,1060,'? + ? = ?',70,'#888',800,1,'middle',8)}</g>`;
   if(t>T.die1-0.1){g+=`<line x1="120" y1="1244" x2="960" y2="1244" stroke="#444" stroke-width="6"/>`+txt(540,1310,'LEISTUNG BEI DENKAUFGABEN (REIHENFOLGE)',30,'#777',700,1,'middle',3);
    if(t>T.schlecht)g+=txt(230,1240-266-30,'AM SCHLECHTESTEN',30,RED,900,cl((t-T.schlecht)/0.2));
    if(t>T.besten)g+=txt(850,1240-380-30,'AM BESTEN',34,GREEN,900,cl((t-T.besten)/0.2));}}
  s+=`<g opacity="${o}">${g}</g>`;}
 // S5 head with background app draining battery
 if(t>T.dein-0.1&&t<T.und2+0.1){const o=env(t,T.dein-0.05,T.und2+0.05,0.2,0.2);let g='';
  const inner=`<g transform="translate(540,880)">${phoneDown(0,0,1.3,0.9)}<circle r="${80+8*Math.sin(t*9)}" fill="none" stroke="${RED}" stroke-width="5" stroke-dasharray="20 14" transform="rotate(${t*90})"/></g>`;
  g+=head(540,880,220,WHITE,inner)+txt(540,560,'ARBEITET IM HINTERGRUND',52,RED,900,cl((t-T.dein-0.3)/0.3),'middle',3);
  if(t>T.wie-0.1){const lv=1-eio((t-T.akku)/1.2)*0.85;const k=cl((t-T.wie+0.1)/0.25);g+=`<g opacity="${k}" transform="translate(540,1230)"><rect x="-150" y="-55" width="300" height="110" rx="16" fill="none" stroke="${WHITE}" stroke-width="9"/><rect x="150" y="-22" width="20" height="44" rx="6" fill="${WHITE}"/><rect x="-136" y="-41" width="${272*lv}" height="82" rx="8" fill="${lv<0.4?RED:GREEN}"/></g>`;}
  s+=`<g opacity="${o}">${g}</g>`;}
 // S6 und du?
 if(t>T.und2-0.1&&t<S7e+0.1){const o=env(t,T.und2-0.05,S7e,0.2,0.3);let g='';
  if(t<T.wahr-0.05){g+=txt(540,900,'UND DU?',190,WHITE,900,eo((t-T.und2)/0.25),'middle',-6);if(t>T.wo-0.1)g+=txt(540,1080,'WO LIEGT ES GERADE?',64,GREEN,900,cl((t-T.wo+0.1)/0.2),'middle',2);if(t>T.rechts-0.4)g+=arrowHUD(t,T.rechts-0.4);}
  else{const k=eo((t-T.wahr)/0.3);g+=`<g opacity="${k}">${phone(540,820,3.2,'#222',0)}${thumb(640,1060,1.1,1)}</g>`+txt(540,530,'IN DEINER HAND.',90,RED,900,k,'middle',-2);
   if(t>T.und3-0.1)g+=pill(540,1280,'JETZT WIRD ES SPANNEND',GREEN,'#000',50,cl((t-T.und3+0.1)/0.2),1+0.04*Math.sin(t*10));}
  s+=`<g opacity="${o}">${g}</g>`;}
 return s;}
function post48(t){let s='';
 if(t<T.ben2+0.1){const o=env(t,T48+1.05,T.ben2+0.05,0.25,0.25);let g=txt(540,520,'DER TEST',110,GREEN,900,cl((t-T.dannB)/0.3),'middle',4);
  const m=eio((t-T.h8)/1.0);g+=door(780,950,1)+`<g opacity="${1-cl((m-0.85)/0.15)}">${phone(300+430*m,950,1.8,'#222',0)}</g>`;
  if(t>T.h8-0.1)g+=txt(540,1200,'NACH DEM VIDEO: ANDERER RAUM',44,WHITE,900,cl((t-T.h8+0.1)/0.2),'middle',3);
  s+=`<g opacity="${o}">${g}</g>`;}
 if(t>T.ben2-0.1){const o=cl((t-T.ben2+0.05)/0.25);let g='';
  const f=FIG.draw(Object.assign({x:420,y:1150,s:1.15},P.stand,{headTilt:-10}));g+=f.svg+door(800,1050,1);
  if(t>T.kopf2-0.2){const k=eb((t-T.kopf2+0.2)/0.35);g+=`<g transform="translate(${f.head[0]+130},${f.head[1]-60}) scale(${k})">${txt(0,40,'?',150,GREEN,900)}</g>`}
  if(t>T.heute-0.1)g+=pill(540,560,'HEUTE 18:00 · FOLGE 3',GREEN,'#000',54,cl((t-T.heute+0.1)/0.2));
  if(t>T.folge-0.1)g+=pill(540,1380,'FOLGE BEN →',GREEN,'#000',62,cl((t-T.folge+0.1)/0.2),0.85+0.15*eo((t-T.folge+0.1)/0.3));
  s+=`<g opacity="${o}">${g}</g>`;}
 return s;}
