"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Network, LayoutDashboard, UserCircle, Search, 
  Users, Bookmark, Bell, Megaphone, Calendar, Settings, LogOut, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";
import { ProfileCompletionAvatar } from "@/components/ui/ProfileCompletionAvatar";

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export function EntrepreneurSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const { currentUser, entrepreneurs, logout } = useAppContext();
  const router = useRouter();

  const currentProfile = entrepreneurs.find(e => e.id === currentUser?.id);

  const mainNav = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/directory", label: "Discover", icon: <Search className="w-5 h-5" /> },
  ];

  const networkNav = [
    { href: "/dashboard/network", label: "My Network", icon: <Users className="w-5 h-5" /> },
    { href: "/dashboard/events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
    { href: "/dashboard/jobs", label: "Jobs/Vacancies", icon: <Briefcase className="w-5 h-5" /> },
  ];

  const accountNav = [
    { href: "/dashboard/profile", label: "My Profile", icon: <UserCircle className="w-5 h-5" /> },
    { href: "/dashboard/announcements", label: "Announcements", icon: <Megaphone className="w-5 h-5" /> },
    { href: "/dashboard/notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
    const isExactDashboard = item.href === "/dashboard" && pathname === "/dashboard";
    const highlight = isExactDashboard || (item.href !== "/dashboard" && isActive);

    return (
      <Link
        href={item.href}
        onClick={() => setIsOpen?.(false)}
        className={cn(
          "flex items-center justify-between px-3 py-2.5 mx-3 rounded-md transition-all duration-200 text-sm font-medium group mb-1",
          highlight 
            ? "bg-primary text-white shadow-md shadow-primary/20" 
            : "text-white/80 hover:bg-white/10 hover:text-white"
        )}
      >
        <div className="flex items-center space-x-3">
          <span className={cn("transition-colors", highlight ? "text-white" : "text-white/70 group-hover:text-white")}>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen?.(false)}
        />
      )}
      
      <div className={cn(
        "h-screen w-64 flex-col fixed inset-y-0 z-50 bg-gradient-to-b from-[#5c1c04] to-[#b53a06] border-r border-[#8a2a06] text-white transition-transform duration-300 md:flex md:translate-x-0 shadow-2xl md:shadow-none",
        isOpen ? "translate-x-0 flex" : "-translate-x-full hidden"
      )}>
        <Link href="/dashboard" className="p-6 flex flex-col items-center justify-center space-y-3 mb-2 hover:opacity-90 transition-opacity text-center relative z-10">
          <img src="/logo.png" alt="Dharashiv Foundation Logo" className="h-16 w-16 object-contain rounded-full shadow-lg border-2 border-white/20 bg-white" />
          <span className="font-bold text-lg tracking-tight text-white leading-tight">Dharashiv<br/>Foundation</span>
        </Link>

      <nav className="flex-1 overflow-y-auto no-scrollbar relative z-10 mt-2">
        <div className="mb-6">
          <p className="px-6 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Main</p>
          {mainNav.map((item) => <NavItem key={item.href} item={item} />)}
        </div>

        <div className="mb-6">
          <p className="px-6 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Network</p>
          {networkNav.map((item) => <NavItem key={item.href} item={item} />)}
        </div>

        <div className="mb-6">
          <p className="px-6 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Account</p>
          {accountNav.map((item) => <NavItem key={item.href} item={item} />)}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto bg-black/20 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/dashboard/profile" className="flex items-center space-x-3 cursor-pointer group flex-1 min-w-0">
            <div className="ring-2 ring-white/20 rounded-full overflow-hidden shrink-0 bg-white/10">
              <ProfileCompletionAvatar profile={currentProfile} size={36} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-sm font-semibold truncate group-hover:text-primary-foreground text-white transition-colors" title={currentProfile?.name || "Business"}>{currentProfile?.name || "Business"}</span>
              <span className="text-xs text-white/60 truncate transition-colors">Member</span>
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
      
      {/* Optional decorative background pattern overlay to mimic texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 100%)' }}></div>
    </div>
    </>
  );
}
