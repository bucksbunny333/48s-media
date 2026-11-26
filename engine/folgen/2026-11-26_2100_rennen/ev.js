const sim=require('./sim2.js');const A=require('./plan.js');
const out=A.map(a=>{const r=sim(Object.assign({DUR:60,FPS:30,R0:58,DR:13,BR:12},a.P));return {k:a.key,b:r.breaks.map(x=>x.t),c:r.bounces,esc:r.escaped}});
require('fs').writeFileSync('ev.json',JSON.stringify(out));console.log(out.map(o=>o.k+':'+o.b.length+' bounces '+o.c.length).join(' | '));
