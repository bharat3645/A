# VectorShift Pipeline Builder

A professional, visual node-based workflow editor built for designing, composing, and analyzing AI and logic pipelines.

## 🏗 Architecture & Tech Stack

**Frontend**
- **React (v18)** - Core UI library (Create React App)
- **React Flow** - Canvas, graph geometry, and node management
- **Zustand (v5)** - Lightweight, atomic global state management
- **Tailwind CSS (v3)** - Utility-first styling with custom Landbook CSS variables
- **Geist & DM Mono** - Typography system

**Backend**
- **Python 3.x**
- **FastAPI** - High-performance asynchronous API
- **Kahn's Algorithm** - Topological sorting to detect Directed Acyclic Graphs (DAGs) in milliseconds

---

## 🚀 Quick Start

### 1. Start the Backend API
Navigate to the `/backend` directory and run the FastAPI server:
```bash
pip install fastapi uvicorn
uvicorn main:app --reload
```
*The API will start on `http://localhost:8000`*

### 2. Start the Frontend App
Open a new terminal, navigate to the `/frontend` directory, and start the React app:
```bash
npm install
npm start
```
*The web app will launch at `http://localhost:3000`*

*(Note: If the frontend cache fails after changing CSS configurations, run `rm -rf node_modules/.cache` and restart the server).*

---

## 🧠 Core Features

### Abstracted Node System
Implements the **Compound Component Pattern** via `<BaseNode />` to heavily enforce DRY principles. All nodes inherit shared visual traits, Handle physics, and connection points, allowing engineers to spin up new logic blocks in minutes by merely supplying child `<input />` configurations.

### Dynamic Text Node Parsing
Text Nodes contain an auto-resizing text area. A real-time Regex parser (`/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`) listens to keystrokes and dynamically mounts or unmounts React Flow `<Handle />` ports on the left edge of the node. 
- Try typing: `Analyze this {{document}} for the user {{uuid}}` and watch the geometry react.

### DAG Compilation Engine
Clicking **Run Pipeline** serializes the Canvas State and sends it to the FastAPI backend. There, an Adjacency List is constructed and Kahn's Algorithm determines if the workflow contains circular logic loops, rendering a summary overlay for the user.

---

## 📂 Repository Structure
```
/backend
├── main.py                # FastAPI endpoints and graph logic
/frontend
├── src/
│   ├── api/               # Fetch wrappers 
│   ├── components/        # Layout UI (Navbar, Sidebar, Modal)
│   ├── nodes/             # React Flow Component logic (BaseNode + 9 variations)
│   ├── pages/             # Canvas wrapper views
│   ├── store/             # Zustand global state
│   ├── App.js             # Root Layout
│   └── index.css          # Design system variables and Tailwind directives
```
