// usage: node render.js page.html seconds out.mp4 [fps]
const {chromium}=require('playwright');const {spawn}=require('child_process');
(async()=>{const [,,page,dur,out,fpsArg]=process.argv;const fps=+(fpsArg||30);const N=Math.round(dur*fps);
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome'});
const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+require('path').resolve(page));await p.evaluate(()=>document.fonts.ready);
const tmp=out.replace(/\.mp4$/,'.tmp.mp4');
const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p',tmp],{stdio:['pipe','ignore','inherit']});
for(let i=0;i<N;i++){await p.evaluate(t=>window.render(t),i/fps);const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();require('fs').renameSync(tmp,out);console.log('done',N,'frames');})();
