import React from 'react';
import './Impact.css';
import GlassCard from './shared/GlassCard';
import data from '../data/config.json';

const Impact = () => {
    const { impactMetrics } = data;

    return (
        <section id="impact" className="section container">
            <div className="impact-grid">
                {impactMetrics.map((metric, idx) => (
                    <GlassCard key={idx} className="impact-card">
                        <h3 className="impact-value">{metric.value}</h3>
                        <p className="impact-label">{metric.label}</p>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
};

export default Impact;
