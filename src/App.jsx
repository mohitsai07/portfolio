import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import ProjectsCaseLibrary from './components/ProjectsCaseLibrary';
import ExpertiseSection from './components/ExpertiseSection'; // Updated Import
import EducationSection from './components/EducationSection';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import LiveRibbon from './components/LiveRibbon';
import WorkingNotesRail from './components/WorkingNotesRail';
import KeyboardHelp from './components/KeyboardHelp';
import ProjectAutopsy from './components/ProjectAutopsy';
import EndorsementModal from './components/EndorsementModal';
import WorkingNotesSection from './components/WorkingNotesSection';
import data from './data/config.json';
import './App.css';

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [autopsyProject, setAutopsyProject] = useState(null);
  const [endorsementItem, setEndorsementItem] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to open Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
      // 'N' to open independent Working Notes (Engineer Mode)
      if (e.key === 'n' && !paletteOpen && !autopsyProject && !endorsementItem && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        setNotesOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const onOpenAutopsy = (e) => {
      const p = data.projects.find(x => x.slug === e.detail.projectSlug);
      if (p) setAutopsyProject(p);
    };
    const onOpenEndorsement = (e) => {
      const en = data.endorsements.find(x => x.id === e.detail.endorsementId);
      if (en) setEndorsementItem(en);
    };

    window.addEventListener('openAutopsy', onOpenAutopsy);
    window.addEventListener('openEndorsement', onOpenEndorsement);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openAutopsy', onOpenAutopsy);
      window.removeEventListener('openEndorsement', onOpenEndorsement);
    };
  }, [paletteOpen, autopsyProject, endorsementItem]);

  return (
    <div className="app">
      {/* GLOBAL ENGINEER'S MIND LAYER */}
      <LiveRibbon
        onClick={(e) => {
          e.preventDefault();
          setNotesOpen(true);
        }}
      />

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenNote={() => setNotesOpen(true)}
        onOpenAutopsy={(p) => setAutopsyProject(p)}
      />

      <WorkingNotesRail
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
      />

      <KeyboardHelp />

      {/* MODALS */}
      {autopsyProject && (
        <ProjectAutopsy
          project={autopsyProject}
          onClose={() => setAutopsyProject(null)}
        />
      )}
      {endorsementItem && (
        <EndorsementModal
          item={endorsementItem}
          onClose={() => setEndorsementItem(null)}
        />
      )}

      {/* MAIN CONTENT */}
      <Navbar />
      <Hero />
      <Experience />
      <ProjectsCaseLibrary
        onOpenAutopsy={setAutopsyProject}
        onOpenEndorsement={setEndorsementItem}
      />

      {/* PHASE 5: Living Engineer Log */}
      <WorkingNotesSection />

      {/* Replaced Skills with ExpertiseSection */}
      <ExpertiseSection />
      <EducationSection />
      <Contact />
    </div>
  );
}

export default App;
