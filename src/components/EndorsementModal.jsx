// src/components/EndorsementModal.jsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X, ExternalLink, BadgeCheck } from 'lucide-react';

export default function EndorsementModal({ item, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!item) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 10000 }}>
      {/* Smaller width for endorsement */}
      <div
        ref={modalRef}
        className="modal-content"
        style={{ maxWidth: '600px' }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
          className="p-2 text-gray-400 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
              <BadgeCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>Endorsement Verification</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span>{item.author}</span>
                {item.permissionGranted && (
                  <span style={{ fontSize: '0.6rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '2px 4px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    VERIFIED
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ background: '#000', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', minHeight: '150px' }}>
            <img
              src={item.screenshot}
              alt={`Screenshot of endorsement by ${item.author}`}
              style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
              loading="lazy"
            />
          </div>

          <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            <span style={{ fontFamily: 'monospace' }}>ID: {item.id} • {item.date}</span>
            {item.sourceUrl && !item.sourceUrl.includes('PLACEHOLDER') && (
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60a5fa' }}>
                View Original Thread <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
