"use client";

import Link from "next/link";
import { Mail, Phone, Calendar, Building, CheckCircle, Hash, Trophy, Eye } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProfileCompletionAvatar } from "@/components/ui/ProfileCompletionAvatar";
import { calculateProfileCompletion } from "@/lib/utils";

export default function MyProfilePage() {
  const { currentUser, entrepreneurs } = useAppContext();
  const profile = entrepreneurs.find(e => e.id === currentUser?.id);

  if (!profile) return <div>Profile not found</div>;

  const completion = calculateProfileCompletion(profile);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-12">
      
      <Card className="overflow-hidden border-none shadow-sm mb-6 rounded-xl">
        {/* Banner */}
        <div className="h-40 bg-secondary w-full relative">
          {/* Avatar overlap */}
          <div className="absolute -bottom-16 left-8">
            <div className="bg-background rounded-full inline-flex p-1 shadow-sm">
              <ProfileCompletionAvatar profile={profile} size={140} strokeWidth={6} ringColorClass="text-[#f39c12]" />
            </div>
          </div>
        </div>

        <CardContent className="p-8 pt-20 bg-background">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                <Badge variant="outline" className="text-success border-success/30 bg-success/10 font-normal">Online</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-2 space-x-4">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1.5" />
                  Student
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button asChild className="px-8 rounded-full">
                <Link href="/student/profile/edit">Edit Profile</Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 border-t pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
              <div className="flex items-start space-x-4 min-w-0">
                <div className="p-2 border rounded-full text-muted-foreground shrink-0">
                  <Building className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">College Name</p>
                  <p className="font-medium break-all">{profile.companyName || "Not Specified"}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 min-w-0">
                <div className="p-2 border rounded-full text-muted-foreground shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="font-medium break-all">{profile.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 border rounded-full text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                  <p className="font-medium">{profile.location || "Not Specified"}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 min-w-0">
                <div className="p-2 border rounded-full text-muted-foreground shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email Address</p>
                  <p className="font-medium break-all">{profile.email}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Profile Complete Banner */}
      {completion < 100 && (
        <Card className="bg-[#89d6fa] text-slate-900 border-none shadow-sm mb-6 rounded-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-2 w-full">
                <h3 className="text-xl font-bold">Profile {completion}% Complete</h3>
                <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f39c12] rounded-full" style={{ width: `${completion}%` }} />
                </div>
                <p className="text-sm text-slate-700">
                  Add more details to reach 100% and improve your matching score.
                </p>
              </div>
              <Button className="shrink-0 bg-white text-[#f39c12] hover:bg-white/90" asChild>
                <Link href="/student/profile/edit">Complete Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Rest of the profile details */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">About Me</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {profile.description || "No description provided."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
