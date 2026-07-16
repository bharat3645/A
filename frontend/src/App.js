import React, { useState, useEffect } from 'react';
import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineUI } from './pages/PipelineUI';
import { Navbar } from './components/Navbar';
import { ResultModal } from './components/ResultModal';
import { submitPipeline } from './api/submit';
import { useStore } from './store/store';

function App() {
  const [result, setResult] = useState(null);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const theme = useStore((state) => state.theme);

  // Theme observer
  useEffect(() => {
    const root = document.documentElement;
    const isDarkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'light' || (theme === 'system' && !isDarkOS)) {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const handleRunPipeline = async () => {
    // Collect specific fields instead of full objects for cleanliness
    const submissionNodes = nodes.map(n => ({ id: n.id, type: n.type }));
    const submissionEdges = edges.map(e => ({ source: e.source, target: e.target }));

    const analysis = await submitPipeline(submissionNodes, submissionEdges);
    if (analysis) {
      setResult(analysis);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[var(--bg-base)] text-[var(--text-primary)] overflow-hidden">
      <Navbar onRun={handleRunPipeline} />
      <div className="flex flex-1 overflow-hidden relative">
        <PipelineToolbar />
        <div className="flex-1 h-full relative">
          <PipelineUI />
        </div>
      </div>
      <ResultModal result={result} onClose={() => setResult(null)} />
    </div>
  );
}

export default App;
