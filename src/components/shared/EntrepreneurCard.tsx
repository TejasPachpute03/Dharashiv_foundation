"use client";

import Link from "next/link";
import { MapPin, Briefcase, CheckCircle, TrendingUp, GraduationCap, Building2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Entrepreneur } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { useAppContext } from "@/context/AppContext";
import { getProfileRoute } from "@/lib/route-utils";

const headerVariants = [
  "linear-gradient(135deg, #FFFDFC 0%, #FFF7EF 45%, #F8F1E8 100%)",
  "linear-gradient(135deg, #FFFCF7 0%, #FDF7F0 45%, #F5EFE7 100%)",
  "linear-gradient(135deg, #FFF8F2 0%, #FDF1E8 45%, #F9EEE4 100%)",
  "linear-gradient(135deg, #FFFFFF 0%, #FCFBF9 45%, #F7F5F2 100%)",
];

export function EntrepreneurCard({ entrepreneur, matchPercentage }: { entrepreneur: Entrepreneur, matchPercentage?: number }) {
  const { currentUser, connections, sendConnectionRequest, acceptConnectionRequest, openChat } = useAppContext();
  
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
  const variantIndex = entrepreneur.name.length % headerVariants.length;
  const headerBg = headerVariants[variantIndex];

  const isBusiness = entrepreneur.role === "business" || (!entrepreneur.role && entrepreneur.membershipType === "Business / Member");
  const isStudent = entrepreneur.role === "student" || (!entrepreneur.role && entrepreneur.membershipType === "Student");
  const isProfessional = entrepreneur.role === "professional" || entrepreneur.role === "government";
  
  const basePath = currentUser ? (
    ["business"].includes(currentUser.role) ? "/dashboard" :
    currentUser.role === "student" ? "/student" :
    currentUser.role === "admin" ? "/admin" : "/member"
  ) : "/dashboard";

  return (
    <Card className="flex flex-col h-full overflow-hidden group">
      <div className="relative p-5 sm:p-6 pb-4 sm:pb-5 border-b border-[#EAE4DC]" style={{ background: headerBg }}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-80"></div>
        <div className="absolute top-0 inset-x-0 h-12 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.4)_0%,_transparent_70%)] pointer-events-none"></div>
        
        {matchPercentage && (
          <div className="absolute top-4 right-4">
            <Badge variant="success" className="bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]/60">{matchPercentage}% Match</Badge>
          </div>
        )}

        <div className="flex items-start space-x-3.5 sm:space-x-4">
          <div className="relative shrink-0">
            <Avatar size="xl" src={entrepreneur.profileImage} fallback={initials} className="w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] object-cover border-[2px] border-[#F3D7BE] shadow-[0_0_0_2px_rgba(255,255,255,0.8),_0_4px_12px_rgba(60,40,20,0.08)] group-hover:scale-[1.02] transition-transform duration-250 font-semibold" />
            {entrepreneur.status === "Active" && (
              <span className="absolute bottom-0 right-0 sm:bottom-0.5 sm:right-0.5 w-[10px] h-[10px] bg-[#16A34A] border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="font-semibold text-[17px] sm:text-[18px] text-neutral-900 flex items-center gap-1.5 leading-tight mb-0.5">
              <span className="truncate">{entrepreneur.name}</span>
              {entrepreneur.verified && <CheckCircle className="h-[14px] w-[14px] text-primary shrink-0" />}
            </h3>
            <div className="flex flex-col gap-0.5">
              {isStudent ? (
                <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 line-clamp-1">Student</span>
              ) : isProfessional ? (
                <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 line-clamp-1">{entrepreneur.companyName}</span>
              ) : (
                <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 line-clamp-1">{entrepreneur.businessType || entrepreneur.companyName}</span>
              )}
              
              {!isStudent && entrepreneur.designation && (
                <span className="text-[13px] sm:text-[14px] text-muted-foreground line-clamp-1">{entrepreneur.designation}</span>
              )}
            </div>
            {(entrepreneur.role === "admin" || entrepreneur.membershipType === "Core Member / Admin") && (
              <div className="mt-2">
                <Badge variant="secondary" className="bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74]/50 rounded-md font-medium px-2 py-0.5 text-[10px] sm:text-[11px] group-hover:scale-[1.02] transition-transform">
                  Core Member
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CardContent className="p-5 sm:p-6 pb-4 sm:pb-5">
        <div>
          <h4 className="text-[11px] font-semibold text-[#817A73] tracking-[0.08em] uppercase mb-2.5">
            {isBusiness ? "Business Information" : isStudent ? "Education" : isProfessional ? "Professional Information" : "Information"}
          </h4>
          <div className="space-y-2 text-[14px] sm:text-[15px] text-neutral-700">
            {isBusiness && (
              <>
                <div className="flex items-center">
                  <Briefcase className="h-[16px] w-[16px] mr-2.5 shrink-0 text-[#9A9188]" />
                  <span className="line-clamp-1 font-medium text-neutral-800">{entrepreneur.businessCategory || entrepreneur.category}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-[16px] w-[16px] mr-2.5 shrink-0 text-[#9A9188]" />
                  <span className="line-clamp-1">{entrepreneur.currentCity || entrepreneur.location}</span>
                </div>
                {entrepreneur.turnoverRange && (
                  <div className="flex items-center">
                    <TrendingUp className="h-[16px] w-[16px] mr-2.5 shrink-0 text-[#9A9188]" />
                    <span className="line-clamp-1">Turnover: {entrepreneur.turnoverRange === "5CRPLUS" ? "5CR+" : entrepreneur.turnoverRange}</span>
                  </div>
                )}
              </>
            )}

            {isStudent && (
              <>
                <div className="flex items-center">
                  <GraduationCap className="h-[16px] w-[16px] mr-2.5 shrink-0 text-[#9A9188]" />
                  <span className="line-clamp-1 font-medium text-neutral-800">{entrepreneur.companyName || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-[16px] w-[16px] mr-2.5 shrink-0 text-[#9A9188]" />
                  <span className="line-clamp-1">{entrepreneur.currentCity || entrepreneur.location}</span>
                </div>
              </>
            )}

            {isProfessional && (
              <>
                <div className="flex items-center">
                  <Building2 className="h-[16px] w-[16px] mr-2.5 shrink-0 text-[#9A9188]" />
                  <span className="line-clamp-1 font-medium text-neutral-800">{entrepreneur.companyName}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-[16px] w-[16px] mr-2.5 shrink-0 text-[#9A9188]" />
                  <span className="line-clamp-1">{entrepreneur.currentCity || entrepreneur.location}</span>
                </div>
              </>
            )}

            {!isBusiness && !isStudent && !isProfessional && (
              <>
                <div className="flex items-center">
                  <MapPin className="h-[16px] w-[16px] mr-2.5 shrink-0 text-[#9A9188]" />
                  <span className="line-clamp-1">{entrepreneur.currentCity || entrepreneur.location}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="my-4 border-t border-[#EAE4DC]"></div>

        <div>
          <h4 className="text-[11px] font-semibold text-[#817A73] tracking-[0.08em] uppercase mb-2">Looking For</h4>
          <div className="text-[14px] font-medium text-neutral-600 flex flex-wrap gap-[4px_8px] leading-relaxed">
            {entrepreneur.lookingFor && entrepreneur.lookingFor.length > 0 ? entrepreneur.lookingFor.map((item, i) => (
              <span key={item} className="flex items-center whitespace-normal">
                <span className="text-neutral-700">{item}</span>
                {i < entrepreneur.lookingFor.length - 1 && <span className="text-[#EAE4DC] ml-2 font-light">|</span>}
              </span>
            )) : (
              <span className="text-neutral-700">Networking</span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-5 sm:px-6 pb-5 sm:pb-6 pt-5 border-t border-[#EAE4DC] flex gap-3 bg-transparent mt-auto">
        <Link 
          href={getProfileRoute(entrepreneur.id, currentUser?.role)}
          className={buttonVariants({ variant: "outline", className: "h-[42px] sm:h-[44px] rounded-[10px] sm:rounded-[12px] w-full flex-1 bg-transparent border-primary/40 text-primary hover:border-primary hover:bg-[#FFFDFC] transition-all duration-200 hover:-translate-y-px" })}
        >
          View Profile
        </Link>
        <Button 
          className="h-[42px] sm:h-[44px] rounded-[10px] sm:rounded-[12px] w-full flex-1 bg-primary text-white hover:bg-[#E65100] transition-all duration-200 hover:-translate-y-px" 
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
