"use client";

import { useAppContext } from "@/context/AppContext";
import { ActivityTicker } from "@/components/shared/ActivityTicker";
import { DashboardActionGrid } from "@/components/shared/DashboardActionGrid";
import { ProfileCompletionNudge } from "@/components/shared/ProfileCompletionNudge";

export default function AdminDashboardPage() {
  const { currentUser, entrepreneurs } = useAppContext();
  const currentProfile = entrepreneurs.find(e => e.id === currentUser?.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-secondary">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Monitor the network's growth and recent activities.</p>
      </div>

      <ProfileCompletionNudge role="admin" />
      <ActivityTicker />
      <DashboardActionGrid role="admin" />
    </div>
  );
}
