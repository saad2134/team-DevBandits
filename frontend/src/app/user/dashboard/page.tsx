"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";
import { 
  GraduationCap, Briefcase, Award, Search, FileText, TrendingUp, 
  CheckCircle, Sparkles, ArrowRight, ChevronRight, Filter, ArrowUpDown,
  Brain, Cpu, BarChart3, Wand2, Lightbulb
} from "lucide-react";

interface AgentActivity {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "idle" | "running" | "completed" | "error";
  message: string;
  timestamp: string;
  color: string;
}

const demoAgentActivity: AgentActivity[] = [
  {
    id: "scout",
    name: "Scout Agent",
    icon: <Search className="h-4 w-4" />,
    status: "completed",
    message: "Scanned 47 platforms for new opportunities",
    timestamp: "2 min ago",
    color: "text-blue-500",
  },
  {
    id: "analyzer",
    name: "Analyzer Agent",
    icon: <Cpu className="h-4 w-4" />,
    status: "completed",
    message: "Processed 23 new raw opportunity listings",
    timestamp: "1 min ago",
    color: "text-purple-500",
  },
  {
    id: "matcher",
    name: "Matcher Agent",
    icon: <BarChart3 className="h-4 w-4" />,
    status: "running",
    message: "Matching 18 opportunities to your profile...",
    timestamp: "Just now",
    color: "text-green-500",
  },
  {
    id: "auditor",
    name: "Auditor Agent",
    icon: <Wand2 className="h-4 w-4" />,
    status: "idle",
    message: "Ready to analyze applications on demand",
    timestamp: "Waiting",
    color: "text-orange-500",
  },
  {
    id: "learner",
    name: "Learner Agent",
    icon: <Brain className="h-4 w-4" />,
    status: "running",
    message: "Learning your preferences from 156 interactions",
    timestamp: "Running",
    color: "text-pink-500",
  },
];

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
        return <Briefcase className="h-6 w-6" />;
      case "scholarship":
        return <Award className="h-6 w-6" />;
      case "research":
        return <Search className="h-6 w-6" />;
      case "job":
        return <Briefcase className="h-6 w-6" />;
      default:
        return <GraduationCap className="h-6 w-6" />;
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="col-span-1 md:col-span-3 space-y-4">
          <div className="bg-gradient-to-r from-primary/80 to-secondary p-6 rounded-2xl text-primary-foreground shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-semibold text-primary-foreground/80 uppercase tracking-wider mb-1">{getGreeting()}</p>
              <h2 className="text-2xl font-extrabold tracking-tighter">{profile?.name || 'User'}</h2>
              <p className="text-primary-foreground/80 text-sm mt-1">Your scout agent found {opportunities.length} new opportunities</p>
            </div>
            <div className="relative z-10 flex gap-3 mt-4">
              <Button className="bg-primary-foreground text-primary px-4 py-2 rounded-lg font-bold text-xs shadow-lg hover:scale-105 transition-transform">
                Review Matches
              </Button>
              <Button className="bg-white/20 backdrop-blur-md text-primary-foreground px-4 py-2 rounded-lg font-bold text-xs hover:bg-white/30 transition-all">
                Daily Brief
              </Button>
            </div>
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
              <Sparkles className="h-32 w-32 ml-auto" />
            </div>
          </div>
          <section className="flex flex-wrap gap-3">
            {profile?.skills?.length ? (
              <div className="bg-muted rounded-xl p-3 border border-border flex-1 min-w-[200px]">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[9px] uppercase font-bold text-muted-foreground">Skills</p>
                  {profile.skills.length > 12 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 px-2 text-[9px] font-bold text-primary hover:text-primary/80"
                      onClick={() => router.push("/user/profile")}
                    >
                      View All ({profile.skills.length})
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {profile.skills.slice(0, 12).map((skill, i) => (
                    <span key={i} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {profile?.branch && (
              <div className="bg-muted rounded-xl p-3 border border-border">
                <p className="text-[9px] uppercase font-bold text-muted-foreground mb-1">Branch</p>
                <span className="text-xs font-medium text-foreground">{profile.branch}</span>
              </div>
            )}
            {profile?.year && (
              <div className="bg-muted rounded-xl p-3 border border-border">
                <p className="text-[9px] uppercase font-bold text-muted-foreground mb-1">Year</p>
                <span className="text-xs font-medium text-foreground">{profile.year}</span>
              </div>
            )}
            {profile?.cgpa && (
              <div className="bg-muted rounded-xl p-3 border border-border">
                <p className="text-[9px] uppercase font-bold text-muted-foreground mb-1">CGPA</p>
                <span className="text-xs font-medium text-foreground">{profile.cgpa}</span>
              </div>
            )}
          </section>
        </div>
        <div className="col-span-1 md:col-span-2 bg-muted rounded-2xl p-4 border border-border flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Live Agents</span>
          </div>
          <div className="space-y-2 flex-grow overflow-y-auto">
            {demoAgentActivity.map((agent) => (
              <div key={agent.id} className="flex items-start gap-2">
                <div className={`${agent.color} mt-0.5`}>
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-foreground truncate">{agent.name}</p>
                  <p className="text-[9px] text-muted-foreground truncate">{agent.message}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  agent.status === "running" ? "bg-green-500 animate-pulse" :
                  agent.status === "completed" ? "bg-green-500" :
                  agent.status === "error" ? "bg-red-500" :
                  "bg-gray-400"
                }`}></div>
              </div>
            ))}
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
            <Card key={result.opportunity.id} className="bg-card rounded-2xl p-6 shadow-sm border border-foreground/10 hover:border-primary/20 transition-all flex flex-col group">
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
                className="mt-auto w-full py-3 bg-muted text-foreground hover:bg-primary hover:text-primary-foreground rounded-xl text-sm font-bold transition-all"
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