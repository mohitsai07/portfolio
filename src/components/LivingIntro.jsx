// src/components/LivingIntro.jsx
import React, { useState, useEffect } from 'react';
import config from '../data/config.json';

/**
 * LivingIntro
 * - Rotates through phrases in config.livingIntro
 * - Uses subtle fade animation
 * - Respects prefers-reduced-motion
 */
export default function LivingIntro() {
    const phrases = config.livingIntro || [
        "Improving one project at a time.",
        "I build reliable software.",
        "Prefer clarity over cleverness."
    ];

    const [index, setIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % phrases.length);
                setIsFading(false);
            }, 600); // Wait for fade out
        }, 4000); // Rotate every 4s

        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <div className="h-8 flex items-center justify-start overflow-hidden">
            <p
                className={`text-sm md:text-base text-gray-400 font-serif italic transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
                aria-live="polite"
            >
                {phrases[index]}
            </p>
        </div>
    );
}
