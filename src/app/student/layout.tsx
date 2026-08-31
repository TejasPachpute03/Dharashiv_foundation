"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { GlobalChat } from "@/components/shared/GlobalChat";
import { useAppContext } from "@/context/AppContext";
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAppContext();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !currentUser) {
    return null;
  }

  return (
    <RoleGuard allowedRoles={["student"]}>
      <div className="flex min-h-screen bg-muted/30">
      <StudentSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
      <GlobalChat />
      </div>
    </RoleGuard>
  );
}
