"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#entrepreneur-network", label: "Network" },
    { href: "/#how-it-works", label: "How It Works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6 lg:px-8 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Dharashiv Foundation Logo" className="h-10 w-10 object-contain rounded-full" />
          <span className="hidden font-bold sm:inline-block">
            Dharashiv Foundation
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 hidden md:block",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>

          </div>
        </div>
      </div>
    </header>
  );
}
