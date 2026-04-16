"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Search, Bookmark, Clock, MapPin, ArrowRight, 
  LayoutDashboard, Compass, FileText, BarChart2, MessageSquare, 
  Settings, Sparkles, Bell, CheckCircle, Filter, ArrowUpDown,
  ChevronRight, ExternalLink, Verified
} from "lucide-react";

export default function ExplorePage() {
  return (
    <DashboardLayout title="Explore" subtitle="Discovery Engine">
      <div className="space-y-8">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Opportunity Explorer</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="px-5 py-2.5 rounded-full bg-[#3525cd] text-white text-xs font-bold shadow-lg shadow-[#3525cd]/20 transition-transform active:scale-95">All Tracks</Button>
              <Button variant="outline" className="px-5 py-2.5 rounded-full bg-white text-slate-600 border border-slate-100 text-xs font-bold hover:border-[#3525cd]/30 transition-all">Internships</Button>
              <Button variant="outline" className="px-5 py-2.5 rounded-full bg-white text-slate-600 border border-slate-100 text-xs font-bold hover:border-[#3525cd]/30 transition-all">Hackathons</Button>
              <Button variant="outline" className="px-5 py-2.5 rounded-full bg-white text-slate-600 border border-slate-100 text-xs font-bold hover:border-[#3525cd]/30 transition-all">Scholarships</Button>
              <Button variant="outline" className="px-5 py-2.5 rounded-full bg-white text-slate-600 border border-slate-100 text-xs font-bold hover:border-[#3525cd]/30 transition-all">Research</Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 flex flex-col md:flex-row items-center gap-8 mb-12 min-h-[320px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3525cd]/40 to-[#8127cf]/40 opacity-50"></div>
            <div className="relative z-10 flex-1">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider mb-4 inline-block">AI Pick for You</span>
              <h3 className="text-3xl font-bold text-white mb-4">Summer Quantum Research Fellowship</h3>
              <p className="text-indigo-100/80 max-w-lg mb-6 leading-relaxed">Pioneer the future of computing at the Global Institute of Technology. A fully funded 12-week intensive program for high-potential undergraduates.</p>
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
                <Button className="mt-6 w-full py-3 bg-[#3525cd] text-white rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-transform">
                  Apply with AI
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group bg-white rounded-2xl p-6 border border-transparent hover:border-[#3525cd]/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
              </div>
              <button className="h-10 w-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#3525cd]/10 hover:text-[#3525cd] transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">Product Design Internship</h4>
            <p className="text-sm text-slate-500 mb-4">Lumina Systems • Remote</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-2 py-1 bg-[#e2dfff] text-[#3323cc] rounded text-[10px] font-bold">95% MATCH</div>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#3525cd] rounded-full w-[95%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-slate-400">Deadline</span>
                <span className="text-xs font-semibold">Oct 24, 2024</span>
              </div>
              <Button variant="outline" size="sm" className="px-4 py-2 bg-slate-50 hover:bg-[#3525cd] hover:text-white rounded-lg text-xs font-bold transition-all">
                Quick Apply
              </Button>
            </div>
          </Card>

          <Card className="group bg-white rounded-2xl p-6 border border-transparent hover:border-[#3525cd]/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center overflow-hidden">
                <span className="text-orange-600 font-bold text-xl">E</span>
              </div>
              <button className="h-10 w-10 rounded-full flex items-center justify-center text-[#3525cd] bg-[#3525cd]/5">
                <Bookmark className="h-5 w-5" fill="currentColor" />
              </button>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">Web3 Security Hackathon</h4>
            <p className="text-sm text-slate-500 mb-4">EtherShield Labs • Virtual</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-2 py-1 bg-[#f0dbff] text-[#6900b3] rounded text-[10px] font-bold">88% MATCH</div>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#8127cf] rounded-full w-[88%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-slate-400">Deadline</span>
                <span className="text-xs font-semibold">In 3 days</span>
              </div>
              <Button variant="outline" size="sm" className="px-4 py-2 bg-slate-50 hover:bg-[#3525cd] hover:text-white rounded-lg text-xs font-bold transition-all">
                Join Team
              </Button>
            </div>
          </Card>

          <Card className="group bg-white rounded-2xl p-6 border border-transparent hover:border-[#3525cd]/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
              </div>
              <button className="h-10 w-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#3525cd]/10 hover:text-[#3525cd] transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">Women in Tech Scholarship</h4>
            <p className="text-sm text-slate-500 mb-4">Stellar Foundation • Global</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-2 py-1 bg-[#e2dfff] text-[#3323cc] rounded text-[10px] font-bold">92% MATCH</div>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#3525cd] rounded-full w-[92%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-slate-400">Deadline</span>
                <span className="text-xs font-semibold">Nov 15, 2024</span>
              </div>
              <Button variant="outline" size="sm" className="px-4 py-2 bg-slate-50 hover:bg-[#3525cd] hover:text-white rounded-lg text-xs font-bold transition-all">
                View Details
              </Button>
            </div>
          </Card>

          <Card className="group bg-white rounded-2xl p-6 border border-transparent hover:border-[#3525cd]/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
              </div>
              <button className="h-10 w-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#3525cd]/10 hover:text-[#3525cd] transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">Data Science Fellowship</h4>
            <p className="text-sm text-slate-500 mb-4">DataMind AI • San Francisco</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-2 py-1 bg-[#e2dfff] text-[#3323cc] rounded text-[10px] font-bold">76% MATCH</div>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#3525cd] rounded-full w-[76%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-slate-400">Deadline</span>
                <span className="text-xs font-semibold">Rolling Basis</span>
              </div>
              <Button variant="outline" size="sm" className="px-4 py-2 bg-slate-50 hover:bg-[#3525cd] hover:text-white rounded-lg text-xs font-bold transition-all">
                Quick Apply
              </Button>
            </div>
          </Card>

          <Card className="group bg-white rounded-2xl p-6 border border-transparent hover:border-[#3525cd]/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-xl bg-[#e2dfff] flex items-center justify-center overflow-hidden">
                <Sparkles className="text-[#3525cd] h-6 w-6" />
              </div>
              <button className="h-10 w-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#3525cd]/10 hover:text-[#3525cd] transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">Neuroscience Lab Assistant</h4>
            <p className="text-sm text-slate-500 mb-4">University of Cambridge • UK</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-2 py-1 bg-[#e2dfff] text-[#3323cc] rounded text-[10px] font-bold">82% MATCH</div>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#3525cd] rounded-full w-[82%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-slate-400">Deadline</span>
                <span className="text-xs font-semibold">Dec 01, 2024</span>
              </div>
              <Button variant="outline" size="sm" className="px-4 py-2 bg-slate-50 hover:bg-[#3525cd] hover:text-white rounded-lg text-xs font-bold transition-all">
                Read Papers
              </Button>
            </div>
          </Card>

          <Card className="group bg-white rounded-2xl p-6 border border-transparent hover:border-[#3525cd]/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
              </div>
              <button className="h-10 w-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#3525cd]/10 hover:text-[#3525cd] transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3525cd] transition-colors">Open Source Contributor</h4>
            <p className="text-sm text-slate-500 mb-4">Vercel • Remote</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-2 py-1 bg-[#e2dfff] text-[#3323cc] rounded text-[10px] font-bold">90% MATCH</div>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#3525cd] rounded-full w-[90%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-slate-400">Deadline</span>
                <span className="text-xs font-semibold">Jan 10, 2025</span>
              </div>
              <Button variant="outline" size="sm" className="px-4 py-2 bg-slate-50 hover:bg-[#3525cd] hover:text-white rounded-lg text-xs font-bold transition-all">
                Quick Apply
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
