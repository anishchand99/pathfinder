import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor() {
    super();
    this.state = {
      isMouseUp: true,
      isMouseDown: false,
      didMouseEnter: false,
      didMouseMove: false,
      didMouseLeave: false,
    };
  }
  onMouseDown = (e, node) => {
    console.log(document.querySelector(".grid"));
    this.setState({ isMouseDown: true, isMouseUp: false });
  };
  onMouseUp = (e, node) => {
    console.log("up");
    console.log(e.target.className);
    this.setState({ isMouseUp: true, isMouseDown: false });
  };
  onMouseOver = (e, node) => {
    // const [makeWall] = this.props;
    if (this.state.isMouseDown === true) {
      // makeWall(node);
      console.log(node);
      console.log(
        document.getElementById(`node-${node.props.column}-${node.props.row}`)
      );
      document.getElementById(
        `node-${node.props.column}-${node.props.row}`
      ).style.backgroundColor = "purple";
    }
  };
  onMouseEnter = () => {
    this.setState({ didMouseEnter: true });
  };
  onMouseLeave = () => {
    this.setState({ didMouseLeave: true, didMouseEnter: false });
  };
  onDragStart = (e, node) => {
    e.dataTransfer.setData(
      "text",
      `node-${node.props.column}-${node.props.row}`
    );
  };
  onDragOver = (e) => {
    e.preventDefault();
  };
  onDrop = (e, node) => {
    const { changeStartNode, changeEndNode, resetCSS } = this.props;
    //id of the 'soon to be previous' startNode/endNode, current startNode/endNode that will be previous after drag n drop
    let data = e.dataTransfer.getData("text");
    if (document.getElementById(data).className === "nodestart") {
      document.querySelector(`.nodestart`).className = "node";
      document.getElementById(
        `node-${node.props.column}-${node.props.row}`
      ).className = "nodestart";
      changeStartNode(node);
    }
    if (document.getElementById(data).className === "nodefinish") {
      document.querySelector(`.nodefinish`).className = "node";
      document.getElementById(
        `node-${node.props.column}-${node.props.row}`
      ).className = "nodefinish";
      changeEndNode(node);
    }
    resetCSS();
  };
  render() {
    const { column, row, isStart, isFinish, isWall, makeWall } = this.props;
    const extraClassName = isFinish
      ? "finish"
      : isStart
      ? "start"
      : isWall
      ? "wall"
      : "";
    let isDragable;
    if (isStart) {
      isDragable = true;
    } else if (isFinish) {
      isDragable = true;
    } else {
      isDragable = false;
    }
    return (
      <div
        draggable={isDragable}
        id={`node-${column}-${row}`}
        className={`node${extraClassName}`}
        onMouseDown={(e) => makeWall(this)}
        onDragStart={(e) => this.onDragStart(e, this)}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => this.onDrop(e, this)}
      />
    );
  }
}
export default Node;
