# bash safe_check.sh video.mp4 outpng t1 t2 ...  -> Standbilder mit roten Sperrzonen, Montage
v=$1; o=$2; shift 2; d=$(mktemp -d); fs=()
for t in "$@"; do ffmpeg -nostdin -v error -y -ss $t -i $v -frames:v 1 -vf "drawbox=x=0:y=0:w=1080:h=120:color=red@0.45:t=fill,drawbox=x=0:y=1540:w=1080:h=380:color=red@0.45:t=fill,drawbox=x=0:y=120:w=45:h=1420:color=red@0.45:t=fill,drawbox=x=1031:y=120:w=49:h=1420:color=red@0.45:t=fill,drawbox=x=308:y=128:w=452:h=85:color=red@0.45:t=fill,drawbox=x=885:y=955:w=146:h=585:color=red@0.45:t=fill" $d/$t.png; fs+=($d/$t.png); done
bash $(dirname $0)/2026-11-20_0730/mont.sh $o "${fs[@]}"
