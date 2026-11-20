import numpy as np, wave, json, sys
C=json.load(open(sys.argv[1])); out_fn=sys.argv[2]; DUR=C['dur']
sr=48000; n=int(sr*DUR); out=np.zeros(n); rng=np.random.default_rng(7)
tt=lambda l: np.arange(int(sr*l))/sr
def add(sig,t,g=1):
    i=int(t*sr); m=min(len(sig),n-i)
    if m>0 and i>=0: out[i:i+m]+=g*sig[:m]
def tick(): x=tt(0.03); return 0.15*np.sin(2*np.pi*2300*x)*np.exp(-x*150)
def ding(): x=tt(2.0); return 0.30*sum(np.sin(2*np.pi*f*x)*w for f,w in [(880,1),(1320,.45),(1760,.2)])*np.exp(-x*2.4)
def boom(l=0.8): x=tt(l); return 0.75*np.sin(2*np.pi*(64-30*x)*x)*np.exp(-x*4.2)
def whoosh(l=0.5):
    x=tt(l); nz=rng.standard_normal(len(x)); y=np.convolve(nz,np.ones(30)/30,'same'); return 0.30*y*np.sin(np.pi*x/l)**2
def buzz(l=0.3): x=tt(l); return 0.2*np.sign(np.sin(2*np.pi*150*x))*np.exp(-x*6)
def pop(): x=tt(0.06); return 0.18*np.sin(2*np.pi*1000*x*(1+3*x))*np.exp(-x*60)
for t,k in C['c']:
    {'tick':lambda:add(tick(),t),'ding':lambda:add(ding(),t),'boom':lambda:add(boom(0.6),t,0.6),'whoosh':lambda:add(whoosh(),t-0.2),'buzz':lambda:add(buzz(),t,0.7),'pop':lambda:add(pop(),t)}[k]()
out=np.clip(out,-1,1); w=wave.open(out_fn,'w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok',out_fn)
