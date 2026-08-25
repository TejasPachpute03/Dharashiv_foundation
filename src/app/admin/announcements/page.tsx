"use client";

import { useState } from "react";
import { Plus, Megaphone, Edit, Trash2 } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateAnnouncement(editId, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        author: formData.author,
        status: formData.status,
        publishDate: formData.publishDate
      });
    } else {
      addAnnouncement({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        author: formData.author,
        status: formData.status,
        publishDate: formData.publishDate
      });
    }
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
            setIsCreating(true);
            setEditId(null);
            setFormData({
              title: "",
              description: "",
              category: "Important",
              author: "Foundation Admin",
              status: "Published",
              publishDate: new Date().toISOString().split('T')[0]
            });
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
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
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
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as any})}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => {
                  setIsCreating(false);
                  setEditId(null);
                }}>Cancel</Button>
                <Button type="submit">{editId ? "Save Changes" : "Publish Announcement"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {announcements.map(ann => (
          <Card key={ann.id}>
            <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={ann.status === "Published" ? "default" : "secondary"}>{ann.status}</Badge>
                  <Badge variant="outline">{ann.category}</Badge>
                  <span className="text-xs text-muted-foreground ml-2">
                    {new Date(ann.publishDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{ann.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{ann.description}</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={() => {
                  setFormData({
                    title: ann.title,
                    description: ann.description,
                    category: ann.category as any,
                    author: ann.author,
                    status: ann.status as any,
                    publishDate: new Date(ann.publishDate).toISOString().split('T')[0]
                  });
                  setEditId(ann.id);
                  setIsCreating(true);
                }}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive" size="sm" className="flex-1 md:flex-none" onClick={() => {
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
