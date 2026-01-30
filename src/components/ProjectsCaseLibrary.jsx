// src/components/ProjectsCaseLibrary.jsx
import React, { useState } from 'react';
import config from '../data/config.json';
import { ExternalLink, Github, ChevronDown, ChevronUp, CheckCircle, Scale, GitMerge, ShieldCheck } from 'lucide-react';

export default function ProjectsCaseLibrary() {
    const projects = [...config.projects].sort((a, b) => (a.priority || 99) - (b.priority || 99));

    return (
        <section id="projects" className="section container">
            <div className="section-header">
                <h2 className="section-title">Engineering Case Studies</h2>
                <p className="text-tertiary text-sm mt-2 font-mono">
                    System architecture, tradeoffs, and production validation.
                </p>
            </div>

            <div className="case-studies-list">
                {projects.map((p) => (
                    <CaseStudyCard key={p.slug} project={p} />
                ))}
            </div>

            <style>{`
                .case-studies-list { display: flex; flex-direction: column; gap: 4rem; margin-top: 3rem; }
            `}</style>
        </section>
    );
}

function CaseStudyCard({ project }) {
    const [expanded, setExpanded] = useState(false);
    const { caseStudy } = project;

    // Fallback for old schema if migration isn't 100% perfect yet
    if (!caseStudy) return null;

    return (
        <article className="case-study-card">
            {/* 1. HEADER & METRICS */}
            <div className="cs-header">
                <div className="cs-title-group">
                    <span className="cs-priority">#{project.priority.toString().padStart(2, '0')}</span>
                    <h3 className="cs-title">{project.title}</h3>
                </div>
                {caseStudy.keyMetric && (
                    <div className="cs-metric-badge">
                        <span className="metric-label">{caseStudy.keyMetric.label}</span>
                        <span className="metric-value">{caseStudy.keyMetric.value}</span>
                    </div>
                )}
            </div>

            {/* 2. CORE NARRATIVE (Context -> Result) */}
            <div className="cs-grid">
                <div className="cs-col">
                    <h4 className="cs-label">The Challenge</h4>
                    <p className="cs-text">{caseStudy.context}</p>
                    <div className="cs-constraint">
                        <span className="icon-alert">!</span>
                        {caseStudy.constraint}
                    </div>
                </div>
                <div className="cs-col">
                    <h4 className="cs-label">The Engineering Fix</h4>
                    <p className="cs-text">{caseStudy.fix}</p>
                    <p className="cs-result">
                        <CheckCircle size={14} className="inline-icon" />
                        {caseStudy.result}
                    </p>
                </div>
            </div>

            {/* 2.5 INDUSTRY FEEDBACK (If exists) */}
            {config.endorsements.find(e => e.projectSlug === project.slug) && (
                <div className="cs-endorsement">
                    <div className="endorsement-content">
                        <span className="quote-mark">“</span>
                        <p className="quote-text">{config.endorsements.find(e => e.projectSlug === project.slug).quote}</p>
                    </div>
                    <div className="endorsement-meta">
                        <span className="author">{config.endorsements.find(e => e.projectSlug === project.slug).author}</span>
                        <span className="separator">•</span>
                        <span className="role">{config.endorsements.find(e => e.projectSlug === project.slug).role}</span>
                        <a href={config.endorsements.find(e => e.projectSlug === project.slug).verifiedLink} className="source-link" target="_blank" rel="noreferrer">
                            (Source: {config.endorsements.find(e => e.projectSlug === project.slug).source})
                        </a>
                    </div>
                </div>
            )}

            {/* 3. TECH STACK & LINKS */}
            <div className="cs-footer">
                <div className="cs-tags">
                    {project.tech.map(t => <span key={t} className="cs-tag">{t}</span>)}
                </div>
                <div className="cs-actions">
                    {project.links?.repo && (
                        <a href={project.links.repo} target="_blank" rel="noreferrer" className="cs-link">
                            <Github size={14} /> Code
                        </a>
                    )}
                    {project.links?.live && (
                        <a href={project.links.live} target="_blank" rel="noreferrer" className="cs-link">
                            <ExternalLink size={14} /> Demo
                        </a>
                    )}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className={`cs-expand-btn ${expanded ? 'active' : ''}`}
                    >
                        Deep Dive {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>
            </div>

            {/* 4. EXPANDABLE DEEP DIVE */}
            {expanded && (
                <div className="cs-deep-dive">
                    {/* Decisions */}
                    {caseStudy.decisions && (
                        <div className="dd-section">
                            <h4 className="dd-title"><GitMerge size={16} /> Critical Decisions</h4>
                            <div className="dd-grid">
                                {caseStudy.decisions.map((d, i) => (
                                    <div key={i} className="dd-card">
                                        <div className="dd-header">
                                            <span className="dd-topic">{d.topic}</span>
                                            <span className="dd-choice">{d.choice}</span>
                                        </div>
                                        <p className="dd-reason">{d.reason}</p>
                                        <div className="dd-alts">
                                            <span className="dd-label">Rejected:</span>
                                            {d.alternatives.join(", ")}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tradeoffs */}
                    {caseStudy.tradeoffs && (
                        <div className="dd-section">
                            <h4 className="dd-title"><Scale size={16} /> Tradeoffs Considered</h4>
                            <div className="dd-table-wrapper">
                                <table className="dd-table">
                                    <thead>
                                        <tr>
                                            <th>Approach</th>
                                            <th>Pro</th>
                                            <th>Con</th>
                                            <th>Verdict</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {caseStudy.tradeoffs.map((t, i) => (
                                            <tr key={i}>
                                                <td className="font-medium">{t.option}</td>
                                                <td className="text-success">{t.pros}</td>
                                                <td className="text-danger">{t.cons}</td>
                                                <td className="text-subtle">{t.reason}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Validation */}
                    {caseStudy.validation && (
                        <div className="dd-section validation-block">
                            <h4 className="dd-title"><ShieldCheck size={16} /> Outcome Validation</h4>
                            <div className="val-row">
                                <div className="val-item">
                                    <span className="val-label">Method</span>
                                    <span>{caseStudy.validation.method}</span>
                                </div>
                                <div className="val-item">
                                    <span className="val-label">Dataset</span>
                                    <span>{caseStudy.validation.dataset}</span>
                                </div>
                                <div className="val-item">
                                    <span className="val-label">Setup</span>
                                    <span>{caseStudy.validation.setup}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                .case-study-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 2rem;
                    transition: border-color 0.3s ease;
                }
                .case-study-card:hover { border-color: rgba(255, 255, 255, 0.1); }

                /* HEADER */
                .cs-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
                .cs-title-group { display: flex; align-items: baseline; gap: 1rem; }
                .cs-priority { font-family: var(--font-mono); color: var(--text-tertiary); font-size: 0.9rem; }
                .cs-title { font-family: var(--font-heading); font-size: 1.5rem; color: var(--text-primary); margin: 0; }
                
                .cs-metric-badge {
                    display: flex; flex-direction: column; align-items: flex-end;
                    border-right: 2px solid var(--accent-color); padding-right: 1rem;
                }
                .metric-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-tertiary); }
                .metric-value { font-family: var(--font-mono); font-size: 1.25rem; color: var(--accent-color); font-weight: bold; }

                /* GRID LAYOUT */
                .cs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 2rem; }
                @media(max-width: 768px) { .cs-grid { grid-template-columns: 1fr; gap: 2rem; } }
                
                .cs-label { 
                    font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; 
                    color: var(--text-tertiary); margin-bottom: 0.75rem; display: block;
                }
                .cs-text { font-size: 1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem; }
                
                .cs-constraint { 
                    background: rgba(255, 50, 50, 0.05); color: #ff8888; 
                    padding: 0.75rem; border-radius: 6px; font-size: 0.9rem; display: flex; gap: 0.5rem; 
                }
                .cs-result { color: var(--text-primary); font-weight: 500; display: flex; gap: 0.5rem; align-items: center; }

                /* ENDORSEMENT */
                .cs-endorsement {
                    margin-bottom: 2rem;
                    padding: 1.25rem;
                    background: rgba(255, 255, 255, 0.02);
                    border-left: 2px solid var(--accent-color);
                    border-radius: 0 8px 8px 0;
                }
                .endorsement-content { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
                .quote-mark { font-family: serif; font-size: 2rem; line-height: 1; color: var(--accent-color); opacity: 0.5; }
                .quote-text { font-family: var(--font-body); font-style: italic; color: var(--text-secondary); line-height: 1.5; font-size: 0.95rem; }
                
                .endorsement-meta { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-tertiary); display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-left: 2rem; }
                .endorsement-meta .author { color: var(--text-primary); font-weight: 600; }
                .endorsement-meta .source-link { color: var(--text-tertiary); text-decoration: underline; opacity: 0.7; transition: opacity 0.2s; }
                .endorsement-meta .source-link:hover { opacity: 1; }

                /* FOOTER */
                .cs-footer { 
                    display: flex; justify-content: space-between; align-items: center; 
                    padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.05); 
                }
                @media(max-width: 640px) { .cs-footer { flex-direction: column; gap: 1rem; align-items: flex-start; } }

                .cs-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
                .cs-tag { 
                    font-size: 0.75rem; font-family: var(--font-mono); 
                    background: rgba(255,255,255,0.03); padding: 4px 8px; border-radius: 4px; color: var(--text-tertiary); 
                }
                
                .cs-actions { display: flex; gap: 1rem; align-items: center; }
                .cs-link { 
                    display: flex; gap: 0.4rem; align-items: center; 
                    font-size: 0.85rem; color: var(--text-secondary); padding: 6px 10px; 
                    border-radius: 6px; transition: all 0.2s;
                }
                .cs-link:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
                
                .cs-expand-btn {
                    background: transparent; border: 1px solid rgba(255,255,255,0.1);
                    color: var(--text-secondary); padding: 6px 12px; border-radius: 6px;
                    display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.85rem;
                }
                .cs-expand-btn:hover, .cs-expand-btn.active { 
                    border-color: var(--accent-color); color: var(--accent-color); 
                }

                /* DEEP DIVE */
                .cs-deep-dive {
                    margin-top: 2rem; padding-top: 2rem;
                    border-top: 1px dashed rgba(255,255,255,0.1);
                    animation: slideDown 0.3s ease-out;
                }
                @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

                .dd-section { margin-bottom: 2.5rem; }
                .dd-title { 
                    display: flex; align-items: center; gap: 0.75rem; 
                    font-size: 1rem; color: var(--text-primary); margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem;
                }

                .dd-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
                .dd-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 1.25rem; border-radius: 8px; }
                .dd-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.85rem; }
                .dd-topic { color: var(--text-secondary); text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.05em; }
                .dd-choice { color: var(--accent-color); font-weight: 600; }
                .dd-reason { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem; line-height: 1.5; }
                .dd-alts { font-size: 0.8rem; color: var(--text-tertiary); }
                .dd-label { font-weight: 600; margin-right: 0.5rem; }

                .dd-table-wrapper { overflow-x: auto; }
                .dd-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left; }
                .dd-table th { padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-tertiary); font-weight: 400; }
                .dd-table td { padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: top; color: var(--text-secondary); }
                .text-success { color: #88ff88; }
                .text-danger { color: #ff8888; }
                .text-subtle { color: var(--text-tertiary); font-style: italic; }

                .validation-block { background: rgba(50, 255, 100, 0.02); border: 1px solid rgba(50, 255, 100, 0.1); padding: 1.5rem; border-radius: 8px; }
                .val-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
                @media(max-width: 640px) { .val-row { grid-template-columns: 1fr; } }
                .val-item { display: flex; flex-direction: column; gap: 0.25rem; }
                .val-label { font-size: 0.75rem; text-transform: uppercase; color: var(--text-tertiary); }
            `}</style>
        </article >
    );
}
