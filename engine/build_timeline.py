"""Build final VO + word timeline for a 48sekunden episode.
Usage: python3 build_timeline.py A.mp3 B.mp3   (or with no args: words-only preview)
Part A is compressed (long pauses shortened) and sped up so it ends at A_END.
Part B starts so its first word lands exactly at T48 (green 48 reveal).
"""
import json, sys, subprocess, numpy as np, wave
T48 = 48.0
A_END = 45.3          # last word of part A must end here (then ~2.7 s suspense)
import os
MAXGAP_A, KEEP_A = float(os.environ.get("MGA",0.30)), float(os.environ.get("KA",0.20))
MAXGAP_B, KEEP_B = 0.40, 0.28
TAIL = 1.6            # seconds after last word of B
SR = 48000
words = json.load(open('words_raw.json'))

def load(fn):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', fn, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768

def silences(x, maxgap):
    hop = int(0.01 * SR); n = len(x) // hop
    rms = np.sqrt(np.array([np.mean(x[i*hop:(i+1)*hop]**2) for i in range(n)]) + 1e-12)
    db = 20*np.log10(rms); thr = db.max() - 38
    quiet = db < thr; out = []; i = 0
    while i < n:
        if quiet[i]:
            j = i
            while j < n and quiet[j]: j += 1
            if (j - i) * 0.01 > maxgap and i > 0 and j < n: out.append((i*0.01, j*0.01))
            i = j
        else: i += 1
    lead = 0.0
    k = 0
    while k < n and quiet[k]: k += 1
    lead = k * 0.01
    return out, lead

def word_gaps(ws, maxgap):
    out = []
    for a, b in zip(ws, ws[1:]):
        if b[1] - a[2] > maxgap: out.append((a[2], b[1]))
    return out, 0.0

def compress(x, gaps, keep):
    """returns new audio (or None) and a time-mapping function"""
    segs = []; pos = 0.0; removed = []
    for a, b in gaps:
        cut_a = a + keep/2; cut_b = b - keep/2
        segs.append((pos, cut_a)); removed.append((cut_a, cut_b)); pos = cut_b
    segs.append((pos, None))
    def m(t):
        d = 0.0
        for ca, cb in removed:
            if t >= cb: d += cb - ca
            elif t > ca: d += t - ca
        return t - d
    y = None
    if x is not None:
        parts = [x[int(s*SR): (int(e*SR) if e is not None else len(x))] for s, e in segs]
        y = parts[0]; f = int(0.008*SR)
        for p in parts[1:]:
            r = np.linspace(0, 1, f); y = np.concatenate([y[:-f], y[-f:]*(1-r) + p[:f]*r, p[f:]])
    return y, m

def save(a, fn):
    w = wave.open(fn, 'w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(a, -1, 1)*32767).astype(np.int16).tobytes()); w.close()

audio = len(sys.argv) == 3
xa = load(sys.argv[1]) if audio else None
xb = load(sys.argv[2]) if audio else None
ga, leadA = silences(xa, MAXGAP_A) if audio else word_gaps(words['A'], MAXGAP_A)
gb, leadB = silences(xb, MAXGAP_B) if audio else word_gaps(words['B'], MAXGAP_B)
ya, ma = compress(xa, ga, KEEP_A)
yb, mb = compress(xb, gb, KEEP_B)
a_last = ma(words['A'][-1][2])
F = max(1.0, a_last / A_END)
print('A compressed end %.2f -> tempo %.3f' % (a_last, F))
W = [[w[0], round(ma(w[1])/F, 3), round(ma(w[2])/F, 3)] for w in words['A']]
onsetB = mb(max(leadB, words['B'][0][1]))
startB = T48 - onsetB
W += [[w[0], round(startB + mb(w[1]), 3), round(startB + mb(w[2]), 3)] for w in words['B']]
DUR = round(W[-1][2] + TAIL, 2)
if audio:
    save(ya, 'A_c.wav'); save(yb, 'B_c.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'A_c.wav', '-filter:a', f'atempo={F:.4f}', 'A_f.wav'], check=True)
    af = load('A_f.wav')
    out = np.zeros(int(DUR*SR))
    out[:len(af)] = af[:len(out)]
    i0 = int(startB*SR); n = min(len(yb), len(out)-i0); out[i0:i0+n] += yb[:n]
    save(out, 'vo_final.wav')
    print('leadB %.2f startB %.2f' % (leadB, startB))
open('words.js', 'w').write('window.W=' + json.dumps(W, ensure_ascii=False) + ';window.T48=%s;window.DUR=%s;' % (T48, DUR))
print('DUR', DUR, 'A ends', W[len(words['A'])-1][2], 'B first', W[len(words['A'])][1])
