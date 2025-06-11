
export const ROOMS = [
  "Auditorium 2", "Lab 2", "Lab 1", "Server Room", "Step-l2", "Boys RestRoom",
  "Girls RestRoom", "VIP Pantry", "VIP Waiting", "Pantry", "VIP Dining", 
  "Chairman Office", "Principle Office", "OAT", "AIDS", "Green Room 1", 
  "Green Room 2", "Admin Office", "Reception", "Master Board Room", 
  "OAK leaf", "Exam Hall", "Meeting Room", "Transport office", 
  "Zig Zag Steps", "Admission Office", "Falcon Hall", "Harmony", 
  "CDC", "Symphony", "Waiting Hall", "Step-l5", "PT Room", "Store Room"
];

// Waypoint coordinates (manually mapped to the blueprint)
export const WAYPOINTS: { [key: string]: { x: number, y: number } } = {
  "Auditorium 2": { x: 145, y: 125 },
  "Lab 2": { x: 350, y: 125 },
  "Lab 1": { x: 550, y: 125 },
  "Server Room": { x: 800, y: 180 },
  "Boys RestRoom": { x: 800, y: 250 },
  "Girls RestRoom": { x: 800, y: 320 },
  "VIP Pantry": { x: 950, y: 180 },
  "VIP Waiting": { x: 950, y: 250 },
  "Pantry": { x: 950, y: 320 },
  "VIP Dining": { x: 1050, y: 180 },
  "Chairman Office": { x: 1050, y: 250 },
  "Principle Office": { x: 1050, y: 320 },
  "OAT": { x: 350, y: 320 },
  "AIDS": { x: 550, y: 250 },
  "Green Room 1": { x: 800, y: 400 },
  "Green Room 2": { x: 800, y: 470 },
  "Admin Office": { x: 950, y: 400 },
  "Reception": { x: 1050, y: 400 },
  "Master Board Room": { x: 1150, y: 250 },
  "OAK leaf": { x: 1150, y: 320 },
  "Exam Hall": { x: 950, y: 470 },
  "Meeting Room": { x: 1050, y: 470 },
  "Transport office": { x: 1150, y: 400 },
  "Zig Zag Steps": { x: 730, y: 515 },
  "Admission Office": { x: 900, y: 515 },
  "Falcon Hall": { x: 1000, y: 515 },
  "Harmony": { x: 1150, y: 470 },
  "CDC": { x: 1200, y: 400 },
  "Symphony": { x: 1200, y: 470 },
  "Waiting Hall": { x: 1200, y: 320 },
  "Step-l2": { x: 450, y: 240 },
  "Step-l5": { x: 1200, y: 180 },
  "PT Room": { x: 350, y: 400 },
  "Store Room": { x: 450, y: 400 },
  "Auditorium 1": { x: 145, y: 470 }
};

// Graph representing connections between rooms (distances in arbitrary units)
export const GRAPH: { [key: string]: { [key: string]: number } } = {
  "Auditorium 2": {
    "Lab 2": 20,
    "Step-l2": 25,
    "Auditorium 1": 35
  },
  "Lab 2": {
    "Auditorium 2": 20,
    "Lab 1": 20,
    "Step-l2": 15,
    "OAT": 20
  },
  "Lab 1": {
    "Lab 2": 20,
    "AIDS": 15,
    "Server Room": 25
  },
  "Server Room": {
    "Lab 1": 25,
    "Boys RestRoom": 10,
    "VIP Pantry": 15,
    "AIDS": 20
  },
  "Boys RestRoom": {
    "Server Room": 10,
    "Girls RestRoom": 10,
    "VIP Waiting": 15
  },
  "Girls RestRoom": {
    "Boys RestRoom": 10,
    "Pantry": 15,
    "Green Room 1": 10
  },
  "VIP Pantry": {
    "Server Room": 15,
    "VIP Waiting": 10,
    "VIP Dining": 10
  },
  "VIP Waiting": {
    "Boys RestRoom": 15,
    "VIP Pantry": 10,
    "Chairman Office": 10
  },
  "Pantry": {
    "Girls RestRoom": 15,
    "Principle Office": 10,
    "Admin Office": 15
  },
  "VIP Dining": {
    "VIP Pantry": 10,
    "Chairman Office": 10,
    "Master Board Room": 10
  },
  "Chairman Office": {
    "VIP Waiting": 10,
    "VIP Dining": 10,
    "Principle Office": 10
  },
  "Principle Office": {
    "Pantry": 10,
    "Chairman Office": 10,
    "OAK leaf": 15
  },
  "OAT": {
    "Lab 2": 20,
    "Step-l2": 10,
    "PT Room": 15
  },
  "AIDS": {
    "Lab 1": 15,
    "Server Room": 20,
    "Step-l2": 20
  },
  "Green Room 1": {
    "Girls RestRoom": 10,
    "Green Room 2": 10,
    "Admin Office": 15
  },
  "Green Room 2": {
    "Green Room 1": 10,
    "Exam Hall": 15,
    "Store Room": 35
  },
  "Admin Office": {
    "Pantry": 15,
    "Green Room 1": 15,
    "Reception": 10
  },
  "Reception": {
    "Admin Office": 10,
    "Meeting Room": 10,
    "Transport office": 10
  },
  "Master Board Room": {
    "VIP Dining": 10,
    "OAK leaf": 10,
    "Waiting Hall": 15
  },
  "OAK leaf": {
    "Principle Office": 15,
    "Master Board Room": 10,
    "Waiting Hall": 10
  },
  "Exam Hall": {
    "Green Room 2": 15,
    "Meeting Room": 10,
    "Admission Office": 15
  },
  "Meeting Room": {
    "Reception": 10,
    "Exam Hall": 10,
    "Falcon Hall": 15
  },
  "Transport office": {
    "Reception": 10,
    "Harmony": 15,
    "CDC": 10
  },
  "Zig Zag Steps": {
    "Admission Office": 17,
    "Green Room 2": 25
  },
  "Admission Office": {
    "Zig Zag Steps": 17,
    "Falcon Hall": 10,
    "Exam Hall": 15
  },
  "Falcon Hall": {
    "Admission Office": 10,
    "Meeting Room": 15,
    "Harmony": 15
  },
  "Harmony": {
    "Falcon Hall": 15,
    "Transport office": 15,
    "Symphony": 10
  },
  "CDC": {
    "Transport office": 10,
    "Symphony": 10,
    "Waiting Hall": 15
  },
  "Symphony": {
    "Harmony": 10,
    "CDC": 10
  },
  "Waiting Hall": {
    "Master Board Room": 15,
    "OAK leaf": 10,
    "CDC": 15,
    "Step-l5": 15
  },
  "Step-l2": {
    "Auditorium 2": 25,
    "Lab 2": 15,
    "OAT": 10,
    "AIDS": 20
  },
  "Step-l5": {
    "Waiting Hall": 15
  },
  "PT Room": {
    "OAT": 15,
    "Store Room": 10
  },
  "Store Room": {
    "PT Room": 10,
    "Green Room 2": 35
  },
  "Auditorium 1": {
    "Auditorium 2": 35,
    "PT Room": 25
  }
};
