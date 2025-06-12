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
  const [path, setPath] = useState<string[]>([]);
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

  // Auto-close sidebar on mobile after selection
  useEffect(() => {
    if (window.innerWidth < 768 && startRoom && endRoom) {
      setIsSidebarOpen(false);
    }
  }, [startRoom, endRoom]);

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
    setZoom((prevZoom) => Math.max(0.3, Math.min(3, prevZoom * scaleFactor)));
  };

  // Touch events for mobile
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

  const renderPathWithCorridors = () => {
    if (path.length === 0) return null;

    const pathfinder = new PathfindingEngine(GRAPH);
    const detailedPath = pathfinder.getDetailedPath(WAYPOINTS, path);
    
    const pathElements = [];
    
    // Draw the actual path lines following corridors
    for (let i = 0; i < detailedPath.length - 1; i++) {
      const start = detailedPath[i];
      const end = detailedPath[i + 1];
      
      pathElements.push(
        <line
          key={`path-line-${i}`}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="#3b82f6"
          strokeWidth="4"
          strokeDasharray="8,4"
          className="animate-pulse"
          style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
        />
      );
    }
    
    // Add direction arrows along the path
    for (let i = 0; i < detailedPath.length - 1; i++) {
      const start = detailedPath[i];
      const end = detailedPath[i + 1];
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      
      pathElements.push(
        <g key={`arrow-${i}`} transform={`translate(${midX},${midY}) rotate(${angle * 180 / Math.PI})`}>
          <polygon
            points="-8,-4 8,0 -8,4"
            fill="#3b82f6"
            className="animate-pulse"
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' }}
          />
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
          <p className="text-sm text-gray-400">Find your way around campus</p>
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
                Find Route
              </Button>

              <Button 
                variant="outline" 
                onClick={clearPath}
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                Clear Path
              </Button>
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
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
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

              {/* Render corridor-based path */}
              {renderPathWithCorridors()}

              {/* Room waypoints */}
              {Object.entries(WAYPOINTS).map(([room, coords]) => {
                // Only show actual rooms, not corridor waypoints
                if (room.startsWith('corridor_')) return null;
                
                return (
                  <g key={room}>
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="10"
                      fill="#ef4444"
                      stroke="#ffffff"
                      strokeWidth="3"
                      className="hover:fill-red-500 cursor-pointer transition-all duration-200 transform hover:scale-110"
                      filter="url(#glow)"
                    />
                    <text
                      x={coords.x}
                      y={coords.y - 18}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white pointer-events-none"
                      style={{ 
                        fontSize: '11px',
                        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                      }}
                    >
                      {room}
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
