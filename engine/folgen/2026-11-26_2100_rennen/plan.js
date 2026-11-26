const I=1e9;
const G=[1.8];for(let i=1;i<9;i++)G.push(1.8+i*0.95);while(G.length<14)G.push(I);
const B=[3.0,7.5,13,19.5,26.5,34,41.5];while(B.length<14)B.push(I);
const R=[23.5,27.5,31.5,35.5,39.5,43.5];while(R.length<14)R.push(I);
const N=[];for(let i=0;i<10;i++)N.push(2.2+i*3.4);N.push(37,41.5,45,47.5);
const ARENAS=[
 {key:'gelb',col:'#ffd60a',cx:290,cy:680,P:{SCHED:G,TQUIT:16.0,seed:7,TEND:1e9}},
 {key:'blau',col:'#4cc9f0',cx:790,cy:680,P:{SCHED:B,seed:11,TEND:48}},
 {key:'rot',col:'#ff4d4d',cx:290,cy:1210,P:{SCHED:R,TSTART:22,seed:13,TEND:48}},
 {key:'gruen',col:'#2ee66b',cx:790,cy:1210,P:{SCHED:N,seed:17}},
];
if(typeof module!=='undefined')module.exports=ARENAS;else window.ARENAS=ARENAS;
