// src/components/ContactForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, Check, Loader2, Sparkles, ChevronDown } from 'lucide-react';

const SUBJECTS = [
    { id: 'hiring', label: 'Hiring / Job Proposal', placeholder: 'I have an engineering role that matches your skills...' },
    { id: 'collaborate', label: 'Collaboration', placeholder: 'I’m working on a project and need a partner...' },
    { id: 'internship', label: 'Internship Opportunity', placeholder: 'We are looking for interns to join our team...' },
    { id: 'feedback', label: 'Feedback', placeholder: 'Just wanted to say I like your portfolio...' },
    { id: 'other', label: 'Other', placeholder: 'Tell me what you’d like to build, discuss, or explore together…' }
];

const TONES = [
    { id: 'professional', label: 'Professional' },
    { id: 'friendly', label: 'Friendly' },
    { id: 'technical', label: 'Technical' }
];

// Custom Dropdown Component
function LuxurySelect({ options, value, onChange, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(o => o.id === value?.id) || options[0];

    return (
        <div className="lux-select-container" ref={containerRef}>
            <label className="form-label">{label}</label>
            <button
                type="button"
                className={`lux-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="truncate">{selectedOption.label}</span>
                <ChevronDown size={16} className={`lux-chevron ${isOpen ? 'rotate' : ''}`} />
            </button>

            {isOpen && (
                <div className="lux-menu" role="listbox">
                    {options.map((opt) => (
                        <div
                            key={opt.id}
                            className={`lux-option ${value?.id === opt.id ? 'selected' : ''}`}
                            onClick={() => {
                                onChange(opt);
                                setIsOpen(false);
                            }}
                            role="option"
                            aria-selected={value?.id === opt.id}
                        >
                            {opt.label}
                            {value?.id === opt.id && <Check size={14} className="text-[#D6B98C]" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ContactForm() {
    const [subject, setSubject] = useState(SUBJECTS[0]);
    const [tone, setTone] = useState(TONES[0]);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [easterEgg, setEasterEgg] = useState(false);
    const [focused, setFocused] = useState('');

    useEffect(() => {
        if (formData.message.toLowerCase().includes('hello mohit')) setEasterEgg(true);
        else setEasterEgg(false);
    }, [formData.message]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate network request
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <div className="success-message-box">
                <div className="success-icon-ring">
                    <Check size={32} className="text-black" />
                </div>
                <h3 className="text-xl text-primary font-medium mb-2 mt-4 text-[#D6B98C]">Thank you.</h3>
                <p className="text-gray-400">I’ll get back to you soon.</p>
                <button
                    onClick={() => {
                        setStatus('idle');
                        setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-8 text-xs tracking-widest uppercase text-gray-500 hover:text-[#D6B98C] transition-colors"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form-premium">
            <p className="form-microcopy top">I read every message personally.</p>

            {/* Custom Dropdown */}
            <div className="mb-5">
                <LuxurySelect
                    label="What is this about?"
                    options={SUBJECTS}
                    value={subject}
                    onChange={setSubject}
                />
            </div>

            {/* Layout Grid for Inputs */}
            <div className="form-grid mb-4">
                <div className="form-group">
                    <label className={`form-label-float ${focused === 'name' || formData.name ? 'active' : ''}`}>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused('')}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className={`form-label-float ${focused === 'email' || formData.email ? 'active' : ''}`}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        className="form-input"
                        required
                    />
                </div>
            </div>

            {/* Tone Selector */}
            <div className="mb-6">
                <label className="form-label mb-3 block">Tone</label>
                <div className="flex flex-wrap gap-3">
                    {TONES.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setTone(t)}
                            className={`tone-chip ${tone.id === t.id ? 'active' : ''}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Textarea */}
            <div className="form-group relative mt-1">
                <label className={`form-label-float ${focused === 'message' || formData.message ? 'active' : ''}`}>Your Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    className={`form-textarea ${easterEgg ? 'easter-active' : ''}`}
                    placeholder={focused === 'message' ? subject.placeholder : ''}
                    required
                ></textarea>
                {easterEgg && (
                    <div className="easter-egg-response">
                        <Sparkles size={14} className="text-yellow-400" />
                        <span>Hey 👋 Nice to meet you!</span>
                    </div>
                )}
            </div>

            <div className="form-footer">
                <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                        <>
                            <Loader2 size={18} className="animate-spin text-black" />
                            <span className="text-black">Sending...</span>
                        </>
                    ) : (
                        <>
                            <span className="text-black">Send Interaction</span>
                            <Send size={18} className="text-black" />
                        </>
                    )}
                </button>
                <p className="form-microcopy bottom">Usually replies within 24–48 hours.</p>
            </div>

            <style>{`
                /* SPACING REFINEMENTS */
                .mb-5 { margin-bottom: 2.5rem; } /* Select spacing */
                .form-grid.mb-4 { margin-bottom: 2.5rem; } /* Inputs spacing */
                .mb-6 { margin-bottom: 2.5rem; } /* Tone spacing */

                /* UTILS */
                .contact-form-premium { display: flex; flex-direction: column; position: relative; }
                .form-microcopy.top { margin-bottom: 2.5rem; color: #D6B98C; opacity: 0.8; font-size: 0.8rem; font-style: italic; font-family: var(--font-serif); }
                .form-microcopy.bottom { margin-top: 1.5rem; text-align: center; opacity: 0.6; font-size: 0.75rem; }
                
                .form-grid { display: grid; gap: 2rem; }
                @media(min-width: 640px) { .form-grid { grid-template-columns: 1fr 1fr; } }

                .form-label { display: block; font-size: 0.75rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; }
                
                /* LUXURY SELECT */
                .lux-select-container { position: relative; width: 100%; }
                .lux-trigger {
                    width: 100%; display: flex; align-items: center; justify-content: space-between;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 1rem 1.25rem; /* Spacious padding */
                    color: var(--text-primary);
                    font-size: 0.95rem; cursor: pointer; transition: all 0.2s;
                    text-align: left;
                }
                .lux-trigger:hover, .lux-trigger.open {
                    background: rgba(255,255,255,0.05);
                    border-color: #D6B98C;
                    box-shadow: 0 0 15px rgba(214, 185, 140, 0.05);
                }
                .lux-chevron { color: var(--text-tertiary); transition: transform 0.2s ease; }
                .lux-chevron.rotate { transform: rotate(180deg); color: #D6B98C; }

                .lux-menu {
                    position: absolute; top: 100%; left: 0; right: 0; z-index: 50;
                    margin-top: 0.5rem;
                    background: #161412;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
                    overflow: hidden;
                    animation: fadeInDown 0.2s ease-out forwards;
                }
                .lux-option {
                    padding: 14px 18px; /* Larger hit area */
                    font-size: 0.9rem; color: #e6e1d8;
                    cursor: pointer; transition: all 0.15s;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .lux-option:hover { background: rgba(214, 185, 140, 0.08); color: #D6B98C; }
                .lux-option.selected { background: rgba(214, 185, 140, 0.05); color: #D6B98C; font-weight: 500; }

                /* TONE CHIPS */
                .tone-chip {
                    padding: 8px 18px; /* Larger chips */
                    border-radius: 999px;
                    font-size: 0.85rem;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.12);
                    color: var(--text-tertiary);
                    cursor: pointer; transition: all 0.2s;
                }
                .tone-chip:hover {
                    box-shadow: 0 0 10px rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.2);
                }
                .tone-chip.active {
                    background: rgba(214, 185, 140, 0.15);
                    border-color: #D6B98C;
                    color: #D6B98C;
                    box-shadow: 0 0 15px rgba(214, 185, 140, 0.1);
                    transform: scale(1.02);
                }

                /* INPUTS & AUTOFILL FIX */
                .form-group { position: relative; }
                .form-input, .form-textarea {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 1rem;
                    color: var(--text-primary);
                    font-size: 1rem; transition: all 0.2s;
                }
                
                /* CRITICAL: Override Browser Autofill White Background */
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus, 
                textarea:-webkit-autofill,
                textarea:-webkit-autofill:hover,
                textarea:-webkit-autofill:focus {
                    -webkit-text-fill-color: #e6e1d8 !important;
                    -webkit-box-shadow: 0 0 0px 1000px #161412 inset !important;
                    transition: background-color 5000s ease-in-out 0s;
                    caret-color: #e6e1d8;
                }

                .form-input:focus, .form-textarea:focus {
                    outline: none; border-color: #D6B98C;
                    background: rgba(255,255,255,0.05);
                    box-shadow: 0 0 0 1px rgba(214, 185, 140, 0.1);
                }
                .form-textarea {
                    min-height: 140px; max-height: 220px;
                    resize: none; overflow-y: auto;
                }

                .form-label-float {
                    position: absolute; left: 1rem; top: 1rem;
                    font-size: 0.9rem; color: var(--text-tertiary);
                    pointer-events: none; transition: 0.2s ease;
                    text-transform: uppercase; letter-spacing: 0.05em;
                    z-index: 10;
                }
                /* Ensure active label sits above autofill background */
                .form-label-float.active {
                    top: -0.6rem; left: 0.5rem;
                    font-size: 0.7rem; color: #D6B98C;
                    background: #161412; /* Matches autofill bg */
                    padding: 0 0.5rem;
                    border-radius: 4px;
                }

                /* EASTER EGG */
                .easter-active { border-color: #ffd700 !important; box-shadow: 0 0 15px rgba(255, 215, 0, 0.1); }
                .easter-egg-response {
                    position: absolute; bottom: 1rem; right: 1rem;
                    background: rgba(0,0,0,0.8); padding: 0.5rem 1rem;
                    border-radius: 99px; font-size: 0.8rem;
                    display: flex; align-items: center; gap: 0.5rem;
                    animation: fadeIn 0.3s ease-out; pointer-events: none;
                }

                /* SUBMIT BUTTON */
                .form-footer { margin-top: 3rem; display: flex; flex-direction: column; align-items: center; }
                .btn-submit {
                    width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.75rem;
                    padding: 1.1rem 3rem; background: #D6B98C; color: #000;
                    border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
                    transition: all 0.3s; box-shadow: 0 4px 15px rgba(214, 185, 140, 0.2);
                }
                @media(min-width: 640px) { .btn-submit { width: auto; min-width: 200px; } }
                .btn-submit:hover:not(:disabled) {
                    background: #Cabba0; transform: scale(1.02) translateY(-2px);
                    box-shadow: 0 8px 25px rgba(214, 185, 140, 0.3);
                }
                .btn-submit:active { transform: scale(0.98); }

                /* SUCCESS STATE */
                .success-message-box {
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    height: 100%; min-height: 400px; text-align: center; animation: fadeIn 0.5s ease-out;
                }
                .success-icon-ring {
                    width: 64px; height: 64px; border-radius: 50%; background: #D6B98C;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 0 20px rgba(214, 185, 140, 0.2);
                    animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                @keyframes fadeInDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scaleUp { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </form>
    );
}
