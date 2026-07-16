// DraggableNode.js
import { getNodeColor } from '../nodes/BaseNode';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const dotColor = getNodeColor(label);

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{ cursor: 'grab' }}
      draggable
    >
      <div className="bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)] p-3 flex flex-row items-center hover:border-[var(--border-active)] transition-colors duration-150">
        <div className="w-2.5 h-2.5 rounded-full mr-3 shrink-0" style={{ backgroundColor: dotColor }} />
        <span className="font-geist text-[13px] font-medium text-[var(--text-primary)] flex-1 truncate">{label}</span>
        <span className="text-[var(--text-muted)] font-dm ml-2 shrink-0">⠠⠧</span>
      </div>
    </div>
  );
};
