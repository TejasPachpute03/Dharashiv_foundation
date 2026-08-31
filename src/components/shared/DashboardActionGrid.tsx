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
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-primary text-sm font-bold border border-orange-200">
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
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-primary text-sm font-bold border border-orange-200">
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
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-primary text-sm font-bold border border-orange-200">
                {eventsCount}
              </span>
            </h2>
            <Link href={`${basePath}/events`} className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {events.slice(0, 2).map(event => (
              <Card variant="beige" key={event.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-orange-50/50 p-6 md:w-32 flex flex-col justify-center items-center md:border-r border-[#EDE7E1] border-b md:border-b-0 text-center shrink-0">
                      <span className="font-bold text-3xl text-primary">{event.date.split(' ')[0]}</span>
                      <span className="font-semibold text-sm uppercase tracking-widest text-muted-foreground mt-1">{event.date.split(' ').slice(1).join(' ').substring(0, 3)}</span>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="bg-orange-100 text-primary uppercase text-[10px] border-orange-200/50 font-bold">{event.category}</Badge>
                        <span className="text-xs font-medium text-green-600">{event.status}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{event.title}</h3>
                      <p className="text-foreground/80 text-sm line-clamp-2 mb-4">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1.5 text-orange-400/80" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5 text-orange-400/80" />
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
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-primary text-sm font-bold border border-orange-200">
                {updatesCount}
              </span>
            </h2>
            <Link href={`${basePath}/announcements`} className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <Card variant="ivory" className="overflow-hidden">
            {announcements.filter(a => a.status === "Published").slice(0, 2).map((ann, idx, arr) => (
              <div 
                key={ann.id} 
                className={cn(
                  "p-6 hover:bg-orange-50/30 transition-colors duration-200", 
                  idx < arr.length - 1 ? "border-b border-[#E8E3DD]" : "",
                  ann.category === "Important" || ann.category === "Foundation Update" ? "border-l-4 border-l-primary bg-orange-50/40" : ""
                )}
              >
                <div className="flex justify-between items-start mb-2.5">
                  <Badge 
                    variant={ann.category === "Important" || ann.category === "Foundation Update" ? "default" : "secondary"} 
                    className="uppercase text-[10px] tracking-wide font-bold"
                  >
                    [{ann.category}]
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">By {ann.author}</span>
                </div>
                <h3 className="text-lg font-bold mb-1.5 text-foreground">{ann.title}</h3>
                <p className="text-foreground/80 text-sm line-clamp-2 mb-3">
                  {ann.description}
                </p>
                <div className="text-xs text-muted-foreground font-medium">
                  Posted {new Date(ann.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {jobsCount > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-5xl font-bold tracking-tight flex items-center gap-3">
              Jobs Near You
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-primary text-sm font-bold border border-orange-200">
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
