import Link from "next/link";
import { ArrowRight, Users, Briefcase, Building, Network, LineChart, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockEntrepreneurs } from "@/data/mockData";

export default function LandingPage() {
  const featuredEntrepreneurs = mockEntrepreneurs.slice(0, 3);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 lg:py-32">
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
          <div className="container relative z-10 px-4 md:px-6 lg:px-8 mx-auto text-center">
            <Badge variant="secondary" className="mb-6">Dharashiv Foundation</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
              Connect. Collaborate. <span className="text-accent-light">Grow.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              A dedicated entrepreneur network connecting businesses, ideas and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-accent-light text-black hover:bg-accent-light/90" asChild>
                <Link href="/login">Join the Network</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="#entrepreneur-network">Explore Entrepreneurs</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="about" className="py-20 bg-background">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Join the Network?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Build valuable relationships and grow your business with a trusted community.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Discover Entrepreneurs", icon: <Users className="h-6 w-6 text-accent" /> },
                { title: "Build Valuable Connections", icon: <Network className="h-6 w-6 text-accent" /> },
                { title: "Find Business Collaborations", icon: <Briefcase className="h-6 w-6 text-accent" /> },
                { title: "Generate Referrals", icon: <LineChart className="h-6 w-6 text-accent" /> },
                { title: "Showcase Your Business", icon: <Building className="h-6 w-6 text-accent" /> },
                { title: "Stay Connected With the Community", icon: <Globe className="h-6 w-6 text-accent" /> },
              ].map((benefit, i) => (
                <Card key={i} className="border-none shadow-sm bg-muted/50 transition-all hover:bg-muted">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-background rounded-full shadow-sm">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{benefit.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Four simple steps to unlock your next business opportunity.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 -translate-y-1/2"></div>
              {[
                { step: "01", title: "Create Your Profile" },
                { step: "02", title: "Discover Entrepreneurs" },
                { step: "03", title: "Connect With Businesses" },
                { step: "04", title: "Build Opportunities" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-6 border-4 border-background">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section id="entrepreneur-network" className="py-20 bg-background">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Entrepreneur Network</h2>
                <p className="text-muted-foreground">Discover businesses across Maharashtra.</p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0" asChild>
                <Link href="/login">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEntrepreneurs.map((ent) => (
                <Card key={ent.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img src={ent.profileImage} alt={ent.name} className="h-16 w-16 rounded-full bg-muted object-cover" />
                        <div>
                          <h3 className="font-semibold text-lg">{ent.name}</h3>
                          <p className="text-sm text-muted-foreground">{ent.designation}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="font-medium">{ent.companyName}</p>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2"></span>
                          {ent.category}
                        </p>
                      </div>
                      <div className="mb-4 text-sm text-muted-foreground">
                        <p className="mb-1">📍 {ent.location}</p>
                        <p><strong>Looking for:</strong> <span className="line-clamp-1">{ent.lookingFor.join(" • ")}</span></p>
                      </div>
                    </div>
                    <div className="border-t bg-muted/30 p-4 flex gap-3">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href="/login">View Profile</Link>
                      </Button>
                      <Button className="flex-1" asChild>
                        <Link href="/login">Connect</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Your next business opportunity could be one connection away.
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10">
              Join hundreds of entrepreneurs already building relationships within the Dharashiv Foundation network.
            </p>
            <Button size="lg" className="bg-accent-light text-black hover:bg-accent-light/90 text-lg px-8 py-6 h-auto" asChild>
              <Link href="/login">Join the Entrepreneur Network</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
