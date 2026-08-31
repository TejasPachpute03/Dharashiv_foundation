export type MembershipType = "Business / Member" | "Core Member / Admin" | "Student" | "General Member";
export type Role = "business" | "student" | "professional" | "government" | "freelancer" | "other" | "admin";
export type MemberStatus = "Active" | "Pending" | "Rejected" | "Inactive";
export type ConnectionStatus = "Not Connected" | "Request Sent" | "Request Received" | "Connected";

export interface User {
  id: string;
  name?: string;
  email: string;
  role: Role;
  membershipType?: MembershipType; // Legacy
}

export interface Entrepreneur {
  id: string;
  name: string;
  email: string;
  role?: Role; // The new canonical role
  membershipType: MembershipType; // Legacy
  
  // Personal Details
  gaon?: string;
  taluka?: string;
  district?: string;
  currentCity?: string;
  dob?: string;
  gender?: string;
  whatsappMobile?: string;
  callingMobile?: string;
  
  // Business Specific
  businessCategory?: string;
  businessType?: string;

  // Existing Fields
  designation: string;
  profileImage: string;
  companyName: string;
  companyLogo?: string;
  category: string; // Legacy
  industry: string;
  location: string;
  address?: {
    village?: string;
    taluka: string;
    district: string;
    currentCity: string;
  };
  yearsInBusiness: string;
  turnoverRange?: "0-40L" | "40L-1CR" | "1CR-5CR" | "5CRPLUS";
  description: string;
  services: string[];
  targetCustomers: string[];
  industriesServed: string[];
  lookingFor: string[];
  businessNeeds: string;
  website?: string;
  phone: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  verified: boolean;
  memberSince: string;
  status: MemberStatus;
}

export interface Connection {
  id: string;
  requesterId: string;
  recipientId: string;
  status: "Pending" | "Connected";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: "connection_request" | "connection_accepted" | "new_member" | "announcement" | "event" | "profile_view" | "registration_approved" | "registration_rejected" | "foundation_update";
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  category: "Important" | "Event" | "Community" | "Business" | "Foundation Update";
  author: string;
  status: "Published" | "Draft" | "Pending" | "Rejected";
  createdAt: string;
  publishDate: string;
  coverImage?: string;
  attachments?: { name: string; url: string; type: 'image' | 'pdf' }[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  category: string;
  status: "Upcoming" | "Past" | "Draft";
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  enabled: boolean;
}

export interface Activity {
  id: string;
  message: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: string;
  requirements: string[];
  salary?: string;
  authorId: string;
  createdAt: string;
  status: "Open" | "Closed";
}
