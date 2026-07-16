/**
 * Submits the current pipeline (nodes and edges) to the backend
 * for Graph Analysis (DAG detection, cycle checking, node counting).
 * 
 * @param {Array} nodes - Array of React Flow node models
 * @param {Array} edges - Array of React Flow edge objects
 * @returns {Object|null} - The analysis result containing num_nodes, num_edges, and is_dag
 */
export const submitPipeline = async (nodes, edges) => {
    try {
        const formData = new FormData();

        // Serialize the graph payload
        formData.append('pipeline', JSON.stringify({ nodes, edges }));

        // POST to the FastAPI backend
        const response = await fetch('http://localhost:8000/pipelines/parse', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Backend returned status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Pipeline Submission Failed:", error);
        alert("Failed to submit pipeline. Please ensure the FastAPI backend is running on port 8000.");
        return null;
    }
};
