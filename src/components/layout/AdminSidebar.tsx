"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Network, LayoutDashboard, Users, UserCheck, 
  ListTree, Link as LinkIcon, Megaphone, Calendar, 
  BarChart, Settings, LogOut, Briefcase, Search, UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";
import { ProfileCompletionAvatar } from "@/components/ui/ProfileCompletionAvatar";

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, entrepreneurs, announcements, currentUser } = useAppContext();
  const router = useRouter();

  const pendingCount = announcements.filter(a => a.status === "Pending").length;

  const mainNav = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/admin/discover", label: "Discover", icon: <Search className="w-5 h-5" /> },
  ];
  
  const managementNav = [
    { href: "/admin/members", label: "Members", icon: <Users className="w-5 h-5" /> },
    { href: "/admin/pending", label: "Pending Approvals", icon: <UserCheck className="w-5 h-5" />, badge: pendingCount > 0 ? pendingCount : undefined },
    { href: "/admin/categories", label: "Categories", icon: <ListTree className="w-5 h-5" /> },
    { href: "/admin/network", label: "My Network", icon: <Network className="w-5 h-5" /> },
    { href: "/admin/events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
    { href: "/admin/jobs", label: "Jobs/Vacancies", icon: <Briefcase className="w-5 h-5" /> },
  ];

  const systemNav = [
    { href: "/admin/announcements", label: "Announcements", icon: <Megaphone className="w-5 h-5" /> },
    { href: "/admin/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const accountNav = [
    { href: "/admin/profile", label: "My Profile", icon: <UserCircle className="w-5 h-5" /> },
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
          "flex items-center justify-between px-3 py-2.5 mx-2 rounded-xl transition-all duration-200 text-sm font-medium group mb-1 border border-transparent",
          isActive 
            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
            : "text-foreground hover:bg-accent-light hover:text-accent hover:border-orange-200 hover:translate-x-1"
        )}
      >
        <div className="flex items-center space-x-3">
          <span className={cn("transition-colors", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent")}>
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
      <div className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 z-50 bg-muted border-r border-orange-100 text-foreground md:shadow-none shadow-lg">
        <Link href="/admin" className="p-6 flex flex-col items-center justify-center space-y-3 mb-2 hover:opacity-90 transition-opacity text-center relative z-10">
          <img src="/logo.png" alt="Dharashiv Foundation Logo" className="h-16 w-16 object-contain rounded-full shadow-lg border-2 border-white/20 bg-white" />
          <span className="font-bold text-lg tracking-tight text-white leading-tight">Dharashiv<br/>Foundation</span>
        </Link>

        <nav className="flex-1 overflow-y-auto no-scrollbar relative z-10 mt-2">
          <div className="mb-6">
            <p className="px-6 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Main</p>
            {mainNav.map((item) => <NavItem key={item.href} item={item} />)}
          </div>

          <div className="mb-6">
            <p className="px-6 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Management</p>
            {managementNav.map((item) => <NavItem key={item.href} item={item} />)}
          </div>

          <div className="mb-6">
            <p className="px-6 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">System</p>
            {systemNav.map((item) => <NavItem key={item.href} item={item} />)}
          </div>

          <div className="mb-6">
            <p className="px-6 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Account</p>
            {accountNav.map((item) => <NavItem key={item.href} item={item} />)}
          </div>
        </nav>

        <div className="p-4 border-t border-orange-200/50 mt-auto bg-muted hover:bg-muted-foreground/5 transition-colors">
          <div className="flex items-center justify-between">
            <Link href="/admin/profile" className="flex items-center space-x-3 cursor-pointer group flex-1 min-w-0">
              <ProfileCompletionAvatar profile={currentProfile} size={36} strokeWidth={2.5} className="group-hover:ring-2 ring-primary/50 transition-all rounded-full" />
              <div className="flex flex-col min-w-0 pr-2">
                <span className="text-sm font-semibold truncate group-hover:text-primary-foreground text-white transition-colors" title={currentProfile?.name || "Admin User"}>{currentProfile?.name || "Admin User"}</span>
                <span className="text-xs text-white/60 truncate transition-colors" title={currentUser?.email}>{currentUser?.email}</span>
              </div>
            </Link>
          <button 
            onClick={handleLogout}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
