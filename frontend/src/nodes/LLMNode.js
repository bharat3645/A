import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      nodeType="LLM"
      label="LLM Node"
      inputs={[
        { id: 'system', position: Position.Left, label: 'System', dataType: 'text' },
        { id: 'prompt', position: Position.Left, label: 'Prompt', dataType: 'text' }
      ]}
      outputs={[
        { id: 'response', position: Position.Right, dataType: 'llm' }
      ]}
    >
      <div className="text-[13px] text-[var(--text-secondary)]">
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
