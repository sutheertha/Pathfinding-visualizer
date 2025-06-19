import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { bfs } from '../algorithms/bfs';
import Node from './Node/Node';
import './PathfindingVisualizer.css';

const PathfindingVisualizer = forwardRef(({ algorithm }, ref) => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [start, setStart] = useState({ row: 10, col: 5 });
  const [end, setEnd] = useState({ row: 10, col: 45 });
  const [mode, setMode] = useState('wall');

  useEffect(() => {
    setGrid(getInitialGrid(start, end));
  }, [start, end]);

  useImperativeHandle(ref, () => ({
    runVisualization,
    resetGrid,
    setMode,
  }));

  const runVisualization = () => {
    const freshGrid = resetVisited(grid, start, end);
    setGrid(freshGrid);
    const startNode = freshGrid[start.row][start.col];
    const endNode = freshGrid[end.row][end.col];
    let visitedNodesInOrder = [];

    switch (algorithm) {
      case 'dijkstra':
        visitedNodesInOrder = dijkstra(freshGrid, startNode, endNode);
        break;
      case 'bfs':
        visitedNodesInOrder = bfs(freshGrid, startNode, endNode);
        break;
      default:
        return;
    }

    const shortestPath = getNodesInShortestPathOrder(endNode);
    animateAlgorithm(visitedNodesInOrder, shortestPath);
  };

  const resetGrid = () => {
    const clearedGrid = getInitialGrid(start, end);
    setGrid(clearedGrid);
    for (let row of clearedGrid) {
      for (let node of row) {
        const el = document.getElementById(`node-${node.row}-${node.col}`);
        if (el) el.className = 'node';
      }
    }
  };

  const handleClick = (row, col) => {
    if (mode === 'start') {
      setStart({ row, col });
    } else if (mode === 'end') {
      setEnd({ row, col });
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || mode !== 'wall') return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => setMouseIsPressed(false);

  const animateAlgorithm = (visited, path) => {
    for (let i = 0; i <= visited.length; i++) {
      if (i === visited.length) {
        setTimeout(() => animateShortestPath(path), 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visited[i];
        if (isStartOrEnd(node)) return;
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i);
    }
  };

  const animateShortestPath = (path) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        if (isStartOrEnd(node)) return;
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
  };

  const isStartOrEnd = (node) =>
    (node.row === start.row && node.col === start.col) ||
    (node.row === end.row && node.col === end.col);

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {row.map((node) => (
            <Node
              key={`${node.row}-${node.col}`}
              {...node}
              isStart={node.row === start.row && node.col === start.col}
              isFinish={node.row === end.row && node.col === end.col}
              onMouseDown={() => handleClick(node.row, node.col)}
              onMouseEnter={() => handleMouseEnter(node.row, node.col)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

const getInitialGrid = (start, end) => {
  const grid = [];
  for (let row = 0; row < 27; row++) {
    const currentRow = [];
    for (let col = 0; col < 64; col++) {
      currentRow.push(createNode(col, row, start, end));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, start, end) => ({
  col,
  row,
  isStart: row === start.row && col === start.col,
  isFinish: row === end.row && col === end.col,
  distance: Infinity,
  isVisited: false,
  isWall: false,
  previousNode: null,
});

const resetVisited = (grid, start, end) =>
  grid.map((row) =>
    row.map((node) => ({
      ...node,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
      isStart: node.row === start.row && node.col === start.col,
      isFinish: node.row === end.row && node.col === end.col,
    }))
  );

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default PathfindingVisualizer;
