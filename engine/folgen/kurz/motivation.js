// Ben vs. Ben: Motivation vs. Disziplin – Kurzformat ohne Stimme (E1), 20 s
window.DUR=20;
const D0=1.2, D1=15.0, DAYS=30;              // Tage laufen von D0 bis D1
const dayAt=t=>Math.max(1,Math.min(DAYS,1+Math.floor((t-D0)/((D1-D0)/DAYS))));
const SPIKES=[7,19];                           // Tage, an denen links die Motivation kommt
const GROUND=1450;
window.SFXC=()=>{const c=[[0,'boom']];for(let d=2;d<=DAYS;d++)c.push([D0+(d-1)*(D1-D0)/DAYS,'tick']);SPIKES.forEach(d=>c.push([D0+(d-1)*(D1-D0)/DAYS,'whoosh']));c.push([15.4,'boom'],[17.2,'ding']);return c;};
function brickTower(x,n,op=1){let g='';for(let i=0;i<n;i++){const y=GROUND-24-i*20;g+=`<rect x="${x-60+(i%2)*8}" y="${y}" width="112" height="17" rx="4" fill="${GREEN}" opacity="${(0.55+0.45*(i===n-1))*op}"/>`;}return g;}
window.render=function(t){let s='';
 const day=dayAt(t), fin=t>15.2;
 // Titel – ab Frame 0
 const tOp=fin?1-cl((t-15.2)/0.3):1;
 s+=`<g opacity="${tOp}">${txt(540,330,'MOTIVATION',100,'#8a8a8a',900,1,'middle',-2)}${txt(540,420,'vs.',56,'#555',800)}${txt(540,530,'DISZIPLIN',112,GREEN,900,1,'middle',-2)}`;
 // Tageszähler
 s+=txt(540,670,'TAG '+day,64,WHITE,900,1,'middle',4);
 const pr=(day-1)/(DAYS-1);s+=`<rect x="290" y="700" width="500" height="10" rx="5" fill="#2a2a2a"/><rect x="290" y="700" width="${500*pr}" height="10" rx="5" fill="${WHITE}"/>`;
 // Boden
 s+=`<line x1="80" y1="${GROUND}" x2="1000" y2="${GROUND}" stroke="#2c2c2c" stroke-width="6"/>`;
 // LINKS: wartet auf Motivation
 let spike=0;for(const d of SPIKES){const td=D0+(d-1)*(D1-D0)/DAYS;spike=Math.max(spike,env(t,td,td+1.1,0.15,0.5));}
 s+=sofa(110,GROUND-40,300);
 const lp=blend(P.sit,P.cheer,spike);const ly=GROUND-40-(1-spike)*0+spike*(-0);
 s+=fig(lp,260,spike>0.5?GROUND-220:GROUND-165,1.25,spike>0.3?WHITE:'#9a9a9a',true);
 if(spike>0.05)s+=txt(260,1000,'JETZT ABER!',46,WHITE,900,spike,'middle',2);
 const leftN=Math.min(2,SPIKES.filter(d=>day>=d).length);
 s+=brickTower(470,leftN,1)+'';
 s+=txt(260,GROUND+90,'WARTET AUF',36,'#8a8a8a',800,1,'middle',3)+txt(260,GROUND+140,'MOTIVATION',42,'#8a8a8a',900,1,'middle',2);
 // RECHTS: fängt einfach an
 const ph=((Math.max(0,t-D0+0.5))/((D1-D0)/DAYS))%1;const work=t<D1+0.3;
 const rp=work?(ph<0.5?blend(P.stand,P.reach,ph*2):blend(P.reach,P.stand,(ph-0.5)*2)):P.cheer;
 const n=Math.min(day,DAYS);
 s+=brickTower(900,n,1);
 s+=fig(rp,730,GROUND-220,1.25,GREEN,true);
 s+=txt(780,GROUND+90,'FÄNGT EINFACH',36,GREEN,800,1,'middle',3)+txt(780,GROUND+140,'AN',42,GREEN,900,1,'middle',2);
 // Zähler
 s+=txt(260,GROUND+230,leftN+' / 30',58,'#8a8a8a',900)+txt(780,GROUND+230,n+' / 30',58,GREEN,900);
 s+='</g>';
 // Finale
 if(t>15.2){const k1=eo((t-15.4)/0.4),k2=eo((t-17.2)/0.4);
  s+=`<g>${txt(540,700,'MOTIVATION',120,'#8a8a8a',900,k1,'middle',-3)}${txt(540,840,'KOMMT UND GEHT.',90,'#8a8a8a',900,k1,'middle',-2)}`;
  s+=`<g transform="translate(540,1130) scale(${0.9+0.1*eb((t-17.2)/0.4)})">${txt(0,0,'DISZIPLIN',150,GREEN,900,k2,'middle',-4)}${txt(0,130,'BLEIBT.',120,GREEN,900,k2,'middle',-3)}</g>`;
  if(t>18.4)s+=pill(540,1500,'WELCHER BEN BIST DU?',WHITE,'#000',50,cl((t-18.4)/0.25));
  s+='</g>';}
 $('stage').innerHTML=s;
 $('tag').textContent='BEN vs. BEN';
 $('flash').style.opacity=t>17.2?Math.max(0,0.25-(t-17.2)*1.2):0;
 $('fade').style.opacity=t>DUR-0.4?cl((t-DUR+0.4)/0.4):0;
};
render(0);
