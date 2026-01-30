// src/components/ProjectAutopsy.jsx
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ExternalLink, Github } from 'lucide-react'; // Removed 'X' import as we use SVG
import config from '../data/config.json';
import EndorsementCard from './EndorsementCard';

export default function ProjectAutopsy({ project, onClose }) {
  const modalRef = useRef(null);
  const { autopsy, endorsementId } = project || {};
  const endorsement = config.endorsements.find(e => e.id === endorsementId);
  const [imgError, setImgError] = useState(false);

  // Focus Trap & Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.body.style.overflow = 'hidden';
    // Focus first element
    setTimeout(() => {
      if (modalRef.current) {
        const firstBtn = modalRef.current.querySelector('button');
        if (firstBtn) firstBtn.focus();
      }
    }, 50);

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Reset error state when project changes
  useEffect(() => {
    setImgError(false);
    if (project && process.env.NODE_ENV === 'development') {
      console.log(`[ProjectAutopsy] Attempting to load screenshot: ${project.screenshot}`);
    }
  }, [project]);

  if (!project) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-content"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="autopsy-title"
        style={{ display: 'flex', flexDirection: 'column' }} // fallback layout
      >
        <style>{`
            .autopsy-layout { display: flex; flex-direction: row; min-height: 600px; }
            @media(max-width: 768px) { .autopsy-layout { flex-direction: column; } }
            
            .left-col { flex: 1; padding: 3rem; overflow-y: auto; border-right: 1px solid rgba(255,255,255,0.05); position: relative; }
            .right-col { width: 40%; background: rgba(0,0,0,0.2); padding: 2rem; display: flex; flex-direction: column; gap: 2rem; }
            @media(max-width: 768px) { .right-col { width: 100%; border-top: 1px solid rgba(255,255,255,0.1); } }

            .badge { display: inline-block; padding: 4px 8px; font-size: 0.7rem; color: var(--accent-color); border: 1px solid rgba(212, 185, 150, 0.2); border-radius: 4px; margin-bottom: 1rem; font-family: monospace; }
            .section-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-tertiary); margin-bottom: 0.5rem; font-weight: 500; }
            
            .text-block { margin-bottom: 2rem; }
            .problem-text { color: var(--text-secondary); line-height: 1.6; }
            .failure-text { color: var(--text-secondary); font-style: italic; border-left: 2px solid #ef4444; padding-left: 1rem; }
            .fix-text { color: var(--text-secondary); }
            .outcome-text { color: var(--text-primary); font-weight: 500; }
            
            .screenshot-container { border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #111; min-height: 200px; display: flex; align-items: center; justify-content: center; }
            .screenshot-img { width: 100%; height: auto; display: block; }
            
            .link-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); font-size: 0.85rem; color: var(--text-secondary); transition: all 0.2s; }
            .link-btn:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
            .btn-primary { background: rgba(255,255,255,0.03); }

            /* GLASS CLOSE BUTTON */
            .glass-close-btn {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                z-index: 20;
                width: 36px;
                height: 36px; /* w-9 h-9 */
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 9999px; /* rounded-full */
                background-color: rgba(255,255,255,0.02);
                border: 1px solid rgba(255,255,255,0.04);
                color: #e5e7eb; /* text-gray-200 */
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                transition: transform 150ms;
                will-change: transform;
                cursor: pointer;
            }
            .glass-close-btn:hover {
                background-color: rgba(255,255,255,0.035);
            }
            .glass-close-btn:focus {
                outline: none;
                box-shadow: 0 0 0 2px rgba(198,166,100,0.12); /* ring */
            }
         `}</style>

        {/* MOVED BUTTON INSIDE LEFT COLUMN FOR BETTER CONTEXT - OR KEEP ABSOLUTE RELATIVE TO CONTENT */}
        {/* User asked for: "inside the modal header, aligned top-right, within the modal container" 
             Since 'modal-content' is relative, absolute positioning works. */}

        <button
          onClick={onClose}
          aria-label="Close autopsy"
          title="Close"
          className="glass-close-btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </button>

        <div className="autopsy-layout">
          {/* LEFT COLUMN */}
          <div className="left-col">
            <span className="badge">PROJECT AUTOPSY</span>
            <h2 id="autopsy-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)', paddingRight: '2rem' }}>
              {project.title}
            </h2>
            <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>{project.summary}</p>

            {autopsy && (
              <>
                <div className="text-block">
                  <h3 className="section-label">The Problem</h3>
                  <p className="problem-text">{autopsy.problem}</p>
                </div>
                <div className="text-block">
                  <h3 className="section-label" style={{ color: '#f87171' }}>The Failure</h3>
                  <p className="failure-text">"{autopsy.failure}"</p>
                </div>
                <div className="text-block">
                  <h3 className="section-label" style={{ color: '#34d399' }}>The Fix</h3>
                  <p className="fix-text">{autopsy.fix}</p>
                </div>
                <div className="text-block">
                  <h3 className="section-label">The Outcome</h3>
                  <p className="outcome-text">{autopsy.outcome}</p>
                </div>
              </>
            )}

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-tertiary)' }}>
              <span>— Mohit Sai</span>
              <span>{new Date().toISOString().split('T')[0]}</span>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col">
            <div className="screenshot-container">
              {!imgError ? (
                <img
                  src={project.screenshot}
                  alt={`Interface of ${project.title}`}
                  className="screenshot-img"
                  loading="lazy"
                  onError={(e) => {
                    console.warn(`[ProjectAutopsy] Failed to load screenshot: ${project.screenshot}`);
                    setImgError(true);
                  }}
                />
              ) : (
                <div
                  role="img"
                  aria-label={`No screenshot available for ${project.title}`}
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <span>Image not found</span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: '#444' }}>{project.screenshot}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-btn btn-primary">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="link-btn">
                  <Github size={14} /> Code
                </a>
              )}
            </div>

            {endorsement && (
              <div style={{ marginTop: 'auto' }}>
                <h3 className="section-label">Validation</h3>
                <EndorsementCard endorsement={endorsement} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
