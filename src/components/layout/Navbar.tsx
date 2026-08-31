"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/#about", label: "About" },
    { href: "/#community", label: "Community" },
    { href: "/#entrepreneurs", label: "Entrepreneurs" },
    { href: "/#events", label: "Events" },
    { href: "/#how-it-works", label: "How It Works" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between px-4 md:px-6 lg:px-8 mx-auto">
        <Link href="/" className="flex items-center space-x-3 z-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-xl tracking-tighter">
            DF
          </div>
          <span className={cn(
            "font-bold text-lg tracking-tight transition-colors duration-300",
            (isScrolled || mobileMenuOpen) ? "text-foreground" : "text-foreground"
          )}>
            Dharashiv<br/><span className="text-primary text-sm leading-none block">Foundation</span>
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary relative group py-2",
                pathname === link.href ? "text-primary font-semibold" : "text-foreground/80"
              )}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="ghost" asChild className="hover:bg-primary/5 hover:text-primary transition-colors font-medium">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-accent text-white shadow-md hover:shadow-lg transition-all font-medium rounded-full px-6">
            <Link href="/join">Join Foundation</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden z-50 p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col px-6 pt-28 pb-6"
          >
            <nav className="flex flex-col space-y-6 text-xl font-medium mb-12">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors border-b border-border/50 pb-4"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-4 mt-auto">
              <Button variant="outline" size="lg" asChild className="w-full justify-center font-medium h-14">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </Button>
              <Button size="lg" asChild className="w-full justify-center bg-primary hover:bg-accent text-white font-medium h-14">
                <Link href="/join" onClick={() => setMobileMenuOpen(false)}>Join Foundation</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
