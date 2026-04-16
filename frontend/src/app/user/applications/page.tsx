"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/utils";
import { 
  Clock, MapPin, Building, ExternalLink, FileText, CheckCircle, 
  XCircle, Hourglass, Briefcase, GraduationCap
} from "lucide-react";

interface Application {
  id: number;
  opp_id: number;
  title: string;
  organization: string;
  type: string;
  url: string;
  status: string;
  applied_at?: string;
}

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  applied: { color: "bg-blue-500", icon: Hourglass, label: "Applied" },
  viewing: { color: "bg-yellow-500", icon: Hourglass, label: "Viewing" },
  shortlisted: { color: "bg-purple-500", icon: CheckCircle, label: "Shortlisted" },
  rejected: { color: "bg-red-500", icon: XCircle, label: "Rejected" },
  accepted: { color: "bg-green-500", icon: CheckCircle, label: "Accepted" },
};

export default function ApplicationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      router.push("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await fetch(`${API_URL}/applications/${studentId}`);
        const data = await res.json();
        setApplications(data.applications || []);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  const filteredApps = activeTab === "all" 
    ? applications 
    : applications.filter(app => app.status === activeTab);

  const tabs = ["all", "applied", "shortlisted", "rejected", "accepted"];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "internship": return <Briefcase className="w-4 h-4" />;
      case "scholarship": return <GraduationCap className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => {
          const count = tab === "all" 
            ? applications.length 
            : applications.filter(a => a.status === tab).length;
          return (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="rounded-full"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <Badge variant="secondary" className="ml-1 text-xs">
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>

      <div className="grid gap-4">
        {filteredApps.map(app => {
          const status = statusConfig[app.status] || statusConfig.applied;
          const StatusIcon = status.icon;
          
          return (
            <Card key={app.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {getTypeIcon(app.type)}
                        <span className="ml-1">{app.type}</span>
                      </Badge>
                      <Badge className={`${status.color} text-white text-xs`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{app.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Building className="w-4 h-4" />
                      {app.organization}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {app.applied_at && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Applied: {new Date(app.applied_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      View Original Post
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                  <Button size="sm" onClick={() => router.push(`/user/audit/${app.opp_id}`)}>
                    <FileText className="w-4 h-4 mr-1" />
                    View Audit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
          <p className="text-muted-foreground">Start applying to opportunities to track them here</p>
          <Button className="mt-4" onClick={() => router.push("/user/matched")}>
            View Matched Opportunities
          </Button>
        </div>
      )}
    </div>
  );
}