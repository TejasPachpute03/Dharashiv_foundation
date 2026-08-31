import { Role } from "@/types";

export function getDashboardForRole(role?: string): string {
  if (!role) return "/member"; // safe fallback

  switch (role) {
    case "business":
      return "/dashboard";
    case "student":
      return "/student";
    case "professional":
    case "government":
    case "freelancer":
    case "other":
      return "/member";
    case "admin":
      return "/admin";
    default:
      return "/member";
  }
}
