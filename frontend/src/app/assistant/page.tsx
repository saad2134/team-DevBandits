"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Search, Bookmark, Clock, MapPin, ArrowRight, ArrowLeft,
  LayoutDashboard, Compass, FileText, BarChart2, MessageSquare, 
  Settings, Sparkles, Bell, CheckCircle, Filter, ArrowUpDown,
  ChevronRight, ExternalLink, Verified, Send, Copy, RefreshCw,
  Lightbulb, Bold, Italic, Link2
} from "lucide-react";

export default function AssistantPage() {
  return (
    <DashboardLayout title="AI Assistant" subtitle="Application Generator">
      <div className="flex-1 flex overflow-hidden -mx-8 -my-8">
        <section className="w-[380px] border-r border-slate-100 bg-[#f7f9fb] p-8 overflow-y-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              Match Score: 94%
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">Senior UI/UX Designer</h3>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" /> San Francisco, CA (Hybrid)
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em] mb-4">Opportunity Summary</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Stripe is looking for a designer to join the Billing team. You&apos;ll focus on creating seamless invoice experiences for millions of global businesses. High emphasis on data visualization and complex system design.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em] mb-4">Key Requirements</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">8+ Years Experience</span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">Fintech Background</span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">Design Systems</span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">Figma Mastery</span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">Prototyping</span>
              </div>
            </div>
            <div className="p-5 bg-[#e2dfff]/30 rounded-2xl border border-[#c3c0ff]">
              <div className="flex items-start gap-3">
                <Lightbulb className="text-[#3525cd] h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#3323cc] mb-1">AI Insight</p>
                  <p className="text-xs text-[#3323cc] leading-relaxed">
                    Your portfolio projects &quot;Revis&quot; and &quot;FlowPay&quot; perfectly align with Stripe&apos;s Billing complexity. Highlight these in your draft.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex-1 bg-[#f2f4f6] flex flex-col items-center py-10 overflow-y-auto">
          <div className="flex items-center gap-2 p-1.5 bg-white shadow-xl shadow-slate-200/50 rounded-2xl mb-8 border border-slate-100">
            <Button variant="ghost" className="px-4 py-2 text-xs font-bold text-[#3525cd] hover:bg-[#3525cd]/5 transition-colors rounded-xl flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Regenerate
            </Button>
            <div className="w-[1px] h-4 bg-slate-200"></div>
            <Button variant="ghost" className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors rounded-xl flex items-center gap-2">
              <Copy className="h-4 w-4" /> Copy
            </Button>
            <div className="w-[1px] h-4 bg-slate-200"></div>
            <div className="flex items-center gap-1 px-2">
              <Button variant="ghost" size="sm" className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <Link2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <article className="w-full max-w-3xl min-h-[600px] bg-white shadow-2xl shadow-slate-200/40 rounded-[2rem] p-16 flex flex-col gap-10">
            <header className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Alex Chen</h4>
                  <p className="text-xs text-slate-500">alex.chen@design.com</p>
                  <p className="text-xs text-slate-500">+1 (555) 000-0000</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-500">October 24, 2024</p>
                </div>
              </div>
            </header>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p className="font-bold">Dear Hiring Team at Stripe,</p>
              <p>
                I&apos;ve long admired Stripe&apos;s commitment to making the complexity of global commerce feel invisible. As a Senior UI/UX Designer with over 8 years of experience building financial tools, I am excited to apply for the Billing design role. My background in crafting intricate data visualizations and scalable design systems aligns perfectly with the challenges your team tackles every day.
              </p>
              <p>
                In my recent role at FlowPay, I led the redesign of the merchant settlement dashboard, which handled over $2B in annual transactions. By simplifying the reconciliation workflow and introducing predictive analytics visuals, we reduced customer support tickets related to billing by 34%.
              </p>
              <p>
                I am particularly drawn to Stripe because of your focus on &quot;economic infrastructure.&quot; My work on the Revis Design System involved building a library of 200+ components used across five distinct product lines.
              </p>
              <p>
                I would love the opportunity to discuss how my experience in designing high-stakes financial interfaces can contribute to Stripe&apos;s Billing ecosystem. Thank you for your time and consideration.
              </p>
              <p>
                Best regards,<br/>
                <span className="font-bold">Alex Chen</span>
              </p>
            </div>
            <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between italic text-slate-500 text-xs">
              <p>Generated by OpportunityRadar AI v4.2</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Live Edit Mode
              </div>
            </div>
          </article>

          <div className="mt-12 mb-10 flex flex-col items-center gap-4">
            <p className="text-xs text-slate-500 font-medium">Ready to take the next step?</p>
            <div className="flex gap-4">
              <Button className="flex items-center gap-2 px-8 py-3 bg-[#8127cf] text-white rounded-2xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
                <Sparkles className="h-5 w-5" /> Polish with AI
              </Button>
              <Button className="flex items-center gap-2 px-8 py-3 bg-[#3525cd] text-white rounded-2xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
                <Send className="h-5 w-5" /> Send to Stripe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
