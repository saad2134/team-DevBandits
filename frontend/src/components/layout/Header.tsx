"use client";

import Link from "next/link";
import { Search, Bell, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex justify-between items-center w-full px-8 py-4 bg-slate-50/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center bg-slate-100 px-4 py-2 rounded-full border border-slate-200/20">
          <Search className="h-4 w-4 text-slate-500 mr-2" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm w-48 lg:w-64 placeholder:text-slate-400" 
            placeholder="Search opportunities..." 
            type="text" 
          />
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <Link className="text-slate-500 hover:text-indigo-500 font-medium text-sm transition-colors" href="/explore">
            Explore
          </Link>
          <Link className="text-slate-500 hover:text-indigo-500 font-medium text-sm transition-colors" href="/applications">
            Applications
          </Link>
          <Link className="text-slate-500 hover:text-indigo-500 font-medium text-sm transition-colors" href="/insights">
            Insights
          </Link>
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
        <Link href="/profile/edit">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-90 transition-opacity">
            A
          </div>
        </Link>
      </div>
    </header>
  );
}

export function PageHeader({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <div>
        {title && (
          <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
        )}
        {subtitle && (
          <p className="hidden md:block text-xs text-slate-500 font-medium uppercase tracking-widest">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
