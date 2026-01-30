// src/components/KeyboardHelp.jsx
import React, { useState, useEffect } from 'react';

/**
 * KeyboardHelp
 * - Shows overlay when '?' is pressed
 */
export default function KeyboardHelp() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shift + / is '?'
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <div className="bg-[#1c1917] p-8 rounded-xl border border-white/10 shadow-2xl max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-serif text-gray-100 mb-6">Keyboard Shortcuts</h3>
        <div className="space-y-4">
          <Shortcut k="Cmd+K" label="Open Command Palette" />
          <Shortcut k="N" label="Open Working Notes" />
          <Shortcut k="Esc" label="Close Modals" />
          <Shortcut k="?" label="Toggle this help" />
        </div>
      </div>
    </div>
  );
}

function Shortcut({ k, label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-sm">{label}</span>
      <kbd className="bg-white/10 border border-white/10 px-2 py-1 rounded text-xs text-gray-200 font-mono min-w-[24px] text-center">
        {k}
      </kbd>
    </div>
  );
}
