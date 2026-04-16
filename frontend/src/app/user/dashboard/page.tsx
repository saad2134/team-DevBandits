"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";
import { 
  GraduationCap, Briefcase, Award, Search, FileText, TrendingUp, 
  CheckCircle, Sparkles, ArrowRight, ChevronRight, Filter, ArrowUpDown
} from "lucide-react";

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
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [opportunities, setOpportunities] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6 md:p-8 space-y-8">
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
  );
}