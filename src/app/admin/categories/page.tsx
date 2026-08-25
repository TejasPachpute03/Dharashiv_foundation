"use client";

import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, CheckCircle, XCircle, ChevronDown, ChevronUp, Users } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EntrepreneurCard } from "@/components/shared/EntrepreneurCard";
import { Category } from "@/types";
import { X } from "lucide-react";

export default function AdminCategoriesPage() {
  const { categories, entrepreneurs, addCategory, updateCategory, deleteCategory } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", enabled: true });

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, enabled: category.enabled });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", enabled: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, { name: formData.name, enabled: formData.enabled });
    } else {
      addCategory({ name: formData.name, enabled: formData.enabled });
    }
    handleCloseModal();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
      if (expandedCategoryId === id) setExpandedCategoryId(null);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-[1400px] mx-auto bg-background min-h-screen relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Categories</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage business categories and track usage across members.</p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search categories..." 
              className="pl-9 bg-background h-10 w-full rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button onClick={() => handleOpenModal()} className="rounded-full shrink-0 h-9 px-4 text-sm bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-background border-b border-muted">
              <tr>
                <th className="px-6 py-4 font-semibold w-10"></th>
                <th className="px-6 py-4 font-semibold">Category Name</th>
                <th className="px-6 py-4 font-semibold text-center">Members Count</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => {
                const members = entrepreneurs.filter(e => e.category === category.name);
                const count = members.length;
                const isExpanded = expandedCategoryId === category.id;

                return (
                  <React.Fragment key={category.id}>
                    <tr 
                      className={`border-b border-muted last:border-0 hover:bg-muted/10 transition-colors bg-card cursor-pointer ${isExpanded ? 'bg-muted/5' : ''}`}
                      onClick={() => toggleExpand(category.id)}
                    >
                      <td className="px-6 py-4">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground text-sm">{category.name}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center bg-muted text-muted-foreground font-semibold px-2.5 py-0.5 rounded-full text-xs">
                          {count}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(category);
                            }}
                            className="p-1.5 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-md transition-colors"
                            title="Edit Category"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleDelete(category.id, e)}
                            className="p-1.5 text-red-500/70 hover:text-red-600 bg-red-50/50 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Members Row */}
                    {isExpanded && (
                      <tr className="bg-muted/10 border-b border-muted">
                        <td colSpan={4} className="p-6">
                          <div className="flex items-center mb-4 text-sm font-semibold text-foreground">
                            <Users className="w-4 h-4 mr-2" />
                            Entrepreneurs in {category.name} ({count})
                          </div>
                          
                          {count > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {members.map(member => (
                                <EntrepreneurCard key={member.id} entrepreneur={member} />
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground bg-background rounded-lg border border-dashed">
                              No entrepreneurs found in this category.
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    No categories found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in">
          <div className="bg-background rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg">{editingCategory ? "Edit Category" : "Add Category"}</h3>
              <button onClick={handleCloseModal} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category Name</label>
                <Input 
                  required
                  placeholder="e.g. Technology, Healthcare..." 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="text-sm font-medium block">Status</label>
                  <span className="text-xs text-muted-foreground">Enable or disable this category</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.enabled}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t mt-6">
                <Button type="button" variant="outline" className="flex-1" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingCategory ? "Save Changes" : "Add Category"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
