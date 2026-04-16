"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Search, Bookmark, Clock, MapPin, ArrowRight, 
  LayoutDashboard, Compass, FileText, BarChart2, MessageSquare, 
  Settings, Sparkles, Bell, CheckCircle, Filter, ArrowUpDown,
  ChevronRight, ExternalLink, Verified
} from "lucide-react";

export default function DemoPage() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Demo Preview">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-[#3525cd] to-[#8127cf] p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between relative overflow-hidden min-h-[220px]">
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold tracking-tighter mb-2">Welcome back, Alex</h2>
              <p className="text-white/80 max-w-md">Your AI scout found 12 new opportunities tailored to your product design skills since yesterday.</p>
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
                  <p className="text-xs font-semibold text-slate-700">AI Scout scanning Devpost...</p>
                  <p className="text-[10px] text-slate-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="text-[#8127cf] h-5 w-5" />
                <div>
                  <p className="text-xs font-semibold text-slate-700">12 new opportunities found</p>
                  <p className="text-[10px] text-slate-500">5 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Sparkles className="text-[#3525cd] h-5 w-5" />
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

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-500/70 uppercase tracking-wider mb-2">Opportunities Found</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">1,284</span>
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
              <span className="text-4xl font-black text-[#3525cd] tracking-tighter">94%</span>
              <span className="text-xs font-bold text-[#3525cd]/70">Top 5% user</span>
            </div>
          </div>
        </section>

        {/* Recommended Opportunities */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[11px] font-black text-[#3525cd] uppercase tracking-[0.2em]">Curated For You</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Recommended Opportunities</h3>
            </div>
            <Button variant="ghost" className="text-[#3525cd] text-sm font-bold flex items-center gap-1 hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#e2dfff]/50 transition-all flex flex-col group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200/10">
                  <span className="text-xl font-bold text-blue-600">N</span>
                </div>
                <div className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100/50">
                  98% Match
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">Senior Product Designer</h4>
              <p className="text-sm text-slate-500 mb-6 font-medium">Nebula Cloud Systems • Remote</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="text-[#3525cd] h-4 w-4" />
                  <span className="text-xs text-slate-500">Deadline: <span className="font-semibold text-slate-700">Nov 14, 2024</span></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">Figma</span>
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">SaaS</span>
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">UX Research</span>
                </div>
              </div>
              <Button className="mt-auto w-full py-3 bg-slate-100 hover:bg-[#3525cd] hover:text-white rounded-xl text-sm font-bold transition-all">
                View Details
              </Button>
            </Card>
            <Card className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#e2dfff]/50 transition-all flex flex-col group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200/10">
                  <span className="text-xl font-bold text-purple-600">Q</span>
                </div>
                <div className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100/50">
                  95% Match
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">Lead UX Architect</h4>
              <p className="text-sm text-slate-500 mb-6 font-medium">Quantum Fintech • New York, NY</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="text-[#3525cd] h-4 w-4" />
                  <span className="text-xs text-slate-500">Deadline: <span className="font-semibold text-slate-700">Nov 22, 2024</span></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">Systems Thinking</span>
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">Fintech</span>
                </div>
              </div>
              <Button className="mt-auto w-full py-3 bg-slate-100 hover:bg-[#3525cd] hover:text-white rounded-xl text-sm font-bold transition-all">
                View Details
              </Button>
            </Card>
            <Card className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#e2dfff]/50 transition-all flex flex-col group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200/10">
                  <span className="text-xl font-bold text-green-600">H</span>
                </div>
                <div className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100/50">
                  92% Match
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">Creative Technologist</h4>
              <p className="text-sm text-slate-500 mb-6 font-medium">Hyperion Media • London, UK</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="text-[#3525cd] h-4 w-4" />
                  <span className="text-xs text-slate-500">Deadline: <span className="font-semibold text-slate-700">Dec 01, 2024</span></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">Web3</span>
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">Three.js</span>
                </div>
              </div>
              <Button className="mt-auto w-full py-3 bg-slate-100 hover:bg-[#3525cd] hover:text-white rounded-xl text-sm font-bold transition-all">
                View Details
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
