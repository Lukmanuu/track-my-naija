export type ProjectStatus = "completed" | "ongoing" | "abandoned" | "not_started";

export interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  amountSpent: number;
  contractor: string;
  location: string;
  lga: string;
  state: string;
  lat: number;
  lng: number;
  status: ProjectStatus;
  startDate: string;
  expectedEndDate: string;
  category: string;
  imageUrl: string;
  politicianId: string;
  averageRating: number;
  totalRatings: number;
}

export interface Politician {
  id: string;
  name: string;
  position: string;
  lga: string;
  state: string;
  imageUrl: string;
  performanceScore: number;
  projectCount: number;
}

export interface CitizenReport {
  id: string;
  projectId: string;
  projectName: string;
  description: string;
  imageUrl: string;
  reporterName: string;
  reporterLga: string;
  createdAt: string;
  status: "pending" | "verified" | "dismissed";
}

export interface BudgetAllocation {
  id: string;
  level: "federal" | "state" | "lga";
  name: string;
  allocated: number;
  disbursed: number;
  year: number;
}

export const projects: Project[] = [
  {
    id: "p1",
    name: "Gombe–Biu Road Rehabilitation",
    description: "Rehabilitation of the 120km Gombe to Biu highway to improve interstate connectivity and trade routes between Gombe and Borno states.",
    budget: 4500000000,
    amountSpent: 1800000000,
    contractor: "Julius Berger Nigeria Plc",
    location: "Gombe–Biu Highway",
    lga: "Gombe",
    state: "Gombe",
    lat: 10.2897,
    lng: 11.1673,
    status: "ongoing",
    startDate: "2024-03-15",
    expectedEndDate: "2026-09-30",
    category: "Roads & Infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600",
    politicianId: "pol1",
    averageRating: 3.2,
    totalRatings: 47,
  },
  {
    id: "p2",
    name: "Billiri General Hospital Upgrade",
    description: "Complete renovation and equipping of Billiri General Hospital including a new maternity ward, laboratory, and emergency unit.",
    budget: 1200000000,
    amountSpent: 1100000000,
    contractor: "Oilserv Construction Ltd",
    location: "Billiri Town",
    lga: "Billiri",
    state: "Gombe",
    lat: 9.8633,
    lng: 11.1547,
    status: "completed",
    startDate: "2023-06-01",
    expectedEndDate: "2025-01-31",
    category: "Healthcare",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600",
    politicianId: "pol2",
    averageRating: 4.5,
    totalRatings: 112,
  },
  {
    id: "p3",
    name: "Kaltungo Water Supply Project",
    description: "Construction of boreholes and water distribution network to serve 15 communities in Kaltungo LGA with clean drinking water.",
    budget: 800000000,
    amountSpent: 200000000,
    contractor: "WaterTech Nigeria Ltd",
    location: "Kaltungo",
    lga: "Kaltungo",
    state: "Gombe",
    lat: 9.8167,
    lng: 11.3083,
    status: "abandoned",
    startDate: "2023-01-10",
    expectedEndDate: "2024-06-30",
    category: "Water & Sanitation",
    imageUrl: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600",
    politicianId: "pol3",
    averageRating: 1.3,
    totalRatings: 89,
  },
  {
    id: "p4",
    name: "Dukku Primary School Construction",
    description: "Building of 3 new primary school blocks with 18 classrooms, staff quarters, and recreational facilities in Dukku LGA.",
    budget: 350000000,
    amountSpent: 340000000,
    contractor: "Haske Builders Ltd",
    location: "Dukku Town",
    lga: "Dukku",
    state: "Gombe",
    lat: 10.8236,
    lng: 10.7722,
    status: "completed",
    startDate: "2023-09-01",
    expectedEndDate: "2025-03-31",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",
    politicianId: "pol1",
    averageRating: 4.1,
    totalRatings: 63,
  },
  {
    id: "p5",
    name: "Nafada Solar Power Installation",
    description: "Installation of solar-powered mini-grids across 8 communities in Nafada LGA to provide reliable electricity for homes and businesses.",
    budget: 620000000,
    amountSpent: 310000000,
    contractor: "GreenEnergy Solutions Ltd",
    location: "Nafada",
    lga: "Nafada",
    state: "Gombe",
    lat: 11.0964,
    lng: 11.3328,
    status: "ongoing",
    startDate: "2024-07-01",
    expectedEndDate: "2025-12-31",
    category: "Energy",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600",
    politicianId: "pol4",
    averageRating: 3.8,
    totalRatings: 29,
  },
  {
    id: "p6",
    name: "Yamaltu Market Modernization",
    description: "Construction of a modern market complex with 200 lock-up shops, drainage, and parking facilities in Yamaltu-Deba LGA.",
    budget: 950000000,
    amountSpent: 0,
    contractor: "Not Assigned",
    location: "Yamaltu-Deba",
    lga: "Yamaltu-Deba",
    state: "Gombe",
    lat: 10.2403,
    lng: 11.2675,
    status: "not_started",
    startDate: "2025-04-01",
    expectedEndDate: "2026-12-31",
    category: "Commerce",
    imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600",
    politicianId: "pol2",
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: "p7",
    name: "Akko Rural Roads Network",
    description: "Construction of 45km of rural feeder roads connecting farming communities to major highways in Akko LGA.",
    budget: 2100000000,
    amountSpent: 600000000,
    contractor: "Dantata & Sawoe Ltd",
    location: "Akko LGA",
    lga: "Akko",
    state: "Gombe",
    lat: 10.2894,
    lng: 10.9656,
    status: "ongoing",
    startDate: "2024-01-15",
    expectedEndDate: "2026-06-30",
    category: "Roads & Infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    politicianId: "pol3",
    averageRating: 2.7,
    totalRatings: 34,
  },
  {
    id: "p8",
    name: "Gombe State University Library",
    description: "Construction of a modern 3-story library and digital learning center at Gombe State University with capacity for 2,000 students.",
    budget: 1800000000,
    amountSpent: 1750000000,
    contractor: "CCECC Nigeria Ltd",
    location: "Gombe Town",
    lga: "Gombe",
    state: "Gombe",
    lat: 10.2833,
    lng: 11.1667,
    status: "completed",
    startDate: "2022-11-01",
    expectedEndDate: "2024-12-31",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
    politicianId: "pol1",
    averageRating: 4.7,
    totalRatings: 156,
  },
  {
    id: "p9",
    name: "Balanga Irrigation Project",
    description: "Development of an irrigation system covering 500 hectares of farmland along the Gongola River to support year-round agriculture.",
    budget: 3200000000,
    amountSpent: 900000000,
    contractor: "Triacta Nigeria Ltd",
    location: "Balanga",
    lga: "Balanga",
    state: "Gombe",
    lat: 9.8833,
    lng: 11.7000,
    status: "abandoned",
    startDate: "2022-05-01",
    expectedEndDate: "2024-11-30",
    category: "Agriculture",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600",
    politicianId: "pol4",
    averageRating: 1.1,
    totalRatings: 73,
  },
  {
    id: "p10",
    name: "Kwami Health Center Network",
    description: "Construction of 5 primary health care centers across Kwami LGA to improve rural healthcare access.",
    budget: 450000000,
    amountSpent: 200000000,
    contractor: "MedBuild Nigeria Ltd",
    location: "Kwami",
    lga: "Kwami",
    state: "Gombe",
    lat: 10.5500,
    lng: 11.1500,
    status: "ongoing",
    startDate: "2024-09-01",
    expectedEndDate: "2026-03-31",
    category: "Healthcare",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600",
    politicianId: "pol2",
    averageRating: 3.5,
    totalRatings: 18,
  },
  {
    id: "p11",
    name: "Funakaye Flood Control",
    description: "Construction of drainage channels and flood barriers to protect communities along the Gongola River floodplain in Funakaye LGA.",
    budget: 1500000000,
    amountSpent: 450000000,
    contractor: "HydroWorks Engineering",
    location: "Funakaye",
    lga: "Funakaye",
    state: "Gombe",
    lat: 10.5667,
    lng: 11.5167,
    status: "ongoing",
    startDate: "2024-05-01",
    expectedEndDate: "2026-01-31",
    category: "Water & Sanitation",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600",
    politicianId: "pol3",
    averageRating: 3.0,
    totalRatings: 22,
  },
  {
    id: "p12",
    name: "Shongom Youth Skills Center",
    description: "Establishment of a vocational training center offering ICT, tailoring, welding, and agricultural skills to youth in Shongom LGA.",
    budget: 280000000,
    amountSpent: 270000000,
    contractor: "SkillsBuild Ltd",
    location: "Shongom",
    lga: "Shongom",
    state: "Gombe",
    lat: 9.7833,
    lng: 11.4000,
    status: "completed",
    startDate: "2023-03-01",
    expectedEndDate: "2024-09-30",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600",
    politicianId: "pol4",
    averageRating: 4.3,
    totalRatings: 87,
  },
];

export const politicians: Politician[] = [
  {
    id: "pol1",
    name: "Alhaji Ibrahim Dankwambo",
    position: "State Governor",
    lga: "Gombe",
    state: "Gombe",
    imageUrl: "",
    performanceScore: 72,
    projectCount: 3,
  },
  {
    id: "pol2",
    name: "Hon. Aishatu Jibril Dukku",
    position: "Commissioner for Health",
    lga: "Billiri",
    state: "Gombe",
    imageUrl: "",
    performanceScore: 81,
    projectCount: 3,
  },
  {
    id: "pol3",
    name: "Engr. Mohammed Bello Alkali",
    position: "Commissioner for Works",
    lga: "Kaltungo",
    state: "Gombe",
    imageUrl: "",
    performanceScore: 38,
    projectCount: 3,
  },
  {
    id: "pol4",
    name: "Dr. Fatima Usman Nafada",
    position: "Commissioner for Energy",
    lga: "Nafada",
    state: "Gombe",
    imageUrl: "",
    performanceScore: 65,
    projectCount: 3,
  },
];

export const citizenReports: CitizenReport[] = [
  {
    id: "r1",
    projectId: "p3",
    projectName: "Kaltungo Water Supply Project",
    description: "No workers have been on site for over 6 months. Equipment is rusting and pipes are exposed. The community still lacks clean water.",
    imageUrl: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=600",
    reporterName: "Musa A.",
    reporterLga: "Kaltungo",
    createdAt: "2025-02-15",
    status: "verified",
  },
  {
    id: "r2",
    projectId: "p9",
    projectName: "Balanga Irrigation Project",
    description: "The contractor abandoned this project after digging only 2 of the planned 12 channels. Farmland is still flooded during rainy season.",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600",
    reporterName: "Abubakar S.",
    reporterLga: "Balanga",
    createdAt: "2025-01-28",
    status: "verified",
  },
  {
    id: "r3",
    projectId: "p7",
    projectName: "Akko Rural Roads Network",
    description: "Road construction stopped near Kumo junction. Only 8km out of 45km completed. Materials dumped by roadside.",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600",
    reporterName: "Hauwa M.",
    reporterLga: "Akko",
    createdAt: "2025-03-05",
    status: "pending",
  },
  {
    id: "r4",
    projectId: "p1",
    projectName: "Gombe–Biu Road Rehabilitation",
    description: "The section near Kumo is already showing cracks despite being recently paved. Quality of materials appears substandard.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    reporterName: "Yakubu D.",
    reporterLga: "Gombe",
    createdAt: "2025-03-12",
    status: "pending",
  },
];

export const budgetAllocations: BudgetAllocation[] = [
  { id: "b1", level: "federal", name: "Federal Allocation", allocated: 15000000000, disbursed: 12000000000, year: 2025 },
  { id: "b2", level: "state", name: "Roads & Infrastructure", allocated: 5200000000, disbursed: 3800000000, year: 2025 },
  { id: "b3", level: "state", name: "Healthcare", allocated: 2800000000, disbursed: 2100000000, year: 2025 },
  { id: "b4", level: "state", name: "Education", allocated: 3100000000, disbursed: 2600000000, year: 2025 },
  { id: "b5", level: "state", name: "Agriculture", allocated: 1800000000, disbursed: 900000000, year: 2025 },
  { id: "b6", level: "state", name: "Water & Sanitation", allocated: 1200000000, disbursed: 650000000, year: 2025 },
  { id: "b7", level: "state", name: "Energy", allocated: 900000000, disbursed: 500000000, year: 2025 },
  { id: "b8", level: "lga", name: "Gombe LGA", allocated: 2200000000, disbursed: 1800000000, year: 2025 },
  { id: "b9", level: "lga", name: "Billiri LGA", allocated: 1100000000, disbursed: 900000000, year: 2025 },
  { id: "b10", level: "lga", name: "Kaltungo LGA", allocated: 800000000, disbursed: 400000000, year: 2025 },
  { id: "b11", level: "lga", name: "Akko LGA", allocated: 1500000000, disbursed: 1000000000, year: 2025 },
  { id: "b12", level: "lga", name: "Dukku LGA", allocated: 750000000, disbursed: 600000000, year: 2025 },
];

export function formatNaira(amount: number): string {
  if (amount >= 1000000000) {
    return `₦${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(0)}M`;
  }
  return `₦${amount.toLocaleString()}`;
}

export function getStatusColor(status: ProjectStatus): string {
  switch (status) {
    case "completed": return "bg-primary text-primary-foreground";
    case "ongoing": return "bg-warning text-warning-foreground";
    case "abandoned": return "bg-destructive text-destructive-foreground";
    case "not_started": return "bg-muted text-muted-foreground";
  }
}

export function getStatusLabel(status: ProjectStatus): string {
  switch (status) {
    case "completed": return "Completed";
    case "ongoing": return "Ongoing";
    case "abandoned": return "Abandoned";
    case "not_started": return "Not Started";
  }
}

export const projectStats = {
  total: projects.length,
  completed: projects.filter(p => p.status === "completed").length,
  ongoing: projects.filter(p => p.status === "ongoing").length,
  abandoned: projects.filter(p => p.status === "abandoned").length,
  notStarted: projects.filter(p => p.status === "not_started").length,
  totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
  totalSpent: projects.reduce((sum, p) => sum + p.amountSpent, 0),
};
