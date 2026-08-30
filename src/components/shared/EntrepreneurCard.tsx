"use client";

import Link from "next/link";
import { MapPin, Briefcase, CheckCircle, TrendingUp } from "lucide-react";
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

  const initials = entrepreneur.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow bg-card border-border rounded-2xl overflow-hidden">
      <CardContent className="p-6 flex-1">
        {matchPercentage && (
          <div className="flex justify-end mb-2">
            <Badge variant="success" className="bg-green-100 text-green-800">{matchPercentage}% Match</Badge>
          </div>
        )}
        <div className="flex items-start space-x-4 mb-5">
          <Avatar 
            size="xl" 
            src={entrepreneur.profileImage} 
            fallback={initials} 
            className="bg-[#0284c7] text-white font-semibold"
          />
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="font-semibold text-[1.15rem] text-foreground flex items-center gap-1.5 leading-tight mb-1.5">
              <span className="truncate">{entrepreneur.name}</span>
              {entrepreneur.verified && <CheckCircle className="h-4 w-4 text-accent shrink-0" />}
            </h3>
            {entrepreneur.membershipType === "Core Member / Admin" && (
              <div className="mb-2">
                <span className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-600">
                  Core Member
                </span>
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-medium text-foreground line-clamp-1">
                {entrepreneur.companyName}
              </span>
              <span className="text-sm text-muted-foreground line-clamp-1">
                {entrepreneur.designation}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-4 text-[15px] text-muted-foreground">
          <div className="flex items-center">
            <Briefcase className="h-[18px] w-[18px] mr-2 shrink-0 text-muted-foreground" />
            <span className="line-clamp-1">{entrepreneur.category}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-[18px] w-[18px] mr-2 shrink-0 text-muted-foreground" />
            <span className="line-clamp-1">{entrepreneur.location}</span>
          </div>
          {entrepreneur.turnoverRange && (
            <div className="flex items-center">
              <TrendingUp className="h-[18px] w-[18px] mr-2 shrink-0 text-muted-foreground" />
              <span className="line-clamp-1">Turnover: {entrepreneur.turnoverRange === "5CRPLUS" ? "5CR+" : entrepreneur.turnoverRange}</span>
            </div>
          )}
        </div>

        <div className="mt-5 text-[15px] leading-relaxed">
          <span className="font-semibold text-foreground">Looking for: </span>
          <span className="text-muted-foreground">
            {entrepreneur.lookingFor.slice(0, 3).join(" | ")}
            {entrepreneur.lookingFor.length > 3 && ` | +${entrepreneur.lookingFor.length - 3}`}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t border-border/50 flex gap-3 mt-auto bg-transparent">
        <Link 
          href={`/dashboard/entrepreneur/${entrepreneur.id}`}
          className={buttonVariants({ variant: "outline", className: "w-full text-[15px] font-medium py-5 bg-transparent border-gray-200 shadow-none hover:bg-gray-50" })}
        >
          View Profile
        </Link>
        <Button 
          className="w-full text-[15px] font-medium py-5 bg-[#87CEFA] text-black hover:bg-[#7bc5f3] shadow-none" 
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
