"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Search, Bookmark } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { EntrepreneurCard } from "@/components/shared/EntrepreneurCard";
import { Button } from "@/components/ui/Button";

export default function FavouriteProfilesPage() {
  const { entrepreneurs, savedEntrepreneurs } = useAppContext();
  
  const favouriteProfiles = useMemo(() => {
    return entrepreneurs.filter(e => savedEntrepreneurs.includes(e.id));
  }, [entrepreneurs, savedEntrepreneurs]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Favourite Profiles</h2>
        <p className="text-muted-foreground mt-1">Entrepreneurs and businesses you have bookmarked for quick access.</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {favouriteProfiles.length} Favourites Found
        </p>
      </div>

      {favouriteProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favouriteProfiles.map(ent => (
            <EntrepreneurCard key={ent.id} entrepreneur={ent} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border rounded-xl bg-card border-dashed">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <Bookmark className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No favourite profiles yet</h3>
          <p className="text-muted-foreground mb-6">Explore the directory to find and bookmark interesting profiles.</p>
          <Button asChild variant="outline">
            <Link href="/dashboard/directory">Discover Profiles</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
