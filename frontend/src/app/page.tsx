"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  Lightbulb,
  Users,
} from "lucide-react";

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarComponent />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent pointer-events-none -z-10" />

          <div className="text-center max-w-4xl mx-auto mb-16 mt-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              INTELLIGENT CAREER GROWTH
            </span>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Your AI{" "}
              <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-secondary">
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
          <div className="relative w-full max-w-3xl mx-auto px-4">
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-border/50 relative overflow-hidden">
              {/* Shimmer animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-shimmer" />
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <GraduationCap className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Career Scanning Active</p>
                    <p className="text-xs text-muted-foreground">Analyzing 1,402 new opportunities today</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-muted" />
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-muted-foreground/30" />
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-primary text-white text-[10px] flex items-center justify-center font-bold">+4k</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* Match 1 */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Perfect Match</span>
                    <Star className="w-4 h-4 text-secondary" style={{ fill: "currentColor" }} />
                  </div>
                  <p className="text-sm font-bold mb-1">Merit Scholarship</p>
                  <p className="text-xs text-muted-foreground mb-3">Global STEM Council</p>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-gradient-to-r from-primary to-secondary" />
                  </div>
                  <p className="text-[10px] mt-2 text-primary font-bold">94% Fit Score</p>
                </div>

                {/* Match 2 */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">High Priority</span>
                    <Code className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-bold mb-1">Global Hackathon</p>
                  <p className="text-xs text-muted-foreground mb-3">AI for Social Good</p>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-gradient-to-r from-primary to-secondary" />
                  </div>
                  <p className="text-[10px] mt-2 text-primary font-bold">88% Fit Score</p>
                </div>

                {/* Match 3 */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Found 2h Ago</span>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-bold mb-1">Product Internship</p>
                  <p className="text-xs text-muted-foreground mb-3">TechCorp Industries</p>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-primary to-secondary" />
                  </div>
                  <p className="text-[10px] mt-2 text-primary font-bold">72% Fit Score</p>
                </div>
              </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">Precision Engineering</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">Automate your professional ascent</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-muted p-8 rounded-2xl hover:bg-muted/80 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI Opportunity Discovery</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Our neural networks scan thousands of databases 24/7 to find hidden opportunities matched to your profile.</p>
            </div>

            {/* Card 2: Highlighted */}
            <div className="relative p-8 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-10" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-6 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Resume Gap Analysis</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">Identify exactly what skills you&apos;re missing for your target roles and get actionable learning paths.</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary">
                  <span>Get Started</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-muted p-8 rounded-2xl hover:bg-muted/80 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI Cover Letter</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Generate hyper-personalized cover letters that highlight your relevance for specific job descriptions in seconds.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-muted p-8 rounded-2xl hover:bg-muted/80 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Personalized Recommendations</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Receive a curated weekly digest of career moves, upskilling opportunities, and networking events.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">Your Personal Career AI Team</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              Five specialized AI agents work together to find and land your dream opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Scout Agent */}
            <div className="bg-muted p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Scout Agent</h3>
              <p className="text-sm text-blue-600 font-medium mb-3">The Opportunity Finder</p>
              <p className="text-sm text-muted-foreground">
                Continuously monitors multiple sources and prioritizes opportunities based on freshness, relevance, and completeness—not just keyword matches.
              </p>
            </div>

            {/* Analyzer Agent */}
            <div className="bg-muted p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Analyzer Agent</h3>
              <p className="text-sm text-purple-600 font-medium mb-3">The Opportunity Processor</p>
              <p className="text-sm text-muted-foreground">
                Standardizes messy, inconsistent listings into structured data - extracting skills needed, eligibility criteria, and deadlines for accurate matching.
              </p>
            </div>

            {/* Matcher Agent */}
            <div className="bg-muted p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Matcher Agent</h3>
              <p className="text-sm text-green-600 font-medium mb-3">The Fit Calculator</p>
              <p className="text-sm text-muted-foreground">
                Ensures you only see opportunities you're realistically competitive for - ranks everything by your match score so you don't waste applications.
              </p>
            </div>

            {/* Auditor Agent */}
            <div className="bg-muted p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                <Gauge className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Auditor Agent</h3>
              <p className="text-sm text-amber-600 font-medium mb-3">Your Resume Reviewer</p>
              <p className="text-sm text-muted-foreground">
                Simulates a recruiter's perspective - highlights your strengths, identifies gaps, and gives suggestions to improve your application quality.
              </p>
            </div>

            {/* Learner Agent */}
            <div className="bg-muted p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Learner Agent</h3>
              <p className="text-sm text-pink-600 font-medium mb-3">The Smart Improver</p>
              <p className="text-sm text-muted-foreground">
                Watches what you click, save, and apply to - learns your preferences and improves recommendations over time.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl flex flex-col justify-center">
              <h3 className="text-lg font-bold mb-2">How They Help You</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                  Find opportunities while you sleep
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                  Get personalized match scores
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                  Improve your applications
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                  Learn and adapt to your goals
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden">
            {/* Abstract patterns */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

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