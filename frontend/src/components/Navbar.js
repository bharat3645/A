import React, { useState } from 'react';
import { useStore } from '../store/store';

export const Navbar = ({ onRun }) => {
    const [pipelineName, setPipelineName] = useState('Untitled Pipeline');
    const resetStore = useStore((state) => state.reset);
    const theme = useStore((state) => state.theme);
    const setTheme = useStore((state) => state.setTheme);

    return (
        <div className="h-[52px] w-full bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between px-6 shrink-0">
            {/* Left */}
            <div className="flex items-center gap-2">
                <span className="text-[#4F7AFF] text-[22px]">⬡</span>
                <span className="font-geist font-bold text-[22px] tracking-tight text-[var(--text-primary)]">
                    VectorShift
                </span>
            </div>

            {/* Center */}
            <div className="absolute left-1/2 -translate-x-1/2">
                <input
                    type="text"
                    value={pipelineName}
                    onChange={(e) => setPipelineName(e.target.value)}
                    className="bg-transparent border border-transparent hover:border-[var(--border-subtle)] focus:border-[#4F7AFF] focus:bg-[var(--bg-surface)] rounded px-3 py-1 font-geist font-medium text-[15px] text-[var(--text-primary)] text-center w-[250px] transition-colors outline-none cursor-pointer focus:cursor-text"
                />
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="bg-transparent border border-[var(--border-subtle)] rounded-md px-3 py-2 font-geist font-medium text-[13px] text-[var(--text-secondary)] hover:border-[var(--border-active)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-center gap-2"
                    title="Toggle Theme"
                >
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
                <button
                    onClick={resetStore}
                    className="bg-transparent border border-[var(--border-subtle)] rounded-md px-4 py-2 font-geist font-medium text-[13px] text-[var(--text-secondary)] hover:border-[var(--border-active)] hover:text-[var(--text-primary)] transition-colors"
                >
                    Clear Canvas
                </button>
                <button
                    onClick={onRun}
                    className="bg-[#4F7AFF] border-none rounded-md px-4 py-2 font-geist font-medium text-[13px] text-white hover:bg-[#3D68FF] active:scale-[0.98] transition-all shadow-[0_0_12px_rgba(79,122,255,0.3)]"
                >
                    Run Pipeline →
                </button>
            </div>
        </div>
    );
};
