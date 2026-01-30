import React, { useState } from 'react';
import './Certificates.css';
import data from '../data/config.json';

const Certificates = () => {
    const { certificates } = data;
    const [expanded, setExpanded] = useState(false);

    const visible = expanded ? certificates : certificates.slice(0, 3);

    return (
        <section id="certificates" className="section container">
            <h2 className="section-title">Education & Certs</h2>
            <div className="education-list">
                {visible.map((cert) => (
                    <div key={cert.id} className="education-entry">
                        <div className="edu-top">
                            <div>
                                <h3 className="edu-title">{cert.title}</h3>
                                <div className="edu-meta-row">
                                    <span className="edu-issuer">{cert.issuer} • {cert.year}</span>
                                    {cert.link && (
                                        <a href={cert.link} target="_blank" rel="noreferrer" className="edu-verify-link">
                                            View
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="edu-details">
                            {cert.learning && (
                                <p className="edu-text">
                                    <span className="edu-label">Learned:</span> {cert.learning}
                                </p>
                            )}
                            {cert.use && (
                                <p className="edu-text">
                                    <span className="edu-label">Use:</span> {cert.use}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {certificates.length > 3 && (
                <div className="edu-see-more">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="see-more-btn"
                    >
                        {expanded ? 'Show fewer' : `See ${certificates.length - 3} more`}
                    </button>
                </div>
            )}

            <style>{`
                .edu-meta-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 4px;
                }
                .edu-verify-link {
                    font-size: 0.75rem;
                    text-decoration: underline;
                    color: var(--text-tertiary);
                }
                .edu-verify-link:hover {
                    color: var(--accent-color);
                }
                .edu-see-more {
                    margin-top: 2rem;
                }
                .see-more-btn {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: var(--text-secondary);
                    padding: 6px 16px;
                    font-size: 0.85rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .see-more-btn:hover {
                    border-color: var(--text-primary);
                    color: var(--text-primary);
                }
            `}</style>
        </section>
    );
};

export default Certificates;
