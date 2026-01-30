import React from 'react';
import './Experience.css';
import data from '../data/config.json';
import { Briefcase, Code, GraduationCap, Zap } from 'lucide-react';

const Experience = () => {
    const timeline = data.timeline;

    const getIcon = (role) => {
        if (role.includes('Intern')) return <Briefcase size={16} />;
        if (role.includes('Student')) return <GraduationCap size={16} />;
        if (role.includes('Emerging')) return <Zap size={16} />;
        return <Code size={16} />;
    };

    return (
        <section id="experience" className="section container">
            <h2 className="section-title">Engineering Journey</h2>
            <div className="journey-track">
                {timeline.map((item, index) => (
                    <div key={item.id || index} className="journey-node">
                        {/* Left: Connector & Icon */}
                        <div className="journey-marker">
                            <div className="journey-icon">
                                {getIcon(item.role)}
                            </div>
                            {index !== timeline.length - 1 && <div className="journey-line"></div>}
                        </div>

                        {/* Right: Content */}
                        <div className="journey-content">
                            <div className="journey-header">
                                <div>
                                    <h3 className="journey-role">{item.role}</h3>
                                    <p className="journey-company">{item.company}</p>
                                </div>
                                <span className="journey-year">{item.year}</span>
                            </div>

                            <div className="journey-impact">
                                <span className="impact-label">Impact:</span> {item.impact}
                            </div>

                            <ul className="journey-bullets">
                                {item.bullets.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>

                            <div className="journey-skills">
                                {item.skills && item.skills.map(s => (
                                    <span key={s} className="journey-skill-tag">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .journey-track {
                    display: flex; flex-direction: column; gap: 0; 
                    margin-top: 3rem; padding-left: 1rem;
                }
                .journey-node { display: flex; gap: 2rem; position: relative; padding-bottom: 3rem; }
                .journey-node:last-child { padding-bottom: 0; }

                .journey-marker {
                    display: flex; flex-direction: column; align-items: center; fles-shrink: 0;
                }
                .journey-icon {
                    width: 36px; height: 36px; border-radius: 50%;
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    color: var(--accent-color);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 2;
                    transition: all 0.3s ease;
                }
                .journey-node:hover .journey-icon {
                    border-color: var(--accent-color);
                    box-shadow: 0 0 15px rgba(212, 185, 150, 0.2);
                    background: rgba(255, 215, 0, 0.05);
                }
                .journey-line {
                    width: 2px; flex-grow: 1; background: rgba(255,255,255,0.05);
                    margin-top: 0.5rem; margin-bottom: 0.5rem;
                }

                .journey-content { flex: 1; }
                
                .journey-header { 
                    display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; 
                }
                @media(max-width: 640px) { .journey-header { flex-direction: column; gap: 0.5rem; } }

                .journey-role { font-size: 1.25rem; color: var(--text-primary); font-family: var(--font-heading); margin: 0; }
                .journey-company { color: var(--text-tertiary); font-size: 0.95rem; margin: 0; }
                .journey-year { 
                    font-family: var(--font-mono); font-size: 0.85rem; 
                    background: rgba(255,255,255,0.03); padding: 4px 8px; border-radius: 4px; color: var(--text-secondary); 
                }

                .journey-impact {
                    background: rgba(255, 215, 0, 0.03); border-left: 2px solid var(--accent-color);
                    padding: 0.75rem 1rem; margin-bottom: 1rem; border-radius: 0 4px 4px 0;
                    font-size: 0.95rem; color: var(--text-secondary);
                }
                .impact-label { font-weight: 600; color: var(--accent-color); margin-right: 0.5rem; }

                .journey-bullets { 
                    list-style: none; padding: 0; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.5rem; 
                }
                .journey-bullets li { 
                    position: relative; padding-left: 1rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; opacity: 0.9;
                }
                .journey-bullets li::before {
                    content: '•'; position: absolute; left: 0; color: var(--text-tertiary);
                }

                .journey-skills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
                .journey-skill-tag {
                    font-size: 0.75rem; font-family: var(--font-mono); 
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
                    padding: 2px 8px; border-radius: 99px; color: var(--text-tertiary);
                }
            `}</style>
        </section>
    );
};

export default Experience;
