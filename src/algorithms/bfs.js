export function bfs(grid, startNode, endNode) {
  const visitedNodes = [];
  let queue = [startNode];
  let currentNode;
  while (queue.length !== 0) {
    currentNode = queue.shift();
    if (currentNode.isWall) continue;
    if (!visitedNodes.includes(currentNode)) {
      visitedNodes.push(currentNode);
    }
    if (currentNode === endNode) return visitedNodes;
    const neighborList = getNeighbors(currentNode, grid);
    for (const node of neighborList) {
      if (!visitedNodes.includes(node)) {
        node.previousNode = currentNode;
        if (!node.isWall) {
          queue.push(node);
        }
      }
    }
    if (queue.length === 0) {
      return visitedNodes;
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
