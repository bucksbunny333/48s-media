const {chromium}=require('playwright');
(async()=>{const page=process.argv[2];const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});const p=await b.newPage();
await p.goto('file://'+require('path').resolve(page));const r=await p.evaluate(()=>({c:window.SFXC(),dur:window.DUR}));require('fs').writeFileSync(page+'.cues.json',JSON.stringify(r));await b.close();console.log(page,r.c.length);})();
