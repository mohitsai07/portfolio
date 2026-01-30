// src/components/ExpertiseSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import config from '../data/config.json';
import { ChevronDown, ChevronUp, Code, Server, Terminal, ExternalLink, Github } from 'lucide-react';

const ICONS = {
    frontend: Code,
    backend: Server,
    tools: Terminal
};

export default function ExpertiseSection() {
    const { expertise } = config;
    const [expandedSkill, setExpandedSkill] = useState(null);
    const sectionRef = useRef(null);

    const toggleSkill = (skillId) => {
        const isOpening = expandedSkill !== skillId;
        setExpandedSkill(isOpening ? skillId : null);

        // Auto-scroll logic if opening
        if (isOpening) {
            // Small delay to allow render
            setTimeout(() => {
                const el = document.getElementById(`card-${skillId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                }
            }, 100);
        }
    };

    return (
        <section id="skills" className="section container" ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">Technical Expertise</h2>
                <p className="micro-copy">How I actually use my tools</p>
            </div>

            <div className="expertise-grid">
                {expertise.map((group) => {
                    const GroupIcon = ICONS[group.id] || Code;

                    return (
                        <div key={group.id} className="expertise-column">
                            <div className="group-header">
                                <div className="group-icon-wrapper">
                                    <GroupIcon size={20} color="var(--accent-color)" />
                                </div>
                                <div className="group-meta">
                                    <h3 className="group-title">{group.title}</h3>
                                    <p className="group-desc">{group.description}</p>
                                </div>
                            </div>

                            <div className="skills-list">
                                {group.skills.map((skill, index) => {
                                    const skillId = `${group.id}-${index}`;
                                    const isExpanded = expandedSkill === skillId;

                                    return (
                                        <div
                                            key={skillId}
                                            id={`card-${skillId}`}
                                            className={`skill-card ${isExpanded ? 'expanded' : ''}`}
                                        >
                                            <button
                                                className="skill-trigger"
                                                onClick={() => toggleSkill(skillId)}
                                                aria-expanded={isExpanded}
                                                aria-controls={`detail-${skillId}`}
                                                aria-label={`Show evidence for ${skill.name}`}
                                            >
                                                <div className="skill-basic-row">
                                                    <span className="skill-name">{skill.name}</span>
                                                    {!isExpanded && (
                                                        <div className="collapsed-meta">
                                                            <div className="mini-bar">
                                                                <div className="mini-fill" style={{ width: `${skill.level}%` }}></div>
                                                            </div>
                                                            <span className="level-num">{skill.level}%</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </button>

                                            <div
                                                id={`detail-${skillId}`}
                                                className={`skill-detail ${isExpanded ? 'open' : ''}`}
                                                aria-hidden={!isExpanded}
                                            >
                                                <div className="detail-content">
                                                    <div className="evidence-grid">
                                                        {/* Row 1: Used In */}
                                                        <div className="evidence-row">
                                                            <span className="evidence-label">Used in</span>
                                                            <div className="evidence-value tags">
                                                                {skill.usedIn && skill.usedIn.map(p => (
                                                                    <span key={p} className="project-tag">{p}</span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Row 2: Decision */}
                                                        <div className="evidence-row">
                                                            <span className="evidence-label">Decision</span>
                                                            <span className="evidence-value">{skill.decision}</span>
                                                        </div>

                                                        {/* Row 3: Principle */}
                                                        <div className="evidence-row">
                                                            <span className="evidence-label">Principle</span>
                                                            <span className="evidence-value italic-value">"{skill.principle}"</span>
                                                        </div>
                                                    </div>

                                                    {/* Links Footer if any */}
                                                    {skill.links && skill.links.length > 0 && (
                                                        <div className="links-footer">
                                                            {skill.links.map(link => (
                                                                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="skill-link">
                                                                    {link.label === 'GitHub' ? <Github size={12} /> : <ExternalLink size={12} />}
                                                                    {link.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .section-header {
                    margin-bottom: 3rem;
                }
                .micro-copy {
                    font-family: var(--font-serif);
                    font-style: italic;
                    color: var(--text-tertiary);
                    margin-top: -0.5rem;
                    font-size: 0.9rem;
                }

                .expertise-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                }
                @media (max-width: 900px) {
                    .expertise-grid { grid-template-columns: 1fr; max-width: 600px; margin: 0 auto; }
                }

                .expertise-column {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .group-header {
                    display: flex; gap: 1rem; padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .group-icon-wrapper {
                    padding: 0.5rem; border-radius: 8px;
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
                }
                .group-title {
                    font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-primary);
                }
                .group-desc {
                    font-size: 0.8rem; color: var(--text-tertiary); line-height: 1.4;
                }

                .skills-list { display: flex; flex-direction: column; gap: 0.5rem; }

                /* CARD STYLES */
                .skill-card {
                    background: transparent;
                    border: 1px solid transparent; /* invisible border usually */
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    will-change: transform, box-shadow;
                }

                .skill-card:hover {
                    background: rgba(255,255,255,0.02);
                }

                .skill-card.expanded {
                    background: rgba(30, 29, 27, 0.8); /* Dark matte */
                    border: 1px solid rgba(255,255,255,0.05);
                    border-left: 2px solid var(--accent-color); /* Warm gold left border */
                    box-shadow: inset 0 0 20px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.2);
                    transform: scale(1.01);
                    border-radius: 4px;
                    margin: 0.5rem -0.5rem; /* Pop out slightly */
                    padding: 0;
                }

                .skill-trigger {
                    width: 100%; padding: 0.75rem 0.5rem;
                    background: transparent; border: none; color: inherit; cursor: pointer;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .skill-card.expanded .skill-trigger {
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                }

                .skill-basic-row {
                    display: flex; justify-content: space-between; align-items: center; width: 100%;
                }
                .skill-name { font-size: 0.9rem; color: var(--text-secondary); font-weight: 500; }
                .expanded .skill-name { color: var(--accent-color); }

                .collapsed-meta { display: flex; align-items: center; gap: 1rem; }
                .mini-bar {
                    width: 50px; height: 2px; background: rgba(255,255,255,0.1);
                }
                .mini-fill { height: 100%; background: var(--text-tertiary); }
                .level-num { font-size: 0.7rem; color: var(--text-tertiary); font-family: var(--font-mono); }

                /* DETAIL PANEL */
                .skill-detail {
                    height: 0; overflow: hidden; opacity: 0;
                    transition: height 0.3s ease, opacity 0.3s ease;
                }
                .skill-detail.open {
                    height: auto; opacity: 1;
                }

                .detail-content { padding: 1rem; }

                .evidence-grid {
                    display: flex; flex-direction: column; gap: 0.75rem;
                }
                .evidence-row {
                    display: flex; gap: 1rem; font-size: 0.8rem;
                    line-height: 1.5;
                }
                .evidence-label {
                    width: 70px; flex-shrink: 0;
                    color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.7rem;
                    margin-top: 2px;
                }
                .evidence-value { color: var(--text-secondary); }
                .italic-value { font-style: italic; color: var(--text-primary); }

                .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
                .project-tag {
                    padding: 1px 6px; border-radius: 4px;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: var(--text-tertiary); background: rgba(255,255,255,0.02);
                    font-size: 0.7rem;
                }

                .links-footer {
                    margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.05);
                    display: flex; gap: 1rem;
                }
                .skill-link {
                    display: flex; align-items: center; gap: 4px; color: var(--text-tertiary); font-size: 0.75rem;
                    transition: color 0.2s;
                }
                .skill-link:hover { color: var(--accent-color); }

                @media (prefers-reduced-motion: reduce) {
                    .skill-card, .skill-detail { transition: none; transform: none; }
                }
            `}</style>
        </section>
    );
}
