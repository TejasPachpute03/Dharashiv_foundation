"use client";

import Link from "next/link";
import { Calendar, MapPin, Clock, Briefcase, Building, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";
import { EntrepreneurCard } from "@/components/shared/EntrepreneurCard";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface DashboardActionGridProps {
  role: 'admin' | 'business' | 'member' | 'student';
}

export function DashboardActionGrid({ role }: DashboardActionGridProps) {
  const { currentUser, entrepreneurs, connections, jobs, events, announcements } = useAppContext();
  
  const basePath = role === 'business' ? '/dashboard' : `/${role}`;
  const directoryPath = role === 'student' ? `${basePath}/discover` : `${basePath}/directory`;

  if (!currentUser) return null;

  const currentProfile = entrepreneurs.find(e => e.id === currentUser.id);
  const location = currentProfile?.location || "";
  const baseLocation = location.split(",")[0].trim();

  // 1. People you may know
  const connectedIds = connections
    .filter(c => c.requesterId === currentUser.id || c.recipientId === currentUser.id)
    .flatMap(c => [c.requesterId, c.recipientId]);
    
  const localPeople = entrepreneurs.filter(
    e => e.id !== currentUser.id && !connectedIds.includes(e.id) && e.status === "Active" && e.location?.includes(baseLocation)
  );
  const peopleYouMayKnowCount = localPeople.length;

  // 2. Opportunities (Jobs + Connections to make)
  const opportunitiesCount = jobs.filter(j => j.status === "Open").length + events.length;
  const recommendedForOpportunities = entrepreneurs
    .filter(e => e.id !== currentUser.id && !connectedIds.includes(e.id) && e.status === "Active")
    .slice(0, 3);

  const eventsCount = events.length;
  const updatesCount = announcements.length;
  const openJobs = jobs.filter(j => j.status === "Open");
  const jobsCount = openJobs.length;

  return (
    <div>
      {localPeople.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-5xl font-bold tracking-tight flex items-center gap-3">
              People You May Know 
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold border border-blue-200">
                {peopleYouMayKnowCount}
              </span>
            </h2>
            <Link href={directoryPath} className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localPeople.slice(0, 3).map(ent => (
              <EntrepreneurCard key={ent.id} entrepreneur={ent} />
            ))}
          </div>
        </div>
      )}

      {recommendedForOpportunities.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-5xl font-bold tracking-tight flex items-center gap-3">
              Opportunities 
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold border border-blue-200">
                {opportunitiesCount}
              </span>
            </h2>
            <Link href={directoryPath} className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedForOpportunities.map(ent => (
              <EntrepreneurCard 
                key={ent.id} 
                entrepreneur={ent} 
                matchPercentage={Math.floor(Math.random() * 20) + 80} 
              />
            ))}
          </div>
        </div>
      )}

      {eventsCount > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-5xl font-bold tracking-tight flex items-center gap-3">
              Upcoming Events 
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold border border-blue-200">
                {eventsCount}
              </span>
            </h2>
            <Link href={`${basePath}/events`} className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {events.slice(0, 2).map(event => (
              <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-muted/50 p-6 md:w-56 flex flex-col justify-center items-center md:border-r border-b md:border-b-0 text-center shrink-0">
                      <span className="font-bold text-lg text-primary">{event.date.split(' ')[0]}</span>
                      <span className="font-semibold">{event.date.split(' ').slice(1).join(' ')}</span>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="mb-2">{event.category}</Badge>
                        <span className="text-xs text-muted-foreground">Status: {event.status}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {updatesCount > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-5xl font-bold tracking-tight flex items-center gap-3">
              Community Updates 
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold border border-blue-200">
                {updatesCount}
              </span>
            </h2>
            <Link href={`${basePath}/announcements`} className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {announcements.filter(a => a.status === "Published").slice(0, 2).map(ann => (
              <Card key={ann.id} className="overflow-hidden hover:shadow-md transition-shadow relative">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-muted/30 p-6 md:w-48 flex flex-col justify-center items-center md:border-r border-b md:border-b-0 text-center shrink-0">
                      <Calendar className="h-6 w-6 text-muted-foreground mb-2" />
                      <span className="font-semibold">{new Date(ann.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="mb-2">{ann.category}</Badge>
                        <span className="text-xs text-muted-foreground">By {ann.author}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{ann.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {ann.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {jobsCount > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-5xl font-bold tracking-tight flex items-center gap-3">
              Jobs Near You
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold border border-blue-200">
                {jobsCount}
              </span>
            </h2>
            <Link href={`${basePath}/jobs`} className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {openJobs.slice(0, 2).map(job => (
              <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          Type: {job.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1.5" />
                          {job.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5" />
                          {job.location}
                        </div>
                        {job.salary && (
                          <div className="flex items-center">
                            <IndianRupee className="w-4 h-4 mr-1.5" />
                            {job.salary}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-foreground/80 line-clamp-2">{job.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
