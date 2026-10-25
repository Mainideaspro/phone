import React, { useRef } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';

// --- КОМПОНЕНТ 3D-КУБА ---
const RotatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Эта функция вызывается каждый кадр для вращения
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Вращение по горизонтали (Y) и вертикали (X)
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      {/* Сам куб со скругленными краями (синий, как на фото) */}
      <RoundedBox 
        ref={meshRef} 
        args={[3, 3, 3]} // Размер куба
        radius={0.1}    // Радиус скругления краев
        smoothness={4}  // Плавность скругления
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial color="#38bdf8" roughness={0.4} metalness={0.1} />
        
        {/* Текст на гранях (можно менять) */}
        <Text position={[0, 0, 1.51]} fontSize={0.8} color="#0284c7" fontWeight="bold">
          20 mm
        </Text>
        <Text position={[1.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={1} color="#0284c7" fontWeight="bold">
          X
        </Text>
      </RoundedBox>
    </group>
  );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export const MainVideo: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#e5e5e5' }}>
      {/* 3D-Холст */}
      <ThreeCanvas 
        width={width} 
        height={height} 
        shadows 
        camera={{ position: [0, 0, 10], fov: 45 }}
      >
        {/* Освещение */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]} 
        />

        {/* Вращающийся куб */}
        <RotatingCube />

        {/* Пол с сеткой (как на фото) */}
        <Grid 
          position={[0, -2.5, 0]} 
          args={[20, 20]} 
          cellSize={0.5} 
          cellThickness={0.5} 
          cellColor="#000000" 
          sectionSize={2} 
          sectionThickness={1} 
          sectionColor="#000000" 
          fadeDistance={25} 
          fadeStrength={1} 
        />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
