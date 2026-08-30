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
              <ProfileCompletionAvatar profile={profile} size={140} strokeWidth={6} ringColorClass="text-primary" />
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
                  {profile.designation}
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="h-4 w-4 mr-1.5" />
                  {profile.category}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button asChild className="px-8 rounded-full">
                <Link href="/member/profile/edit">Edit Profile</Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 border-t pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
              <div className="flex items-start space-x-4 min-w-0">
                <div className="p-2 border rounded-full text-muted-foreground shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email Address</p>
                  <p className="font-medium break-all">{profile.email}</p>
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
                  <Hash className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Member ID</p>
                  <p className="font-medium">DF-{profile.id.replace(/\D/g, '').padStart(4, '0')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 border rounded-full text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Joining Year</p>
                  <p className="font-medium">{profile.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Profile Complete Banner */}
      {completion < 100 && (
        <Card className="bg-primary text-primary-foreground border-none shadow-sm mb-6 rounded-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-2 w-full">
                <h3 className="text-xl font-bold">Profile {completion}% Complete</h3>
                <div className="h-2 w-full bg-primary-foreground/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-light rounded-full" style={{ width: `${completion}%` }} />
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Add your exact business needs to reach 100% and improve your matching score.
                </p>
              </div>
              <Button className="shrink-0 bg-accent-light text-primary hover:bg-accent-light/90" asChild>
                <Link href="/member/profile/edit">Complete Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Rest of the profile details (About, Products, Target Customers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">About Member</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {profile.description || "No description provided."}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Industry</p>
                <p className="font-medium text-sm">{profile.industry}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Status</p>
                <p className="font-medium text-sm">{profile.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-primary mb-4">Looking For</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {profile.lookingFor.map((item, i) => (
                <Badge key={i} variant="outline" className="bg-background border-primary/20 text-foreground py-1 px-3 text-xs font-medium">
                  {item}
                </Badge>
              ))}
            </div>
            {profile.businessNeeds && (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Specific Business Needs:</h4>
                <p className="text-muted-foreground bg-background p-3 rounded-md border border-primary/10 text-sm">
                  "{profile.businessNeeds}"
                </p>
              </div>
            )}
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
