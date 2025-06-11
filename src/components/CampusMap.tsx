import React, { useState, useEffect, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PathfindingEngine } from '../utils/pathfinding';
import { ROOMS, WAYPOINTS, GRAPH } from '../data/mapData';
import LoadingPage from './LoadingPage';

const CampusMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startRoom, setStartRoom] = useState<string | undefined>(undefined);
  const [endRoom, setEndRoom] = useState<string | undefined>(undefined);
  const [path, setPath] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const drawPath = (shortestPath: string[]) => {
    if (shortestPath.length > 0) {
      setPath(shortestPath);
    } else {
      alert("No path found between the selected rooms.");
    }
  };

  const clearPath = () => {
    setPath([]);
  };

  const handleFindPath = () => {
    if (startRoom && endRoom) {
      const pathfinder = new PathfindingEngine(GRAPH);
      const shortestPath = pathfinder.findShortestPath(startRoom, endRoom);
      drawPath(shortestPath);
    } else {
      alert("Please select both a start and end room.");
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prevZoom) => Math.max(0.5, Math.min(3, prevZoom * scaleFactor)));
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Controls */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">KPR</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Campus Navigation</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex gap-2">
                <Select value={startRoom} onValueChange={setStartRoom}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select start room" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROOMS.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={endRoom} onValueChange={setEndRoom}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROOMS.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleFindPath} disabled={!startRoom || !endRoom}>
                  Find Path
                </Button>
                <Button variant="outline" onClick={clearPath}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-140px)]">
        <svg
          ref={svgRef}
          className="w-full h-full cursor-move"
          style={{ backgroundColor: '#f8f9fa' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#2563eb"
              />
            </marker>
          </defs>

          <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
            <image
              href="/lovable-uploads/5b8bdca8-5b1e-47fe-9e07-546fe9d7f12a.png"
              width="1200"
              height="800"
              className="max-w-none"
            />

            {Object.entries(WAYPOINTS).map(([room, coords]) => (
              <g key={room}>
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="8"
                  fill="#ef4444"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="hover:fill-red-600 cursor-pointer"
                />
                <text
                  x={coords.x}
                  y={coords.y - 15}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-800"
                  style={{ fontSize: '10px' }}
                >
                  {room}
                </text>
              </g>
            ))}

            {path.length > 0 && (
              <g>
                {path.slice(0, -1).map((room, index) => {
                  const start = WAYPOINTS[room];
                  const end = WAYPOINTS[path[index + 1]];
                  return (
                    <line
                      key={`${room}-${path[index + 1]}`}
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke="#2563eb"
                      strokeWidth="4"
                      strokeDasharray="8,4"
                      markerEnd="url(#arrowhead)"
                      className="animate-pulse"
                    />
                  );
                })}
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">© 2025 Cloud Net Park. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default CampusMap;
