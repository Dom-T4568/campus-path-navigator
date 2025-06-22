import React, { useState, useEffect, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PathfindingEngine } from '../utils/pathfinding';
import { ROOMS, WAYPOINTS, GRAPH } from '../data/mapData';
import LoadingPage from './LoadingPage';
import { MapPin, Navigation, Menu, X, Home, Route, Maximize2, Minimize2 } from 'lucide-react';

const CampusMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startRoom, setStartRoom] = useState<string | undefined>(undefined);
  const [endRoom, setEndRoom] = useState<string | undefined>(undefined);
  const [pathData, setPathData] = useState<{ path: string[], distance: number }>({ path: [], distance: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768 && startRoom && endRoom) {
      setIsSidebarOpen(false);
    }
  }, [startRoom, endRoom]);

  const drawPath = (result: { path: string[], distance: number }) => {
    if (result.path.length > 0) {
      console.log(`Dijkstra's path: ${result.path.join(' -> ')}`);
      console.log(`Total corridor distance: ${result.distance.toFixed(2)} units`);
      setPathData(result);
    } else {
      alert("No corridor path found between the selected rooms.");
      setPathData({ path: [], distance: 0 });
    }
  };

  const clearPath = () => {
    setPathData({ path: [], distance: 0 });
  };

  const handleFindPath = () => {
    if (startRoom && endRoom) {
      console.log(`Finding path from ${startRoom} to ${endRoom} using Dijkstra's algorithm`);
      const pathfinder = new PathfindingEngine(GRAPH);
      const result = pathfinder.findShortestPath(startRoom, endRoom);
      drawPath(result);
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
    setZoom((prevZoom) => Math.max(0.3, Math.min(3, prevZoom * scaleFactor)));
  };

  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ 
        x: e.touches[0].clientX - pan.x, 
        y: e.touches[0].clientY - pan.y 
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scaleFactor = distance / lastTouchDistance;
      setZoom((prevZoom) => Math.max(0.3, Math.min(3, prevZoom * scaleFactor)));
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  };

  // Enhanced path rendering that strictly follows corridor nodes
  const renderDijkstraPath = () => {
    if (pathData.path.length === 0) return null;

    const pathfinder = new PathfindingEngine(GRAPH);
    
    // Validate that the path follows only corridor connections
    if (!pathfinder.validatePath(pathData.path)) {
      console.warn('Invalid corridor path detected - path may cut through rooms');
      return null;
    }

    const detailedPath = pathfinder.getDetailedPath(WAYPOINTS, pathData.path);
    
    if (detailedPath.length === 0) return null;

    const pathElements = [];
    
    // Generate smooth curved path that follows corridor nodes only
    const curvePath = pathfinder.generateCurvedPath(detailedPath);
    
    // Main corridor path - enhanced blue dotted line
    pathElements.push(
      <path
        key="corridor-path"
        d={curvePath}
        stroke="#2563eb"
        strokeWidth="6"
        strokeDasharray="12,8"
        fill="none"
        className="animate-pulse"
        style={{ 
          filter: 'drop-shadow(2px 2px 4px rgba(37,99,235,0.4))',
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }}
      />
    );
    
    // Add directional arrows along the corridor path
    for (let i = 0; i < detailedPath.length - 1; i++) {
      const start = detailedPath[i];
      const end = detailedPath[i + 1];
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      
      pathElements.push(
        <g key={`corridor-arrow-${i}`} transform={`translate(${midX},${midY}) rotate(${angle * 180 / Math.PI})`}>
          <polygon
            points="-10,-5 12,0 -10,5"
            fill="#2563eb"
            stroke="#ffffff"
            strokeWidth="1"
            className="animate-pulse"
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
          />
        </g>
      );
    }

    // Enhanced start and end markers for corridor navigation
    if (detailedPath.length > 0) {
      const startPoint = detailedPath[0];
      const endPoint = detailedPath[detailedPath.length - 1];

      // Start marker (Enhanced Green)
      pathElements.push(
        <g key="corridor-start-marker">
          <circle
            cx={startPoint.x}
            cy={startPoint.y}
            r="16"
            fill="#16a34a"
            stroke="#ffffff"
            strokeWidth="3"
            className="animate-pulse"
            style={{ filter: 'drop-shadow(2px 2px 6px rgba(22,163,74,0.5))' }}
          />
          <circle
            cx={startPoint.x}
            cy={startPoint.y}
            r="8"
            fill="#ffffff"
            className="animate-pulse"
          />
          <text
            x={startPoint.x}
            y={startPoint.y + 3}
            textAnchor="middle"
            className="text-xs font-bold fill-green-600 pointer-events-none"
            style={{ fontSize: '10px' }}
          >
            S
          </text>
        </g>
      );

      // End marker (Enhanced Red)
      pathElements.push(
        <g key="corridor-end-marker">
          <circle
            cx={endPoint.x}
            cy={endPoint.y}
            r="16"
            fill="#dc2626"
            stroke="#ffffff"
            strokeWidth="3"
            className="animate-pulse"
            style={{ filter: 'drop-shadow(2px 2px 6px rgba(220,38,38,0.5))' }}
          />
          <circle
            cx={endPoint.x}
            cy={endPoint.y}
            r="8"
            fill="#ffffff"
            className="animate-pulse"
          />
          <text
            x={endPoint.x}
            y={endPoint.y + 3}
            textAnchor="middle"
            className="text-xs font-bold fill-red-600 pointer-events-none"
            style={{ fontSize: '10px' }}
          >
            E
          </text>
        </g>
      );
    }
    
    return <g>{pathElements}</g>;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className={`min-h-screen bg-gray-900 flex ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h1 className="text-lg font-bold text-white">Campus Navigator</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-gray-700"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:relative z-30 w-80 h-full md:h-auto
        bg-gray-900 text-white flex flex-col
        transition-transform duration-300 ease-in-out
        ${isFullscreen ? 'hidden' : ''}
      `}>
        {/* Desktop Header */}
        <div className="hidden md:block p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold">Campus Navigator</h1>
          </div>
          <p className="text-sm text-gray-400">Dijkstra's shortest path algorithm</p>
        </div>

        {/* Navigation Section */}
        <div className="p-6 flex-1 mt-16 md:mt-0">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold">Navigation</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <label className="text-sm font-medium">Starting Point</label>
                </div>
                <Select value={startRoom} onValueChange={setStartRoom}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 transition-colors">
                    <SelectValue placeholder="Select starting point" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {ROOMS.map((room) => (
                      <SelectItem key={room} value={room} className="text-white hover:bg-gray-700">
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <label className="text-sm font-medium">Destination</label>
                </div>
                <Select value={endRoom} onValueChange={setEndRoom}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 transition-colors">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {ROOMS.map((room) => (
                      <SelectItem key={room} value={room} className="text-white hover:bg-gray-700">
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleFindPath} 
                disabled={!startRoom || !endRoom}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                <Route className="w-4 h-4 mr-2" />
                Find Shortest Path
              </Button>

              <Button 
                variant="outline" 
                onClick={clearPath}
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                Clear Path
              </Button>

              {/* Path Information */}
              {pathData.path.length > 0 && (
                <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
                  <h3 className="text-sm font-semibold mb-2 text-blue-400">Path Info</h3>
                  <p className="text-xs text-gray-300">
                    Distance: {pathData.distance.toFixed(1)} units
                  </p>
                  <p className="text-xs text-gray-300">
                    Waypoints: {pathData.path.length}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wide">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={resetView}
                className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Reset View
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Map Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Status Bar */}
        <div className={`bg-gray-800 shadow-lg p-4 border-b border-gray-700 ${isFullscreen ? 'hidden' : ''} mt-16 md:mt-0`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              {startRoom && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">Start: {startRoom}</span>
                </div>
              )}
              {endRoom && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">Destination: {endRoom}</span>
                </div>
              )}
              {pathData.path.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">
                    Dijkstra Path: {pathData.distance.toFixed(1)} units
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-sm text-gray-400">
                Pinch to zoom • Drag to pan
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-gray-400 hover:text-white hover:bg-gray-700"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-gray-900 overflow-hidden">
          <svg
            ref={svgRef}
            className="w-full h-full cursor-move select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'none' }}
          >
            <defs>
              <filter id="corridor-glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
              <image
                href="/lovable-uploads/5b8bdca8-5b1e-47fe-9e07-546fe9d7f12a.png"
                width="1200"
                height="800"
                className="max-w-none"
                style={{ imageRendering: 'crisp-edges' }}
              />

              {/* Render Dijkstra's corridor-following path */}
              {renderDijkstraPath()}

              {/* Corridor waypoint markers - only show room entrances and key intersections */}
              {Object.entries(WAYPOINTS).map(([nodeName, coords]) => {
                // Show red dots only for rooms and major corridor intersections, not internal connectors
                const isInternalConnector = nodeName.includes('corridor') || nodeName.includes('vertical_connector');
                if (isInternalConnector) return null;
                
                return (
                  <g key={nodeName}>
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="7"
                      fill="#dc2626"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="hover:fill-red-500 cursor-pointer transition-all duration-200 transform hover:scale-125"
                      filter="url(#corridor-glow)"
                    />
                    <text
                      x={coords.x}
                      y={coords.y - 12}
                      textAnchor="middle"
                      className="text-xs font-semibold fill-white pointer-events-none"
                      style={{ 
                        fontSize: '9px',
                        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                      }}
                    >
                      {nodeName}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setZoom(prev => Math.min(3, prev * 1.2))}
              className="bg-gray-800/90 backdrop-blur-sm hover:bg-gray-700 text-white border-gray-600"
            >
              +
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setZoom(prev => Math.max(0.3, prev * 0.8))}
              className="bg-gray-800/90 backdrop-blur-sm hover:bg-gray-700 text-white border-gray-600"
            >
              −
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
