# DAG-Pipeline

A visual, node-based pipeline builder with a backend graph analyzer. Build a pipeline by placing nodes on a canvas and wiring them together; on submit, the backend counts nodes and edges and verifies the graph is a valid DAG (no cycles) using Kahn's algorithm.

## Stack

- **Frontend** (`frontend/`) — React 18 (Create React App), [React Flow](https://reactflow.dev) for the node canvas, Zustand for state, Tailwind CSS, Lucide icons. Source is organized into `src/nodes` (node type definitions), `src/components`, `src/pages`, `src/store`, and `src/api`.
- **Backend** (`backend/`) — FastAPI, a single `main.py`. Receives the serialized graph as a form field and runs Kahn's algorithm for cycle detection. CORS is currently open for local development.

## Run it

Backend (Python 3.9+):

```bash
cd backend
pip install fastapi uvicorn python-multipart
uvicorn main:app --reload --port 8000
```

Frontend (Node 18+):

```bash
cd frontend
npm install
npm start        # http://localhost:3000
```

## API

| Endpoint | What it does |
|---|---|
| `GET /` | Health check |
| `GET /metrics` | Stub endpoint to silence local monitoring scrapers |
| `POST /pipelines/parse` | Form field `pipeline` = JSON `{"nodes": [...], "edges": [...]}` → returns `{"num_nodes": n, "num_edges": m, "is_dag": true/false}` |

Each edge is `{"source": "<node id>", "target": "<node id>"}`. Isolated nodes and edges referencing undeclared node ids are handled — the DAG check is run over every node that appears in the graph.

## License

MIT — see [LICENSE](./LICENSE).
