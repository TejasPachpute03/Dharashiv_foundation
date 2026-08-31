"use client";

import { useState } from "react";
import { Search, Link as LinkIcon, Calendar } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { getProfileRoute } from "@/lib/route-utils";
import Link from "next/link";

export default function GlobalConnectionsPage() {
  const { connections, entrepreneurs, currentUser } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");

  const getEntrepreneur = (id: string) => entrepreneurs.find(e => e.id === id);

  const filteredConnections = connections.filter(conn => {
    if (!searchQuery) return true;
    const req = getEntrepreneur(conn.requesterId);
    const rec = getEntrepreneur(conn.recipientId);
    const term = searchQuery.toLowerCase();
    
    return (
      (req && req.name.toLowerCase().includes(term)) ||
      (rec && rec.name.toLowerCase().includes(term))
    );
  });

  return (
    <div className="animate-in fade-in duration-500 max-w-[1400px] mx-auto bg-background min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Global Connections</h2>
        <p className="text-muted-foreground text-sm mt-1">Overview of all network connections across the platform.</p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by member name..." 
              className="pl-9 bg-background h-10 w-full rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              {filteredConnections.length} Total Connections
            </Badge>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-background border-b border-muted">
              <tr>
                <th className="px-6 py-4 font-medium font-semibold">Requester</th>
                <th className="px-6 py-4 font-medium font-semibold">Recipient</th>
                <th className="px-6 py-4 font-medium font-semibold">Date</th>
                <th className="px-6 py-4 font-medium font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredConnections.map((conn) => {
                const requester = getEntrepreneur(conn.requesterId);
                const recipient = getEntrepreneur(conn.recipientId);
                
                if (!requester || !recipient) return null;

                return (
                  <tr 
                    key={conn.id} 
                    className="border-b border-muted last:border-0 hover:bg-muted/10 transition-colors bg-card"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={requester.profileImage} fallback={requester.name.charAt(0)} size="sm" />
                        <div>
                          <Link href={getProfileRoute(requester.id, currentUser?.role)} className="font-semibold text-foreground text-sm hover:underline">
                            {requester.name}
                          </Link>
                          <div className="text-muted-foreground text-xs truncate max-w-[150px]">{requester.companyName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={recipient.profileImage} fallback={recipient.name.charAt(0)} size="sm" />
                        <div>
                          <Link href={getProfileRoute(recipient.id, currentUser?.role)} className="font-semibold text-foreground text-sm hover:underline">
                            {recipient.name}
                          </Link>
                          <div className="text-muted-foreground text-xs truncate max-w-[150px]">{recipient.companyName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-foreground font-medium text-sm">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" /> 
                        {new Date(conn.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={conn.status === "Connected" ? "default" : "secondary"}>
                        {conn.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
              {filteredConnections.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    No connections found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
