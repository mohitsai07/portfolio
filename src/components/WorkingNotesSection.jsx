import React, { useState, useMemo } from 'react';
import config from '../data/config.json';
import { Terminal, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export default function WorkingNotesSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    // Sort notes descending by date
    const sortedNotes = useMemo(() => {
        return [...config.workingNotes].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, []);

    // Group by Month Year
    const groupedNotes = useMemo(() => {
        const groups = {};
        sortedNotes.forEach(note => {
            const date = new Date(note.date);
            const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groups[key]) groups[key] = [];
            groups[key].push(note);
        });
        return groups;
    }, [sortedNotes]);

    const visibleGroups = isExpanded ? Object.keys(groupedNotes) : Object.keys(groupedNotes).slice(0, 2);

    return (
        <section id="notes" className="section container">
            <div className="section-header">
                <h2 className="section-title">Engineering Log</h2>
                <div className="section-subtitle-row">
                    <span className="live-indicator">
                        <span className="blink-dot"></span> Live
                    </span>
                    <span className="subtitle-text">Thoughts, fixes, and production logs.</span>
                </div>
            </div>

            <div className="notes-feed">
                {visibleGroups.map(groupKey => (
                    <div key={groupKey} className="month-group">
                        <h3 className="month-label">{groupKey}</h3>
                        <div className="notes-list">
                            {groupedNotes[groupKey].map(note => (
                                <div key={note.id} className="note-item">
                                    <div className="note-meta">
                                        <span className="note-date">
                                            {new Date(note.date).getDate()}
                                        </span>
                                    </div>
                                    <div className="note-content">
                                        <p className="note-text">{note.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {Object.keys(groupedNotes).length > 2 && (
                <div className="show-more-container">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="expand-notes-btn"
                    >
                        {isExpanded ? 'Collapse Log' : 'View Older Entries'}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>
            )}

            <style>{`
                .section-subtitle-row { 
                    display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem; 
                    font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-tertiary);
                }
                .live-indicator { 
                    display: flex; align-items: center; gap: 6px; 
                    color: var(--accent-color); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.75rem;
                }
                .blink-dot { width: 6px; height: 6px; background: var(--accent-color); border-radius: 50%; animation: blink 2s infinite; }
                
                .notes-feed { display: flex; flex-direction: column; gap: 3rem; border-left: 1px dashed rgba(255,255,255,0.1); padding-left: 2rem; margin-left: 0.5rem; }
                
                .month-group { position: relative; }
                .month-label { 
                    font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; 
                    color: var(--text-tertiary); margin-bottom: 1.5rem; position: relative;
                }
                .month-label::before {
                    content: ''; position: absolute; left: -2.35rem; top: 50%; width: 8px; height: 8px; 
                    background: var(--bg-color); border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; transform: translateY(-50%);
                }
                
                .notes-list { display: flex; flex-direction: column; gap: 1.5rem; }
                .note-item { display: flex; gap: 1.5rem; align-items: baseline; }
                
                .note-meta { min-width: 2rem; text-align: right; }
                .note-date { font-family: var(--font-mono); color: var(--text-tertiary); font-size: 0.9rem; opacity: 0.8; }
                
                /* Styled as a clear log entry */
                .note-content { flex: 1; }
                .note-text { 
                    font-size: 1rem; color: var(--text-secondary); line-height: 1.6; 
                    font-family: var(--font-body); max-width: 700px;
                }

                .expand-notes-btn {
                    display: flex; align-items: center; gap: 0.5rem; margin-top: 2rem;
                    background: transparent; border: none; color: var(--text-tertiary); cursor: pointer;
                    font-family: var(--font-mono); font-size: 0.85rem; transition: color 0.2s;
                }
                .expand-notes-btn:hover { color: var(--accent-color); }

                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                
                @media(max-width: 640px) {
                    .notes-feed { padding-left: 1.5rem; margin-left: 0; }
                    .month-label::before { left: -1.85rem; }
                    .note-item { flex-direction: column; gap: 0.5rem; }
                    .note-meta { text-align: left; }
                }
            `}</style>
        </section>
    );
}
