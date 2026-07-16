import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store/store';

export const NODE_TYPE_COLORS = {
    input: 'var(--accent-green)', // Green
    output: 'var(--accent-red)', // Red
    llm: 'var(--accent-purple)', // Purple
    text: 'var(--accent-amber)', // Amber/Orange
    filter: '#06B6D4', // Cyan
    transform: 'var(--accent-blue)', // Blue
    merge: '#EC4899', // Pink
    apicall: '#F97316', // Orange
    conditional: '#EAB308', // Yellow
};

/**
 * Generates a consistent HSL color based on a string hash.
 */
const generateDynamicColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 55%)`; // Keeps colors vibrant but readable
};

/**
 * Retrieves a predefined theme color, or generates a dynamic one for unregistered types.
 */
export const getNodeColor = (nodeType) => {
    if (!nodeType) return 'var(--border-active)';
    const normalized = nodeType.toLowerCase().replace(' node', '').replace(' ', '');
    return NODE_TYPE_COLORS[normalized] || generateDynamicColor(normalized);
};

export const BaseNode = ({ id, nodeType, label, children, inputs = [], outputs = [], minWidth = 220 }) => {
    const typeColor = getNodeColor(nodeType);
    const removeNode = useStore((state) => state.removeNode);
    const edges = useStore((state) => state.edges);

    // Validation Logic for Connections
    const isValidConnection = (connection) => {
        const targetId = connection.target;
        const targetHandleId = connection.targetHandle;
        const sourceId = connection.source;

        // Ensure we don't connect a node to itself
        if (sourceId === targetId) return false;

        // Prevent multiple connections into a single input
        const isTargetOccupied = edges.some(edge => edge.targetHandle === targetHandleId);
        if (isTargetOccupied) return false;

        // Retrieve actual node objects from the store
        const state = useStore.getState();
        const sourceNode = state.nodes.find(n => n.id === sourceId);
        const targetNode = state.nodes.find(n => n.id === targetId);

        if (!sourceNode || !targetNode) return false;

        // Type inference based on node types via state
        const sourceType = sourceNode.type;
        const targetType = targetNode.type;

        // Explicit Rejection Rules demonstrating Variable Type Inference
        // 1. Output nodes cannot feed into other Output nodes
        if (sourceType === 'customOutput' && targetType === 'customOutput') {
            return false;
        }

        // 2. LLMs should preferably take text/input data.
        if (targetType === 'llm' && sourceType === 'customOutput') {
            return false; // Output nodes represent sinks, they shouldn't feed LLMs
        }

        return true;
    };

    return (
        <div
            className="relative bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[10px] shadow-node transition-colors hover:border-[var(--border-active)] group flex flex-col"
            style={{
                borderLeft: `3px solid ${typeColor}`,
                minWidth: `${minWidth}px`,
            }}
        >
            {/* Inputs */}
            {inputs.map((input, index) => (
                <Handle
                    key={input.id}
                    type="target"
                    position={input.position || Position.Left}
                    id={input.fullId || `${id}-${input.id}`}
                    isValidConnection={isValidConnection}
                    className="w-3 h-3 hover:scale-150 transition-transform bg-[var(--bg-surface)] border-2 [&.valid]:!border-[var(--accent-green)] [&.valid]:!bg-[var(--accent-green)] [&.connecting:not(.valid)]:!border-[var(--accent-red)] [&.connecting:not(.valid)]:!bg-[var(--accent-red)]"
                    style={{
                        top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
                        borderColor: typeColor,
                    }}
                >
                    {input.label && (
                        <span
                            className="absolute text-[var(--text-muted)] font-dm text-[11px] whitespace-nowrap"
                            style={{ right: '100%', marginRight: '16px', top: '50%', transform: 'translateY(-50%)' }}
                        >
                            {input.label}
                        </span>
                    )}
                </Handle>
            ))}

            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--border-subtle)] flex flex-row items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: typeColor }} />
                        <span className="font-dm text-[11px] text-[var(--text-muted)] uppercase tracking-widest leading-none">
                            {nodeType}
                        </span>
                    </div>
                    <div className="font-geist text-[15px] font-medium text-[var(--text-primary)]">
                        {label}
                    </div>
                </div>
                <button
                    onClick={() => removeNode(id)}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 -mt-1 -mr-1 rounded hover:bg-[var(--border-subtle)]"
                    title="Delete Node"
                    aria-label="Delete Node"
                >
                    ✕
                </button>
            </div>

            {/* Body */}
            <div className="px-4 py-4 flex flex-col gap-3">
                {children}
            </div>

            {/* Outputs */}
            {outputs.map((output, index) => (
                <Handle
                    key={output.id}
                    type="source"
                    position={output.position || Position.Right}
                    id={output.fullId || `${id}-${output.id}`}
                    isValidConnection={isValidConnection}
                    className="w-3 h-3 hover:scale-150 transition-transform bg-[var(--bg-surface)] border-2 [&.valid]:!border-[var(--accent-green)] [&.valid]:!bg-[var(--accent-green)] [&.connecting:not(.valid)]:!border-[var(--accent-red)] [&.connecting:not(.valid)]:!bg-[var(--accent-red)]"
                    style={{
                        top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
                        borderColor: typeColor
                    }}
                >
                    {output.label && (
                        <span
                            className="absolute text-[var(--text-muted)] font-dm text-[11px] whitespace-nowrap"
                            style={{ left: '100%', marginLeft: '16px', top: '50%', transform: 'translateY(-50%)' }}
                        >
                            {output.label}
                        </span>
                    )}
                </Handle>
            ))}
        </div>
    );
};
