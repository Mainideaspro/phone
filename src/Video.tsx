import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

// Встроенные данные сцен
const SCENES = [
  {"title":"ЗАРОЖДЕНИЕ ИИ", "subtitle":"Всё начинается с искры, данных и энергии.", "effect":"orbits", "typing":false, "accent":"#00edff"},
  {"title":"Что, если машина\nнаучится думать?", "subtitle":"Искусственный интеллект меняет способ создавать, анализировать и решать.", "effect":"neurons", "typing":true, "accent":"#e946fa"},
  {"title":"ДАННЫЕ", "subtitle":"Тексты, изображения и сигналы становятся топливом модели.", "effect":"data", "typing":false, "accent":"#00edff"},
  {"title":"ОБУЧЕНИЕ", "subtitle":"Алгоритмы находят связи и закономерности.", "effect":"training", "typing":false, "accent":"#bb52ff"},
  {"title":"ПОНИМАНИЕ", "subtitle":"Нейросеть формирует прогнозы и выводы.", "effect":"neurons", "typing":true, "accent":"#28dbff"},
  {"title":"ИИ В ДЕЙСТВИИ", "subtitle":"Из данных — в понятные решения.", "effect":"dashboard", "typing":true, "accent":"#00edff"},
  {"title":"РОСТ", "subtitle":"ИИ помогает ускорять процессы и находить возможности.", "effect":"growth", "typing":false, "accent":"#e946fa"},
  {"title":"МАСШТАБ", "subtitle":"Люди, сервисы и системы соединяются в единую сеть.", "effect":"globe", "typing":false, "accent":"#34deff"},
  {"title":"ГЕНЕРАЦИЯ", "subtitle":"Новые идеи рождаются из сочетания данных и моделей.", "effect":"vortex", "typing":true, "accent":"#e946fa"},
  {"title":"БУДУЩЕЕ\nУЖЕ ЗДЕСЬ", "subtitle":"Искусственный интеллект — математика в действии.", "effect":"mandala", "typing":true, "accent":"#00edff"}
];

const FPS = 30;
const DURATION_PER_SCENE = 5 * FPS;

const Scene: React.FC<{ scene: any }> = ({ scene }) => {
  const frame = useCurrentFrame();
  
  const textOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const charsToShow = scene.typing ? Math.floor(interpolate(frame, [10, 60], [0, scene.title.length], { extrapolateRight: 'clamp' })) : scene.title.length;
  const displayTitle = scene.title.slice(0, charsToShow);

  return (
    <AbsoluteFill style={{ backgroundColor: '#02030a', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* ФОНОВОЕ СВЕЧЕНИЕ (Добавляет глубины) */}
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, ${scene.accent}15 0%, transparent 60%)`, filter: 'blur(40px)' }} />

      {/* УЛУЧШЕННЫЙ ЭФФЕКТ НЕЙРОНОВ (как на 1 картинке) */}
      {scene.effect === 'neurons' && (
        <AbsoluteFill style={{ opacity: 0.8 }}>
           {/* Мягкие размытые линии на фоне */}
           {Array.from({ length: 15 }).map((_, i) => {
             const angle = (i / 15) * Math.PI * 2 + frame / 100;
             const x2 = Math.sin(angle) * 500 + 540;
             const y2 = Math.cos(angle) * 500 + 540;
             return (
               <svg key={`blur-${i}`} width="1080" height="1080" style={{ position: 'absolute' }}>
                 <path d={`M 540,540 Q ${x2/2 + 100},${y2/2 - 100} ${x2},${y2}`} fill="none" stroke={scene.accent} strokeWidth="8" style={{ filter: `blur(10px)` }} />
               </svg>
             )
           })}
           {/* Четкие линии сверху */}
           {Array.from({ length: 15 }).map((_, i) => {
             const angle = (i / 15) * Math.PI * 2 + frame / 100;
             const x2 = Math.sin(angle) * 500 + 540;
             const y2 = Math.cos(angle) * 500 + 540;
             return (
               <svg key={`sharp-${i}`} width="1080" height="1080" style={{ position: 'absolute' }}>
                 <path d={`M 540,540 Q ${x2/2 + 100},${y2/2 - 100} ${x2},${y2}`} fill="none" stroke={scene.accent} strokeWidth="2" style={{ filter: `drop-shadow(0 0 5px ${scene.accent})` }} />
                 <circle cx={x2} cy={y2} r="6" fill="#fff" style={{ filter: `drop-shadow(0 0 10px ${scene.accent})` }} />
               </svg>
             )
           })}
           {/* Центральное ядро */}
           <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', backgroundColor: scene.accent, boxShadow: `0 0 80px ${scene.accent}, 0 0 150px ${scene.accent}`, left: 500, top: 500 }} />
        </AbsoluteFill>
      )}

      {/* ОСТАЛЬНЫЕ ЭФФЕКТЫ (Немного улучшены) */}
      {scene.effect === 'orbits' && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
           {[1, 2, 3].map(i => (
             <div key={i} style={{ position: 'absolute', width: i * 250, height: i * 250, border: `1px solid ${scene.accent}50`, borderRadius: '50%', transform: `rotate(${frame * (0.5 * i)}deg)`, boxShadow: `inset 0 0 20px ${scene.accent}20` }}>
               <div style={{ width: 15, height: 15, backgroundColor: scene.accent, borderRadius: '50%', position: 'absolute', top: -7.5, left: '50%', boxShadow: `0 0 30px ${scene.accent}` }} />
             </div>
           ))}
        </AbsoluteFill>
      )}

      {scene.effect === 'vortex' && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
           {Array.from({ length: 12 }).map((_, i) => (
             <div key={i} style={{ position: 'absolute', width: 100 + i * 60, height: 100 + i * 60, border: `2px solid ${scene.accent}40`, borderRadius: 30, transform: `rotate(${frame * 2 + i * 15}deg)`, boxShadow: `inset 0 0 15px ${scene.accent}20` }} />
           ))}
        </AbsoluteFill>
      )}

      {/* Текст с глубокой тенью */}
      <div style={{ zIndex: 10, textAlign: 'center', maxWidth: 900 }}>
        <h1 style={{ 
          color: '#fff', fontSize: 80, fontFamily: 'sans-serif', fontWeight: 900, margin: 0, 
          opacity: textOpacity, 
          textShadow: `0 0 40px ${scene.accent}, 0 0 80px ${scene.accent}`,
          whiteSpace: 'pre-wrap',
          letterSpacing: '-1px'
        }}>
          {displayTitle}
        </h1>
        {scene.subtitle && (
          <p style={{ color: '#fff', opacity: interpolate(frame, [30, 60], [0, 0.7], { extrapolateRight: 'clamp' }), fontSize: 32, fontFamily: 'sans-serif', marginTop: 20, letterSpacing: '1px' }}>
            {scene.subtitle}
          </p>
        )}
      </div>

      {/* Линия снизу */}
      <div style={{ position: 'absolute', bottom: 100, width: interpolate(frame, [0, 50], [0, 400], { extrapolateRight: 'clamp' }), height: 4, backgroundColor: scene.accent, boxShadow: `0 0 30px ${scene.accent}` }} />

    </AbsoluteFill>
  );
};

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {SCENES.map((scene, index) => (
        <Sequence key={index} from={index * DURATION_PER_SCENE} durationInFrames={DURATION_PER_SCENE}>
          <Scene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
