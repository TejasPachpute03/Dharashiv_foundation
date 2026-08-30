"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppContext } from "@/context/AppContext";
import { calculateProfileCompletion } from "@/lib/utils";

interface ProfileCompletionNudgeProps {
  role: 'admin' | 'business' | 'member' | 'student';
}

export function ProfileCompletionNudge({ role }: ProfileCompletionNudgeProps) {
  const { currentUser, entrepreneurs } = useAppContext();
  
  if (!currentUser) return null;
  
  const currentProfile = entrepreneurs.find(e => e.id === currentUser.id);
  if (!currentProfile) return null;
  
  const completion = calculateProfileCompletion(currentProfile);
  
  if (completion >= 100) return null;

  let bgClass = "bg-primary text-primary-foreground";
  let barBgClass = "bg-primary-foreground/20";
  let barFillClass = "bg-accent-light";
  let btnClass = "bg-accent-light text-primary hover:bg-accent-light/90";
  let linkPath = "/dashboard/profile/edit";
  let descText = "Add your exact business needs to reach 100% and improve your matching score.";

  if (role === 'admin') {
    linkPath = "/admin/profile/edit";
  } else if (role === 'member') {
    linkPath = "/member/profile/edit";
  } else if (role === 'student') {
    bgClass = "bg-[#89d6fa] text-slate-900";
    barBgClass = "bg-black/10";
    barFillClass = "bg-[#f39c12]";
    btnClass = "bg-white text-[#f39c12] hover:bg-white/90";
    linkPath = "/student/profile/edit";
    descText = "Add more details to reach 100% and improve your matching score.";
  }

  return (
    <Card className={`${bgClass} border-none shadow-sm mb-6 rounded-xl animate-in fade-in duration-500`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-2 w-full">
            <h3 className="text-xl font-bold">Profile {completion}% Complete</h3>
            <div className={`h-2 w-full ${barBgClass} rounded-full overflow-hidden`}>
              <div className={`h-full ${barFillClass} rounded-full transition-all duration-1000`} style={{ width: `${completion}%` }} />
            </div>
            <p className={`text-sm ${role === 'student' ? 'text-slate-700' : 'text-primary-foreground/80'}`}>
              {descText}
            </p>
          </div>
          <Button className={`shrink-0 ${btnClass}`} asChild>
            <Link href={linkPath}>Complete Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
