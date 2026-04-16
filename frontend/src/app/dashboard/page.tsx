"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";
import { 
  GraduationCap, Briefcase, Award, Search, FileText, TrendingUp, 
  ExternalLink, Bookmark, CheckCircle, LayoutDashboard,
  Compass, BarChart2, MessageSquare, Settings, Sparkles, Bell,
  ArrowRight, ChevronRight, Filter, ArrowUpDown, Sun, Moon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentProfile {
  id: number;
  name: string;
  email: string;
  cgpa: number | null;
  year: number | null;
  branch: string | null;
  skills: string[];
  goals: string[];
}

interface Opportunity {
  id: number;
  title: string;
  organization: string;
  type: string;
  url: string;
  description: string;
  requirements: string[];
  deadline: string | null;
  location: string | null;
}

interface MatchResult {
  opportunity: Opportunity;
  match_score: number;
  missing_skills: string[];
  matched_skills: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [opportunities, setOpportunities] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const profileRes = await fetch(`${API_URL}/profile/${studentId}`);
        const profileData = await profileRes.json();
        setProfile(profileData);

        const matchesRes = await fetch(`${API_URL}/matches/${studentId}`);
        const matchesData = await matchesRes.json();
        setOpportunities(matchesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleEngage = async (oppId: number, action: string) => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) return;

    await fetch(`${API_URL}/engage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: parseInt(studentId),
        opportunity_id: oppId,
        action,
      }),
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "internship":
        return <Briefcase className="h-4 w-4" />;
      case "scholarship":
        return <Award className="h-4 w-4" />;
      case "research":
        return <Search className="h-4 w-4" />;
      case "job":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <GraduationCap className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 mx-auto animate-pulse text-primary" />
          <p className="mt-4 text-muted-foreground">Loading your opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-muted/30 border-r border-border flex flex-col gap-2 p-4 z-40 hidden md:flex">
        <div className="mb-8 px-2">
          <h1 className="text-lg font-black text-foreground tracking-tighter">CareerPilot AI</h1>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">The Intelligent Path</p>
        </div>
        <nav className="flex flex-col gap-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-primary/10 text-primary rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/explore" className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-muted rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <Compass className="h-5 w-5" />
            <span className="text-sm font-medium">Compass</span>
          </Link>
          <Link href="/saved" className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-muted rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <Bookmark className="h-5 w-5" />
            <span className="text-sm font-medium">Saved</span>
          </Link>
          <Link href="/applications" className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-muted rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">Applications</span>
          </Link>
          <Link href="/insights" className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-muted rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <BarChart2 className="h-5 w-5" />
            <span className="text-sm font-medium">Insights</span>
          </Link>
          <Link href="/assistant" className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-muted rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm font-medium">AI Assistant</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-border">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-muted rounded-lg mb-4">
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-xl text-primary-foreground">
            <p className="text-xs font-semibold mb-2">Power up your search</p>
            <Button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs font-bold transition-all">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </aside>

      <main className="md:ml-64 min-h-screen">
        <header className="flex justify-between items-center w-full px-8 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-muted px-4 py-2 rounded-full border border-border/20">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 lg:w-64 text-foreground" placeholder="Compass careers..." type="text" />
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <Link className="text-muted-foreground hover:text-primary font-medium text-sm transition-colors" href="/explore">Compass</Link>
              <Link className="text-muted-foreground hover:text-primary font-medium text-sm transition-colors" href="/applications">Applications</Link>
              <Link className="text-muted-foreground hover:text-primary font-medium text-sm transition-colors" href="/insights">Insights</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-primary hover:bg-muted rounded-full transition-colors">
              <Sparkles className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-border mx-2"></div>
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="cursor-pointer border-border">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover border-border">
                  <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden bg-muted flex items-center justify-center">
              <span className="text-lg font-bold text-foreground">{profile?.name?.charAt(0) || '?'}</span>
            </div>
          </div>
        </header>

        <div className="px-8 py-8 space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-primary-foreground shadow-xl flex flex-col justify-between relative overflow-hidden min-h-[220px]">
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold tracking-tighter mb-2">Welcome back, {profile?.name || 'User'}</h2>
                <p className="text-primary-foreground/80 max-w-md">Your AI scout found {opportunities.length} new opportunities tailored to your profile.</p>
              </div>
              <div className="relative z-10 flex gap-4 mt-6">
                <Button className="bg-primary-foreground text-primary px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform">
                  Review Matches
                </Button>
                <Button className="bg-white/20 backdrop-blur-md text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/30 transition-all">
                  Daily Brief
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
                <Sparkles className="h-48 w-48 ml-auto" />
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-6 border border-border flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Live AI Activity</span>
              </div>
              <div className="space-y-4 flex-grow">
                <div className="flex gap-3">
                  <Search className="text-primary h-5 w-5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">AI Scout scanning platforms...</p>
                    <p className="text-[10px] text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="text-secondary h-5 w-5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{opportunities.length} new opportunities found</p>
                    <p className="text-[10px] text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <TrendingUp className="text-primary h-5 w-5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Ranking opportunities for you</p>
                    <p className="text-[10px] text-muted-foreground">Just now</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {profile?.skills?.length ? (
                    profile.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No skills added</p>
                  )}
                </div>
                <div className="w-full bg-muted-foreground/20 rounded-full h-1.5 overflow-hidden mt-3">
                  <div className="bg-primary h-full w-2/3"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Opportunities Found</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-foreground tracking-tighter">{opportunities.length}</span>
                <span className="text-xs font-bold text-green-600">+12 today</span>
              </div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Applications Sent</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-foreground tracking-tighter">42</span>
                <span className="text-xs font-bold text-muted-foreground/50">8 pending</span>
              </div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-2 border-primary/20">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Average Match Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-primary tracking-tighter">85%</span>
                <span className="text-xs font-bold text-primary/70">Top 10% user</span>
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Curated For You</span>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">Recommended Opportunities</h3>
              </div>
              <Button variant="ghost" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline underline-offset-4">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {opportunities.slice(0, 3).map((result) => (
                <Card key={result.opportunity.id} className="bg-card rounded-2xl p-6 shadow-sm border border-transparent hover:border-primary/20 transition-all flex flex-col group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center border border-border">
                      {getTypeIcon(result.opportunity.type)}
                    </div>
                    <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                      {result.match_score}% Match
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{result.opportunity.title}</h4>
                  <p className="text-sm text-muted-foreground mb-6 font-medium">{result.opportunity.organization} • {result.opportunity.location || 'Remote'}</p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-2">
                      <FileText className="text-primary h-4 w-4" />
                      <span className="text-xs text-muted-foreground">Deadline: <span className="font-semibold text-foreground">{result.opportunity.deadline || 'Rolling'}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.matched_skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-muted rounded text-[10px] font-bold text-muted-foreground">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="mt-auto w-full py-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-xl text-sm font-bold transition-all"
                    onClick={() => handleEngage(result.opportunity.id, "viewed")}
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-3xl p-8 shadow-sm border border-border">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-foreground">Recent Scanned Opportunities</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="p-2 bg-muted rounded-lg text-muted-foreground hover:bg-muted/80 transition-colors">
                  <Filter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="sm" className="p-2 bg-muted rounded-lg text-muted-foreground hover:bg-muted/80 transition-colors">
                  <ArrowUpDown className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {opportunities.slice(0, 5).map((result, index) => (
                <div key={result.opportunity.id} className="flex items-center justify-between p-4 hover:bg-muted rounded-2xl transition-colors cursor-pointer group border-t border-border first:border-t-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center font-bold text-muted-foreground">
                      {result.opportunity.organization.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{result.opportunity.title}</p>
                      <p className="text-[10px] text-muted-foreground/70 font-semibold uppercase tracking-wider">{result.opportunity.organization} • {result.opportunity.type}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end mr-12">
                    <p className="text-xs font-semibold text-foreground">Found {index + 1}h ago</p>
                    <p className="text-[10px] text-muted-foreground">via Platform</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs font-black text-primary">{result.match_score}%</p>
                      <div className="w-16 bg-muted h-1 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${result.match_score}%` }}></div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="w-full py-12 px-8 bg-card border-t border-border mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">© 2024 CareerPilot AI. All rights reserved.</p>
            <div className="flex gap-8">
              <Link className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4" href="#">Privacy Policy</Link>
              <Link className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4" href="#">Terms of Service</Link>
              <Link className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4" href="#">Help Center</Link>
              <Link className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4" href="#">Contact</Link>
            </div>
          </div>
        </footer>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-md border-t border-border flex justify-around py-3 px-2 z-50">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-primary">
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px] font-bold">Dash</span>
        </Link>
        <Link href="/explore" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Compass className="h-5 w-5" />
          <span className="text-[10px] font-bold">Compass</span>
        </Link>
        <Link href="/applications" className="flex flex-col items-center gap-1 text-muted-foreground">
          <FileText className="h-5 w-5" />
          <span className="text-[10px] font-bold">Apps</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-muted-foreground">
          <div className="w-6 h-6 rounded-full bg-muted"></div>
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>

      <Button className="fixed bottom-24 right-8 md:bottom-12 md:right-12 w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-40">
        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
      </Button>
    </div>
  );
}