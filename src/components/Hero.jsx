import React from 'react';
import './Hero.css';
import data from '../data/config.json';
import LivingIntro from './LivingIntro'; // Import new component

const Hero = () => {
    const { profile } = data;

    return (
        <section id="home" className="hero section container">
            <div className="hero-content">
                <div className="hero-portrait-container">
                    <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="hero-portrait"
                        width="180"
                        height="180"
                    />
                </div>

                <div className="hero-text-block">
                    <p className="hero-greeting">Hi, I'm Mohit.</p>

                    {/* Replaced inline logic with component */}
                    <div className="hero-living-intro mb-4">
                        <LivingIntro />
                    </div>

                    <h1 className="hero-name">{profile.logoText}</h1>
                    <p className="hero-subtitle">{profile.tagline}</p>

                    {profile.academicLine && (
                        <p className="hero-academic-line">{profile.academicLine}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
