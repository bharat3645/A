import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      nodeType="Output"
      label="Output Node"
      inputs={[{ id: 'value', position: Position.Left, dataType: outputType.toLowerCase() }]}
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
            value={outputType}
            onChange={handleTypeChange}
            className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full appearance-none"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
