"use client";

import { Check, X, Megaphone, FileText, Download } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useState } from "react";

export default function PendingApprovalsPage() {
  const { announcements, updateAnnouncement } = useAppContext();
  
  const pendingAnnouncements = announcements.filter(a => a.status === "Pending");

  const handleApprove = (id: string) => {
    updateAnnouncement(id, { status: "Published" });
  };

  const handleReject = (id: string) => {
    updateAnnouncement(id, { status: "Rejected" });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Pending Approvals</h2>
        <p className="text-muted-foreground mt-1">Review and approve user-submitted announcements.</p>
      </div>

      {pendingAnnouncements.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-lg bg-card">
          <Check className="mx-auto h-12 w-12 text-success mb-4 opacity-80" />
          <h3 className="text-xl font-medium mb-2">All Caught Up!</h3>
          <p className="text-muted-foreground">There are no pending announcements waiting for your approval.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="border-l-4 border-l-accent overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="mb-2">{announcement.category}</Badge>
                      <span className="text-xs text-muted-foreground">Submitted by {announcement.author}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-4 bg-muted/20 p-3 rounded-md">
                      {announcement.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-xs">
                      {announcement.coverImage && (
                        <div className="flex items-center text-muted-foreground">
                          <span className="font-medium mr-1">Cover Image:</span> Attached
                        </div>
                      )}
                      {announcement.attachments && announcement.attachments.length > 0 && (
                        <div className="flex items-center text-muted-foreground">
                          <FileText className="w-3.5 h-3.5 mr-1" /> {announcement.attachments.length} attachment(s)
                        </div>
                      )}
                      <div className="flex items-center text-muted-foreground">
                        <span className="font-medium mr-1">Requested Publish Date:</span> {new Date(announcement.publishDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {announcement.attachments && announcement.attachments.length > 0 && (
                       <div className="mt-4 pt-3 border-t">
                         <h4 className="text-xs font-semibold mb-2">Attachments:</h4>
                         <div className="flex flex-wrap gap-2">
                           {announcement.attachments.map((att, idx) => (
                             <a 
                               key={idx} 
                               href={att.url} 
                               download={att.name}
                               target="_blank"
                               rel="noreferrer"
                               className="flex items-center px-2 py-1 border rounded text-xs hover:bg-muted/50"
                             >
                               <FileText className="w-3 h-3 mr-1" />
                               <span className="truncate max-w-[120px]">{att.name}</span>
                             </a>
                           ))}
                         </div>
                       </div>
                    )}
                  </div>
                  
                  <div className="bg-muted/10 p-6 md:w-64 border-t md:border-t-0 md:border-l flex flex-col justify-center gap-3 shrink-0">
                    <Button onClick={() => handleApprove(announcement.id)} className="w-full bg-success text-white hover:bg-success/90">
                      <Check className="mr-2 h-4 w-4" /> Approve
                    </Button>
                    <Button onClick={() => handleReject(announcement.id)} variant="destructive" className="w-full">
                      <X className="mr-2 h-4 w-4" /> Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
