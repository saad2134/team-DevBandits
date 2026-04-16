"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Search, Bookmark, Clock, MapPin, ArrowRight, ArrowUpDown,
  LayoutDashboard, Compass, FileText, BarChart2, MessageSquare, 
  Settings, Sparkles, Bell, CheckCircle, TrendingUp, Cloud,
  Terminal, Database, ChevronRight, Lightbulb
} from "lucide-react";

export default function InsightsPage() {
  return (
    <DashboardLayout title="Insights" subtitle="Your career trajectory analysis">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-transparent hover:border-[#3525cd]/10 transition-all group">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Career Match Score</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-[#3525cd] tracking-tighter">92%</h3>
              <div className="flex items-center text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full mb-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +4.2%
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#3525cd] to-[#8127cf] w-[92%] rounded-full shadow-[0_0_8px_rgba(53,37,205,0.3)]"></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-transparent hover:border-[#3525cd]/10 transition-all">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Market Demand</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-slate-900 tracking-tighter">High</h3>
              <Sparkles className="h-6 w-6 text-[#8127cf] mb-1" />
            </div>
            <p className="mt-4 text-xs text-slate-500 font-medium">8.4k relevant openings this month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-transparent hover:border-[#3525cd]/10 transition-all">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Skill Gap Index</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-extrabold text-slate-900 tracking-tighter">0.14</h3>
              <span className="text-xs font-bold text-slate-500 mb-1">Low Gap</span>
            </div>
            <p className="mt-4 text-xs text-slate-500 font-medium">Focused on infrastructure tools</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h4 className="text-xl font-bold text-slate-900">Opportunity Match Trends</h4>
                <p className="text-sm text-slate-500">AI-predicted compatibility over the last 6 months</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs font-bold px-3 py-1.5 rounded-md bg-slate-100 text-slate-700">6M</button>
                <button className="text-xs font-bold px-3 py-1.5 rounded-md text-slate-500 hover:bg-slate-100">1Y</button>
              </div>
            </div>
            <div className="relative h-64 w-full">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3525cd" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#3525cd" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,150 Q100,120 200,140 T400,80 T600,60 T800,40 V200 H0 Z" fill="url(#chartGradient)"></path>
                <path d="M0,150 Q100,120 200,140 T400,80 T600,60 T800,40" fill="none" stroke="#3525cd" strokeLinecap="round" strokeWidth="3"></path>
                <circle cx="200" cy="140" fill="white" r="4" stroke="#3525cd" strokeWidth="2"></circle>
                <circle cx="400" cy="80" fill="white" r="4" stroke="#3525cd" strokeWidth="2"></circle>
                <circle cx="600" cy="60" fill="white" r="4" stroke="#3525cd" strokeWidth="2"></circle>
                <circle cx="800" cy="40" fill="#8127cf" r="6"></circle>
              </svg>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-[#eceef0] p-8 rounded-lg flex flex-col items-center justify-center text-center">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Skill Gap Analysis</h4>
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-white" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12"></circle>
                <circle className="text-[#3525cd]" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="125" strokeWidth="12"></circle>
                <circle className="text-[#8127cf] opacity-60" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="400" strokeWidth="12"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900 leading-none">75%</span>
                <span className="text-[10px] uppercase font-bold text-slate-500">Mastery</span>
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3525cd]"></div>
                  <span className="text-xs font-medium text-slate-600">Technical Skills</span>
                </div>
                <span className="text-xs font-bold">88%</span>
              </div>
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8127cf] opacity-60"></div>
                  <span className="text-xs font-medium text-slate-600">Leadership</span>
                </div>
                <span className="text-xs font-bold">62%</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm h-full">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900">Priority Up-skilling</h4>
                <span className="text-[10px] font-bold text-[#8127cf] bg-[#f0dbff]/30 px-2 py-0.5 rounded uppercase tracking-tighter">Top Matches</span>
              </div>
              <div className="space-y-4">
                <div className="group flex items-center justify-between p-3 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
                      <Cloud className="text-[#3525cd]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">Kubernetes</p>
                      <p className="text-[10px] text-slate-500">Essential for Senior DevOps</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#3525cd] transition-colors" />
                </div>
                <div className="group flex items-center justify-between p-3 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
                      <Terminal className="text-[#3525cd]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">Docker</p>
                      <p className="text-[10px] text-slate-500">Required by 82% of matches</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#3525cd] transition-colors" />
                </div>
                <div className="group flex items-center justify-between p-3 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
                      <Database className="text-[#3525cd]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">Rust</p>
                      <p className="text-[10px] text-slate-500">Emerging demand in finance</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#3525cd] transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 bg-white p-8 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="text-lg font-bold text-slate-900">Application Success Rate</h4>
                <p className="text-xs text-slate-500">Conversion from application to interview</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900">24.5%</span>
                <p className="text-[10px] font-bold text-green-600">Industry Avg: 12%</p>
              </div>
            </div>
            <div className="flex items-end justify-between h-40 gap-4 mt-4">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-slate-50 rounded-t-md relative h-[30%]">
                  <div className="absolute bottom-0 w-full bg-[#c3c0ff] hover:bg-[#e2dfff] transition-colors rounded-t-md h-full"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Week 1</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-slate-50 rounded-t-md relative h-[45%]">
                  <div className="absolute bottom-0 w-full bg-[#c3c0ff] hover:bg-[#e2dfff] transition-colors rounded-t-md h-full"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Week 2</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-slate-50 rounded-t-md relative h-[75%]">
                  <div className="absolute bottom-0 w-full bg-[#3525cd] rounded-t-md h-full"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Week 3</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-slate-50 rounded-t-md relative h-[60%]">
                  <div className="absolute bottom-0 w-full bg-[#c3c0ff] hover:bg-[#e2dfff] transition-colors rounded-t-md h-full"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Week 4</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-r from-[#3525cd]/20 via-[#8127cf]/20 to-[#3525cd]/20">
          <div className="bg-white rounded-[0.65rem] p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 shrink-0 bg-[#4f46e5] rounded-full flex items-center justify-center text-white shadow-xl">
              <Lightbulb className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-bold uppercase tracking-widest text-[#3525cd] mb-2">AI Strategic Recommendation</h5>
              <p className="text-lg text-slate-900 font-medium leading-relaxed">
                Your profile currently ranks in the <span className="font-bold text-[#3525cd]">top 5%</span> for Cloud Architect roles. To bridge the gap to &quot;Principal&quot; level, we recommend focusing on <span className="italic">Multi-cloud Security Compliance</span> certifications within the next 3 months.
              </p>
            </div>
            <Button className="shrink-0 px-6 py-3 bg-[#3525cd] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#3525cd]/20 transition-all text-sm">
              Create Learning Path
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
