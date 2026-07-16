import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/store';

export const TransformNode = ({ id, data }) => {
    const [operation, setOperation] = useState(data?.operation || 'uppercase');
    const updateNodeField = useStore((state) => state.updateNodeField);

    return (
        <BaseNode
            id={id}
            nodeType="Transform"
            label="Transform Node"
            inputs={[{ id: 'raw', position: Position.Left, label: 'Raw' }]}
            outputs={[{ id: 'transformed', position: Position.Right, label: 'Transformed' }]}
        >
            <div className="flex flex-col gap-2">
                <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
                    Operation:
                    <select
                        value={operation}
                        onChange={(e) => {
                            setOperation(e.target.value);
                            updateNodeField(id, 'operation', e.target.value);
                        }}
                        className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full appearance-none"
                    >
                        <option value="uppercase">Uppercase</option>
                        <option value="trim">Trim Whitespace</option>
                        <option value="parse_json">Parse JSON</option>
                        <option value="stringify">Stringify</option>
                    </select>
                </label>
            </div>
        </BaseNode>
    );
};
