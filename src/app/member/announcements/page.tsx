"use client";

import { useState, useRef } from "react";
import { Megaphone, Calendar, Plus, X, Image as ImageIcon, Paperclip, FileText, Download } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AnnouncementsPage() {
  const { announcements, currentUser, entrepreneurs, addAnnouncement } = useAppContext();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Community" as any,
  });
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<{ name: string; url: string; type: 'image' | 'pdf' }[]>([]);
  
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const attachmentsInputRef = useRef<HTMLInputElement>(null);

  const currentProfile = entrepreneurs.find(e => e.id === currentUser?.id);
  const authorName = currentProfile?.name || "Member";

  // Filter announcements: Published OR authored by current user (Pending/Rejected)
  const visibleAnnouncements = announcements.filter(a => 
    a.status === "Published" || a.author === authorName
  );

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.includes('pdf') ? 'pdf' as const : 'image' as const
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      author: authorName,
      status: "Pending", // Always pending for member submissions
      publishDate: new Date().toISOString().split('T')[0],
      ...(coverImage && { coverImage }),
      ...(attachments.length > 0 && { attachments })
    });
    
    setIsCreating(false);
    setFormData({ title: "", description: "", category: "Community" });
    setCoverImage(null);
    setAttachments([]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
          <p className="text-muted-foreground mt-1">Stay updated with the latest news from Dharashiv Foundation.</p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)} className="bg-primary text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> Add Announcement
          </Button>
        )}
      </div>

      {isCreating && (
        <Card className="border-primary shadow-md">
          <CardHeader>
            <CardTitle>Submit Announcement for Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  placeholder="e.g., Hiring new talent"
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  rows={4}
                  required 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select 
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="Event">Event</option>
                    <option value="Community">Community</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-2 pt-2 border-t">
                <label className="text-sm font-medium flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2" /> Cover Image
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={coverImageInputRef}
                  onChange={handleCoverImageChange}
                />
                {coverImage ? (
                  <div className="relative w-full max-w-sm h-40 rounded-md overflow-hidden border bg-muted/20">
                    <img src={coverImage} alt="Cover Preview" className="w-full h-full object-contain" />
                    <button 
                      type="button" 
                      onClick={() => setCoverImage(null)}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Button type="button" variant="outline" onClick={() => coverImageInputRef.current?.click()} size="sm">
                    Upload Cover Image
                  </Button>
                )}
              </div>

              {/* Attachments Upload */}
              <div className="space-y-2 pt-2 border-t">
                <label className="text-sm font-medium flex items-center">
                  <Paperclip className="w-4 h-4 mr-2" /> Attachments (PDF/Images)
                </label>
                <input 
                  type="file" 
                  accept="image/*,.pdf" 
                  multiple
                  className="hidden" 
                  ref={attachmentsInputRef}
                  onChange={handleAttachmentsChange}
                />
                <Button type="button" variant="outline" onClick={() => attachmentsInputRef.current?.click()} size="sm">
                  Add Attachments
                </Button>
                
                {attachments.length > 0 && (
                  <div className="flex flex-col gap-2 mt-3">
                    {attachments.map((att, i) => (
                      <div key={i} className="flex items-center justify-between p-2 border rounded-md bg-muted/30 text-sm max-w-md">
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <FileText className="w-4 h-4 shrink-0 text-muted-foreground" />
                          <span className="truncate">{att.name}</span>
                        </div>
                        <button type="button" onClick={() => removeAttachment(i)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => {
                  setIsCreating(false);
                  setFormData({ title: "", description: "", category: "Community" });
                  setCoverImage(null);
                  setAttachments([]);
                }}>Cancel</Button>
                <Button type="submit">Submit for Approval</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {visibleAnnouncements.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg bg-card">
            <Megaphone className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No announcements yet</h3>
            <p className="text-sm text-muted-foreground">Check back later for updates from the foundation.</p>
          </div>
        ) : (
          visibleAnnouncements.map(ann => (
            <Card key={ann.id} className="overflow-hidden hover:shadow-md transition-shadow relative">
              {ann.status !== "Published" && (
                <div className="absolute top-2 right-2 z-10">
                  <Badge variant={ann.status === "Pending" ? "secondary" : "destructive"}>
                    {ann.status}
                  </Badge>
                </div>
              )}
              {ann.coverImage && (
                <div className="w-full h-48 md:h-64 overflow-hidden border-b bg-muted/10">
                  <img src={ann.coverImage} alt={ann.title} className="w-full h-full object-contain" />
                </div>
              )}
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-muted/30 p-6 md:w-48 flex flex-col justify-center items-center md:border-r border-b md:border-b-0 text-center shrink-0">
                    <Calendar className="h-6 w-6 text-muted-foreground mb-2" />
                    <span className="font-semibold">{new Date(ann.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    <span className="text-xs text-muted-foreground">{new Date(ann.publishDate).getFullYear()}</span>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="mb-2">{ann.category}</Badge>
                      <span className="text-xs text-muted-foreground">By {ann.author}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{ann.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap mb-4">
                      {ann.description}
                    </p>
                    
                    {ann.attachments && ann.attachments.length > 0 && (
                      <div className="mt-4 space-y-2 border-t pt-4">
                        <h4 className="text-sm font-semibold flex items-center text-foreground/80">
                          <Paperclip className="w-4 h-4 mr-2" /> Attachments
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {ann.attachments.map((att, idx) => (
                            <a 
                              key={idx} 
                              href={att.url} 
                              download={att.name}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center px-3 py-1.5 border rounded-md text-xs hover:bg-muted/50 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">{att.name}</span>
                              <Download className="w-3 h-3 ml-2 opacity-50" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
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
