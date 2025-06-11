
import React, { useState, useEffect, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PathfindingEngine } from '../utils/pathfinding';
import { ROOMS, WAYPOINTS, GRAPH } from '../data/mapData';
import LoadingPage from './LoadingPage';
import { MapPin, Navigation } from 'lucide-react';

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

  const renderPathWithMinusSymbols = () => {
    if (path.length === 0) return null;

    const pathElements = [];

    for (let i = 0; i < path.length - 1; i++) {
      const start = WAYPOINTS[path[i]];
      const end = WAYPOINTS[path[i + 1]];
      
      // Calculate the distance and angle between points
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      
      // Number of minus symbols to place along the line
      const symbolCount = Math.floor(distance / 20); // Slightly more spacing
      
      for (let j = 0; j <= symbolCount; j++) {
        const ratio = j / symbolCount;
        const x = start.x + dx * ratio;
        const y = start.y + dy * ratio;
        
        pathElements.push(
          <text
            key={`minus-${i}-${j}`}
            x={x}
            y={y + 3}
            textAnchor="middle"
            className="fill-blue-500 font-bold animate-pulse"
            style={{ 
              fontSize: '24px', // Increased size
              transform: `rotate(${angle}rad)`,
              transformOrigin: `${x}px ${y}px`,
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
            }}
          >
            −
          </text>
        );
      }
    }

    return <g>{pathElements}</g>;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Dark Sidebar */}
      <div className="w-80 bg-gray-800 text-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold">College Blueprint Navigator</h1>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-6 flex-1">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold">Navigation</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <label className="text-sm font-medium">Starting Point</label>
                </div>
                <Select value={startRoom} onValueChange={setStartRoom}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select starting point" />
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

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <label className="text-sm font-medium">Destination</label>
                </div>
                <Select value={endRoom} onValueChange={setEndRoom}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
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

              <Button 
                onClick={handleFindPath} 
                disabled={!startRoom || !endRoom}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
              >
                Find Route
              </Button>

              <Button 
                variant="outline" 
                onClick={clearPath}
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">How to Use</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Select a starting point from the dropdown</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Select a destination from the dropdown</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Click "Find Route" to calculate the path</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <p className="text-xs text-gray-400">© 2025 College Blueprint Navigator • Interactive Campus Navigation</p>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Status Bar */}
        <div className="bg-white shadow-sm p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {startRoom && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Start: {startRoom}</span>
                </div>
              )}
              {endRoom && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Destination: {endRoom}</span>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Use mouse wheel to zoom • Drag to pan
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-gray-50">
          <svg
            ref={svgRef}
            className="w-full h-full cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
          >
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

              {renderPathWithMinusSymbols()}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
