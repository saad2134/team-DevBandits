"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

export function DashboardLayout({ 
  children, 
  title, 
  subtitle,
  showHeader = true 
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Sidebar />
      
      <main className="md:ml-64 min-h-screen">
        {showHeader && <Header />}
        
        <div className="px-8 py-8">
          {children}
        </div>

        <footer className="w-full py-12 px-8 bg-white border-t border-slate-100 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              © 2024 OpportunityRadar. All rights reserved.
            </p>
            <div className="flex gap-8">
              <span className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer">
                Terms of Service
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer">
                Help Center
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer">
                Contact
              </span>
            </div>
          </div>
        </footer>
      </main>

      <MobileNav />

      <Button className="fixed bottom-24 right-8 md:bottom-12 md:right-12 w-14 h-14 bg-gradient-to-br from-[#3525cd] to-[#8127cf] rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-40">
        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
      </Button>
    </div>
  );
}
