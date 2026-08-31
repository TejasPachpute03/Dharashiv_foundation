import { Role } from "@/types";

export function getDashboardForRole(role?: string): string {
  if (!role) return "/member"; // safe fallback

  const normalizedRole = role.toLowerCase().trim();

  if (normalizedRole.includes("business") || normalizedRole.includes("entrepreneur")) {
    return "/dashboard";
  }
  
  if (normalizedRole.includes("student")) {
    return "/student";
  }
  
  if (normalizedRole.includes("admin")) {
    return "/admin";
  }

  // All other roles go to member dashboard
  return "/member";
}

export function getProfileRoute(memberId: string, currentUserRole?: string): string {
  const basePath = getDashboardForRole(currentUserRole);
  return `${basePath}/entrepreneur/${memberId}`;
}
