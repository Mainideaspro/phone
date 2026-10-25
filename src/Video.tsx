import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import scenesData from './scenes.json';

const FPS = 30;
const DURATION_PER_SCENE = 5 * FPS; // 5 секунд на сцену = 150 кадров

// --- КОМПОНЕНТ ОДНОЙ СЦЕНЫ ---
const Scene: React.FC<{ scene: any }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Анимация появления текста
  const textOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: 'clamp' });

  // Эффект печатной машинки (если typing: true)
  const charsToShow = scene.typing 
    ? Math.floor(interpolate(frame, [10, 60], [0, scene.title.length], { extrapolateRight: 'clamp' }))
    : scene.title.length;

  const displayTitle = scene.title.slice(0, charsToShow);

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* ФОНОВЫЕ ЭФФЕКТЫ (в зависимости от поля "effect") */}
      {scene.effect === 'orbits' && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
           {[1, 2, 3].map(i => (
             <div key={i} style={{ position: 'absolute', width: i * 200, height: i * 200, border: `1px solid ${scene.accent}40`, borderRadius: '50%', transform: `rotate(${frame * (0.5 * i)}deg)` }}>
               <div style={{ width: 10, height: 10, backgroundColor: scene.accent, borderRadius: '50%', position: 'absolute', top: -5, left: '50%', boxShadow: `0 0 20px ${scene.accent}` }} />
             </div>
           ))}
        </AbsoluteFill>
      )}

      {scene.effect === 'neurons' && (
        <AbsoluteFill style={{ opacity: 0.4 }}>
           {Array.from({ length: 20 }).map((_, i) => {
             const x1 = Math.sin(i + frame / 50) * 400 + 540;
             const y1 = Math.cos(i + frame / 50) * 400 + 540;
             const x2 = Math.sin(i + 2 + frame / 50) * 400 + 540;
             const y2 = Math.cos(i + 2 + frame / 50) * 400 + 540;
             return (
               <svg key={i} width="1080" height="1080" style={{ position: 'absolute' }}>
                 <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={scene.accent} strokeWidth="2" style={{ filter: `drop-shadow(0 0 10px ${scene.accent})` }} />
                 <circle cx={x1} cy={y1} r="4" fill="#fff" />
               </svg>
             )
           })}
        </AbsoluteFill>
      )}

      {scene.effect === 'data' && (
        <AbsoluteFill style={{ opacity: 0.3 }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const y = (frame * 10 + i * 50) % 1080;
            return <div key={i} style={{ position: 'absolute', left: `${(i * 3) % 100}%`, top: y, width: 2, height: 100, background: `linear-gradient(to bottom, transparent, ${scene.accent})` }} />
          })}
        </AbsoluteFill>
      )}

      {scene.effect === 'vortex' && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
           {Array.from({ length: 10 }).map((_, i) => (
             <div key={i} style={{ position: 'absolute', width: 100 + i * 50, height: 100 + i * 50, border: `2px solid ${scene.accent}30`, borderRadius: 20, transform: `rotate(${frame * 2 + i * 10}deg)` }} />
           ))}
        </AbsoluteFill>
      )}

      {/* Дефолтный фон для остальных эффектов (dashboard, globe, etc.) */}
      {!['orbits', 'neurons', 'data', 'vortex'].includes(scene.effect) && (
         <AbsoluteFill style={{ background: `radial-gradient(circle at center, ${scene.accent}20 0%, transparent 70%)` }} />
      )}

      {/* ТЕКСТ */}
      <div style={{ zIndex: 10, textAlign: 'center', maxWidth: 800 }}>
        <h1 style={{ 
          color: '#fff', fontSize: 70, fontFamily: 'sans-serif', fontWeight: 900, margin: 0, 
          opacity: textOpacity, transform: `translateY(${textY}px)`, 
          textShadow: `0 0 30px ${scene.accent}`,
          whiteSpace: 'pre-wrap'
        }}>
          {displayTitle}
        </h1>
        {scene.subtitle && (
          <p style={{ color: scene.accent, fontSize: 30, fontFamily: 'sans-serif', marginTop: 20, opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }) }}>
            {scene.subtitle}
          </p>
        )}
      </div>

      {/* Нижняя неоновая линия */}
      <div style={{ position: 'absolute', bottom: 100, width: interpolate(frame, [0, 50], [0, 300], { extrapolateRight: 'clamp' }), height: 4, backgroundColor: scene.accent, boxShadow: `0 0 20px ${scene.accent}` }} />

    </AbsoluteFill>
  );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ (РЕНДЕРИТ ВСЕ 10 СЦЕН) ---
export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {scenesData.map((scene, index) => (
        <Sequence 
          key={index} 
          from={index * DURATION_PER_SCENE} 
          durationInFrames={DURATION_PER_SCENE}
        >
          <Scene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
