// Folge 3 – Tag drei: Lieber Stromschlag als Stille
let CFG;
function initCues(){
 Object.assign(T,{klingt:cue('Klingt'),getestet:cue('getestet.'),tag:cue('Tag',1),ben:cue('Ben',1),kein1:cue('Kein',1),kein2:cue('Kein',2),nur:cue('Nur'),und1:cue('Und',1),laut:cue('laut.'),
  der:cue('Der'),daumen:cue('Daumen'),hand:cue('Hand'),leer:cue('Leer.'),forscher:cue('Forscher'),minuten2:cue('Minuten',2),einziger:cue('Einziger'),strom2:cue('Stromschlag.'),
  zwei:cue('Zwei'),jede:cue('Jede'),lieber:cue('Lieber'),stille:cue('Stille.'),und2:cue('Und',2),rechts:cue('rechts.'),wie:cue('Wie'),das1:cue('Das',1),entzug:cue('Entzug.'),und3:cue('Und',3),vorbei:cue('vorbei.'),
  aEnd:cueEnd('vorbei.'),dunicht:cue('Du',3),in:cue('In'),er1:cue('Er',1),er2:cue('Er',2),stift:cue('Stift.'),morgen:cue('Morgen:'),was:cue('Was'),folge:cue('Folge')});
 CFG={capStart:T.klingt,
  HL:{'stromschlag':RED,'verrückt':RED,'drei':GREEN,'laut':RED,'leer':RED,'virginia':WHITE,'zwei':RED,'vierte':RED,'schmerz':RED,'stille':WHITE,'du':GREEN,'rechts':GREEN,'entzug':RED,'vorbei':GREEN,'da':GREEN,'stift':GREEN,'vier':GREEN,'folge':GREEN,'ben':WHITE},
  src:[[T.forscher,T.lieber,'Quelle: Wilson et al., Science (2014) · University of Virginia']],
  head:[[T.klingt,''],[T.tag,'01 · BENS TAG 3'],[T.forscher,'02 · DAS EXPERIMENT'],[T.und2,'03 · UND DU?'],[T48+1,'TAG 3 / 14'],[T.morgen,'']]};
}
window.SFXC=()=>[[T.klingt,'whoosh'],[T.getestet,'boom'],[T.tag,'whoosh'],[T.kein1,'pop'],[T.kein2,'pop'],[T.und1,'whoosh'],[T.laut,'buzz'],[T.der,'whoosh'],[T.leer,'boom'],[T.forscher,'whoosh'],[T.einziger,'pop'],[T.strom2,'zap'],[T.zwei,'whoosh'],[T.jede,'pop'],[T.lieber,'boom'],[T.und2,'whoosh'],[T.rechts,'pop'],[T.das1,'whoosh'],[T.entzug,'boom'],[T.und3,'pop'],[T.in,'whoosh'],[T.stift,'ding'],[T.morgen,'boom'],[T.folge,'pop']];
function scenes(t){let s='';
 // S1 hook (frame 0)
 if(t<T.klingt+0.1){const o=cl((T.klingt+0.05-t)/0.25);let g='';const sh=Math.sin(t*40)*(t<0.5?4:0);
  g+=txt(540+sh,520,'DU NIMMST LIEBER',100,WHITE,900,1,'middle',-2)+txt(540+sh,650,'EINEN',100,WHITE,900,1,'middle',-2);
  const fl=(Math.sin(t*23)>0.2)?1:0.55;g+=txt(540+sh,850,'STROMSCHLAG',128,RED,900,1,'middle',-6)+bolt(540,1300,1.6,RED,fl);
  g+=txt(540,1040,'ALS 15 MINUTEN',100,WHITE,900,1,'middle',-2)+txt(540,1170,'NICHTS ZU TUN?',100,WHITE,900,1,'middle',-2);
  s+=`<g opacity="${o}">${g}</g>`;}
 // S2 verrückt / getestet
 if(t>T.klingt-0.1&&t<T.tag+0.1){const o=env(t,T.klingt-0.05,T.tag+0.05,0.15,0.2);let g=txt(540,820,'VERRÜCKT?',150,WHITE,900,eo((t-T.klingt)/0.2),'middle',-4);
  if(t>T.getestet-0.1){const k=eb((t-T.getestet+0.1)/0.3);g+=`<g transform="translate(540,1040) rotate(-8) scale(${k})"><rect x="-300" y="-80" width="600" height="150" rx="16" fill="none" stroke="${RED}" stroke-width="12"/>${txt(0,35,'GETESTET.',96,RED,900,1,'middle',6)}</g>`}
  s+=`<g opacity="${o}">${g}</g>`;}
 // S3 Ben on sofa, day 3, no feed/video
 if(t>T.tag-0.1&&t<T.und1+0.1){const o=env(t,T.tag-0.05,T.und1+0.05,0.2,0.2);let g=dayTrack(3,1,0.5+0.5*Math.sin(t*6),470);
  g+=sofa(330,1180,420);g+=FIG.draw(Object.assign({x:560,y:1150,s:1.1},P.sit,{headTilt:-8}),{}).svg;
  g+=txt(540,1400,'BEN',54,'#8a8a8a',800,cl((t-T.ben)/0.3),'middle',8);
  const ic=(x,tt,lbl,kind)=>{if(t<tt-0.1)return '';const k=eb((t-tt+0.1)/0.3);const inner=kind==='feed'?`<rect x="-55" y="-55" width="110" height="110" rx="20" fill="none" stroke="${WHITE}" stroke-width="9"/><line x1="-30" y1="-20" x2="30" y2="-20" stroke="${WHITE}" stroke-width="9"/><line x1="-30" y1="5" x2="30" y2="5" stroke="${WHITE}" stroke-width="9"/><line x1="-30" y1="30" x2="10" y2="30" stroke="${WHITE}" stroke-width="9"/>`:`<rect x="-55" y="-55" width="110" height="110" rx="20" fill="none" stroke="${WHITE}" stroke-width="9"/><path d="M-15,-25 L25,0 L-15,25 Z" fill="${WHITE}"/>`;
   return `<g transform="translate(${x},760) scale(${k})" opacity="${t>T.nur?1-cl((t-T.nur)/0.3)*0.7:1}">${inner}${xmark(0,0,70,1)}${txt(0,120,lbl,40,'#999',800)}</g>`};
  g+=ic(330,T.kein1,'FEED','feed')+ic(750,T.kein2,'VIDEO','vid');
  if(t>T.nur){const k=eo((t-T.nur)/0.4);g=`<ellipse cx="560" cy="1050" rx="${330*k}" ry="${420*k}" fill="#fff" opacity="0.05"/>`+g+pill(540,1560-60,'NUR ER.',WHITE,'#000',56,k)}
  s+=`<g opacity="${o}">${g}</g>`;}
 // S4 head gets loud
 if(t>T.und1-0.1&&t<T.der+0.1){const o=env(t,T.und1-0.05,T.der+0.05,0.2,0.2);let g='';const lv=eio((t-T.und1)/(T.der-T.und1));
  let inner='';for(let i=0;i<14;i++){const a=i*0.9+t*3,r=40+90*((i*37)%10)/10;inner+=`<path d="M${540+r*Math.cos(a)},${900+r*Math.sin(a)} q${40*Math.cos(a+1)},${40*Math.sin(a+1)} ${70*Math.cos(a+2)},${50*Math.sin(a+2)}" stroke="${RED}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${cl(lv*14-i)}"/>`}
  const j=t>T.laut?Math.sin(t*50)*6:0;g+=head(540+j,900,230,WHITE,inner);
  for(let i=0;i<3;i++){const r=270+i*60+((t*120)%60);g+=`<circle cx="540" cy="900" r="${r}" fill="none" stroke="${RED}" stroke-width="6" opacity="${cl(lv*2-0.5)*(0.6-i*0.18)}"/>`}
  if(t>T.laut-0.1)g+=txt(540,1300,'LAUT.',140,RED,900,eo((t-T.laut+0.1)/0.2),'middle',8);
  s+=`<g opacity="${o}">${g}</g>`;}
 // S5 thumb searches, hand to pocket: empty
 if(t>T.der-0.1&&t<T.forscher+0.1){const o=env(t,T.der-0.05,T.forscher+0.05,0.2,0.2);let g='';
  if(t<T.hand){const tw=Math.max(0,Math.sin((t-T.der)*9))*30;g+=thumb(540,1060-tw,2.0,eo((t-T.der)/0.3))+txt(540,500,'DER DAUMEN SUCHT',64,RED,900,cl((t-T.daumen)/0.2),'middle',4);}
  else{const k=cl((t-T.hand)/0.5);const p=blend(P.stand,P.reach,0);p.lua=-10+30*k;p.lla=-60*k;const f=FIG.draw(Object.assign({x:540,y:1180,s:1.3},p));g+=f.svg;
   g+=`<g stroke="${GREY}" stroke-width="8" fill="none"><path d="M${f.hip[0]-70},${f.hip[1]+10} l0,80 q0,30 30,30 l50,0" /></g>`;
   if(t>T.leer-0.1){g+=pill(540,560,'LEER.',RED,'#fff',70,cl((t-T.leer+0.1)/0.2),0.8+0.2*eo((t-T.leer)/0.3));g+=`<g opacity="${cl((t-T.leer)/0.3)}">${txt(f.hip[0]-140,f.hip[1]+20,'?',90,RED,900)}</g>`}}
  s+=`<g opacity="${o}">${g}</g>`;}
 // S6 the experiment: room + 15 min clock
 if(t>T.forscher-0.1&&t<T.einziger+0.1){const o=env(t,T.forscher-0.05,T.einziger+0.05,0.2,0.2);let g='';
  g+=txt(540,470,'UNIVERSITY OF VIRGINIA',50,'#aaa',800,cl((t-T.forscher)/0.3),'middle',3);
  const k=eo((t-T.forscher-0.2)/0.5);g+=`<rect x="250" y="540" width="580" height="560" rx="20" fill="none" stroke="${WHITE}" stroke-width="10" opacity="${k}"/>`;
  g+=chair(560,930).replace('<g ','<g opacity="'+k+'" ')+`<g opacity="${k}">${FIG.draw(Object.assign({x:560,y:930,s:0.9},P.sit),{}).svg}</g>`;
  const m=t>T.minuten2-0.3?Math.min(15,Math.floor(15*cl((t-T.minuten2+0.3)/1.8))):0;g+=`<g opacity="${k}">${txt(540,1220,String(m).padStart(2,'0')+':00 MIN',110,m>=15?RED:WHITE,900,1,'middle',-2)}${txt(540,1300,'ALLEIN. NICHTS ZU TUN.',40,'#888',800,1,'middle',4)}</g>`;
  s+=`<g opacity="${o}">${g}</g>`;}
 // S7 the button
 if(t>T.einziger-0.1&&t<T.zwei+0.1){const o=env(t,T.einziger-0.05,T.zwei+0.05,0.2,0.2);let g=txt(540,520,'EINZIGER KNOPF:',70,WHITE,900,1,'middle',2);
  const press=t>T.strom2?Math.max(0,Math.sin((t-T.strom2)*12))*1:0;const k=eb((t-T.einziger)/0.35);
  g+=`<g transform="translate(540,960) scale(${k})"><ellipse cx="0" cy="${80}" rx="230" ry="60" fill="#222" stroke="${GREY}" stroke-width="8"/><ellipse cx="0" cy="${30+25*press}" rx="190" ry="55" fill="${RED}"/><rect x="-190" y="${30+25*press}" width="380" height="${50-25*press}" fill="${RED}"/><ellipse cx="0" cy="${30+25*press}" rx="190" ry="55" fill="#ff6b6f" opacity=".6"/></g>`;
  if(t>T.strom2-0.1){const fl=(Math.sin(t*30)>0)?1:0.4;g+=bolt(300,700,1.6,RED,fl)+bolt(780,700,1.6,RED,fl)+txt(540,1260,'STROMSCHLAG',100,RED,900,cl((t-T.strom2+0.1)/0.2),'middle',-2)}
  s+=`<g opacity="${o}">${g}</g>`;}
 // S8 2 of 3 men, 1 of 4 women
 if(t>T.zwei-0.1&&t<T.lieber+0.1){const o=env(t,T.zwei-0.05,T.lieber+0.05,0.2,0.2);let g='';
  for(let i=0;i<3;i++){const red=i<2&&t>T.zwei+0.3+i*0.25;g+=mini(340+i*200,860,0.62,red?RED:WHITE,cl((t-T.zwei+0.1-i*0.1)/0.2));if(red)g+=bolt(340+i*200+60,520,0.6,RED,1)}
  g+=txt(540,1020,'2 VON 3 MÄNNERN',64,RED,900,cl((t-T.zwei-0.4)/0.2),'middle',2);
  if(t>T.jede-0.1){for(let i=0;i<4;i++){const red=i===0&&t>T.jede+0.3;g+=mini(270+i*180,1370,0.55,red?RED:WHITE,cl((t-T.jede+0.1-i*0.08)/0.2));if(red)g+=bolt(270+50,1070,0.55,RED,1)}
   g+=txt(540,1520-20,'1 VON 4 FRAUEN',64,RED,900,cl((t-T.jede-0.4)/0.2),'middle',2)}
  g+=txt(540,480,'DRÜCKTEN DEN KNOPF',52,'#aaa',800,1,'middle',4);
  s+=`<g opacity="${o}">${g}</g>`;}
 // S9 lieber Schmerz als Stille
 if(t>T.lieber-0.1&&t<T.und2+0.1){const o=env(t,T.lieber-0.05,T.und2+0.05,0.15,0.2);let g=txt(540,840,'LIEBER SCHMERZ',120,RED,900,eo((t-T.lieber)/0.2),'middle',-4);
  if(t>T.stille-0.1)g+=txt(540,1000,'ALS STILLE.',120,WHITE,900,eo((t-T.stille+0.1)/0.2),'middle',-4);s+=`<g opacity="${o}">${g}</g>`;}
 // S10 und du?
 if(t>T.und2-0.1&&t<T.das1+0.1){const o=env(t,T.und2-0.05,T.das1+0.05,0.2,0.2);let g=txt(540,900,'UND DU?',190,WHITE,900,eo((t-T.und2)/0.25),'middle',-6);
  if(t>T.rechts-0.4)g+=arrowHUD(t,T.rechts-0.4);
  if(t>T.wie-0.1)g+=txt(540,1110,'WIE LANGE HÄLTST DU STILL?',56,GREEN,900,cl((t-T.wie+0.1)/0.2),'middle',2);
  s+=`<g opacity="${o}">${g}</g>`;}
 // S11 keine Langeweile – Entzug – geht vorbei
 if(t>T.das1-0.1&&t<S7e+0.1){const o=env(t,T.das1-0.05,S7e,0.2,0.3);let g='';
  g+=txt(540,560,'KEINE LANGEWEILE.',86,t>T.entzug?'#555':WHITE,900,1,'middle',-2);
  if(t>T.entzug-0.1){g+=txt(540,800,'ENTZUG.',170,RED,900,eo((t-T.entzug+0.1)/0.2),'middle',-6)}
  if(t>T.und3-0.1){const k=eio((t-T.und3)/1.8);// withdrawal curve going down
   let d='M200,1050';for(let i=0;i<=40;i++){const x=200+680*i/40*k,y=1050+380*(1-Math.exp(-i/9))*1;d+=` L${x.toFixed(1)},${(1050+380*(1-Math.exp(-(i*k)/9))).toFixed(1)}`}
   g+=`<path d="${d}" fill="none" stroke="${GREEN}" stroke-width="14" stroke-linecap="round"/>`+txt(540,1520-20,'GEHT VORBEI.',80,GREEN,900,cl((t-T.vorbei+0.1)/0.2),'middle',4)}
  s+=`<g opacity="${o}">${g}</g>`;}
 return s;}
function post48(t){let s='';
 if(t<T.in+0.1){const o=env(t,T48+1.05,T.in+0.05,0.25,0.25);s+=`<g opacity="${o}">${crowd(t,T48+1.6,T.dunicht,'DU NICHT.')}</g>`}
 if(t>T.in-0.1&&t<T.morgen+0.1){const o=env(t,T.in-0.05,T.morgen+0.05,0.25,0.25);let g='';
  // night window + moon
  g+=`<rect x="640" y="420" width="260" height="300" rx="10" fill="#05070d" stroke="${GREY}" stroke-width="8"/><circle cx="790" cy="520" r="45" fill="#ddd"/><circle cx="770" cy="505" r="45" fill="#05070d"/>`;
  g+=txt(300,560,'NACHT 3',56,'#888',900,1,'middle',6);
  const sit=t>T.er2;const k=cl((t-T.er2)/0.6);
  const p=sit?blend(P.lie,P.sit,k):P.lie;const f=FIG.draw(Object.assign({x:sit?540:600,y:1180,s:1.1},p),{});g+=`<line x1="220" y1="1240" x2="860" y2="1240" stroke="${GREY}" stroke-width="10" stroke-linecap="round"/>`+f.svg;
  if(t>T.er1-0.1&&t<T.er2+0.3)g+=`<g opacity="${cl((t-T.er1+0.1)/0.2)*(1-cl((t-T.er2)/0.3))}">${phone(300,900,2,'#222',0)}${xmark(300,900,90,1)}</g>`;
  if(t>T.er2){const kk=eb((t-T.stift+0.3)/0.4);g+=`<g transform="translate(${f.lh[0]},${f.lh[1]-20}) rotate(-35) scale(${kk*1.6})"><rect x="-8" y="-60" width="16" height="100" rx="3" fill="${GREEN}"/><path d="M-8,40 L0,58 L8,40 Z" fill="${WHITE}"/></g>`;
   if(t>T.stift)g+=`<circle cx="${f.lh[0]}" cy="${f.lh[1]}" r="${120+20*Math.sin(t*6)}" fill="${GREEN}" opacity="0.12"/>`+pill(540,1470,'EIN STIFT.',GREEN,'#000',60,cl((t-T.stift)/0.2))}
  s+=`<g opacity="${o}">${g}</g>`;}
 if(t>T.morgen-0.1){const o=cl((t-T.morgen+0.05)/0.25);let g='';const pulse=0.5+0.5*Math.sin(t*6);
  g+=txt(540,420,'MORGEN',60,'#888',900,1,'middle',10)+dayTrack(4,1,pulse);
  const f=FIG.draw(Object.assign({x:420,y:1150,s:1.15},P.stand,{headTilt:-15,lua:-60,lla:-60}));g+=f.svg;
  g+=`<g transform="translate(720,960) rotate(6)"><rect x="-130" y="-170" width="260" height="340" rx="10" fill="#0c0c0c" stroke="${WHITE}" stroke-width="8"/>`;for(let i=0;i<5;i++){const w=cl((t-T.was-i*0.25)/0.3)*(160-((i*53)%60));g+=`<line x1="-90" y1="${-110+i*55}" x2="${-90+w}" y2="${-110+i*55}" stroke="#777" stroke-width="10" stroke-linecap="round"/>`}
  g+=txt(0,60,t>T.was?'?':'',200,GREEN,900,cl((t-T.was)/0.3))+`</g>`;
  if(t>T.folge-0.1)g+=pill(540,1380,'FOLGE BEN →',GREEN,'#000',62,cl((t-T.folge+0.1)/0.2),0.85+0.15*eo((t-T.folge+0.1)/0.3));
  s+=`<g opacity="${o}">${g}</g>`;}
 return s;}
