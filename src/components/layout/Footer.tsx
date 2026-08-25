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
            <p className="text-sm text-muted-foreground">
              A dedicated entrepreneur network connecting businesses, ideas and opportunities.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard/directory" className="hover:text-primary">Discover</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary">How it works</Link></li>
              <li><Link href="/login" className="hover:text-primary">Join Network</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Foundation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/events" className="hover:text-primary">Events</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dharashiv Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
