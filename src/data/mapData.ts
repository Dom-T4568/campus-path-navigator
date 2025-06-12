
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

// Enhanced waypoint coordinates with corridor intersections
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
  "vsteps": { x: 940, y: 210 },
  
  // Additional corridor waypoints to ensure proper navigation
  "corridor_upper_main": { x: 600, y: 210 },
  "corridor_middle_main": { x: 600, y: 360 },
  "corridor_lower_main": { x: 600, y: 505 },
  "corridor_left_vertical": { x: 320, y: 360 },
  "corridor_right_vertical": { x: 875, y: 360 },
  "corridor_center_hub": { x: 600, y: 360 }
};

// Enhanced graph with better corridor connections
export const GRAPH: { [key: string]: { [key: string]: number } } = {
  "Auditorium 2": {
    "Lab 2": 20,
    "corridor_upper_main": 30
  },
  "Lab 2": {
    "Auditorium 2": 20,
    "Lab 1": 20,
    "Server Room": 15,
    "corridor_left_vertical": 15
  },
  "Lab 1": {
    "Lab 2": 20,
    "corridor_upper_main": 15,
    "AIDS": 15
  },
  "Lab 3": {
    "corridor_left_vertical": 10,
    "Lab 4": 15,
    "OAT": 10
  },
  "Lab 4": {
    "Lab 3": 15,
    "Lab 5": 15,
    "corridor_left_vertical": 15
  },
  "Lab 5": {
    "Lab 4": 15,
    "corridor_lower_main": 20,
    "Step-l5": 15
  },
  "Server Room": {
    "Lab 2": 15,
    "corridor_upper_main": 25
  },
  "Boys RestRoom": {
    "corridor_upper_main": 10,
    "Girls RestRoom": 20
  },
  "Girls RestRoom": {
    "Boys RestRoom": 20,
    "corridor_upper_main": 15
  },
  "VIP Pantry": {
    "corridor_upper_main": 20,
    "VIP Waiting": 10
  },
  "VIP Waiting": {
    "VIP Pantry": 10,
    "vsteps": 15
  },
  "Pantry": {
    "corridor_upper_main": 30,
    "Principle Office": 15
  },
  "VIP Dining": {
    "Chairman Office": 10,
    "Master Board Room": 10
  },
  "Chairman Office": {
    "VIP Dining": 10,
    "Principle Office": 10
  },
  "Principle Office": {
    "Chairman Office": 10,
    "Pantry": 15,
    "OAK leaf": 15
  },
  "OAT": {
    "Lab 3": 10,
    "corridor_left_vertical": 5,
    "corridor_middle_main": 20
  },
  "AIDS": {
    "Lab 1": 15,
    "corridor_upper_main": 20,
    "corridor_middle_main": 25
  },
  "Green Room 1": {
    "corridor_middle_main": 20,
    "Green Room 2": 15
  },
  "Green Room 2": {
    "Green Room 1": 15,
    "corridor_middle_main": 15,
    "adsteps": 15
  },
  "Admin Office": {
    "corridor_right_vertical": 10,
    "Reception": 20
  },
  "Reception": {
    "Admin Office": 20,
    "Master Board Room": 15,
    "corridor_right_vertical": 15
  },
  "Master Board Room": {
    "VIP Dining": 10,
    "OAK leaf": 10,
    "Reception": 15
  },
  "OAK leaf": {
    "Principle Office": 15,
    "Master Board Room": 10,
    "vsteps": 20
  },
  "Exam Hall": {
    "corridor_right_vertical": 15,
    "Meeting Room": 15,
    "adsteps": 15
  },
  "Meeting Room": {
    "Exam Hall": 15,
    "corridor_right_vertical": 20,
    "vsteps": 15
  },
  "Transport office": {
    "corridor_lower_main": 10,
    "Zig Zag Steps": 15
  },
  "Zig Zag Steps": {
    "Transport office": 15,
    "Admission Office": 15,
    "corridor_lower_main": 15
  },
  "Admission Office": {
    "Zig Zag Steps": 15,
    "Falcon Hall": 15,
    "adsteps": 20
  },
  "Falcon Hall": {
    "Admission Office": 15,
    "corridor_lower_main": 20,
    "cdsteps": 15
  },
  "Harmony": {
    "CDC": 10,
    "corridor_lower_main": 25
  },
  "CDC": {
    "Harmony": 10,
    "Symphony": 15,
    "corridor_lower_main": 20
  },
  "Symphony": {
    "CDC": 15,
    "cdsteps": 20
  },
  "Waiting Hall": {
    "Reception": 25,
    "corridor_right_vertical": 20
  },
  "Step-l2": {
    "corridor_upper_main": 15,
    "corridor_middle_main": 20
  },
  "Step-l5": {
    "Lab 5": 15,
    "corridor_lower_main": 20
  },
  "PT Room": {
    "corridor_lower_main": 10,
    "Store Room": 10
  },
  "Store Room": {
    "PT Room": 10,
    "corridor_lower_main": 15
  },
  "Auditorium 1": {
    "seStep": 25,
    "corridor_lower_main": 35
  },
  "seStep": {
    "Auditorium 1": 25,
    "corridor_left_vertical": 15
  },
  "gstep": {
    "corridor_middle_main": 10,
    "corridor_left_vertical": 15
  },
  "adsteps": {
    "Green Room 2": 15,
    "Admission Office": 20,
    "Exam Hall": 15,
    "corridor_right_vertical": 10
  },
  "cdsteps": {
    "Falcon Hall": 15,
    "Symphony": 20,
    "corridor_lower_main": 15
  },
  "vsteps": {
    "VIP Waiting": 15,
    "OAK leaf": 20,
    "Meeting Room": 15,
    "corridor_upper_main": 25
  },
  
  // Corridor waypoint connections
  "corridor_upper_main": {
    "Auditorium 2": 30,
    "Lab 1": 15,
    "Server Room": 25,
    "Boys RestRoom": 10,
    "Girls RestRoom": 15,
    "VIP Pantry": 20,
    "Pantry": 30,
    "AIDS": 20,
    "Step-l2": 15,
    "vsteps": 25,
    "corridor_middle_main": 15
  },
  "corridor_middle_main": {
    "corridor_upper_main": 15,
    "corridor_lower_main": 15,
    "OAT": 20,
    "AIDS": 25,
    "Green Room 1": 20,
    "Green Room 2": 15,
    "gstep": 10,
    "Step-l2": 20,
    "corridor_left_vertical": 20,
    "corridor_right_vertical": 20
  },
  "corridor_lower_main": {
    "corridor_middle_main": 15,
    "Lab 5": 20,
    "Transport office": 10,
    "Zig Zag Steps": 15,
    "Falcon Hall": 20,
    "Harmony": 25,
    "CDC": 20,
    "PT Room": 10,
    "Store Room": 15,
    "Auditorium 1": 35,
    "Step-l5": 20,
    "cdsteps": 15
  },
  "corridor_left_vertical": {
    "Lab 2": 15,
    "Lab 3": 10,
    "Lab 4": 15,
    "OAT": 5,
    "seStep": 15,
    "gstep": 15,
    "corridor_middle_main": 20
  },
  "corridor_right_vertical": {
    "Admin Office": 10,
    "Reception": 15,
    "Exam Hall": 15,
    "Meeting Room": 20,
    "Waiting Hall": 20,
    "adsteps": 10,
    "corridor_middle_main": 20
  }
};
