// store.js

import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

/**
 * Global Pipeline Store
 * Manages the state of the React Flow canvas, including nodes, edges,
 * and unique ID generation for each node type.
 */
export const useStore = create((set, get) => ({
  // Canvas State
  nodes: [],
  edges: [],

  // Theme State
  theme: localStorage.getItem('pipeline-theme') || 'system', // 'dark', 'light', 'system'

  setTheme: (theme) => {
    localStorage.setItem('pipeline-theme', theme);
    set({ theme });
  },

  // Tracks the count of each node type for strict incremental ID generation
  nodeIDs: {},

  /**
   * Generates a unique, strictly incremental ID for a new node.
   * e.g., 'text-1', 'llm-2'
   */
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;

    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  /**
   * Resets the entire canvas state.
   * Useful for the 'Clear Canvas' action.
   */
  reset: () => {
    set({ nodes: [], edges: [], nodeIDs: {} });
  },

  /**
   * Appends a new node to the canvas.
   */
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },

  /**
   * Removes a node by ID and automatically deletes any connected edges.
   */
  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },

  // React Flow internal handlers for dragging, selecting, and connecting
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, type: 'smoothstep', animated: true }, get().edges),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // Return a strictly new object reference to ensure React Flow re-renders
          return { ...node, data: { ...node.data, [fieldName]: fieldValue } };
        }
        return node;
      }),
    });
  },
}));
