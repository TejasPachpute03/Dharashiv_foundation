"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Globe, MapPin, Briefcase, Calendar, Building, CheckCircle, Network, UserPlus, X, Edit } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { MemberFormModal } from "@/components/admin/MemberFormModal";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Entrepreneur } from "@/types";

export default function EntrepreneurProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { entrepreneurs, currentUser, connections, sendConnectionRequest, savedEntrepreneurs, toggleSaved, updateEntrepreneur } = useAppContext();
  
  const [profile, setProfile] = useState<Entrepreneur | null>(null);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isAdmin = currentUser?.role === "Core Member / Admin";

  const handleEditSubmit = (data: Partial<Entrepreneur>) => {
    if (profile) {
      updateEntrepreneur(profile.id, data);
      setProfile({ ...profile, ...data } as Entrepreneur);
    }
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const found = entrepreneurs.find(e => e.id === id);
    if (found) setProfile(found);
  }, [id, entrepreneurs]);

  if (!profile) return <div className="p-8 text-center">Entrepreneur not found.</div>;

  const connection = connections.find(c => 
    (c.requesterId === currentUser?.id && c.recipientId === profile.id) ||
    (c.recipientId === currentUser?.id && c.requesterId === profile.id)
  );

  const profileConnections = connections.filter(c => 
    c.status === "Connected" && (c.requesterId === profile.id || c.recipientId === profile.id)
  );

  let connectAction = "Connect";
  let connectDisabled = false;

  if (connection) {
    if (connection.status === "Connected") {
      connectAction = "Connected";
      connectDisabled = true;
    } else if (connection.requesterId === currentUser?.id) {
      connectAction = "Request Sent";
      connectDisabled = true;
    } else {
      connectAction = "Accept Request";
    }
  }

  const handleConnect = () => {
    if (!connectDisabled && connectAction === "Connect") {
      sendConnectionRequest(profile.id);
    }
  };

  const isSaved = savedEntrepreneurs.includes(profile.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="mb-2 px-0 hover:bg-transparent" asChild>
          <Link href="/dashboard/directory">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden border-none shadow-md">
            <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-700"></div>
            <CardContent className="p-6 relative pt-0">
              <div className="absolute -top-12 left-6 border-4 border-background rounded-full bg-background">
                <Avatar size="xl" src={profile.profileImage} fallback={profile.name.charAt(0)} className="h-24 w-24 text-3xl" />
              </div>
              <div className="pt-20">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                  {profile.verified && <CheckCircle className="h-5 w-5 text-accent" />}
                </div>
                <div className="mt-2">
                  <Badge variant={profile.membershipType === "Core Member / Admin" ? "default" : "secondary"}>
                    {profile.membershipType || "Member"}
                  </Badge>
                </div>
                <p className="text-lg font-medium text-foreground/80 mt-2">{profile.designation}</p>
                <p className="text-muted-foreground flex items-center mt-1">
                  <Building className="h-4 w-4 mr-1.5" />
                  {profile.companyName}
                </p>
                <div className="mt-4 pt-4 border-t space-y-3 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-3 text-primary" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase className="h-4 w-4 mr-3 text-primary" />
                    <span>{profile.category}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-3 text-primary" />
                    <span>Member since {profile.memberSince}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button 
                    className="w-full" 
                    variant={connectAction === "Accept Request" ? "default" : (connectDisabled ? "secondary" : "default")}
                    disabled={connectDisabled}
                    onClick={handleConnect}
                  >
                    {connectAction === "Connect" ? <UserPlus className="mr-2 h-4 w-4" /> : <Network className="mr-2 h-4 w-4" />}
                    {connectAction}
                  </Button>
                  <Button 
                    variant={isSaved ? "secondary" : "outline"} 
                    className="w-full"
                    onClick={() => toggleSaved(profile.id)}
                  >
                    {isSaved ? "Favourited" : "Favourite"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowConnectionsModal(true)}
                  >
                    <Network className="mr-2 h-4 w-4" />
                    Connections ({profileConnections.length})
                  </Button>
                  {isAdmin && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {connection?.status === "Connected" && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-lg">Contact Information</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground mt-0.5 shrink-0" />
                    <a href={`mailto:${profile.email}`} className="text-primary hover:underline break-all">{profile.email}</a>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mr-3 text-muted-foreground mt-0.5 shrink-0" />
                    <span>{profile.phone}</span>
                  </div>
                  {profile.website && (
                    <div className="flex items-start">
                      <Globe className="h-4 w-4 mr-3 text-muted-foreground mt-0.5 shrink-0" />
                      <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="text-primary hover:underline break-all">{profile.website}</a>
                    </div>
                  )}
                  {profile.linkedin && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-3 text-muted-foreground"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">{profile.linkedin}</a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          {(!connection || connection.status !== "Connected") && (
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                <Network className="mx-auto h-8 w-8 mb-2 opacity-20" />
                Connect with {profile.name.split(' ')[0]} to view private contact information.
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-lg border-b pb-2">About Business</h3>
              <p className="text-muted-foreground leading-relaxed">
                {profile.description || "No description provided."}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry</p>
                  <p className="font-medium">{profile.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Years in Business</p>
                  <p className="font-medium">{profile.yearsInBusiness}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-accent-light mb-4">Looking For</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {profile.lookingFor.map((item, i) => (
                  <Badge key={i} variant="outline" className="bg-background border-accent/30 text-foreground py-1 px-3 text-sm font-medium">
                    {item}
                  </Badge>
                ))}
              </div>
              {profile.businessNeeds && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Specific Business Needs:</h4>
                  <p className="text-muted-foreground bg-background p-4 rounded-md border text-sm italic">
                    "{profile.businessNeeds}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-lg">Products & Services</h3>
              <div className="flex flex-wrap gap-2">
                {profile.services.map((service, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1 text-sm font-medium">{service}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-lg">Target Customers</h3>
                <ul className="space-y-2">
                  {profile.targetCustomers.map((cust, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                      {cust}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-lg">Industries Served</h3>
                <ul className="space-y-2">
                  {profile.industriesServed.map((ind, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                      {ind}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Connections Modal */}
      {showConnectionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in">
          <div className="bg-background rounded-xl shadow-lg w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b shrink-0">
              <h3 className="font-semibold text-lg">{profile.name}'s Connections</h3>
              <button onClick={() => setShowConnectionsModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {profileConnections.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No connections found.</p>
              ) : (
                <div className="space-y-4">
                  {profileConnections.map(conn => {
                    const partnerId = conn.requesterId === profile.id ? conn.recipientId : conn.requesterId;
                    const ent = entrepreneurs.find(e => e.id === partnerId);
                    if (!ent) return null;
                    return (
                      <div key={conn.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border">
                        <Avatar src={ent.profileImage} fallback={ent.name.charAt(0)} size="md" />
                        <div className="flex-1 min-w-0">
                          <Link href={`/dashboard/entrepreneur/${ent.id}`} className="font-medium text-foreground hover:underline block truncate" onClick={() => setShowConnectionsModal(false)}>
                            {ent.name}
                          </Link>
                          <p className="text-xs text-muted-foreground truncate">{ent.designation} at {ent.companyName}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Admin */}
      {isAdmin && (
        <MemberFormModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          onSubmit={handleEditSubmit} 
          initialData={profile} 
        />
      )}
    </div>
  );
}
