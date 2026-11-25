// node shots_h.js page.html HASH outprefix t1 t2 ...
const {chromium}=require('playwright');
(async()=>{const [page,hash,pre,...ts]=process.argv.slice(2);const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+require('path').resolve(page)+'#'+hash);await p.evaluate(()=>document.fonts.ready);
for(const t of ts){await p.evaluate(t=>window.render(+t),t);await p.screenshot({path:`${pre}_${t}.png`,type:'png'});}
await b.close();})();
