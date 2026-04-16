"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, Search, FileText, TrendingUp, ArrowRight, 
  LayoutDashboard, Compass, Bookmark, BarChart2, MessageSquare, 
  Settings, Sparkles, Bell, CheckCircle, Filter, ArrowUpDown,
  ChevronRight, ExternalLink, X, Clock, MapPin, DollarSign
} from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50 border-r border-slate-200/50 flex flex-col gap-2 p-4 z-40 hidden md:flex">
        <div className="mb-8 px-2">
          <h1 className="text-lg font-black text-slate-900 tracking-tighter">CareerPilot AI</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">The Intelligent Path</p>
        </div>
        <nav className="flex flex-col gap-1">
          <Link href="/demo" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-50 text-indigo-700 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <div className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1 cursor-pointer">
            <Compass className="h-5 w-5" />
            <span className="text-sm font-medium">Explore</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1 cursor-pointer">
            <Bookmark className="h-5 w-5" />
            <span className="text-sm font-medium">Saved</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1 cursor-pointer">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">Applications</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1 cursor-pointer">
            <BarChart2 className="h-5 w-5" />
            <span className="text-sm font-medium">Insights</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1 cursor-pointer">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm font-medium">AI Assistant</span>
          </div>
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-100/50">
          <div className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg mb-4 cursor-pointer">
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </div>
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
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 lg:w-64" placeholder="Explore careers..." type="text" />
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <span className="text-slate-500 hover:text-indigo-500 font-medium text-sm transition-colors cursor-pointer">Explore</span>
              <span className="text-slate-500 hover:text-indigo-500 font-medium text-sm transition-colors cursor-pointer">Applications</span>
              <span className="text-slate-500 hover:text-indigo-500 font-medium text-sm transition-colors cursor-pointer">Insights</span>
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
            <div className="w-10 h-10 rounded-full border-2 border-[#e2dfff] overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <div className="px-8 py-8 space-y-8">
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
                <span className="text-4xl font-black text-slate-900 tracking-tighter">1,284</span>
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
                <span className="text-4xl font-black text-[#3525cd] tracking-tighter">94%</span>
                <span className="text-xs font-bold text-[#3525cd]/70">Top 5% user</span>
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
              <Card className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#e2dfff]/50 transition-all flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200/10">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">G</span>
                    </div>
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
              <Card className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#e2dfff]/50 transition-all flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200/10">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold">Q</span>
                    </div>
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
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">Mentorship</span>
                  </div>
                </div>
                <Button className="mt-auto w-full py-3 bg-slate-100 hover:bg-[#3525cd] hover:text-white rounded-xl text-sm font-bold transition-all">
                  View Details
                </Button>
              </Card>
              <Card className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#e2dfff]/50 transition-all flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200/10">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold">H</span>
                    </div>
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
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">Brand</span>
                  </div>
                </div>
                <Button className="mt-auto w-full py-3 bg-slate-100 hover:bg-[#3525cd] hover:text-white rounded-xl text-sm font-bold transition-all">
                  View Details
                </Button>
              </Card>
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
              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">A</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Visual Designer</p>
                    <p className="text-[10px] text-slate-500/70 font-semibold uppercase tracking-wider">Astro Digital • Full-time</p>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end mr-12">
                  <p className="text-xs font-semibold text-slate-700">Found 2h ago</p>
                  <p className="text-[10px] text-slate-500">via LinkedIn Jobs</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-black text-indigo-600">88%</p>
                    <div className="w-16 bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#3525cd] h-full w-[88%]"></div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#3525cd] transition-colors" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">S</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Product Manager, AI</p>
                    <p className="text-[10px] text-slate-500/70 font-semibold uppercase tracking-wider">Synthetix • Hybrid</p>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end mr-12">
                  <p className="text-xs font-semibold text-slate-700">Found 4h ago</p>
                  <p className="text-[10px] text-slate-500">via Company Board</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-black text-indigo-600">82%</p>
                    <div className="w-16 bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#3525cd] h-full w-[82%]"></div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#3525cd] transition-colors" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">E</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Lead Content Strategist</p>
                    <p className="text-[10px] text-slate-500/70 font-semibold uppercase tracking-wider">Evergreen Lab • Remote</p>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end mr-12">
                  <p className="text-xs font-semibold text-slate-700">Found 6h ago</p>
                  <p className="text-[10px] text-slate-500">via Indeed</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-black text-indigo-600">79%</p>
                    <div className="w-16 bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#3525cd] h-full w-[79%]"></div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#3525cd] transition-colors" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="w-full py-12 px-8 bg-white border-t border-slate-100 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
            <p className="text-xs uppercase tracking-widest text-slate-500">© 2024 CareerPilot AI. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors underline underline-offset-4 cursor-pointer">Privacy Policy</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors underline underline-offset-4 cursor-pointer">Terms of Service</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors underline underline-offset-4 cursor-pointer">Help Center</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors underline underline-offset-4 cursor-pointer">Contact</span>
            </div>
          </div>
        </footer>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-slate-50/80 backdrop-blur-md border-t border-slate-200/50 flex justify-around py-3 px-2 z-50">
        <div className="flex flex-col items-center gap-1 text-indigo-600">
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px] font-bold">Dash</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <Compass className="h-5 w-5" />
          <span className="text-[10px] font-bold">Explore</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <FileText className="h-5 w-5" />
          <span className="text-[10px] font-bold">Apps</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <div className="w-6 h-6 rounded-full bg-slate-300"></div>
          <span className="text-[10px] font-bold">Profile</span>
        </div>
      </nav>

      <Button className="fixed bottom-24 right-8 md:bottom-12 md:right-12 w-14 h-14 bg-gradient-to-br from-[#3525cd] to-[#8127cf] rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-40">
        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
      </Button>
    </div>
  );
}
