// Shared engine for 48s episodes. Per-video file defines: CFG={tag, HL, src:[[a,b,text]], head:[[t,text]], capStart}, initCues(), scenes(t)->svg, post48(t)->svg, SFXC (list)
const RED='#e5484d',GREEN='#30d158',WHITE='#f2f2f2',GREY='#5c5c5c';
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const eo=x=>1-Math.pow(1-cl(x),3), eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2}, eb=x=>{x=cl(x);const c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const env=(t,a,b,fi=.25,fo=.25)=>cl((t-a)/fi)*cl((b-t)/fo);
const $=id=>document.getElementById(id);
const blend=(a,b,k)=>FIG.mix(a,b,eio(k));
function cue(word,n=1){let c=0;for(const w of W){if(w[0]===word){c++;if(c===n)return w[1];}}throw new Error('cue '+word+' '+n)}
function cueEnd(word,n=1){let c=0;for(const w of W){if(w[0]===word){c++;if(c===n)return w[2];}}throw new Error('cueEnd '+word)}
function txt(x,y,s,size,col,w=800,op=1,anchor='middle',ls=0){return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Inter" font-weight="${w}" font-size="${size}" fill="${col}" opacity="${op}" letter-spacing="${ls}">${s}</text>`}
function phone(x,y,sc,col,glow,op=1,rot=0){let g='';if(glow>0)g=`<circle cx="${x}" cy="${y}" r="${90*sc}" fill="${col}" opacity="${0.18*glow}"/>`;return g+`<g transform="translate(${x},${y}) rotate(${rot}) scale(${sc})" opacity="${op}"><rect x="-24" y="-40" width="48" height="80" rx="9" fill="#111" stroke="${WHITE}" stroke-width="5"/><rect x="-17" y="-32" width="34" height="62" rx="4" fill="${col}"/></g>`}
function pill(x,y,s,bg,fg,size=52,op=1,sc=1){const w=s.length*size*0.62+70;return `<g opacity="${op}" transform="translate(${x},${y}) scale(${sc})"><rect x="${-w/2}" y="${-size*0.95}" width="${w}" height="${size*1.6}" rx="${size*0.8}" fill="${bg}"/>${txt(0,size*0.22,s,size,fg,900)}</g>`}
function desk(x,y,w){return `<g stroke="${WHITE}" stroke-width="10" stroke-linecap="round" fill="none"><line x1="${x}" y1="${y}" x2="${x+w}" y2="${y}"/><line x1="${x+30}" y1="${y}" x2="${x+30}" y2="${y+190}"/><line x1="${x+w-30}" y1="${y}" x2="${x+w-30}" y2="${y+190}"/></g>`}
function chair(x,y){return `<g stroke="${GREY}" stroke-width="9" stroke-linecap="round" fill="none"><line x1="${x-70}" y1="${y}" x2="${x+60}" y2="${y}"/><line x1="${x+60}" y1="${y}" x2="${x+60}" y2="${y-210}"/><line x1="${x-60}" y1="${y}" x2="${x-60}" y2="${y+170}"/><line x1="${x+55}" y1="${y}" x2="${x+55}" y2="${y+170}"/></g>`}
function sofa(x,y,w){return `<g stroke="${GREY}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M${x},${y} L${x+w},${y} M${x},${y} L${x},${y-90} Q${x},${y-120} ${x+30},${y-120} L${x+w-30},${y-120} Q${x+w},${y-120} ${x+w},${y-90} L${x+w},${y} M${x+20},${y} L${x+20},${y+60} M${x+w-20},${y} L${x+w-20},${y+60}"/><rect x="${x-40}" y="${y-70}" width="40" height="80" rx="16"/><rect x="${x+w}" y="${y-70}" width="40" height="80" rx="16"/></g>`}
function cross(x,y,r,op){return `<g stroke="${RED}" stroke-width="12" stroke-linecap="round" opacity="${op}"><line x1="${x-r}" y1="${y-r}" x2="${x+r}" y2="${y+r}"/></g>`}
function xmark(x,y,r,op){return `<g stroke="${RED}" stroke-width="12" stroke-linecap="round" opacity="${op}"><line x1="${x-r}" y1="${y-r}" x2="${x+r}" y2="${y+r}"/><line x1="${x+r}" y1="${y-r}" x2="${x-r}" y2="${y+r}"/></g>`}
function book(x,y,col){return `<g transform="translate(${x},${y})"><path d="M0,-40 L-70,-32 L-70,32 L0,40 Z M0,-40 L70,-32 L70,32 L0,40 Z" fill="#000" stroke="${col}" stroke-width="7" stroke-linejoin="round"/><line x1="0" y1="-40" x2="0" y2="40" stroke="${col}" stroke-width="5"/></g>`}
function head(x,y,r,col,inner){return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#000" stroke="${col}" stroke-width="12"/>${inner||''}</g>`}
function thumb(x,y,sc,op){return `<g transform="translate(${x},${y}) scale(${sc})" opacity="${op}" fill="none" stroke="${WHITE}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M-60,140 L-60,0 Q-60,-30 -30,-30 L-30,-150 Q-30,-185 0,-185 Q30,-185 30,-150 L30,-40 L90,-30 Q120,-25 118,10 L105,140 Z"/></g>`}
function bolt(x,y,sc,col,op=1){return `<g transform="translate(${x},${y}) scale(${sc})" opacity="${op}"><path d="M10,-60 L-25,8 L2,8 L-10,60 L28,-12 L2,-12 Z" fill="${col}" stroke="${col}" stroke-width="4" stroke-linejoin="round"/></g>`}
function mini(x,y,s,col,op=1,pose){return `<g opacity="${op}">${FIG.draw(Object.assign({x,y,s},pose||P.stand),{col}).svg}</g>`}
function dayTrack(day,op,pulse,y=560){let s='';const n=14,w=46,g=12,tot=n*w+(n-1)*g,x0=540-tot/2;for(let i=0;i<n;i++){const done=i<day-1,cur=i===day-1;s+=`<rect x="${x0+i*(w+g)}" y="${y}" width="${w}" height="${w}" rx="10" fill="${done?GREEN:(cur?`rgba(48,209,88,${0.25+0.5*pulse})`:'none')}" stroke="${done||cur?GREEN:'#444'}" stroke-width="5"/>`;}return `<g opacity="${op}">${txt(540,y-40,'TAG '+day+' / 14',54,WHITE,900)}${s}</g>`;}
function arrowHUD(t,t0){const k=eo((t-t0)/0.3),b=Math.sin(t*14)*10;return `<g opacity="${k}" stroke="${GREEN}" stroke-width="16" stroke-linecap="round" fill="none"><line x1="${600+b}" y1="${560-b}" x2="${880+b}" y2="${280-b}"/><path d="M${800+b},${270-b} L${885+b},${275-b} L${880+b},${360-b}"/></g>`}
function crowd(t,tLeave,tYou,label){let g='';const leave=eio((t-tLeave)/2.2);const cols=7,rows=4;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const i=r*cols+c,me=i===17;const x=200+c*113,y=640+r*190;
  const op=me?1:Math.max(0,1-leave*(1+((i*37)%10)/10));const col=me&&t>tYou?GREEN:(me?WHITE:GREY);
  if(me){const m=eio((t-tYou+0.6)/0.8);const mx=x+(540-x)*m,my=y+40+(1060-y-40)*m,ms=0.38+(1.15-0.38)*m;g+=FIG.draw(Object.assign({x:mx,y:my,s:ms},P.stand),{col}).svg;continue;}
  g+=`<g opacity="${op}" transform="translate(0,${-120*leave*((i*13)%7)/7})">${FIG.draw(Object.assign({x,y:y+40,s:0.38},P.stand),{col}).svg}</g>`;}
  if(t>tYou) g+=pill(540,1370,label,GREEN,'#000',60,cl((t-tYou)/0.2),0.85+0.15*eo((t-tYou)/0.3));return g;}
const T={};
initCues();
const S7e=T.aEnd+0.35;
window.render=function(t){
  let s=scenes(t);
  // suspense -> 48
  if(t>S7e-0.1&&t<T48+1.2){const o=env(t,S7e,T48+1.15,0.25,0.35);const v=Math.floor(t),green=t>=T48;const pop=green?1+0.15*Math.exp(-(t-T48)*6):1+0.03*Math.sin(t*14);
    s+=`<g opacity="${o}"><g transform="translate(540,960) scale(${pop})">${txt(0,150,String(Math.min(v,48)).padStart(2,'0'),460,green?GREEN:WHITE,900,1,'middle',-18)}</g>${green?txt(540,1200,'DU BIST NOCH DA.',64,GREEN,900,cl((t-T48)/0.25),'middle',4):txt(540,1200,'NICHT WEGWISCHEN.',44,'#777',800,1,'middle',6)}</g>`;}
  if(t>T48+1.0) s+=post48(t);
  $('stage').innerHTML=s;
  const v=Math.floor(t),green=t>=T48,col=green?GREEN:RED;
  $('hudnum').textContent=String(Math.min(v,99)).padStart(2,'0');$('hudnum').style.color=col;
  $('arc').setAttribute('stroke-dasharray',(Math.min(v,60)/60*251.3)+' 251.3');$('arc').setAttribute('stroke',col);
  const hz=(T.rechts&&t>T.rechts-0.4&&t<T.rechts+1.6)?1.35+0.08*Math.sin(t*14):1;$('hud').style.transform=`scale(${hz})`;
  $('hud').style.opacity=(t>S7e&&t<T48+1.2)?0.25:1;
  const inS=(t>S7e&&t<T48+1.2);
  $('tag').style.opacity=t<CFG.capStart||inS?0:1;
  let hd='';for(const h of CFG.head){if(t>=h[0])hd=h[1];}
  $('head').textContent=inS||t<CFG.capStart?'':hd;
  $('flash').style.opacity=green?Math.max(0,0.3-(t-T48)*1.3):0;
  let sr='';for(const q of CFG.src){if(t>q[0]-0.2&&t<q[1])sr=q[2];}$('src').textContent=sr;
  const G=window.__G||(window.__G=(()=>{const G=[];let cur=[];W.forEach((w,i)=>{cur.push(i);if(/[.?,:!]$/.test(w[0])||cur.length>=3){G.push(cur);cur=[]}});if(cur.length)G.push(cur);return G})());
  let gi=-1;for(let i=0;i<G.length;i++){const a=W[G[i][0]][1],b=W[G[i][G[i].length-1]][2];if(t>=a-0.05&&t<b+0.3)gi=i;}
  const cap=$('cap'); const hideCap=t<CFG.capStart||(t>S7e&&t<T48+0.05);
  if(gi<0||hideCap) cap.innerHTML=''; else cap.innerHTML=G[gi].map(i=>{const w=W[i],on=t>=w[1];const key=w[0].toLowerCase().replace(/[.,:!?]/g,'');const c=on?(CFG.HL[key]||WHITE):'#333';const sc=on?1+0.07*Math.exp(-(t-w[1])*14):1;return `<span style="color:${c};transform:scale(${sc})">${w[0]}</span>`}).join(' ');
  $('fade').style.opacity=t>DUR-0.5?cl((t-DUR+0.5)/0.5):0;
};
render(0);
