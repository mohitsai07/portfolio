import React, { useState } from 'react';
import './ProfileFlipCard.css';
import frontImg from '../assets/profile-front.jpg';
import backImg from '../assets/profile-back.jpg';

const ProfileFlipCard = () => {
  const [flipped, setFlipped] = useState(false);

  // Mobile tap handler
  const handleTap = () => {
    // Only toggle on tap/click (useful for mobile)
    setFlipped(!flipped);
  };

  const handleMouseLeave = () => {
    setFlipped(false);
  }

  return (
    <div
      className="flip-container"
      onClick={handleTap}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flipper ${flipped ? 'flipped' : ''}`}>

        {/* FRONT SIDE - Main Profile */}
        <div className="flip-face front">
          <div className="glow-ring"></div>
          <img src={frontImg} alt="Mohit Sai" className="avatar-img" />
        </div>

        {/* BACK SIDE - Greeting/Avatar */}
        <div className="flip-face back">
          <div className="glow-ring-back"></div>
          <img src={backImg} alt="Hi!" className="avatar-img-back" />
          <div className="greeting-badge">
            <span className="wave">👋</span> Hi!
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileFlipCard;
