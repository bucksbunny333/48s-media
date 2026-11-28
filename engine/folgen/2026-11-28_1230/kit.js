const RED='#e5484d',GREEN='#30d158',WHITE='#f2f2f2',GREY='#5c5c5c';
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const eo=x=>1-Math.pow(1-cl(x),3), eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2}, eb=x=>{x=cl(x);const c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const env=(t,a,b,fi=.25,fo=.25)=>cl((t-a)/fi)*cl((b-t)/fo);
const $=id=>document.getElementById(id);
function txt(x,y,s,size,col,w=800,op=1,anchor='middle',ls=0){return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Inter" font-weight="${w}" font-size="${size}" fill="${col}" opacity="${op}" letter-spacing="${ls}">${s}</text>`}
function pill(x,y,s,bg,fg,size=52,op=1,sc=1){const w=s.length*size*0.62+70;return `<g opacity="${op}" transform="translate(${x},${y}) scale(${sc})"><rect x="${-w/2}" y="${-size*0.95}" width="${w}" height="${size*1.6}" rx="${size*0.8}" fill="${bg}"/>${txt(0,size*0.22,s,size,fg,900)}</g>`}
function fig(pose,x,y,s,col,flip=false,op=1){const d=FIG.draw(Object.assign({x,y,s},pose),{col,op});return flip?`<g transform="translate(${2*x},0) scale(-1,1)">${d.svg}</g>`:d.svg}
function sofa(x,y,w){return `<g stroke="${GREY}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M${x},${y} L${x+w},${y} M${x},${y} L${x},${y-90} Q${x},${y-120} ${x+30},${y-120} L${x+w-30},${y-120} Q${x+w},${y-120} ${x+w},${y-90} L${x+w},${y} M${x+20},${y} L${x+20},${y+60} M${x+w-20},${y} L${x+w-20},${y+60}"/></g>`}
function xmark(x,y,r,op,col=RED){return `<g stroke="${col}" stroke-width="10" stroke-linecap="round" opacity="${op}"><line x1="${x-r}" y1="${y-r}" x2="${x+r}" y2="${y+r}"/><line x1="${x+r}" y1="${y-r}" x2="${x-r}" y2="${y+r}"/></g>`}
const blend=(a,b,k)=>FIG.mix(a,b,eio(k));
