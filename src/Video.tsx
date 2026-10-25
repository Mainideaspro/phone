import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- АНИМАЦИИ ---
  // Плавное появление (первые 30 кадров)
  const entrance = spring({ frame, fps, config: { damping: 15 } });
  
  // Движение (парения) для разных элементов с разной скоростью
  const floatY1 = Math.sin(frame / 20) * 15;
  const floatY2 = Math.cos(frame / 25) * 20;
  const floatX = Math.sin(frame / 30) * 10;
  
  // Вращение куба и орбит
  const rotate = frame * 0.8;
  const rotateOrbit = frame * 0.3;

  // Анимация рисования линии на графике
  const chartProgress = interpolate(frame, [30, 120], [0, 1], { extrapolateRight: 'clamp' });
  
  // Пульсация центрального ядра
  const coreScale = interpolate(Math.sin(frame / 10), [-1, 1], [0.9, 1.1]);
  
  // Градиент для текста
  const textGradient = 'linear-gradient(90deg, #00ffff, #aa00ff)';

  return (
    <AbsoluteFill style={{ backgroundColor: '#030412', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* 1. ФОНОВЫЕ ОРБИТЫ */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
         {[400, 600, 800].map((size, i) => (
            <div key={i} style={{
               position: 'absolute', width: size, height: size, borderRadius: '50%',
               border: `1px dashed rgba(0, 255, 255, ${0.1 + i * 0.05})`,
               transform: `rotate(${rotateOrbit + i * 45}deg)`,
            }}>
               {/* Светящиеся точки на орбитах */}
               <div style={{ position: 'absolute', top: -5, left: '50%', width: 10, height: 10, borderRadius: '50%', backgroundColor: i % 2 === 0 ? '#00ffff' : '#ff00ff', boxShadow: `0 0 15px ${i % 2 === 0 ? '#00ffff' : '#ff00ff'}` }} />
            </div>
         ))}
      </AbsoluteFill>

      {/* 2. ЛЕТАЮЩИЕ ПАНЕЛИ С ГРАФИКАМИ */}
      
      {/* Панель 1: Линейный график (Слева вверху) */}
      <div style={{ 
         position: 'absolute', top: '20%', left: '15%', width: 220, height: 140, 
         background: 'rgba(10, 20, 40, 0.6)', border: '1px solid #00ffff', borderRadius: 15,
         transform: `translateY(${floatY1}px) translateX(${floatX}px)`, opacity: entrance,
         boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)', backdropFilter: 'blur(10px)', padding: 15
      }}>
         <svg width="100%" height="100%" viewBox="0 0 100 50">
            <path d="M 0,50 Q 20,10 40,30 T 80,10 L 100,20" fill="none" stroke="#00ffff" strokeWidth="3" strokeDasharray="150" strokeDashoffset={150 - (150 * chartProgress)} style={{ filter: 'drop-shadow(0 0 5px #00ffff)' }} />
         </svg>
      </div>

      {/* Панель 2: Круговая диаграмма (Справа внизу) */}
      <div style={{ 
         position: 'absolute', bottom: '25%', right: '15%', width: 180, height: 160, 
         background: 'rgba(20, 10, 40, 0.6)', border: '1px solid #aa00ff', borderRadius: 15,
         transform: `translateY(${floatY2}px) translateX(-${floatX}px)`, opacity: entrance,
         boxShadow: '0 0 20px rgba(170, 0, 255, 0.2)', backdropFilter: 'blur(10px)',
         display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
         <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#aa00ff" strokeWidth="15" strokeDasharray="250" strokeDashoffset={250 - (250 * chartProgress)} transform="rotate(-90 50 50)" style={{ filter: 'drop-shadow(0 0 5px #aa00ff)' }} />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#00ffff" strokeWidth="15" strokeDasharray="100 250" strokeDashoffset={100 - (100 * chartProgress)} transform="rotate(90 50 50)" />
         </svg>
      </div>

      {/* 3. ЦЕНТРАЛЬНЫЙ 3D КУБ */}
      <div style={{ 
         position: 'absolute', 
         transform: `scale(${entrance}) rotateX(${rotate}deg) rotateY(${rotate}deg)`,
         transformStyle: 'preserve-3d',
         width: 180, height: 180
      }}>
         {/* Грани куба */}
         <div style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid #00ffff', background: 'rgba(0, 255, 255, 0.1)', boxShadow: 'inset 0 0 40px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.4)', transform: 'translateZ(90px)' }} />
         <div style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid #00ffff', background: 'rgba(0, 255, 255, 0.1)', boxShadow: 'inset 0 0 40px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.4)', transform: 'rotateY(90deg) translateZ(90px)' }} />
         <div style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid #ff00ff', background: 'rgba(255, 0, 255, 0.1)', boxShadow: 'inset 0 0 40px rgba(255, 0, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.4)', transform: 'rotateX(90deg) translateZ(90px)' }} />
         
         {/* Светящееся ядро внутри куба */}
         <div style={{ position: 'absolute', top: 40, left: 40, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, #ffffff 0%, #00ffff 40%, transparent 80%)', transform: `translateZ(10px) scale(${coreScale})`, boxShadow: '0 0 50px #00ffff' }} />
      </div>

      {/* 4. ТЕКСТ */}
      <div style={{ position: 'absolute', bottom: 80, textAlign: 'center', zIndex: 10, opacity: entrance }}>
         <h1 style={{ 
            fontSize: 90, fontWeight: 900, margin: 0, letterSpacing: '2px',
            background: textGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(170, 0, 255, 0.6))'
         }}>
            ОБУЧЕНИЕ
         </h1>
         <p style={{ color: '#fff', fontSize: 24, fontFamily: 'sans-serif', marginTop: 15, opacity: 0.8 }}>
            Алгоритмы ищут связи, выделяют <br/> признаки и учатся на примерах.
         </p>
      </div>

    </AbsoluteFill>
  );
};
