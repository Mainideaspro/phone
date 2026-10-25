import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';

// --- СЦЕНА 1: ХУК (0-5 сек) ---
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const pulseScale = interpolate(Math.sin(frame / 10), [-1, 1], [0.8, 1.5]);
  const textOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const chars = ['0', '1', 'AI', '{}', 'Data', '//', '<', '>'];
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: '#fff', transform: `scale(${pulseScale})`, boxShadow: '0 0 30px rgba(255,255,255,0.8)' }} />
      {chars.map((char, i) => {
        const angle = (i / chars.length) * Math.PI * 2;
        const radius = interpolate(frame, [0, 150], [50, 300]);
        return (
          <div key={i} style={{ position: 'absolute', color: '#fff', fontSize: 30, left: Math.cos(angle) * radius + 400, top: Math.sin(angle) * radius + 200, transform: `rotate(${frame * 2}deg)`, opacity: interpolate(frame, [0, 50, 150], [0, 1, 0]) }}>
            {char}
          </div>
        );
      })}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: 60, fontFamily: 'sans-serif', textAlign: 'center', opacity: textOpacity, marginTop: 200 }}>
          Что, если машина <br /> научится думать?
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
  const col1 = spring({ frame: frame - 10, fps, config: springConf });
  const col2 = spring({ frame: frame - 30, fps, config: springConf });
  const col3 = spring({ frame: frame - 50, fps, config: springConf });

  return (
    <AbsoluteFill style={{ backgroundColor: '#111', flexDirection: 'row', padding: 50, gap: 20 }}>
      {[{ anim: col1, title: 'Данные', color: '#333' }, { anim: col2, title: 'Обучение', color: '#00ffcc' }, { anim: col3, title: 'Понимание', color: '#fff' }].map((col, i) => (
        <div key={i} style={{ flex: 1, border: '2px solid #333', borderRadius: 20, opacity: col.anim, transform: `translateY(${100 - col.anim * 100}px)`, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', backgroundColor: col.color, boxShadow: `0 0 30px ${col.color}` }} />
          <h2 style={{ color: '#fff', marginTop: 20, fontFamily: 'sans-serif' }}>{col.title}</h2>
        </div>
      ))}
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
  const dynamicRotateY = Math.sin(frame / 60) * 10;
  
  const text1 = "Искусственный интеллект";
  const text2 = "— это не магия.";
  const charsToShow1 = Math.floor(interpolate(frame, [40, 80], [0, text1.length], { extrapolateRight: 'clamp' }));
  const charsToShow2 = Math.floor(interpolate(frame, [90, 130], [0, text2.length], { extrapolateRight: 'clamp' }));
  
  const chartProgress = interpolate(frame, [200, 400], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const numberValue = Math.floor(interpolate(frame, [200, 400], [0, 1000000]));
  const pathLength = 1000;
  const strokeDashoffset = pathLength - (pathLength * chartProgress);
  
  const finalTextOpacity = interpolate(frame, [600, 650], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#020205', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${50 + floatX}% ${50 + floatY}%, rgba(0, 150, 255, 0.15) 0%, transparent 60%)` }} />
      <AbsoluteFill style={{ backgroundColor: '#fff', opacity: flashOpacity, zIndex: 100 }} />
      
      <div style={{ width: 700, height: 500, backgroundColor: 'rgba(10, 12, 20, 0.9)', borderRadius: 24, border: '1px solid rgba(0, 255, 204, 0.4)', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(0, 100, 255, 0.2)', transform: `perspective(1200px) rotateY(${initialRotateY + dynamicRotateY}deg) rotateX(${initialRotateX}deg) scale(${initialScale}) translateY(${floatY}px) translateX(${floatX}px)`, opacity: windowOpacity, display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: 10, padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        <div style={{ flex: 1, padding: 50, display: 'flex', flexDirection: 'column' }}>
          <div style={{ minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <h1 style={{ color: '#fff', fontSize: 46, fontFamily: 'sans-serif', margin: 0, fontWeight: 700 }}>{text1.slice(0, charsToShow1)}</h1>
             <h1 style={{ color: '#00ffcc', fontSize: 46, fontFamily: 'sans-serif', margin: 0, fontWeight: 700 }}>{text2.slice(0, charsToShow2)}</h1>
          </div>
          <div style={{ marginTop: 40, height: 150, width: '100%', position: 'relative' }}>
             <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                <path d="M 0,150 L 0,120 Q 50,100 100,110 T 200,60 T 300,90 T 400,30 T 500,50 L 600,10" fill="none" stroke="#00ffcc" strokeWidth="6" strokeLinecap="round" strokeDasharray={pathLength} strokeDashoffset={strokeDashoffset} />
             </svg>
             <div style={{ position: 'absolute', top: -20, right: 0, color: '#fff', fontSize: 32, fontFamily: 'monospace', fontWeight: 'bold', opacity: interpolate(frame, [200, 250], [0, 1], { extrapolateRight: 'clamp' }) }}>
                {numberValue.toLocaleString('ru-RU')}
             </div>
          </div>
        </div>
      </div>
      <h2 style={{ position: 'absolute', bottom: 80, color: '#fff', fontSize: 42, fontFamily: 'sans-serif', fontWeight: 300, opacity: finalTextOpacity, zIndex: 20, textShadow: '0 0 20px rgba(0, 255, 204, 0.5)' }}>Это математика в действии.</h2>
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
