"use client";

import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account preferences and settings.</p>
      </div>

      <div className="space-y-4">
        <div className="text-center py-12 border border-dashed border-orange-200/60 rounded-2xl bg-card shadow-sm">
          <div className="mx-auto h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-1">Settings</h3>
          <p className="text-sm text-muted-foreground">Account settings options will appear here.</p>
        </div>
      </div>
    </div>
  );
}
