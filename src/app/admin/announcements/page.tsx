"use client";

import { useState, useRef } from "react";
import { Plus, Megaphone, Edit, Trash2, X, Image as ImageIcon, Paperclip, FileText, Download, Check, XCircle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function AdminAnnouncementsPage() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useAppContext();
  const [isCreating, setIsCreating] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Important" as any,
    author: "Foundation Admin",
    status: "Published" as any,
    publishDate: new Date().toISOString().split('T')[0]
  });
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<{ name: string; url: string; type: 'image' | 'pdf' }[]>([]);

  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const attachmentsInputRef = useRef<HTMLInputElement>(null);

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
    const annData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      author: formData.author,
      status: formData.status,
      publishDate: formData.publishDate,
      ...(coverImage ? { coverImage } : { coverImage: undefined }),
      ...(attachments.length > 0 ? { attachments } : { attachments: [] })
    };

    if (editId) {
      updateAnnouncement(editId, annData);
    } else {
      addAnnouncement(annData);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsCreating(false);
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      category: "Important",
      author: "Foundation Admin",
      status: "Published",
      publishDate: new Date().toISOString().split('T')[0]
    });
    setCoverImage(null);
    setAttachments([]);
  };

  const handleApprove = (id: string) => {
    updateAnnouncement(id, { status: "Published" });
  };

  const handleReject = (id: string) => {
    updateAnnouncement(id, { status: "Rejected" });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-secondary">Announcements</h2>
          <p className="text-muted-foreground mt-1">Create and manage network-wide announcements.</p>
        </div>
        {!isCreating && (
          <Button onClick={() => {
            resetForm();
            setIsCreating(true);
          }} className="bg-primary text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> New Announcement
          </Button>
        )}
      </div>

      {isCreating && (
        <Card className="border-primary shadow-md">
          <CardHeader>
            <CardTitle>{editId ? "Edit Announcement" : "Create Announcement"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  placeholder="e.g., Annual Entrepreneur Meetup"
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
                    className="flex h-10 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="Important">Important</option>
                    <option value="Event">Event</option>
                    <option value="Community">Community</option>
                    <option value="Business">Business</option>
                    <option value="Foundation Update">Foundation Update</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select 
                    className="flex h-10 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as any})}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
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
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit">{editId ? "Save Changes" : "Publish Announcement"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {announcements.map(ann => (
          <Card key={ann.id} className="overflow-hidden">
            {ann.coverImage && (
              <div className="w-full h-32 md:h-48 overflow-hidden border-b bg-muted/10">
                <img src={ann.coverImage} alt={ann.title} className="w-full h-full object-contain" />
              </div>
            )}
            <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={
                    ann.status === "Published" ? "default" : 
                    ann.status === "Pending" ? "secondary" : 
                    ann.status === "Rejected" ? "destructive" : "outline"
                  }>
                    {ann.status}
                  </Badge>
                  <Badge variant="outline">{ann.category}</Badge>
                  <span className="text-xs text-muted-foreground ml-2">
                    {ann.publishDate ? new Date(ann.publishDate).toLocaleDateString() : ''}
                  </span>
                  <span className="text-xs text-muted-foreground border-l pl-2 ml-2">
                    By {ann.author}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{ann.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{ann.description}</p>
                
                {ann.attachments && ann.attachments.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{ann.attachments.length} attachment(s)</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto mt-4 md:mt-0 justify-end">
                {ann.status === "Pending" && (
                  <>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleApprove(ann.id)}>
                      <Check className="h-4 w-4 mr-1" /> Approve
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleReject(ann.id)}>
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </>
                )}
                
                <Button variant="outline" size="sm" onClick={() => {
                  setFormData({
                    title: ann.title,
                    description: ann.description,
                    category: ann.category as any,
                    author: ann.author,
                    status: ann.status as any,
                    publishDate: ann.publishDate ? new Date(ann.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                  });
                  setCoverImage(ann.coverImage || null);
                  setAttachments(ann.attachments || []);
                  setEditId(ann.id);
                  setIsCreating(true);
                }}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => {
                  if (confirm("Are you sure you want to delete this announcement?")) {
                    deleteAnnouncement(ann.id);
                  }
                }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
