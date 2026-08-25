"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Search, Filter, Columns, Download, MoreHorizontal, UserCheck, Calendar, Phone, Activity, XCircle, Clock, Plus, Edit } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MemberFormModal } from "@/components/admin/MemberFormModal";
import { Entrepreneur } from "@/types";

export default function AdminMembersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <AdminMembersContent />
    </Suspense>
  );
}

function AdminMembersContent() {
  const { entrepreneurs, updateEntrepreneurStatus, addEntrepreneur, updateEntrepreneur } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Entrepreneur | null>(null);

  const handleOpenModal = (member?: Entrepreneur) => {
    setEditingMember(member || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleSubmitModal = (data: Partial<Entrepreneur>) => {
    if (editingMember) {
      updateEntrepreneur(editingMember.id, data);
    } else {
      addEntrepreneur(data);
    }
  };

  const filteredMembers = entrepreneurs.filter(e => {
    const matchesSearch = e.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.companyName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
            <UserCheck className="w-3 h-3 mr-1" /> Active
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-600 border border-red-200">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </span>
        );
      case "Inactive":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-300">
            <XCircle className="w-3 h-3 mr-1" /> Inactive
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
            <Activity className="w-3 h-3 mr-1" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-[1400px] mx-auto bg-background min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Registered Members</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage and track your platform's entrepreneurs.</p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients, companies, or emails..." 
              className="pl-9 bg-background h-10 w-full rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <div className="flex items-center bg-muted/50 rounded-full border px-3 py-1.5 shrink-0">
              <Filter className="h-4 w-4 text-muted-foreground mr-2" />
              <select 
                className="bg-transparent text-sm font-medium outline-none text-foreground appearance-none cursor-pointer pr-4"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <Button variant="outline" className="rounded-full shrink-0 h-9 px-4 text-sm bg-background">
              <Columns className="mr-2 h-4 w-4" /> Columns
            </Button>
            <Button variant="outline" className="rounded-full shrink-0 h-9 px-4 text-sm bg-background">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button onClick={() => handleOpenModal()} className="rounded-full shrink-0 h-9 px-4 text-sm bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-background border-b border-muted">
              <tr>
                <th className="px-6 py-4 font-medium font-semibold">Client</th>
                <th className="px-6 py-4 font-medium font-semibold">Contact</th>
                <th className="px-6 py-4 font-medium font-semibold">Join Date</th>
                <th className="px-6 py-4 font-medium font-semibold">Latest Remark</th>
                <th className="px-6 py-4 font-medium font-semibold whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-medium font-semibold text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr 
                  key={member.id} 
                  className="border-b border-muted last:border-0 hover:bg-muted/10 transition-colors bg-card cursor-pointer"
                  onClick={() => router.push(`/dashboard/entrepreneur/${member.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">{member.name}</div>
                        <div className="text-muted-foreground text-xs">{member.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground text-sm">{member.phone}</div>
                    <div className="text-muted-foreground text-xs">{member.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground text-sm">{member.memberSince}</div>
                  </td>
                  <td className="px-6 py-4 max-w-[200px]">
                    <div className="text-muted-foreground text-sm truncate">
                      {member.status === "Pending" ? "Awaiting review for approval." : "Profile active and verified."}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={member.status} />
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <select 
                        className="h-8 rounded border border-input bg-background px-2 text-xs outline-none cursor-pointer"
                        value={member.status === "Active" ? "Active" : "Inactive"}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateEntrepreneurStatus(member.id, e.target.value as any)}
                      >
                        <option value="Active">Activate</option>
                        <option value="Inactive">Deactivate</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No members found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MemberFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmitModal} 
        initialData={editingMember} 
      />
    </div>
  );
}
