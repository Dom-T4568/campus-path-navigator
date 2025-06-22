
export class PathfindingEngine {
  private graph: { [key: string]: { [key: string]: number } };

  constructor(graph: { [key: string]: { [key: string]: number } }) {
    this.graph = graph;
  }

  // Enhanced Dijkstra's Algorithm implementation
  findShortestPath(start: string, end: string): { path: string[], distance: number } {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const unvisited = new Set<string>();

    // Initialize distances - Dijkstra's algorithm step 1
    for (const node in this.graph) {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
      unvisited.add(node);
    }

    console.log(`Starting Dijkstra's algorithm from ${start} to ${end}`);

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance - Dijkstra's algorithm step 2
      let current = '';
      let minDistance = Infinity;
      
      for (const node of unvisited) {
        if (distances[node] < minDistance) {
          minDistance = distances[node];
          current = node;
        }
      }

      // If we reach the destination or no reachable nodes left
      if (current === end) {
        console.log(`Reached destination ${end} with distance ${distances[end]}`);
        break;
      }
      if (minDistance === Infinity) {
        console.warn('No path found - unreachable destination');
        break;
      }

      unvisited.delete(current);

      // Update distances to neighbors - Dijkstra's algorithm step 3
      if (this.graph[current]) {
        for (const neighbor in this.graph[current]) {
          if (unvisited.has(neighbor)) {
            const newDistance = distances[current] + this.graph[current][neighbor];
            if (newDistance < distances[neighbor]) {
              distances[neighbor] = newDistance;
              previous[neighbor] = current;
              console.log(`Updated distance to ${neighbor}: ${newDistance} via ${current}`);
            }
          }
        }
      }
    }

    // Reconstruct path - Dijkstra's algorithm step 4
    const path: string[] = [];
    let current = end;
    
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    // Validate the path
    if (path.length > 1 && path[0] === start) {
      for (let i = 0; i < path.length - 1; i++) {
        const currentNode = path[i];
        const nextNode = path[i + 1];
        
        if (!this.graph[currentNode] || !this.graph[currentNode][nextNode]) {
          console.error(`Invalid path segment: ${currentNode} -> ${nextNode}`);
          return { path: [], distance: Infinity };
        }
      }
      console.log(`Found valid path: ${path.join(' -> ')} with total distance: ${distances[end]}`);
      return { path, distance: distances[end] };
    }

    console.warn('No valid path found');
    return { path: [], distance: Infinity };
  }

  // Generate smooth curved path coordinates
  getDetailedPath(waypoints: { [key: string]: { x: number, y: number } }, path: string[]): { x: number, y: number }[] {
    if (path.length === 0) return [];

    const detailedPath: { x: number, y: number }[] = [];
    
    // Add all waypoints in the path
    for (const nodeName of path) {
      if (waypoints[nodeName]) {
        detailedPath.push(waypoints[nodeName]);
      }
    }
    
    return detailedPath;
  }

  // Generate smooth curve between points for better visualization
  generateCurvedPath(points: { x: number, y: number }[]): string {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      
      if (i === 1) {
        path += ` L ${curr.x} ${curr.y}`;
      } else {
        // Create smooth curves between waypoints
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        path += ` Q ${prev.x} ${prev.y} ${midX} ${midY} L ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  }

  // Validate if a path follows only predefined connections
  validatePath(path: string[]): boolean {
    if (path.length <= 1) return true;
    
    for (let i = 0; i < path.length - 1; i++) {
      const current = path[i];
      const next = path[i + 1];
      
      if (!this.graph[current] || !this.graph[current][next]) {
        return false;
      }
    }
    
    return true;
  }
}
