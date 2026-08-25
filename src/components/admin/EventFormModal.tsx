"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Event>) => void;
  initialData?: Event | null;
}

export function EventFormModal({ isOpen, onClose, onSubmit, initialData }: EventFormModalProps) {
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    organizer: "",
    category: "",
    status: "Upcoming",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        organizer: "",
        category: "",
        status: "Upcoming",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <div className="bg-card w-full max-w-2xl rounded-xl shadow-lg border flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{initialData ? "Edit Event" : "Add New Event"}</h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <form id="event-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Event Title</label>
                <Input required name="title" value={formData.title || ""} onChange={handleChange} placeholder="e.g. Annual Networking Meet" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input required name="date" value={formData.date || ""} onChange={handleChange} placeholder="e.g. 15 Aug 2026" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input required name="time" value={formData.time || ""} onChange={handleChange} placeholder="e.g. 10:00 AM - 2:00 PM" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input required name="location" value={formData.location || ""} onChange={handleChange} placeholder="e.g. Grand Hotel, Mumbai" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input required name="category" value={formData.category || ""} onChange={handleChange} placeholder="e.g. Networking" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Organizer</label>
                <Input required name="organizer" value={formData.organizer || ""} onChange={handleChange} placeholder="e.g. Dharashiv Foundation" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  required
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Past">Past</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  required 
                  name="description" 
                  value={formData.description || ""} 
                  onChange={handleChange} 
                  placeholder="Describe the event..." 
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t bg-muted/20 flex justify-end gap-3 rounded-b-xl">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="event-form">{initialData ? "Save Changes" : "Create Event"}</Button>
        </div>
      </div>
    </div>
  );
}
