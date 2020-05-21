export function dijkstra(grid, startNode, endNode) {
  const visitedNodes = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length > 0) {
    //   start at the start node and susequently get the closest neighbor
    const currentNode = getClosestNode(unvisitedNodes);
    const neighborList = getNeighbors(currentNode, grid);
    if (currentNode.isWall) continue;
    if (currentNode.distance === Infinity) return visitedNodes;
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);
    if (currentNode === endNode) return visitedNodes;
    for (const neighbor of neighborList) {
      let distance = currentNode.distance + 1;
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.previousNode = currentNode;
      }
    }
  }
}
function getNeighbors(currentNode, grid) {
  const neighborList = [];
  const { column, row } = currentNode;
  if (column > 0) neighborList.push(grid[column - 1][row]);
  if (column < grid.length - 1) neighborList.push(grid[column + 1][row]);
  if (row > 0) neighborList.push(grid[column][row - 1]);
  if (row < grid[0].length - 1) neighborList.push(grid[column][row + 1]);
  return neighborList;
}

function getClosestNode(unvisitedNodes) {
  //arrange in ascending order by distance
  unvisitedNodes.sort((A, B) => A.distance - B.distance);
  //remove closestNode from unvisited nodes
  const node = unvisitedNodes.shift();
  return node;
}
function getAllNodes(grid) {
  const nodes = [];
  for (const column of grid) {
    for (const node of column) {
      nodes.push(node);
    }
  }
  return nodes;
}
export function getShortestPath(startNode, endNode) {
  let shortestPath = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    shortestPath.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath.reverse();
}
