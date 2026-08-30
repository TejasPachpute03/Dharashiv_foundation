import Link from "next/link";
import { Network } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Dharashiv Foundation Logo" className="h-10 w-10 object-contain rounded-full" />
              <span className="font-bold">Dharashiv Foundation</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Connecting people. Supporting dreams. Building a stronger Dharashiv.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3">
            <div>
              <h3 className="font-semibold mb-4 text-sm">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/#about" className="hover:text-primary">About</Link></li>
                <li><Link href="/#community" className="hover:text-primary">Community</Link></li>
                <li><Link href="/#entrepreneurs" className="hover:text-primary">Entrepreneurs</Link></li>
                <li><Link href="/#events" className="hover:text-primary">Events</Link></li>
                <li><Link href="/#announcements" className="hover:text-primary">Announcements</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm">Account</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/login" className="hover:text-primary">Join</Link></li>
                <li><Link href="/login" className="hover:text-primary">Login</Link></li>
                <li><Link href="/#contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dharashiv Foundation. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
