// Core entities for NammaNagar civic platform

export type UserRole = "citizen" | "official" | "representative" | "moderator";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;
  ward?: string;
  trustScore?: number;
  createdAt: Date;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  images: string[]; // URLs
  status: "open" | "assigned" | "resolved" | "closed" | "duplicate";
  createdBy: string; // userId
  assignedTo?: string; // officialId
  upvotes: string[]; // userIds
  comments: string[]; // commentIds
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  issueId: string;
  userId: string;
  text: string;
  sentiment?: "positive" | "neutral" | "negative";
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  ward: string;
  status: "planned" | "in_progress" | "completed";
  startDate: Date;
  endDate?: Date;
  progress: number; // 0-100
  issues: string[]; // issueIds
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface ModerationAction {
  id: string;
  userId: string;
  action: "block" | "warn" | "report_spam" | "resolve_duplicate";
  targetId: string; // userId or issueId
  reason: string;
  createdAt: Date;
}
