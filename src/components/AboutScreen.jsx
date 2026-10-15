/**
 * UYIR KOLAM - ABOUT / INFORMATION SCREEN (PANEL 5 EXACT MATCH)
 * Warm parchment background with lotus and botanical branches on right,
 * 4 traditional informational cards, and Back to Home control.
 */

import React from 'react';
import { ArrowLeft, Flower2, Sprout, Heart, Compass } from 'lucide-react';
import { LotusCornerIllustration, AnimatedButterfly, FoliageTopFraming } from './BotanicalAssets';

export default function AboutScreen({ onBack = () => {} }) {
  const sections = [
    {
      icon: <Flower2 size={24} color="#718A62" />,
      title: 'Inspired by Tradition',
      text: 'Kolam is a sacred art form in South India, traditionally drawn with rice flour to welcome good energy, prosperity and harmony.'
    },
    {
      icon: <Sprout size={24} color="#2A5A43" />,
      title: 'How It Works',
      text: 'Your actions — drawing lines, connecting dots and creating patterns — trigger natural animations like flowers, vines, lights and butterflies.'
    },
    {
      icon: <Heart size={24} color="#E99A78" />,
      title: 'The Feeling',
      text: 'We hope this experience brings you joy, calm and a sense of wonder — turning a simple moment into something special.'
    },
    {
      icon: <Compass size={24} color="#F6C66B" />,
      title: 'Current Prototype',
      text: 'This is a working prototype built for the DJXHack challenge. Future possibilities include camera recognition, physical projections and more interactive elements.'
    }
  ];

  return (
    <div
      className="about-screen"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F3E8CE',
        backgroundImage: 'radial-gradient(circle at 80% 25%, #FAF2DF 0%, #F3E8CE 60%, #E8D9B7 100%)',
        color: '#0B281E',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(24px, 5vw, 60px)',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Sunlight foliage shadow overlay */}
      <div className="sunlight-shadow-overlay" />
      <FoliageTopFraming />

      {/* Fluttering Butterfly */}
      <AnimatedButterfly type="gold" x={120} y={160} scale={0.8} />

      {/* Botanical Lotus on Right */}
      <LotusCornerIllustration size={280} />

      {/* Main Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
            fontWeight: 700,
            color: '#0B281E',
            margin: '0 0 32px'
          }}
        >
          About Uyir Kolam
        </h1>

        {/* 4 Story Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', width: '100%' }}>
          {sections.map((sec, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(11, 40, 30, 0.08)'
                }}
              >
                {sec.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.12rem',
                    fontWeight: 600,
                    color: '#0B281E',
                    margin: 0
                  }}
                >
                  {sec.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.94rem',
                    lineHeight: 1.6,
                    color: 'rgba(11, 40, 30, 0.85)',
                    margin: 0,
                    maxWidth: '540px'
                  }}
                >
                  {sec.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Button */}
        <div style={{ marginTop: '40px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={onBack}
            className="btn"
            style={{
              background: '#FFFFFF',
              color: '#0B281E',
              border: '1px solid rgba(11, 40, 30, 0.25)',
              padding: '12px 32px',
              fontSize: '0.98rem',
              fontWeight: 500,
              boxShadow: '0 4px 14px rgba(11, 40, 30, 0.08)'
            }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
