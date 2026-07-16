import React from 'react';

export const ResultModal = ({ result, onClose }) => {
    if (!result) return null;

    const { num_nodes, num_edges, is_dag } = result;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-active)] rounded-xl p-8 max-w-[420px] w-full shadow-2xl translate-y-0 animate-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="flex flex-col items-center gap-3 text-center mb-8">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${is_dag ? 'bg-[#3ECF8E]/20 text-[#3ECF8E]' : 'bg-[#FF4D6D]/20 text-[#FF4D6D]'}`}>
                        {is_dag ? (
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <h2 className="text-[18px] font-geist font-semibold text-[var(--text-primary)]">Pipeline Analysis</h2>
                        <p className="text-[14px] font-geist text-[var(--text-secondary)] mt-1">
                            {is_dag ? "Your pipeline successfully compiled." : "Cyclic graph detected. Please resolve loops."}
                        </p>
                    </div>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-[var(--bg-surface)] rounded-lg p-4 flex flex-col items-center border border-[var(--border-subtle)]">
                        <span className="font-dm font-bold text-[32px] text-[#4F7AFF] leading-none mb-2">{num_nodes}</span>
                        <span className="font-geist text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-widest">Nodes</span>
                    </div>
                    <div className="bg-[var(--bg-surface)] rounded-lg p-4 flex flex-col items-center border border-[var(--border-subtle)]">
                        <span className="font-dm font-bold text-[32px] text-[#9B6DFF] leading-none mb-2">{num_edges}</span>
                        <span className="font-geist text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-widest">Edges</span>
                    </div>
                    <div className="bg-[var(--bg-surface)] rounded-lg p-4 flex flex-col items-center border border-[var(--border-subtle)]">
                        <span className={`font-dm font-bold text-[32px] leading-none mb-2 ${is_dag ? 'text-[#3ECF8E]' : 'text-[#FF4D6D]'}`}>
                            {is_dag ? 'YES' : 'NO'}
                        </span>
                        <span className="font-geist text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-widest">Is DAG</span>
                    </div>
                </div>

                {/* Actions */}
                <button
                    onClick={onClose}
                    className="w-full bg-transparent border border-[var(--border-subtle)] rounded-md px-4 py-3 font-geist font-medium text-[14px] text-[var(--text-primary)] hover:border-[var(--border-active)] hover:bg-[var(--border-subtle)]/50 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
