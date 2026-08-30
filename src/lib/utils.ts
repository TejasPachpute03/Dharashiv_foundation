import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateProfileCompletion(profile: any): number {
  if (!profile) return 0;
  let score = 0;
  
  // Basic Info (20%)
  if (profile.name) score += 5;
  if (profile.email) score += 5;
  if (profile.phone) score += 5;
  if (profile.profileImage) score += 5;
  
  // Company Info (20%)
  if (profile.companyName) score += 5;
  if (profile.category) score += 5;
  if (profile.industry) score += 5;
  if (profile.location) score += 5;
  
  // Address (15%)
  if (profile.address?.district) score += 5;
  if (profile.address?.taluka) score += 5;
  if (profile.address?.currentCity) score += 5;
  
  // Professional Details (15%)
  if (profile.designation) score += 5;
  if (profile.yearsInBusiness) score += 5;
  if (profile.turnoverRange) score += 5;
  
  // Description & Services (15%)
  if (profile.description) score += 10;
  if (profile.services && profile.services.length > 0) score += 5;
  
  // Business Needs & Looking For (15%)
  if (profile.lookingFor && profile.lookingFor.length > 0) score += 5;
  if (profile.businessNeeds) score += 10;
  
  return Math.min(100, score);
}
