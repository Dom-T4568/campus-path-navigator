export const ROOMS = [
  "Auditorium 2", "Lab 2", "Lab 1", "Lab 3", "Lab 4", "Lab 5", "Server Room", "Step-l2", "Boys RestRoom",
  "Girls RestRoom", "VIP Pantry", "VIP Waiting", "Pantry", "VIP Dining", 
  "Chairman Office", "Principle Office", "OAT", "AIDS", "Green Room 1", 
  "Green Room 2", "Admin Office", "Reception", "Master Board Room", 
  "OAK leaf", "Exam Hall", "Meeting Room", "Transport office", 
  "Zig Zag Steps", "Admission Office", "Falcon Hall", "Harmony", 
  "CDC", "Symphony", "Waiting Hall", "Step-l5", "PT Room", "Store Room",
  "seStep", "gstep", "adsteps", "cdsteps", "vsteps"
];

// Waypoint coordinates (manually mapped to the blueprint)
export const WAYPOINTS: { [key: string]: { x: number, y: number } } = {
  "Auditorium 1": { x: 235, y: 555 },
  "Auditorium 2": { x: 235, y: 160 },
  "Lab 1": { x: 495, y: 210 },
  "Lab 2": { x: 320, y: 210 },
  "Lab 3": { x: 320, y: 295 },
  "Lab 4": { x: 320, y: 410 },
  "Lab 5": { x: 320, y: 505 },
  "Server Room": { x: 270, y: 210 },
  "Step-l2": { x: 420, y: 210 },
  "Step-l5": { x: 430, y: 505 },
  "PT Room": { x: 495, y: 505 },
  "Store Room": { x: 530, y: 505 },
  "Boys RestRoom": { x: 590, y: 210 },
  "Girls RestRoom": { x: 790, y: 210 },
  "VIP Pantry": { x: 830, y: 210 },
  "VIP Waiting": { x: 870, y: 210 },
  "Pantry": { x: 1010, y: 210 },
  "VIP Dining": { x: 1050, y: 210 },
  "Chairman Office": { x: 1050, y: 210 },
  "Principle Office": { x: 1090, y: 210 },
  "OAT": { x: 320, y: 360 },
  "AIDS": { x: 495, y: 270 },
  "Green Room 1": { x: 495, y: 395 },
  "Green Room 2": { x: 495, y: 465 },
  "Admin Office": { x: 875, y: 450 },
  "Reception": { x: 1050, y: 360 },
  "Master Board Room": { x: 1050, y: 300 },
  "OAK leaf": { x: 1050, y: 260 },
  "Exam Hall": { x: 875, y: 320 },
  "Meeting Room": { x: 875, y: 250 },
  "Transport office": { x: 570, y: 505 },
  "Zig Zag Steps": { x: 690, y: 505 },
  "Admission Office": { x: 790, y: 505 },
  "Falcon Hall": { x: 875, y: 505 },
  "Harmony": { x: 1040, y: 505 },
  "CDC": { x: 1000, y: 505 },
  "Symphony": { x: 1090, y: 505 },
  "Waiting Hall": { x: 1050, y: 460 },
  "seStep": { x: 235, y: 360 },
  "gstep": { x: 495, y: 360 },
  "adsteps": { x: 875, y: 360 },
  "cdsteps": { x: 950, y: 505 },
  "vsteps": { x: 940, y: 210 }
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
    "Lab 3": 10,
    "AIDS": 15,
    "Server Room": 25
  },
  "Lab 3": {
    "Lab 1": 10,
    "Lab 4": 10,
    "seStep": 20
  },
  "Lab 4": {
    "Lab 3": 10,
    "Lab 5": 10,
    "gstep": 20
  },
  "Lab 5": {
    "Lab 4": 10,
    "Server Room": 15,
    "vsteps": 20
  },
  "Server Room": {
    "Lab 1": 25,
    "Lab 5": 15,
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
    "PT Room": 15,
    "seStep": 25
  },
  "AIDS": {
    "Lab 1": 15,
    "Server Room": 20,
    "Step-l2": 20,
    "seStep": 15
  },
  "Green Room 1": {
    "Girls RestRoom": 10,
    "Green Room 2": 10,
    "Admin Office": 15
  },
  "Green Room 2": {
    "Green Room 1": 10,
    "Exam Hall": 15,
    "Store Room": 35,
    "adsteps": 10
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
    "Waiting Hall": 10,
    "vsteps": 15
  },
  "Exam Hall": {
    "Green Room 2": 15,
    "Meeting Room": 10,
    "Admission Office": 15
  },
  "Meeting Room": {
    "Reception": 10,
    "Exam Hall": 10,
    "Falcon Hall": 15,
    "cdsteps": 15
  },
  "Transport office": {
    "Reception": 10,
    "Harmony": 15,
    "CDC": 10
  },
  "Zig Zag Steps": {
    "Admission Office": 17,
    "Green Room 2": 25,
    "adsteps": 8
  },
  "Admission Office": {
    "Zig Zag Steps": 17,
    "Falcon Hall": 10,
    "Exam Hall": 15,
    "adsteps": 12
  },
  "Falcon Hall": {
    "Admission Office": 10,
    "Meeting Room": 15,
    "Harmony": 15,
    "cdsteps": 10
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
    "CDC": 10,
    "cdsteps": 12
  },
  "Waiting Hall": {
    "Master Board Room": 15,
    "OAK leaf": 10,
    "CDC": 15,
    "Step-l5": 15,
    "vsteps": 20
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
  },
  "seStep": {
    "Lab 3": 20,
    "OAT": 25,
    "AIDS": 15,
    "gstep": 10
  },
  "gstep": {
    "Lab 4": 20,
    "seStep": 10,
    "vsteps": 15
  },
  "adsteps": {
    "Green Room 2": 10,
    "Zig Zag Steps": 8,
    "Admission Office": 12
  },
  "cdsteps": {
    "Meeting Room": 15,
    "Falcon Hall": 10,
    "Symphony": 12
  },
  "vsteps": {
    "Lab 5": 20,
    "OAK leaf": 15,
    "Waiting Hall": 20,
    "gstep": 15
  }
};
