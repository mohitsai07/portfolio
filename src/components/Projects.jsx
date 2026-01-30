import React, { useState } from 'react';
import './Projects.css';
import data from '../data/config.json';
import { ExternalLink, Github } from 'lucide-react';
import ProjectAutopsy from './ProjectAutopsy';

const Projects = () => {
    const { projects } = data;
    const [activeProject, setActiveProject] = useState(null);

    // Using the new schema: slug, title, summary, tech, origin, autopsy
    return (
        <section id="projects" className="section container">
            <h2 className="section-title">Selected Works</h2>
            <div className="projects-list">
                {projects.map((proj) => (
                    <div key={proj.slug} className="project-item">
                        <div className="project-header">
                            <h3 className="project-title">
                                {proj.title}
                                <span className="project-impact"> — {proj.summary}</span>
                            </h3>

                            <div className="project-actions">
                                {proj.autopsy && (
                                    <button
                                        className="autopsy-btn"
                                        onClick={() => setActiveProject(proj)}
                                    >
                                        View Autopsy
                                    </button>
                                )}
                                <div className="project-links">
                                    {proj.liveUrl && <a href={proj.liveUrl} title="View Demo" target="_blank" rel="noreferrer"><ExternalLink size={18} /></a>}
                                    {proj.repo && <a href={proj.repo} title="Code" target="_blank" rel="noreferrer"><Github size={18} /></a>}
                                </div>
                            </div>
                        </div>

                        <div className="project-meta">
                            {proj.tech.map((tag, idx) => (
                                <span key={idx} className="meta-tag">{tag}</span>
                            ))}
                        </div>

                        {/* Micro-Tooltip Origin (Hover logic via CSS title or custom tooltip) */}
                        <div className="project-origin" title="Project Origin">
                            <span className="origin-label">Origin:</span> {proj.origin}
                        </div>
                    </div>
                ))}
            </div>

            {activeProject && (
                <ProjectAutopsy project={activeProject} onClose={() => setActiveProject(null)} />
            )}
        </section>
    );
};

export default Projects;
