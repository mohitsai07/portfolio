// src/components/ContactCard.jsx
import React, { useState } from 'react';
import { Copy, Check, Mail, Linkedin, Github, FileText } from 'lucide-react';

export default function ContactCard({ profile }) {
    const [copied, setCopied] = useState('');

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 2000);
    };

    const StatusBadge = ({ status }) => {
        const config = {
            available: { color: 'bg-green-500', text: 'Available for Opportunities' },
            open: { color: 'bg-yellow-500', text: 'Open to Collaboration' },
            busy: { color: 'bg-red-500', text: 'Heads-down Building' }
        };
        const s = config[status] || config.available;

        return (
            <div className="status-badge">
                <span className={`status-dot ${s.color}`}>
                    <span className={`status-ping ${s.color}`}></span>
                </span>
                <span className="status-text">{s.text}</span>
            </div>
        );
    };

    const handleLink = (url) => {
        if (url && url !== '#') window.open(url, '_blank');
    };

    return (
        <div className="contact-card-smart">
            {/* Header */}
            <div className="card-header">
                <div className="avatar-wrapper">
                    <img src={profile.avatar} alt={profile.name} className="avatar-img" />
                </div>
                <div>
                    <h3 className="profile-name">{profile.name}</h3>
                    <p className="profile-role">{profile.role}</p>
                </div>
            </div>

            {/* Status */}
            <StatusBadge status={profile.availability || 'available'} />

            <div className="divider"></div>

            {/* Actions */}
            <div className="contact-links">
                {/* Email */}
                <div className="link-item group" onClick={() => copyToClipboard(profile.email, 'email')}>
                    <div className="icon-box">
                        <Mail size={18} />
                    </div>
                    <div className="link-content">
                        <span className="link-label">Email</span>
                        <span className="link-value">{profile.email}</span>
                    </div>
                    <div className="copy-feedback">
                        {copied === 'email' ? <Check size={14} /> : <Copy size={14} />}
                    </div>
                </div>

                {/* LinkedIn */}
                <div className="link-item group" onClick={() => handleLink(profile.social.linkedin)}>
                    <div className="icon-box">
                        <Linkedin size={18} />
                    </div>
                    <div className="link-content">
                        <span className="link-label">LinkedIn</span>
                        <span className="link-value">Connect & Chat</span>
                    </div>
                </div>

                {/* GitHub */}
                <div className="link-item group" onClick={() => handleLink(profile.social.github)}>
                    <div className="icon-box">
                        <Github size={18} />
                    </div>
                    <div className="link-content">
                        <span className="link-label">GitHub</span>
                        <span className="link-value">View Code</span>
                    </div>
                </div>

                {/* Resume */}
                <div className="link-item group" onClick={() => handleLink(profile.resumeLink)}>
                    <div className="icon-box">
                        <FileText size={18} />
                    </div>
                    <div className="link-content">
                        <span className="link-label">Resume</span>
                        <span className="link-value">Download PDF</span>
                    </div>
                </div>
            </div>

            <style>{`
                .contact-card-smart {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    padding: 1.5rem;
                    height: 100%;
                }
                
                .card-header {
                    display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;
                }
                .avatar-wrapper {
                    width: 48px; height: 48px; border-radius: 50%;
                    overflow: hidden; border: 2px solid rgba(255,255,255,0.1);
                    flex-shrink: 0;
                }
                .avatar-img {
                    width: 100%; height: 100%; object-fit: cover;
                    transform: scale(1.46) translateY(0.8px); /* Masked Crop to match Hero */
                }
                .profile-name { font-size: 1.1rem; color: var(--text-primary); font-weight: 500; }
                .profile-role { font-size: 0.85rem; color: var(--text-tertiary); }

                .divider { margin: 1.5rem 0; height: 1px; background: rgba(255,255,255,0.05); }

                /* Status */
                .status-badge {
                    display: inline-flex; align-items: center; gap: 0.5rem;
                    padding: 0.4rem 0.75rem; border-radius: 99px;
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
                }
                .status-dot {
                    width: 8px; height: 8px; border-radius: 50%; position: relative;
                }
                .status-ping {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    border-radius: 50%; opacity: 0.75;
                    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                .status-text { font-size: 0.8rem; color: var(--text-secondary); }

                /* Links */
                .contact-links { display: flex; flex-direction: column; gap: 0.5rem; }
                
                .link-item {
                    display: flex; align-items: center; gap: 1rem;
                    padding: 0.75rem; border-radius: 8px;
                    cursor: pointer; transition: background 0.2s;
                }
                .link-item:hover { background: rgba(255,255,255,0.03); }

                .icon-box {
                    width: 36px; height: 36px; border-radius: 8px;
                    background: rgba(255,255,255,0.05);
                    display: flex; align-items: center; justify-content: center;
                    color: var(--text-tertiary); transition: color 0.2s;
                }
                .link-item:hover .icon-box { color: var(--text-primary); background: rgba(255,255,255,0.08); }

                .link-content { flex: 1; display: flex; flex-direction: column; }
                .link-label { font-size: 0.75rem; color: var(--text-tertiary); }
                .link-value { font-size: 0.9rem; color: var(--text-secondary); font-family: var(--font-mono); }

                .copy-feedback { color: var(--text-tertiary); opacity: 0; transition: opacity 0.2s; }
                .link-item:hover .copy-feedback { opacity: 1; }

                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
            `}</style>
        </div>
    );
}
