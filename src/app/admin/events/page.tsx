"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Calendar, MapPin, Clock } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EventFormModal } from "@/components/admin/EventFormModal";
import { Event } from "@/types";

export default function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleOpenModal = (event?: Event) => {
    setEditingEvent(event || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSubmitModal = (data: Partial<Event>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    } else {
      addEvent(data as any);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
    }
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 max-w-[1400px] mx-auto bg-background min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Manage Events</h2>
        <p className="text-muted-foreground text-sm mt-1">Create, update, and remove platform events.</p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title, location, or category..." 
              className="pl-9 bg-background h-10 w-full rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <Button onClick={() => handleOpenModal()} className="rounded-full shrink-0 h-9 px-4 text-sm bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-background border-b border-muted">
              <tr>
                <th className="px-6 py-4 font-medium font-semibold">Event Details</th>
                <th className="px-6 py-4 font-medium font-semibold">Schedule</th>
                <th className="px-6 py-4 font-medium font-semibold">Location</th>
                <th className="px-6 py-4 font-medium font-semibold">Category</th>
                <th className="px-6 py-4 font-medium font-semibold">Status</th>
                <th className="px-6 py-4 font-medium font-semibold text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr 
                  key={event.id} 
                  className="border-b border-muted last:border-0 hover:bg-muted/10 transition-colors bg-card"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground text-sm">{event.title}</div>
                    <div className="text-muted-foreground text-xs truncate max-w-[200px]">{event.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-foreground font-medium text-sm">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" /> {event.date}
                    </div>
                    <div className="flex items-center text-muted-foreground text-xs mt-1">
                      <Clock className="w-3.5 h-3.5 mr-1.5" /> {event.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" /> {event.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="font-normal">{event.category}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={event.status === "Upcoming" ? "default" : event.status === "Past" ? "secondary" : "outline"}>
                      {event.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(event)}
                        className="p-1.5 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-md transition-colors"
                        title="Edit Event"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="p-1.5 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No events found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EventFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmitModal} 
        initialData={editingEvent} 
      />
    </div>
  );
}
