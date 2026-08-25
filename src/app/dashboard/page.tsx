"use client";

import Link from "next/link";
import { Users, UserPlus, Eye, Target, ArrowRight, Bell, Star } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { StatCard } from "@/components/shared/StatCard";
import { EntrepreneurCard } from "@/components/shared/EntrepreneurCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DashboardOverview() {
  const { currentUser, entrepreneurs, connections, announcements, events, savedEntrepreneurs } = useAppContext();
  const currentProfile = entrepreneurs.find(e => e.id === currentUser?.id);

  // Calculate stats
  const myConnections = connections.filter(c => c.status === "Connected" && (c.requesterId === currentUser?.id || c.recipientId === currentUser?.id)).length;
  const pendingRequests = connections.filter(c => c.status === "Pending" && c.recipientId === currentUser?.id).length;
  
  // Recommend entrepreneurs (excluding self and connected)
  const connectedIds = connections.filter(c => c.requesterId === currentUser?.id || c.recipientId === currentUser?.id).flatMap(c => [c.requesterId, c.recipientId]);
  const recommended = entrepreneurs
    .filter(e => e.id !== currentUser?.id && !connectedIds.includes(e.id) && e.status === "Active")
    .slice(0, 3); // Get top 3

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Good Morning, {currentProfile?.name.split(' ')[0] || "Entrepreneur"} 👋</h2>
        <p className="text-muted-foreground mt-2">Grow your network. Discover opportunities. Build stronger businesses.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/directory?filter=favourites">
          <StatCard 
            title="Favourite Profiles" 
            value={savedEntrepreneurs.length.toString()} 
            icon={<Star className="text-primary" />} 
            description="Saved connections"
            className="hover:border-primary/50 transition-colors cursor-pointer h-full"
          />
        </Link>
        <Link href="/dashboard/network?tab=received">
          <StatCard 
            title="Pending Requests" 
            value={pendingRequests.toString()} 
            icon={<UserPlus className="text-accent" />} 
            description="Awaiting your response"
            className="hover:border-primary/50 transition-colors cursor-pointer h-full"
          />
        </Link>

        <Link href="/dashboard/directory">
          <StatCard 
            title="Opportunities" 
            value="12" 
            icon={<Target className="text-green-500" />} 
            description="Matches for your profile"
            className="hover:border-primary/50 transition-colors cursor-pointer h-full"
          />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-8">


          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Recommended Entrepreneurs</h3>
              <Button variant="ghost" className="text-sm" asChild>
                <Link href="/dashboard/directory">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map(ent => (
                <EntrepreneurCard key={ent.id} entrepreneur={ent} />
              ))}
            </div>
          </div>

        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Bell className="w-5 h-5 mr-2 text-muted-foreground" />
                Latest Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="group border-b last:border-0 pb-4 last:pb-0">
                  <p className="text-xs text-muted-foreground mb-1">{new Date(ann.createdAt).toLocaleDateString()}</p>
                  <Link href="/dashboard/announcements" className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {ann.title}
                  </Link>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs" asChild>
                <Link href="/dashboard/announcements">View All Announcements</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.slice(0, 2).map(ev => (
                <div key={ev.id} className="border-l-2 border-accent pl-3 pb-2">
                  <p className="text-xs font-semibold text-accent mb-1">{ev.date}</p>
                  <p className="text-sm font-medium leading-tight">{ev.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{ev.location}</p>
                </div>
              ))}
              <Button variant="link" className="w-full text-xs p-0 h-auto" asChild>
                <Link href="/dashboard/events">View All Events <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
