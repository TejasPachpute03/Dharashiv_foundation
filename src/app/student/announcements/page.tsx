"use client";

import { Megaphone, Calendar, Paperclip, FileText, Download } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AnnouncementsPage() {
  const { announcements } = useAppContext();

  const publishedAnnouncements = announcements.filter(a => a.status === "Published");
  const visibleAnnouncements = publishedAnnouncements;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
        <p className="text-muted-foreground mt-1">Stay updated with the latest news from Dharashiv Foundation.</p>
      </div>

      <Card variant="ivory" className="overflow-hidden">
        {visibleAnnouncements.length === 0 ? (
          <div className="text-center py-12 bg-card">
            <div className="mx-auto h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Megaphone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">No announcements yet</h3>
            <p className="text-sm text-muted-foreground">Check back later for updates from the foundation.</p>
          </div>
        ) : (
          visibleAnnouncements.map((ann, idx, arr) => (
            <div 
              key={ann.id} 
              className={`p-6 hover:bg-orange-50/30 transition-colors duration-200 relative ${
                idx < arr.length - 1 ? "border-b border-[#E8E3DD]" : ""
              } ${
                ann.category === "Important" || ann.category === "Foundation Update" ? "border-l-4 border-l-primary bg-orange-50/40" : ""
              }`}
            >
              {ann.status !== "Published" && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant={ann.status === "Pending" ? "secondary" : "destructive"}>
                    {ann.status}
                  </Badge>
                </div>
              )}
              {ann.coverImage && (
                <div className="w-full h-48 md:h-64 overflow-hidden rounded-xl mb-6 bg-muted/10 border">
                  <img src={ann.coverImage} alt={ann.title} className="w-full h-full object-contain" />
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
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
                  <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap mb-3">
                    {ann.description}
                  </p>
                  
                  {ann.attachments && ann.attachments.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-[#E8E3DD] pt-4">
                      <h4 className="text-sm font-semibold flex items-center text-foreground/80">
                        <Paperclip className="w-4 h-4 mr-2" /> Attachments
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {ann.attachments.map((att, attIdx) => (
                          <a 
                            key={attIdx} 
                            href={att.url} 
                            download={att.name}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center px-3 py-1.5 border border-[#E8E3DD] rounded-md text-xs hover:bg-orange-50 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                            <span className="truncate max-w-[150px] font-medium">{att.name}</span>
                            <Download className="w-3 h-3 ml-2 text-primary/70" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground font-medium mt-4">
                    Posted {new Date(ann.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
