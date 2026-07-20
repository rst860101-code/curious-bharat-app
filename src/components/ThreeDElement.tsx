import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
// @ts-ignore
import spriteImage from '../assets/images/kalu_and_buddhu_1784268211413.jpg';

export type ThreeDElementType = 
  | 'priceTag' 
  | 'trophy' 
  | 'trophy2'
  | 'medal'
  | 'cap' 
  | 'questionMark' 
  | 'helpMan'
  | 'car' 
  | 'blueCar'
  | 'motorcycle'
  | 'tree' 
  | 'smallTree'
  | 'robot' 
  | 'boy'
  | 'runningBoy'
  | 'backpackBoy'
  | 'shortsBoy'
  | 'skirtGirl'
  | 'walkingGirl'
  | 'medalGirl'
  | 'bottleGirl';

interface ThreeDElementProps {
  type: ThreeDElementType;
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  colorOverride?: string;
}

const SPRITE_MAP: Record<ThreeDElementType, { x: string; y: string; zoom: string; label: string }> = {
  // Row 1: Students & Robots
  runningBoy: { x: '5.0%', y: '16.0%', zoom: '900%', label: 'Runner' },
  boy: { x: '18.2%', y: '15.5%', zoom: '900%', label: 'Pointer' },
  backpackBoy: { x: '29.0%', y: '15.5%', zoom: '900%', label: 'Student' },
  shortsBoy: { x: '39.0%', y: '15.5%', zoom: '900%', label: 'Scholar' },
  skirtGirl: { x: '48.5%', y: '15.5%', zoom: '900%', label: 'Waving' },
  walkingGirl: { x: '57.0%', y: '15.5%', zoom: '900%', label: 'Explorer' },
  medalGirl: { x: '67.0%', y: '15.5%', zoom: '900%', label: 'Achiever' },
  bottleGirl: { x: '77.0%', y: '15.5%', zoom: '900%', label: 'Study Buddy' },
  robot: { x: '88.5%', y: '15.5%', zoom: '900%', label: 'Bharat AI' },

  // Row 2: Questions, Cars, Motorcycles, Caps
  questionMark: { x: '6.5%', y: '49.5%', zoom: '950%', label: 'Query' },
  helpMan: { x: '19.5%', y: '49.5%', zoom: '950%', label: 'Guidance' },
  car: { x: '38.5%', y: '53.5%', zoom: '800%', label: 'Velocity' },
  motorcycle: { x: '57.5%', y: '53.5%', zoom: '800%', label: 'Acceleration' },
  blueCar: { x: '76.5%', y: '53.5%', zoom: '800%', label: 'Physics' },
  cap: { x: '89.5%', y: '44.5%', zoom: '850%', label: 'Graduate' },

  // Row 3: Trees, Tags, Stickers, Trophies, Medals
  tree: { x: '10.5%', y: '80.0%', zoom: '700%', label: 'Biology' },
  smallTree: { x: '24.5%', y: '80.0%', zoom: '700%', label: 'Plant Life' },
  priceTag: { x: '44.5%', y: '80.5%', zoom: '1000%', label: 'Premium' },
  trophy: { x: '94.5%', y: '74.5%', zoom: '850%', label: 'Grand Trophy' },
  trophy2: { x: '85.5%', y: '80.5%', zoom: '850%', label: 'Merit Trophy' },
  medal: { x: '76.0%', y: '80.5%', zoom: '850%', label: 'Top Medal' }
};

const getGlowStyles = (type: ThreeDElementType) => {
  if (type.includes('trophy') || type === 'medal') {
    return 'from-amber-400/40 via-yellow-500/15 to-transparent';
  }
  if (type.includes('Girl') || type === 'skirtGirl' || type === 'walkingGirl' || type === 'medalGirl' || type === 'bottleGirl') {
    return 'from-rose-500/35 via-pink-500/15 to-transparent';
  }
  if (type.includes('Boy') || type === 'boy' || type === 'runningBoy' || type === 'backpackBoy' || type === 'shortsBoy') {
    return 'from-emerald-400/35 via-teal-500/15 to-transparent';
  }
  if (type === 'robot') {
    return 'from-cyan-400/40 via-blue-500/15 to-transparent';
  }
  if (type === 'questionMark' || type === 'helpMan') {
    return 'from-purple-500/40 via-violet-500/15 to-transparent';
  }
  return 'from-indigo-400/35 via-blue-500/15 to-transparent';
};

export default function ThreeDElement({
  type,
  className = 'w-full h-full',
  autoRotate = true,
  interactive = true,
  colorOverride
}: ThreeDElementProps) {
  const coords = SPRITE_MAP[type] || SPRITE_MAP.boy;
  const containerRef = useRef<HTMLDivElement>(null);

  // High-performance spring values for 3D physics tilt interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { damping: 20, stiffness: 120 });
  const rotateY = useSpring(mouseX, { damping: 20, stiffness: 120 });
  const scale = useSpring(1, { damping: 15, stiffness: 150 });

  // Page scroll parallax position
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxY = scrollY * -0.05; // Gentle reactive scroll translation

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;

    const x = (e.clientX - centerX) / (width / 2); // Ranges -1 to 1
    const y = (e.clientY - centerY) / (height / 2);

    // Limit maximum tilt angle for classy presentation
    mouseX.set(x * 18);
    mouseY.set(-y * 18);
  };

  const handlePointerEnter = () => {
    if (interactive) {
      scale.set(1.08); // Spring pop on hover
    }
  };

  const handlePointerLeave = () => {
    if (interactive) {
      scale.set(1);
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  // Staggered periods to prevent uniform floating amongst multiple elements
  const staggerFactor = (type.charCodeAt(0) % 5) * 0.4;
  const floatDuration = 3 + staggerFactor;

  const glowClass = getGlowStyles(type);

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: scale,
        y: autoRotate ? parallaxY : undefined,
        transformStyle: 'preserve-3d',
      }}
      animate={
        autoRotate
          ? {
              y: [0, -8, 0],
              rotateZ: [0, 1.2, -1.2, 0],
            }
          : {}
      }
      transition={
        autoRotate
          ? {
              y: {
                duration: floatDuration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
              rotateZ: {
                duration: floatDuration * 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }
          : undefined
      }
      className={`${className} cursor-grab active:cursor-grabbing select-none outline-none flex items-center justify-center relative`}
    >
      {/* 3D Radiant glowing aura portal behind to maximize visual pop in client preview */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${glowClass} blur-xl opacity-90 pointer-events-none scale-110`} />

      <div 
        className="w-full h-full flex items-center justify-center relative"
        style={{ transform: 'translateZ(25px)' }}
      >
        {/* Soft shadow anchor underneath to give realistic 3D hovering depth */}
        {autoRotate && (
          <div className="absolute -bottom-1 left-[15%] right-[15%] h-1 bg-black/30 blur-sm rounded-full pointer-events-none transition-transform duration-500 hover:scale-75" />
        )}
        <div className="w-full h-full overflow-hidden relative bg-transparent flex items-center justify-center">
          <div 
            style={{
              backgroundImage: `url(${spriteImage})`,
              backgroundPosition: `${coords.x} ${coords.y}`,
              backgroundSize: coords.zoom,
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%',
            }}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.div>
  );
}

