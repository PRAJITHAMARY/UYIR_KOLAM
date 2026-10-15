/**
 * UYIR KOLAM - ARTWORK REVEAL
 * Celebrates the awakened living garden with poetic reflection, statistics,
 * high-resolution PNG export, and options to continue editing or start fresh.
 */

import React from 'react';
import { Sparkles, Download, ArrowLeft, RefreshCw, Flower2, Sprout, Wand2 } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export default function RevealModal({
  isOpen,
  onClose,
  stats = { bloomCount: 0, vineCount: 0, fireflyCount: 0, strokeCount: 0 },
  onResetGarden,
  onExportPNG
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        background: 'rgba(41, 39, 33, 0.65)',
        backdropFilter: 'blur(10px)',
        zIndex: 3000
      }}
    >
      <div
        className="modal-content"
        style={{
          maxWidth: '560px',
          textAlign: 'center',
          padding: '40px 32px',
          background: 'radial-gradient(ellipse at 50% 20%, #FFFFFF 0%, #FFF9F0 70%, #F5ECDF 100%)',
          border: '1px solid rgba(185, 104, 74, 0.25)',
          boxShadow: '0 24px 60px rgba(41, 39, 33, 0.25)'
        }}
      >
        {/* Sacred Embellishment Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--c-terracotta-light)',
            color: 'var(--c-terracotta)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 24px rgba(185, 104, 74, 0.25)',
            animation: 'pulseGlow 3s ease-in-out infinite'
          }}
        >
          <Sparkles size={28} />
        </div>

        {/* Thoughtful Message */}
        <span
          style={{
            fontSize: '0.85rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--c-terracotta)',
            fontWeight: 600
          }}
        >
          Dawn Garden Awakened
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.2rem',
            color: 'var(--c-ink)',
            margin: '6px 0 8px'
          }}
        >
          A little magic, made by you.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.08rem',
            lineHeight: 1.6,
            color: 'var(--c-ink-light)',
            maxWidth: '440px',
            margin: '0 auto 24px'
          }}
        >
          In traditional Kolam, rice powder blesses the threshold and nourishes the creatures of the earth.
          Through your sacred lines, a living sanctuary has taken root.
        </p>

        {/* Garden Life Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 12px',
            marginBottom: '28px',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--c-pink)', marginBottom: '4px' }}>
              <Flower2 size={16} />
              <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--c-ink)' }}>
                {stats.bloomCount}
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--c-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Blooms Awakened
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderInline: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--c-forest)', marginBottom: '4px' }}>
              <Sprout size={16} />
              <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--c-ink)' }}>
                {stats.vineCount}
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--c-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Living Vines
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--c-marigold-dark)', marginBottom: '4px' }}>
              <Wand2 size={16} />
              <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--c-ink)' }}>
                {stats.fireflyCount}
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--c-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Fireflies Dancing
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => {
              soundEngine.playBloomChime();
              onExportPNG();
            }}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            <Download size={18} />
            Save Artwork (High-Res PNG)
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '12px', fontSize: '0.92rem' }}
            >
              <ArrowLeft size={16} />
              Return to Canvas
            </button>

            <button
              onClick={() => {
                onResetGarden();
                onClose();
              }}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '12px', fontSize: '0.92rem' }}
            >
              <RefreshCw size={16} />
              Create Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
