"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, Bookmark, Clock, MapPin, ArrowRight, CheckCircle,
  ExternalLink, School, Terminal
} from "lucide-react";

export default function OpportunityPage() {
  return (
    <DashboardLayout title="Opportunity Details" subtitle="">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          <section className="flex flex-col gap-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600">L</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3525cd]">Full-time • Remote</span>
                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Senior Product Strategist</h2>
                <p className="text-lg text-slate-500 font-medium">Luminary Digital Systems</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400/60 uppercase tracking-widest">Salary Range</span>
                <p className="font-bold text-slate-900">$140k – $185k</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400/60 uppercase tracking-widest">Experience</span>
                <p className="font-bold text-slate-900">5+ Years</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400/60 uppercase tracking-widest">Posted</span>
                <p className="font-bold text-slate-900">2 days ago</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400/60 uppercase tracking-widest">Location</span>
                <p className="font-bold text-slate-900">San Francisco, CA</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="text-xl font-bold tracking-tight border-l-4 border-[#3525cd] pl-4">About the Role</h3>
            <div className="text-slate-500 leading-relaxed flex flex-col gap-4">
              <p>Luminary Digital is seeking a visionary Senior Product Strategist to join our AI Innovation Lab. You will be responsible for bridging the gap between cutting-edge technological capabilities and human-centric product design.</p>
              <p>In this role, you&apos;ll work closely with engineering and design leads to map out the next 24 months of our platform evolution.</p>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="text-xl font-bold tracking-tight border-l-4 border-[#3525cd] pl-4">Key Requirements</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <li className="flex items-start gap-2 text-slate-500">
                <CheckCircle className="text-[#3525cd] h-5 w-5 mt-0.5" />
                <span>Proven track record of launching AI-integrated B2B products.</span>
              </li>
              <li className="flex items-start gap-2 text-slate-500">
                <CheckCircle className="text-[#3525cd] h-5 w-5 mt-0.5" />
                <span>Deep understanding of LLM application frameworks.</span>
              </li>
              <li className="flex items-start gap-2 text-slate-500">
                <CheckCircle className="text-[#3525cd] h-5 w-5 mt-0.5" />
                <span>Expertise in qualitative user research and data synthesis.</span>
              </li>
              <li className="flex items-start gap-2 text-slate-500">
                <CheckCircle className="text-[#3525cd] h-5 w-5 mt-0.5" />
                <span>Ability to articulate complex technical concepts to stakeholders.</span>
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-bold tracking-tight border-l-4 border-[#3525cd] pl-4">Path to Mastery</h3>
              <span className="text-xs font-bold uppercase tracking-widest text-[#4f46e5] bg-[#3525cd]/10 px-3 py-1 rounded-full">Recommended by AI</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-2xl border border-[#3525cd]/5 hover:border-[#3525cd]/20 transition-colors flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e2dfff] flex items-center justify-center">
                    <School className="text-[#3525cd]" />
                  </div>
                  <h4 className="font-bold text-slate-900">Advanced LLM Architecture</h4>
                </div>
                <p className="text-sm text-slate-500 leading-snug">This 4-week intensive course will bridge your current knowledge gap in model fine-tuning.</p>
                <a className="mt-2 text-xs font-bold text-[#3525cd] flex items-center gap-1 hover:underline" href="#">
                  VIEW COURSE <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-[#3525cd]/5 hover:border-[#3525cd]/20 transition-colors flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0dbff] flex items-center justify-center">
                    <Terminal className="text-[#8127cf]" />
                  </div>
                  <h4 className="font-bold text-slate-900">Python for Product Managers</h4>
                </div>
                <p className="text-sm text-slate-500 leading-snug">Gain the technical literacy needed to collaborate effectively with Luminary&apos;s engineering team.</p>
                <a className="mt-2 text-xs font-bold text-[#8127cf] flex items-center gap-1 hover:underline" href="#">
                  VIEW RESOURCE <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <div className="p-8 bg-white rounded-3xl border border-slate-200/10 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#3525cd]/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center text-center gap-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-100" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-[#3525cd]" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="54.6" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-900">85%</span>
                  <span className="text-[10px] font-bold text-slate-400/60 uppercase tracking-widest">Match</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold text-slate-900">Strong Candidate</h4>
                <p className="text-sm text-slate-500 leading-snug">Your background in SaaS strategy makes you a top 10% applicant for this role.</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black text-slate-400/40 uppercase tracking-widest">Strongest Alignments</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-[#3525cd]/5 text-[#3525cd] text-xs font-bold rounded-lg border border-[#3525cd]/10">SaaS Strategy</span>
                  <span className="px-3 py-1.5 bg-[#3525cd]/5 text-[#3525cd] text-xs font-bold rounded-lg border border-[#3525cd]/10">User Research</span>
                  <span className="px-3 py-1.5 bg-[#3525cd]/5 text-[#3525cd] text-xs font-bold rounded-lg border border-[#3525cd]/10">Roadmap Mgmt</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black text-slate-400/40 uppercase tracking-widest">Growth Opportunities</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg border border-orange-200">Python (API)</span>
                  <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg border border-orange-200">LLM Ops</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">The Organization</h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <span className="text-xl font-bold text-indigo-600">L</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Luminary Digital</p>
                <p className="text-xs text-slate-500">500-1000 Employees • Series C</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic">&quot;Pioneering the future of collaborative intelligence for the modern workforce.&quot;</p>
            <a className="text-xs font-bold text-[#3525cd] flex items-center gap-1 hover:underline" href="#">
              LEARN MORE <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="p-6 bg-[#3525cd] text-white rounded-3xl flex flex-col gap-4 shadow-xl shadow-[#3525cd]/20">
            <h4 className="font-bold text-lg">Ready to accelerate?</h4>
            <p className="text-sm opacity-80 leading-snug">Let our AI tailor your portfolio and cover letter specifically for Luminary Digital&apos;s culture.</p>
            <Button className="w-full py-3 bg-white text-[#3525cd] rounded-xl font-black text-sm hover:scale-[1.02] transition-transform">
              Launch AI Application Kit
            </Button>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
