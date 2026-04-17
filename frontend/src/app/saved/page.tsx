"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Bookmark, Clock, Sparkles, MessageSquare, Plus, X,
  School, Terminal
} from "lucide-react";

import { useSaved, isValidDeadline } from "@/context/SavedContext";
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

const filters = [
  { id: "all", label: "All" },
  { id: "internship", label: "Internships" },
  { id: "hackathon", label: "Hackathons" },
  { id: "scholarship", label: "Scholarships" },
  { id: "research", label: "Research" },
];

export default function SavedPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedOpportunity, setSelectedOpportunity] = useState<MatchResult | null>(null);
  const { savedIds, toggleSave, isSaved } = useSaved();

  const savedOpportunities = sampleOpportunities.filter(opp => 
  savedIds.includes(opp.opportunity.id) && isValidDeadline(opp.opportunity.deadline)
);
  
  const filteredOpportunities = activeFilter === "all"
    ? savedOpportunities
    : savedOpportunities.filter(opp => opp.opportunity.type === activeFilter);

  return (
    <DashboardLayout title="Saved" subtitle="Curation">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold text-[#3525cd] tracking-[0.2em] uppercase mb-2 block">Curation</span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Saved Opportunities</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === filter.id
                    ? "bg-[#3525cd] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.length === 0 || savedIds.length === 0 ? (
            <div className="col-span-1 lg:col-span-3 bg-[#f7f9fb] border-2 border-dashed border-slate-200/30 rounded-xl p-12 flex flex-col items-center justify-center text-center">
              <p className="text-sm font-bold text-slate-600">
                {savedIds.length === 0 ? "No saved opportunities yet" : "All saved opportunities have expired"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {savedIds.length === 0 ? "Save opportunities from Explore to see them here" : "Check Explore for new opportunities"}
              </p>
            </div>
          ) : (
            filteredOpportunities.map((result) => (
              <Card 
                key={result.opportunity.id}
                className="bg-white rounded-xl p-6 shadow-lg group hover:-translate-y-1 transition-all duration-300 relative flex flex-col cursor-pointer"
                onClick={() => setSelectedOpportunity(result)}
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(result.opportunity.id);
                  }}
                  className="absolute top-6 right-6 text-[#8127cf]"
                >
                  <Bookmark className="h-6 w-6 fill-current" />
                </button>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                    <span className="text-2xl font-bold text-indigo-600">{result.opportunity.organization.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight text-[#3525cd] transition-colors">{result.opportunity.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{result.opportunity.organization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 bg-slate-100 h-10 rounded-full flex items-center px-4">
                    <Sparkles className="h-4 w-4 text-[#8127cf]" />
                    <span className="text-xs font-bold text-slate-700 ml-2">{result.match_score}% Match</span>
                    <div className="ml-auto w-12 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#3525cd] h-full" style={{ width: `${result.match_score}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium">{result.opportunity.deadline || 'Rolling'}</span>
                  </div>
                  <Button 
                    variant="link" 
                    className="text-[#3525cd] text-xs font-bold uppercase tracking-widest"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOpportunity(result);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          )}

          <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-[#3525cd] to-[#8127cf] rounded-xl p-8 text-white shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">AI Intelligence</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 max-w-md">Refine your saved list to get better matches.</h3>
              <p className="text-indigo-100 text-sm max-w-sm mb-8">We&apos;ve noticed you prefer remote-first design roles. Would you like to prioritize these in your feed?</p>
              <div className="flex gap-4">
                <Button className="bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white/30 transition-all">
                  Yes, Adjust Focus
                </Button>
                <Button variant="outline" className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all border-white/30 text-white">
                  Not now
                </Button>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20">
              <MessageSquare className="h-48 w-48" />
            </div>
          </div>

          <div className="bg-[#f7f9fb] border-2 border-dashed border-slate-200/30 rounded-xl p-6 flex flex-col items-center justify-center text-center group hover:border-[#3525cd]/40 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#3525cd]/10 transition-colors">
              <Plus className="h-6 w-6 text-slate-500 group-hover:text-[#3525cd] transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-600 group-hover:text-[#3525cd] transition-colors">Find More Opportunities</p>
            <p className="text-xs text-slate-400 mt-1 px-4">Browse our curated list of 200+ active roles.</p>
          </div>
        </div>
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