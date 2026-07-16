from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json
from collections import deque

app = FastAPI(
    title="VectorShift Pipeline API",
    description="Backend analysis engine for the visual node pipeline builder.",
    version="1.0.0"
)

# Allow the React frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def health_check():
    """Simple health check endpoint."""
    return {'status': 'healthy'}


@app.get('/metrics')
def get_metrics():
    """Silences aggressive monitoring calls (e.g., from Prometheus or local scrapers)."""
    return {'status': 'ok'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    """
    Analyzes a node-based pipeline graph.
    Calculates the total nodes, total edges, and uses Kahn's Algorithm
    to detect if the graph is a valid Directed Acyclic Graph (DAG).
    """
    try:
        data = json.loads(pipeline)
        nodes = data.get("nodes", [])
        edges = data.get("edges", [])
    except Exception as e:
        return {"error": f"Failed to parse payload: {str(e)}"}

    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Adjacency list and in-degree tracking for Kahn's Algorithm
    adj = {node["id"]: [] for node in nodes}
    in_degree = {node["id"]: 0 for node in nodes}
    
    # Build graph mappings
    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        
        # Ensure nodes exist in our tracking dictionaries (handle isolated/unconnected graphs)
        if source not in adj:
            adj[source] = []
        if source not in in_degree:
            in_degree[source] = 0
        if target not in in_degree:
            in_degree[target] = 0
        if target not in adj:
            adj[target] = []
                
        adj[source].append(target)
        in_degree[target] += 1
        
    # Queue for all nodes with no incoming edges (starting points)
    queue = deque([node_id for node_id, deg in in_degree.items() if deg == 0])
    visited = 0
    
    # Process the graph layer by layer
    while queue:
        current = queue.popleft()
        visited += 1
        
        for neighbor in adj.get(current, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    # If we successfully visited all declared nodes in the adjacency list, 
    # it means there are no cycles blocking our traversal.
    is_dag = visited == len(adj)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
