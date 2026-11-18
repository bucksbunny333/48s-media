# Engine v2 (ab 18.11.2026)
Pro Folge: Ordner engine/folgen/<datum>_<slot>/ mit scenes.js (CFG, initCues, scenes, post48, SFXC) + words.js. Gemeinsam: common.js (Helfer, 48er-Spannung, HUD, Kapitel-Kopfzeile #head, Untertitel, Quellen).
Ablauf (in einem Arbeitsordner mit Kopie von engine/ + scenes.js; video.html bindet rig/poses/words/scenes/common ein):
1. words_raw.json aus Scribe-Wörtern (A/B) → `MGA=0.7 KA=0.5 python3 build_timeline.py A.mp3 B.mp3` (MGA/KA = Pausen-Kompression; Ziel: A endet 44–45,3 s, Tempo ≤ 1,12)
2. `node shots.js <zeiten>` + `bash mont.sh m.png s_*.png` → ansehen
3. `node render.js video.html <DUR> video.mp4 30`
4. `node dumpsfx.js && python3 sfx2.py` → sfx.wav
5. `bash mix.sh <ordner> <out.mp4>` (loudnorm -14, Musik 0,42 + Sidechain, SFX 0,75, Limiter 0,95, crf 21, aac 128k)
