// src/components/WorkingNotesRail.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Calendar } from 'lucide-react';
import config from '../data/config.json';

/**
 * WorkingNotesRail
 * - Side drawer for "How I Work" and recent notes
 * - Driven by isOpen prop
 * - Traps focus when open
 */
export default function WorkingNotesRail({ isOpen, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Use Portal to ensure it renders at the top of the DOM tree, avoiding stacking context issues
    return ReactDOM.createPortal(
        <>
            {/* Backdrop */}
            <div
                className="rail-backdrop"
                onClick={onClose}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9990,
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease'
                }}
            />

            {/* Rail */}
            <aside
                role="dialog"
                aria-label="Working Notes"
                aria-modal="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '100%',
                    maxWidth: '450px',
                    background: '#1c1917',
                    borderLeft: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                    zIndex: 9999,
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    visibility: isOpen ? 'visible' : 'hidden' // Ensure it's hidden from screen readers/layout when closed
                }}
            >
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#f3f4f6' }}>The Engineer's Mind</h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#9ca3af',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Section 1: How I Work */}
                    <section style={{ marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Core Principles</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {config.howIWork.map(rule => (
                                <div key={rule.id} style={{ padding: '1rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--accent-color)', marginBottom: '0.25rem' }}>{rule.title}</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: 1.6 }}>{rule.example}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Recent Notes */}
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Working Notes / Log</h3>
                            <span style={{ fontSize: '0.65rem', color: '#4b5563', background: 'rgba(31, 41, 55, 0.5)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>LIVE</span>
                        </div>
                        <div style={{ position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.1)', marginLeft: '0.5rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {config.workingNotes.map(note => (
                                <div key={note.id} style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '-29px', top: '4px', height: '10px', width: '10px', borderRadius: '50%', background: '#1c1917', border: '2px solid #4b5563' }}></span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
                                        <Calendar size={12} />
                                        <span>{note.date}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#d1d5db', lineHeight: 1.6 }}>{note.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>
        </>,
        document.body
    );
}
