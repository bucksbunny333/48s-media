// gemeinsame Bausteine 27.11. (Frage + Optionen in Frame 0, Tipp-Pille, Speicher-Karte)
// Optionskarten: unterhalb y 955 → zentriert x 465, Gesamtbreite ≤ 800
function optCards(t,items,y,o=1,mode={}){if(o<=0)return'';const w=250,g=25,x0=465-(3*w+2*g)/2;let s=`<g opacity="${o}">`;
 const spin=mode.spin?Math.floor(t*6)%3:-1;
 items.forEach((it,i)=>{const x=x0+i*(w+g);const hl=(mode.hl===i)||(spin===i);const win=mode.win===i;const dim=mode.win!=null&&!win;
  const pop=mode.pop!=null?eb(cl((t-mode.pop-i*0.08)/0.35)):1;const sc=(hl?1.06:1)*(0.6+0.4*pop);
  const col=win?GREEN:(hl?YEL:'#2a3444');
  s+=`<g transform="translate(${x+w/2},${y}) scale(${sc})" opacity="${dim?0.35:1}"><rect x="${-w/2}" y="-95" width="${w}" height="190" rx="26" fill="${win?'#0f2a17':'#0b0f16'}" stroke="${col}" stroke-width="${hl||win?9:5}"/>`+
   `<circle cx="0" cy="-52" r="30" fill="${col}"/>`+txt(0,-41,'ABC'[i],34,(hl||win)?'#05070c':WHITE,900)+
   txt(0,20,it[0],it[0].length>9?30:36,WHITE,900)+(it[1]?txt(0,62,it[1],24,'#cfd6e6',800):'')+(win?txt(w/2-30,-62,'✓',46,GREEN,900):'')+'</g>';});
 return s+'</g>';}
function tipPill(t,a,b,s='TIPP IN DIE KOMMENTARE: A, B ODER C?'){return cpill(t,a,b,s);}
function pin(x,y,sc,col=RED){return `<g transform="translate(${x},${y}) scale(${sc}) rotate(25)"><circle cx="0" cy="-30" r="26" fill="${col}"/><rect x="-6" y="-8" width="12" height="20" fill="${col}"/><path d="M-3,12 L0,52 L3,12Z" fill="#cfd6e6"/></g>`}
function saveCard(t,t0,title,steps){const o=env(t,t0,99,0.2,0.2);if(o<=0)return'';let s=`<g opacity="${o}"><rect width="1080" height="1920" fill="#05070c" opacity=".93"/>`;
 s+=pin(150,330,1.1)+txt(560,345,'SPEICHERN',92,WHITE,900,1,'middle',3)+txt(540,430,title,38,YEL,900);
 steps.forEach((st,i)=>{const q=eb(cl((t-t0-0.15-i*0.22)/0.35));const y=600+i*200;s+=`<g opacity="${cl(q)}" transform="translate(${-60*(1-q)},0)"><rect x="65" y="${y-80}" width="800" height="150" rx="26" fill="#0b0f16" stroke="#2a3444" stroke-width="4"/><circle cx="145" cy="${y-5}" r="46" fill="${GREEN}"/>`+txt(145,y+12,String(i+1),50,'#05070c',900)+txt(215,y+12,st,st.length>20?38:44,WHITE,900,1,'start')+'</g>';});
 s+=pill(465,1300,'JETZT SPEICHERN',YEL,'#111',46,cl((t-t0-0.8)/0.3),1+0.04*Math.sin(t*8));
 return s+'</g>';}
function shakeT(t,a,b,amp=10){if(t<a||t>b)return '';const k=1-(t-a)/(b-a);return `translate(${(Math.sin(t*90)*amp*k).toFixed(1)},${(Math.cos(t*77)*amp*k).toFixed(1)})`}
function bulb(x,y,r,on,o=1){if(o<=0)return'';return `<g opacity="${o}" transform="translate(${x},${y})">${on>0?`<circle r="${r*1.9}" fill="${YEL}" opacity="${0.18*on}"/>`:''}<circle cy="${-r*0.2}" r="${r}" fill="${on>0?YEL:'#2a3444'}"/><rect x="${-r*0.45}" y="${r*0.6}" width="${r*0.9}" height="${r*0.55}" rx="${r*0.15}" fill="#8a93a3"/></g>`}
function flashO(t,a,d=0.35){return t>=a&&t<a+d?(1-(t-a)/d)*0.85:0}
