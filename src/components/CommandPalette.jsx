// src/components/CommandPalette.jsx
import React, { useState, useEffect } from 'react';
import { Search, Command, ArrowRight, FileText, Monitor } from 'lucide-react';
import config from '../data/config.json';

/**
 * CommandPalette
 * - Global accessible menu (Cmd/Ctrl + K)
 * - Navigation + "Engineer Actions"
 */
export default function CommandPalette({ isOpen, onClose, onOpenNote, onOpenAutopsy }) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Define commands
    const commands = [
        {
            id: 'home',
            label: 'Go to Home',
            icon: <ArrowRight size={14} />,
            action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 'work',
            label: 'Go to Work',
            icon: <ArrowRight size={14} />,
            action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 'projects',
            label: 'Go to Projects',
            icon: <ArrowRight size={14} />,
            action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 'notes',
            label: 'Read Working Notes',
            icon: <FileText size={14} />,
            action: () => onOpenNote()
        },
        // Dynamic project autopsies
        ...config.projects.filter(p => p.autopsy).map(p => ({
            id: `autopsy-${p.slug}`,
            label: `View Autopsy: ${p.title}`,
            icon: <Monitor size={14} />,
            action: () => onOpenAutopsy(p)
        }))
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(i => (i + 1) % filteredCommands.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                filteredCommands[selectedIndex]?.action();
                onClose();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="w-full max-w-lg bg-[#1c1917] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                    <Command className="text-gray-500" size={18} />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type a command or search..."
                        className="flex-1 bg-transparent text-gray-200 outline-none text-sm placeholder:text-gray-600"
                        value={query}
                        onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                    />
                    <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded">ESC</span>
                </div>

                <div className="max-h-[300px] overflow-y-auto py-2">
                    {filteredCommands.length > 0 ? filteredCommands.map((cmd, idx) => (
                        <button
                            key={cmd.id}
                            onClick={() => { cmd.action(); onClose(); }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors
                        ${idx === selectedIndex ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                    `}
                        >
                            {cmd.icon}
                            {cmd.label}
                        </button>
                    )) : (
                        <div className="px-4 py-8 text-center text-gray-600 text-xs">
                            No results found.
                        </div>
                    )}
                </div>

                <div className="px-4 py-2 bg-black/20 border-t border-white/5 text-[10px] text-gray-600 flex justify-between">
                    <span>Use arrows to navigate</span>
                    <span>↵ Select</span>
                </div>
            </div>
        </div>
    );
}
