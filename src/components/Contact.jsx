// src/components/Contact.jsx
import React from 'react';
import './Contact.css';
import data from '../data/config.json';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';

const Contact = () => {
    const { profile } = data;

    return (
        <section id="contact" className="section container">
            <div className="section-header">
                <h2 className="section-title">Let’s Build Something Meaningful</h2>
                <p className="section-subtitle">
                    I’m open to internships, collaborations, and serious engineering work.
                </p>
            </div>

            <div className="contact-hub-grid">
                <div className="hub-col-left">
                    <ContactCard profile={profile} />
                </div>
                <div className="hub-col-right">
                    <ContactForm />
                </div>
            </div>

            <footer className="footer-manifesto">
                {profile.footerManifesto.map((line, i) => (
                    <div key={i} className={`footer-line ${i === 0 ? 'tagline' : 'discipline'}`}>
                        {line}
                    </div>
                ))}
            </footer>

            <style>{`
                .section-subtitle {
                    font-size: 1.1rem; color: var(--text-secondary);
                    margin-top: 0.5rem; margin-bottom: 3rem;
                    max-width: 600px; line-height: 1.5;
                }

                .contact-hub-grid {
                    display: grid; grid-template-columns: 1fr;
                    gap: 3rem; margin-bottom: 6rem;
                    align-items: start;
                }
                @media(min-width: 900px) {
                    .contact-hub-grid { grid-template-columns: 350px 1fr; gap: 5rem; }
                }

                .footer-manifesto {
                    text-align: center;
                    padding-top: 4rem;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    animation: fadeUp 1s ease-out;
                    display: flex; flex-direction: column; gap: 0.5rem;
                }

                .footer-line.tagline { font-size: 1rem; color: var(--text-secondary); font-family: var(--font-serif); font-style: italic; }
                .footer-line.copyright { font-size: 0.8rem; color: var(--text-tertiary); opacity: 0.6; }
                .footer-line.discipline { font-size: 0.75rem; color: var(--text-tertiary); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.5rem; }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default Contact;
