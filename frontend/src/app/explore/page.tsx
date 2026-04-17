"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Search, Bookmark, Clock, MapPin, ArrowRight, X,
  LayoutDashboard, Compass, FileText, BarChart2, MessageSquare, 
  Settings, Sparkles, Bell, CheckCircle, Filter, ArrowUpDown,
  ChevronRight, ExternalLink, Verified, School, Terminal
} from "lucide-react";

import { useSaved } from "@/context/SavedContext";

import { sampleOpportunities, MatchResult } from "@/data/opportunities";

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
              <Button variant="outline" className="w-full py-3 bg-transparent text-white border border-white/30 rounded-xl font-bold text-sm hover:bg-white/10">
                View Original Posting
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<MatchResult | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { savedIds, toggleSave, isSaved } = useSaved();

  const handleToggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave(id);
  };

  const filters = [
    { id: "all", label: "All Tracks" },
    { id: "internship", label: "Internships" },
    { id: "hackathon", label: "Hackathons" },
    { id: "scholarship", label: "Scholarships" },
    { id: "research", label: "Research" },
  ];

  const filteredOpportunities = activeFilter === "all" 
    ? sampleOpportunities 
    : sampleOpportunities.filter(item => item.opportunity.type === activeFilter);

  return (
    <DashboardLayout title="Explore" subtitle="Discovery Engine">
      <div className="space-y-8">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Opportunity Explorer</h2>
              <p className="text-slate-500 mt-2">
                {activeFilter === "all" 
                  ? "Discover internships, hackathons, scholarships, and research opportunities" 
                  : `Showing ${filteredOpportunities.length} ${filters.find(f => f.id === activeFilter)?.label.toLowerCase()}`
                }
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                    activeFilter === filter.id
                      ? "bg-[#3525cd] text-white shadow-lg shadow-[#3525cd]/20"
                      : "bg-white text-slate-600 border border-slate-100 hover:border-[#3525cd]/30"
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {activeFilter === "all" && (
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 flex flex-col md:flex-row items-center gap-8 mb-8 min-h-[280px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3525cd]/40 to-[#8127cf]/40 opacity-50"></div>
              <div className="relative z-10 flex-1">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider mb-4 inline-block">AI Pick for You</span>
                <h3 className="text-3xl font-bold text-white mb-4">Summer Quantum Research Fellowship</h3>
                <p className="text-indigo-100/80 max-w-lg mb-6 leading-relaxed">Pioneer the future of computing at the Global Institute of Technology.</p>
                <div className="flex items-center gap-6 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <Verified className="h-4 w-4 text-[#f0dbff]" />
                    <span>Global Institute of Tech</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#f0dbff]" />
                    <span>Closes in 12 days</span>
                  </div>
                </div>
              </div>
              <div className="relative z-10 w-full md:w-auto">
                <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/20 flex flex-col items-center">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2 text-center">Match Score</div>
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-slate-200/30" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
                      <circle className="text-white" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeDasharray="264" strokeDashoffset="12" strokeWidth="8"></circle>
                    </svg>
                    <span className="absolute text-2xl font-black text-white">98%</span>
                  </div>
                  <Button className="mt-4 w-full py-2.5 bg-[#3525cd] text-white rounded-xl font-bold text-sm shadow-lg">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>

        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No opportunities found for this filter.</p>
            <Button 
              onClick={() => setActiveFilter("all")}
              className="mt-4 px-6 py-2 bg-[#3525cd] text-white rounded-xl font-bold"
            >
              View All Opportunities
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((result) => (
              <Card 
                key={result.opportunity.id} 
                className="group bg-white rounded-2xl p-6 border border-transparent hover:border-[#3525cd]/20 transition-all duration-300 hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedOpportunity(result)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                    <span className="text-lg font-bold text-indigo-600">{result.opportunity.organization.charAt(0)}</span>
                  </div>
<button 
                      onClick={(e) => handleToggleSave(result.opportunity.id, e)}
                      className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                        isSaved(result.opportunity.id)
                          ? "text-[#8127cf]"
                          : "text-slate-400 hover:bg-[#3525cd]/10 hover:text-[#3525cd]"
                      }`}
                    >
                      <Bookmark className={`h-5 w-5 ${isSaved(result.opportunity.id) ? "fill-current" : ""}`} />
                    </button>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">{result.opportunity.title}</h4>
                <p className="text-sm text-slate-500 mb-4">{result.opportunity.organization} • {result.opportunity.location}</p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-2 py-1 bg-[#e2dfff] text-[#3323cc] rounded text-[10px] font-bold">{result.match_score}% MATCH</div>
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3525cd] rounded-full" style={{ width: `${result.match_score}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Deadline</span>
                    <span className="text-xs font-semibold">{result.opportunity.deadline || 'Rolling'}</span>
                  </div>
                  <Button variant="outline" size="sm" className="px-4 py-2 bg-slate-50 hover:bg-[#3525cd] hover:text-white rounded-lg text-xs font-bold transition-all">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
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
