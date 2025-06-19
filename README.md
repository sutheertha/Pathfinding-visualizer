# 🧭 Pathfinding Visualizer

**Pathfinding Visualizer** is an interactive web tool for visualizing how pathfinding algorithms work. With a simple grid interface, users can draw walls, set start and end points, and watch as the algorithm finds the shortest path — step by step.

---

## 🚀 Features

- 🟩 **Visualize algorithms** like **Dijkstra** and **Breadth-First Search (BFS)**
- 🧱 **Draw walls** on the grid by clicking and dragging
- 🔁 **Real-time animations** show how the algorithm explores paths
- 🎯 **Move start/end points** by dragging to new locations
- ✨ Clean, responsive UI built with **React**

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/pathfinding-visualizer.git
    cd pathfinding-visualizer
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the app locally:**

    ```bash
    npm start
    ```

4. **Open your browser** and go to:  
   `http://localhost:3000`

---

## 🧩 How to Use

### 🖱️ Interact with the Grid

- **Draw walls**: Click and drag on the grid to place or remove walls.
- **Move Start/End nodes**: Drag the green (start) or red (end) node to a different location.

### 🧠 Run an Algorithm

1. **Select Algorithm**: Choose between `Dijkstra` and `BFS`.
2. **Click "Visualize"**: Watch the algorithm explore the grid and find the shortest path.
3. **Click "Reset Grid"** to clear the visualization and start over.

---

## 📁 Project Structure

```plaintext
src/
├── algorithms/              # Algorithm implementations (Dijkstra, BFS)
├── Node/                    # Node component representing each cell
└── PathfindingVisualizer/   # Main visualizer component
"# Pathfinding-visualizer" 
