"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";
import { getDashboardForRole } from "@/lib/route-utils";

export default function LoginPage() {
  const router = useRouter();
  const { login, currentUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Give it a tiny delay for UX
    await new Promise(r => setTimeout(r, 600));

    const result = login(email, password);
    
    if (result.success && result.role) {
      router.push(getDashboardForRole(result.role));
    } else {
      setError(result.error || "Login failed");
      setIsLoading(false);
    }
  };

  const loadDemo = (role: string) => {
    if (role === "student") setEmail("student@demo.com");
    if (role === "business") setEmail("business@demo.com");
    if (role === "member") setEmail("member@demo.com");
    if (role === "admin") setEmail("admin@demo.com");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Dharashiv Foundation Logo" className="h-14 w-14 object-contain rounded-full shadow-sm" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or <Link href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">join the community</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="shadow-lg border border-border/50">
          <CardHeader className="space-y-1 bg-white border-b pb-6 rounded-t-xl">
            <CardTitle className="text-xl">
              Member Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your unified dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 bg-white rounded-b-xl">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">
                  Email Address
                </label>
                <Input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="bg-white border-gray-300 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none text-foreground">
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="bg-white border-gray-300 focus-visible:ring-primary"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-muted-foreground">Demo Accounts</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button variant="outline" onClick={() => loadDemo("student")} className="text-xs px-2 hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors">
                  Student
                </Button>
                <Button variant="outline" onClick={() => loadDemo("business")} className="text-xs px-2 hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors">
                  Business
                </Button>
                <Button variant="outline" onClick={() => loadDemo("member")} className="text-xs px-2 hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors">
                  Member
                </Button>
                <Button variant="outline" onClick={() => loadDemo("admin")} className="text-xs px-2 hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors">
                  Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
