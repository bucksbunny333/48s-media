# mixk.sh video.mp4 sfx.wav musicoffset dur out.mp4
v=$1; s=$2; off=$3; d=$4; o=$5
ffmpeg -v error -y -i $v -i $s -ss $off -i serien_musik.mp3 -filter_complex "[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.7,afade=t=in:d=0.3,afade=t=out:st=$(echo "$d-1.2"|bc):d=1.2[mu];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.8[sf];[mu][sf]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.95[a]" -map 0:v -map "[a]" -t $d -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -movflags +faststart $o
