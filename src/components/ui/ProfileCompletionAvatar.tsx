import React from "react";
import { calculateProfileCompletion } from "@/lib/utils";

interface ProfileCompletionAvatarProps {
  profile: any;
  size?: number;
  strokeWidth?: number;
  className?: string;
  ringColorClass?: string;
}

export function ProfileCompletionAvatar({ 
  profile, 
  size = 32, 
  strokeWidth = 2,
  className = "",
  ringColorClass = "text-primary"
}: ProfileCompletionAvatarProps) {
  const completion = calculateProfileCompletion(profile);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (completion / 100) * circumference;
  const innerSize = size - strokeWidth * 3;
  
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg className="absolute inset-0 transform -rotate-90" width={size} height={size}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${ringColorClass} transition-all duration-1000 ease-in-out`}
        />
      </svg>
      <div 
        className="rounded-full overflow-hidden bg-muted flex items-center justify-center shadow-sm" 
        style={{ 
          width: innerSize, 
          height: innerSize 
        }}
      >
        {profile?.profileImage ? (
          <img 
            src={profile.profileImage} 
            alt={profile?.name || "Profile"} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <span className="font-bold text-muted-foreground" style={{ fontSize: innerSize * 0.4 }}>
            {profile?.name?.charAt(0) || "U"}
          </span>
        )}
      </div>
    </div>
  );
}
