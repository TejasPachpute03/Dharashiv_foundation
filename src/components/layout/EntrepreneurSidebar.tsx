"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Network, LayoutDashboard, UserCircle, Search, 
  Users, Bookmark, Bell, Megaphone, Calendar, Settings, LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";

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
    { href: "/dashboard/saved", label: "Favourite Profiles", icon: <Bookmark className="w-5 h-5" /> },
    { href: "/dashboard/events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
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
    // Handle the exact root path match for /dashboard
    const isExactDashboard = item.href === "/dashboard" && pathname === "/dashboard";
    const highlight = isExactDashboard || (item.href !== "/dashboard" && isActive);

    return (
      <Link
        href={item.href}
        onClick={() => setIsOpen?.(false)}
        className={cn(
          "flex items-center justify-between px-3 py-2.5 mx-2 rounded-lg transition-colors text-sm font-medium group mb-1",
          highlight 
            ? "bg-primary text-primary-foreground shadow-sm" 
            : "text-black hover:bg-black/5"
        )}
      >
        <div className="flex items-center space-x-3">
          <span className={cn(highlight ? "text-primary-foreground" : "text-black/70 group-hover:text-black")}>
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
        "h-screen w-64 flex-col fixed inset-y-0 z-50 bg-white/40 backdrop-blur-2xl border-r border-white/40 text-black transition-transform duration-300 md:flex md:translate-x-0 shadow-lg",
        isOpen ? "translate-x-0 flex" : "-translate-x-full hidden"
      )}>
        <Link href="/dashboard" className="p-6 flex items-center space-x-3 mb-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Dharashiv Foundation Logo" className="h-10 w-10 object-contain rounded-full" />
          <span className="font-bold text-lg tracking-tight">Dharashiv Foundation</span>
        </Link>

      <nav className="flex-1 overflow-y-auto">
        <div className="mb-6">
          <p className="px-6 text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2">Main</p>
          {mainNav.map((item) => <NavItem key={item.href} item={item} />)}
        </div>

        <div className="mb-6">
          <p className="px-6 text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2">Network</p>
          {networkNav.map((item) => <NavItem key={item.href} item={item} />)}
        </div>

        <div className="mb-6">
          <p className="px-6 text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2">Account</p>
          {accountNav.map((item) => <NavItem key={item.href} item={item} />)}
        </div>
      </nav>

      <div className="p-4 border-t border-black/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold shrink-0 overflow-hidden">
              {currentProfile?.profileImage ? (
                <img src={currentProfile.profileImage} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span>{currentProfile?.name?.charAt(0) || "U"}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-sm font-semibold truncate text-black">{currentProfile?.name || "Entrepreneur"}</span>
              <span className="text-xs text-black/60 truncate">Member</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
