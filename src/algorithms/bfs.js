export function dijkstra(grid, startNode, endNode) {
  const visitedNodes = [];
  const unvisitedNodes = getAllNodes(grid);
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
