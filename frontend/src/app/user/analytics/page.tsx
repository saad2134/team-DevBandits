"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/utils";
import { 
  TrendingUp, TrendingDown, Target, Bookmark, FileText, 
  Eye, CheckCircle, Clock, BarChart3, PieChart
} from "lucide-react";

interface Analytics {
  totalViews: number;
  totalApplications: number;
  totalSaved: number;
  shortlisted: number;
  rejected: number;
  pending: number;
  match_rate: number;
  skills_match: number;
  topMatched: Array<{title: string; score: number}>;
  topMissing: Array<{skill: string; count: number}>;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      router.push("/login");
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${API_URL}/analytics/${studentId}`);
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        setAnalytics({
          totalViews: 0,
          totalApplications: 0,
          totalSaved: 0,
          shortlisted: 0,
          rejected: 0,
          pending: 0,
          match_rate: 0,
          skills_match: 0,
          topMatched: [],
          topMissing: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [router]);

  const stats = [
    { 
      label: "Profile Views", 
      value: analytics?.totalViews || 0, 
      icon: Eye, 
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    { 
      label: "Applications", 
      value: analytics?.totalApplications || 0, 
      icon: FileText, 
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    { 
      label: "Saved", 
      value: analytics?.totalSaved || 0, 
      icon: Bookmark, 
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    { 
      label: "Shortlisted", 
      value: analytics?.shortlisted || 0, 
      icon: CheckCircle, 
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
  ];

  const applicationStatus = [
    { label: "Shortlisted", value: analytics?.shortlisted || 0, color: "bg-green-500" },
    { label: "Pending", value: analytics?.pending || 0, color: "bg-yellow-500" },
    { label: "Rejected", value: analytics?.rejected || 0, color: "bg-red-500" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your performance and insights</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Match Score
            </CardTitle>
            <CardDescription>Your profile match rate with opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${(analytics?.match_rate || 0) * 2.83} 283`}
                    strokeLinecap="round"
                    className="text-primary"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{analytics?.match_rate || 0}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Application Status
            </CardTitle>
            <CardDescription>Current status of your applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationStatus.map((status, index) => {
                const total = analytics?.totalApplications || 1;
                const percentage = Math.round((status.value / total) * 100);
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{status.label}</span>
                      <span className="font-medium">{status.value} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${status.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Top Matched Skills
            </CardTitle>
            <CardDescription>Skills that match opportunities well</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(analytics?.topMatched || []).length > 0 ? (
                analytics?.topMatched.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1.5">
                    {skill.title} ({skill.score}%)
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">No matched skills data</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              Skills to Improve
            </CardTitle>
            <CardDescription>In-demand skills you might want to learn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(analytics?.topMissing || []).length > 0 ? (
                analytics?.topMissing.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-1.5">
                    {skill.skill}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">No missing skills data</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {(!analytics || analytics.totalApplications === 0) && (
        <Card>
          <CardContent className="py-12 text-center">
            <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No analytics yet</h3>
            <p className="text-muted-foreground mb-4">Start applying to opportunities to see your analytics</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}