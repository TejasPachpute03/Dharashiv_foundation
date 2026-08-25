"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Network, LayoutDashboard, Users, UserCheck, 
  ListTree, Link as LinkIcon, Megaphone, Calendar, 
  BarChart, Settings, LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, entrepreneurs, currentUser } = useAppContext();
  const router = useRouter();

  const pendingCount = entrepreneurs.filter(e => e.status === "Pending").length;

  const mainNav = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  ];
  
  const managementNav = [
    { href: "/admin/members", label: "Members", icon: <Users className="w-5 h-5" /> },
    { href: "/admin/pending", label: "Pending Approvals", icon: <UserCheck className="w-5 h-5" />, badge: pendingCount > 0 ? pendingCount : undefined },
    { href: "/admin/categories", label: "Categories", icon: <ListTree className="w-5 h-5" /> },
    { href: "/admin/network", label: "My Network", icon: <Network className="w-5 h-5" /> },
    { href: "/admin/events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
  ];

  const systemNav = [
    { href: "/admin/announcements", label: "Announcements", icon: <Megaphone className="w-5 h-5" /> },
    { href: "/admin/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center justify-between px-3 py-2.5 mx-2 rounded-lg transition-colors text-sm font-medium group mb-1",
          isActive 
            ? "bg-primary text-primary-foreground shadow-sm" 
            : "text-black hover:bg-black/5"
        )}
      >
        <div className="flex items-center space-x-3">
          <span className={cn(isActive ? "text-primary-foreground" : "text-black/70 group-hover:text-black")}>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </div>
        {item.badge !== undefined && (
          <span className={cn(
            "text-[10px] px-2 py-0.5 rounded-full font-bold",
            isActive ? "bg-primary-foreground text-primary" : "bg-accent text-accent-foreground"
          )}>
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

    const currentProfile = entrepreneurs.find(e => e.id === currentUser?.id);

    return (
      <div className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 z-50 bg-white/40 backdrop-blur-2xl border-r border-white/40 text-black shadow-lg">
        <Link href="/admin" className="p-6 flex items-center space-x-3 mb-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Dharashiv Foundation Logo" className="h-10 w-10 object-contain rounded-full" />
          <span className="font-bold text-lg tracking-tight">Dharashiv Foundation</span>
        </Link>

        <nav className="flex-1 overflow-y-auto">
          <div className="mb-6">
            <p className="px-6 text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2">Main</p>
            {mainNav.map((item) => <NavItem key={item.href} item={item} />)}
          </div>

          <div className="mb-6">
            <p className="px-6 text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2">Management</p>
            {managementNav.map((item) => <NavItem key={item.href} item={item} />)}
          </div>

          <div className="mb-6">
            <p className="px-6 text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2">System</p>
            {systemNav.map((item) => <NavItem key={item.href} item={item} />)}
          </div>
        </nav>

        <div className="p-4 border-t border-black/10 hover:bg-black/5 transition-colors">
          <div className="flex items-center justify-between">
            <Link href="/admin/profile" className="flex items-center space-x-3 cursor-pointer group flex-1 min-w-0">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold shrink-0 overflow-hidden group-hover:ring-2 ring-primary transition-all">
                <img src={currentProfile?.profileImage || "https://i.pravatar.cc/150?u=admin"} alt="Admin" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0 pr-2">
                <span className="text-sm font-semibold truncate group-hover:text-primary text-black transition-colors" title={currentProfile?.name || "Admin User"}>{currentProfile?.name || "Admin User"}</span>
                <span className="text-xs text-black/60 truncate group-hover:text-black/80 transition-colors" title={currentUser?.email}>{currentUser?.email}</span>
              </div>
            </Link>
          <button 
            onClick={handleLogout}
            className="p-2 text-black/60 hover:text-black transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
