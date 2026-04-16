"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Search, Bookmark, Clock, MapPin, ArrowRight, 
  LayoutDashboard, Compass, FileText, BarChart2, MessageSquare, 
  Settings, Sparkles, Bell, CheckCircle, Plus
} from "lucide-react";

export default function SavedPage() {
  return (
    <DashboardLayout title="Saved" subtitle="Curation">
      <div className="space-y-12">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold text-[#3525cd] tracking-[0.2em] uppercase mb-2 block">Curation</span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Saved Opportunities</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="px-5 py-2 rounded-full bg-[#3525cd] text-white text-xs font-bold uppercase tracking-wider transition-all">All</Button>
            <Button variant="outline" className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-all">Internships</Button>
            <Button variant="outline" className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-all">Hackathons</Button>
            <Button variant="outline" className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-all">Full-time</Button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Opportunity Card 1 */}
          <Card className="bg-white rounded-xl p-6 shadow-lg group hover:-translate-y-1 transition-all duration-300 relative flex flex-col">
            <button className="absolute top-6 right-6 text-[#8127cf]">
              <Bookmark className="h-6 w-6 fill-current" />
            </button>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-bold text-blue-600">S</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-tight group-hover:text-[#3525cd] transition-colors">Product Design Intern</h3>
                <p className="text-sm text-slate-500 mt-1">Starlight Systems</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-slate-100 h-10 rounded-full flex items-center px-4">
                <Sparkles className="h-4 w-4 text-[#8127cf]" />
                <span className="text-xs font-bold text-slate-700 ml-2">95% Match</span>
                <div className="ml-auto w-12 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#3525cd] h-full w-[95%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">Ends in 4 days</span>
              </div>
              <Button variant="link" className="text-[#3525cd] text-xs font-bold uppercase tracking-widest">View Details</Button>
            </div>
          </Card>

          {/* Opportunity Card 2 */}
          <Card className="bg-white rounded-xl p-6 shadow-lg group hover:-translate-y-1 transition-all duration-300 relative flex flex-col">
            <button className="absolute top-6 right-6 text-[#8127cf]">
              <Bookmark className="h-6 w-6 fill-current" />
            </button>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-bold text-green-600">O</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-tight group-hover:text-[#3525cd] transition-colors">Global AI Hackathon</h3>
                <p className="text-sm text-slate-500 mt-1">OpenAI Foundation</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-slate-100 h-10 rounded-full flex items-center px-4">
                <Sparkles className="h-4 w-4 text-[#8127cf]" />
                <span className="text-xs font-bold text-slate-700 ml-2">88% Match</span>
                <div className="ml-auto w-12 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#3525cd] h-full w-[88%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">May 12, 2024</span>
              </div>
              <Button variant="link" className="text-[#3525cd] text-xs font-bold uppercase tracking-widest">View Details</Button>
            </div>
          </Card>

          {/* Opportunity Card 3 */}
          <Card className="bg-white rounded-xl p-6 shadow-lg group hover:-translate-y-1 transition-all duration-300 relative flex flex-col">
            <button className="absolute top-6 right-6 text-[#8127cf]">
              <Bookmark className="h-6 w-6 fill-current" />
            </button>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-bold text-purple-600">S</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-tight group-hover:text-[#3525cd] transition-colors">Junior ML Engineer</h3>
                <p className="text-sm text-slate-500 mt-1">Synthetix Cloud</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-slate-100 h-10 rounded-full flex items-center px-4">
                <Sparkles className="h-4 w-4 text-[#8127cf]" />
                <span className="text-xs font-bold text-slate-700 ml-2">91% Match</span>
                <div className="ml-auto w-12 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#3525cd] h-full w-[91%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">Closing tomorrow</span>
              </div>
              <Button variant="link" className="text-[#3525cd] text-xs font-bold uppercase tracking-widest">View Details</Button>
            </div>
          </Card>

          {/* AI Suggestion Card */}
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

          {/* Empty Placeholder/Add Card */}
          <div className="bg-[#f7f9fb] border-2 border-dashed border-slate-200/30 rounded-xl p-6 flex flex-col items-center justify-center text-center group hover:border-[#3525cd]/40 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#3525cd]/10 transition-colors">
              <Plus className="h-6 w-6 text-slate-500 group-hover:text-[#3525cd] transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-600 group-hover:text-[#3525cd] transition-colors">Find More Opportunities</p>
            <p className="text-xs text-slate-400 mt-1 px-4">Browse our curated list of 200+ active roles.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
