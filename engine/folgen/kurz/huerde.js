// Ben vs. die Hürde – Kurzformat ohne Stimme (E1), 22 s
window.DUR=20;
const GROUND=1420, HX=600, HB=1250;            // Hürde bei x=600, Stange auf y=HB
// Versuche: [start, dauer]; 1-9 Fehlschläge (werden schneller), 10 = Erfolg
const A=[];{let t=0.0;const d=[1.55,1.35,1.2,1.1,1.0,0.85,0.75,0.65,0.6];for(const x of d){A.push([t,x]);t+=x;}A.push([t+0.25,2.6]);}
const T10=A[9][0];                              // ~9.3 s
const LESS={2:'ZU FRÜH',4:'ZU LANGSAM',6:'FALSCHER FUSS',8:'NICHT HINGESCHAUT'};
window.SFXC=()=>{const c=[[0,'boom']];A.slice(0,9).forEach(([a,d])=>{c.push([a+d*0.55,'buzz'])});c.push([T10+1.15,'whoosh'],[T10+1.7,'ding'],[T10+1.7,'boom'],[T10+3.3,'pop'],[T10+5.6,'pop'],[T10+7.4,'pop']);return c;};
function hurdle(op=1){return `<g opacity="${op}" stroke="${WHITE}" stroke-width="10" stroke-linecap="round"><line x1="${HX-70}" y1="${GROUND}" x2="${HX-70}" y2="${HB}"/><line x1="${HX+70}" y1="${GROUND}" x2="${HX+70}" y2="${HB}"/><line x1="${HX-90}" y1="${HB}" x2="${HX+90}" y2="${HB}" stroke="${RED}" stroke-width="16"/></g>`}
function runner(t){ // liefert svg für Ben im aktuellen Versuch
 let i=A.findIndex(([a,d])=>t>=a&&t<a+d);if(i<0)i=t<A[0][0]?0:9;
 const [a,d]=A[i];const k=cl((t-a)/d);const win=i===9;
 const run=win?0.42:0.45, jump=win?0.62:0.58;   // Phasenanteile
 let x,y,pose,col=win&&k>0.5?GREEN:WHITE;
 if(k<run){const q=k/run;x=180+(HX-140-180)*q;y=GROUND-220;pose=(Math.floor(t*9)%2)?P.walkA:P.walkB;}
 else if(k<jump||win){const q=cl((k-run)/((win?0.75:jump)-run));
  if(win){x=HX-140+(340)*q;y=GROUND-220-200*Math.sin(Math.PI*q);pose=q<1?blend(P.walkA,P.reach,Math.sin(Math.PI*q)):(k>0.8?P.cheer:P.stand);if(k>0.75){x=HX+200;y=GROUND-220;pose=P.cheer;}}
  else{x=HX-140+120*q;y=GROUND-220-120*Math.sin(Math.PI*q*0.8);pose=blend(P.walkA,P.reach,q);}}
 else{const q=cl((k-jump)/0.12);x=HX+150;y=GROUND-30;pose=blend(P.reach,P.lie,q);if(q<1){y=GROUND-220+190*eio(q);x=HX-20+170*q;}}
 return {svg:fig(pose,x,y,1.2,col,true),i,k,win};
}
window.render=function(t){let s='';
 const R=runner(t);const fails=Math.min(9,A.filter(([a,d],j)=>j<9&&t>=a+d*0.6).length);
 const end=t>T10+3.0;
 if(!end||t<T10+3.4){const o=end?1-cl((t-T10-3.0)/0.4):1;
  s+=`<g opacity="${o}">`;
  // Kopf
  s+=txt(540,330,R.win?'VERSUCH 10':'VERSUCH '+(R.i+1),110,R.win?GREEN:WHITE,900,1,'middle',-2);
  // Fehler-Leiste
  for(let j=0;j<9;j++){const x=540-4*92+j*92;const on=j<fails;s+=`<rect x="${x-34}" y="470" width="68" height="68" rx="14" fill="none" stroke="${on?RED:'#333'}" stroke-width="5"/>`+(on?xmark(x,504,18,1):'');}
  s+=txt(540,610,'FAILS: '+fails,48,fails?RED:'#555',900,1,'middle',4);
  if(t<2.6){const ho=1-cl((t-2.2)/0.4);s+=txt(540,760,'9-MAL GEFALLEN.',104,RED,900,ho*eo(t/0.2+1),'middle',-3)+txt(540,860,'VOR ALLEN.',80,WHITE,900,ho,'middle',-2);}
  // Lektion
  const fi=R.i+1;if(!R.win&&LESS[fi]&&R.k>0.6)s+=pill(540,780,LESS[fi],'#1f1f1f',WHITE,50,cl((R.k-0.6)/0.12));
  if(!R.win&&fi===5&&R.k>0.6){for(let j=0;j<5;j++)s+=fig(P.stand,820+j*45,GROUND-90,0.42,GREY,true,0.9)+txt(830+j*45,GROUND-260-((j%2)*20),'HA',30,GREY,900,1);}
  s+=`<line x1="80" y1="${GROUND}" x2="1000" y2="${GROUND}" stroke="#2c2c2c" stroke-width="6"/>`+hurdle()+R.svg;
  if(R.win&&R.k>0.66)s+=pill(540,1600,'GESCHAFFT',GREEN,'#000',64,cl((R.k-0.66)/0.1),1+0.04*Math.sin(t*10));
  s+='</g>';}
 if(end){const k1=eo((t-T10-3.3)/0.4),k2=eo((t-T10-5.6)/0.4);
  s+=txt(540,640,'9 STÜRZE.',140,RED,900,k1,'middle',-4)+txt(540,800,'9 LEKTIONEN.',120,GREEN,900,k1,'middle',-4);
  s+=txt(540,1080,'WIE OFT HAST DU\'S',80,WHITE,900,k2,'middle',-2)+txt(540,1180,'VERSUCHT,',80,WHITE,900,k2,'middle',-2)+txt(540,1280,'BEVOR DU AUFGEHÖRT HAST?',62,WHITE,900,k2,'middle',-1);
  if(t>T10+7.4)s+=pill(540,1520,'SCHREIB DEINE ZAHL',GREEN,'#000',56,cl((t-T10-7.4)/0.25));}
 $('stage').innerHTML=s;
 $('tag').textContent='BEN vs. DIE HÜRDE';
 $('flash').style.opacity=t>T10+1.7?Math.max(0,0.3-(t-T10-1.7)*1.2):0;
 $('fade').style.opacity=t>DUR-0.4?cl((t-DUR+0.4)/0.4):0;
};
render(0);
