import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export type ThreeDElementType = 'priceTag' | 'trophy' | 'cap' | 'questionMark' | 'car' | 'tree';

interface ThreeDElementProps {
  type: ThreeDElementType;
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  colorOverride?: string;
}

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

  // Render precise Vector SVG matching the style of the user's uploaded assets
  const renderSVG = () => {
    switch (type) {
      case 'cap':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_12px_16px_rgba(0,181,188,0.15)]">
            <defs>
              <linearGradient id="capTopGrad" x1="10" y1="25" x2="90" y2="45" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00D5D5" />
                <stop offset="50%" stopColor="#00A2C2" />
                <stop offset="100%" stopColor="#024D64" />
              </linearGradient>
              <linearGradient id="capBaseGrad" x1="30" y1="45" x2="70" y2="75" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0E2F37" />
                <stop offset="100%" stopColor="#020C0F" />
              </linearGradient>
              <linearGradient id="tasselGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            {/* Skullcap base under mortarboard */}
            <path d="M 32 46 Q 50 64 68 46 L 68 56 Q 50 72 32 56 Z" fill="url(#capBaseGrad)" />
            <path d="M 32 56 Q 50 72 68 56" stroke="#00D5D5" strokeWidth="2" fill="none" opacity="0.4" />
            
            {/* Mortarboard diamond top */}
            <path d="M 50 18 L 90 35 L 50 52 L 10 35 Z" fill="url(#capTopGrad)" stroke="#00A2C2" strokeWidth="1" />
            {/* Mortarboard edge thickness/highlight */}
            <path d="M 10 35 L 50 52 L 90 35" stroke="#E5F3F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" fill="none" />
            
            {/* Tassel button in the center */}
            <circle cx="50" cy="35" r="4.5" fill="url(#tasselGrad)" stroke="#92400E" strokeWidth="1" />
            {/* Tassel string hanging down and to the right */}
            <path d="M 50 35 Q 68 38 78 48 C 80 50 82 54 81 58" stroke="url(#tasselGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Tassel fringe bulb and threads */}
            <path d="M 77 56 Q 81 58 85 56 L 82 72 Q 81 74 80 72 Z" fill="url(#tasselGrad)" stroke="#92400E" strokeWidth="0.5" />
          </svg>
        );

      case 'trophy':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_12px_20px_rgba(251,191,36,0.18)]">
            <defs>
              <linearGradient id="goldGrad1" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF3A1" />
                <stop offset="35%" stopColor="#FBBF24" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
              <linearGradient id="goldHighlight" x1="45" y1="20" x2="55" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>
              <linearGradient id="baseGrad" x1="30" y1="70" x2="70" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0E2F37" />
                <stop offset="50%" stopColor="#06181C" />
                <stop offset="100%" stopColor="#020C0F" />
              </linearGradient>
            </defs>
            
            {/* Left Handle */}
            <path d="M 30 28 C 12 28 12 50 30 50" stroke="url(#goldGrad1)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 30 32 C 18 32 18 46 30 46" stroke="#92400E" strokeWidth="1.5" fill="none" opacity="0.4" />
            
            {/* Right Handle */}
            <path d="M 70 28 C 88 28 88 50 70 50" stroke="url(#goldGrad1)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 70 32 C 82 32 82 46 70 46" stroke="#92400E" strokeWidth="1.5" fill="none" opacity="0.4" />

            {/* Main goblet cup body */}
            <path d="M 30 20 L 70 20 L 68 52 C 68 62 58 66 50 66 C 42 66 32 62 32 52 Z" fill="url(#goldGrad1)" />
            {/* Highlights for reflective metallic shine */}
            <path d="M 34 23 L 45 23 C 43 45 40 58 34 50 Z" fill="#FFFBEB" opacity="0.25" />
            <path d="M 52 23 L 63 23 C 60 45 57 58 52 50 Z" fill="#FFFBEB" opacity="0.15" />

            {/* Rim of cup */}
            <ellipse cx="50" cy="20" rx="20" ry="4" fill="url(#goldHighlight)" stroke="#D97706" strokeWidth="1" />
            
            {/* Stem */}
            <path d="M 46 66 L 54 66 L 54 78 L 46 78 Z" fill="url(#goldGrad1)" />
            <ellipse cx="50" cy="78" rx="10" ry="3" fill="url(#goldGrad1)" />
            
            {/* Pedestal Base */}
            <path d="M 34 80 L 66 80 L 70 92 L 30 92 Z" fill="url(#baseGrad)" stroke="#0E2F37" strokeWidth="1.5" />
            {/* Gold plate on base */}
            <rect x="42" y="84" width="16" height="5" rx="1" fill="url(#goldGrad1)" />
            <circle cx="50" cy="86.5" r="0.8" fill="#FFFFFF" />

            {/* Star badge in center */}
            <path d="M 50 32 L 53 39 L 60 40 L 55 45 L 56 52 L 50 48 L 44 52 L 45 45 L 40 40 L 47 39 Z" fill="#FFFBEB" filter="drop-shadow(0px 1.5px 3px rgba(217,119,6,0.6))" />
          </svg>
        );

      case 'priceTag':
        const finalColor = colorOverride || '#EF4444';
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_12px_16px_rgba(239,68,68,0.18)]">
            <defs>
              <linearGradient id="redGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={finalColor} />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            <g transform="rotate(-15 50 50)">
              {/* Tilted price tag body */}
              <path d="M 30 25 L 56 25 Q 60 25 62 28 L 74 44 Q 76 47 74 50 L 50 85 Q 47 89 43 85 L 18 50 Q 16 47 18 44 Z" fill="url(#redGrad)" stroke="#7F1D1D" strokeWidth="1" />
              {/* White dashed stitching */}
              <path d="M 32 29 L 54 29 L 69 46 L 47 79 L 23 46 Z" stroke="#FFF5F5" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.85" fill="none" />
              {/* Metal eyelet */}
              <circle cx="45" cy="38" r="6.5" fill="url(#silverGrad)" />
              <circle cx="45" cy="38" r="3" fill="#991B1B" />
              {/* Thread line trailing */}
              <path d="M 45 38 C 48 28 55 12 66 16 C 76 19 69 32 56 26" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
            </g>
          </svg>
        );

      case 'questionMark':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_12px_20px_rgba(245,158,11,0.22)]">
            <defs>
              <linearGradient id="qGold" x1="20" y1="20" x2="80" y2="80">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="40%" stopColor="#FBBF24" />
                <stop offset="75%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
              <linearGradient id="qShine" x1="30" y1="20" x2="40" y2="50">
                <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFFBEB" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Plump, friendly glossy question mark */}
            <path d="M 28 36 C 28 19 42 15 50 15 C 64 15 72 25 72 37 C 72 49 58 51 56 61 L 56 65 L 44 65 L 44 57 C 44 45 58 43 58 35 C 58 30 54 27 50 27 C 44 27 40 30 40 35 Z" fill="url(#qGold)" />
            {/* 3D Glass / Gloss highlighting */}
            <path d="M 31 36 C 31 21 43 18 50 18 C 58 18 66 23 67 33 C 64 25 56 21 50 21 C 43 21 35 25 34 35 Z" fill="url(#qShine)" />
            {/* Dot bottom */}
            <circle cx="50" cy="79" r="7.5" fill="url(#qGold)" />
            <circle cx="47.5" cy="76.5" r="3.2" fill="#FFFBEB" opacity="0.45" />
          </svg>
        );

      case 'car':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_14px_20px_rgba(0,181,188,0.18)]">
            <defs>
              <linearGradient id="carBody" x1="10" y1="50" x2="90" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient id="glassGrad" x1="40" y1="35" x2="60" y2="50">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020C0F" />
              </linearGradient>
              <linearGradient id="wheelGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#020C0F" />
              </linearGradient>
            </defs>

            {/* Road ambient shadow */}
            <ellipse cx="50" cy="75" rx="36" ry="6.5" fill="#000000" opacity="0.4" filter="blur(3.5px)" />

            {/* Wheels */}
            <circle cx="28" cy="68" r="9.5" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="28" cy="68" r="5" fill="#94A3B8" />
            <circle cx="28" cy="68" r="2" fill="#475569" />
            
            <circle cx="72" cy="68" r="9.5" fill="url(#wheelGrad)" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="72" cy="68" r="5" fill="#94A3B8" />
            <circle cx="72" cy="68" r="2" fill="#475569" />

            {/* Sleek aerodynamic sports car body */}
            <path d="M 12 62 C 12 58 18 55 24 54 C 28 41 38 33 50 33 C 64 33 74 43 78 54 C 84 55 88 58 88 62 C 88 68 82 72 78 72 L 22 72 C 18 72 12 68 12 62 Z" fill="url(#carBody)" />
            
            {/* Window glass cabin */}
            <path d="M 33 53 C 33 45 38 39 48 38 C 58 37 65 41 67 53 Z" fill="url(#glassGrad)" />
            {/* Window pillar */}
            <path d="M 50 38 L 51.5 53" stroke="#475569" strokeWidth="2" />
            {/* Highlight shine */}
            <path d="M 37 47 C 41 41 47 41 49 41" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" fill="none" />

            {/* Vibrant futuristic neon yellow/cyan headlight */}
            <path d="M 82 58 C 85 58 88 61 88 64 C 85 64 82 62 82 58 Z" fill="#00D5D5" filter="drop-shadow(0 0 4px #00D5D5)" />
            {/* Tail light */}
            <path d="M 12 62 C 12 60 14 59 16 59 Z" fill="#EF4444" />

            {/* Character styling side door line */}
            <path d="M 38 62 L 62 62" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 38 64 L 62 64" stroke="#FCA5A5" strokeWidth="1" opacity="0.3" />
          </svg>
        );

      case 'tree':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_12px_18px_rgba(16,185,129,0.18)]">
            <defs>
              <linearGradient id="leavesBottom" x1="30" y1="30" x2="70" y2="70">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064E3B" />
              </linearGradient>
              <linearGradient id="leavesMid" x1="20" y1="20" x2="80" y2="60">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="leavesTop" x1="30" y1="10" x2="70" y2="50">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="trunkGrad" x1="45" y1="50" x2="55" y2="90">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
            </defs>
            
            {/* Base ambient shadow under the tree */}
            <ellipse cx="50" cy="88" rx="22" ry="4" fill="#000000" opacity="0.25" filter="blur(2.5px)" />

            {/* Tree trunk and structured branching */}
            <path d="M 46 88 L 54 88 L 53 62 C 58 58 64 54 66 48 L 61 46 C 58 50 53 54 51 58 L 49 58 C 47 54 42 50 39 46 L 34 48 C 36 54 42 58 47 62 Z" fill="url(#trunkGrad)" stroke="#451A03" strokeWidth="0.5" />
            
            {/* Fluffy, layered cartoon cloud foliage (matches bottom-left tree of the PNG) */}
            <circle cx="36" cy="56" r="15" fill="url(#leavesBottom)" />
            <circle cx="64" cy="56" r="15" fill="url(#leavesBottom)" />
            
            <circle cx="28" cy="42" r="16" fill="url(#leavesMid)" />
            <circle cx="72" cy="42" r="16" fill="url(#leavesMid)" />
            <circle cx="50" cy="46" r="18" fill="url(#leavesMid)" />

            <circle cx="38" cy="28" r="15" fill="url(#leavesTop)" />
            <circle cx="62" cy="28" r="15" fill="url(#leavesTop)" />
            <circle cx="50" cy="22" r="16" fill="url(#leavesTop)" />
            
            {/* Organic details / highlights for rich cartoon finish */}
            <circle cx="48" cy="18" r="2.2" fill="#D1FAE5" opacity="0.65" />
            <circle cx="34" cy="24" r="1.5" fill="#D1FAE5" opacity="0.5" />
            <circle cx="64" cy="24" r="1.5" fill="#D1FAE5" opacity="0.5" />
            <circle cx="53" cy="40" r="1.8" fill="#A7F3D0" opacity="0.4" />
          </svg>
        );

      default:
        return null;
    }
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
        {renderSVG()}
      </div>
    </motion.div>
  );
}
