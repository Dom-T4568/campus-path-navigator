
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
}
