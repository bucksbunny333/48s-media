const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+require('path').resolve('video.html'));const r=await p.evaluate(()=>({c:window.SFXC(),aEnd:T.aEnd}));require('fs').writeFileSync('sfx_cues.json',JSON.stringify(r));await b.close();console.log('ok',r.c.length);})();
