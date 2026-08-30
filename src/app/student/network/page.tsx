"use client";

import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function NetworkPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Network</h2>
        <p className="text-muted-foreground mt-1">Connect with mentors, peers, and professionals.</p>
      </div>

      <div className="space-y-4">
        <div className="text-center py-12 border border-dashed rounded-lg bg-card">
          <Users className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
          <h3 className="text-lg font-medium mb-1">No connections yet</h3>
          <p className="text-sm text-muted-foreground">Start connecting with others to build your network.</p>
        </div>
      </div>
    </div>
  );
}
