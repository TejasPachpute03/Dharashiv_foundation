"use client";

import { Menu, Bell, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { ProfileCompletionAvatar } from "@/components/ui/ProfileCompletionAvatar";
import { useAppContext } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { notifications, currentUser, entrepreneurs } = useAppContext();
  const currentProfile = entrepreneurs.find(e => e.id === currentUser?.id);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isDark, setIsDark] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  // Generate breadcrumbs from pathname
  const paths = pathname.split('/').filter(p => p);
  const breadcrumbs = ["Home", ...paths.map(p => p.charAt(0).toUpperCase() + p.slice(1))];

  useEffect(() => {
    // Check initial theme
    if (typeof document !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.toggle('dark');
      setIsDark(root.classList.contains('dark'));
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Button variant="ghost" size="icon" className="md:hidden shrink-0" onClick={onMenuClick}>
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex flex-1 justify-between items-center gap-x-4 self-stretch lg:gap-x-6">
        
        {/* Left: Breadcrumbs */}
        <div className="hidden sm:flex text-sm text-muted-foreground whitespace-nowrap">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && <span className="mx-2 text-muted-foreground/50">{'>'}</span>}
              <span className={i === breadcrumbs.length - 1 ? "font-semibold text-foreground" : ""}>
                {crumb}
              </span>
            </span>
          ))}
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-lg hidden md:flex items-center mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <form onSubmit={(e) => {
              e.preventDefault();
              const val = searchInputRef.current?.value;
              if (val) {
                router.push(`/dashboard/directory?q=${encodeURIComponent(val)}`);
              } else {
                router.push(`/dashboard/directory`);
              }
            }}>
              <Input 
                ref={searchInputRef}
                placeholder="Search clients, emails, phone numbers..." 
                className="pl-9 pr-12 rounded-full bg-muted/30 border-muted-foreground/20 h-10 w-full"
              />
            </form>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <span className="text-xs border rounded px-1.5 py-0.5 text-muted-foreground bg-background font-mono">⌘K</span>
            </div>
          </div>
        </div>

        {/* Right: Actions and Profile */}
        <div className="flex items-center gap-x-4 lg:gap-x-6 shrink-0">
          
          <div className="hidden lg:block text-sm font-medium text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>

          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground" asChild>
            <Link href="/dashboard/notifications">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white border-2 border-background">
                  {unreadCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={toggleTheme}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />

          <Link href="/dashboard/profile" className="flex items-center gap-x-3 hover:opacity-80 transition-opacity">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-semibold leading-none text-foreground">
                {currentProfile?.name || "Admin User"}
              </span>
              <span className="text-xs text-success flex items-center mt-1">
                <span className="w-1.5 h-1.5 bg-success rounded-full mr-1"></span>
                Online
              </span>
            </div>
            <ProfileCompletionAvatar profile={currentProfile} size={32} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
