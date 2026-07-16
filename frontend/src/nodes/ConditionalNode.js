import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/store';

export const ConditionalNode = ({ id, data }) => {
    const [operator, setOperator] = useState(data?.operator || 'equal');
    const [compareValue, setCompareValue] = useState(data?.compareValue || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    return (
        <BaseNode
            id={id}
            nodeType="Conditional"
            label="Condition"
            inputs={[{ id: 'value', position: Position.Left, label: 'Value' }]}
            outputs={[
                { id: 'true-branch', position: Position.Right, label: 'True' },
                { id: 'false-branch', position: Position.Right, label: 'False' }
            ]}
        >
            <div className="flex flex-col gap-2">
                <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
                    Operator:
                    <select
                        value={operator}
                        onChange={(e) => {
                            setOperator(e.target.value);
                            updateNodeField(id, 'operator', e.target.value);
                        }}
                        className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full appearance-none"
                    >
                        <option value="equal">Equals (==)</option>
                        <option value="not_equal">Not Equals (!=)</option>
                        <option value="greater">Greater Than (&gt;)</option>
                        <option value="less">Less Than (&lt;)</option>
                    </select>
                </label>
                <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
                    Compare to:
                    <input
                        type="text"
                        value={compareValue}
                        onChange={(e) => {
                            setCompareValue(e.target.value);
                            updateNodeField(id, 'compareValue', e.target.value);
                        }}
                        className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full"
                    />
                </label>
            </div>
        </BaseNode>
    );
};
