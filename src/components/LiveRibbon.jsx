// src/components/LiveRibbon.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Radio } from 'lucide-react';
import config from '../data/config.json';

export default function LiveRibbon({
  navSelector = '.navbar',
  onClick // Added prop so parent can handle click
}) {
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef(null);

  // 1. Config Binding
  const liveThinking = config.liveThinking;
  const hasContent = liveThinking && liveThinking.text && liveThinking.text.trim().length > 0;

  useEffect(() => {
    setMounted(true);

    // 3. Proper Positioning Logic
    const setNavHeightVar = () => {
      const nav = document.querySelector(navSelector);
      // Default to 100px (header height) if nav not found yet
      const height = nav ? Math.round(nav.getBoundingClientRect().height) : 100;
      document.documentElement.style.setProperty('--nav-height', `${height}px`);
    };

    // Initial and event-based updates
    const updatePosition = () => {
      rafRef.current = window.requestAnimationFrame(setNavHeightVar);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition, { passive: true });
    window.addEventListener('scroll', updatePosition, { passive: true });

    // MutationObserver for specific attributes that change height (like class 'scrolled')
    const navEl = document.querySelector(navSelector);
    let mo = null;
    if (navEl && window.MutationObserver) {
      mo = new MutationObserver(updatePosition);
      mo.observe(navEl, { attributes: true, attributeFilter: ['class', 'style'] });
    }

    return () => {
      setMounted(false);
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      if (mo) mo.disconnect();
    };
  }, [navSelector]);

  // 2. Conditional Rendering
  if (!mounted || !hasContent) return null;

  return (
    <>
      {/* 4. Layout Safety & 6. Accessibility */}
      <a
        href={liveThinking.link || '#'}
        className="live-ribbon"
        style={{ top: 'calc(var(--nav-height, 100px) + 16px)' }}
        role="status"
        aria-live="polite"
        onClick={(e) => {
          // Handle internal links seamlessly if needed
          if (liveThinking.link === '#' || onClick) {
            e.preventDefault();
            if (onClick) onClick(e);
          }
        }}
      >
        <Radio size={14} className="live-icon" />
        <span className="live-text">{liveThinking.text}</span>
      </a>

      <style>{`
        .live-ribbon {
          position: fixed;
          right: 5%; /* Align with container margin */
          z-index: 900; /* Below Navbar (1001) but above content */
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(28, 25, 23, 0.9);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 8px 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.2s ease, top 0.2s ease, opacity 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          text-decoration: none;
          max-width: 90vw;
          overflow: hidden;
        }

        .live-ribbon:hover {
          background: rgba(28, 25, 23, 1);
          border-color: var(--accent-color);
          transform: translateY(-2px);
        }

        .live-ribbon:focus-visible {
           outline: 2px solid var(--accent-color);
           outline-offset: 2px;
        }

        .live-icon {
          color: var(--accent-color);
          flex-shrink: 0;
          animation: pulseLive 2s infinite;
        }

        .live-text {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @keyframes pulseLive {
          0% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.6; transform: scale(0.95); }
        }
        
        /* 7. Respects prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
            .live-icon { animation: none; }
            .live-ribbon { transition: none; }
        }

        /* 5. Responsive Rules */
        @media (max-width: 768px) {
           /* On mobile, we might want to hide it or move it. 
              User requirement: "Hide ribbon OR collapse". 
              Let's hide to prevent overlap with mobile menu btn */
          .live-ribbon { 
              display: none; 
          }
        }
      `}</style>
    </>
  );
}
