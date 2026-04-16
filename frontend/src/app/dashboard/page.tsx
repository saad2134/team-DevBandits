"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";
import { 
  GraduationCap, Briefcase, Award, Search, FileText, TrendingUp, 
  CheckCircle, Sparkles, Bookmark, X, School, Terminal
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

const sampleOpportunities: MatchResult[] = [
  {
    opportunity: {
      id: 1,
      title: "Product Design Internship",
      organization: "Lumina Systems",
      type: "internship",
      url: "https://example.com",
      description: "Join our product design team to work on cutting-edge SaaS products.",
      requirements: ["Figma", "UI/UX", "Prototyping"],
      deadline: "Oct 24, 2024",
      location: "Remote"
    },
    match_score: 95,
    matched_skills: ["Figma", "UI Design"],
    missing_skills: ["Motion Design"]
  },
  {
    opportunity: {
      id: 2,
      title: "Web3 Security Hackathon",
      organization: "EtherShield Labs",
      type: "hackathon",
      url: "https://example.com",
      description: "Build the future of decentralized security solutions.",
      requirements: ["Solidity", "Blockchain", "Security"],
      deadline: "In 3 days",
      location: "Virtual"
    },
    match_score: 88,
    matched_skills: ["Security", "Blockchain"],
    missing_skills: ["Smart Contracts"]
  },
  {
    opportunity: {
      id: 3,
      title: "Women in Tech Scholarship",
      organization: "Stellar Foundation",
      type: "scholarship",
      url: "https://example.com",
      description: "Supporting the next generation of women in technology.",
      requirements: ["Academic Excellence", "Leadership"],
      deadline: "Nov 15, 2024",
      location: "Global"
    },
    match_score: 92,
    matched_skills: ["Leadership", "Communication"],
    missing_skills: []
  },
  {
    opportunity: {
      id: 4,
      title: "Data Science Fellowship",
      organization: "DataMind AI",
      type: "research",
      url: "https://example.com",
      description: "Research position focused on machine learning and AI.",
      requirements: ["Python", "ML", "Statistics"],
      deadline: "Rolling",
      location: "San Francisco"
    },
    match_score: 76,
    matched_skills: ["Python", "Data Analysis"],
    missing_skills: ["Deep Learning"]
  }
];

function OpportunityModal({ result, onClose }: { result: MatchResult; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-100 transition-colors">
          <X className="h-6 w-6 text-slate-500" />
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <section className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">{result.opportunity.organization.charAt(0)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#3525cd]">{result.opportunity.type} • {result.opportunity.location}</span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">{result.opportunity.title}</h2>
                  <p className="text-lg text-slate-500 font-medium">{result.opportunity.organization}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</span>
                  <p className="font-bold text-slate-900 capitalize">{result.opportunity.type}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</span>
                  <p className="font-bold text-slate-900">{result.opportunity.location || 'Remote'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deadline</span>
                  <p className="font-bold text-slate-900">{result.opportunity.deadline || 'Rolling'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match</span>
                  <p className="font-bold text-[#3525cd]">{result.match_score}%</p>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="text-lg font-bold tracking-tight border-l-4 border-[#3525cd] pl-4">About the Role</h3>
              <p className="text-slate-500 leading-relaxed">{result.opportunity.description}</p>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="text-lg font-bold tracking-tight border-l-4 border-[#3525cd] pl-4">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {result.opportunity.requirements.map((req, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg">{req}</span>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <h3 className="text-lg font-bold tracking-tight border-l-4 border-[#3525cd] pl-4">Path to Mastery</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-[#4f46e5] bg-[#3525cd]/10 px-3 py-1 rounded-full">Recommended by AI</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-[#3525cd]/5 hover:border-[#3525cd]/20 transition-colors flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e2dfff] flex items-center justify-center">
                      <School className="text-[#3525cd]" />
                    </div>
                    <h4 className="font-bold text-slate-900">Advanced Skills</h4>
                  </div>
                  <p className="text-sm text-slate-500">Build the skills needed for this role.</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-[#3525cd]/5 hover:border-[#3525cd]/20 transition-colors flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f0dbff] flex items-center justify-center">
                      <Terminal className="text-[#8127cf]" />
                    </div>
                    <h4 className="font-bold text-slate-900">Hands-on Project</h4>
                  </div>
                  <p className="text-sm text-slate-500">Apply your skills in real scenarios.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/10 shadow-xl relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#3525cd]/5 rounded-full blur-2xl"></div>
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-slate-100" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeWidth="6"></circle>
                    <circle className="text-[#3525cd]" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeDasharray="264" strokeDashoffset={264 - (264 * result.match_score / 100)} strokeWidth="6"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900">{result.match_score}%</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-bold text-slate-900">Match Score</h4>
                  <p className="text-xs text-slate-500 leading-snug">Based on your profile</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Strengths</span>
                  <div className="flex flex-wrap gap-2">
                    {result.matched_skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">{skill}</span>
                    ))}
                  </div>
                </div>
                {result.missing_skills.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Areas</span>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl flex flex-col gap-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Organization</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <span className="text-lg font-bold text-indigo-600">{result.opportunity.organization.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{result.opportunity.organization}</p>
                  <p className="text-xs text-slate-500">Technology Company</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#3525cd] text-white rounded-2xl flex flex-col gap-3 shadow-lg shadow-[#3525cd]/20">
              <h4 className="font-bold text-lg">Ready to apply?</h4>
              <p className="text-sm opacity-80">Let our AI help you create a tailored application.</p>
              <Button className="w-full py-3 bg-white text-[#3525cd] rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
                <Sparkles className="h-4 w-4 mr-2" /> Apply with AI
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [opportunities, setOpportunities] = useState<MatchResult[]>(sampleOpportunities);
  const [loading, setLoading] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<MatchResult | null>(null);

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
      case "internship": return <Briefcase className="h-5 w-5" />;
      case "scholarship": return <Award className="h-5 w-5" />;
      case "research": return <Search className="h-5 w-5" />;
      case "job": return <Briefcase className="h-5 w-5" />;
      default: return <GraduationCap className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <DashboardLayout showHeader={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <GraduationCap className="h-12 w-12 mx-auto animate-pulse text-primary" />
            <p className="mt-4 text-slate-600">Loading your opportunities...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-[#3525cd] to-[#8127cf] p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between relative overflow-hidden min-h-[220px]">
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold tracking-tighter mb-2">
                Welcome back, {profile?.name || 'User'}
              </h2>
              <p className="text-white/80 max-w-md">
                Your AI scout found {opportunities.length} new opportunities tailored to your profile.
              </p>
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
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-500/70 uppercase tracking-wider mb-2">Opportunities Found</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">{opportunities.length}</span>
              <span className="text-xs font-bold text-emerald-600">+12 today</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-500/70 uppercase tracking-wider mb-2">Applications Sent</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">42</span>
              <span className="text-xs font-bold text-slate-500/50">8 pending</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-2 border-[#e2dfff]">
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
            <Button variant="ghost" className="text-[#3525cd] text-sm font-bold flex items-center gap-1 hover:underline">
              View All <FileText className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {opportunities.slice(0, 3).map((result) => (
              <Card 
                key={result.opportunity.id} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#e2dfff]/50 transition-all flex flex-col group cursor-pointer"
                onClick={() => setSelectedOpportunity(result)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200/10">
                    {getTypeIcon(result.opportunity.type)}
                  </div>
                  <button 
                    className="h-10 w-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#3525cd]/10 hover:text-[#3525cd] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Bookmark className="h-5 w-5" />
                  </button>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOpportunity(result);
                  }}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {selectedOpportunity && (
        <OpportunityModal 
          result={selectedOpportunity} 
          onClose={() => setSelectedOpportunity(null)} 
        />
      )}
    </DashboardLayout>
  );
}
