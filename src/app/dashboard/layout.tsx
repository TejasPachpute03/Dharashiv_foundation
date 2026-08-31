"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { EntrepreneurSidebar } from "@/components/layout/EntrepreneurSidebar";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { GlobalChat } from "@/components/shared/GlobalChat";
import { useAppContext } from "@/context/AppContext";
import { Avatar } from "@/components/ui/Avatar";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, entrepreneurs } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser) {
      router.push("/login");
    } else if (currentUser.role === "Core Member / Admin" && pathname === "/dashboard") {
      // Only redirect to /admin if they try to access the root /dashboard page directly
      router.push("/admin");
    }
  }, [currentUser, router, pathname]);

  if (!mounted || !currentUser) {
    return null; // or a loading spinner
  }

  const isAdmin = currentUser.role === "Core Member / Admin";

  return (
    <div className="flex min-h-screen bg-muted/30">
      {isAdmin ? (
        <AdminSidebar />
      ) : (
        <EntrepreneurSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}
      
      <div className="md:pl-64 flex flex-col flex-1 dark bg-background text-foreground min-h-screen">
        {isAdmin ? (
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 justify-between">
            <h1 className="text-xl font-semibold leading-6 text-foreground">Admin Console</h1>
            <div className="flex items-center space-x-4">
              <Link href="/admin/profile" className="flex items-center gap-x-3 hover:opacity-80 transition-opacity">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-sm font-semibold leading-none text-foreground">
                    {entrepreneurs.find(e => e.id === currentUser?.id)?.name || "Admin User"}
                  </span>
                  <span className="text-xs text-success flex items-center mt-1">
                    <span className="w-1.5 h-1.5 bg-success rounded-full mr-1"></span>
                    Online
                  </span>
                </div>
                <Avatar size="sm" src={entrepreneurs.find(e => e.id === currentUser?.id)?.profileImage} fallback={entrepreneurs.find(e => e.id === currentUser?.id)?.name?.charAt(0) || "A"} />
              </Link>
            </div>
          </header>
        ) : (
          <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        )}
        
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
      {!isAdmin && <GlobalChat />}
    </div>
  );
}
