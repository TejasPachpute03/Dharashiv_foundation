"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Network, Calendar, ChevronRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { mockEntrepreneurs } from "@/data/mockData";
import { motion, Variants, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";

// Centralized Image Configuration
const foundationImages = {
  heroLandscape: "/images/dharashiv-night.png",
  rootsLarge: "https://images.unsplash.com/photo-1621217348981-698f26db12c7?auto=format&fit=crop&q=80&w=1200",
  rootsSmall1: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
  rootsSmall2: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800",
  students: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
  professionals: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
  entrepreneurs: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800",
  businesses: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=800",
  community: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800"
};

// Base Animations
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// ---------------------------------------------------------
// SECTION COMPONENTS
// ---------------------------------------------------------

function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true); // default true to avoid hydration mismatch
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldDisableParallax = prefersReducedMotion || isMobile;
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", shouldDisableParallax ? "0%" : "15%"]);

  return (
    <section ref={ref} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-5 xl:col-span-5 max-w-2xl">
            <motion.p variants={fadeInUp} className="text-sm font-bold tracking-widest text-primary uppercase mb-6">
              Dharashiv Foundation
            </motion.p>
            
            {/* Staggered Word Reveal */}
            <motion.h1 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }} 
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground leading-[1.1]"
            >
              <motion.div variants={fadeInUp}>Networking.</motion.div>
              <motion.div variants={fadeInUp} className="text-primary">Connection.</motion.div>
              <motion.div variants={fadeInUp}>Support.</motion.div>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-medium text-foreground/80 mb-6 max-w-xl">
              One community. One connection to Dharashiv. Endless possibilities.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Dharashiv Foundation brings together students, professionals, entrepreneurs, employees, businesses and people from Dharashiv to build meaningful connections, discover opportunities and support one another.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-accent transition-colors text-base px-8 h-14 rounded-full shadow-lg hover:shadow-xl" asChild>
                <Link href="/join">Join Dharashiv Foundation</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-muted transition-colors text-base px-8 h-14 rounded-full" asChild>
                <a href="#community">Explore the Community</a>
              </Button>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-12 flex items-center space-x-4">
              <div className="h-px bg-border flex-1 max-w-[100px]"></div>
              <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Connected by Dharashiv</p>
              <div className="h-px bg-border flex-1 max-w-[100px]"></div>
            </motion.div>
          </motion.div>

          {/* Hero Imagery */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full mt-10 lg:mt-0 lg:col-span-7 xl:col-span-7 aspect-video"
          >
            <motion.div 
              initial={{ scale: 1.03 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-border"
            >
              <motion.div className="absolute inset-0">
                <Image src={foundationImages.heroLandscape} alt="Dharashiv Community" fill priority className="object-cover object-center" sizes="(max-width: 768px) 100vw, 60vw" />
              </motion.div>
              <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RootsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldDisableParallax = prefersReducedMotion || isMobile;
  const y1 = useTransform(scrollYProgress, [0, 1], ["0px", shouldDisableParallax ? "0px" : "-30px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0px", shouldDisableParallax ? "0px" : "20px"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0px", shouldDisableParallax ? "0px" : "-15px"]);

  return (
    <section ref={ref} className="py-24 bg-muted overflow-hidden">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="max-w-xl">
            <motion.p variants={fadeInUp} className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Our Roots Connect Us</motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-foreground leading-[1.1]">
              Our roots <br/>connect us.
            </motion.h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <motion.p variants={fadeInUp}>
                Whether you live in Dharashiv, Pune, Mumbai, another city or another country, your connection with Dharashiv remains a part of who you are.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Dharashiv Foundation brings that community together — to connect people, share opportunities, support dreams and create a stronger future for Dharashiv.
              </motion.p>
            </div>
          </div>
          
          <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[500px] lg:h-[600px]">
            <motion.div variants={fadeInUp} className="col-span-12 md:col-span-8 row-span-2 relative rounded-3xl overflow-hidden shadow-lg bg-border">
              <motion.div style={{ y: y1 }} className="absolute inset-0 -top-10 -bottom-10">
                <Image src={foundationImages.rootsLarge} alt="Dharashiv Roots" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </motion.div>
            </motion.div>
            <motion.div variants={fadeInUp} className="hidden md:block col-span-4 row-span-1 relative rounded-3xl overflow-hidden shadow-md bg-border">
              <motion.div style={{ y: y2 }} className="absolute inset-0 -top-6 -bottom-6">
                <Image src={foundationImages.rootsSmall1} alt="Community" fill className="object-cover" sizes="25vw" />
              </motion.div>
            </motion.div>
            <motion.div variants={fadeInUp} className="hidden md:block col-span-4 row-span-1 relative rounded-3xl overflow-hidden shadow-md bg-border">
              <motion.div style={{ y: y3 }} className="absolute inset-0 -top-6 -bottom-6">
                <Image src={foundationImages.rootsSmall2} alt="Agriculture" fill className="object-cover" sizes="25vw" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ConnectionSection() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.2 } 
    }
  };

  const nodeVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="container px-4 md:px-6 lg:px-8 mx-auto text-center">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
          <motion.p variants={fadeInUp} className="text-sm font-bold tracking-widest text-primary uppercase mb-4">What is Dharashiv Foundation?</motion.p>
          <motion.p variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground max-w-4xl mx-auto leading-tight mb-24">
            Dharashiv Foundation is a community platform created to bring together people connected to Dharashiv — regardless of their profession, age, background or current location.
          </motion.p>

          <div className="relative max-w-5xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center">
            
            {/* SVG Connections (Desktop only) */}
            <div className="hidden md:block absolute inset-0 pointer-events-none -z-10">
              <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {!prefersReducedMotion ? (
                  <>
                    <motion.path variants={pathVariants} d="M500 250 L200 120" stroke="#F97316" strokeWidth="2" strokeDasharray="6 6" />
                    <motion.path variants={pathVariants} d="M500 250 L800 120" stroke="#F97316" strokeWidth="2" strokeDasharray="6 6" />
                    <motion.path variants={pathVariants} d="M500 250 L200 380" stroke="#F97316" strokeWidth="2" strokeDasharray="6 6" />
                    <motion.path variants={pathVariants} d="M500 250 L800 380" stroke="#F97316" strokeWidth="2" strokeDasharray="6 6" />
                    <motion.path variants={pathVariants} d="M500 250 L900 250" stroke="#F97316" strokeWidth="2" strokeDasharray="6 6" />
                  </>
                ) : (
                  <>
                    <path d="M500 250 L200 120" stroke="#e5e7eb" strokeWidth="2" />
                    <path d="M500 250 L800 120" stroke="#e5e7eb" strokeWidth="2" />
                    <path d="M500 250 L200 380" stroke="#e5e7eb" strokeWidth="2" />
                    <path d="M500 250 L800 380" stroke="#e5e7eb" strokeWidth="2" />
                    <path d="M500 250 L900 250" stroke="#e5e7eb" strokeWidth="2" />
                  </>
                )}
              </svg>
            </div>

            <motion.div variants={nodeVariants} className="bg-white border-2 border-primary rounded-full w-48 h-48 flex items-center justify-center shadow-xl z-10 relative">
              <div className="text-center">
                <span className="block font-bold text-xl leading-tight text-foreground">Dharashiv<br/><span className="text-primary">Foundation</span></span>
              </div>
            </motion.div>

            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-5 gap-6 items-center px-4 pointer-events-none">
              <motion.div variants={nodeVariants} className="bg-white pointer-events-auto px-6 py-4 rounded-2xl shadow-sm border border-border md:absolute md:top-20 md:left-32 text-center font-bold text-foreground transition-shadow hover:shadow-md">Students</motion.div>
              <motion.div variants={nodeVariants} className="bg-white pointer-events-auto px-6 py-4 rounded-2xl shadow-sm border border-border md:absolute md:top-20 md:right-32 text-center font-bold text-foreground transition-shadow hover:shadow-md">Professionals</motion.div>
              <motion.div variants={nodeVariants} className="bg-white pointer-events-auto px-6 py-4 rounded-2xl shadow-sm border border-border md:absolute md:bottom-20 md:left-32 text-center font-bold text-foreground transition-shadow hover:shadow-md">Businesses</motion.div>
              <motion.div variants={nodeVariants} className="bg-white pointer-events-auto px-6 py-4 rounded-2xl shadow-sm border border-border md:absolute md:bottom-20 md:right-32 text-center font-bold text-foreground transition-shadow hover:shadow-md">Farmers</motion.div>
              <motion.div variants={nodeVariants} className="bg-white pointer-events-auto px-6 py-4 rounded-2xl shadow-sm border border-border col-span-2 md:col-span-1 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-10 text-center font-bold text-foreground transition-shadow hover:shadow-md">Community</motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// MAIN EXPORT
// ---------------------------------------------------------
export default function LandingPage() {
  const featuredEntrepreneurs = mockEntrepreneurs.slice(0, 4);
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="flex min-h-screen flex-col font-sans bg-white selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        
        <HeroSection />
        <RootsSection />
        <ConnectionSection />

        {/* 4. WHY ARE WE BUILDING IT? */}
        <section className="py-32 bg-muted">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              <div className="lg:w-1/3">
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                  Why are we building it?
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-xl text-muted-foreground font-medium">
                  Because strong communities create stronger opportunities.
                </motion.p>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {[
                  { num: "01", title: "Connect", desc: "Connect with people who share your roots and interests." },
                  { num: "02", title: "Support", desc: "Support students, businesses, professionals and the community." },
                  { num: "03", title: "Discover", desc: "Discover people, opportunities, events and resources." },
                  { num: "04", title: "Grow Together", desc: "Create relationships that can lead to learning, jobs, businesses and meaningful collaboration." }
                ].map((pillar, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="group cursor-default">
                    <div className="text-primary font-bold text-lg mb-4 opacity-50 transition-opacity">— {pillar.num}</div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground transition-colors">{pillar.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{pillar.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. COMMUNITY SECTION */}
        <section id="community" className="py-32 bg-white">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center max-w-3xl mx-auto text-foreground">
                A community for everyone connected to Dharashiv.
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { img: foundationImages.students, title: "Students", desc: "Learn, connect and discover opportunities." },
                  { img: foundationImages.professionals, title: "Professionals", desc: "Build relationships and exchange knowledge." },
                  { img: foundationImages.entrepreneurs, title: "Entrepreneurs", desc: "Discover partners, customers and opportunities." },
                  { img: foundationImages.businesses, title: "Businesses", desc: "Find talent, partnerships and support." },
                  { img: foundationImages.community, title: "Community", desc: "Stay connected and contribute to Dharashiv." }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="group relative rounded-3xl overflow-hidden cursor-pointer h-[400px]">
                    <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity"></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="w-10 h-10 rounded-full bg-primary mb-4 flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowRight className="text-white w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-white/80 text-sm font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6. ENTREPRENEUR NETWORK PREVIEW */}
        <section id="entrepreneurs" className="py-32 bg-muted">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
              <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                <motion.div variants={fadeInUp} className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">Meet the people in your community.</h2>
                  <p className="text-xl text-muted-foreground font-medium">Discover entrepreneurs, professionals and businesses connected to Dharashiv.</p>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Button size="lg" className="bg-white text-foreground border border-border hover:border-primary hover:text-primary transition-all rounded-full px-8 h-14" asChild>
                    <Link href="/login">Explore the Community</Link>
                  </Button>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredEntrepreneurs.map((ent, idx) => (
                  <motion.div key={ent.id} variants={fadeInUp} className="bg-white rounded-3xl overflow-hidden border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
                    <div className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="relative h-16 w-16">
                          <Image src={ent.profileImage} alt={ent.name} fill sizes="64px" className="rounded-full object-cover border-2 border-muted" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{ent.name}</h3>
                          <p className="text-sm text-muted-foreground font-medium">{ent.designation}</p>
                        </div>
                      </div>
                      <div className="mb-6 space-y-1">
                        <p className="font-bold text-foreground">{ent.companyName}</p>
                        <p className="text-sm text-primary font-medium">{ent.category}</p>
                      </div>
                      <div className="mb-6 text-sm text-muted-foreground space-y-3">
                        <p className="flex items-center font-medium"><MapPin className="w-4 h-4 mr-2 text-foreground/40" /> <span>{ent.location?.split(',')[0]}</span></p>
                        <p className="bg-muted p-3 rounded-xl"><strong className="text-foreground block mb-1">Looking for:</strong> {ent.lookingFor?.[0]}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. OPPORTUNITY SECTION */}
        <section className="py-32 bg-white">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 text-foreground max-w-4xl mx-auto leading-tight">
                One connection can lead to <span className="text-primary">many possibilities.</span>
              </motion.h2>
              
              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} className="flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-8 max-w-5xl mx-auto">
                {['Learning', 'Jobs', 'Mentorship', 'Business', 'Partnerships', 'Referrals', 'Events', 'Community Support'].map((item) => (
                  <motion.div key={item} variants={fadeInUp} className="group flex items-center cursor-pointer transition-transform hover:-translate-y-1">
                    <span className="text-2xl md:text-3xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                      {item}
                    </span>
                    <ArrowUpRight className="w-6 h-6 ml-1 text-primary opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 8. STAY CONNECTED (Events) */}
        <section id="events" className="py-32 bg-muted">
          <div className="container px-4 md:px-6 lg:px-8 mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeInUp} className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Stay connected.</h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { cat: "Event", title: "Entrepreneur Networking Meet", date: "Next Saturday", desc: "Join local founders and business owners for a morning of networking and collaboration." },
                  { cat: "Gathering", title: "Community Gathering", date: "August 15th", desc: "A celebration of our community's achievements over the past year. Open to all members." },
                  { cat: "Session", title: "Student Opportunity Session", date: "September 1st", desc: "Mentorship and career guidance for college students from experienced professionals." }
                ].map((event, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-3xl p-8 border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-muted text-foreground text-xs font-bold uppercase tracking-wider mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      {event.cat}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{event.title}</h3>
                    <p className="text-muted-foreground font-medium mb-6 flex items-center"><Calendar className="w-5 h-5 mr-3 text-primary" /> {event.date}</p>
                    <p className="text-muted-foreground leading-relaxed mb-8">{event.desc}</p>
                    <div className="flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                      View Details <ChevronRight className="w-5 h-5 ml-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 9. FINAL CTA */}
        <section className="py-32 lg:py-48 bg-primary text-white text-center relative overflow-hidden">
          <motion.div 
            animate={prefersReducedMotion ? {} : { opacity: [0.05, 0.1, 0.05] }} 
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
            className="absolute inset-0 pointer-events-none"
          >
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="network-pattern-final" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30 0L60 30L30 60L0 30Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <circle cx="30" cy="30" r="3" fill="currentColor"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#network-pattern-final)" />
            </svg>
          </motion.div>
          
          <div className="container relative z-10 px-4 md:px-6 lg:px-8 mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                Your roots.<br/>
                Your people.<br/>
                Your opportunities.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/90 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                No matter where life takes you, your connection with Dharashiv can bring you closer to people, ideas and opportunities that matter.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-muted text-lg font-bold px-10 h-16 rounded-full shadow-xl" asChild>
                  <Link href="/join">Join Dharashiv Foundation</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 text-lg font-bold px-10 h-16 rounded-full" asChild>
                  <Link href="/login">Explore the Community</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
