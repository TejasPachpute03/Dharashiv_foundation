"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, X, Camera } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function EditProfilePage() {
  const router = useRouter();
  const { currentUser, entrepreneurs, updateProfile } = useAppContext();
  
  const [formData, setFormData] = useState<any>(null);
  const [newService, setNewService] = useState("");
  const [newLookingFor, setNewLookingFor] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const profile = entrepreneurs.find(e => e.id === currentUser?.id);
    if (profile) {
      setFormData({ ...profile });
    }
  }, [currentUser, entrepreneurs]);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      address: {
        ...(prev.address || { taluka: "", district: "Dharashiv", currentCity: "" }),
        [name]: value
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Compress image using canvas
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setFormData((prev: any) => ({ ...prev, profileImage: dataUrl }));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayAdd = (field: string, value: string, setter: any) => {
    if (!value.trim()) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...prev[field], value.trim()]
    }));
    setter("");
  };

  const handleArrayRemove = (field: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      updateProfile(currentUser.id, formData);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        router.push("/student/profile");
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/student/profile"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Profile</h2>
          <p className="text-muted-foreground mt-1">Update your personal and business information.</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          Profile updated successfully. Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center sm:flex-row sm:justify-start gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden border-4 border-background shadow-sm">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span>{formData.name?.split(" ").map((n: string) => n[0]).join("").substring(0, 2)}</span>
                )}
              </div>
              <label htmlFor="photo-upload" className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-sm">
                <Camera className="h-4 w-4" />
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-lg">Profile Photo</h3>
              <p className="text-sm text-muted-foreground">Upload a professional photo. JPEG or PNG under 2MB.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Designation</label>
                <Input name="designation" value={formData.designation} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Taluka</label>
                <select 
                  name="taluka" 
                  value={formData.address?.taluka || ""} 
                  onChange={(e) => handleAddressChange(e as any)} 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                >
                  <option value="" disabled>Select Taluka</option>
                  {["Dharashiv", "Tuljapur", "Omerga", "Lohara", "Kalamb", "Bhum", "Paranda", "Washi"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">District</label>
                <Input name="district" value="Dharashiv" readOnly className="bg-muted text-muted-foreground cursor-not-allowed" />
                <p className="text-xs text-muted-foreground mt-1">Platform is exclusive to Dharashiv community.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current City</label>
                <Input name="currentCity" value={formData.address?.currentCity || ""} onChange={handleAddressChange} placeholder="Where are you currently living?" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic & Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">College Name</label>
                <Input name="companyName" value={formData.companyName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input name="location" value={formData.location} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium">About Me</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={4}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </CardContent>
        </Card>



        <Card className="border-accent bg-accent/5">
          <CardHeader>
            <CardTitle className="text-accent-light">Looking For & Business Needs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Specific Business Needs (Be descriptive)</label>
              <textarea 
                name="businessNeeds" 
                value={formData.businessNeeds} 
                onChange={handleChange} 
                rows={3}
                placeholder="e.g., Looking for a digital marketing partner in Pune to scale our e-commerce sales."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium mb-2 block">I am looking for:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {Array.from(new Set([
                  "Business Collaborations", "Strategic Partnerships", "Referrals", "New Clients", 
                  "Investors", "Suppliers", "Distributors", "Mentors", "Networking", "Joint Ventures",
                  ...(formData.lookingFor || [])
                ])).map((opt: string) => {
                  const isSelected = formData.lookingFor.includes(opt);
                  return (
                    <div 
                      key={opt}
                      onClick={() => {
                        if (isSelected) {
                          setFormData((prev: any) => ({ ...prev, lookingFor: prev.lookingFor.filter((i: string) => i !== opt) }));
                        } else {
                          setFormData((prev: any) => ({ ...prev, lookingFor: [...prev.lookingFor, opt] }));
                        }
                      }}
                      className={`cursor-pointer border rounded-md p-3 text-sm text-center transition-colors ${
                        isSelected ? "bg-accent text-accent-foreground border-accent font-medium shadow-sm" : "bg-background hover:bg-muted"
                      }`}
                    >
                      {opt}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <Input 
                  value={newLookingFor} 
                  onChange={(e) => setNewLookingFor(e.target.value)} 
                  placeholder="Add a custom preference..." 
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newLookingFor.trim() && !formData.lookingFor.includes(newLookingFor.trim())) {
                         handleArrayAdd("lookingFor", newLookingFor, setNewLookingFor);
                      } else if (newLookingFor.trim()) {
                         setNewLookingFor("");
                      }
                    }
                  }}
                />
                <Button type="button" onClick={() => {
                  if (newLookingFor.trim() && !formData.lookingFor.includes(newLookingFor.trim())) {
                    handleArrayAdd("lookingFor", newLookingFor, setNewLookingFor);
                  } else if (newLookingFor.trim()) {
                    setNewLookingFor("");
                  }
                }} variant="outline">
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn</label>
                <Input name="linkedin" value={formData.linkedin || ""} onChange={handleChange} placeholder="linkedin.com/in/..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Instagram</label>
                <Input name="instagram" value={formData.instagram || ""} onChange={handleChange} placeholder="instagram.com/..." />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button type="button" variant="outline" asChild>
            <Link href="/student/profile">Cancel</Link>
          </Button>
          <Button type="submit" className="bg-primary text-primary-foreground min-w-[120px]">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
