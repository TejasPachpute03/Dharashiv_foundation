"use client";

import { Calendar, MapPin, Clock } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function EventsPage() {
  const { events } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Events</h2>
        <p className="text-muted-foreground mt-1">Discover upcoming networking meets, workshops, and seminars.</p>
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg bg-card">
            <Calendar className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No events scheduled</h3>
            <p className="text-sm text-muted-foreground">Check back later for upcoming events.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {events.map(event => (
              <Card variant="beige" key={event.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-transparent p-6 md:w-32 flex flex-col justify-center items-center md:border-r border-[#E8E3DD] border-b md:border-b-0 text-center shrink-0">
                      <span className="font-bold text-3xl text-primary">{event.date.split(' ')[0]}</span>
                      <span className="font-semibold text-sm uppercase tracking-widest text-muted-foreground mt-1">{event.date.split(' ').slice(1).join(' ').substring(0, 3)}</span>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="bg-orange-100 text-primary uppercase text-[10px] border-orange-200/50 font-bold">{event.category}</Badge>
                        <span className="text-xs font-medium text-green-600">{event.status}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{event.title}</h3>
                      <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap mb-4">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 font-medium">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1.5 text-[#7C7670]" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5 text-[#7C7670]" />
                          {event.location}
                        </div>
                      </div>
                      
                      <div className="flex justify-end border-t border-[#E8E3DD] pt-4">
                        <Button variant="default">Register</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
