"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import NavbarComponent from "@/components/navbar/navbar";
import FooterSection from "@/components/footer/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import {
  GraduationCap,
  Search,
  FileText,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Code,
  Clock,
  Star,
  Target,
  Brain,
  Gauge,
  ChevronRight,
  MousePointer2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI Opportunity Discovery",
    description: "Our neural networks scan thousands of databases 24/7 to find hidden opportunities matched to your profile.",
    color: "primary",
  },
  {
    icon: TrendingUp,
    title: "Resume Gap Analysis",
    description: "Identify exactly what skills you're missing for your target roles and get actionable learning paths.",
    color: "secondary",
    highlighted: true,
  },
  {
    icon: FileText,
    title: "AI Cover Letter",
    description: "Generate hyper-personalized cover letters that highlight your relevance for specific job descriptions in seconds.",
    color: "primary",
  },
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description: "Receive a curated weekly digest of career moves, upskilling opportunities, and networking events.",
    color: "primary",
  },
];

const agents = [
  {
    icon: Search,
    title: "Scout Agent",
    subtitle: "The Opportunity Finder",
    color: "blue",
    description: "Continuously monitors multiple sources and prioritizes opportunities based on freshness, relevance, and completeness—not just keyword matches.",
  },
  {
    icon: Code,
    title: "Analyzer Agent",
    subtitle: "The Opportunity Processor",
    color: "purple",
    description: "Standardizes messy, inconsistent listings into structured data - extracting skills needed, eligibility criteria, and deadlines for accurate matching.",
  },
  {
    icon: Target,
    title: "Matcher Agent",
    subtitle: "The Fit Calculator",
    color: "green",
    description: "Ensures you only see opportunities you're realistically competitive for - ranks everything by your match score so you don't waste applications.",
  },
  {
    icon: Gauge,
    title: "Auditor Agent",
    subtitle: "Your Resume Reviewer",
    color: "amber",
    description: "Simulates a recruiter's perspective - highlights your strengths, identifies gaps, and gives suggestions to improve your application quality.",
  },
  {
    icon: Brain,
    title: "Learner Agent",
    subtitle: "The Smart Improver",
    color: "pink",
    description: "Watches what you click, save, and apply to - learns your preferences and improves recommendations over time.",
  },
];

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("student_token");
    const id = localStorage.getItem("student_id");
    setIsLoggedIn(!!token && !!id);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-background text-foreground" onMouseMove={handleMouseMove}>
      <NavbarComponent isLandingPage={true} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none -z-10" />

          {/* Floating gradient orbs */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none -z-20"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none -z-10" />

          <div
            className={`text-center max-w-4xl mx-auto mb-16 mt-16 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              INTELLIGENT CAREER GROWTH
            </span>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Your AI{" "}
              <span className="text-primary bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary animate-gradient-x">
                Career Agent
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              The platform that automatically finds internships, hackathons, and scholarships for you while you sleep.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isLoading ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Skeleton className="h-14 w-48 rounded-xl" />
                  <Skeleton className="h-14 w-36 rounded-xl" />
                </div>
              ) : isLoggedIn ? (
                <Link href="/user/dashboard">
                  <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all scale-95 active:scale-90">
                    Go to Dashboard <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all scale-95 active:scale-90">
                      Get Started <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link href="/login">
                    <button className="bg-muted text-foreground border border-border/30 px-8 py-4 rounded-xl text-lg font-bold hover:bg-muted/80 transition-all scale-95 active:scale-90">
                      View Demo
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* AI Scanning Preview Card */}
          <div
            className={`relative w-full max-w-3xl mx-auto px-4 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-border/50 relative overflow-hidden group">
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

              {/* Shimmer animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-shimmer" />

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center animate-pulse">
                    <GraduationCap className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Career Scanning Active</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
                      Analyzing 1,402 new opportunities today
                    </p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-muted animate-bounce" />
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-muted-foreground/30 animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-primary text-white text-[10px] flex items-center justify-center font-bold animate-bounce" style={{ animationDelay: "0.2s" }}>+4k</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {[
                  { label: "Perfect Match", percentage: 94, title: "Merit Scholarship", org: "Global STEM Council", color: "secondary" },
                  { label: "High Priority", percentage: 88, title: "Global Hackathon", org: "AI for Social Good", color: "primary" },
                  { label: "Found 2h Ago", percentage: 72, title: "Product Internship", org: "TechCorp Industries", color: "muted-foreground" },
                ].map((match, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-muted/50 border border-border/10 hover:scale-105 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${match.color === 'secondary' ? 'text-secondary' : match.color === 'primary' ? 'text-primary' : 'text-muted-foreground'}`}>
                        {match.label}
                      </span>
                      {match.color === 'secondary' && <Star className="w-4 h-4 text-secondary" style={{ fill: "currentColor" }} />}
                      {match.color === 'primary' && <Code className="w-4 h-4 text-primary" />}
                      {match.color === 'muted-foreground' && <Clock className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <p className="text-sm font-bold mb-1">{match.title}</p>
                    <p className="text-xs text-muted-foreground mb-3">{match.org}</p>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${match.color === 'secondary' ? 'from-secondary to-primary' : 'from-primary to-secondary'}`}
                        style={{ width: `${match.percentage}%` }}
                      />
                    </div>
                    <p className="text-[10px] mt-2 text-primary font-bold">{match.percentage}% Fit Score</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <MousePointer2 className="w-6 h-6 text-muted-foreground/50" />
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="py-32 px-8 max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block animate-in fade-in slide-in-from-left-4 duration-700">Precision Engineering</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "100ms" }}>
              Automate your professional ascent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-muted p-6 rounded-2xl hover:scale-105 hover:bg-muted/80 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md bg-primary text-white transition-transform duration-300 group-hover:scale-110`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 px-8 max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">Your Personal Career AI Team</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              Five specialized AI agents work together to find and land your dream opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="group bg-muted p-6 rounded-2xl hover:scale-105 hover:bg-muted/80 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${agent.color === 'blue' ? 'bg-blue-500/20' : agent.color === 'purple' ? 'bg-purple-500/20' : agent.color === 'green' ? 'bg-green-500/20' : agent.color === 'amber' ? 'bg-amber-500/20' : 'bg-pink-500/20'} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <agent.icon className={`w-6 h-6 ${
                    agent.color === 'blue' ? 'text-blue-500' : agent.color === 'purple' ? 'text-purple-500' : agent.color === 'green' ? 'text-green-500' : agent.color === 'amber' ? 'text-amber-500' : 'text-pink-500'
                  }`} />
                </div>
                <h3 className="text-lg font-bold mb-2">{agent.title}</h3>
                <p className={`text-sm font-medium mb-3 ${
                  agent.color === 'blue' ? 'text-blue-600' : agent.color === 'purple' ? 'text-purple-600' : agent.color === 'green' ? 'text-green-600' : agent.color === 'amber' ? 'text-amber-600' : 'text-pink-600'
                }`}>The {agent.subtitle}</p>
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>
              </div>
            ))}

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl flex flex-col justify-center group hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-bold mb-4">How They Help You</h3>
              <ul className="text-sm text-muted-foreground space-y-3">
                {[
                  "Find opportunities while you sleep",
                  "Get personalized match scores",
                  "Improve your applications",
                  "Learn and adapt to your goals"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                    <ChevronRight className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden group">
            {/* Abstract patterns */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" style={{ animationDelay: "0.2s" }} />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">Ready to navigate your future?</h2>
              <p className="text-lg text-primary-foreground leading-relaxed mb-12 opacity-90">
                Join over 50,000 students and early-career professionals using AI to land their dream opportunities.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {isLoading ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Skeleton className="h-14 w-56 rounded-2xl" />
                    <Skeleton className="h-14 w-36 rounded-2xl" />
                  </div>
                ) : isLoggedIn ? (
                  <Link href="/user/dashboard">
                    <button className="bg-white text-primary px-10 py-5 rounded-2xl text-lg font-bold hover:bg-muted transition-all scale-95 active:scale-90 shadow-xl">
                      Go to Dashboard
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link href="/signup">
                      <button className="bg-white text-primary px-10 py-5 rounded-2xl text-lg font-bold hover:bg-muted transition-all scale-95 active:scale-90 shadow-xl">
                        Get Started for Free
                      </button>
                    </Link>
                    <button className="bg-transparent text-white border border-white/30 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all scale-95 active:scale-90">
                      View Pricing
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}