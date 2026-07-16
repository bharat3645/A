// PipelineToolbar.js
import { DraggableNode } from './DraggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="w-[240px] h-full bg-[var(--bg-elevated)] border-r border-[var(--border-subtle)] flex flex-col pt-4">
            <div className="px-4 pb-4 font-dm text-[11px] text-[var(--text-muted)] uppercase tracking-widest font-medium">
                Nodes
            </div>
            <div className="flex flex-col gap-2 px-4 pb-4 overflow-y-auto">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='apiCall' label='API Call' />
                <DraggableNode type='conditional' label='Conditional' />
            </div>
            <div className="mt-auto p-4 border-t border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] text-[11px] font-dm">⌘ Drag nodes onto canvas</span>
            </div>
        </div>
    );
};
