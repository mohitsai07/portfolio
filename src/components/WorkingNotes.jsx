import React, { useEffect } from 'react';
import config from '../data/config.json';
import { X } from 'lucide-react';

export default function WorkingNotes({ isOpen, onClose }) {
    const { workingNotes, howIWork } = config;

    useEffect(() => {
        function onKey(e) { if (e.key === 'Escape') onClose(); }
        if (isOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="notes-backdrop" onClick={onClose}>
            <div className="notes-drawer" onClick={e => e.stopPropagation()}>
                <div className="notes-header">
                    <h2 className="notes-title">The Engineer's Mind</h2>
                    <button onClick={onClose} className="notes-close"><X size={20} /></button>
                </div>

                <div className="notes-content">
                    <section className="notes-section">
                        <h3 className="section-label">How I Work</h3>
                        <div className="how-i-work-list">
                            {howIWork.map(rule => (
                                <div key={rule.id} className="work-rule">
                                    <h4 className="rule-title">{rule.title}</h4>
                                    <p className="rule-ex">{rule.example}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="notes-section">
                        <h3 className="section-label">Working Notes</h3>
                        <ul className="notes-list">
                            {workingNotes.map(note => (
                                <li key={note.id} className="note-item">
                                    <span className="note-date">{note.date}</span>
                                    <p className="note-text">{note.text}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
            <style>{`
        .notes-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: flex-end;
        }
        .notes-drawer {
          width: 100%;
          max-width: 400px;
          height: 100%;
          background: #171717;
          border-left: 1px solid rgba(255,255,255,0.1);
          box-shadow: -10px 0 30px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          animation: slideLeft 0.3s ease-out;
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .notes-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .notes-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--text-primary);
        }
        .notes-close {
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
        }
        .notes-content {
          padding: 1.5rem;
          overflow-y: auto;
        }
        .notes-section { margin-bottom: 3rem; }
        .section-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--accent-color);
          margin-bottom: 1.5rem;
          letter-spacing: 0.1em;
        }
        .work-rule { margin-bottom: 1.5rem; }
        .rule-title {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .rule-ex {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-style: italic;
        }
        .notes-list { list-style: none; }
        .note-item {
          padding-left: 1rem;
          border-left: 2px solid rgba(255,255,255,0.05);
          margin-bottom: 1.5rem;
        }
        .note-date {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-tertiary);
          display: block;
          margin-bottom: 0.25rem;
        }
        .note-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
        </div>
    );
}
