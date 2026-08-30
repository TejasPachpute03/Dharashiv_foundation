import Link from "next/link";
import { ArrowRight, Users, Briefcase, Building, Network, LineChart, Globe, Heart, Compass, TrendingUp, Search, Calendar, MapPin, Target, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockEntrepreneurs } from "@/data/mockData";

// Centralized Image Configuration for Dharashiv Foundation
// These Unsplash placeholders should eventually be replaced with official Foundation photography
const foundationImages = {
  hero: "https://images.unsplash.com/photo-1518557973059-e9319e68b376?auto=format&fit=crop&q=80&w=2000", // Dharashiv landscape/roots
  landscape: "https://images.unsplash.com/photo-1621217348981-698f26db12c7?auto=format&fit=crop&q=80&w=800", // Nature/Fort
  community: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800", // People gathering
  students: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800", // Students
  business: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800", // Small business
  farmers: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800", // Farmer/Agriculture
  professionals: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800", // Professionals
  events: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" // Community event
};

export default function LandingPage() {
  const featuredEntrepreneurs = mockEntrepreneurs.slice(0, 4);
  
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden min-h-[85vh] flex items-center py-20 lg:py-32">
          {/* Authentic image background with elegant dark overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={foundationImages.hero} 
              alt="Dharashiv Landscape" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px] mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/90"></div>
          </div>
          
          <div className="container relative z-10 px-4 md:px-6 lg:px-8 mx-auto text-center md:text-left flex flex-col md:items-start justify-center">
            <Badge variant="outline" className="mb-6 text-accent-light border-accent-light bg-primary/20 backdrop-blur-md px-4 py-1.5 uppercase tracking-widest text-xs font-bold self-center md:self-start">
              Dharashiv Foundation
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-white leading-tight">
              Networking.<br/>Connection.<br/><span className="text-accent-light">Support.</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-semibold text-white/90 max-w-3xl mb-4">
              One community. One connection to Dharashiv. Endless possibilities.
            </h2>
            
            <p className="text-lg text-white/70 max-w-2xl mb-10 leading-relaxed">
              Dharashiv Foundation brings together students, professionals, entrepreneurs, employees, businesses and people from Dharashiv to build meaningful connections, discover opportunities and support one another.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-accent-light text-black hover:bg-white hover:text-black transition-all text-base px-8 h-14" asChild>
                <Link href="/join">Join Dharashiv Foundation</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all text-base px-8 h-14" asChild>
                <a href="#entrepreneurs">Explore the Community</a>
              </Button>
            </div>
          </div>
        </section>

        {/* 2. OUR ROOTS CONNECT US (Emotional Visual Story) */}
        <section className="py-24 bg-background">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-primary">
                  Our roots connect us.
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Whether you live in Dharashiv, Pune, Mumbai, another city or another country, your connection with Dharashiv remains a part of who you are.
                  </p>
                  <p>
                    Dharashiv Foundation brings that community together — to connect people, share opportunities, support dreams and create a stronger future for Dharashiv.
                  </p>
                </div>
              </div>
              
              {/* Editorial Masonry/Grid */}
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                <div className="grid grid-rows-2 gap-4">
                  <img src={foundationImages.landscape} alt="Dharashiv Landscape" className="w-full h-full object-cover rounded-2xl shadow-sm" />
                  <img src={foundationImages.farmers} alt="Dharashiv Farmers" className="w-full h-full object-cover rounded-2xl shadow-sm" />
                </div>
                <div className="grid grid-rows-3 gap-4">
                  <img src={foundationImages.students} alt="Students" className="w-full h-full object-cover rounded-2xl shadow-sm row-span-2" />
                  <img src={foundationImages.community} alt="Community Gathering" className="w-full h-full object-cover rounded-2xl shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT IS DHARASHIV FOUNDATION? */}
        <section id="about" className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto text-center">
            <p className="text-sm font-bold tracking-widest text-accent uppercase mb-4">One Community, Many Journeys</p>
            <h2 className="text-4xl font-bold tracking-tight mb-6 text-primary">What is Dharashiv Foundation?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
              Dharashiv Foundation is a community platform created to bring together people connected to Dharashiv — regardless of their profession, age, background or current location.
            </p>

            {/* Inclusivity Visual Representation */}
            <div className="relative max-w-4xl mx-auto py-12">
              <div className="absolute top-1/2 left-0 w-full h-px bg-border -z-10 -translate-y-1/2 hidden md:block"></div>
              <div className="absolute top-0 left-1/2 w-px h-full bg-border -z-10 -translate-x-1/2 hidden md:block"></div>
              
              <div className="bg-primary text-white rounded-full w-40 h-40 flex items-center justify-center mx-auto shadow-xl z-10 relative mb-12 md:mb-0 border-8 border-background">
                <div className="text-center">
                  <span className="block font-bold text-lg leading-tight">Dharashiv<br/>Foundation</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:absolute md:inset-0 md:h-full md:w-full items-center">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-border/50 md:absolute md:-top-6 md:left-10 text-center font-medium">Students</div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-border/50 md:absolute md:-top-6 md:right-10 text-center font-medium">Professionals</div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-border/50 md:absolute md:-bottom-6 md:left-10 text-center font-medium">Businesses</div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-border/50 md:absolute md:-bottom-6 md:right-10 text-center font-medium">Farmers</div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-border/50 col-span-2 md:col-span-1 md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2 md:translate-x-full text-center font-medium">Entrepreneurs</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHY ARE WE BUILDING IT? (Four Pillars) */}
        <section className="py-24 bg-background">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-primary">Why are we building it?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Because strong communities create stronger opportunities.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1: Connect */}
              <Card className="border-none shadow-md hover:shadow-lg transition-all group overflow-hidden bg-white">
                <div className="h-2 bg-blue-500 w-full transform origin-left transition-transform group-hover:scale-x-100"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-500">
                    <Network className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-primary">Connect</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Connect with people who share your roots and interests.
                  </p>
                </CardContent>
              </Card>

              {/* Pillar 2: Support */}
              <Card className="border-none shadow-md hover:shadow-lg transition-all group overflow-hidden bg-white">
                <div className="h-2 bg-rose-500 w-full transform origin-left transition-transform group-hover:scale-x-100"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors text-rose-500">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-primary">Support</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Support students, businesses, professionals and the community.
                  </p>
                </CardContent>
              </Card>

              {/* Pillar 3: Discover */}
              <Card className="border-none shadow-md hover:shadow-lg transition-all group overflow-hidden bg-white">
                <div className="h-2 bg-amber-500 w-full transform origin-left transition-transform group-hover:scale-x-100"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors text-amber-500">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-primary">Discover</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Discover people, opportunities, events and resources.
                  </p>
                </CardContent>
              </Card>

              {/* Pillar 4: Grow Together */}
              <Card className="border-none shadow-md hover:shadow-lg transition-all group overflow-hidden bg-white">
                <div className="h-2 bg-green-500 w-full transform origin-left transition-transform group-hover:scale-x-100"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors text-green-500">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-primary">Grow Together</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Create relationships that can lead to learning, jobs, businesses and meaningful collaboration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 5. COMMUNITY MEMBERS SECTION */}
        <section id="community" className="py-24 bg-primary text-white">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center max-w-3xl mx-auto">
              A community for everyone connected to Dharashiv.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <GraduationCap className="w-8 h-8 text-accent-light mb-4" />
                <h3 className="text-xl font-bold mb-2">Students</h3>
                <p className="text-white/70 text-sm">Learn, connect and discover opportunities.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <Briefcase className="w-8 h-8 text-accent-light mb-4" />
                <h3 className="text-xl font-bold mb-2">Professionals</h3>
                <p className="text-white/70 text-sm">Build relationships and exchange knowledge.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <Target className="w-8 h-8 text-accent-light mb-4" />
                <h3 className="text-xl font-bold mb-2">Entrepreneurs</h3>
                <p className="text-white/70 text-sm">Discover partners, customers and business opportunities.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <Building className="w-8 h-8 text-accent-light mb-4" />
                <h3 className="text-xl font-bold mb-2">Businesses</h3>
                <p className="text-white/70 text-sm">Find talent, partnerships and support.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <Users className="w-8 h-8 text-accent-light mb-4" />
                <h3 className="text-xl font-bold mb-2">Community Members</h3>
                <p className="text-white/70 text-sm">Stay connected and contribute to Dharashiv.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ENTREPRENEUR NETWORK PREVIEW */}
        <section id="entrepreneurs" className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">Discover the people in your network.</h2>
                <p className="text-xl text-muted-foreground">Meet people. Discover possibilities.</p>
              </div>
              <Button variant="outline" size="lg" className="shrink-0 bg-white" asChild>
                <Link href="/login">Explore the Community <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEntrepreneurs.map((ent) => (
                <Card key={ent.id} className="overflow-hidden transition-all hover:shadow-lg border-border/50 bg-white group">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img src={ent.profileImage} alt={ent.name} className="h-14 w-14 rounded-full bg-muted object-cover border-2 border-background shadow-sm group-hover:scale-105 transition-transform" />
                        <div>
                          <h3 className="font-bold text-primary truncate" title={ent.name}>{ent.name}</h3>
                          <p className="text-xs text-muted-foreground font-medium truncate" title={ent.designation}>{ent.designation}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="font-medium text-sm text-primary truncate" title={ent.companyName}>{ent.companyName}</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-1.5"></span>
                          {ent.category || "Uncategorized"}
                        </p>
                      </div>
                      <div className="mb-4 text-xs text-muted-foreground space-y-2">
                        <p className="flex items-center"><MapPin className="w-3 h-3 mr-1.5" /> <span className="truncate">{ent.location?.split(',')[0] || "Location not specified"}</span></p>
                        <p className="truncate"><strong>Looking for:</strong> {ent.lookingFor?.[0] || "Opportunities"}</p>
                      </div>
                    </div>
                    <div className="border-t bg-muted/20 p-3 flex">
                      <Button variant="ghost" className="w-full text-xs font-semibold hover:bg-primary/5 hover:text-primary" asChild>
                        <Link href="/login">View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 7. HOW IT WORKS (Redesigned) */}
        <section id="how-it-works" className="py-24 bg-background">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">How the community works</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 relative">
              <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-border -z-10"></div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-muted shadow-sm flex items-center justify-center text-xl font-bold mb-6 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all text-primary">
                  01
                </div>
                <h3 className="font-bold text-xl mb-2 text-primary">Join</h3>
                <p className="text-muted-foreground">Create your Dharashiv Foundation profile.</p>
              </div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-muted shadow-sm flex items-center justify-center text-xl font-bold mb-6 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all text-primary">
                  02
                </div>
                <h3 className="font-bold text-xl mb-2 text-primary">Discover</h3>
                <p className="text-muted-foreground">Find people, businesses, opportunities and events.</p>
              </div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-muted shadow-sm flex items-center justify-center text-xl font-bold mb-6 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all text-primary">
                  03
                </div>
                <h3 className="font-bold text-xl mb-2 text-primary">Connect</h3>
                <p className="text-muted-foreground">Build meaningful relationships with people in the community.</p>
              </div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-muted shadow-sm flex items-center justify-center text-xl font-bold mb-6 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all text-primary">
                  04
                </div>
                <h3 className="font-bold text-xl mb-2 text-primary">Contribute</h3>
                <p className="text-muted-foreground">Support others and create opportunities together.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. OPPORTUNITIES SECTION */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">One connection can lead to many possibilities.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A connection isn't just a connection. It can become an opportunity.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {['Learning', 'Jobs', 'Mentorship', 'Business', 'Partnerships', 'Referrals', 'Community Support', 'Events'].map((item) => (
                <div key={item} className="bg-white border border-border/50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow font-medium text-primary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. STAY CONNECTED (Events Component) */}
        <section id="events" className="py-24 bg-background">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">Stay connected.</h2>
                <p className="text-xl text-muted-foreground">Upcoming events, announcements, and activities.</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/login">View Community Updates</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white hover:shadow-md transition-shadow border-border/50">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20" variant="secondary">Event</Badge>
                  <h3 className="text-xl font-bold mb-2">Entrepreneur Networking Meet</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center"><Calendar className="w-4 h-4 mr-2" /> Next Saturday, 10:00 AM</p>
                  <p className="text-muted-foreground text-sm">Join local founders and business owners for a morning of networking and collaboration.</p>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-md transition-shadow border-border/50">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-accent/20 text-accent-dark hover:bg-accent/30" variant="secondary">Gathering</Badge>
                  <h3 className="text-xl font-bold mb-2">Community Gathering</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center"><Calendar className="w-4 h-4 mr-2" /> August 15th, 5:00 PM</p>
                  <p className="text-muted-foreground text-sm">A celebration of our community's achievements over the past year. Open to all members.</p>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-md transition-shadow border-border/50">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-green-500/10 text-green-700 hover:bg-green-500/20" variant="secondary">Session</Badge>
                  <h3 className="text-xl font-bold mb-2">Student Opportunity Session</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center"><Calendar className="w-4 h-4 mr-2" /> September 1st, 2:00 PM</p>
                  <p className="text-muted-foreground text-sm">Mentorship and career guidance for college students from experienced professionals.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 10. FINAL EMOTIONAL CTA */}
        <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="network-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#network-pattern)" />
            </svg>
          </div>
          
          <div className="container relative z-10 px-4 md:px-6 lg:px-8 mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
              Your roots.<br/>Your people.<br/><span className="text-accent-light">Your opportunities.</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              No matter where life takes you, your connection with Dharashiv can bring you closer to people, ideas and opportunities that matter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-accent-light text-black hover:bg-white text-base px-8 h-14" asChild>
                <Link href="/join">Join Dharashiv Foundation</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 text-base px-8 h-14" asChild>
                <Link href="/login">Explore the Community</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
