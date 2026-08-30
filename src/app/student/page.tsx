"use client";

import { useAppContext } from "@/context/AppContext";
import { ActivityTicker } from "@/components/shared/ActivityTicker";
import { DashboardActionGrid } from "@/components/shared/DashboardActionGrid";
import { ProfileCompletionNudge } from "@/components/shared/ProfileCompletionNudge";

export default function StudentDashboardOverview() {
  const { currentUser, entrepreneurs } = useAppContext();
  const currentProfile = entrepreneurs.find(e => e.id === currentUser?.id);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome, {currentProfile?.name?.split(' ')[0] || "Student"} 🎓</h2>
        <p className="text-muted-foreground mt-2">Explore opportunities, submit ideas, and discover your path.</p>
      </div>

      <ProfileCompletionNudge role="student" />
      <ActivityTicker />
      <DashboardActionGrid role="student" />
    </div>
  );
}
