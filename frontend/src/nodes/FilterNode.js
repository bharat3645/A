import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/store';

export const FilterNode = ({ id, data }) => {
    const [filterType, setFilterType] = useState(data?.filterType || 'equals');
    const [value, setValue] = useState(data?.value || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    return (
        <BaseNode
            id={id}
            nodeType="Filter"
            label="Filter Node"
            inputs={[{ id: 'in', position: Position.Left, label: 'Data In' }]}
            outputs={[{ id: 'out', position: Position.Right, label: 'Filtered' }]}
        >
            <div className="flex flex-col gap-2">
                <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
                    Filter Type:
                    <select
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value);
                            updateNodeField(id, 'filterType', e.target.value);
                        }}
                        className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full appearance-none"
                    >
                        <option value="equals">Equals</option>
                        <option value="contains">Contains</option>
                        <option value="greater">Greater Than</option>
                    </select>
                </label>
                <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
                    Value:
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            updateNodeField(id, 'value', e.target.value);
                        }}
                        className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full"
                    />
                </label>
            </div>
        </BaseNode>
    );
};
