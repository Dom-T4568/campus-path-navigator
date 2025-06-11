
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Navigation, MapPin, Route } from 'lucide-react';
import { PathfindingEngine } from '../utils/pathfinding';
import { ROOMS, WAYPOINTS, GRAPH } from '../data/mapData';

const CampusMap = () => {
  const [startRoom, setStartRoom] = useState('');
  const [destinationRoom, setDestinationRoom] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const pathfinding = new PathfindingEngine(GRAPH);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      drawMap();
    };
    img.src = '/lovable-uploads/5b8bdca8-5b1e-47fe-9e07-546fe9d7f12a.png';
    imageRef.current = img;
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      drawMap();
    }
  }, [imageLoaded, currentPath, scale, offset]);

  const drawMap = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;
    
    if (!canvas || !ctx || !img) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200; // Account for controls

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate image scaling to fit canvas
    const imageAspect = img.width / img.height;
    const canvasAspect = canvas.width / canvas.height;
    
    let drawWidth, drawHeight;
    if (imageAspect > canvasAspect) {
      drawWidth = canvas.width * scale;
      drawHeight = (canvas.width / imageAspect) * scale;
    } else {
      drawHeight = canvas.height * scale;
      drawWidth = (canvas.height * imageAspect) * scale;
    }

    const drawX = (canvas.width - drawWidth) / 2 + offset.x;
    const drawY = (canvas.height - drawHeight) / 2 + offset.y;

    // Draw blueprint image
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    // Draw waypoints
    Object.entries(WAYPOINTS).forEach(([roomId, point]) => {
      const x = drawX + (point.x / img.width) * drawWidth;
      const y = drawY + (point.y / img.height) * drawHeight;
      
      // Draw waypoint circle
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = currentPath.includes(roomId) ? '#ef4444' : '#2563eb';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw path
    if (currentPath.length > 1) {
      drawAnimatedPath(ctx, currentPath, drawX, drawY, drawWidth, drawHeight, img);
    }
  };

  const drawAnimatedPath = (
    ctx: CanvasRenderingContext2D,
    path: string[],
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
    img: HTMLImageElement
  ) => {
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 5]);
    ctx.lineDashOffset = -Date.now() / 50; // Animated dash

    ctx.beginPath();
    path.forEach((roomId, index) => {
      const point = WAYPOINTS[roomId];
      if (point) {
        const x = drawX + (point.x / img.width) * drawWidth;
        const y = drawY + (point.y / img.height) * drawHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    });
    ctx.stroke();

    // Draw directional arrows
    for (let i = 0; i < path.length - 1; i++) {
      const current = WAYPOINTS[path[i]];
      const next = WAYPOINTS[path[i + 1]];
      
      if (current && next) {
        const x1 = drawX + (current.x / img.width) * drawWidth;
        const y1 = drawY + (current.y / img.height) * drawHeight;
        const x2 = drawX + (next.x / img.width) * drawWidth;
        const y2 = drawY + (next.y / img.height) * drawHeight;
        
        drawArrow(ctx, x1, y1, x2, y2);
      }
    }
  };

  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowSize = 12;

    ctx.save();
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowSize, -arrowSize / 2);
    ctx.lineTo(-arrowSize, arrowSize / 2);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  };

  const findPath = async () => {
    if (!startRoom || !destinationRoom) return;
    
    setIsCalculating(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const path = pathfinding.findShortestPath(startRoom, destinationRoom);
    setCurrentPath(path);
    setIsCalculating(false);
  };

  const clearPath = () => {
    setCurrentPath([]);
    setStartRoom('');
    setDestinationRoom('');
  };

  const handleZoom = (zoomIn: boolean) => {
    setScale(prev => {
      const newScale = zoomIn ? prev * 1.2 : prev / 1.2;
      return Math.max(0.5, Math.min(3, newScale));
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Controls */}
      <div className="bg-white shadow-lg border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Navigation className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Campus Navigator</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-600" />
                <Select value={startRoom} onValueChange={setStartRoom}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select start room" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROOMS.map(room => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-red-600" />
                <Select value={destinationRoom} onValueChange={setDestinationRoom}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROOMS.map(room => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={findPath}
                  disabled={!startRoom || !destinationRoom || isCalculating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isCalculating ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Finding...
                    </div>
                  ) : (
                    <>
                      <Route className="h-4 w-4 mr-2" />
                      Find Route
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={clearPath}
                  variant="outline"
                  disabled={!currentPath.length}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="block cursor-move"
          style={{ background: '#f8fafc' }}
        />
        
        {/* Zoom Controls */}
        <Card className="absolute top-4 right-4 p-2">
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleZoom(true)}
              className="h-8 w-8 p-0"
            >
              +
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleZoom(false)}
              className="h-8 w-8 p-0"
            >
              −
            </Button>
          </div>
        </Card>

        {/* Path Info */}
        {currentPath.length > 0 && (
          <Card className="absolute bottom-4 left-4 p-4 bg-white/95 backdrop-blur">
            <div className="text-sm">
              <div className="font-semibold text-gray-900 mb-2">Route Found</div>
              <div className="text-gray-600">
                {currentPath.length} waypoints • {startRoom} → {destinationRoom}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Cloud Net Park. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CampusMap;
