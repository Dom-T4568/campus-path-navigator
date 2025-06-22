
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

// Waypoints positioned strictly along the black corridor lines from the uploaded floor plan
export const WAYPOINTS: { [key: string]: { x: number, y: number } } = {
  // Room waypoints - positioned at room entrances that connect to corridors
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
  
  // Critical corridor intersection nodes - positioned exactly on black corridor lines
  "north_corridor_1": { x: 280, y: 210 },    // Upper left corridor segment
  "north_corridor_2": { x: 450, y: 210 },    // Upper center corridor segment
  "north_corridor_3": { x: 650, y: 210 },    // Upper center-right corridor segment
  "north_corridor_4": { x: 900, y: 210 },    // Upper right corridor segment
  "north_corridor_5": { x: 1020, y: 210 },   // Far upper right corridor segment
  
  "middle_corridor_1": { x: 320, y: 330 },   // Middle left corridor segment
  "middle_corridor_2": { x: 495, y: 330 },   // Middle center corridor segment
  "middle_corridor_3": { x: 700, y: 330 },   // Middle center-right corridor segment
  "middle_corridor_4": { x: 875, y: 330 },   // Middle right corridor segment
  "middle_corridor_5": { x: 1050, y: 330 },  // Far middle right corridor segment
  
  "south_corridor_1": { x: 350, y: 505 },    // Lower left corridor segment
  "south_corridor_2": { x: 500, y: 505 },    // Lower center corridor segment
  "south_corridor_3": { x: 650, y: 505 },    // Lower center-right corridor segment
  "south_corridor_4": { x: 875, y: 505 },    // Lower right corridor segment
  "south_corridor_5": { x: 1020, y: 505 },   // Far lower right corridor segment
  
  // Vertical corridor connectors - following black vertical lines
  "vertical_connector_1": { x: 320, y: 270 }, // Left vertical connector
  "vertical_connector_2": { x: 495, y: 270 }, // Center vertical connector
  "vertical_connector_3": { x: 875, y: 270 }, // Right vertical connector
  "vertical_connector_4": { x: 1050, y: 270 }, // Far right vertical connector
  
  "vertical_connector_5": { x: 320, y: 450 }, // Left lower vertical connector
  "vertical_connector_6": { x: 495, y: 450 }, // Center lower vertical connector
  "vertical_connector_7": { x: 875, y: 450 }, // Right lower vertical connector
  "vertical_connector_8": { x: 1050, y: 450 }  // Far right lower vertical connector
};

// Graph connections strictly following the black corridor paths from the floor plan
export const GRAPH: { [key: string]: { [key: string]: number } } = {
  // Upper corridor (north) connections - following horizontal black lines
  "Auditorium 2": {
    "north_corridor_1": 8
  },
  "Lab 2": {
    "north_corridor_1": 6
  },
  "Server Room": {
    "north_corridor_1": 5
  },
  "north_corridor_1": {
    "Auditorium 2": 8,
    "Lab 2": 6,
    "Server Room": 5,
    "north_corridor_2": 12,
    "vertical_connector_1": 8
  },
  
  "Lab 1": {
    "north_corridor_2": 8
  },
  "Step-l2": {
    "north_corridor_2": 10
  },
  "north_corridor_2": {
    "north_corridor_1": 12,
    "north_corridor_3": 15,
    "Lab 1": 8,
    "Step-l2": 10,
    "vertical_connector_2": 8
  },
  
  "Boys RestRoom": {
    "north_corridor_3": 8
  },
  "north_corridor_3": {
    "north_corridor_2": 15,
    "north_corridor_4": 18,
    "Boys RestRoom": 8
  },
  
  "Girls RestRoom": {
    "north_corridor_4": 8
  },
  "VIP Pantry": {
    "north_corridor_4": 10
  },
  "VIP Waiting": {
    "north_corridor_4": 12
  },
  "vsteps": {
    "north_corridor_4": 8
  },
  "north_corridor_4": {
    "north_corridor_3": 18,
    "north_corridor_5": 10,
    "Girls RestRoom": 8,
    "VIP Pantry": 10,
    "VIP Waiting": 12,
    "vsteps": 8,
    "vertical_connector_3": 8
  },
  
  "Pantry": {
    "north_corridor_5": 8
  },
  "Principle Office": {
    "north_corridor_5": 12
  },
  "Chairman Office": {
    "north_corridor_5": 10
  },
  "VIP Dining": {
    "north_corridor_5": 8
  },
  "north_corridor_5": {
    "north_corridor_4": 10,
    "Pantry": 8,
    "Principle Office": 12,
    "Chairman Office": 10,
    "VIP Dining": 8,
    "vertical_connector_4": 8
  },
  
  // Middle corridor connections - following horizontal black lines
  "Lab 3": {
    "middle_corridor_1": 8
  },
  "OAT": {
    "middle_corridor_1": 10
  },
  "middle_corridor_1": {
    "Lab 3": 8,
    "OAT": 10,
    "middle_corridor_2": 12,
    "vertical_connector_1": 8,
    "vertical_connector_5": 15
  },
  
  "AIDS": {
    "middle_corridor_2": 10
  },
  "gstep": {
    "middle_corridor_2": 8
  },
  "Green Room 1": {
    "middle_corridor_2": 12
  },
  "middle_corridor_2": {
    "middle_corridor_1": 12,
    "middle_corridor_3": 15,
    "AIDS": 10,
    "gstep": 8,
    "Green Room 1": 12,
    "vertical_connector_2": 8,
    "vertical_connector_6": 15
  },
  
  "middle_corridor_3": {
    "middle_corridor_2": 15,
    "middle_corridor_4": 12
  },
  
  "Exam Hall": {
    "middle_corridor_4": 8
  },
  "Meeting Room": {
    "middle_corridor_4": 10
  },
  "adsteps": {
    "middle_corridor_4": 8
  },
  "middle_corridor_4": {
    "middle_corridor_3": 12,
    "middle_corridor_5": 12,
    "Exam Hall": 8,
    "Meeting Room": 10,
    "adsteps": 8,
    "vertical_connector_3": 8,
    "vertical_connector_7": 15
  },
  
  "Master Board Room": {
    "middle_corridor_5": 8
  },
  "OAK leaf": {
    "middle_corridor_5": 10
  },
  "Reception": {
    "middle_corridor_5": 8
  },
  "middle_corridor_5": {
    "middle_corridor_4": 12,
    "Master Board Room": 8,
    "OAK leaf": 10,
    "Reception": 8,
    "vertical_connector_4": 8,
    "vertical_connector_8": 15
  },
  
  // Lower corridor (south) connections - following horizontal black lines
  "Lab 5": {
    "south_corridor_1": 8
  },
  "Lab 4": {
    "vertical_connector_5": 10
  },
  "south_corridor_1": {
    "Lab 5": 8,
    "Step-l5": 12,
    "south_corridor_2": 10,
    "vertical_connector_5": 12
  },
  
  "Step-l5": {
    "south_corridor_1": 12,
    "south_corridor_2": 8
  },
  "PT Room": {
    "south_corridor_2": 8
  },
  "Store Room": {
    "south_corridor_2": 10
  },
  "Transport office": {
    "south_corridor_2": 12
  },
  "south_corridor_2": {
    "south_corridor_1": 10,
    "south_corridor_3": 12,
    "Step-l5": 8,
    "PT Room": 8,
    "Store Room": 10,
    "Transport office": 12,
    "vertical_connector_6": 12
  },
  
  "Zig Zag Steps": {
    "south_corridor_3": 8
  },
  "Admission Office": {
    "south_corridor_3": 10
  },
  "south_corridor_3": {
    "south_corridor_2": 12,
    "south_corridor_4": 15,
    "Zig Zag Steps": 8,
    "Admission Office": 10
  },
  
  "Falcon Hall": {
    "south_corridor_4": 8
  },
  "cdsteps": {
    "south_corridor_4": 10
  },
  "south_corridor_4": {
    "south_corridor_3": 15,
    "south_corridor_5": 10,
    "Falcon Hall": 8,
    "cdsteps": 10,
    "vertical_connector_7": 12
  },
  
  "CDC": {
    "south_corridor_5": 8
  },
  "Harmony": {
    "south_corridor_5": 10
  },
  "Symphony": {
    "south_corridor_5": 12
  },
  "south_corridor_5": {
    "south_corridor_4": 10,
    "CDC": 8,
    "Harmony": 10,
    "Symphony": 12,
    "vertical_connector_8": 12
  },
  
  // Vertical corridor connections - following vertical black lines
  "vertical_connector_1": {
    "north_corridor_1": 8,
    "middle_corridor_1": 8,
    "vertical_connector_5": 18
  },
  "vertical_connector_2": {
    "north_corridor_2": 8,
    "middle_corridor_2": 8,
    "vertical_connector_6": 18
  },
  "vertical_connector_3": {
    "north_corridor_4": 8,
    "middle_corridor_4": 8,
    "vertical_connector_7": 18
  },
  "vertical_connector_4": {
    "north_corridor_5": 8,
    "middle_corridor_5": 8,
    "vertical_connector_8": 18
  },
  "vertical_connector_5": {
    "vertical_connector_1": 18,
    "middle_corridor_1": 15,
    "south_corridor_1": 12,
    "Lab 4": 10
  },
  "vertical_connector_6": {
    "vertical_connector_2": 18,
    "middle_corridor_2": 15,
    "south_corridor_2": 12,
    "Green Room 2": 10
  },
  "vertical_connector_7": {
    "vertical_connector_3": 18,
    "middle_corridor_4": 15,
    "south_corridor_4": 12,
    "Admin Office": 10
  },
  "vertical_connector_8": {
    "vertical_connector_4": 18,
    "middle_corridor_5": 15,
    "south_corridor_5": 12,
    "Waiting Hall": 10
  },
  
  // Additional room connections to nearby corridor nodes
  "Green Room 2": {
    "vertical_connector_6": 10
  },
  "Admin Office": {
    "vertical_connector_7": 10
  },
  "Waiting Hall": {
    "vertical_connector_8": 10
  },
  
  // Special step connections
  "seStep": {
    "middle_corridor_1": 15
  }
};
