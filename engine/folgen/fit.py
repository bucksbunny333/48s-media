# fit.py dir tempo gap start [extra_pause_before_idx=sec ...]  -> applies atempo, writes vo_plan.json starts + timing.js
import json,subprocess,sys
d,tempo,gap,t=sys.argv[1],float(sys.argv[2]),float(sys.argv[3]),float(sys.argv[4])
extra={int(a.split('=')[0]):float(a.split('=')[1]) for a in sys.argv[5:]}
plan=json.load(open(f'{d}/vo_plan.json'));S=[];E=[]
for k,(_,txt) in enumerate(plan):
    src=f'{d}/vo_{k:02d}.mp3'; dst=f'{d}/vt_{k:02d}.mp3'
    subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i',src,'-af',f'atempo={tempo}',dst],check=True)
    du=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',dst]))
    t+=extra.get(k,0); S.append(round(t,2)); E.append(round(t+du,2)); plan[k][0]=round(t,2); t+=du+gap
json.dump(plan,open(f'{d}/vo_plan.json','w'),ensure_ascii=False,indent=1)
open(f'{d}/timing.js','w').write(f'const S={json.dumps(S)},E={json.dumps(E)};\n')
for k,(s,e) in enumerate(zip(S,E)): print(k,s,e,plan[k][1][:40])
