"use client";

import { Megaphone, Calendar } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AnnouncementsPage() {
  const { announcements } = useAppContext();

  const publishedAnnouncements = announcements.filter(a => a.status === "Published");

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
        <p className="text-muted-foreground mt-1">Stay updated with the latest news from Dharashiv Foundation.</p>
      </div>

      <div className="space-y-4">
        {publishedAnnouncements.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg bg-card">
            <Megaphone className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No announcements yet</h3>
            <p className="text-sm text-muted-foreground">Check back later for updates from the foundation.</p>
          </div>
        ) : (
          publishedAnnouncements.map(ann => (
            <Card key={ann.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-muted/50 p-6 md:w-48 flex flex-col justify-center items-center md:border-r border-b md:border-b-0 text-center shrink-0">
                    <Calendar className="h-6 w-6 text-muted-foreground mb-2" />
                    <span className="font-semibold">{new Date(ann.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    <span className="text-xs text-muted-foreground">{new Date(ann.publishDate).getFullYear()}</span>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="mb-2">{ann.category}</Badge>
                      <span className="text-xs text-muted-foreground">By {ann.author}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{ann.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                      {ann.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
