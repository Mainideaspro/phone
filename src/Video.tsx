import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- АНИМАЦИИ ---
  const entrance = spring({ frame, fps, config: { damping: 15 } });
  const floatY1 = Math.sin(frame / 20) * 15;
  const floatY2 = Math.cos(frame / 25) * 20;
  const floatX = Math.sin(frame / 30) * 10;
  
  // Вращение куба по двум осям
  const rotateX = frame * 0.5;
  const rotateY = frame * 0.8;

  const chartProgress = interpolate(frame, [30, 120], [0, 1], { extrapolateRight: 'clamp' });
  const coreScale = interpolate(Math.sin(frame / 10), [-1, 1], [0.8, 1.2]);
  const textGradient = 'linear-gradient(90deg, #00ffff, #aa00ff)';

  // Длина куба
  const size = 180;
  const half = size / 2;

  // Стили для граней куба
  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    border: '2px solid #00ffff',
    background: 'rgba(0, 255, 255, 0.05)',
    boxShadow: 'inset 0 0 30px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.1)',
    // Рисуем сетку на гранях
    backgroundImage: `
      linear-gradient(rgba(0, 255, 255, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 255, 0.15) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
    backdropFilter: 'blur(4px)',
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#030412', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', perspective: 1000 }}>
      
      {/* 1. ФОНОВЫЕ ОРБИТЫ */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
         {[450, 650, 850].map((s, i) => (
            <div key={i} style={{
               position: 'absolute', width: s, height: s, borderRadius: '50%',
               border: `1px dashed rgba(0, 255, 255, ${0.1 + i * 0.05})`,
               transform: `rotateX(75deg) rotateZ(${frame * (0.2 + i * 0.1)}deg)`,
               transformStyle: 'preserve-3d'
            }}>
               <div style={{ position: 'absolute', top: -5, left: '50%', width: 10, height: 10, borderRadius: '50%', backgroundColor: i % 2 === 0 ? '#00ffff' : '#ff00ff', boxShadow: `0 0 15px ${i % 2 === 0 ? '#00ffff' : '#ff00ff'}`, transform: 'translateZ(1px)' }} />
            </div>
         ))}
      </AbsoluteFill>

      {/* 2. ЛЕТАЮЩИЕ ПАНЕЛИ (Стеклянные карточки) */}
      <div style={{ position: 'absolute', top: '15%', left: '12%', width: 240, height: 150, background: 'rgba(10, 20, 40, 0.7)', border: '1px solid #00ffff', borderRadius: 15, transform: `translateY(${floatY1}px) translateX(${floatX}px)`, opacity: entrance, boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)', backdropFilter: 'blur(10px)', padding: 20 }}>
         <svg width="100%" height="100%" viewBox="0 0 100 50">
            <path d="M 0,50 Q 20,10 40,30 T 80,10 L 100,20" fill="none" stroke="#00ffff" strokeWidth="3" strokeDasharray="150" strokeDashoffset={150 - (150 * chartProgress)} style={{ filter: 'drop-shadow(0 0 8px #00ffff)' }} />
         </svg>
      </div>

      <div style={{ position: 'absolute', bottom: '20%', right: '12%', width: 200, height: 180, background: 'rgba(20, 10, 40, 0.7)', border: '1px solid #aa00ff', borderRadius: 15, transform: `translateY(${floatY2}px) translateX(-${floatX}px)`, opacity: entrance, boxShadow: '0 0 30px rgba(170, 0, 255, 0.2)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <svg width="120" height="120" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#aa00ff" strokeWidth="12" strokeDasharray="250" strokeDashoffset={250 - (250 * chartProgress)} transform="rotate(-90 50 50)" style={{ filter: 'drop-shadow(0 0 8px #aa00ff)' }} />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#00ffff" strokeWidth="12" strokeDasharray="100 250" strokeDashoffset={100 - (100 * chartProgress)} transform="rotate(90 50 50)" style={{ filter: 'drop-shadow(0 0 8px #00ffff)' }} />
         </svg>
      </div>

      {/* 3. СУПЕР-КУБ (Центр) */}
      <div style={{ 
         position: 'absolute', 
         transform: `scale(${entrance}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
         transformStyle: 'preserve-3d',
         width: size, height: size
      }}>
         {/* 6 граней */}
         <div style={{ ...faceStyle, transform: `translateZ(${half}px)` }} />
         <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)` }} />
         <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }} />
         <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
         <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)`, borderColor: '#aa00ff', backgroundImage: `linear-gradient(rgba(170, 0, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(170, 0, 255, 0.15) 1px, transparent 1px)` }} />
         <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)`, borderColor: '#aa00ff', backgroundImage: `linear-gradient(rgba(170, 0, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(170, 0, 255, 0.15) 1px, transparent 1px)` }} />

         {/* Светящиеся вершины (углы куба) */}
         {[-1, 1].map(x => [-1, 1].map(y => [-1, 1].map(z => (
            <div key={`${x}-${y}-${z}`} style={{
               position: 'absolute', top: half + y * half - 4, left: half + x * half - 4,
               width: 8, height: 8, backgroundColor: '#fff', borderRadius: '50%',
               transform: `translateZ(${z * half}px)`,
               boxShadow: '0 0 15px #fff, 0 0 30px #00ffff'
            }} />
         ))))}

         {/* Внутреннее пульсирующее ядро */}
         <div style={{ 
            position: 'absolute', top: half - 50, left: half - 50, 
            width: 100, height: 100, borderRadius: '50%', 
            background: 'radial-gradient(circle, #ffffff 0%, #00ffff 30%, #aa00ff 70%, transparent 100%)', 
            transform: `scale(${coreScale})`,
            boxShadow: '0 0 80px #00ffff, 0 0 150px #aa00ff',
            filter: 'blur(4px)'
         }} />
      </div>

      {/* 4. СОЕДИНИТЕЛЬНЫЕ ЛИНИИ (Потоки данных от куба к панелям) */}
      <AbsoluteFill>
         <svg width="100%" height="100%" viewBox="0 0 1080 1080" style={{ opacity: entrance }}>
            {/* Линия к левому графику */}
            <path d="M 540,540 Q 350,300 250,250" fill="none" stroke="#00ffff" strokeWidth="2" strokeDasharray="10 10" strokeDashoffset={-frame * 5} opacity="0.6" />
            {/* Линия к правому графику */}
            <path d="M 540,540 Q 750,700 850,750" fill="none" stroke="#aa00ff" strokeWidth="2" strokeDasharray="10 10" strokeDashoffset={-frame * 5} opacity="0.6" />
         </svg>
      </AbsoluteFill>

      {/* 5. ТЕКСТ */}
      <div style={{ position: 'absolute', bottom: 80, textAlign: 'center', zIndex: 10, opacity: entrance }}>
         <h1 style={{ fontSize: 90, fontWeight: 900, margin: 0, letterSpacing: '2px', background: textGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 25px rgba(170, 0, 255, 0.7))' }}>
            ОБУЧЕНИЕ
         </h1>
         <p style={{ color: '#fff', fontSize: 24, fontFamily: 'sans-serif', marginTop: 15, opacity: 0.8, letterSpacing: '1px' }}>
            Алгоритмы ищут связи, выделяют <br/> признаки и учатся на примерах.
         </p>
      </div>

    </AbsoluteFill>
  );
};
