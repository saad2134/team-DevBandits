"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Compass, Bookmark, FileText, BarChart2, 
  MessageSquare, Settings, Sparkles
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/applications", label: "Applications", icon: FileText },
  { href: "/insights", label: "Insights", icon: BarChart2 },
  { href: "/assistant", label: "AI Assistant", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50 border-r border-slate-200/50 flex flex-col gap-2 p-4 z-40 hidden md:flex">
      <div className="mb-8 px-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#8127cf] flex items-center justify-center text-white shadow-lg shadow-[#3525cd]/20">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">OpportunityRadar</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">The Intelligent Path</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out hover:translate-x-1 text-sm font-medium ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-100/50">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg">
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 px-2 pt-4 border-t border-slate-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
          A
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-bold truncate">Alex Chen</p>
          <p className="text-[10px] text-slate-500">Product Designer</p>
        </div>
        <Link href="/profile/edit">
          <Settings className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
        </Link>
      </div>
    </aside>
  );
}
