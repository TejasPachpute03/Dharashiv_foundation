"use client";

import { useState, useEffect, Suspense } from "react";
import { Users, UserPlus, ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

export default function MyNetworkPage() {
  return (
    <Suspense fallback={<div>Loading network...</div>}>
      <NetworkContent />
    </Suspense>
  );
}

function NetworkContent() {
  const { currentUser, entrepreneurs, connections, acceptConnectionRequest, rejectConnectionRequest, cancelConnectionRequest, openChat } = useAppContext();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as "connections" | "received" | "sent") || "connections";
  const [activeTab, setActiveTab] = useState<"connections" | "received" | "sent">(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab") as "connections" | "received" | "sent";
    if (tab && ["connections", "received", "sent"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!currentUser) return null;

  // Filter connections
  const connected = connections.filter(c => c.status === "Connected" && (c.requesterId === currentUser.id || c.recipientId === currentUser.id));
  const received = connections.filter(c => c.status === "Pending" && c.recipientId === currentUser.id);
  const sent = connections.filter(c => c.status === "Pending" && c.requesterId === currentUser.id);

  const getEntrepreneur = (id: string) => entrepreneurs.find(e => e.id === id);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Network</h2>
        <p className="text-muted-foreground mt-1">Manage your connections and pending requests.</p>
      </div>

      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("connections")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "connections" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          }`}
        >
          My Connections ({connected.length})
        </button>
        <button
          onClick={() => setActiveTab("received")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center ${
            activeTab === "received" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          }`}
        >
          Received Requests 
          {received.length > 0 && <span className="ml-2 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full">{received.length}</span>}
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "sent" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          }`}
        >
          Sent Requests ({sent.length})
        </button>
      </div>

      <div className="pt-4">
        {activeTab === "connections" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connected.length === 0 ? (
              <div className="col-span-full text-center py-12 border border-dashed rounded-lg bg-card">
                <Users className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
                <h3 className="text-lg font-medium mb-1">No connections yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Start discovering entrepreneurs to build your network.</p>
                <Button asChild><Link href="/member/discover">Discover Entrepreneurs</Link></Button>
              </div>
            ) : (
              connected.map(conn => {
                const partnerId = conn.requesterId === currentUser.id ? conn.recipientId : conn.requesterId;
                const ent = getEntrepreneur(partnerId);
                if (!ent) return null;
                return (
                  <Card key={conn.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 flex items-start space-x-4">
                        <Avatar src={ent.profileImage} fallback={ent.name.charAt(0)} size="lg" />
                        <div className="flex-1 min-w-0">
                          <Link href={`/member/entrepreneur/${ent.id}`} className="font-semibold text-foreground hover:underline truncate block">
                            {ent.name}
                          </Link>
                          <p className="text-sm text-muted-foreground truncate">{ent.designation}</p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{ent.companyName}</p>
                        </div>
                      </div>
                      <div className="bg-muted/30 border-t p-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/member/entrepreneur/${ent.id}`}>View Profile</Link>
                        </Button>
                        <Button size="sm" onClick={() => openChat(ent.id)}>Message</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}

        {activeTab === "received" && (
          <div className="space-y-4">
            {received.length === 0 ? (
              <div className="text-center py-12 border border-dashed rounded-lg bg-card">
                <UserCheck className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
                <h3 className="text-lg font-medium mb-1">No pending requests</h3>
                <p className="text-sm text-muted-foreground">You don't have any pending connection requests.</p>
              </div>
            ) : (
              received.map(conn => {
                const ent = getEntrepreneur(conn.requesterId);
                if (!ent) return null;
                return (
                  <Card key={conn.id}>
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                      <Avatar src={ent.profileImage} fallback={ent.name.charAt(0)} size="lg" />
                      <div className="flex-1 text-center sm:text-left">
                        <Link href={`/member/entrepreneur/${ent.id}`} className="font-semibold text-foreground hover:underline">
                          {ent.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{ent.designation} at {ent.companyName}</p>
                        <p className="text-xs text-muted-foreground mt-1">Sent on {new Date(conn.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => rejectConnectionRequest(conn.id)}>Reject</Button>
                        <Button className="flex-1 sm:flex-none" onClick={() => acceptConnectionRequest(conn.id)}>Accept</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}

        {activeTab === "sent" && (
          <div className="space-y-4">
            {sent.length === 0 ? (
              <div className="text-center py-12 border border-dashed rounded-lg bg-card">
                <UserPlus className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
                <h3 className="text-lg font-medium mb-1">No sent requests</h3>
                <p className="text-sm text-muted-foreground mb-4">You haven't sent any connection requests recently.</p>
                <Button variant="outline" asChild><Link href="/member/discover">Discover Entrepreneurs</Link></Button>
              </div>
            ) : (
              sent.map(conn => {
                const ent = getEntrepreneur(conn.recipientId);
                if (!ent) return null;
                return (
                  <Card key={conn.id}>
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                      <Avatar src={ent.profileImage} fallback={ent.name.charAt(0)} size="lg" />
                      <div className="flex-1 text-center sm:text-left">
                        <Link href={`/member/entrepreneur/${ent.id}`} className="font-semibold text-foreground hover:underline">
                          {ent.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{ent.designation} at {ent.companyName}</p>
                        <p className="text-xs text-muted-foreground mt-1">Requested on {new Date(conn.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto" onClick={() => cancelConnectionRequest(conn.id)}>Cancel Request</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
