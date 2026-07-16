import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/store';

export const MergeNode = ({ id, data }) => {
    const [strategy, setStrategy] = useState(data?.strategy || 'concat');
    const updateNodeField = useStore((state) => state.updateNodeField);

    return (
        <BaseNode
            id={id}
            nodeType="Merge"
            label="Merge Node"
            inputs={[
                { id: 'stream-A', position: Position.Left, label: 'Stream A' },
                { id: 'stream-B', position: Position.Left, label: 'Stream B' }
            ]}
            outputs={[{ id: 'merged', position: Position.Right, label: 'Merged' }]}
        >
            <div className="flex flex-col gap-2">
                <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
                    Strategy:
                    <select
                        value={strategy}
                        onChange={(e) => {
                            setStrategy(e.target.value);
                            updateNodeField(id, 'strategy', e.target.value);
                        }}
                        className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full appearance-none"
                    >
                        <option value="concat">Concat</option>
                        <option value="zip">Zip</option>
                        <option value="override">Override</option>
                    </select>
                </label>
            </div>
        </BaseNode>
    );
};
