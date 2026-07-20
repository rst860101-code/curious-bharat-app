import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
const imageUrl = '/src/assets/images/kalu_and_buddhu_1784268211413.jpg';

export type ThreeDElementType = 'priceTag' | 'trophy' | 'cap' | 'questionMark' | 'car' | 'tree' | 'robot' | 'boy';

interface ThreeDElementProps {
  type: ThreeDElementType;
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  colorOverride?: string;
}

const SPRITE_MAP: Record<ThreeDElementType, { x: string; y: string; zoom: string; label: string }> = {
  cap: { x: '88.5%', y: '34.5%', zoom: '850%', label: 'Cap' },
  trophy: { x: '94.5%', y: '74.5%', zoom: '850%', label: 'Trophy' },
  priceTag: { x: '45.5%', y: '83.5%', zoom: '1000%', label: 'Sticker' },
  questionMark: { x: '23.5%', y: '49.5%', zoom: '950%', label: 'Help' },
  car: { x: '39.5%', y: '53.5%', zoom: '800%', label: 'Sprint' },
  tree: { x: '13.2%', y: '80.0%', zoom: '700%', label: 'Growth' },
  robot: { x: '67.0%', y: '16.0%', zoom: '900%', label: 'AI Buddy' }, // Girl with water bottle as study buddy
  boy: { x: '18.2%', y: '15.5%', zoom: '900%', label: 'Explorer' }, // Boy pointing with glasses!
};

export default function ThreeDElement({
  type,
  className = 'w-full h-full',
  autoRotate = true,
  interactive = true,
  colorOverride
}: ThreeDElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance springs for hover tilt effect
  const rotateX = useSpring(0, { damping: 15, stiffness: 100 });
  const rotateY = useSpring(0, { damping: 15, stiffness: 100 });
  const scale = useSpring(1, { damping: 12, stiffness: 120 });
  
  // Page scroll tracking for parallax offset
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute parallax offset - subtle vertical translation on scroll
  const parallaxY = scrollY * -0.06;

  // Track cursor coordinates relative to center of element
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    // Normalize values between -1 and 1
    const x = (e.clientX - centerX) / (width / 2);
    const y = (e.clientY - centerY) / (height / 2);
    
    // Set rotX (vertical tilt) and rotY (horizontal tilt)
    rotateX.set(-y * 22); // Tilt up to 22 degrees
    rotateY.set(x * 22);
  };

  const handlePointerEnter = () => {
    if (interactive) {
      scale.set(1.08); // Subtle spring expansion on hover
    }
  };

  const handlePointerLeave = () => {
    if (interactive) {
      scale.set(1);
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  // Render cropped high-quality image crop from the sprite sheet
  const renderSprite = () => {
    const coords = SPRITE_MAP[type] || SPRITE_MAP.boy;
    
    return (
      <div className="w-full h-full flex items-center justify-center relative p-1.5">
        {/* Soft atmospheric backlight gradient representing high-quality glow */}
        <div className="absolute inset-2 bg-gradient-to-tr from-zinc-800 to-zinc-950 rounded-2xl -z-10 shadow-lg border border-zinc-800/60" />
        
        {/* Interactive circular/rounded viewport for the sprite */}
        <div className="w-full h-full rounded-2xl overflow-hidden relative border-2 border-zinc-700/80 hover:border-blue-500/80 shadow-md transition-colors duration-300 bg-zinc-900/40">
          <div 
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${coords.x} ${coords.y}`,
              backgroundSize: coords.zoom,
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%',
              transform: 'scale(1.02)',
              filter: 'contrast(1.08) saturate(1.12)',
            }}
            className="transition-transform duration-500 ease-out hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle aesthetic tag indicating study item */}
          <div className="absolute bottom-1 right-1.5 bg-black/80 backdrop-blur-xs text-[8px] font-bold font-mono text-zinc-400 px-1.5 py-0.5 rounded-md border border-zinc-800/80 select-none">
            {coords.label}
          </div>
        </div>
      </div>
    );
  };

  // Determine standard float values - if autoRotate is enabled, float up and down slightly
  const floatTransition = autoRotate 
    ? {
        y: {
          duration: 3 + (type.charCodeAt(0) % 3) * 0.5, // Slightly staggered periods to prevent uniformity
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut"
        },
        rotate: {
          duration: 6 + (type.charCodeAt(1) % 4),
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut"
        }
      }
    : undefined;

  const floatAnimation = autoRotate
    ? {
        y: [0, -10, 0],
        rotate: [0, 1.5, -1.5, 0]
      }
    : {};

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
        y: parallaxY, // Smooth physical vertical parallax on scroll
        transformStyle: "preserve-3d"
      }}
      animate={floatAnimation}
      transition={floatTransition}
      className={`${className} cursor-grab active:cursor-grabbing select-none outline-none flex items-center justify-center`}
    >
      <div className="w-full h-full relative" style={{ transform: "translateZ(30px)" }}>
        {renderSprite()}
      </div>
    </motion.div>
  );
}
