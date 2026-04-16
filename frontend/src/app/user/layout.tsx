"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Compass,
  Bookmark,
  FileText,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Sun,
  Moon,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

const appNavItems = [
  {
   
    items: [
      { title: "Dashboard", url: "/user/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Explore",
    items: [
      { title: "Compass", url: "/user/explore", icon: Compass },
      { title: "Saved", url: "/user/saved", icon: Bookmark },
      { title: "Applications", url: "/user/applications", icon: FileText },
    ],
  },
  {
    title: "Analytics",
    items: [
      { title: "Insights", url: "/user/insights", icon: BarChart2 },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "AI Assistant", url: "/user/assistant", icon: MessageSquare },
    ],
  },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserSidebar>{children}</UserSidebar>;
}

function UserSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const studentId = typeof window !== "undefined" ? localStorage.getItem("student_id") : null;

  const handleLogout = () => {
    localStorage.removeItem("student_id");
    router.push("/login");
  };

  const initials = "U";

  return (
    <SidebarProvider defaultOpen={true} className="h-screen">
      <Sidebar collapsible="offcanvas" className="border-r border-foreground/10 z-200">
        <SidebarHeader className="py-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              
                <Image src="/favicon.svg" alt="Logo" width={30} height={30} />
              
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">{siteConfig.name}</span>
              <span className="text-xs text-muted-foreground">v1.1.5</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {appNavItems.map((category) => (
            <SidebarGroup key={category.title || "untitled"}>
              {category.title && (
                <SidebarGroupLabel className="text-primary font-semibold px-2 mb-1">
                  {category.title}
                </SidebarGroupLabel>
              )}
              <SidebarMenu>
                {category.items?.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url} className="flex items-center gap-3">
                          <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                          <span className={isActive ? "font-medium" : ""}>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="p-3 ">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Link
                href="/user/profile/edit"
                className={`flex-1 flex items-center gap-3 p-2 border border-foreground/10 rounded-lg transition-colors ${
                  pathname === "/user/profile/edit"
                    ? "bg-primary/50 dark:bg-primary/20 border border-primary dark:border-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-primary/50 flex items-center justify-center font-semibold text-sm shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Profile</p>
                  <p className="text-xs text-muted-foreground">Edit</p>
                </div>
              </Link>
              <Link
                href="/user/settings"
                className={`w-[60px] flex items-center justify-center border border-foreground/10 p-2 rounded-lg transition-colors ${
                  pathname === "/user/settings"
                    ? "bg-primary/50 dark:bg-primary/20 border border-primary dark:border-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground border border-foreground/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex flex-col flex-1 h-full overflow-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-foreground/10 px-4 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {appNavItems
                .flatMap((cat) => cat.items || [])
                .find((item) => item.url === pathname)?.title || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="border border-foreground/10">
                  <Bell size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex gap-3 p-3 rounded-lg border border-foreground/10">
                    <div className="w-10 h-10 rounded-full bg-primary/25 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New Opportunities Found!</p>
                      <p className="text-xs text-muted-foreground">5 new matches based on your profile</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg border">
                    <div className="w-10 h-10 rounded-full bg-primary/25 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Profile Updated</p>
                      <p className="text-xs text-muted-foreground">Your profile has been saved successfully</p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative border border-foreground/10">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border border-foreground/10">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}