"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Role } from "@/types";
import { getDashboardForRole } from "@/lib/route-utils";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { currentUser } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // If not logged in, redirect to login
    if (!currentUser) {
      router.push("/login");
      return;
    }

    const expectedDashboard = getDashboardForRole(currentUser.role);
    const currentBase = "/" + pathname.split('/')[1];

    if (currentBase === expectedDashboard || (allowedRoles && allowedRoles.includes(currentUser.role))) {
      setIsAuthorized(true);
    } else {
      router.push(expectedDashboard);
    }
  }, [currentUser, allowedRoles, router, pathname]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
