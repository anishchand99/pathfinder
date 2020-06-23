export function aStar(grid, startNode, endNode) {
  const visitedNodes = [];
  let minQueue = [startNode];
  let currentNode;
  while (minQueue.length !== 0) {
    currentNode = minQueue.shift();
    if (currentNode.isWall) continue;
    if (currentNode === endNode) return visitedNodes;
    if (!visitedNodes.includes(currentNode)) {
      if (!currentNode.isWall) {
        visitedNodes.push(currentNode);
      }
    }
    const neighborList = getNeighbors(currentNode, grid);
    for (const node of neighborList) {
      if (!visitedNodes.includes(node)) {
        node.previousNode = currentNode;
        node.distance = getManhattanDistance(node, endNode);
        if (!node.isWall) {
          minQueue.push(node);
        }
      }
    }
    //sort by Manhattan distance (min priority queue)
    sortQueue(minQueue);
    if (minQueue.length === 0) {
      return visitedNodes;
    }
  }
}

//sort by Manhattan distance (min priority queue)
function sortQueue(minQueue) {
  minQueue.sort(function (a, b) {
    return a.distance - b.distance;
  });
}

//Manhattan distance => |x - x1| + |y - y1|
function getManhattanDistance(start, end) {
  return Math.abs(start.row - end.row) + Math.abs(start.column - end.column);
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
