import numpy as np, wave, json, re
src=open('words.js').read()
T48=float(re.search(r'T48=([\d.]+)',src).group(1)); DUR=float(re.search(r'DUR=([\d.]+)',src).group(1))
C=json.load(open('sfx_cues.json')); aEnd=C['aEnd']
sr=48000; n=int(sr*DUR); out=np.zeros(n); rng=np.random.default_rng(7)
def add(sig,t,g=1):
    i=int(t*sr); m=min(len(sig),n-i)
    if m>0 and i>=0: out[i:i+m]+=g*sig[:m]
tt=lambda l: np.arange(int(sr*l))/sr
def tick(f=2300,a=0.15): x=tt(0.03); return a*np.sin(2*np.pi*f*x)*np.exp(-x*150)
def ding(): x=tt(2.0); return 0.30*sum(np.sin(2*np.pi*f*x)*w for f,w in [(880,1),(1320,.45),(1760,.2)])*np.exp(-x*2.4)
def boom(l=0.8): x=tt(l); return 0.75*np.sin(2*np.pi*(64-30*x)*x)*np.exp(-x*4.2)
def whoosh(l=0.5):
    x=tt(l); nz=rng.standard_normal(len(x)); y=np.convolve(nz,np.ones(30)/30,'same'); return 0.30*y*np.sin(np.pi*x/l)**2
def buzz(l=0.35): x=tt(l); return 0.22*np.sign(np.sin(2*np.pi*180*x))*(np.sin(2*np.pi*14*x)>0)*np.exp(-x*2)
def pop(f=900,a=0.15): x=tt(0.06); return a*np.sin(2*np.pi*f*x*(1+3*x))*np.exp(-x*60)
def zap(l=0.5): x=tt(l); nz=rng.standard_normal(len(x)); return 0.25*(np.sign(np.sin(2*np.pi*90*x))*0.5+nz*0.5)*(np.sin(2*np.pi*30*x)>-0.2)*np.exp(-x*5)
def heart(): x=tt(0.25); return 0.6*np.sin(2*np.pi*50*x)*np.exp(-x*18)
add(boom(0.9),0.0,0.7); add(pop(1400,0.2),0.02)
for t,k in C['c']:
    if k=='whoosh': add(whoosh(),t-0.2)
    elif k=='boom': add(boom(0.6),t,0.5)
    elif k=='pop': add(pop(1000,0.18),t)
    elif k=='buzz': add(buzz(),t,0.6)
    elif k=='ding': add(ding()*0.5,t)
    elif k=='zap': add(zap(),t,0.8)
for t in np.arange(np.ceil(aEnd+0.6),T48):
    add(tick(2600,0.22),t); add(heart(),t+0.02); add(heart(),t+0.5,0.7)
add(ding(),T48); add(boom(),T48)
out=np.clip(out,-1,1)
w=wave.open('sfx.wav','w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
print('sfx ok',DUR,len(C['c']))
