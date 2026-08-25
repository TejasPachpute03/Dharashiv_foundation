"use client";

import { Check, X, AlertCircle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useState } from "react";

export default function PendingApprovalsPage() {
  const { entrepreneurs, updateEntrepreneurStatus } = useAppContext();
  
  const pendingMembers = entrepreneurs.filter(e => e.status === "Pending");

  const handleApprove = (id: string) => {
    updateEntrepreneurStatus(id, "Active");
  };

  const handleReject = (id: string) => {
    updateEntrepreneurStatus(id, "Rejected");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Pending Approvals</h2>
        <p className="text-muted-foreground mt-1">Review and approve new entrepreneur applications.</p>
      </div>

      {pendingMembers.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-lg bg-card">
          <Check className="mx-auto h-12 w-12 text-success mb-4 opacity-80" />
          <h3 className="text-xl font-medium mb-2">All Caught Up!</h3>
          <p className="text-muted-foreground">There are no pending registrations waiting for your approval.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingMembers.map((member) => (
            <Card key={member.id} className="border-l-4 border-l-accent overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="p-6 flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar src={member.profileImage} fallback={member.name.charAt(0)} size="lg" />
                      <div>
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="font-medium text-muted-foreground">{member.designation} at {member.companyName}</p>
                        <p className="text-sm text-muted-foreground mt-1">Applied on {member.memberSince}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-md">
                      <div>
                        <p className="text-muted-foreground">Category</p>
                        <p className="font-medium">{member.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium">{member.location}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium">{member.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p className="font-medium">{member.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/10 p-6 md:w-64 border-t md:border-t-0 md:border-l flex flex-col justify-center gap-3 shrink-0">
                    <Button onClick={() => handleApprove(member.id)} className="w-full bg-success text-white hover:bg-success/90">
                      <Check className="mr-2 h-4 w-4" /> Approve Profile
                    </Button>
                    <Button onClick={() => handleReject(member.id)} variant="destructive" className="w-full">
                      <X className="mr-2 h-4 w-4" /> Reject Application
                    </Button>
                    <Button variant="outline" className="w-full mt-4">
                      View Full Profile
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
