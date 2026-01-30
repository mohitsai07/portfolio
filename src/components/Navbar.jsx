import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Menu, X } from 'lucide-react';
import data from '../data/config.json';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navItems, profile } = data;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // State transition logic (Threshold > 40px)
          setScrolled(scrollY > 40);

          // Scroll Spy Logic
          const scrollPos = scrollY + 150; // Offset for better centering detection

          // Reverse check to find the last section that is active
          for (let i = navItems.length - 1; i >= 0; i--) {
            const item = navItems[i];
            const section = document.getElementById(item.id);
            if (section) {
              if (section.offsetTop <= scrollPos) {
                setActiveSection(item.id);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset for fixed navbar
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo - Minimal Text */}
      <div
        className="nav-logo-container"
        onClick={() => window.location.reload()}
      >
        <span className="nav-logo-text">{profile.logoText}</span>
      </div>

      {/* Desktop Navigation */}
      <div className="nav-desktop">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>



      {/* Mobile Toggle */}
      <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay glass-panel">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link mobile-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
