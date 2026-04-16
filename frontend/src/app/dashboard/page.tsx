"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { 
  GraduationCap, Briefcase, Award, Search, FileText, TrendingUp, 
  ExternalLink, Bookmark, CheckCircle, XCircle, LayoutDashboard,
  Compass, BarChart2, MessageSquare, Settings, Sparkles, Bell,
  ArrowRight, ChevronRight, Filter, ArrowUpDown
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
  const [activeTab, setActiveTab] = useState<"matches" | "opportunities" | "shortlist">("matches");

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

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 mx-auto animate-pulse text-primary" />
          <p className="mt-4 text-gray-600">Loading your opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50 border-r border-slate-200/50 flex flex-col gap-2 p-4 z-40 hidden md:flex">
        <div className="mb-8 px-2">
          <h1 className="text-lg font-black text-slate-900 tracking-tighter">CareerPilot AI</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">The Intelligent Path</p>
        </div>
        <nav className="flex flex-col gap-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-50 text-indigo-700 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/explore" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <Compass className="h-5 w-5" />
            <span className="text-sm font-medium">Compass</span>
          </Link>
          <Link href="/saved" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <Bookmark className="h-5 w-5" />
            <span className="text-sm font-medium">Saved</span>
          </Link>
          <Link href="/applications" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">Applications</span>
          </Link>
          <Link href="/insights" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <BarChart2 className="h-5 w-5" />
            <span className="text-sm font-medium">Insights</span>
          </Link>
          <Link href="/assistant" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm font-medium">AI Assistant</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-100/50">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg mb-4">
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <div className="bg-gradient-to-br from-[#3525cd] to-[#8127cf] p-4 rounded-xl text-white">
            <p className="text-xs font-semibold mb-2">Power up your search</p>
            <Button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs font-bold transition-all">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </aside>

      <main className="md:ml-64 min-h-screen">
        <header className="flex justify-between items-center w-full px-8 py-4 bg-slate-50/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-slate-100 px-4 py-2 rounded-full border border-slate-200/20">
              <Search className="h-4 w-4 text-slate-500 mr-2" />
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 lg:w-64" placeholder="Compass careers..." type="text" />
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <Link className="text-slate-500 hover:text-indigo-500 font-medium text-sm transition-colors" href="/explore">Compass</Link>
              <Link className="text-slate-500 hover:text-indigo-500 font-medium text-sm transition-colors" href="/applications">Applications</Link>
              <Link className="text-slate-500 hover:text-indigo-500 font-medium text-sm transition-colors" href="/insights">Insights</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-white/50 rounded-full transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-indigo-600 hover:bg-white/50 rounded-full transition-colors">
              <Sparkles className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="w-10 h-10 rounded-full border-2 border-[#e2dfff] overflow-hidden bg-slate-200">
              {profile?.name?.charAt(0)}
            </div>
          </div>
        </header>

        <div className="px-8 py-8 space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-[#3525cd] to-[#8127cf] p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between relative overflow-hidden min-h-[220px]">
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold tracking-tighter mb-2">Welcome back, {profile?.name || 'User'}</h2>
                <p className="text-white/80 max-w-md">Your AI scout found {opportunities.length} new opportunities tailored to your profile.</p>
              </div>
              <div className="relative z-10 flex gap-4 mt-6">
                <Button className="bg-white text-[#3525cd] px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform">
                  Review Matches
                </Button>
                <Button className="bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/30 transition-all">
                  Daily Brief
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
                <Sparkles className="h-48 w-48 ml-auto" />
              </div>
            </div>
            <div className="bg-[#f2f4f6] rounded-2xl p-6 border border-slate-200/10 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#8127cf] rounded-full animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Live AI Activity</span>
              </div>
              <div className="space-y-4 flex-grow">
                <div className="flex gap-3">
                  <Search className="text-[#3525cd] h-5 w-5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-700">AI Scout scanning platforms...</p>
                    <p className="text-[10px] text-slate-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="text-[#8127cf] h-5 w-5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{opportunities.length} new opportunities found</p>
                    <p className="text-[10px] text-slate-500">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <TrendingUp className="text-[#3525cd] h-5 w-5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-700">Ranking opportunities for you</p>
                    <p className="text-[10px] text-slate-500">Just now</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200/20">
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#3525cd] h-full w-2/3"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-500/70 uppercase tracking-wider mb-2">Opportunities Found</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">{opportunities.length}</span>
                <span className="text-xs font-bold text-emerald-600">+12 today</span>
              </div>
            </div>
            <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-bold text-slate-500/70 uppercase tracking-wider mb-2">Applications Sent</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">42</span>
                <span className="text-xs font-bold text-slate-500/50">8 pending</span>
              </div>
            </div>
            <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-2 border-[#e2dfff]">
              <p className="text-xs font-bold text-[#3525cd] uppercase tracking-wider mb-2">Average Match Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#3525cd] tracking-tighter">85%</span>
                <span className="text-xs font-bold text-[#3525cd]/70">Top 10% user</span>
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-[11px] font-black text-[#3525cd] uppercase tracking-[0.2em]">Curated For You</span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Recommended Opportunities</h3>
              </div>
              <Button variant="ghost" className="text-[#3525cd] text-sm font-bold flex items-center gap-1 hover:underline underline-offset-4">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {opportunities.slice(0, 3).map((result) => (
                <Card key={result.opportunity.id} className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#e2dfff]/50 transition-all flex flex-col group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200/10">
                      {getTypeIcon(result.opportunity.type)}
                    </div>
                    <div className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100/50">
                      {result.match_score}% Match
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">{result.opportunity.title}</h4>
                  <p className="text-sm text-slate-500 mb-6 font-medium">{result.opportunity.organization} • {result.opportunity.location || 'Remote'}</p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-2">
                      <FileText className="text-[#3525cd] h-4 w-4" />
                      <span className="text-xs text-slate-500">Deadline: <span className="font-semibold text-slate-700">{result.opportunity.deadline || 'Rolling'}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.matched_skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="mt-auto w-full py-3 bg-slate-100 hover:bg-[#3525cd] hover:text-white rounded-xl text-sm font-bold transition-all"
                    onClick={() => handleEngage(result.opportunity.id, "viewed")}
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-[#ffffff] rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-900">Recent Scanned Opportunities</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors">
                  <Filter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="sm" className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors">
                  <ArrowUpDown className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {opportunities.slice(0, 5).map((result, index) => (
                <div key={result.opportunity.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group border-t border-slate-50 first:border-t-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">
                      {result.opportunity.organization.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{result.opportunity.title}</p>
                      <p className="text-[10px] text-slate-500/70 font-semibold uppercase tracking-wider">{result.opportunity.organization} • {result.opportunity.type}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end mr-12">
                    <p className="text-xs font-semibold text-slate-700">Found {index + 1}h ago</p>
                    <p className="text-[10px] text-slate-500">via Platform</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs font-black text-indigo-600">{result.match_score}%</p>
                      <div className="w-16 bg-slate-200 h-1 rounded-full overflow-hidden">
                        <div className="bg-[#3525cd] h-full" style={{ width: `${result.match_score}%` }}></div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#3525cd] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="w-full py-12 px-8 bg-white border-t border-slate-100 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
            <p className="text-xs uppercase tracking-widest text-slate-500">© 2024 CareerPilot AI. All rights reserved.</p>
            <div className="flex gap-8">
              <Link className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors underline underline-offset-4" href="#">Privacy Policy</Link>
              <Link className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors underline underline-offset-4" href="#">Terms of Service</Link>
              <Link className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors underline underline-offset-4" href="#">Help Center</Link>
              <Link className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors underline underline-offset-4" href="#">Contact</Link>
            </div>
          </div>
        </footer>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-slate-50/80 backdrop-blur-md border-t border-slate-200/50 flex justify-around py-3 px-2 z-50">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-indigo-600">
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px] font-bold">Dash</span>
        </Link>
        <Link href="/explore" className="flex flex-col items-center gap-1 text-slate-400">
          <Compass className="h-5 w-5" />
          <span className="text-[10px] font-bold">Compass</span>
        </Link>
        <Link href="/applications" className="flex flex-col items-center gap-1 text-slate-400">
          <FileText className="h-5 w-5" />
          <span className="text-[10px] font-bold">Apps</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-slate-400">
          <div className="w-6 h-6 rounded-full bg-slate-300"></div>
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>

      <Button className="fixed bottom-24 right-8 md:bottom-12 md:right-12 w-14 h-14 bg-gradient-to-br from-[#3525cd] to-[#8127cf] rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-40">
        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
      </Button>
    </div>
  );
}
