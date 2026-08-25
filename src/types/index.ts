export type MembershipType = "Entrepreneur / Member" | "Core Member / Admin";
export type MemberStatus = "Active" | "Pending" | "Rejected" | "Inactive";
export type ConnectionStatus = "Not Connected" | "Request Sent" | "Request Received" | "Connected";

export interface User {
  id: string;
  email: string;
  role: MembershipType;
}

export interface Entrepreneur {
  id: string;
  name: string;
  designation: string;
  profileImage: string;
  companyName: string;
  companyLogo?: string;
  category: string;
  industry: string;
  location: string;
  yearsInBusiness: string;
  description: string;
  services: string[];
  targetCustomers: string[];
  industriesServed: string[];
  lookingFor: string[];
  businessNeeds: string;
  website?: string;
  email: string;
  phone: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  verified: boolean;
  membershipType: MembershipType;
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
  status: "Published" | "Draft";
  createdAt: string;
  publishDate: string;
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
