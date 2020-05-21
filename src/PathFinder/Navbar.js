import React, { Component } from "react";
import "./Navbar.css";
class Navbar extends Component {
  constructor() {
    super();
  }
  getAlgorithmType = () => {
    const { selectAlgo } = this.props;
    selectAlgo(document.getElementById("algorithm-type").value);
  };
  getSpeedValue = () => {
    const { selectSpeed } = this.props;
    selectSpeed(document.getElementById("speed-val").value);
  };
  render() {
    return (
      <div className="navBar">
        <span>
          Algorithms&nbsp;
          <select id="algorithm-type" onChange={this.getAlgorithmType}>
            <option value="dijkstra">Dijkstra</option>
            <option value="breadthFirst">Breadth First</option>
            <option value="depthFirst">Depth First</option>
            <option value="aStar">A Star</option>
          </select>
        </span>
        <span>
          Speed&nbsp;
          <select id="speed-val" onChange={this.getSpeedValue}>
            <option value="500">1X</option>
            <option value="100">5X</option>
            <option value="1">Instant</option>
          </select>
        </span>
        <span>
          <div className="startNode"></div>
          Start Node
        </span>
        <span>
          <div className="endNode"></div>
          End Node
        </span>
        <span>
          <div className="visitedNode"></div>
          Visited Nodes
        </span>
        <span>
          <div className="unvisitedNode"></div>
          Unvisited Nodes
        </span>
        <span>
          <div className="path"></div>
          Path
        </span>
      </div>
    );
  }
}
export default Navbar;
