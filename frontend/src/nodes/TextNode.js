import { useState, useEffect } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import TextareaAutosize from 'react-textarea-autosize';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.add(match[1]);
    }
    setVariables(Array.from(matches));
  }, [currText]);

  // Crucial: Tell React Flow to recalculate dynamically generated handle positions
  // This must run AFTER the component re-renders with the new variables array!
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables.join(','), id, updateNodeInternals]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  const inputs = variables.map((variable) => ({
    id: variable,
    fullId: `${id}-var-${variable}`,
    label: variable,
    position: Position.Left,
    dataType: 'text' // Texts usually take text inputs
  }));

  return (
    <BaseNode
      id={id}
      nodeType="Text"
      label="Text Node"
      inputs={inputs}
      outputs={[{ id: 'output', position: Position.Right, dataType: 'text' }]}
      minWidth={250}
    >
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-[13px] text-[var(--text-primary)]">
          Text:
          <TextareaAutosize
            minRows={2}
            value={currText}
            onChange={handleTextChange}
            className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md px-2.5 py-1.5 focus:border-[#4F7AFF] focus:ring-1 focus:ring-[#4F7AFF]/20 outline-none w-full resize-none leading-relaxed text-[var(--text-primary)]"
          />
        </label>
      </div>
    </BaseNode>
  );
}
