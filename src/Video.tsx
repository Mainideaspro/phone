import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';

// --- СЦЕНА 1: ХУК (0-5 сек) ---
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulseScale = interpolate(Math.sin(frame / 10), [-1, 1], [0.8, 1.5]);
  const textOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const chars = ['0', '1', 'AI', '{}', 'Data', '//', '<', '>'];
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, #1a1a2e 0%, #000 100%)' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#00ffcc', transform: `scale(${pulseScale})`, boxShadow: '0 0 50px #00ffcc, 0 0 100px #00ffcc' }} />
      {chars.map((char, i) => {
        const angle = (i / chars.length) * Math.PI * 2;
        const radius = interpolate(frame, [0, 150], [50, 350]);
        return (
          <div key={i} style={{ position: 'absolute', color: '#00ffcc', fontSize: 40, fontWeight: 'bold', fontFamily: 'monospace', left: Math.cos(angle) * radius + 400, top: Math.sin(angle) * radius + 200, transform: `rotate(${frame * 2}deg)`, opacity: interpolate(frame, [0, 50, 150], [0, 1, 0]), textShadow: '0 0 10px #00ffcc' }}>
            {char}
          </div>
        );
      })}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: 70, fontFamily: 'sans-serif', fontWeight: 900, textAlign: 'center', opacity: textOpacity, marginTop: 200, textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
          Что, если машина <br /> <span style={{ color: '#00ffcc' }}>научится думать?</span>
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// --- СЦЕНА 2: ПРОЦЕСС (5-15 сек) ---
const SceneProcess: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springConf = { damping: 15, stiffness: 100 };
  
  const cols = [
    { title: 'Данные', color: '#ff0055', icon: '📦', delay: 10 },
    { title: 'Обучение', color: '#00ffcc', icon: '⚙️', delay: 30 },
    { title: 'Понимание', color: '#0088ff', icon: '🧠', delay: 50 }
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f', flexDirection: 'row', padding: 40, gap: 30, justifyContent: 'center', alignItems: 'center' }}>
      {cols.map((col, i) => {
        const anim = spring({ frame: frame - col.delay, fps, config: springConf });
        return (
          <div key={i} style={{ flex: 1, maxWidth: 250, height: 400, background: 'rgba(255,255,255,0.03)', border: `2px solid ${col.color}`, borderRadius: 30, opacity: anim, transform: `translateY(${100 - anim * 100}px) scale(${anim})`, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', boxShadow: `0 0 40px ${col.color}40, inset 0 0 20px ${col.color}20`, backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: 80, marginBottom: 20, filter: `drop-shadow(0 0 20px ${col.color})` }}>{col.icon}</div>
            <h2 style={{ color: col.color, fontSize: 36, fontFamily: 'sans-serif', fontWeight: 800, margin: 0, textShadow: `0 0 15px ${col.color}` }}>{col.title}</h2>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// --- СЦЕНА 3: РЕЗУЛЬТАТ (15-45 сек) ---
const SceneResult: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig(); 
  const flashOpacity = interpolate(frame, [0, 15, 30], [1, 0.8, 0], { extrapolateRight: 'clamp' });
  
  const entrySpring = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 60, mass: 1 } });
  const initialRotateY = interpolate(entrySpring, [0, 1], [-90, 0]);
  const initialRotateX = interpolate(entrySpring, [0, 1], [20, 0]);
  const initialScale = interpolate(entrySpring, [0, 1], [0.5, 1]);
  const windowOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  
  const floatY = Math.sin(frame / 25) * 15; 
  const floatX = Math.cos(frame / 30) * 10;
  const dynamicRotateY = Math.sin(frame / 60) * 8;
  
  const text1 = "Искусственный интеллект";
  const text2 = "— это не магия.";
  const charsToShow1 = Math.floor(interpolate(frame, [40, 80], [0, text1.length], { extrapolateRight: 'clamp' }));
  const charsToShow2 = Math.floor(interpolate(frame, [90, 130], [0, text2.length], { extrapolateRight: 'clamp' }));
  
  const chartProgress = interpolate(frame, [200, 400], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const numberValue = Math.floor(interpolate(frame, [200, 400], [0, 1000000], { extrapolateRight: 'clamp' }));
  
  const pathLength = 1000;
  const strokeDashoffset = pathLength - (pathLength * chartProgress);
  const areaPath = `M 0,150 L 0,120 Q 50,100 100,110 T 200,60 T 300,90 T 400,30 T 500,50 L 600,10 L 600,150 Z`;
  const areaOpacity = interpolate(frame, [250, 400], [0, 0.3], { extrapolateRight: 'clamp' });

  const finalTextOpacity = interpolate(frame, [600, 650], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#020205', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${50 + floatX}% ${50 + floatY}%, rgba(0, 150, 255, 0.15) 0%, transparent 60%)` }} />
      <AbsoluteFill style={{ backgroundColor: '#fff', opacity: flashOpacity, zIndex: 100 }} />
      
      <div style={{ width: 700, height: 500, background: 'rgba(15, 20, 30, 0.7)', borderRadius: 24, border: '1px solid rgba(0, 255, 204, 0.3)', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(0, 150, 255, 0.2)', transform: `perspective(1200px) rotateY(${initialRotateY + dynamicRotateY}deg) rotateX(${initialRotateX}deg) scale(${initialScale}) translateY(${floatY}px) translateX(${floatX}px)`, opacity: windowOpacity, display: 'flex', flexDirection: 'column', zIndex: 10, backdropFilter: 'blur(20px)' }}>
        
        <div style={{ display: 'flex', gap: 10, padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#27c93f' }} />
          <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 20, fontFamily: 'monospace' }}>model_run.exe</span>
        </div>

        <div style={{ flex: 1, padding: 40, display: 'flex', flexDirection: 'column' }}>
          <div style={{ minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
             <h1 style={{ color: '#fff', fontSize: 42, fontFamily: 'sans-serif', margin: 0, fontWeight: 700 }}>{text1.slice(0, charsToShow1)}<span style={{ opacity: frame % 10 > 5 ? 0 : 1 }}>|</span></h1>
             <h1 style={{ color: '#00ffcc', fontSize: 42, fontFamily: 'sans-serif', margin: 0, fontWeight: 700 }}>{text2.slice(0, charsToShow2)}</h1>
          </div>
          
          <div style={{ marginTop: 40, height: 150, width: '100%', position: 'relative' }}>
             <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                <path d={areaPath} fill="url(#grad)" opacity={areaOpacity} />
                <path d="M 0,150 L 0,120 Q 50,100 100,110 T 200,60 T 300,90 T 400,30 T 500,50 L 600,10" fill="none" stroke="#00ffcc" strokeWidth="6" strokeLinecap="round" strokeDasharray={pathLength} strokeDashoffset={strokeDashoffset} style={{ filter: 'drop-shadow(0 0 10px #00ffcc)' }} />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#00ffcc" stopOpacity="0"/>
                  </linearGradient>
                </defs>
             </svg>
             <div style={{ position: 'absolute', top: -30, right: 0, color: '#fff', fontSize: 36, fontFamily: 'monospace', fontWeight: 'bold', opacity: interpolate(frame, [200, 250], [0, 1], { extrapolateRight: 'clamp' }) }}>
                {numberValue.toLocaleString('ru-RU')}
             </div>
          </div>
        </div>
      </div>

      <h2 style={{ position: 'absolute', bottom: 80, color: '#fff', fontSize: 42, fontFamily: 'sans-serif', fontWeight: 300, opacity: finalTextOpacity, zIndex: 20, textShadow: '0 0 20px rgba(0, 255, 204, 0.5)' }}>
        Это математика в действии.
      </h2>
    </AbsoluteFill>
  );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={150}><SceneHook /></Sequence>
      <Sequence from={150} durationInFrames={300}><SceneProcess /></Sequence>
      <Sequence from={450} durationInFrames={900}><SceneResult /></Sequence>
    </AbsoluteFill>
  );
};