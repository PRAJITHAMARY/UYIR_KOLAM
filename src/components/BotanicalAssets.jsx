/**
 * UYIR KOLAM - BOTANICAL & TRADITIONAL ARTWORK ASSETS
 * Vector illustrations matching the reference image:
 * - Blooming Pink Lotus with lily pads and trailing vines (Canvas Corner)
 * - Brass Kuthu Vilakku Oil Lamp with flickering flame (Welcome Corner)
 * - Animated Fluttering Butterflies (Monarch & Blue Morpho)
 * - Corner Foliage & Leaves
 */

import React from 'react';

/**
 * Blooming Pink Lotus with Leaves (for Bottom-Right Canvas Corner)
 */
export function LotusCornerIllustration({ size = 260, className = '', style = {} }) {
  return (
    <div
      className={`lotus-corner-art ${className}`}
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: `${size}px`,
        height: `${size * 0.85}px`,
        pointerEvents: 'none',
        zIndex: 5,
        ...style
      }}
    >
      <svg
        viewBox="0 0 300 250"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="lotusPinkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E99A78" />
            <stop offset="40%" stopColor="#F28D96" />
            <stop offset="100%" stopColor="#FFF0EE" />
          </linearGradient>
          <linearGradient id="leafGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A5A43" />
            <stop offset="100%" stopColor="#0E3325" />
          </linearGradient>
          <linearGradient id="leafGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#718A62" />
            <stop offset="100%" stopColor="#37684F" />
          </linearGradient>
          <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(242, 141, 150, 0.3)" />
            <stop offset="100%" stopColor="rgba(6, 29, 23, 0)" />
          </radialGradient>
        </defs>

        {/* Soft Ambient Flower Glow */}
        <circle cx="210" cy="170" r="70" fill="url(#lotusGlow)" />

        {/* Trailing Vine Stem */}
        <path
          d="M 280 250 C 260 210, 240 180, 260 130 C 270 100, 260 60, 280 20"
          fill="none"
          stroke="#2A5A43"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 230 250 C 210 230, 180 220, 150 240"
          fill="none"
          stroke="#2A5A43"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Background Leaves */}
        <g id="lotusLeaves">
          {/* Leaf 1 (Top right) */}
          <path
            d="M 265 110 C 285 90, 310 95, 305 120 C 295 130, 275 125, 265 110 Z"
            fill="url(#leafGradDark)"
            opacity="0.9"
          />
          {/* Leaf 2 (Upper vine) */}
          <path
            d="M 270 65 C 290 50, 305 60, 295 80 C 280 85, 270 75, 270 65 Z"
            fill="url(#leafGradLight)"
            opacity="0.95"
          />
          {/* Large Round Lily Pad / Lotus Leaf Base */}
          <path
            d="M 140 210 C 120 180, 160 150, 190 170 C 205 180, 200 210, 175 225 C 160 235, 145 225, 140 210 Z"
            fill="url(#leafGradDark)"
          />
          <path
            d="M 155 190 Q 170 195 185 190 M 170 175 Q 170 195 170 215"
            stroke="#4D8469"
            strokeWidth="1.2"
            fill="none"
          />
        </g>

        {/* Blooming Pink Lotus */}
        <g transform="translate(195, 150) scale(0.95)">
          {/* Outer Layer Petals */}
          <path d="M 0 15 C -25 5, -45 -10, -35 -30 C -25 -20, -5 -5, 0 15 Z" fill="url(#lotusPinkGrad)" opacity="0.9" />
          <path d="M 0 15 C 25 5, 45 -10, 35 -30 C 25 -20, 5 -5, 0 15 Z" fill="url(#lotusPinkGrad)" opacity="0.9" />
          <path d="M 0 15 C -35 2, -60 15, -40 30 C -25 25, -10 20, 0 15 Z" fill="url(#lotusPinkGrad)" opacity="0.85" />
          <path d="M 0 15 C 35 2, 60 15, 40 30 C 25 25, 10 20, 0 15 Z" fill="url(#lotusPinkGrad)" opacity="0.85" />

          {/* Middle Upright Petals */}
          <path d="M 0 15 C -18 -5, -30 -35, -15 -48 C -5 -35, 0 -15, 0 15 Z" fill="url(#lotusPinkGrad)" />
          <path d="M 0 15 C 18 -5, 30 -35, 15 -48 C 5 -35, 0 -15, 0 15 Z" fill="url(#lotusPinkGrad)" />

          {/* Central High Petal */}
          <path d="M 0 15 C -12 -15, -15 -55, 0 -62 C 15 -55, 12 -15, 0 15 Z" fill="url(#lotusPinkGrad)" />

          {/* Golden Pistil & Stamens in Core */}
          <ellipse cx="0" cy="5" rx="8" ry="5" fill="#F6C66B" />
          <circle cx="-4" cy="4" r="1.5" fill="#FFD982" />
          <circle cx="0" cy="3" r="1.5" fill="#FFD982" />
          <circle cx="4" cy="4" r="1.5" fill="#FFD982" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Traditional Brass Oil Lamp (Kuthu Vilakku / Deepam) with Flickering Flame
 */
export function BrassDeepamLamp({ className = '', style = {} }) {
  return (
    <div
      className={`brass-deepam ${className}`}
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '32px',
        width: '90px',
        height: '110px',
        pointerEvents: 'none',
        zIndex: 10,
        ...style
      }}
    >
      <svg viewBox="0 0 100 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A27429" />
            <stop offset="35%" stopColor="#F6C66B" />
            <stop offset="70%" stopColor="#DCA13D" />
            <stop offset="100%" stopColor="#875E1E" />
          </linearGradient>
          <radialGradient id="flameHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 217, 130, 0.85)" />
            <stop offset="35%" stopColor="rgba(246, 166, 74, 0.45)" />
            <stop offset="100%" stopColor="rgba(233, 154, 120, 0)" />
          </radialGradient>
        </defs>

        {/* Ambient Warm Flame Glow */}
        <circle cx="50" cy="22" r="32" fill="url(#flameHalo)" />

        {/* Flickering Golden Flame */}
        <g style={{ transformOrigin: '50px 32px', animation: 'flameFlicker 2.2s ease-in-out infinite' }}>
          {/* Outer teardrop flame */}
          <path
            d="M 50 32 C 43 30, 40 22, 50 8 C 60 22, 57 30, 50 32 Z"
            fill="#F6A64A"
          />
          {/* Inner bright yellow core */}
          <path
            d="M 50 31 C 46 29, 44 24, 50 14 C 56 24, 54 29, 50 31 Z"
            fill="#FFF4D0"
          />
        </g>

        {/* Wick */}
        <line x1="50" y1="32" x2="50" y2="35" stroke="#4A3414" strokeWidth="2" strokeLinecap="round" />

        {/* Brass Lamp Bowl (Agal) */}
        <path
          d="M 22 45 C 22 36, 78 36, 78 45 C 75 56, 62 62, 50 62 C 38 62, 25 56, 22 45 Z"
          fill="url(#brassGrad)"
          stroke="#7A5317"
          strokeWidth="1"
        />
        {/* Bowl Rim Highlight */}
        <ellipse cx="50" cy="42" rx="28" ry="6" fill="#F6C66B" stroke="#B28231" strokeWidth="1" />
        <ellipse cx="50" cy="42" rx="24" ry="4" fill="#996920" />

        {/* Stem / Pillar */}
        <path
          d="M 45 62 L 46 85 C 44 87, 44 92, 50 92 C 56 92, 56 87, 54 85 L 55 62 Z"
          fill="url(#brassGrad)"
        />

        {/* Base Tier 1 */}
        <ellipse cx="50" cy="94" rx="16" ry="4" fill="url(#brassGrad)" />
        {/* Flared Pedestal Base */}
        <path
          d="M 38 94 C 36 102, 28 106, 20 110 C 20 114, 80 114, 80 110 C 72 106, 64 102, 62 94 Z"
          fill="url(#brassGrad)"
          stroke="#7A5317"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

/**
 * Animated Fluttering Butterfly (Monarch Gold or Blue Morpho)
 */
export function AnimatedButterfly({
  type = 'gold', // 'gold' | 'blue'
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  style = {}
}) {
  const isGold = type === 'gold';
  const primaryColor = isGold ? '#F6A64A' : '#4AA5D8';
  const secondaryColor = isGold ? '#F6C66B' : '#88D2F8';
  const accentColor = isGold ? '#E99A78' : '#2A6B94';

  return (
    <div
      className="animated-butterfly"
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        zIndex: 20,
        animation: 'floatButterfly 5s ease-in-out infinite',
        ...style
      }}
    >
      <div style={{ position: 'relative', width: '48px', height: '40px' }}>
        {/* Left Wing with flutter animation */}
        <svg
          viewBox="0 0 24 36"
          style={{
            position: 'absolute',
            left: '2px',
            top: '2px',
            width: '22px',
            height: '34px',
            transformOrigin: 'right center',
            animation: 'flutterWingLeft 0.22s ease-in-out infinite'
          }}
        >
          {/* Forewing */}
          <path
            d="M 22 18 C 16 8, 4 2, 2 8 C -1 16, 8 22, 22 20 Z"
            fill={primaryColor}
            stroke="#292721"
            strokeWidth="0.8"
          />
          <path
            d="M 20 16 C 16 10, 8 6, 6 10 C 5 14, 11 18, 20 17 Z"
            fill={secondaryColor}
          />
          {/* Hindwing */}
          <path
            d="M 22 20 C 14 20, 6 26, 8 32 C 12 36, 18 30, 22 22 Z"
            fill={accentColor}
            stroke="#292721"
            strokeWidth="0.8"
          />
          {/* Wing margin dots */}
          <circle cx="5" cy="10" r="1.2" fill="#FFFFFF" />
          <circle cx="8" cy="14" r="1.2" fill="#FFFFFF" />
          <circle cx="9" cy="30" r="1" fill="#FFFFFF" />
        </svg>

        {/* Right Wing with flutter animation */}
        <svg
          viewBox="0 0 24 36"
          style={{
            position: 'absolute',
            right: '2px',
            top: '2px',
            width: '22px',
            height: '34px',
            transformOrigin: 'left center',
            animation: 'flutterWingRight 0.22s ease-in-out infinite'
          }}
        >
          {/* Forewing */}
          <path
            d="M 2 18 C 8 8, 20 2, 22 8 C 25 16, 16 22, 2 20 Z"
            fill={primaryColor}
            stroke="#292721"
            strokeWidth="0.8"
          />
          <path
            d="M 4 16 C 8 10, 16 6, 18 10 C 19 14, 13 18, 4 17 Z"
            fill={secondaryColor}
          />
          {/* Hindwing */}
          <path
            d="M 2 20 C 10 20, 18 26, 16 32 C 12 36, 6 30, 2 22 Z"
            fill={accentColor}
            stroke="#292721"
            strokeWidth="0.8"
          />
          {/* Wing margin dots */}
          <circle cx="19" cy="10" r="1.2" fill="#FFFFFF" />
          <circle cx="16" cy="14" r="1.2" fill="#FFFFFF" />
          <circle cx="15" cy="30" r="1" fill="#FFFFFF" />
        </svg>

        {/* Center Body & Antennae */}
        <svg
          viewBox="0 0 10 36"
          style={{
            position: 'absolute',
            left: '19px',
            top: '2px',
            width: '10px',
            height: '34px'
          }}
        >
          {/* Antennae */}
          <path d="M 5 12 Q 2 5 0 3" stroke="#292721" strokeWidth="1" fill="none" />
          <path d="M 5 12 Q 8 5 10 3" stroke="#292721" strokeWidth="1" fill="none" />
          {/* Head & Thorax */}
          <circle cx="5" cy="13" r="2.2" fill="#292721" />
          <ellipse cx="5" cy="20" rx="1.8" ry="5.5" fill="#3D3830" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Top Framing Botanical Foliage Branches
 */
export function FoliageTopFraming() {
  return (
    <>
      {/* Top Left Leaf Foliage */}
      <svg
        viewBox="0 0 180 180"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '180px',
          height: '180px',
          pointerEvents: 'none',
          zIndex: 4
        }}
      >
        <path
          d="M -10 -10 Q 50 30 110 80 Q 140 110 160 140"
          fill="none"
          stroke="#37684F"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Leaf clusters */}
        <path d="M 40 25 C 55 10 75 18 70 35 C 55 42 45 35 40 25 Z" fill="#718A62" opacity="0.9" />
        <path d="M 75 52 C 95 38 115 48 108 65 C 92 72 82 62 75 52 Z" fill="#2A5A43" opacity="0.85" />
        <path d="M 115 85 C 135 72 152 82 145 98 C 130 105 122 95 115 85 Z" fill="#9AA77B" opacity="0.95" />
        <path d="M 140 115 C 158 105 170 115 165 128 C 152 135 145 125 140 115 Z" fill="#2A5A43" opacity="0.8" />
      </svg>

      {/* Top Right Leaf Foliage */}
      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          pointerEvents: 'none',
          zIndex: 4
        }}
      >
        <path
          d="M 210 -10 Q 150 40 90 90 Q 50 130 30 170"
          fill="none"
          stroke="#2A5A43"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 160 30 C 145 15 125 22 130 40 C 145 46 155 38 160 30 Z" fill="#718A62" opacity="0.9" />
        <path d="M 120 62 C 100 48 80 58 88 75 C 105 82 115 72 120 62 Z" fill="#37684F" opacity="0.85" />
        <path d="M 78 98 C 60 85 45 95 50 110 C 65 118 72 108 78 98 Z" fill="#9AA77B" opacity="0.9" />
      </svg>
    </>
  );
}
