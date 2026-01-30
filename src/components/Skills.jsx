import React from 'react';
import './Skills.css';
import data from '../data/config.json';

const Skills = () => {
    // New schema uses "expertiseGroups"
    const { expertiseGroups } = data;

    return (
        <section id="skills" className="section container">
            <h2 className="section-title">Expertise</h2>
            <div className="skills-editorial-grid">
                {expertiseGroups.map((grp, idx) => (
                    <div key={idx} className="skill-section">
                        <h3 className="skill-category-header">{grp.group}</h3>
                        <div className="skill-items-list">
                            {grp.items.map((item, i) => (
                                <div key={i} className="skill-row">
                                    <span className="skill-name">{item.skill}</span>
                                    <span className="skill-separator">—</span>
                                    <span className="skill-context">{item.context}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
