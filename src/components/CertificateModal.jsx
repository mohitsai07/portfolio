// src/components/CertificateModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Download, Shield, XCircle } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
    const modalRef = useRef(null);
    const [imgError, setImgError] = useState(false);

    // Focus Trap & Escape Key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            if (modalRef.current) {
                // Focus the close button first for easy exit
                const closeBtn = modalRef.current.querySelector('.close-action');
                if (closeBtn) closeBtn.focus();
            }
        }, 50);

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    // Badge Generator Logic
    const handleDownloadBadge = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = 600;
        const height = 315;
        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = '#1c1917';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = '#d4b996';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, width - 40, height - 40);

        ctx.fillStyle = '#f3f4f6';
        ctx.font = 'bold 32px serif';
        ctx.textAlign = 'center';
        ctx.fillText(certificate.title, width / 2, 100);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '20px sans-serif';
        ctx.fillText('Certified & Verified', width / 2, 140);

        ctx.fillStyle = '#d4b996';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(certificate.provider, width / 2, 200);

        ctx.fillStyle = '#6b7280';
        ctx.font = '16px monospace';
        ctx.fillText(`ID: ${certificate.id.toUpperCase()} • ${certificate.year}`, width / 2, 240);

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `badge-${certificate.id}.png`;
        link.href = dataUrl;
        link.click();
    };

    if (!certificate) return null;

    return ReactDOM.createPortal(
        <div className="modal-backdrop" onClick={onClose}>
            <div
                ref={modalRef}
                className="cert-modal-content"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cert-title"
            >
                <style>{`
                    .modal-backdrop {
                        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                        background: rgba(0, 0, 0, 0.4);
                        backdrop-filter: blur(8px);
                        display: flex; align-items: center; justify-content: center;
                        z-index: 9999;
                        padding: 1rem;
                    }

                    .cert-modal-content {
                        background: #1c1917; /* Matte Charcoal */
                        border: 1px solid rgba(255,255,255,0.05);
                        width: 100%; max-width: 950px;
                        height: 85vh; max-height: 650px;
                        border-radius: 12px;
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.6);
                        overflow: hidden;
                    }
                    @media(min-width: 768px) {
                        .cert-modal-content { flex-direction: row; height: auto; min-height: 500px; }
                    }

                    /* Close Button Area */
                    .close-container {
                        position: absolute;
                        top: 1rem; right: 1rem;
                        z-index: 10;
                    }
                    .close-action {
                        background: rgba(0,0,0,0.5);
                        border: 1px solid rgba(255,255,255,0.1);
                        color: #fff;
                        display: flex; align-items: center; gap: 0.5rem;
                        padding: 0.5rem 1rem;
                        border-radius: 99px;
                        font-size: 0.8rem;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .close-action:hover {
                        background: rgba(255,255,255,0.1);
                    }

                    /* Split Layout */
                    .cert-preview-col {
                        flex: 0 0 60%; /* Strict 60% width */
                        max-width: 60%;
                        background: #111;
                        padding: 2rem;
                        display: flex; align-items: center; justify-content: center;
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                        position: relative;
                    }
                    @media(min-width: 768px) {
                        .cert-preview-col { border-bottom: none; border-right: 1px solid rgba(255,255,255,0.05); }
                    }

                    .cert-img {
                        max-width: 100%; 
                        max-height: 100%;
                        object-fit: contain; /* Ensure image scales nicely */
                        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                        border: 1px solid rgba(255,255,255,0.1);
                        border-radius: 4px;
                        transition: transform 0.3s ease;
                    }
                    .cert-preview-col:hover .cert-img {
                        transform: scale(1.02);
                    }
                    
                    /* ... (unchanged parts) ... */

                    .cert-details-col {
                        flex: 1;
                        min-width: 0; /* CRITICAL: Prevents text from pushing flex container wide */
                        padding: 2.5rem;
                        display: flex;
                        flex-direction: column;
                        overflow-y: auto;
                    }

                    /* Typography */
                    .cert-meta {
                        font-size: 0.75rem; color: var(--text-tertiary);
                        text-transform: uppercase; letter-spacing: 0.05em;
                        margin-bottom: 0.75rem;
                    }
                    .cert-title {
                        font-family: var(--font-heading); font-size: 1.75rem;
                        color: #f3f4f6; line-height: 1.2; margin-bottom: 1.5rem;
                    }
                    
                    .section-label {
                        font-family: var(--font-serif); font-style: italic;
                        color: var(--text-tertiary); font-size: 0.9rem; margin-bottom: 0.5rem;
                    }
                    .outcome-text {
                        color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;
                        margin-bottom: 2rem; border-left: 2px solid var(--accent-color);
                        padding-left: 1rem;
                    }

                    /* Footer Actions */
                    .action-row {
                        margin-top: auto; padding-top: 2rem;
                        border-top: 1px solid rgba(255,255,255,0.05);
                    }
                    
                    .btn-dl {
                        width: 100%;
                        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                        padding: 0.8rem; border-radius: 6px;
                        background: rgba(255,255,255,0.05);
                        border: 1px solid rgba(255,255,255,0.1);
                        color: #fff; font-size: 0.9rem; cursor: pointer;
                        transition: all 0.2s;
                    }
                    .btn-dl:hover {
                        background: rgba(255,255,255,0.1);
                        border-color: rgba(255,255,255,0.2);
                    }
                `}</style>

                <div className="close-container">
                    <button onClick={onClose} className="close-action" aria-label="Close">
                        <span>Close</span>
                        <XCircle size={16} />
                    </button>
                </div>

                <div className="cert-preview-col">
                    {!imgError ? (
                        <img
                            src={certificate.proofImage}
                            alt={`Certificate: ${certificate.title}`}
                            className="cert-img"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="flex flex-col items-center text-gray-500 gap-2">
                            <Shield size={48} />
                            <span className="text-xs font-mono">Proof Image Not Available</span>
                        </div>
                    )}
                </div>

                <div className="cert-details-col">
                    <div className="cert-meta">
                        {certificate.provider} • {certificate.month} {certificate.year}
                    </div>

                    <h2 id="cert-title" className="cert-title">{certificate.title}</h2>

                    <p className="section-label">Learning Outcome</p>
                    <p className="outcome-text">{certificate.skillsLearned}</p>

                    {certificate.relatedProjects && certificate.relatedProjects.length > 0 && (
                        <div className="mb-8">
                            <p className="section-label">Applied In</p>
                            <div className="flex flex-wrap gap-2">
                                {certificate.relatedProjects.map(p => (
                                    <span key={p} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-xs text-gray-400">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="action-row">
                        <button onClick={handleDownloadBadge} className="btn-dl">
                            <Download size={16} />
                            Download Verified Badge
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
