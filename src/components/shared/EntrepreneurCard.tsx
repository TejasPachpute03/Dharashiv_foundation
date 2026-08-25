"use client";

import Link from "next/link";
import { MapPin, Briefcase, CheckCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Entrepreneur } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { useAppContext } from "@/context/AppContext";

export function EntrepreneurCard({ entrepreneur, matchPercentage }: { entrepreneur: Entrepreneur, matchPercentage?: number }) {
  const { currentUser, connections, sendConnectionRequest, acceptConnectionRequest, openChat } = useAppContext();
  
  // Find connection status
  const connection = connections.find(c => 
    (c.requesterId === currentUser?.id && c.recipientId === entrepreneur.id) ||
    (c.recipientId === currentUser?.id && c.requesterId === entrepreneur.id)
  );

  let connectAction = "Connect";
  let connectDisabled = false;
  let isConnected = false;

  if (connection) {
    if (connection.status === "Connected") {
      connectAction = "Message";
      connectDisabled = false;
      isConnected = true;
    } else if (connection.requesterId === currentUser?.id) {
      connectAction = "Request Sent";
      connectDisabled = true;
    } else {
      connectAction = "Accept";
    }
  }

  const handleConnect = () => {
    if (isConnected) {
      openChat(entrepreneur.id);
      return;
    }
    if (!connectDisabled) {
      if (connectAction === "Connect") {
        sendConnectionRequest(entrepreneur.id);
      } else if (connectAction === "Accept" && connection) {
        acceptConnectionRequest(connection.id);
      }
    }
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex-1">
        {matchPercentage && (
          <div className="flex justify-end mb-2">
            <Badge variant="success" className="bg-green-100 text-green-800">{matchPercentage}% Match</Badge>
          </div>
        )}
        <div className="flex items-start space-x-4 mb-4">
          <Avatar size="lg" src={entrepreneur.profileImage} fallback={entrepreneur.name.charAt(0)} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground flex flex-wrap items-center gap-1.5">
              <span className="truncate">{entrepreneur.name}</span>
              {entrepreneur.verified && <CheckCircle className="h-4 w-4 text-accent shrink-0" />}
              {entrepreneur.membershipType === "Core Member / Admin" && (
                <Badge variant="secondary" className="text-[10px] py-0 h-4 px-1.5 bg-primary/10 text-primary border-primary/20 shrink-0">
                  Core Member
                </Badge>
              )}
            </h3>
            <div className="mt-1 flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground line-clamp-1">
                {entrepreneur.companyName}
              </span>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {entrepreneur.designation}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-4 text-sm text-muted-foreground">
          <div className="flex items-start">
            <Briefcase className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
            <span className="line-clamp-1">{entrepreneur.category}</span>
          </div>
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
            <span className="line-clamp-1">{entrepreneur.location}</span>
          </div>
        </div>

        <div className="mt-5 text-sm">
          <span className="font-semibold text-foreground">Looking for: </span>
          <span className="text-muted-foreground">
            {entrepreneur.lookingFor.slice(0, 3).join(" | ")}
            {entrepreneur.lookingFor.length > 3 && ` | +${entrepreneur.lookingFor.length - 3}`}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex gap-3 bg-muted/20 mt-auto">
        <Link 
          href={`/dashboard/entrepreneur/${entrepreneur.id}`}
          className={buttonVariants({ variant: "outline", className: "w-full text-sm py-2 h-auto" })}
        >
          View Profile
        </Link>
        <Button 
          className="w-full text-sm py-2 h-auto" 
          variant={connectAction === "Accept" ? "default" : (connectDisabled ? "secondary" : "default")}
          disabled={connectDisabled}
          onClick={handleConnect}
        >
          {connectAction}
        </Button>
      </CardFooter>
    </Card>
  );
}
