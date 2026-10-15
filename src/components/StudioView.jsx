/**
 * UYIR KOLAM - CREATION STUDIO & REVEAL VIEW (PANELS 2, 3, 4, 6 EXACT MATCH)
 * Deep forest green canvas with subtle dot grid,
 * left vertical dock (brush, swatches, stroke wave, dot grid toggle),
 * top bar with Undo / Clear, bottom pattern carousel, and reveal controls.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Undo2,
  Trash2,
  PenLine,
  Activity,
  Download,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Volume2,
  VolumeX,
  Eye,
  ArrowLeft
} from 'lucide-react';
import DrawingCanvas from './DrawingCanvas';
import { LotusCornerIllustration } from './BotanicalAssets';
import { STARTER_PATTERNS } from '../engine/starterPatterns';
import { COLOR_PALETTE } from '../engine/botanicalLife';
import { soundEngine } from '../audio/soundEngine';

export default function StudioView({ onBackToWelcome = () => {}, onOpenAbout = () => {} }) {
  // Brush & Tool States
  const [brushColor, setBrushColor] = useState(COLOR_PALETTE.ivoryCore);
  const [brushSize, setBrushSize] = useState(2.8);
  const [showGrid, setShowGrid] = useState(true);
  const [symmetry, setSymmetry] = useState('none'); // 'none' | '4-fold'
  const [isEraser, setIsEraser] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);

  // Experience Mode: 'drawing' | 'reveal'
  const [isRevealMode, setIsRevealMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Strokes & Canvas Ref
  const [strokes, setStrokes] = useState([]);
  const canvasRef = useRef(null);

  // Pattern index for carousel
  const [patternPage, setPatternPage] = useState(0);

  // Color Swatches from Reference Truth
  const swatches = [
    { label: 'Coral Flower', value: COLOR_PALETTE.flowerCoral },
    { label: 'Warm Gold', value: COLOR_PALETTE.warmGold },
    { label: 'Antique Ivory', value: COLOR_PALETTE.ivoryCore }
  ];

  // Sound toggle
  const handleToggleSound = () => {
    soundEngine.init();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Undo
  const handleUndo = () => {
    if (window.__UYIR_KOLAM__?.undo) {
      window.__UYIR_KOLAM__.undo();
    }
  };

  // Clear
  const handleClear = () => {
    if (window.__UYIR_KOLAM__?.clear) {
      window.__UYIR_KOLAM__.clear();
    }
    setIsRevealMode(false);
  };

  // Load Pattern from carousel
  const handleSelectPattern = (pattern) => {
    if (window.__UYIR_KOLAM__?.loadPattern) {
      window.__UYIR_KOLAM__.loadPattern(pattern);
      if (pattern.recommendedGrid !== undefined) {
        setShowGrid(pattern.recommendedGrid);
      }
    }
  };

  // Export PNG
  const handleExportPNG = () => {
    if (window.__UYIR_KOLAM__?.exportPNG) {
      window.__UYIR_KOLAM__.exportPNG('uyir-kolam-living-art.png');
    }
  };

  // Keyboard Shortcuts (Ctrl+Z for Undo)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      }
      if (e.key === 'Escape') {
        setIsRevealMode(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [strokes]);

  return (
    <div
      className="studio-viewport"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#061D17',
        color: '#F8F3E7',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* 1. TOP HEADER BAR (Exact Match to Panels 2, 3, 4, 6) */}
      <header
        style={{
          height: '56px',
          padding: '0 clamp(16px, 3vw, 32px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: 'linear-gradient(to bottom, rgba(6, 29, 23, 0.85) 0%, transparent 100%)',
          pointerEvents: 'auto'
        }}
      >
        {/* Left: UYIR KOLAM Wordmark */}
        <button
          onClick={onBackToWelcome}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
            letterSpacing: '0.08em',
            color: '#F3E8CE',
            textTransform: 'uppercase',
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0
          }}
          title="Return to Welcome Screen"
        >
          UYIR KOLAM
        </button>

        {/* Center: Delicate Instruction */}
        <span
          className="studio-center-hint"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '0.94rem',
            color: '#E7D7B4',
            opacity: 0.9,
            letterSpacing: '0.02em',
            pointerEvents: 'none'
          }}
        >
          Draw a line. Watch life unfold.
        </span>

        {/* Right Desktop Controls: Undo & Clear Pills */}
        <div className="studio-top-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="btn btn-pill-dark"
            style={{
              opacity: strokes.length === 0 ? 0.45 : 1,
              cursor: strokes.length === 0 ? 'not-allowed' : 'pointer'
            }}
            title="Undo recent stroke (Ctrl+Z)"
          >
            <Undo2 size={15} />
            <span>Undo</span>
          </button>

          <button
            onClick={handleClear}
            disabled={strokes.length === 0}
            className="btn btn-pill-dark"
            style={{
              opacity: strokes.length === 0 ? 0.45 : 1,
              cursor: strokes.length === 0 ? 'not-allowed' : 'pointer'
            }}
            title="Clear Canvas"
          >
            <Trash2 size={15} />
            <span>Clear</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="btn-icon btn-pill-dark"
            style={{ width: '34px', height: '34px', padding: 0 }}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Reveal Toggle */}
          <button
            onClick={() => setIsRevealMode(!isRevealMode)}
            className="btn btn-pill-dark"
            style={{
              borderColor: isRevealMode ? '#F6C66B' : 'var(--c-emerald-border)',
              color: isRevealMode ? '#FFD982' : '#F8F3E7'
            }}
            title="Toggle Artwork Reveal"
          >
            <Eye size={15} />
            <span>{isRevealMode ? 'Hide Reveal' : 'Reveal'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#F8F3E7',
              cursor: 'pointer',
              padding: '6px'
            }}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* 2. MAIN INTERACTIVE DRAWING CANVAS */}
      <main style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
        <DrawingCanvas
          brushColor={brushColor}
          brushSize={brushSize}
          symmetry={symmetry}
          showGrid={showGrid}
          isEraser={isEraser}
          isCelebrating={isRevealMode}
          strokes={strokes}
          setStrokes={setStrokes}
          canvasRef={canvasRef}
        />

        {/* Botanical Lotus in Bottom-Right Corner (Exact Match to Panels 2, 3, 4, 6) */}
        <LotusCornerIllustration size={230} />

        {/* 3. LEFT FLOATING VERTICAL TOOLBAR DOCK (Panels 2, 3, 6) */}
        <aside
          className="studio-vertical-dock"
          style={{
            position: 'absolute',
            left: 'clamp(14px, 2.5vw, 28px)',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(16, 53, 42, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(43, 90, 72, 0.55)',
            borderRadius: 'var(--radius-full)',
            padding: '16px 10px',
            boxShadow: '0 8px 32px rgba(6, 29, 23, 0.5)',
            zIndex: 35
          }}
        >
          {/* Pen / Brush Icon (Active) */}
          <button
            onClick={() => setIsEraser(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: !isEraser ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              border: 'none',
              color: !isEraser ? '#FFD982' : '#F8F3E7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Brush Tool"
          >
            <PenLine size={17} />
          </button>

          {/* Color Swatch Circles */}
          {swatches.map((sw) => {
            const isSelected = !isEraser && brushColor === sw.value;
            return (
              <button
                key={sw.label}
                onClick={() => {
                  setIsEraser(false);
                  setBrushColor(sw.value);
                }}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: sw.value,
                  border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.25)' : 'scale(1)',
                  transition: 'transform 0.2s, border 0.2s'
                }}
                title={sw.label}
              />
            );
          })}

          {/* Stroke Style Wave Icon */}
          <button
            onClick={() => setSymmetry(symmetry === 'none' ? '4-fold' : 'none')}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: symmetry !== 'none' ? 'rgba(246, 198, 107, 0.25)' : 'transparent',
              border: 'none',
              color: symmetry !== 'none' ? '#FFD982' : 'rgba(248, 243, 231, 0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.2rem',
              lineHeight: 1
            }}
            title={symmetry === 'none' ? 'Toggle 4-Fold Symmetry' : 'Turn Off Symmetry'}
          >
            ~
          </button>

          {/* Divider */}
          <div style={{ width: '18px', height: '1px', background: 'rgba(255, 255, 255, 0.15)' }} />

          {/* Dot Grid Toggle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.04em', color: 'rgba(248, 243, 231, 0.75)' }}>
              Dot Grid
            </span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </aside>

        {/* 4. BOTTOM PATTERN CAROUSEL STRIP (Panels 2, 3, 4, 6) */}
        {!isRevealMode && (
          <div
            className="studio-bottom-patterns"
            style={{
              position: 'absolute',
              bottom: 'clamp(14px, 2.5vw, 24px)',
              left: 'clamp(14px, 3vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 35
            }}
          >
            <span
              style={{
                fontSize: '0.82rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                color: 'rgba(248, 243, 231, 0.85)',
                letterSpacing: '0.04em'
              }}
            >
              Patterns
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Pattern Glyphs */}
              {STARTER_PATTERNS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPattern(p)}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(16, 53, 42, 0.75)',
                    border: '1px solid rgba(43, 90, 72, 0.55)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    padding: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#F6C66B';
                    e.currentTarget.style.background = 'rgba(26, 73, 58, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(43, 90, 72, 0.55)';
                    e.currentTarget.style.background = 'rgba(16, 53, 42, 0.75)';
                  }}
                  title={`Load ${p.name}`}
                >
                  {/* Micro SVG Glyph representation */}
                  <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                    <circle cx="12" cy="12" r="8" fill="none" stroke="#F6C66B" strokeWidth="1.2" />
                    <circle cx="12" cy="12" r="2" fill="#F6C66B" />
                    <line x1="12" y1="2" x2="12" y2="22" stroke="#F6C66B" strokeWidth="0.8" opacity="0.6" />
                    <line x1="2" y1="12" x2="22" y2="12" stroke="#F6C66B" strokeWidth="0.8" opacity="0.6" />
                  </svg>
                </button>
              ))}

              {/* Prev / Next Arrows */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '4px' }}>
                <button
                  onClick={() => setPatternPage((p) => Math.max(0, p - 1))}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(248, 243, 231, 0.65)',
                    cursor: 'pointer',
                    padding: '2px'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setPatternPage((p) => p + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(248, 243, 231, 0.65)',
                    cursor: 'pointer',
                    padding: '2px'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. COMPLETED ARTWORK / REVEAL DOCK (Panel 4 Exact Match) */}
        {isRevealMode && (
          <div
            className="studio-reveal-dock"
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(16, 53, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(43, 90, 72, 0.6)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 28px',
              boxShadow: '0 16px 40px rgba(6, 29, 23, 0.6)',
              zIndex: 50,
              maxWidth: '92vw'
            }}
          >
            {/* Thoughtful Completion Message */}
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: '#F8F3E7',
                letterSpacing: '0.02em'
              }}
            >
              A little magic, made by you.
            </span>

            {/* Actions: Return to Canvas / Save Artwork / Create Another */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setIsRevealMode(false)}
                className="btn btn-pill-dark"
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              >
                <ArrowLeft size={16} />
                Return to Canvas
              </button>

              <button
                onClick={handleExportPNG}
                className="btn btn-save-green"
              >
                <Download size={16} />
                Save Artwork
              </button>

              <button
                onClick={() => {
                  handleClear();
                  setIsRevealMode(false);
                }}
                className="btn btn-create-coral"
              >
                <RotateCcw size={16} />
                Create Another
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 6. MOBILE MENU DRAWER (When hamburger clicked on mobile) */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(6, 29, 23, 0.96)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            zIndex: 100,
            padding: '24px'
          }}
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#F8F3E7',
              cursor: 'pointer'
            }}
          >
            <X size={26} />
          </button>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F3E8CE' }}>
            UYIR KOLAM
          </h2>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="btn btn-pill-dark"
            style={{ width: '220px', padding: '12px' }}
          >
            About Uyir Kolam
          </button>

          <button
            onClick={() => {
              handleToggleSound();
            }}
            className="btn btn-pill-dark"
            style={{ width: '220px', padding: '12px' }}
          >
            {isMuted ? 'Unmute Audio' : 'Mute Audio'}
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onBackToWelcome();
            }}
            className="btn btn-forest-cta"
            style={{ width: '220px', padding: '12px' }}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
