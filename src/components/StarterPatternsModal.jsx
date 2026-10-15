/**
 * UYIR KOLAM - STARTER PATTERNS MODAL
 * Select authentic sacred kolam templates that load seamlessly onto the interactive canvas.
 */

import React from 'react';
import { X, Sparkles, Flower2, CircleDot, Flame, Sun } from 'lucide-react';
import { STARTER_PATTERNS } from '../engine/starterPatterns';

export default function StarterPatternsModal({ isOpen, onClose, onSelectPattern }) {
  if (!isOpen) return null;

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'thamarai':
        return <Flower2 size={20} color="var(--c-terracotta)" />;
      case 'sikku':
        return <CircleDot size={20} color="var(--c-forest)" />;
      case 'surya':
        return <Sun size={20} color="var(--c-marigold-dark)" />;
      case 'deepam':
        return <Flame size={20} color="var(--c-terracotta)" />;
      default:
        return <Sparkles size={20} color="var(--c-terracotta)" />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '720px',
          padding: '36px 32px'
        }}
      >
        <button
          onClick={onClose}
          className="btn-icon"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px'
          }}
          aria-label="Close starter patterns"
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: '24px' }}>
          <span
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--c-terracotta)',
              fontWeight: 600
            }}
          >
            Sacred Templates
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.9rem',
              color: 'var(--c-ink)',
              margin: '4px 0 2px'
            }}
          >
            Choose a Starter Kolam
          </h2>
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--c-ink-light)'
            }}
          >
            Select an authentic traditional foundation. It will bloom directly onto your canvas, ready for you to trace, expand, and cultivate.
          </p>
        </div>

        {/* Pattern Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}
        >
          {STARTER_PATTERNS.map((pattern) => (
            <div
              key={pattern.id}
              onClick={() => {
                onSelectPattern(pattern);
                onClose();
              }}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--c-terracotta)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-float)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {getCategoryIcon(pattern.id)}
                    <span style={{ fontSize: '0.78rem', color: 'var(--c-ink-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {pattern.category}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: 'var(--c-marigold-light)',
                      color: 'var(--c-marigold-dark)',
                      fontWeight: 600
                    }}
                  >
                    Grid: {pattern.recommendedGrid}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--c-ink)' }}>
                    {pattern.name}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--c-terracotta)', fontWeight: 500 }}>
                    {pattern.tamilName}
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--c-ink-muted)', lineHeight: 1.5 }}>
                  {pattern.description}
                </p>
              </div>

              <button
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  fontSize: '0.88rem',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <Sparkles size={14} color="var(--c-terracotta)" />
                Load & Awaken Life
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
