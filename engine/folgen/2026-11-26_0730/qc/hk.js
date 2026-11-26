const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const h of ['A','B','C']){await p.goto('file://'+require('path').resolve('../v.html')+'?'+h+'#'+h);await p.reload();await p.evaluate(()=>document.fonts.ready);
for(const t of [0,0.5,1,2]){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:`h${h}_${t}.png`});}}
await b.close();})();
