// Ball in Ringen; Brüche nach Zeitplan; TSTART = bis dahin eingefroren; TQUIT = danach gibt der Ball auf (keine Brüche, Dämpfung)
(function(root){
function simulate(P){
  const {N=14,R0=50,DR=12,BR=11,G=900,DUR=60,FPS=30,GAP=0.75,SPD0=560,VMAX=1000,seed=5,SCHED,TSTART=0,TQUIT=1e9,TEND=1e9}=P;
  let s=seed;const rnd=()=>{s=(s*16807)%2147483647;return s/2147483647;};
  const rings=[];for(let i=0;i<N;i++)rings.push({r:R0+i*DR,a0:rnd()*6.283,w:(i%2?1:-1)*(1.0+0.8*rnd()),gap:GAP,tb:null,hits:[]});
  const a=rnd()*6.283;let x=0,y=0,vx=Math.cos(a)*SPD0,vy=Math.sin(a)*SPD0-200;const dt=1/600;const frames=[];const breaks=[];const bounces=[];let cur=0;
  const steps=Math.round(DUR/dt);const fstep=Math.round(1/(FPS*dt));let escaped=null;
  for(let k=0;k<=steps;k++){const t=k*dt;
    if(k%fstep===0)frames.push({x,y,cur});
    if(t<TSTART){continue;}
    const quit=t>=TQUIT, frozenEnd=t>=TEND;
    if(frozenEnd&&cur<N)continue;
    if(cur<N){vy+=G*dt;}else{ if(escaped===null)escaped=t; vy-=1600*dt; }
    if(quit&&cur<N){vx*=0.995;}
    x+=vx*dt;y+=vy*dt;
    if(cur<N){const r=rings[cur];const d=Math.hypot(x,y);
      if(d+BR>=r.r){const th=Math.atan2(y,x);
        if(!quit&&t>=SCHED[cur]){
          let best=null;for(const w of [r.w,-r.w,r.w*1.3,-r.w*1.3,r.w*0.7,-r.w*0.7,r.w*0.5,-r.w*0.5]){const a0=th-w*t-r.gap/2;
            const bad=r.hits.some(([ht,hth])=>{let rel=((hth-(a0+w*ht))%6.283+6.283)%6.283;return rel<r.gap+0.08||rel>6.2;});
            if(!bad){best={w,a0};break;}}
          if(!best)best={w:r.w,a0:th-r.w*t-r.gap/2};r.w=best.w;r.a0=best.a0;r.tb=t;breaks.push({t,i:cur});cur++;}
        else{r.hits.push([t,th]);const nx=x/d,ny=y/d;const vn=vx*nx+vy*ny;if(vn>0){
          const e=quit?0.55:1.0;vx-=(1+e)*vn*nx;vy-=(1+e)*vn*ny;
          if(!quit){const sp=Math.hypot(vx,vy),tgt=Math.min(VMAX,Math.max(sp,SPD0));vx*=tgt/sp;vy*=tgt/sp;}
          if(vn>40)bounces.push(t);}
          const k2=(r.r-BR-0.3)/d;x*=k2;y*=k2;}}}
  }
  return {rings,frames,breaks,bounces,escaped,N};
}
root.simulate2=simulate;if(typeof module!=='undefined')module.exports=simulate;
})(typeof window!=='undefined'?window:globalThis);
