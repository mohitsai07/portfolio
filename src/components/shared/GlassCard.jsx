import React from 'react';

/**
 * Reusable GlassCard component to enforce the "Thin, crisp glassmorphism" style.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside the card
 * @param {string} [props.className] - Additional classes
 * @param {Object} [props.style] - Inline styles
 * @param {Function} [props.onClick] - Click handler
 */
const GlassCard = ({ children, className = '', style, onClick }) => {
    return (
        <div
            className={`glass-panel ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default GlassCard;
