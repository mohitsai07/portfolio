// src/components/EducationSection.jsx
import React, { useState } from 'react';
import config from '../data/config.json';
import { Award, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import CertificateModal from './CertificateModal';

export default function EducationSection() {
    const { certificates } = config;
    const [selectedCert, setSelectedCert] = useState(null);
    const [expanded, setExpanded] = useState(false);

    // Default to showing only 4 items
    const visibleCerts = expanded ? certificates : certificates.slice(0, 4);

    return (
        <section id="certificates" className="section container">
            <div className="section-header">
                <h2 className="section-title">Education & Certifications</h2>
                <p className="text-sm text-gray-500 italic mt-1 font-serif">
                    Verified engineering milestones and continuous learning.
                </p>
            </div>

            {/* DEGREE CARD */}
            {config.degree && (
                <div className="degree-card">
                    <div className="degree-header">
                        <div className="degree-icon">
                            <Award size={24} />
                        </div>
                        <div className="degree-meta">
                            <h3 className="degree-title">{config.degree.title}</h3>
                            <p className="degree-institution">{config.degree.institution}</p>
                        </div>
                        <div className="degree-year">{config.degree.duration}</div>
                    </div>
                    <div className="degree-content">
                        <ul className="degree-highlights">
                            {config.degree.highlights.map((point, idx) => (
                                <li key={idx}>
                                    {/* <span className="bullet-point">•</span> */}
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="certs-grid">
                {visibleCerts.map((cert) => (
                    <div
                        key={cert.id}
                        className="cert-card"
                        onClick={() => setSelectedCert(cert)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setSelectedCert(cert);
                            }
                        }}
                    >
                        <div className="cert-card-inner">
                            <div className="cert-top">
                                <Award size={18} className="cert-icon" />
                                <span className="cert-date">{cert.month} {cert.year}</span>
                            </div>

                            <h3 className="cert-title">{cert.title}</h3>
                            <p className="cert-provider">{cert.provider}</p>

                            <p className="cert-outcome">
                                {cert.skillsLearned}
                            </p>

                            <div className="cert-footer">
                                <span className="cert-action">View Proof</span>
                                <ChevronRight size={14} className="action-icon" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expansion Toggle */}
            {certificates.length > 4 && (
                <div className="expand-row">
                    <button
                        className="expand-btn"
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                    >
                        {expanded ? (
                            <>
                                <span className="mr-1">Show Less</span>
                                <ChevronUp size={16} />
                            </>
                        ) : (
                            <>
                                <span className="mr-1">See All Certifications ({certificates.length})</span>
                                <ChevronDown size={16} />
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Detail Modal */}
            {selectedCert && (
                <CertificateModal
                    certificate={selectedCert}
                    onClose={() => setSelectedCert(null)}
                />
            )}

            <style>{`
                .certs-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                @media(min-width: 768px) {
                    .certs-grid { 
                        grid-template-columns: repeat(2, 1fr); 
                        gap: 2rem; 
                    }
                }

                /* DEGREE CARD */
                .degree-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 215, 0, 0.15); /* Subtle Gold */
                    border-radius: 12px;
                    padding: 2rem;
                    margin-bottom: 3rem;
                    position: relative;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }
                .degree-card:hover {
                    background: rgba(255, 255, 255, 0.03);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                    border-color: rgba(255, 215, 0, 0.3);
                }
                .degree-card::before {
                    content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 3px;
                    background: var(--accent-color); opacity: 0.5;
                }
                
                .degree-header {
                    display: flex; align-items: flex-start; gap: 1.5rem; margin-bottom: 1.5rem;
                }
                @media(max-width: 640px) { .degree-header { flex-direction: column; gap: 1rem; } }

                .degree-icon {
                    padding: 0.75rem; border-radius: 12px;
                    background: rgba(255, 215, 0, 0.1); color: var(--accent-color);
                }
                
                .degree-meta { flex: 1; }
                .degree-title { font-family: var(--font-heading); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 0.25rem; }
                .degree-institution { color: var(--text-secondary); font-size: 1rem; }
                
                .degree-year {
                    font-family: var(--font-mono); font-size: 0.9rem; 
                    color: var(--text-tertiary); background: rgba(255,255,255,0.05);
                    padding: 4px 10px; border-radius: 6px;
                }

                .degree-highlights { display: flex; flex-direction: column; gap: 0.5rem; list-style: none; padding: 0; }
                .degree-highlights li {
                    color: var(--text-secondary); opacity: 0.9; font-size: 0.95rem;
                    display: flex; align-items: center; gap: 0.75rem;
                }
                .degree-highlights li::before {
                    content: ''; width: 6px; height: 6px; border-radius: 50%; 
                    background: var(--accent-color); opacity: 0.5;
                }

                /* CARD STYLES */
                .cert-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 8px;
                    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }

                .cert-card:hover {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(255,255,255,0.1);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                }

                .cert-card:focus-visible {
                    outline: 2px solid var(--accent-color);
                    outline-offset: 2px;
                }

                .cert-card-inner {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .cert-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .cert-icon {
                    color: var(--accent-color);
                    opacity: 0.8;
                }

                .cert-date {
                    font-size: 0.75rem;
                    color: var(--text-tertiary);
                    font-family: var(--font-mono);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .cert-title {
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: var(--text-primary);
                    margin-bottom: 0.25rem;
                    line-height: 1.3;
                }

                .cert-provider {
                    font-size: 0.85rem;
                    color: var(--accent-color);
                    margin-bottom: 1rem;
                }

                .cert-outcome {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    flex-grow: 1;
                    margin-bottom: 1.5rem;
                    opacity: 0.9;
                }

                .cert-footer {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: auto;
                }

                .cert-action {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-tertiary);
                    font-weight: 500;
                    transition: color 0.2s;
                }
                
                .action-icon {
                    color: var(--text-tertiary);
                    transition: transform 0.2s, color 0.2s;
                }

                .cert-card:hover .cert-action,
                .cert-card:hover .action-icon {
                    color: var(--text-primary);
                }
                
                .cert-card:hover .action-icon {
                    transform: translateX(4px);
                }

                /* EXPAND BUTTON */
                .expand-row {
                    display: flex;
                    justify-content: center;
                    margin-top: 3rem;
                }

                .expand-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: var(--text-secondary);
                    padding: 0.75rem 1.5rem;
                    border-radius: 99px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .expand-btn:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: var(--text-secondary);
                    color: var(--text-primary);
                }
            `}</style>
        </section>
    );
}
