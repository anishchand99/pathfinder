import React, { Component } from 'react';
import Node from './Node.js';
import './PathFinder.css';
import Navbar from './Navbar';
import { aStar } from '../algorithms/aStar';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { dijkstra, getShortestPath } from '../algorithms/dijkstra';
import {
  START_NODE_COL,
  START_NODE_ROW,
  END_NODE_COL,
  END_NODE_ROW,
  GRID_COLS,
  GRID_ROWS,
} from '../constants';
const createWallDictionary = () => {
  let wallDict = new Map();
  for (let i = 0; i < GRID_COLS; i++) {
    for (let j = 0; j < GRID_ROWS; j++) {
      wallDict.set(`${i}-${j}`, false);
    }
  }
  return wallDict;
};
let wallDictionary = createWallDictionary();
const initialState = {
  grid: [],
  startNodeCol: START_NODE_COL,
  startNodeRow: START_NODE_ROW,
  endNodeCol: END_NODE_COL,
  endNodeRow: END_NODE_ROW,
  algo: 'dijkstra',
  speed: 500,
  wallDict: wallDictionary,
};
class PathFinder extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  componentDidMount() {
    const grid = drawInitialGrid(this.state);
    this.setState({ grid: grid });
  }
  freezeButtons(bool) {
    let startButton = document.getElementById('start');
    startButton.disabled = bool;
    let resetButton = document.getElementById('reset');
    resetButton.disabled = bool;
  }
  selectAlgo = (algorithm) => {
    this.setState({ algo: algorithm });
  };
  selectSpeed = (speedX) => {
    this.setState({ speed: speedX });
  };
  visualizeAlgorithm() {
    this.freezeButtons(true);
    const {
      grid,
      startNodeCol,
      startNodeRow,
      endNodeCol,
      endNodeRow,
      algo,
    } = this.state;
    const startNode = grid[startNodeCol][startNodeRow];
    const endNode = grid[endNodeCol][endNodeRow];
    let visitedNodes = [];
    let shortestPath;
    if (algo === 'dijkstra') {
      visitedNodes = dijkstra(grid, startNode, endNode);
      shortestPath = getShortestPath(startNode, endNode);
    } else if (algo === 'breadthFirst') {
      visitedNodes = bfs(grid, startNode, endNode);
      shortestPath = getShortestPath(startNode, endNode);
    } else if (algo === 'depthFirst') {
      visitedNodes = dfs(grid, startNode, endNode);
      shortestPath = visitedNodes;
    } else {
      visitedNodes = aStar(grid, startNode, endNode);
      shortestPath = getShortestPath(startNode, endNode);
    }
    this.removeCSS();
    this.animateAlgorithm(visitedNodes, startNode, endNode, shortestPath);
  }

  //remove the CSS of the nodes after the first use of visualize button
  removeCSS() {
    while (
      document.querySelector(`.node-Visited`) != null ||
      document.querySelector(`.node-Path`) != null
    ) {
      if (document.querySelector(`.node-Visited`) != null) {
        document.querySelector(`.node-Visited`).className = 'node';
      }
      if (document.querySelector(`.node-Path`) != null) {
        document.querySelector(`.node-Path`).className = 'node';
      }
    }
  }
  animateAlgorithm(visitedNodes, startNode, endNode, shortestPath) {
    const { speed } = this.state;
    for (let i = 0; i < visitedNodes.length; i++) {
      if (i === visitedNodes.length - 1) {
        setTimeout(() => {
          this.displayShortestPath(shortestPath, startNode, endNode);
        }, speed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        if (node !== startNode && node !== endNode) {
          document.getElementById(`node-${node.column}-${node.row}`).className =
            'node-Visited';
        }
      }, speed * i);
    }
  }
  displayShortestPath(shortestPath, startNode, endNode) {
    for (let i = 0; i < shortestPath.length; i++) {
      const node = shortestPath[i];
      if (node !== startNode && node !== endNode) {
        document.getElementById(`node-${node.column}-${node.row}`).className =
          'node-Path';
      }
    }
    this.freezeButtons(false);
  }
  makeWall = (node) => {
    const { startNodeCol, startNodeRow, endNodeCol, endNodeRow } = this.state;
    let updatedWall = this.state.wallDict;
    //check if the node is already a wall
    const alreadyIsWall = this.state.wallDict.get(
      `${node.props.column}-${node.props.row}`
    );
    //check if condition: don't make wall if it is a start node or end node
    if (
      !(
        (node.props.row === startNodeRow &&
          node.props.column === startNodeCol) ||
        (node.props.row === endNodeRow && node.props.column === endNodeCol)
      )
    ) {
      //check if condition: if already a wall, remove the wall
      if (alreadyIsWall) {
        updatedWall.set(`${node.props.column}-${node.props.row}`, false);
      } else {
        updatedWall.set(`${node.props.column}-${node.props.row}`, true);
      }
    }
    this.setState(
      {
        wallDict: updatedWall,
      },
      () => {
        const grid = drawInitialGrid(this.state);
        this.setState({ grid: grid });
      }
    );
  };
  changeStartNode = (node) => {
    this.setState(
      {
        startNodeCol: node.props.column,
        startNodeRow: node.props.row,
      },
      () => {
        const grid = drawInitialGrid(this.state);
        this.setState({ grid: grid });
      }
    );
  };
  changeEndNode = (node) => {
    this.setState(
      {
        endNodeCol: node.props.column,
        endNodeRow: node.props.row,
      },
      () => {
        const grid = drawInitialGrid(this.state);
        this.setState({ grid: grid });
      }
    );
  };

  //reset the CSS animations to go to fresh grid, used in the reset button
  resetCSS() {
    while (
      document.querySelector(`.node-Visited`) != null ||
      document.querySelector(`.node-Path`) != null ||
      document.querySelector(`.nodewall`) != null
    ) {
      if (document.querySelector(`.node-Visited`) != null) {
        document.querySelector(`.node-Visited`).className = 'node';
      }
      if (document.querySelector(`.node-Path`) != null) {
        document.querySelector(`.node-Path`).className = 'node';
      }
      if (document.querySelector(`.nodewall`) != null) {
        document.querySelector(`.nodewall`).className = 'node';
      }
    }
  }
  render() {
    const { grid } = this.state;
    return (
      <div className='container'>
        <Navbar
          selectAlgo={this.selectAlgo}
          selectSpeed={this.selectSpeed}
        ></Navbar>
        <button id='start' onClick={() => this.visualizeAlgorithm()}>
          Visualize!
        </button>
        <button id='reset' onClick={() => this.resetCSS()}>
          Reset!
        </button>
        <div className='grid'>
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((coln, colnIndex) => {
                  const { row, column, isStart, isFinish, isWall } = coln;
                  return (
                    <Node
                      key={colnIndex}
                      row={row}
                      column={column}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      changeStartNode={this.changeStartNode}
                      changeEndNode={this.changeEndNode}
                      makeWall={this.makeWall}
                      resetCSS={this.resetCSS}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const drawInitialGrid = (state) => {
  const grid = [];
  for (let column = 0; column < GRID_COLS; column++) {
    let currentColumn = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      currentColumn.push(createNewNode(row, column, state));
    }
    grid.push(currentColumn);
  }
  return grid;
};

const createNewNode = (row, column, state) => {
  const {
    startNodeCol,
    startNodeRow,
    endNodeCol,
    endNodeRow,
    wallDict,
  } = state;
  return {
    column,
    row,
    distance: Infinity,
    previousNode: null,
    isVisited: false,
    isWall: wallDict.get(`${column}-${row}`),
    isStart: column === startNodeCol && row === startNodeRow,
    isFinish: column === endNodeCol && row === endNodeRow,
  };
};

export default PathFinder;

//Try a boolean vs string dicitonary string will be the coln and row and boolean is isWall.
