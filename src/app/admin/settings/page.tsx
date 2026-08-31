"use client";

import { useState } from "react";
import { Save, Bell, Shield, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppContext } from "@/context/AppContext";

function Switch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        checked ? 'bg-primary' : 'bg-muted-foreground/30'
      }`}
    >
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAppContext();
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [localSettings, setLocalSettings] = useState(settings);

  const toggle = (key: keyof typeof localSettings) => {
    setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      updateSettings(localSettings);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12 bg-background min-h-screen">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">System Settings</h2>
        <p className="text-muted-foreground mt-1 text-sm">Configure global platform settings and permissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-1">
          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab("general")}
              className={`flex items-center space-x-3 px-3 py-2 rounded-xl font-medium text-sm text-left transition-colors ${activeTab === 'general' ? 'bg-orange-100 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <Settings2 className="w-4 h-4" />
              <span>General</span>
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`flex items-center space-x-3 px-3 py-2 rounded-xl font-medium text-sm text-left transition-colors ${activeTab === 'security' ? 'bg-orange-100 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <Shield className="w-4 h-4" />
              <span>Security & Access</span>
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center space-x-3 px-3 py-2 rounded-xl font-medium text-sm text-left transition-colors ${activeTab === 'notifications' ? 'bg-orange-100 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <Bell className="w-4 h-4" />
              <span>Admin Notifications</span>
            </button>
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage platform-wide behaviors.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Auto-Approve Members</h4>
                    <p className="text-xs text-muted-foreground">Automatically set new registrations to Active status.</p>
                  </div>
                  <Switch checked={localSettings.autoApprove} onChange={() => toggle('autoApprove')} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Maintenance Mode</h4>
                    <p className="text-xs text-muted-foreground">Prevent non-admin users from accessing the platform.</p>
                  </div>
                  <Switch checked={localSettings.maintenanceMode} onChange={() => toggle('maintenanceMode')} />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security & Access</CardTitle>
                <CardDescription>Configure authentication and privacy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Require Email Verification</h4>
                    <p className="text-xs text-muted-foreground">Users must verify their email before logging in.</p>
                  </div>
                  <Switch checked={localSettings.requireEmailVerification} onChange={() => toggle('requireEmailVerification')} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Allow Public Profiles</h4>
                    <p className="text-xs text-muted-foreground">Allow member profiles to be viewed without an account.</p>
                  </div>
                  <Switch checked={localSettings.allowPublicProfiles} onChange={() => toggle('allowPublicProfiles')} />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Notifications</CardTitle>
                <CardDescription>Choose when to receive admin alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">New Member Registration</h4>
                    <p className="text-xs text-muted-foreground">Receive an email when a new member registers.</p>
                  </div>
                  <Switch checked={localSettings.notifyOnNewMember} onChange={() => toggle('notifyOnNewMember')} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">System Error Reports</h4>
                    <p className="text-xs text-muted-foreground">Receive alerts for critical platform errors.</p>
                  </div>
                  <Switch checked={localSettings.notifyOnReport} onChange={() => toggle('notifyOnReport')} />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                "Saving..."
              ) : success ? (
                <>Saved Successfully</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> Save Settings</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
