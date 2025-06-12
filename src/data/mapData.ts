
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

// Enhanced waypoint coordinates with more corridor intersections for proper pathfinding
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
  
  // Strategic corridor waypoints that define the actual pathways
  "upper_corridor_left": { x: 280, y: 210 },
  "upper_corridor_center": { x: 550, y: 210 },
  "upper_corridor_right": { x: 900, y: 210 },
  "middle_corridor_left": { x: 320, y: 360 },
  "middle_corridor_center": { x: 550, y: 360 },
  "middle_corridor_right": { x: 875, y: 360 },
  "lower_corridor_left": { x: 350, y: 505 },
  "lower_corridor_center": { x: 650, y: 505 },
  "lower_corridor_right": { x: 950, y: 505 },
  "vertical_left_upper": { x: 320, y: 250 },
  "vertical_left_lower": { x: 320, y: 450 },
  "vertical_center": { x: 550, y: 300 },
  "vertical_right_upper": { x: 875, y: 280 },
  "vertical_right_lower": { x: 875, y: 420 }
};

// Completely redesigned graph to ensure paths only follow corridors and hallways
export const GRAPH: { [key: string]: { [key: string]: number } } = {
  // Upper corridor connections (horizontal pathway)
  "Auditorium 2": {
    "upper_corridor_left": 10
  },
  "Lab 2": {
    "upper_corridor_left": 8
  },
  "Server Room": {
    "upper_corridor_left": 5
  },
  "upper_corridor_left": {
    "Auditorium 2": 10,
    "Lab 2": 8,
    "Server Room": 5,
    "upper_corridor_center": 15,
    "vertical_left_upper": 8
  },
  "Lab 1": {
    "upper_corridor_center": 8
  },
  "Step-l2": {
    "upper_corridor_center": 10
  },
  "Boys RestRoom": {
    "upper_corridor_center": 12
  },
  "upper_corridor_center": {
    "upper_corridor_left": 15,
    "upper_corridor_right": 20,
    "Lab 1": 8,
    "Step-l2": 10,
    "Boys RestRoom": 12,
    "vertical_center": 12
  },
  "Girls RestRoom": {
    "upper_corridor_right": 8
  },
  "VIP Pantry": {
    "upper_corridor_right": 10
  },
  "VIP Waiting": {
    "upper_corridor_right": 12
  },
  "vsteps": {
    "upper_corridor_right": 8
  },
  "upper_corridor_right": {
    "upper_corridor_center": 20,
    "Girls RestRoom": 8,
    "VIP Pantry": 10,
    "VIP Waiting": 12,
    "vsteps": 8,
    "Pantry": 15,
    "Principle Office": 20,
    "vertical_right_upper": 10
  },
  "Pantry": {
    "upper_corridor_right": 15,
    "Principle Office": 8
  },
  "Principle Office": {
    "upper_corridor_right": 20,
    "Pantry": 8,
    "OAK leaf": 5,
    "Chairman Office": 5
  },
  "Chairman Office": {
    "Principle Office": 5,
    "VIP Dining": 3
  },
  "VIP Dining": {
    "Chairman Office": 3
  },
  "OAK leaf": {
    "Principle Office": 5,
    "Master Board Room": 5
  },
  "Master Board Room": {
    "OAK leaf": 5,
    "Reception": 8
  },

  // Middle corridor connections (horizontal pathway)
  "middle_corridor_left": {
    "OAT": 5,
    "middle_corridor_center": 15,
    "vertical_left_upper": 15,
    "vertical_left_lower": 15
  },
  "OAT": {
    "middle_corridor_left": 5,
    "Lab 3": 8
  },
  "Lab 3": {
    "OAT": 8,
    "vertical_left_upper": 10
  },
  "AIDS": {
    "middle_corridor_center": 12,
    "vertical_center": 8
  },
  "gstep": {
    "middle_corridor_center": 5
  },
  "middle_corridor_center": {
    "middle_corridor_left": 15,
    "middle_corridor_right": 20,
    "AIDS": 12,
    "gstep": 5,
    "Green Room 1": 10,
    "vertical_center": 5
  },
  "Green Room 1": {
    "middle_corridor_center": 10,
    "Green Room 2": 12
  },
  "Green Room 2": {
    "Green Room 1": 12,
    "middle_corridor_right": 15
  },
  "adsteps": {
    "middle_corridor_right": 5
  },
  "middle_corridor_right": {
    "middle_corridor_center": 20,
    "Green Room 2": 15,
    "adsteps": 5,
    "Exam Hall": 10,
    "Meeting Room": 12,
    "vertical_right_upper": 8,
    "vertical_right_lower": 15
  },
  "Exam Hall": {
    "middle_corridor_right": 10,
    "vertical_right_upper": 12
  },
  "Meeting Room": {
    "middle_corridor_right": 12,
    "vertical_right_upper": 8
  },
  "Reception": {
    "Master Board Room": 8,
    "Admin Office": 15,
    "Waiting Hall": 10,
    "vertical_right_lower": 12
  },
  "Admin Office": {
    "Reception": 15,
    "vertical_right_lower": 8
  },
  "Waiting Hall": {
    "Reception": 10,
    "vertical_right_lower": 10
  },

  // Lower corridor connections (horizontal pathway)
  "Lab 5": {
    "lower_corridor_left": 8
  },
  "Lab 4": {
    "vertical_left_lower": 10
  },
  "lower_corridor_left": {
    "Lab 5": 8,
    "Step-l5": 15,
    "lower_corridor_center": 18,
    "vertical_left_lower": 12
  },
  "Step-l5": {
    "lower_corridor_left": 15,
    "lower_corridor_center": 12
  },
  "PT Room": {
    "lower_corridor_center": 8
  },
  "Store Room": {
    "lower_corridor_center": 10
  },
  "Transport office": {
    "lower_corridor_center": 12
  },
  "lower_corridor_center": {
    "lower_corridor_left": 18,
    "lower_corridor_right": 20,
    "Step-l5": 12,
    "PT Room": 8,
    "Store Room": 10,
    "Transport office": 12,
    "Zig Zag Steps": 8
  },
  "Zig Zag Steps": {
    "lower_corridor_center": 8,
    "Admission Office": 15,
    "lower_corridor_right": 18
  },
  "Admission Office": {
    "Zig Zag Steps": 15,
    "Falcon Hall": 12,
    "lower_corridor_right": 12
  },
  "Falcon Hall": {
    "Admission Office": 12,
    "lower_corridor_right": 10,
    "cdsteps": 8
  },
  "cdsteps": {
    "Falcon Hall": 8,
    "lower_corridor_right": 5
  },
  "lower_corridor_right": {
    "lower_corridor_center": 20,
    "Zig Zag Steps": 18,
    "Admission Office": 12,
    "Falcon Hall": 10,
    "cdsteps": 5,
    "CDC": 8,
    "Harmony": 15,
    "Symphony": 20
  },
  "CDC": {
    "lower_corridor_right": 8,
    "Harmony": 8
  },
  "Harmony": {
    "lower_corridor_right": 15,
    "CDC": 8,
    "Symphony": 12
  },
  "Symphony": {
    "lower_corridor_right": 20,
    "Harmony": 12
  },

  // Vertical corridor connections
  "vertical_left_upper": {
    "upper_corridor_left": 8,
    "middle_corridor_left": 15,
    "Lab 3": 10,
    "vertical_left_lower": 20
  },
  "vertical_left_lower": {
    "vertical_left_upper": 20,
    "middle_corridor_left": 15,
    "lower_corridor_left": 12,
    "Lab 4": 10
  },
  "vertical_center": {
    "upper_corridor_center": 12,
    "middle_corridor_center": 5,
    "AIDS": 8
  },
  "vertical_right_upper": {
    "upper_corridor_right": 10,
    "middle_corridor_right": 8,
    "Meeting Room": 8,
    "Exam Hall": 12,
    "vertical_right_lower": 15
  },
  "vertical_right_lower": {
    "vertical_right_upper": 15,
    "middle_corridor_right": 15,
    "Reception": 12,
    "Admin Office": 8,
    "Waiting Hall": 10
  },

  // Special connections for steps and unique areas
  "seStep": {
    "Auditorium 1": 15,
    "middle_corridor_left": 20
  },
  "Auditorium 1": {
    "seStep": 15,
    "lower_corridor_left": 25
  }
};
