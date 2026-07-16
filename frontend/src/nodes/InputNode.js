import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      nodeType="Input"
      label="Input Node"
      outputs={[{ id: 'value', position: Position.Right, dataType: inputType.toLowerCase() }]}
    >
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full"
          />
        </label>
        <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full appearance-none"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
