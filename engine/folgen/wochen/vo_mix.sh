# Nutzung: bash vo_mix.sh video_ohne_ton.mp4 sfx.wav out.mp4   (vo_00.mp3 … vo_12.mp3 im Ordner, Reihenfolge = vo_plan.json)
# Jeder Clip muss vor dem nächsten Startzeitpunkt enden (sonst atempo bis 1.15 oder Text kürzen).
v=$1; s=$2; o=$3
python3 - <<'PY'
import json,subprocess
plan=json.load(open('vo_plan.json'));ins=[];f=[];
for k,(t,_) in enumerate(plan):
    ins+=['-i',f'vo_{k:02d}.mp3']; f.append(f'[{k}:a]aformat=sample_rates=48000:channel_layouts=stereo,adelay={int(t*1000)}|{int(t*1000)}[v{k}]')
f.append(''.join(f'[v{k}]' for k in range(len(plan)))+f'amix=inputs={len(plan)}:normalize=0,apad=whole_dur=59,atrim=0:59[vo]')
subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(f),'-map','[vo]','vo_track.wav'],check=True)
PY
ffmpeg -v error -y -i $v -i $s -i serien_musik.mp3 -i vo_track.wav -filter_complex "[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.55,afade=t=out:st=57.8:d=1.2[mu];[3:a]asplit=2[vo][sc];[mu][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=300[mud];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.6[sf];[mud][sf][vo]amix=inputs=3:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.95[a]" -map 0:v -map "[a]" -t 59 -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -movflags +faststart $o
