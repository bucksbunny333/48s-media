// Ben-Akte 02 – Jeder Vierte (DAK/DZSKJ Mediensucht-Studie)
let CFG;
function initCues(){
 Object.assign(T,{bist:cue('Bist'),ben:cue('Ben',1),griff:cue('Griff.'),nur:cue('Nur'),ein1:cue('Ein',1),noch1:cue('Noch'),dann:cue('Dann'),dunkel:cue('dunkel'),die1:cue('Die',1),dak:cue('DAK'),uni:cue('Uniklinik'),y19a:cue('2019',1),tausend:cue('tausend'),
  erg:cue('Ergebnis:'),ein2:cue('Ein',2),fast:cue('Fast'),abh:cue('abhängig.'),und1:cue('Und',1),schultag:cue('Schultag:'),h150:cue('hundertfünfzig'),y19b:cue('2019',2),h120:cue('hundertzwanzig.'),zwei:cue('Zweieinhalb'),jeden:cue('Jeden'),mehr:cue('Mehr'),mathe:cue('Mathe.'),
  und2:cue('Und',2),rechts:cue('rechts.'),jede:cue('Jede'),die2:cue('Die',2),wofuer:cue('wofür?'),aEnd:cueEnd('wofür?'),
  das:cue('Das'),aufh:cue('aufhören.'),ben2:cue('Ben',2),aufh2:cue('aufgehört.'),ob:cue('Ob'),morgen:cue('morgen'),folge:cue('Folge')});
 CFG={capStart:T.ben,
  HL:{'vierte':RED,'viertel':RED,'problematisch':RED,'griff':WHITE,'dunkel':RED,'dak':WHITE,'hamburg':WHITE,'abhängig':RED,'hundertfünfzig':RED,'hundertzwanzig':WHITE,'zweieinhalb':RED,'mathe':WHITE,'du':GREEN,'rechts':GREEN,'wofür':GREEN,'da':GREEN,'aufhören':GREEN,'aufgehört':GREEN,'achtzehn':GREEN,'folge':GREEN},
  src:[[T.die1,T.und2,'Quelle: DAK-Gesundheit & DZSKJ/UKE Hamburg, Längsschnittstudie Mediensucht (2025)']],
  head:[[T.ben,'01 · BEN'],[T.die1,'02 · DIE STUDIE'],[T.und1,'03 · DEIN SCHULTAG'],[T.und2,'04 · UND DU?'],[T48+1,''],[T.folge,'']]};
}
window.SFXC=()=>[[T.bist,'boom'],[T.ben,'whoosh'],[T.ein1,'pop'],[T.noch1,'pop'],[T.dunkel,'boom'],[T.die1,'whoosh'],[T.tausend,'pop'],[T.erg,'whoosh'],[T.ein2,'buzz'],[T.fast,'boom'],[T.und1,'whoosh'],[T.h150,'boom'],[T.h120,'pop'],[T.zwei,'boom'],[T.mehr,'whoosh'],[T.und2,'whoosh'],[T.rechts,'pop'],[T.jede,'pop'],[T.wofuer,'boom'],[T.aufh,'ding'],[T.ben2,'whoosh'],[T.morgen,'boom'],[T.folge,'pop']];
function house(x,y,sc,col,op=1){return `<g transform="translate(${x},${y}) scale(${sc})" opacity="${op}" fill="none" stroke="${col}" stroke-width="6" stroke-linejoin="round"><path d="M-20,0 L-20,22 L20,22 L20,0 M-26,4 L0,-20 L26,4"/></g>`}
function scenes(t){let s='';
 // S1 HOOK frame 0: JEDER VIERTE + 4 figures
 if(t<T.ben+0.1){const o=cl((T.ben+0.05-t)/0.25);let g='';
  g+=txt(540,500,'JEDER',120,WHITE,900,1,'middle',-3)+txt(540,680,'VIERTE.',190,RED,900,1,'middle',-8);
  for(let i=0;i<4;i++){const red=i===3;const bob=red?Math.sin(t*8)*8:0;g+=mini(270+i*180,1080+bob,0.7,red?RED:WHITE,1,red?P.phone:P.stand);if(red)g+=phone(270+i*180-60,880+bob,0.6,RED,1)}
  g+=txt(540,1320,'BIST DU EINER DAVON?',76,WHITE,900,t>T.bist?1:0.85,'middle',-1);
  s+=`<g opacity="${o}">${g}</g>`;}
 // S2 Ben in bed, sun -> dark
 if(t>T.ben-0.1&&t<T.die1+0.1){const o=env(t,T.ben-0.05,T.die1+0.05,0.2,0.2);let g='';
  const dk=eio((t-T.dann)/0.8);const sky=`rgb(${Math.round(70*(1-dk))},${Math.round(90*(1-dk))},${Math.round(130*(1-dk)+13*dk)})`;
  g+=`<rect x="620" y="440" width="300" height="300" rx="10" fill="${sky}" stroke="${GREY}" stroke-width="8"/>`;
  g+=`<circle cx="770" cy="${560+150*dk}" r="50" fill="#ffd36b" opacity="${1-dk}"/><g opacity="${dk}"><circle cx="800" cy="530" r="40" fill="#ddd"/><circle cx="782" cy="515" r="40" fill="${sky}"/></g>`;
  g+=`<line x1="180" y1="1200" x2="900" y2="1200" stroke="${GREY}" stroke-width="10" stroke-linecap="round"/><line x1="180" y1="1200" x2="180" y2="1120" stroke="${GREY}" stroke-width="10" stroke-linecap="round"/>`;
  const f=FIG.draw(Object.assign({x:560,y:1160,s:1.0},P.liePhone));g+=f.svg+phone(f.lh[0],f.lh[1]-10,1.1,RED,1);
  if(t>T.griff-0.2&&t<T.ein1)g+=pill(330,560,'IM GRIFF.',WHITE,'#000',48,cl((t-T.griff+0.2)/0.2));
  // stacking videos
  const vids=[[T.ein1,0],[T.noch1,1]];for(let n=2;n<8;n++)vids.push([T.noch1+0.18*n,n]);
  vids.forEach(([tt,n])=>{if(t>tt){const k=eb((t-tt)/0.25);g+=`<g transform="translate(${260+((n*97)%5)*20},${820-n*42}) scale(${k})" opacity="${t>T.dann?1-dk*0.6:1}"><rect x="-70" y="-40" width="140" height="80" rx="12" fill="#111" stroke="${WHITE}" stroke-width="6"/><path d="M-12,-18 L18,0 L-12,18 Z" fill="${RED}"/></g>`}});
  if(t>T.dunkel-0.1)g+=txt(540,1340,'DUNKEL.',110,RED,900,cl((t-T.dunkel+0.1)/0.3),'middle',4);
  s+=`<g opacity="${o}">${g}</g>`;}
 // S3 study: houses grid -> 1000 families
 if(t>T.die1-0.1&&t<T.erg+0.1){const o=env(t,T.die1-0.05,T.erg+0.05,0.2,0.2);let g='';
  g+=txt(540,480,'DAK × UNIKLINIK HAMBURG',56,WHITE,900,cl((t-T.dak)/0.3),'middle',2);
  if(t>T.y19a-0.1)g+=pill(540,590,'SEIT 2019 · 7 BEFRAGUNGEN',GREY,'#fff',40,cl((t-T.y19a+0.1)/0.2));
  const n=Math.floor(100*eio((t-T.tausend+0.4)/1.2));for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10);g+=house(180+c*80,720+r*56,0.9,WHITE,i<n?1:0.08)}
  g+=txt(540,1330,(t>T.tausend-0.4?Math.round(n*10):0)+' FAMILIEN',80,WHITE,900,1,'middle',-1);
  s+=`<g opacity="${o}">${g}</g>`;}
 // S4 result: 25% problematic, ~5% addicted
 if(t>T.erg-0.1&&t<T.und1+0.1){const o=env(t,T.erg-0.05,T.und1+0.05,0.2,0.2);let g=txt(540,480,'10- BIS 17-JÄHRIGE',56,'#aaa',800,1,'middle',3);
  for(let i=0;i<20;i++){const c=i%5,r=Math.floor(i/5);const prob=[1,7,13,19,4].includes(i);const add=i===13;const col=t>T.fast&&add?'#ff2d2d':(t>T.ein2&&prob?RED:WHITE);
   g+=mini(220+c*160,800+r*160,0.32,col,cl((t-T.erg-i*0.02)/0.2));
   if(t>T.fast&&add)g+=`<circle cx="${220+c*160}" cy="${800+r*160-95}" r="${80+6*Math.sin(t*9)}" fill="none" stroke="#ff2d2d" stroke-width="7"/>`;}
  if(t>T.ein2-0.1)g+=pill(320,600,'25 % PROBLEMATISCH',RED,'#fff',40,cl((t-T.ein2+0.1)/0.2));
  if(t>T.fast-0.1)g+=pill(780,600,'4,7 % ABHÄNGIG',WHITE,'#000',40,cl((t-T.fast+0.1)/0.2));
  s+=`<g opacity="${o}">${g}</g>`;}
 // S5 school day minutes
 if(t>T.und1-0.1&&t<T.und2+0.1){const o=env(t,T.und1-0.05,T.und2+0.05,0.2,0.2);let g=txt(540,480,'SOCIAL MEDIA PRO SCHULTAG',52,'#aaa',800,cl((t-T.und1)/0.3),'middle',3);
  const bar=(y,min,lbl,col,tt)=>{const k=eio((t-tt)/0.8);const w=540*min/150*k;return txt(180,y-20,lbl,44,col,900,cl((t-tt+0.1)/0.2),'start',2)+`<rect x="180" y="${y}" width="${w}" height="80" rx="14" fill="${col}"/>`+txt(200+w,y+60,Math.round(min*k)+' MIN',52,col,900,k,'start')};
  if(t>T.h150-0.1)g+=bar(640,150,'HEUTE',RED,T.h150);
  if(t>T.y19b-0.1)g+=bar(830,120,'2019','#999',T.y19b);
  if(t>T.mehr-0.1)g+=bar(1020,90,'DOPPELSTUNDE MATHE',WHITE,T.mehr);
  if(t>T.zwei-0.1)g+=txt(540,1300,'2,5 STUNDEN.',110,RED,900,eo((t-T.zwei+0.1)/0.2)*(t>T.mehr?0.35:1),'middle',-3);
  s+=`<g opacity="${o}">${g}</g>`;}
 // S6 und du? / wofür?
 if(t>T.und2-0.1&&t<S7e+0.1){const o=env(t,T.und2-0.05,S7e,0.2,0.3);let g='';
  if(t<T.die2-0.05){g+=txt(540,900,'UND DU?',190,WHITE,900,eo((t-T.und2)/0.25),'middle',-6);if(t>T.rechts-0.4)g+=arrowHUD(t,T.rechts-0.4);if(t>T.jede-0.1)g+=txt(540,1090,'JEDE SEKUNDE ZÄHLT MIT.',60,WHITE,900,cl((t-T.jede+0.1)/0.2),'middle',2);}
  else{g+=txt(540,700,'DIE FRAGE IST NUR:',64,'#aaa',900,1,'middle',3);if(t>T.wofuer-0.1){const k=eb((t-T.wofuer+0.1)/0.35);g+=`<g transform="translate(540,960) scale(${k})">${txt(0,60,'WOFÜR?',210,GREEN,900,1,'middle',-8)}</g>`}}
  s+=`<g opacity="${o}">${g}</g>`;}
 return s;}
function post48(t){let s='';
 if(t<T.ben2+0.1){const o=env(t,T48+1.05,T.ben2+0.05,0.25,0.25);let g=txt(540,720,'DAS HEISST:',80,'#aaa',900,cl((t-T.das)/0.3),'middle',4);
  if(t>T.aufh-0.4){const k=eb((t-T.aufh+0.4)/0.4);g+=`<g transform="translate(540,960) scale(${k})">${txt(0,0,'DU KANNST',110,WHITE,900,1,'middle',-3)}${txt(0,150,'AUFHÖREN.',150,GREEN,900,1,'middle',-5)}</g>`}
  s+=`<g opacity="${o}">${g}</g>`;}
 if(t>T.ben2-0.1){const o=cl((t-T.ben2+0.05)/0.25);let g='';const pulse=0.5+0.5*Math.sin(t*6);
  g+=dayTrack(3,1,pulse,560);
  const f=FIG.draw(Object.assign({x:470,y:1150,s:1.15},P.stand,{headTilt:-5}));g+=f.svg;
  g+=`<g opacity="${cl((t-T.aufh2)/0.3)}">${phone(760,950,2,'#222',0)}${xmark(760,950,90,1)}</g>`;
  if(t>T.ob-0.2){const k=eb((t-T.ob+0.2)/0.35);g+=`<g transform="translate(${f.head[0]+130},${f.head[1]-60}) scale(${k})">${txt(0,40,'?',150,GREEN,900)}</g>`}
  if(t>T.morgen-0.1&&t<T.folge-0.1)g+=pill(540,1380,'MORGEN 18:00 · FOLGE 4',GREEN,'#000',50,cl((t-T.morgen+0.1)/0.2));
  if(t>T.folge-0.1)g+=pill(540,1380,'FOLGE BEN →',GREEN,'#000',62,cl((t-T.folge+0.1)/0.2),0.85+0.15*eo((t-T.folge+0.1)/0.3));
  s+=`<g opacity="${o}">${g}</g>`;}
 return s;}
