// Stick figure rig: pose = {x,y,s, hx,hy (head offset), torso angle, arms/legs as [upper,lower] angles in deg from down}
window.FIG = (function(){
  const D=Math.PI/180;
  function seg(x,y,len,ang){return [x+Math.sin(ang*D)*len, y+Math.cos(ang*D)*len];}
  function draw(p,o={}){
    const s=p.s||1, col=o.col||'#f2f2f2', w=(o.w||11)*s;
    const L={torso:150*s,neck:18*s,head:44*s,ua:72*s,la:68*s,ul:88*s,ll:86*s};
    const hip=[p.x,p.y];
    const t=p.torso||0; // 0 = upright (angle from up)
    const sh=[hip[0]+Math.sin(t*D)*L.torso, hip[1]-Math.cos(t*D)*L.torso];
    const nk=[sh[0]+Math.sin(t*D)*L.neck, sh[1]-Math.cos(t*D)*L.neck];
    const hc=[nk[0]+Math.sin((t+(p.headTilt||0))*D)*L.head, nk[1]-Math.cos((t+(p.headTilt||0))*D)*L.head];
    let out='';
    const line=(a,b)=>`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}"/>`;
    const limb=(base,a1,a2,l1,l2)=>{const e=seg(base[0],base[1],l1,a1);const h=seg(e[0],e[1],l2,a1+a2);return [line(base,e)+line(e,h),h];};
    const [la,lh]=limb(sh,p.lua??20,p.lla??0,L.ua,L.la);
    const [ra,rh]=limb(sh,p.rua??-20,p.rla??0,L.ua,L.la);
    const [ll,lf]=limb(hip,p.lul??10,p.lll??0,L.ul,L.ll);
    const [rl,rf]=limb(hip,p.rul??-10,p.rll??0,L.ul,L.ll);
    out+=`<g stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none" opacity="${o.op??1}">`+ll+rl+line(hip,sh)+line(sh,nk)+la+ra+`<circle cx="${hc[0].toFixed(1)}" cy="${hc[1].toFixed(1)}" r="${L.head}" fill="#000"/></g>`;
    return {svg:out, lh, rh, head:hc, hip, sh};
  }
  function mix(a,b,k){const r={};for(const key of new Set([...Object.keys(a),...Object.keys(b)])){const va=a[key]??b[key],vb=b[key]??a[key];r[key]=(typeof va==='number')?va+(vb-va)*k:vb;}return r;}
  return {draw,mix};
})();
