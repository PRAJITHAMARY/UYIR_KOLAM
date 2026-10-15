/**
 * UYIR KOLAM - CLEAR CONFIRMATION MODAL
 */

import React from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';

export default function ClearConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 3500 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '420px',
          textAlign: 'center',
          padding: '32px 24px'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--c-terracotta-light)',
            color: 'var(--c-terracotta)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px'
          }}
        >
          <AlertCircle size={24} />
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            color: 'var(--c-ink)',
            marginBottom: '8px'
          }}
        >
          Clear Current Canvas?
        </h3>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--c-ink-light)',
            marginBottom: '24px',
            lineHeight: 1.5
          }}
        >
          This will wash away your drawn lines and return the awakened flowers, vines, and fireflies to the earth.
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ flex: 1, padding: '10px' }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn btn-primary"
            style={{ flex: 1, padding: '10px', background: 'var(--c-terracotta)' }}
          >
            <Trash2 size={16} />
            Clear Canvas
          </button>
        </div>
      </div>
    </div>
  );
}
