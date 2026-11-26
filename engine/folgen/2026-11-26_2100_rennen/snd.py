import json,numpy as np,wave
E=json.load(open('ev.json'));sr=48000;D=60;n=sr*D;out=np.zeros(n)
def add(sig,t,g=1):
    i=int(t*sr);m=min(len(sig),n-i)
    if m>0 and i>=0:out[i:i+m]+=g*sig[:m]
tt=lambda l:np.arange(int(sr*l))/sr
def bell(f,l=0.9,dec=4):x=tt(l);return sum(np.sin(2*np.pi*f*k*x)*w for k,w in [(1,1),(2,.3),(3,.1)])*np.exp(-x*dec)
def noise(l,dec,seed=0):x=tt(l);return np.random.default_rng(seed).standard_normal(len(x))*np.exp(-x*dec)
base={'gelb':523.25,'blau':392.0,'rot':329.63,'gruen':440.0}
penta=[0,2,4,7,9,12,14,16,19,21,24,26,28,31]
for a in E:
    for j,t in enumerate(a['b']):
        add(bell(base[a['k']]*2**(penta[j]/12)),t,0.16); add(noise(0.2,30,j),t,0.04)
    for t in a['c']:
        x=tt(0.04);add(np.sin(2*np.pi*(1500 if a['k']!='gruen' else 1700)*x)*np.exp(-x*100),t,0.015)
# Countdown + Los
for t,f in [(0.02,660),(0.5,660),(1.0,660)]:add(bell(f,0.3,12),t,0.35)
add(bell(990,0.6,6),1.6,0.4); x=tt(1.0); add(np.sin(2*np.pi*55*x)*np.exp(-x*5),1.6,0.6)
# Gelb gibt auf (buzz) 
x=tt(0.5);add(np.sign(np.sin(2*np.pi*110*x))*np.exp(-x*6),16.8,0.12)
# Twist whoosh
x=tt(0.8);add(noise(0.8,3,9)*np.sin(np.pi*x/0.8),29.3,0.2)
for t in [33.8,39.0,42.0,44.4]: add(bell(880,0.4,10),t,0.2)
# Rot startet
add(bell(330,0.6,6),22.0,0.25)
# Sieg
W=48.0;x=tt(1.5);add(np.sin(2*np.pi*50*x)*np.exp(-x*3),W,0.8);add(noise(1.2,4,5),W,0.15)
for k,s in enumerate([0,4,7,12,16,19]):add(bell(440*2**(s/12),2.5,1.5),W+0.06*k,0.12)
for k in range(10): add(bell(1320+k*40,0.2,20),52.4+k*0.35,0.05)
out/=max(1e-9,np.abs(out).max())/0.9
w=wave.open('sfx.wav','w');w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((out*32767).astype(np.int16).tobytes());w.close();print('ok')
