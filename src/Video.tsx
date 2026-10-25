import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';

// СЦЕНА 1: ОТКРЫТИЕ (0-2 сек, 0-60 кадров)
const Scene1Energy: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 60], [0.5, 1.5]);
  const opacity = interpolate(frame, [0, 30, 60], [0, 1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #00ffff 0%, #0055ff 40%, transparent 70%)', transform: `scale(${scale})`, opacity, filter: 'blur(20px)' }} />
      <h2 style={{ position: 'absolute', color: '#fff', fontSize: 40, letterSpacing: 5, opacity }}>ОТКРЫТИЕ</h2>
    </AbsoluteFill>
  );
};

// СЦЕНА 2: ХУК (2-5 сек, 60-150 кадров)
const Scene2Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const textOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.2) 0%, transparent 60%)' }} />
      <h1 style={{ color: '#fff', fontSize: 70, fontFamily: 'sans-serif', textAlign: 'center', opacity: textOpacity, zIndex: 10, textShadow: '0 0 20px #00ffff' }}>
        Что, если машина<br /><span style={{ color: '#00ffff' }}>научится думать?</span>
      </h1>
    </AbsoluteFill>
  );
};

// СЦЕНА 3: ДАННЫЕ (5-8 сек, 150-240 кадров)
const Scene3Data: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a1a', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {Array.from({ length: 10 }).map((_, i) => {
        const x = interpolate(frame, [0, 90], [1000, -500]);
        const y = (i - 5) * 80;
        const rotate = interpolate(frame, [0, 90], [10, -10]);
        return (
          <div key={i} style={{ position: 'absolute', left: x + (i * 50), top: 450 + y, width: 200, height: 120, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0, 255, 255, 0.3)', borderRadius: 15, transform: `rotate(${rotate}deg)`, boxShadow: '0 0 20px rgba(0,255,255,0.1)', backdropFilter: 'blur(10px)' }} />
        );
      })}
      <h2 style={{ position: 'absolute', bottom: 100, color: '#00ffff', fontSize: 30, border: '1px solid #00ffff', padding: '10px 30px', borderRadius: 50, background: 'rgba(0,255,255,0.1)' }}>Данные</h2>
    </AbsoluteFill>
  );
};

// СЦЕНА 4: ОБУЧЕНИЕ (8-11 сек, 240-330 кадров)
const Scene4Training: React.FC = () => {
  const frame = useCurrentFrame();
  const rotate = frame * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a1a', justifyContent: 'center', alignItems: 'center', perspective: 1000 }}>
      <div style={{ width: 150, height: 150, position: 'relative', transformStyle: 'preserve-3d', transform: `rotateX(${rotate / 2}deg) rotateY(${rotate}deg)` }}>
        {/* Грани куба */}
        {[0, 90, 180, 270].map((deg, i) => (
          <div key={i} style={{ position: 'absolute', width: 150, height: 150, border: '2px solid #00ffff', background: 'rgba(0, 255, 255, 0.1)', transform: `rotateY(${deg}deg) translateZ(75px)`, boxShadow: 'inset 0 0 20px rgba(0,255,255,0.5)' }} />
        ))}
        <div style={{ position: 'absolute', width: 150, height: 150, border: '2px solid #00ffff', background: 'rgba(0, 255, 255, 0.1)', transform: `rotateX(90deg) translateZ(75px)` }} />
        <div style={{ position: 'absolute', width: 150, height: 150, border: '2px solid #00ffff', background: 'rgba(0, 255, 255, 0.1)', transform: `rotateX(-90deg) translateZ(75px)` }} />
      </div>
      <h2 style={{ position: 'absolute', bottom: 100, color: '#00ffff', fontSize: 30, border: '1px solid #00ffff', padding: '10px 30px', borderRadius: 50, background: 'rgba(0,255,255,0.1)' }}>Обучение</h2>
    </AbsoluteFill>
  );
};

// СЦЕНА 5: ПОНИМАНИЕ (11-15 сек, 330-450 кадров)
const Scene5Brain: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 120], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a1a', justifyContent: 'center', alignItems: 'center' }}>
      <svg width="600" height="600" viewBox="0 0 600 600">
        {/* Нейронные связи */}
        <path d="M 150,300 Q 300,100 450,300 T 300,500 Z" fill="none" stroke="#ff00ff" strokeWidth="3" strokeDasharray="1000" strokeDashoffset={1000 - (1000 * progress)} style={{ filter: 'drop-shadow(0 0 10px #ff00ff)' }} />
        <path d="M 300,100 L 300,500 M 150,300 L 450,300" fill="none" stroke="#00ffff" strokeWidth="2" strokeDasharray="1000" strokeDashoffset={1000 - (1000 * progress)} style={{ filter: 'drop-shadow(0 0 10px #00ffff)' }} />
        {/* Пульсирующие узлы */}
        <circle cx="300" cy="100" r={10 + Math.sin(frame / 5) * 5} fill="#fff" style={{ filter: 'drop-shadow(0 0 15px #fff)' }} />
        <circle cx="300" cy="500" r={10 + Math.cos(frame / 5) * 5} fill="#fff" style={{ filter: 'drop-shadow(0 0 15px #fff)' }} />
        <circle cx="150" cy="300" r={10 + Math.sin(frame / 6) * 5} fill="#fff" style={{ filter: 'drop-shadow(0 0 15px #fff)' }} />
        <circle cx="450" cy="300" r={10 + Math.cos(frame / 6) * 5} fill="#fff" style={{ filter: 'drop-shadow(0 0 15px #fff)' }} />
      </svg>
      <h2 style={{ position: 'absolute', bottom: 100, color: '#ff00ff', fontSize: 30, border: '1px solid #ff00ff', padding: '10px 30px', borderRadius: 50, background: 'rgba(255,0,255,0.1)' }}>Понимание</h2>
    </AbsoluteFill>
  );
};

// СЦЕНА 6: РЕЗУЛЬТАТ (15-35 сек, 450-1050 кадров)
const Scene6Result: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrySpring = spring({ frame, fps, config: { damping: 14 } });
  const rotateY = interpolate(entrySpring, [0, 1], [-90, 0]);
  const floatY = Math.sin(frame / 20) * 10;

  const text1 = "Искусственный интеллект";
  const text2 = "— это не магия.";
  const chars1 = Math.floor(interpolate(frame, [30, 60], [0, text1.length], { extrapolateRight: 'clamp' }));
  const chars2 = Math.floor(interpolate(frame, [70, 100], [0, text2.length], { extrapolateRight: 'clamp' }));

  const chartProgress = interpolate(frame, [150, 400], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const numberValue = Math.floor(interpolate(frame, [150, 400], [0, 1000000], { extrapolateRight: 'clamp' }));
  const pathLength = 1000;

  return (
    <AbsoluteFill style={{ backgroundColor: '#020205', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 700, height: 450, background: 'rgba(15, 20, 30, 0.7)', borderRadius: 24, border: '1px solid rgba(0, 255, 204, 0.3)', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(0, 150, 255, 0.2)', transform: `perspective(1200px) rotateY(${rotateY}deg) translateY(${floatY}px)`, display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', gap: 10, padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        <div style={{ flex: 1, padding: 40 }}>
          <h1 style={{ color: '#fff', fontSize: 36, margin: 0 }}>{text1.slice(0, chars1)}</h1>
          <h1 style={{ color: '#00ffcc', fontSize: 36, margin: 0 }}>{text2.slice(0, chars2)}</h1>
          
          <div style={{ marginTop: 40, height: 150, position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
              <path d="M 0,150 L 0,120 Q 50,100 100,110 T 200,60 T 300,90 T 400,30 T 500,50 L 600,10 L 600,150 Z" fill="url(#grad)" opacity={chartProgress * 0.5} />
              <path d="M 0,150 L 0,120 Q 50,100 100,110 T 200,60 T 300,90 T 400,30 T 500,50 L 600,10" fill="none" stroke="#00ffcc" strokeWidth="6" strokeDasharray={pathLength} strokeDashoffset={pathLength - (pathLength * chartProgress)} style={{ filter: 'drop-shadow(0 0 10px #00ffcc)' }} />
              <defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00ffcc" stopOpacity="1"/><stop offset="100%" stopColor="#00ffcc" stopOpacity="0"/></linearGradient></defs>
            </svg>
            <div style={{ position: 'absolute', top: -30, right: 0, color: '#fff', fontSize: 32, fontFamily: 'monospace', fontWeight: 'bold' }}>{numberValue.toLocaleString('ru-RU')}</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// СЦЕНА 7: ФИНАЛ (35-45 сек, 1050-1350 кадров)
const Scene7Final: React.FC = () => {
  const frame = useCurrentFrame();
  const rotate = frame * 0.5;
  const textOpacity = interpolate(frame, [50, 100], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#020205', justifyContent: 'center', alignItems: 'center' }}>
      {/* Планета */}
      <div style={{ width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #0055ff 0%, #001133 60%, #000 100%)', boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.8), 0 0 100px rgba(0, 100, 255, 0.2)', position: 'relative' }}>
        {/* Орбита */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 600, height: 150, border: '1px solid rgba(0, 255, 255, 0.3)', borderRadius: '50%', transform: `translate(-50%, -50%) rotateX(75deg) rotateZ(${rotate}deg)`, boxShadow: '0 0 20px rgba(0,255,255,0.1)' }} />
      </div>
      <h1 style={{ position: 'absolute', bottom: 150, color: '#fff', fontSize: 50, textAlign: 'center', opacity: textOpacity }}>
        Это математика<br /><span style={{ color: '#00ffcc' }}>в действии.</span>
      </h1>
    </AbsoluteFill>
  );
};

// СЦЕНА 8: КОНЕЦ (45-50 сек, 1350-1500 кадров)
const Scene8Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, 120, 150], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ color: '#fff', fontSize: 40, opacity, letterSpacing: 10, fontWeight: 300 }}>AI MOTION</h1>
    </AbsoluteFill>
  );
};

// --- СБОРКА ВСЕГО ВИДЕО ---
export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={60}><Scene1Energy /></Sequence>
      <Sequence from={60} durationInFrames={90}><Scene2Hook /></Sequence>
      <Sequence from={150} durationInFrames={90}><Scene3Data /></Sequence>
      <Sequence from={240} durationInFrames={90}><Scene4Training /></Sequence>
      <Sequence from={330} durationInFrames={120}><Scene5Brain /></Sequence>
      <Sequence from={450} durationInFrames={600}><Scene6Result /></Sequence>
      <Sequence from={1050} durationInFrames={300}><Scene7Final /></Sequence>
      <Sequence from={1350} durationInFrames={150}><Scene8Outro /></Sequence>
    </AbsoluteFill>
  );
};