"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, FileText, MessageSquare } from "lucide-react";

const mobileNavItems = [
  { href: "/dashboard", label: "Dash", icon: LayoutDashboard },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/applications", label: "Apps", icon: FileText },
  { href: "/assistant", label: "AI", icon: MessageSquare },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-slate-50/90 backdrop-blur-lg border-t border-slate-200/50 flex justify-around py-3 px-2 z-50">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-indigo-600" : "text-slate-400"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
      <Link
        href="/profile/edit"
        className="flex flex-col items-center gap-1 text-slate-400"
      >
        <div className="w-6 h-6 rounded-full bg-slate-300"></div>
        <span className="text-[10px] font-bold">Profile</span>
      </Link>
    </nav>
  );
}
