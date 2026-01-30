import React from 'react';

export default function EndorsementCard({ item, onOpen }) {
    if (!item) return null;

    return (
        <button
            onClick={() => onOpen(item)}
            className="endorsement-card-btn"
            aria-label={`Open endorsement by ${item.author}`}
        >
            <div className="ec-content">
                <div className="ec-quote-mark">“</div>
                <div className="ec-text-block">
                    <p className="ec-excerpt">
                        {item.excerpt}
                    </p>
                    <div className="ec-meta">
                        <span className="ec-author">{item.author}</span>
                        <span className="ec-date">• {new Date(item.date).getFullYear()}</span>
                        {item.impressions && <span className="ec-impressions">{item.impressions} impressions</span>}
                    </div>
                </div>
            </div>
            <style>{`
        .endorsement-card-btn {
          width: 100%;
          text-align: left;
          padding: 1rem;
          background: rgba(255,255,255,0.01);
          border: 1px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .endorsement-card-btn:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.1);
        }
        .ec-content {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .ec-quote-mark {
          font-family: var(--font-heading);
          font-size: 2rem;
          line-height: 1;
          color: var(--text-tertiary);
          opacity: 0.5;
        }
        .ec-text-block {
          flex: 1;
        }
        .ec-excerpt {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ec-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
        .ec-author {
          font-weight: 500;
          color: var(--text-secondary);
        }
      `}</style>
        </button>
    );
}
