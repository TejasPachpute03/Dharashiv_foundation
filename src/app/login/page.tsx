"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Network, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAppContext();
  const [role, setRole] = useState<"entrepreneur" | "admin">("entrepreneur");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "entrepreneur") {
      login(email || "entrepreneur@demo.com", "Entrepreneur / Member");
      router.push("/dashboard");
    } else {
      login(email || "nilesh@intechengg.com", "Core Member / Admin");
      router.push("/admin");
    }
  };

  const loadDemo = (demoRole: "entrepreneur" | "admin") => {
    if (demoRole === "entrepreneur") {
      setEmail("entrepreneur@demo.com");
      setPassword("demo123");
      setRole("entrepreneur");
    } else {
      setEmail("nilesh@intechengg.com");
      setPassword("admin123");
      setRole("admin");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
          Or <Link href="/join" className="font-medium text-primary hover:text-primary/80">join the network</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="shadow-lg border-none sm:border-solid">
          <CardHeader className="space-y-1 bg-muted/20 border-b pb-6">
            <div className="flex gap-2 p-1 bg-muted rounded-md mb-4">
              <button
                type="button"
                className={`flex-1 py-1.5 text-sm font-medium rounded-sm transition-all ${
                  role === "entrepreneur" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setRole("entrepreneur")}
              >
                Entrepreneur
              </button>
              <button
                type="button"
                className={`flex-1 py-1.5 text-sm font-medium rounded-sm transition-all ${
                  role === "admin" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setRole("admin")}
              >
                Core Member
              </button>
            </div>
            <CardTitle className="text-xl">
              {role === "entrepreneur" ? "Entrepreneur Login" : "Admin Login"}
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email Address
                </label>
                <Input 
                  type="email" 
                  placeholder={role === "entrepreneur" ? "entrepreneur@demo.com" : "nilesh@intechengg.com"} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-primary hover:text-primary/80">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground">
                Sign In
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => loadDemo("entrepreneur")}
                  className={role === "entrepreneur" ? "border-primary bg-primary/5 text-primary" : ""}
                >
                  Try Entrepreneur
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => loadDemo("admin")}
                  className={role === "admin" ? "border-primary bg-primary/5 text-primary" : ""}
                >
                  Try Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
