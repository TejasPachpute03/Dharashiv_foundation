"use client";

import { useState } from "react";
import { Save, Bell, Lock, Shield, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [toggles, setToggles] = useState({
    emailConnections: true,
    emailEvents: true,
    emailUpdates: true,
    emailMarketing: false,
    pushMessages: true,
    pushViews: false,
    privacyVisible: true,
    privacyContact: true,
    privacySearch: false,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-1">
          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-sm text-left transition-colors ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </button>
            <button 
              onClick={() => setActiveTab("privacy")}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-sm text-left transition-colors ${activeTab === 'privacy' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <Eye className="w-4 h-4" />
              <span>Privacy</span>
            </button>
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          {activeTab === "notifications" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Choose what updates you want to receive via email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Connection Requests</h4>
                      <p className="text-xs text-muted-foreground">Receive an email when someone wants to connect with you.</p>
                    </div>
                    <Switch checked={toggles.emailConnections} onChange={() => toggle('emailConnections')} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Event Reminders</h4>
                      <p className="text-xs text-muted-foreground">Get notified about upcoming events you've saved.</p>
                    </div>
                    <Switch checked={toggles.emailEvents} onChange={() => toggle('emailEvents')} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Foundation Updates</h4>
                      <p className="text-xs text-muted-foreground">Important announcements from the Dharashiv Foundation.</p>
                    </div>
                    <Switch checked={toggles.emailUpdates} onChange={() => toggle('emailUpdates')} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Marketing Emails</h4>
                      <p className="text-xs text-muted-foreground">Receive promotional content and partner offers.</p>
                    </div>
                    <Switch checked={toggles.emailMarketing} onChange={() => toggle('emailMarketing')} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>Configure notifications within the dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">New Messages</h4>
                      <p className="text-xs text-muted-foreground">Get notified when someone sends you a message.</p>
                    </div>
                    <Switch checked={toggles.pushMessages} onChange={() => toggle('pushMessages')} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Profile Views</h4>
                      <p className="text-xs text-muted-foreground">See when other members view your profile.</p>
                    </div>
                    <Switch checked={toggles.pushViews} onChange={() => toggle('pushViews')} />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy Preferences</CardTitle>
                <CardDescription>Control who can see your profile and activity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Profile Visibility</h4>
                    <p className="text-xs text-muted-foreground">Make your profile visible to all foundation members.</p>
                  </div>
                  <Switch checked={toggles.privacyVisible} onChange={() => toggle('privacyVisible')} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Show Contact Info</h4>
                    <p className="text-xs text-muted-foreground">Allow your connections to see your email and phone number.</p>
                  </div>
                  <Switch checked={toggles.privacyContact} onChange={() => toggle('privacyContact')} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Search Engine Indexing</h4>
                    <p className="text-xs text-muted-foreground">Allow search engines to index your public profile.</p>
                  </div>
                  <Switch checked={toggles.privacySearch} onChange={() => toggle('privacySearch')} />
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
                <><Save className="w-4 h-4 mr-2" /> Save Preferences</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
