"use client";

import { useState, useEffect } from "react";
import { Entrepreneur } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Entrepreneur>) => void;
  initialData?: Entrepreneur | null;
}

export function MemberFormModal({ isOpen, onClose, onSubmit, initialData }: MemberFormModalProps) {
  const [formData, setFormData] = useState<Partial<Entrepreneur>>({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    designation: "",
    category: "",
    location: "",
    membershipType: "Entrepreneur / Member",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        designation: "",
        category: "",
        location: "",
        membershipType: "Entrepreneur / Member",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <div className="bg-card w-full max-w-2xl rounded-xl shadow-lg border flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{initialData ? "Edit Member" : "Add New Member"}</h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <form id="member-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input required name="name" value={formData.name || ""} onChange={handleChange} placeholder="e.g. John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input required type="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input required name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input required name="companyName" value={formData.companyName || ""} onChange={handleChange} placeholder="Doe Enterprises" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Designation</label>
                <Input required name="designation" value={formData.designation || ""} onChange={handleChange} placeholder="CEO / Founder" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input required name="category" value={formData.category || ""} onChange={handleChange} placeholder="e.g. Technology" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input required name="location" value={formData.location || ""} onChange={handleChange} placeholder="Pune, Maharashtra" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Membership Type</label>
                <select 
                  required
                  name="membershipType" 
                  value={formData.membershipType} 
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Entrepreneur / Member">Entrepreneur / Member</option>
                  <option value="Core Member / Admin">Core Member / Admin</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t bg-muted/20 flex justify-end gap-3 rounded-b-xl">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="member-form">{initialData ? "Save Changes" : "Add Member"}</Button>
        </div>
      </div>
    </div>
  );
}
