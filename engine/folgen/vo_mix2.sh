# bash vo_mix2.sh video.mp4 sfx.wav out.mp4 DUR   (im Folgen-Ordner; vt_XX.mp3 + vo_plan.json)
v=$1; s=$2; o=$3; D=$4
python3 - $D <<'PY'
import json,subprocess,sys
D=sys.argv[1];plan=json.load(open('vo_plan.json'));ins=[];f=[]
for k,(t,_) in enumerate(plan):
    ins+=['-i',f'vt_{k:02d}.mp3']; f.append(f'[{k}:a]aformat=sample_rates=48000:channel_layouts=stereo,adelay={int(t*1000)}|{int(t*1000)}[v{k}]')
f.append(''.join(f'[v{k}]' for k in range(len(plan)))+f'amix=inputs={len(plan)}:normalize=0,apad=whole_dur={D},atrim=0:{D}[vo]')
subprocess.run(['ffmpeg','-nostdin','-v','error','-y',*ins,'-filter_complex',';'.join(f),'-map','[vo]','vo_track.wav'],check=True)
PY
F=$(python3 -c "print($D-1.3)")
ffmpeg -nostdin -v error -y -i $v -i $s -stream_loop -1 -i serien_musik.mp3 -i vo_track.wav -filter_complex "[2:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:$D,volume=0.5,afade=t=out:st=$F:d=1.3[mu];[3:a]asplit=2[vo][sc];[mu][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=300[mud];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.6[sf];[mud][sf][vo]amix=inputs=3:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.95[a]" -map 0:v -map "[a]" -t $D -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p -r 30 -c:a aac -b:a 160k -movflags +faststart $o
