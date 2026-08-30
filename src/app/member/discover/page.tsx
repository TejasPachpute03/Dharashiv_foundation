"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { EntrepreneurCard } from "@/components/shared/EntrepreneurCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function DirectoryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading directory...</div>}>
      <DirectoryContent />
    </Suspense>
  );
}

function DirectoryContent() {
  const { entrepreneurs, categories, currentUser, connections } = useAppContext();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "");

  useEffect(() => {
    const q = searchParams?.get("q");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedTaluka, setSelectedTaluka] = useState<string>("");
  const [selectedLookingFor, setSelectedLookingFor] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique locations and lookingFor options for filters
  const locations = useMemo(() => {
    const locs = new Set(entrepreneurs.map(e => e.location?.split(",")[0].trim()));
    return Array.from(locs).sort();
  }, [entrepreneurs]);

  const talukas = useMemo(() => {
    const t = new Set(entrepreneurs.map(e => e.address?.taluka).filter(Boolean) as string[]);
    return Array.from(t).sort();
  }, [entrepreneurs]);

  const lookingForOptions = useMemo(() => {
    const options = new Set(entrepreneurs.flatMap(e => e.lookingFor));
    return Array.from(options).sort();
  }, [entrepreneurs]);

  // Filter and sort
  const filteredEntrepreneurs = useMemo(() => {
    const connectedIds = connections
      .filter(c => c.status === "Connected" && (c.requesterId === currentUser?.id || c.recipientId === currentUser?.id))
      .flatMap(c => [c.requesterId, c.recipientId]);

    let result = entrepreneurs.filter(e => 
      e.id !== currentUser?.id && 
      e.status === "Active" &&
      (searchQuery ? true : !connectedIds.includes(e.id))
    );


    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.name?.toLowerCase().includes(q) || 
        e.companyName?.toLowerCase().includes(q) ||
        e.services?.some(s => s?.toLowerCase().includes(q)) ||
        e.category?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(e => e.category === selectedCategory);
    }

    if (selectedLocation) {
      result = result.filter(e => e.location?.includes(selectedLocation) || (e.address?.currentCity && e.address.currentCity.includes(selectedLocation)));
    }

    if (selectedTaluka) {
      result = result.filter(e => e.address?.taluka === selectedTaluka);
    }

    if (selectedLookingFor) {
      result = result.filter(e => e.lookingFor.includes(selectedLookingFor));
    }

    // Sort
    switch (sortBy) {
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      // 'recommended' and 'newest' are somewhat mock since we don't have real dates/algos
      default:
        // keep original order or mock recommended logic
        break;
    }

    return result;
  }, [entrepreneurs, currentUser?.id, connections, searchQuery, selectedCategory, selectedLocation, selectedTaluka, selectedLookingFor, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedTaluka("");
    setSelectedLookingFor("");
    setSortBy("recommended");
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedLocation || selectedLookingFor || selectedTaluka;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Find Entrepreneurs
        </h2>
        <p className="text-muted-foreground mt-1">
          Discover businesses, professionals and potential partners across the network.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by entrepreneur, company, service or keyword..." 
            className="pl-9 bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className={hasActiveFilters ? "border-primary text-primary" : ""}
        >
          <Filter className="mr-2 h-4 w-4" /> Filters
          {hasActiveFilters && <span className="ml-2 flex h-2 w-2 rounded-full bg-primary" />}
        </Button>
      </div>

      {showFilters && (
        <Card className="p-4 border-dashed bg-muted/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Category</label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Location</label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setSelectedTaluka(""); // Reset taluka
                }}
              >
                <option value="">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            {selectedLocation && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Taluka</label>
                <select 
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={selectedTaluka}
                  onChange={(e) => setSelectedTaluka(e.target.value)}
                >
                  <option value="">All Talukas</option>
                  {talukas.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Looking For</label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={selectedLookingFor}
                onChange={(e) => setSelectedLookingFor(e.target.value)}
              >
                <option value="">Anything</option>
                {lookingForOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Sort By</label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest Members</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground">
                <X className="mr-1 h-3 w-3" /> Clear Filters
              </Button>
            </div>
          )}
        </Card>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {filteredEntrepreneurs.length} Entrepreneurs Found
        </p>
      </div>

      {filteredEntrepreneurs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEntrepreneurs.map(ent => (
            <EntrepreneurCard key={ent.id} entrepreneur={ent} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border rounded-xl bg-card border-dashed">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No entrepreneurs found</h3>
          <p className="text-muted-foreground mb-6">Try changing your filters or search terms.</p>
          <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
