/**
 * UYIR KOLAM - ABOUT & CULTURAL STORY MODAL
 * Transparently conveys cultural roots, interaction mechanics, and future vision.
 */

import React from 'react';
import { X, Sparkles, Heart, Compass, Cpu } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          padding: '40px 36px'
        }}
      >
        {/* Close Button */}
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
          aria-label="Close story"
        >
          <X size={18} />
        </button>

        {/* Header */}
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
            Cultural Heritage & Digital Craft
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: 'var(--c-ink)',
              margin: '6px 0 2px'
            }}
          >
            The Soul of Uyir Kolam
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.15rem',
              color: 'var(--c-terracotta-dark)'
            }}
          >
            “Where sacred geometry meets the breathing earth.”
          </p>
        </div>

        {/* Section 1: The Ritual */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '22px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--c-terracotta-light)',
              color: 'var(--c-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Heart size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--c-ink)', marginBottom: '4px' }}>
              The Dawn Threshold Ritual
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--c-ink-light)', lineHeight: 1.6 }}>
              In Tamil Nadu and across South India, before dawn breaks, the threshold of the home is swept clean,
              washed, and adorned with Kolam. Drawn freehand using coarsely ground white rice flour (*arisi maavu*),
              Kolam is not merely decorative—it is an act of daily hospitality and compassion (*bhuta yajna*),
              offering food to ants, birds, and tiny creatures of the earth.
            </p>
          </div>
        </div>

        {/* Section 2: Mathematical Magic */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '22px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--c-marigold-light)',
              color: 'var(--c-marigold-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Compass size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--c-ink)', marginBottom: '4px' }}>
              How Your Hand Awakens Life
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--c-ink-light)', lineHeight: 1.6 }}>
              Traditional Kolam relies on <em>Pulli</em> (dots) and <em>Kodu</em> (lines) creating infinite knots and
              rotational symmetries. In Uyir Kolam, the algorithm translates your physical drawing gestures into biological vitality:
            </p>
            <ul style={{ margin: '8px 0 0 16px', fontSize: '0.88rem', color: 'var(--c-ink-light)', lineHeight: 1.7 }}>
              <li><strong>Curved lines</strong> trigger tender vines and miniature leaves along their curvature vectors.</li>
              <li><strong>Line intersections & loops</strong> blossom into sacred Lotus, Jasmine, and Marigold flowers.</li>
              <li><strong>Endpoints & dots</strong> kindle drifting, pulsing luminous fireflies.</li>
              <li><strong>Procedural sound</strong> produces harmonized tones tuned to dawn Raag Mohanam.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Prototype vs Horizon */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--c-forest-light)',
              color: 'var(--c-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Cpu size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--c-ink)', marginBottom: '4px' }}>
              Working Prototype vs Future Horizon
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--c-ink-light)', lineHeight: 1.6 }}>
              <strong>Today:</strong> A fully responsive, zero-install web canvas with high-DPI stroke interpolation,
              authentic 4-fold and 8-fold sacred symmetry, dot snapping, and procedural flora generation.
              <br />
              <strong>Future Horizon:</strong> Ceiling-mounted interactive projection mapping onto real-world doorsteps,
              where natural rice flour sprinkled by morning practitioners is tracked in real-time with lightweight computer vision,
              projecting living flowers underfoot.
            </p>
          </div>
        </div>

        {/* Action */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: '10px 24px' }}>
            <Sparkles size={16} />
            Enter the Studio
          </button>
        </div>
      </div>
    </div>
  );
}
