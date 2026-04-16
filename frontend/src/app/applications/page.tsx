"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Search, Bookmark, Clock, MapPin, ArrowRight, 
  LayoutDashboard, Compass, FileText, BarChart2, MessageSquare, 
  Settings, Sparkles, Bell, CheckCircle, Filter, ArrowUpDown,
  ChevronRight, ExternalLink, TrendingUp, Download
} from "lucide-react";

export default function ApplicationsPage() {
  return (
    <DashboardLayout title="Applications" subtitle="Tracking your career trajectory">
      <div className="space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 p-8 bg-white rounded-xl border-l-4 border-[#3525cd] relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Total Outreach</p>
              <h3 className="text-4xl font-black text-slate-900">124</h3>
              <p className="mt-4 text-sm text-slate-500 flex items-center gap-1">
                <span className="text-green-600 font-bold">+12%</span> from last month
              </p>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-5">
              <TrendingUp className="h-32 w-32" />
            </div>
          </div>
          <div className="p-8 bg-white rounded-xl border-l-4 border-[#8127cf] relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Interviews</p>
              <h3 className="text-4xl font-black text-slate-900">18</h3>
              <div className="mt-4 w-full h-1 bg-slate-100 rounded-full">
                <div className="h-full w-2/3 bg-[#8127cf] rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-8 bg-indigo-600 rounded-xl relative overflow-hidden text-white">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Success Rate</p>
              <h3 className="text-4xl font-black">14.5%</h3>
              <p className="mt-4 text-xs font-medium bg-white/20 inline-block px-2 py-1 rounded">AI Optimized</p>
            </div>
            <div className="absolute top-0 right-0 p-4">
              <Sparkles className="h-8 w-8 opacity-40" />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h4 className="font-bold text-lg text-slate-900">Recent Submissions</h4>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Company</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Opportunity</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Date Applied</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-blue-600">G</div>
                      <span className="font-semibold text-slate-900">Google</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-900">Senior Product Designer</p>
                    <p className="text-xs text-slate-500">UX/UI • Mountain View, CA</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-tight rounded-full border border-blue-100">Interview</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-slate-500">Oct 24, 2023</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="link" className="text-indigo-600 hover:text-indigo-800 text-sm font-bold">View Details</Button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-black">N</div>
                      <span className="font-semibold text-slate-900">Notion</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-900">Staff Engineer</p>
                    <p className="text-xs text-slate-500">Infrastructure • Remote</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-tight rounded-full border border-indigo-100">Applied</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-slate-500">Oct 22, 2023</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="link" className="text-indigo-600 hover:text-indigo-800 text-sm font-bold">Update Status</Button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center font-bold text-red-600">A</div>
                      <span className="font-semibold text-slate-900">Airbnb</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-900">Design Manager</p>
                    <p className="text-xs text-slate-500">Hospitality • San Francisco</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-tight rounded-full border border-green-100">Accepted</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-slate-500">Oct 18, 2023</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="link" className="text-indigo-600 hover:text-indigo-800 text-sm font-bold">View Offer</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between">
            <p className="text-xs text-slate-500">Showing 1-4 of 124 applications</p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="p-1 rounded-lg hover:bg-slate-100 disabled:opacity-30" disabled>
                <ChevronRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button variant="outline" size="sm" className="p-1 rounded-lg hover:bg-slate-100">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-indigo-900 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-indigo-500/20 to-transparent"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="h-20 w-20 rounded-full bg-[#8127cf] flex items-center justify-center text-white shrink-0 shadow-xl shadow-[#8127cf]/30">
              <MessageSquare className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-xl text-white">AI Career Insight</h4>
              <p className="text-indigo-100 text-sm max-w-2xl leading-relaxed">
                Based on your recent applications at <span className="font-bold text-white">Google</span> and <span className="font-bold text-white">Airbnb</span>, we&apos;ve noticed high engagement when you highlight your &quot;System Thinking&quot; skills. We suggest updating your <span className="underline decoration-[#8127cf] underline-offset-4">Stripe</span> application focus to match this trend.
              </p>
              <div className="pt-4 flex gap-4">
                <Button className="text-white text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all">
                  Optimize Resume
                </Button>
                <Button variant="outline" className="text-white text-xs font-bold uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition-all">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
