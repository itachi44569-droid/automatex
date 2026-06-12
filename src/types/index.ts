import { Timestamp } from "firebase/firestore";

export type UserRole = "admin" | "client" | "team";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  company?: string;
  phone?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  country: string;
  status: "active" | "inactive" | "prospect";
  totalValue: number;
  projects: string[];
  notes?: string;
  avatar?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type ProjectStatus = "pending" | "in_progress" | "review" | "completed" | "cancelled";
export type ProjectPriority = "low" | "medium" | "high" | "critical";

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  budget: number;
  startDate: Timestamp;
  dueDate: Timestamp;
  completedAt?: Timestamp;
  teamMembers: string[];
  tags: string[];
  files: ProjectFile[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProjectFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Timestamp;
}

export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
export type LeadSource = "website" | "referral" | "linkedin" | "cold_email" | "event" | "other";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country: string;
  status: LeadStatus;
  source: LeadSource;
  value: number;
  notes: string;
  service: string;
  followUpDate?: Timestamp;
  assignedTo?: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface Ticket {
  id: string;
  clientId: string;
  clientName: string;
  projectId?: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  assignedTo?: string;
  messages: TicketMessage[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  resolvedAt?: Timestamp;
}

export interface TicketMessage {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  message: string;
  attachments?: string[];
  createdAt: Timestamp;
}

export interface Meeting {
  id: string;
  clientId?: string;
  clientName?: string;
  clientEmail: string;
  type: "discovery" | "consultation" | "review" | "kickoff";
  title: string;
  date: Timestamp;
  duration: number;
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  notes?: string;
  meetingUrl?: string;
  createdAt: Timestamp;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  testimonial?: string;
  clientName?: string;
  clientTitle?: string;
  coverImage: string;
  images: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  link?: string;
  createdAt: Timestamp;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  content: string;
  read: boolean;
  attachments?: string[];
  createdAt: Timestamp;
}

export interface DashboardStats {
  totalRevenue: number;
  activeProjects: number;
  totalClients: number;
  openTickets: number;
  revenueGrowth: number;
  projectGrowth: number;
  clientGrowth: number;
  ticketGrowth: number;
}
