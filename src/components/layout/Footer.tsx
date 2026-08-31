import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white pt-20 pb-10">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-xl tracking-tighter">
                DF
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                Dharashiv<br/><span className="text-primary text-sm leading-none block">Foundation</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Connecting people. Supporting dreams. Building a stronger Dharashiv.
            </p>
          </div>
          
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-6 text-foreground">Platform</h3>
              <ul className="space-y-4 text-muted-foreground font-medium">
                <li><Link href="/#about" className="hover:text-primary transition-colors inline-flex items-center group">About <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
                <li><Link href="/#community" className="hover:text-primary transition-colors inline-flex items-center group">Community <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
                <li><Link href="/#entrepreneurs" className="hover:text-primary transition-colors inline-flex items-center group">Entrepreneurs <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
                <li><Link href="/#events" className="hover:text-primary transition-colors inline-flex items-center group">Events <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
                <li><Link href="/#how-it-works" className="hover:text-primary transition-colors inline-flex items-center group">How It Works <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-foreground">Account</h3>
              <ul className="space-y-4 text-muted-foreground font-medium">
                <li><Link href="/join" className="hover:text-primary transition-colors">Join Foundation</Link></li>
                <li><Link href="/login" className="hover:text-primary transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-foreground">Connect</h3>
              <ul className="space-y-4 text-muted-foreground font-medium">
                <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-muted-foreground">
          <p>© {new Date().getFullYear()} Dharashiv Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
