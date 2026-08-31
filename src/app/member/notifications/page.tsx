"use client";

import { Bell, Check, Trash2, Network, UserPlus, Megaphone, Calendar, Building } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppContext();

  // In a real app we'd filter by currentUser.id, but for demo we just show all or mock ones
  
  const getIcon = (type: string) => {
    switch (type) {
      case "connection_request": return <UserPlus className="h-5 w-5 text-accent" />;
      case "connection_accepted": return <Network className="h-5 w-5 text-success" />;
      case "announcement": return <Megaphone className="h-5 w-5 text-primary" />;
      case "event": return <Calendar className="h-5 w-5 text-purple-500" />;
      case "foundation_update": return <Building className="h-5 w-5 text-primary" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground mt-1">Updates on your network and foundation activities.</p>
        </div>
        {notifications.some(n => !n.read) && (
          <Button variant="outline" size="sm" onClick={markAllNotificationsRead}>
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg bg-card">
            <Bell className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
            <h3 className="text-lg font-medium mb-1">You're all caught up!</h3>
            <p className="text-sm text-muted-foreground">No new notifications at the moment.</p>
          </div>
        ) : (
          notifications.map(notif => (
            <Card key={notif.id} className={`transition-colors ${!notif.read ? 'bg-primary/5 border-primary/20' : ''}`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-full ${!notif.read ? 'bg-primary/10' : 'bg-muted'}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${!notif.read ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                    {notif.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
                {!notif.read && (
                  <Button variant="ghost" size="sm" onClick={() => markNotificationRead(notif.id)} className="shrink-0 h-8 text-xs">
                    Mark read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
