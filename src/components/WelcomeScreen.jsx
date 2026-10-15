/**
 * UYIR KOLAM - WELCOME SCREEN (PANEL 1 EXACT MATCH)
 * Warm parchment background with sunlight foliage shadows,
 * brass deepam oil lamp on stone step, editorial serif title,
 * and glowing living kolam centerpiece with fluttering butterfly.
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import {
  LotusCornerIllustration,
  BrassDeepamLamp,
  AnimatedButterfly,
  FoliageTopFraming
} from './BotanicalAssets';
import { soundEngine } from '../audio/soundEngine';

export default function WelcomeScreen({ onBegin = () => {}, onOpenStory = () => {} }) {
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);

  const handleToggleSound = () => {
    soundEngine.init();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div
      className="welcome-screen"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F3E8CE',
        backgroundImage: 'radial-gradient(circle at 75% 20%, #FAF2DF 0%, #F3E8CE 55%, #E8D9B7 100%)',
        color: '#0B281E',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(20px, 4vw, 40px)',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Sunlight & Foliage Shadows */}
      <div className="sunlight-shadow-overlay" />
      <FoliageTopFraming />

      {/* 2. Top Navigation Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 20
        }}
      >
        <button
          onClick={handleToggleSound}
          className="btn-icon"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            border: '1px solid rgba(11, 40, 30, 0.15)',
            color: '#0B281E',
            width: '40px',
            height: '40px'
          }}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label="Sound Toggle"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </header>

      {/* 3. Main Split Layout (Left: Text & Actions / Right: Glowing Living Kolam) */}
      <main
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: 'clamp(32px, 5vw, 64px)',
          position: 'relative',
          zIndex: 10,
          padding: '20px 0'
        }}
      >
        {/* Left Column: Editorial Typography & Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            maxWidth: '520px'
          }}
        >
          {/* Main Title Stack */}
          <div style={{ lineHeight: 0.9 }}>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3.8rem, 8.5vw, 6.2rem)',
                fontWeight: 700,
                color: '#0B281E',
                letterSpacing: '0.04em',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              UYIR
            </h1>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3.8rem, 8.5vw, 6.2rem)',
                fontWeight: 700,
                color: '#0B281E',
                letterSpacing: '0.04em',
                margin: 0,
                textTransform: 'uppercase',
                marginTop: '4px'
              }}
            >
              KOLAM
            </h1>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
              fontStyle: 'italic',
              color: '#2A5A43',
              margin: '6px 0 2px'
            }}
          >
            Every Line Brings a Little Life.
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
              lineHeight: 1.6,
              color: 'rgba(11, 40, 30, 0.85)',
              margin: '0 0 12px',
              maxWidth: '440px'
            }}
          >
            Draw a kolam and watch it come alive with flowers, vines, lights and a little magic.
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px' }}>
            <button
              onClick={() => {
                soundEngine.init();
                soundEngine.playBloomChime();
                onBegin();
              }}
              className="btn btn-forest-cta"
            >
              Begin Your Kolam
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onOpenStory}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 2px',
                fontFamily: 'var(--font-serif)',
                fontSize: '0.98rem',
                color: '#0B281E',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                cursor: 'pointer',
                opacity: 0.85,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
            >
              Explore the Experience
            </button>
          </div>
        </div>

        {/* Right Column: Central Glowing Kolam Artwork with Flowers & Butterfly */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            minHeight: '380px'
          }}
        >
          {/* Animated Monarch/Gold Butterfly in upper right */}
          <AnimatedButterfly
            type="gold"
            x={180}
            y={-10}
            scale={0.9}
            rotation={15}
            style={{ position: 'absolute' }}
          />

          {/* Symmetrical Glowing Kolam Artwork (SVG) */}
          <div
            style={{
              width: 'clamp(280px, 42vw, 460px)',
              height: 'clamp(280px, 42vw, 460px)',
              position: 'relative'
            }}
          >
            <svg
              viewBox="0 0 400 400"
              style={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
                filter: 'drop-shadow(0 0 16px rgba(246, 198, 107, 0.45))'
              }}
            >
              <defs>
                <filter id="goldenBloom" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 217, 130, 0.95)" />
                  <stop offset="30%" stopColor="rgba(246, 198, 107, 0.55)" />
                  <stop offset="100%" stopColor="rgba(255, 217, 130, 0)" />
                </radialGradient>
              </defs>

              {/* Central Starlight Radiance */}
              <circle cx="200" cy="200" r="45" fill="url(#centerGlow)" />

              {/* 4 Sacred Looping Petals / Ribbons */}
              {[0, 90, 180, 270].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 200 200)`}>
                  {/* Glowing Stroke (Halo layer) */}
                  <path
                    d="M 200 200 C 140 140, 130 90, 200 50 C 270 90, 260 140, 200 200 Z"
                    fill="none"
                    stroke="#F6C66B"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.45"
                  />
                  {/* Glowing Stroke (Crisp core) */}
                  <path
                    d="M 200 200 C 140 140, 130 90, 200 50 C 270 90, 260 140, 200 200 Z"
                    fill="none"
                    stroke="#FFFDF6"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#goldenBloom)"
                  />

                  {/* Curving Vine Tendrils & Leaves */}
                  <path
                    d="M 170 120 C 140 100, 120 70, 135 45"
                    fill="none"
                    stroke="#718A62"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <ellipse cx="132" cy="46" rx="6" ry="3" transform="rotate(-35 132 46)" fill="#718A62" />

                  {/* Blooming Coral & Pink Flowers on Junctions */}
                  <g transform="translate(200, 50) scale(0.9)">
                    {[0, 72, 144, 216, 288].map((fAngle) => (
                      <ellipse
                        key={fAngle}
                        cx="0"
                        cy="-8"
                        rx="4"
                        ry="7"
                        transform={`rotate(${fAngle})`}
                        fill="#F28D96"
                      />
                    ))}
                    <circle cx="0" cy="0" r="4.5" fill="#F6C66B" />
                    <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                  </g>

                  {/* Side Bud Flower */}
                  <g transform="translate(145, 145) scale(0.7)">
                    {[0, 90, 180, 270].map((fAngle) => (
                      <ellipse
                        key={fAngle}
                        cx="0"
                        cy="-7"
                        rx="3.5"
                        ry="6"
                        transform={`rotate(${fAngle})`}
                        fill="#E99A78"
                      />
                    ))}
                    <circle cx="0" cy="0" r="3.5" fill="#F6C66B" />
                  </g>

                  {/* Golden Starlight Node Dot */}
                  <circle cx="200" cy="95" r="4" fill="#FFD982" filter="url(#goldenBloom)" />
                  <circle cx="200" cy="95" r="2" fill="#FFFFFF" />
                </g>
              ))}

              {/* Central Auspicious Star */}
              <circle cx="200" cy="200" r="6" fill="#F6C66B" />
              <circle cx="200" cy="200" r="3" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      </main>

      {/* 4. Bottom Decorative Threshold Details */}
      {/* Brass Deepam Lamp (Bottom Left) */}
      <BrassDeepamLamp />

      {/* Lotus & Leaves (Bottom Right) */}
      <LotusCornerIllustration size={240} />

      {/* Subtle Bottom Threshold Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.82rem',
          color: 'rgba(11, 40, 30, 0.65)',
          position: 'relative',
          zIndex: 10,
          paddingTop: '16px'
        }}
      >
        <span>Inspired by South Indian threshold rituals • Made with HTML5 Canvas & Web Audio</span>
      </div>
    </div>
  );
}
