"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Briefcase, GraduationCap, Building2, Landmark, UserCircle, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";
import { Role } from "@/types";
import { getDashboardForRole } from "@/lib/route-utils";

const roles: { id: Role; label: string; icon: React.ReactNode }[] = [
  { id: "business", label: "Business / Entrepreneur", icon: <Briefcase className="w-6 h-6" /> },
  { id: "student", label: "Student", icon: <GraduationCap className="w-6 h-6" /> },
  { id: "professional", label: "Service / Salaried Professional", icon: <Building2 className="w-6 h-6" /> },
  { id: "government", label: "Government Service", icon: <Landmark className="w-6 h-6" /> },
  { id: "freelancer", label: "Self-Employed / Freelancer", icon: <UserCircle className="w-6 h-6" /> },
  { id: "other", label: "Other", icon: <User className="w-6 h-6" /> },
];

const businessCategories = [
  "Retail & Trading", "Manufacturing", "Agriculture & Allied", "Food & Beverage", 
  "Construction & Infrastructure", "Technology & IT", "Healthcare", "Education", 
  "Finance & Accounting", "Professional Services", "Transport & Logistics", 
  "Hospitality & Tourism", "Real Estate", "Media & Creative", "Textile & Garments", 
  "Beauty & Wellness", "Automobile", "Energy", "Social / NGO", "Other"
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "", gaon: "", taluka: "", district: "", currentCity: "",
    dob: "", gender: "", whatsappMobile: "", callingMobile: "", email: "",
    role: "" as Role | "",
    businessCategory: "", businessType: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (roleId: Role) => {
    setFormData({ ...formData, role: roleId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.role) {
      setError("Please select a role.");
      return;
    }

    if (formData.role === "business" && !formData.businessCategory) {
      setError("Please select a Business Category.");
      return;
    }

    setIsLoading(true);

    // Simulate network request
    await new Promise(r => setTimeout(r, 800));

    const result = register({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      gaon: formData.gaon,
      taluka: formData.taluka,
      district: formData.district,
      currentCity: formData.currentCity,
      dob: formData.dob,
      gender: formData.gender,
      whatsappMobile: formData.whatsappMobile,
      callingMobile: formData.callingMobile,
      businessCategory: formData.businessCategory,
      businessType: formData.businessType,
      // Minimal defaults to satisfy Entrepreneur interface
      designation: formData.role === "business" ? "Owner" : "Member",
      companyName: formData.businessType || "N/A",
      industry: formData.businessCategory || "General",
      location: formData.currentCity,
      profileImage: "",
      verified: false,
      memberSince: new Date().toISOString(),
      status: "Active",
      description: "",
      services: [],
      targetCustomers: [],
      industriesServed: [],
      lookingFor: [],
      businessNeeds: "",
      phone: formData.callingMobile,
    });

    if (result.success) {
      const destination = getDashboardForRole(formData.role);
      router.push(destination);
    } else {
      setError(result.error || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <img src="/logo.png" alt="Dharashiv Foundation Logo" className="h-16 w-16 mx-auto object-contain rounded-full shadow-md border-2 border-white" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Create Your Foundation Account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join the Dharashiv Foundation community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg shadow-sm">
              {error}
            </div>
          )}

          {/* Section 1: Personal Details */}
          <Card className="shadow-md border-border/50">
            <CardHeader className="bg-white rounded-t-xl border-b pb-4">
              <CardTitle className="text-xl text-foreground">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 bg-white rounded-b-xl grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Name <span className="text-red-500">*</span></label>
                <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="bg-white border-gray-300 focus-visible:ring-primary" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Gaon / Village <span className="text-red-500">*</span></label>
                <Input name="gaon" value={formData.gaon} onChange={handleChange} required placeholder="Your Village" className="bg-white border-gray-300 focus-visible:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Taluka <span className="text-red-500">*</span></label>
                <Input name="taluka" value={formData.taluka} onChange={handleChange} required placeholder="Your Taluka" className="bg-white border-gray-300 focus-visible:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">District <span className="text-red-500">*</span></label>
                <Input name="district" value={formData.district} onChange={handleChange} required placeholder="e.g. Dharashiv" className="bg-white border-gray-300 focus-visible:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Current City <span className="text-red-500">*</span></label>
                <Input name="currentCity" value={formData.currentCity} onChange={handleChange} required placeholder="Where do you live now?" className="bg-white border-gray-300 focus-visible:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date of Birth <span className="text-red-500">*</span></label>
                <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="bg-white border-gray-300 focus-visible:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Gender <span className="text-red-500">*</span></label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">WhatsApp Mobile Number <span className="text-red-500">*</span></label>
                <Input type="tel" name="whatsappMobile" value={formData.whatsappMobile} onChange={handleChange} required placeholder="10-digit number" className="bg-white border-gray-300 focus-visible:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Calling Mobile Number <span className="text-red-500">*</span></label>
                <Input type="tel" name="callingMobile" value={formData.callingMobile} onChange={handleChange} required placeholder="10-digit number" className="bg-white border-gray-300 focus-visible:ring-primary" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Email Address <span className="text-red-500">*</span></label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" className="bg-white border-gray-300 focus-visible:ring-primary" />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Role */}
          <Card className="shadow-md border-border/50 overflow-hidden">
            <CardHeader className="bg-white border-b pb-4">
              <CardTitle className="text-xl text-foreground">What best describes you?</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roles.map((r) => {
                const isSelected = formData.role === r.id;
                return (
                  <div 
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id)}
                    className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-md ${
                      isSelected 
                        ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                        : 'border-border/60 bg-white hover:border-primary/40 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`mr-4 shrink-0 transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/70'}`}>
                      {r.icon}
                    </div>
                    <span className={`font-medium transition-colors ${isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {r.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-primary" />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Section 3: Business Information (Conditional) */}
          {formData.role === "business" && (
            <Card className="shadow-md border-border/50 border-t-4 border-t-primary animate-in fade-in slide-in-from-bottom-4 duration-300">
              <CardHeader className="bg-white border-b pb-4">
                <CardTitle className="text-xl text-foreground">Business Information</CardTitle>
                <CardDescription>Details about your business for the directory</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 bg-white grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Business / Professional Category <span className="text-red-500">*</span></label>
                  <select 
                    name="businessCategory" 
                    value={formData.businessCategory} 
                    onChange={handleChange} 
                    required 
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a Category</option>
                    {businessCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Business Type <span className="text-muted-foreground font-normal">(Optional)</span></label>
                  <Input 
                    name="businessType" 
                    value={formData.businessType} 
                    onChange={handleChange} 
                    placeholder="e.g. Kirana / Grocery Store, IT Consultancy" 
                    className="bg-white border-gray-300 focus-visible:ring-primary" 
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col items-center gap-4 pt-4">
            <Button type="submit" size="lg" disabled={isLoading} className="w-full sm:w-auto min-w-[200px] h-14 rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
