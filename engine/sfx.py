import numpy as np, wave, json, re
src = open('words.js').read()
W = json.loads(re.search(r'window.W=(\[.*?\]);', src).group(1))
T48 = float(re.search(r'T48=([\d.]+)', src).group(1)); DUR = float(re.search(r'DUR=([\d.]+)', src).group(1))
def cue(word, n=1):
    c = 0
    for w in W:
        if w[0] == word:
            c += 1
            if c == n: return w[1]
    raise KeyError(word)
sr = 48000; n = int(sr*DUR); out = np.zeros(n); rng = np.random.default_rng(7)
def add(sig, t, g=1):
    i = int(t*sr); m = min(len(sig), n-i)
    if m > 0 and i >= 0: out[i:i+m] += g*sig[:m]
tt = lambda l: np.arange(int(sr*l))/sr
def tick(f=2300, a=0.15): x = tt(0.03); return a*np.sin(2*np.pi*f*x)*np.exp(-x*150)
def ding(): x = tt(2.0); return 0.30*sum(np.sin(2*np.pi*f*x)*w for f, w in [(880, 1), (1320, .45), (1760, .2)])*np.exp(-x*2.4)
def boom(l=1.0): x = tt(l); return 0.75*np.sin(2*np.pi*(64-30*x)*x)*np.exp(-x*4.2)
def whoosh(l=0.5):
    x = tt(l); nz = rng.standard_normal(len(x)); y = np.convolve(nz, np.ones(30)/30, 'same'); return 0.30*y*np.sin(np.pi*x/l)**2
def buzz(l=0.35): x = tt(l); return 0.22*np.sign(np.sin(2*np.pi*180*x))*(np.sin(2*np.pi*14*x) > 0)*np.exp(-x*2)
def pop(f=900, a=0.15): x = tt(0.06); return a*np.sin(2*np.pi*f*x*(1+3*x))*np.exp(-x*60)
def heart(): x = tt(0.25); return 0.6*np.sin(2*np.pi*50*x)*np.exp(-x*18)
def scratch(): x = tt(0.25); nz = rng.standard_normal(len(x)); return 0.18*nz*np.exp(-x*12)
# hook: hard hit on frame 0
add(boom(0.9), 0.0, 0.7); add(pop(1400, 0.2), 0.02)
add(scratch(), cue('langweilig')+0.15)
for c in [cue('Das', 1), cue('Nach'), cue('Die'), cue('Und', 1), cue('Danach'), cue('Und', 2), cue('Spürst'), cue('Das', 2)]:
    add(whoosh(), c-0.2)
# mini timer ticks to 47
a, b = cue('Nach'), cue('greift')
for k in range(12): add(tick(2600, 0.08), a + (b-a)*k/12)
add(buzz(), cue('greift'), 0.6); add(pop(700, 0.2), cue('Nachricht.')); add(pop(700, 0.2), cue('Ton.'))
add(boom(0.6), cue('Einfach'), 0.5)
for c in [cue('Damals:'), cue('2012:'), cue('Heute:')]: add(pop(1000, 0.15), c)
add(boom(0.8), cue('47.'), 0.6)
add(boom(0.6), cue('25'), 0.45)
add(pop(1500, 0.2), cue('rechts.'))
j = cue('Jeder'); e = cue('Wiederholung.')
for k in range(40): add(pop(800+k*15, 0.04), j + (e-j+0.3)*(k/40)**0.5)
# suspense heartbeat to 48
for t in np.arange(np.ceil(e+0.6), T48):
    add(tick(2600, 0.22), t); add(heart(), t+0.02); add(heart(), t+0.5, 0.7)
add(ding(), T48); add(boom(), T48)
add(pop(1200, 0.2), cue('Du', 3)); add(ding()*0.5, cue('Er', 2)+0.9)
add(boom(0.7), cue('Morgen:'), 0.5); add(pop(1500, 0.25), cue('Folge'))
out = np.clip(out, -1, 1)
w = wave.open('sfx.wav', 'w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
print('sfx ok', DUR)
