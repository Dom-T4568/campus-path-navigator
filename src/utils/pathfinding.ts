
export class PathfindingEngine {
  private graph: { [key: string]: { [key: string]: number } };

  constructor(graph: { [key: string]: { [key: string]: number } }) {
    this.graph = graph;
  }

  findShortestPath(start: string, end: string): string[] {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const unvisited = new Set<string>();

    // Initialize distances
    for (const node in this.graph) {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
      unvisited.add(node);
    }

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let current = '';
      let minDistance = Infinity;
      
      for (const node of unvisited) {
        if (distances[node] < minDistance) {
          minDistance = distances[node];
          current = node;
        }
      }

      if (current === end) break;
      if (minDistance === Infinity) break;

      unvisited.delete(current);

      // Update distances to neighbors
      for (const neighbor in this.graph[current]) {
        if (unvisited.has(neighbor)) {
          const newDistance = distances[current] + this.graph[current][neighbor];
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = current;
          }
        }
      }
    }

    // Reconstruct path
    const path: string[] = [];
    let current = end;
    
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    return path[0] === start ? path : [];
  }

  // New method to get detailed path with corridor waypoints
  getDetailedPath(waypoints: { [key: string]: { x: number, y: number } }, path: string[]): { x: number, y: number }[] {
    if (path.length === 0) return [];

    const detailedPath: { x: number, y: number }[] = [];
    
    for (let i = 0; i < path.length - 1; i++) {
      const start = waypoints[path[i]];
      const end = waypoints[path[i + 1]];
      
      detailedPath.push(start);
      
      // Add intermediate points for corridor navigation
      const corridorPoints = this.getCorridorPoints(start, end);
      detailedPath.push(...corridorPoints);
    }
    
    // Add the final destination
    if (path.length > 0) {
      detailedPath.push(waypoints[path[path.length - 1]]);
    }
    
    return detailedPath;
  }

  private getCorridorPoints(start: { x: number, y: number }, end: { x: number, y: number }): { x: number, y: number }[] {
    const points: { x: number, y: number }[] = [];
    
    // Calculate if we need to navigate around building structures
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    
    // If moving both horizontally and vertically, create L-shaped path
    if (Math.abs(dx) > 50 && Math.abs(dy) > 50) {
      // Determine if we should go horizontal first or vertical first
      // This logic can be enhanced based on actual building layout
      
      // For now, we'll prefer horizontal movement first in main corridors
      if (start.y > 300 && start.y < 600) { // Lower corridor
        points.push({ x: end.x, y: start.y }); // Go horizontal first
      } else if (start.y > 150 && start.y < 250) { // Upper corridor
        points.push({ x: end.x, y: start.y }); // Go horizontal first
      } else {
        points.push({ x: start.x, y: end.y }); // Go vertical first
      }
    }
    
    return points;
  }
}
