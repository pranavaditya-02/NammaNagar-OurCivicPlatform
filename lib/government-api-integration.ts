// Government API Integration Service for Real-time Project Data
export interface TenderData {
  tenderId: string;
  title: string;
  description: string;
  department: string;
  category: string;
  estimatedCost: string;
  publishDate: string;
  bidSubmissionDate: string;
  technicalBidDate: string;
  financialBidDate: string;
  workCompletionDate: string;
  location: {
    state: string;
    district: string;
    area: string;
    pincode: string;
    coordinates?: { lat: number; lng: number };
  };
  status:
    | "Published"
    | "Bid Submission"
    | "Technical Evaluation"
    | "Financial Evaluation"
    | "Awarded"
    | "Work in Progress"
    | "Completed"
    | "Cancelled";
  contractor?: {
    name: string;
    registrationNumber: string;
    contactInfo: string;
  };
  documents: {
    type: string;
    url: string;
    uploadDate: string;
  }[];
  milestones: {
    description: string;
    targetDate: string;
    completionDate?: string;
    status: "Pending" | "In Progress" | "Completed" | "Delayed";
    amount: string;
  }[];
}

export interface EProcurementData {
  procurementId: string;
  organizationName: string;
  tenderNumber: string;
  workDescription: string;
  estimatedValue: string;
  earnestMoney: string;
  tenderFee: string;
  lastDateOfSubmission: string;
  dateOfOpening: string;
  completionPeriod: string;
  eligibilityCriteria: string[];
  technicalSpecifications: string;
  paymentTerms: string;
  penaltyClause: string;
}

export interface ProjectProgress {
  projectId: string;
  physicalProgress: number;
  financialProgress: number;
  timeProgress: number;
  qualityRating: number;
  lastUpdated: string;
  issues: {
    type: string;
    description: string;
    severity: "Low" | "Medium" | "High" | "Critical";
    reportedDate: string;
    status: "Open" | "In Progress" | "Resolved";
  }[];
  photos: {
    url: string;
    caption: string;
    uploadDate: string;
    geoLocation: { lat: number; lng: number };
  }[];
}

// Mock API responses - In production, these would connect to actual government APIs
const mockTenderData: TenderData[] = [
  {
    tenderId: "KAR/PWD/2024/001",
    title: "Construction of 4-lane Road from Koramangala to HSR Layout",
    description:
      "Widening and strengthening of existing 2-lane road to 4-lane with proper drainage, footpaths, and street lighting",
    department: "Public Works Department, Karnataka",
    category: "Road Infrastructure",
    estimatedCost: "₹15.2 Crores",
    publishDate: "2023-12-15",
    bidSubmissionDate: "2024-01-15",
    technicalBidDate: "2024-01-20",
    financialBidDate: "2024-01-25",
    workCompletionDate: "2024-12-31",
    location: {
      state: "Karnataka",
      district: "Bengaluru Urban",
      area: "Koramangala to HSR Layout",
      pincode: "560034",
      coordinates: { lat: 12.9352, lng: 77.6245 },
    },
    status: "Work in Progress",
    contractor: {
      name: "ABC Infrastructure Ltd.",
      registrationNumber: "KAR/PWD/REG/2019/456",
      contactInfo: "contact@abcinfra.com",
    },
    documents: [
      {
        type: "Tender Document",
        url: "/documents/tender_001.pdf",
        uploadDate: "2023-12-15",
      },
      {
        type: "Technical Specifications",
        url: "/documents/tech_spec_001.pdf",
        uploadDate: "2023-12-15",
      },
      {
        type: "Work Order",
        url: "/documents/work_order_001.pdf",
        uploadDate: "2024-02-01",
      },
    ],
    milestones: [
      {
        description: "Site Survey and Soil Testing",
        targetDate: "2024-02-15",
        completionDate: "2024-02-10",
        status: "Completed",
        amount: "₹50 Lakhs",
      },
      {
        description: "Utility Shifting and Traffic Diversion",
        targetDate: "2024-03-15",
        completionDate: "2024-03-20",
        status: "Completed",
        amount: "₹1.2 Crores",
      },
      {
        description: "Road Construction Phase 1 (0-2 km)",
        targetDate: "2024-06-30",
        status: "In Progress",
        amount: "₹6 Crores",
      },
      {
        description: "Road Construction Phase 2 (2-4 km)",
        targetDate: "2024-09-30",
        status: "Pending",
        amount: "₹6 Crores",
      },
      {
        description: "Street Lighting and Signage",
        targetDate: "2024-11-30",
        status: "Pending",
        amount: "₹2 Crores",
      },
    ],
  },
  {
    tenderId: "KAR/BWSSB/2024/002",
    title: "Underground Drainage System for HSR Layout Sector 2",
    description:
      "Construction of comprehensive underground drainage system to prevent waterlogging during monsoons",
    department: "Bangalore Water Supply and Sewerage Board",
    category: "Water Infrastructure",
    estimatedCost: "₹8.5 Crores",
    publishDate: "2024-01-10",
    bidSubmissionDate: "2024-02-10",
    technicalBidDate: "2024-02-15",
    financialBidDate: "2024-02-20",
    workCompletionDate: "2024-10-31",
    location: {
      state: "Karnataka",
      district: "Bengaluru Urban",
      area: "HSR Layout Sector 2",
      pincode: "560102",
      coordinates: { lat: 12.9116, lng: 77.6473 },
    },
    status: "Work in Progress",
    contractor: {
      name: "XYZ Constructions Pvt Ltd",
      registrationNumber: "KAR/BWSSB/REG/2020/789",
      contactInfo: "projects@xyzconstructions.in",
    },
    documents: [
      {
        type: "Tender Document",
        url: "/documents/tender_002.pdf",
        uploadDate: "2024-01-10",
      },
      {
        type: "Environmental Clearance",
        url: "/documents/env_clear_002.pdf",
        uploadDate: "2024-01-15",
      },
    ],
    milestones: [
      {
        description: "Excavation and Pipe Laying - Phase 1",
        targetDate: "2024-05-31",
        status: "In Progress",
        amount: "₹3.5 Crores",
      },
      {
        description: "Manholes and Inspection Chambers",
        targetDate: "2024-07-31",
        status: "Pending",
        amount: "₹2 Crores",
      },
      {
        description: "Road Restoration and Testing",
        targetDate: "2024-09-30",
        status: "Pending",
        amount: "₹3 Crores",
      },
    ],
  },
];

// API Integration Functions
export async function fetchTenderData(filters?: {
  state?: string;
  district?: string;
  category?: string;
  status?: string;
  dateRange?: { from: string; to: string };
}): Promise<TenderData[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  let filteredData = [...mockTenderData];

  if (filters) {
    if (filters.state) {
      filteredData = filteredData.filter((tender) =>
        tender.location.state
          .toLowerCase()
          .includes(filters.state!.toLowerCase())
      );
    }
    if (filters.district) {
      filteredData = filteredData.filter((tender) =>
        tender.location.district
          .toLowerCase()
          .includes(filters.district!.toLowerCase())
      );
    }
    if (filters.category) {
      filteredData = filteredData.filter((tender) =>
        tender.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }
    if (filters.status) {
      filteredData = filteredData.filter(
        (tender) => tender.status === filters.status
      );
    }
  }

  return filteredData;
}

export async function fetchProjectProgress(
  projectId: string
): Promise<ProjectProgress> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    projectId,
    physicalProgress: 65,
    financialProgress: 58,
    timeProgress: 72,
    qualityRating: 4.2,
    lastUpdated: "2024-01-15T10:30:00Z",
    issues: [
      {
        type: "Material Delay",
        description:
          "Cement delivery delayed by 3 days due to transportation strike",
        severity: "Medium",
        reportedDate: "2024-01-12",
        status: "In Progress",
      },
      {
        type: "Weather Impact",
        description: "Work suspended for 2 days due to heavy rainfall",
        severity: "Low",
        reportedDate: "2024-01-10",
        status: "Resolved",
      },
    ],
    photos: [
      {
        url: "/project-photos/road-construction-1.jpg",
        caption: "Road construction progress at 2km mark",
        uploadDate: "2024-01-15",
        geoLocation: { lat: 12.9352, lng: 77.6245 },
      },
      {
        url: "/project-photos/drainage-work-1.jpg",
        caption: "Drainage pipe installation",
        uploadDate: "2024-01-14",
        geoLocation: { lat: 12.9355, lng: 77.6248 },
      },
    ],
  };
}

export async function fetchEProcurementData(
  organizationId: string
): Promise<EProcurementData[]> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return [
    {
      procurementId: "EPRO/KAR/2024/001",
      organizationName: "Bruhat Bengaluru Mahanagara Palike",
      tenderNumber: "BBMP/EE/SWM/2024/01",
      workDescription:
        "Supply and Installation of LED Street Lights in Ward 68",
      estimatedValue: "₹2.5 Crores",
      earnestMoney: "₹5 Lakhs",
      tenderFee: "₹10,000",
      lastDateOfSubmission: "2024-02-15",
      dateOfOpening: "2024-02-16",
      completionPeriod: "6 months",
      eligibilityCriteria: [
        "Minimum 3 years experience in LED installation",
        "Annual turnover of ₹5 Crores in last 3 years",
        "Valid electrical contractor license",
      ],
      technicalSpecifications:
        "LED lights with minimum 100 lumens/watt efficiency, IP65 rating, 5-year warranty",
      paymentTerms:
        "30% advance, 60% on delivery, 10% after installation and testing",
      penaltyClause: "0.5% per week delay, maximum 10% of contract value",
    },
  ];
}

// Real-time data synchronization
export async function syncGovernmentData(): Promise<{
  tendersUpdated: number;
  projectsUpdated: number;
  newTenders: number;
  lastSyncTime: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    tendersUpdated: 15,
    projectsUpdated: 8,
    newTenders: 3,
    lastSyncTime: new Date().toISOString(),
  };
}

// GeM (Government e-Marketplace) Integration
export async function fetchGeMData(category: string): Promise<any[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      productId: "GEM/2024/B/123456",
      productName: "Road Construction Materials - Bitumen",
      category: "Construction Materials",
      price: "₹45,000 per MT",
      supplier: "Indian Oil Corporation Ltd",
      rating: 4.5,
      deliveryTime: "7-10 days",
      specifications: "VG-30 grade bitumen as per IS:73-2013",
    },
  ];
}

// PFMS (Public Financial Management System) Integration
export async function fetchPFMSData(schemeId: string): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    schemeId,
    schemeName: "Pradhan Mantri Gram Sadak Yojana",
    totalAllocation: "₹19,000 Crores",
    utilized: "₹14,500 Crores",
    pending: "₹4,500 Crores",
    beneficiaries: 125000,
    completedProjects: 8500,
    ongoingProjects: 2300,
  };
}
