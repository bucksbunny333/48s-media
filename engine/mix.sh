# usage: mix.sh slotdir out.mp4
d=$1; out=$2; cd $d
ffmpeg -v error -y -i video.mp4 -i vo_final.wav -i sfx.wav -i serien_musik.mp3 -filter_complex \
"[1:a]aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[vo][vosc];[3:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.42[mu];[mu][vosc]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=300[mud];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.75[sf];[vo][mud][sf]amix=inputs=3:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.95,aresample=48000[a]" \
-map 0:v -map "[a]" -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -movflags +faststart -shortest $out
