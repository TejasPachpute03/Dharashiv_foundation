"use client";

import { useAppContext } from "@/context/AppContext";
import { Star, Briefcase, Users, Calendar, Target } from "lucide-react";
import { useEffect, useState } from "react";

export function ActivityTicker() {
  const { currentUser, entrepreneurs, connections, jobs, events } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !currentUser) return null;

  const currentProfile = entrepreneurs.find(e => e.id === currentUser.id);
  const location = currentProfile?.location || "";
  const baseLocation = location.split(",")[0].trim();

  // 1. People you may know: active members excluding self and existing connections
  const connectedIds = connections
    .filter(c => c.requesterId === currentUser.id || c.recipientId === currentUser.id)
    .flatMap(c => [c.requesterId, c.recipientId]);
  const peopleYouMayKnow = entrepreneurs.filter(e => e.id !== currentUser.id && !connectedIds.includes(e.id) && e.status === "Active").length;

  // 2. New Jobs
  const newJobsCount = jobs.filter(j => j.status === "Open").length;

  // 3. Upcoming events in city
  const cityEvents = events.filter(e => e.location?.toLowerCase().includes(baseLocation.toLowerCase())).length;

  // 4. New members from location
  const localMembers = entrepreneurs.filter(e => e.id !== currentUser.id && e.location?.includes(baseLocation) && e.status === "Active").length;

  // 5. Total opportunities (jobs + events in city)
  const newOpportunities = newJobsCount + cityEvents;

  return (
    <div className="w-full bg-white/60 backdrop-blur-md border border-black/10 rounded-xl overflow-hidden shadow-sm flex items-center h-12 relative my-6">
      {/* Static Flashing Header */}
      <div className="bg-white/80 z-10 px-4 h-full flex items-center border-r border-black/10 font-bold whitespace-nowrap shadow-[4px_0_15px_rgba(0,0,0,0.05)]">
        <Star className="w-4 h-4 mr-2 animate-pulse text-yellow-500 fill-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.9)]" />
        <span className="animate-flash-red-black tracking-wider uppercase text-sm">Updates</span>
      </div>

      {/* Scrolling Ticker */}
      <div className="flex-1 min-w-0 overflow-hidden relative h-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="animate-marquee absolute flex w-max h-full">
          {[1, 2].map((i) => (
            <div key={i} className="flex min-w-[100vw] items-center justify-around px-8 text-sm font-medium">
              
              <span className="flex items-center text-black/80 whitespace-nowrap">
                <Users className="w-4 h-4 mr-2 text-primary shrink-0" />
                <span className="font-bold text-black mr-1">{peopleYouMayKnow}</span> People You May Know
              </span>
              
              <span className="text-black/30 mx-4">•</span>

              <span className="flex items-center text-black/80 whitespace-nowrap">
                <Target className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                <span className="font-bold text-black mr-1">{newOpportunities}</span> New Opportunities
              </span>

              <span className="text-black/30 mx-4">•</span>

              <span className="flex items-center text-black/80 whitespace-nowrap">
                <Briefcase className="w-4 h-4 mr-2 text-indigo-500 shrink-0" />
                <span className="font-bold text-black mr-1">{newJobsCount}</span> New Jobs Available
              </span>

              <span className="text-black/30 mx-4">•</span>

              <span className="flex items-center text-black/80 whitespace-nowrap">
                <Calendar className="w-4 h-4 mr-2 text-accent shrink-0" />
                <span className="font-bold text-black mr-1">{cityEvents}</span> Upcoming Events near {baseLocation || "You"}
              </span>

              <span className="text-black/30 mx-4">•</span>

              <span className="flex items-center text-black/80 whitespace-nowrap">
                <Users className="w-4 h-4 mr-2 text-purple-500 shrink-0" />
                <span className="font-bold text-black mr-1">{localMembers}</span> New Members from {baseLocation || "Your Area"}
              </span>
              
              {/* Optional ending dot so it looks continuous with the next block */}
              <span className="text-black/30 mx-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
