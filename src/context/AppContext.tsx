"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Entrepreneur, Category, Announcement, Event, Notification, Activity, Connection, ChatMessage, Job } from "@/types";
import { mockEntrepreneurs, mockCategories, mockAnnouncements, mockEvents, mockActivities, mockConnections, mockJobs } from "@/data/mockData";

export interface SystemSettings {
  autoApprove: boolean;
  requireEmailVerification: boolean;
  allowPublicProfiles: boolean;
  maintenanceMode: boolean;
  notifyOnNewMember: boolean;
  notifyOnReport: boolean;
}

interface AppContextType {
  currentUser: User | null;
  login: (email: string, password?: string) => { success: boolean; error?: string; role?: string };
  register: (data: Partial<Entrepreneur>) => { success: boolean; error?: string };
  logout: () => void;
  
  entrepreneurs: Entrepreneur[];
  categories: Category[];
  announcements: Announcement[];
  events: Event[];
  jobs: Job[];
  activities: Activity[];
  connections: Connection[];
  notifications: Notification[];
  settings: SystemSettings;
  
  activeChatUserId: string | null;
  chatMessages: ChatMessage[];
  openChat: (userId: string) => void;
  closeChat: () => void;
  sendMessage: (recipientId: string, text: string) => void;
  
  updateProfile: (id: string, updates: Partial<Entrepreneur>) => void;
  updateEntrepreneurStatus: (id: string, status: "Active" | "Pending" | "Rejected" | "Inactive") => void;
  addEntrepreneur: (data: Partial<Entrepreneur>) => void;
  updateEntrepreneur: (id: string, data: Partial<Entrepreneur>) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  sendConnectionRequest: (recipientId: string) => void;
  acceptConnectionRequest: (connectionId: string) => void;
  rejectConnectionRequest: (connectionId: string) => void;
  cancelConnectionRequest: (connectionId: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, "id" | "createdAt">) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  addEvent: (event: Omit<Event, "id" | "createdAt">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [settings, setSettings] = useState<SystemSettings>({
    autoApprove: false,
    requireEmailVerification: true,
    allowPublicProfiles: true,
    maintenanceMode: false,
    notifyOnNewMember: true,
    notifyOnReport: true,
  });

  const [isClient, setIsClient] = useState(false);

  // Increment this version when you want to force clients to reload mock data
  const MOCK_DATA_VERSION = 5;

  // Initialize from LocalStorage or use mock data
  useEffect(() => {
    setIsClient(true);
    
    const storedUser = localStorage.getItem("df_user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));

    const storedVersion = localStorage.getItem("df_mock_version");
    if (storedVersion !== "4") {
      // No longer wiping entrepreneurs to preserve user data
      localStorage.setItem("df_mock_version", "4");
    }

    const storedEntrepreneurs = localStorage.getItem("df_entrepreneurs");
    if (storedEntrepreneurs) {
      const parsed = JSON.parse(storedEntrepreneurs);
      
      // Migration step: ensure all users have the new canonical role
      const migrated = parsed.map((e: Entrepreneur) => {
        if (!e.role) {
          if (e.membershipType === "Business / Member") e.role = "business";
          else if (e.membershipType === "Student") e.role = "student";
          else if (e.membershipType === "General Member") e.role = "other";
          else if (e.membershipType === "Core Member / Admin") e.role = "admin";
          else e.role = "other";
        }
        return e;
      });
      
      // Merge mock and stored data to ensure we have all base profiles (like Pradip and Nilesh)
      // while preserving any user-created accounts or profile edits.
      const mockMapped = mockEntrepreneurs.map(e => ({
        ...e,
        role: e.role || (e.membershipType === "Business / Member" ? "business" : e.membershipType === "Student" ? "student" : e.membershipType === "General Member" ? "other" : e.membershipType === "Core Member / Admin" ? "admin" : "other")
      }));
      
      const merged = [...mockMapped];
      
      migrated.forEach((user: Entrepreneur) => {
        // Ensure user has a role to satisfy TS
        const userWithRole = {
          ...user,
          role: user.role || (user.membershipType === "Business / Member" ? "business" : user.membershipType === "Student" ? "student" : user.membershipType === "General Member" ? "other" : user.membershipType === "Core Member / Admin" ? "admin" : "other")
        };
        const index = merged.findIndex(m => m.id === user.id);
        if (index !== -1) {
          merged[index] = userWithRole; // Override mock with stored changes
        } else {
          merged.push(userWithRole); // Add new user-created ones
        }
      });
      
      setEntrepreneurs(merged);
    }
    else {
      setEntrepreneurs(mockEntrepreneurs.map(e => ({
        ...e,
        role: e.role || (e.membershipType === "Business / Member" ? "business" : e.membershipType === "Student" ? "student" : e.membershipType === "General Member" ? "other" : e.membershipType === "Core Member / Admin" ? "admin" : "other")
      })));
    }

    const storedCategories = localStorage.getItem("df_categories");
    if (storedCategories) {
      const parsed = JSON.parse(storedCategories);
      if (parsed.length < mockCategories.length) setCategories(mockCategories);
      else setCategories(parsed);
    }
    else setCategories(mockCategories);

    const storedAnnouncements = localStorage.getItem("df_announcements");
    if (storedAnnouncements) {
      const parsed = JSON.parse(storedAnnouncements);
      if (parsed.length < mockAnnouncements.length) setAnnouncements(mockAnnouncements);
      else setAnnouncements(parsed);
    }
    else setAnnouncements(mockAnnouncements);

    const storedEvents = localStorage.getItem("df_events");
    if (storedEvents) {
      const parsed = JSON.parse(storedEvents);
      if (parsed.length < mockEvents.length) setEvents(mockEvents);
      else setEvents(parsed);
    }
    else setEvents(mockEvents);

    const storedJobs = localStorage.getItem("df_jobs");
    if (storedJobs) {
      const parsed = JSON.parse(storedJobs);
      if (parsed.length < mockJobs.length) setJobs(mockJobs);
      else setJobs(parsed);
    }
    else setJobs(mockJobs);

    const storedActivities = localStorage.getItem("df_activities");
    if (storedActivities) setActivities(JSON.parse(storedActivities));
    else setActivities(mockActivities);

    const storedConnections = localStorage.getItem("df_connections");
    if (storedConnections) {
      const parsed = JSON.parse(storedConnections);
      if (parsed.length < mockConnections.length) setConnections(mockConnections);
      else setConnections(parsed);
    }
    else setConnections(mockConnections);

    // Force load if empty due to hot reload preserving empty state
    if (connections.length < mockConnections.length) {
      setConnections(mockConnections);
    }

    const storedNotifications = localStorage.getItem("df_notifications");
    if (storedNotifications) {
      const parsed = JSON.parse(storedNotifications);
      if (parsed.length <= 1) {
        setNotifications([
          { id: "n1", userId: "e1", type: "foundation_update", message: "Important Foundation Update: Annual General Meeting scheduled for next month", read: false, createdAt: new Date().toISOString() },
          { id: "n2", userId: "e1", type: "connection_request", message: "Rahul Desai sent you a connection request", read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
          { id: "n3", userId: "e1", type: "event", message: "Event Notification: Entrepreneur Networking Meet is tomorrow", read: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
          { id: "n4", userId: "e1", type: "announcement", message: "Announcement: New mentorship program launched", read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
          { id: "n5", userId: "e1", type: "foundation_update", message: "Important Foundation Update: Revised community guidelines", read: true, createdAt: new Date(Date.now() - 172800000).toISOString() }
        ]);
      } else {
        setNotifications(parsed);
      }
    } else {
      // Mock some notifications for the demo
      setNotifications([
        {
          id: "n1",
          userId: "e1",
          type: "foundation_update",
          message: "Important Foundation Update: Annual General Meeting scheduled for next month",
          read: false,
          createdAt: new Date().toISOString()
        },
        {
          id: "n2",
          userId: "e1",
          type: "connection_request",
          message: "Rahul Desai sent you a connection request",
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: "n3",
          userId: "e1",
          type: "event",
          message: "Event Notification: Entrepreneur Networking Meet is tomorrow",
          read: false,
          createdAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: "n4",
          userId: "e1",
          type: "announcement",
          message: "Announcement: New mentorship program launched",
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: "n5",
          userId: "e1",
          type: "foundation_update",
          message: "Important Foundation Update: Revised community guidelines",
          read: true,
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ]);
    }

    const storedChatMessages = localStorage.getItem("df_chat_messages");
    if (storedChatMessages) {
      setChatMessages(JSON.parse(storedChatMessages));
    } else {
      setChatMessages([
        {
          id: "msg_1",
          senderId: "e2",
          recipientId: "e1",
          text: "Hi! I saw your profile and would love to connect to discuss potential collaborations in the tech space.",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          read: true
        },
        {
          id: "msg_2",
          senderId: "e1",
          recipientId: "e2",
          text: "Hello Aditi! Thanks for reaching out. Yes, I'd love to discuss that.",
          createdAt: new Date(Date.now() - 82800000).toISOString(),
          read: true
        }
      ]);
    }
    
    const storedSettings = localStorage.getItem("df_settings");
    if (storedSettings) setSettings(JSON.parse(storedSettings));
  }, []);

  // Force load if empty due to hot reload preserving empty state
  useEffect(() => {
    if (isClient && connections.length < mockConnections.length) {
      setConnections(mockConnections);
    }
  }, [isClient, connections.length]);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (!isClient) return;
    if (currentUser) localStorage.setItem("df_user", JSON.stringify(currentUser));
    else localStorage.removeItem("df_user");
    
    localStorage.setItem("df_entrepreneurs", JSON.stringify(entrepreneurs));
    localStorage.setItem("df_categories", JSON.stringify(categories));
    localStorage.setItem("df_announcements", JSON.stringify(announcements));
    localStorage.setItem("df_events", JSON.stringify(events));
    localStorage.setItem("df_jobs", JSON.stringify(jobs));
    localStorage.setItem("df_activities", JSON.stringify(activities));
    localStorage.setItem("df_connections", JSON.stringify(connections));
    localStorage.setItem("df_notifications", JSON.stringify(notifications));
    localStorage.setItem("df_chat_messages", JSON.stringify(chatMessages));
    localStorage.setItem("df_settings", JSON.stringify(settings));
  }, [currentUser, entrepreneurs, categories, announcements, events, jobs, activities, connections, notifications, chatMessages, settings, isClient]);

  const login = (email: string, password?: string) => {
    const searchTerm = email.trim().toLowerCase();
    
    // Check for typos in Nilesh's email
    const isNileshTypo = searchTerm === "nilesh@intechangg.com" || searchTerm.includes("nilesh");
    const isAdminDemo = searchTerm === "admin@demo.com";
    
    const foundUser = entrepreneurs.find(e => 
      e.email.toLowerCase() === searchTerm || 
      (isNileshTypo && e.id === "e21")
    );
    
    if (foundUser) {
      const user = { id: foundUser.id, email: foundUser.email, role: foundUser.role || "other" };
      setCurrentUser(user);
      return { success: true, role: user.role };
    }
    
    // Fallback for hardcoded demo accounts if not found in array
    if (isAdminDemo) {
      setCurrentUser({ id: "e21", email: "admin@demo.com", role: "admin" });
      return { success: true, role: "admin" };
    }
    
    if (searchTerm === "student@demo.com") {
      setCurrentUser({ id: "s1", email: "student@demo.com", role: "student" });
      return { success: true, role: "student" };
    }

    if (searchTerm === "member@demo.com") {
      setCurrentUser({ id: "m1", email: "member@demo.com", role: "other" });
      return { success: true, role: "other" };
    }

    if (searchTerm === "business@demo.com") {
      setCurrentUser({ id: "m-pradip", email: "pradip.jadhav@example.com", role: "business" });
      return { success: true, role: "business" };
    }
    
    return { success: false, error: "No account found with this email." };
  };

  const register = (data: Partial<Entrepreneur>) => {
    if (!data.email || !data.role) return { success: false, error: "Missing required fields." };
    
    // Check if email already exists
    const emailExists = entrepreneurs.some(e => e.email.toLowerCase() === data.email?.toLowerCase());
    if (emailExists) {
      return { success: false, error: "This email is already registered. Please log in instead." };
    }
    
    const newId = `e${Date.now()}`;
    
    // Map new roles to legacy MembershipType for backwards compatibility
    let legacyMembership: "Business / Member" | "Core Member / Admin" | "Student" | "General Member" = "General Member";
    if (data.role === "business" || data.role === "freelancer") legacyMembership = "Business / Member";
    if (data.role === "student") legacyMembership = "Student";
    if (data.role === "admin") legacyMembership = "Core Member / Admin";
    
    addEntrepreneur({
      ...data,
      id: newId,
      membershipType: legacyMembership
    });
    
    setCurrentUser({ id: newId, email: data.email, role: data.role as import("@/types").Role });
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (id: string, updates: Partial<Entrepreneur>) => {
    setEntrepreneurs(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
  };

  const updateEntrepreneurStatus = (id: string, status: "Active" | "Pending" | "Rejected" | "Inactive") => {
    setEntrepreneurs(prev => prev.map(e => (e.id === id ? { ...e, status } : e)));
    
    // Add activity
    const entrepreneur = entrepreneurs.find(e => e.id === id);
    if (entrepreneur) {
      setActivities(prev => [{
        id: `act_${Date.now()}`,
        message: `${entrepreneur.name} was ${status.toLowerCase()}`,
        createdAt: new Date().toISOString()
      }, ...prev]);
    }
  };

  const addEntrepreneur = (data: Partial<Entrepreneur>) => {
    const newEntrepreneur: Entrepreneur = {
      id: `e${Date.now()}`,
      name: data.name || "",
      designation: data.designation || "",
      companyName: data.companyName || "",
      category: data.category || "Other",
      industry: data.industry || "Other",
      location: data.location || "",
      yearsInBusiness: data.yearsInBusiness || "New",
      description: data.description || "",
      services: data.services || [],
      targetCustomers: data.targetCustomers || [],
      industriesServed: data.industriesServed || [],
      lookingFor: data.lookingFor || [],
      businessNeeds: data.businessNeeds || "",
      email: data.email || "",
      phone: data.phone || "",
      verified: false,
      membershipType: data.membershipType || "Entrepreneur / Member",
      memberSince: new Date().getFullYear().toString(),
      status: data.status || "Active",
      profileImage: data.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || "User")}&background=random`,
      ...data
    } as Entrepreneur;
    
    setEntrepreneurs(prev => [newEntrepreneur, ...prev]);
  };

  const updateEntrepreneur = (id: string, data: Partial<Entrepreneur>) => {
    setEntrepreneurs(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  };
  
  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory: Category = {
      ...category,
      id: `c${Date.now()}`
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...category } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const sendConnectionRequest = (recipientId: string) => {
    if (!currentUser) return;
    const newConnection: Connection = {
      id: `conn_${Date.now()}`,
      requesterId: currentUser.id,
      recipientId,
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    setConnections(prev => [...prev, newConnection]);
  };

  const acceptConnectionRequest = (connectionId: string) => {
    setConnections(prev => prev.map(c => c.id === connectionId ? { ...c, status: "Connected" } : c));
  };

  const rejectConnectionRequest = (connectionId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connectionId));
  };

  const cancelConnectionRequest = (connectionId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connectionId));
  };

  const addAnnouncement = (announcement: Omit<Announcement, "id" | "createdAt">) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: `ann_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    setActivities(prev => [{
      id: `act_${Date.now()}`,
      message: "New announcement published",
      createdAt: new Date().toISOString()
    }, ...prev]);
  };

  const updateAnnouncement = (id: string, announcement: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...announcement } : a));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const openChat = (userId: string) => {
    setActiveChatUserId(userId);
  };

  const closeChat = () => {
    setActiveChatUserId(null);
  };

  const sendMessage = (recipientId: string, text: string) => {
    if (!currentUser) return;
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      recipientId,
      text,
      createdAt: new Date().toISOString(),
      read: true
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const addEvent = (event: Omit<Event, "id" | "createdAt">) => {
    const newEvent: Event = {
      ...event,
      id: `ev_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, event: Partial<Event>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...event } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  if (!isClient) {
    return null; // Return null on server to avoid hydration mismatch
  }

  return (
    <AppContext.Provider value={{
      currentUser, login, register, logout,
      entrepreneurs, categories, announcements, events, jobs, activities, connections, notifications,
      activeChatUserId, chatMessages, openChat, closeChat, sendMessage,
      updateProfile, updateEntrepreneurStatus,
      addEntrepreneur,
      updateEntrepreneur,
      addCategory, updateCategory, deleteCategory,
      addEvent, updateEvent, deleteEvent,
      sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest, cancelConnectionRequest, addAnnouncement, updateAnnouncement, deleteAnnouncement, markNotificationRead, markAllNotificationsRead,
      settings, updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
