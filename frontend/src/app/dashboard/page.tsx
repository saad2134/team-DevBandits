"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { GraduationCap, Briefcase, Award, Search, FileText, TrendingUp, ExternalLink, Bookmark, CheckCircle, XCircle } from "lucide-react";

interface StudentProfile {
  id: number;
  name: string;
  email: string;
  cgpa: number | null;
  year: number | null;
  branch: string | null;
  skills: string[];
  goals: string[];
}

interface Opportunity {
  id: number;
  title: string;
  organization: string;
  type: string;
  url: string;
  description: string;
  requirements: string[];
  deadline: string | null;
  location: string | null;
}

interface MatchResult {
  opportunity: Opportunity;
  match_score: number;
  missing_skills: string[];
  matched_skills: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [opportunities, setOpportunities] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"matches" | "opportunities" | "shortlist">("matches");

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const profileRes = await fetch(`${API_URL}/profile/${studentId}`);
        const profileData = await profileRes.json();
        setProfile(profileData);

        const matchesRes = await fetch(`${API_URL}/matches/${studentId}`);
        const matchesData = await matchesRes.json();
        setOpportunities(matchesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleEngage = async (oppId: number, action: string) => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) return;

    await fetch(`${API_URL}/engage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: parseInt(studentId),
        opportunity_id: oppId,
        action,
      }),
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "internship":
        return <Briefcase className="h-4 w-4" />;
      case "scholarship":
        return <Award className="h-4 w-4" />;
      case "research":
        return <Search className="h-4 w-4" />;
      case "job":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <GraduationCap className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 mx-auto animate-pulse text-primary" />
          <p className="mt-4 text-gray-600">Loading your opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">{siteConfig.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {profile?.name}</span>
            <Button
              variant="ghost"
              onClick={() => {
                localStorage.clear();
                router.push("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{profile?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="font-medium">{profile?.branch || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-medium">{profile?.year || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">CGPA</p>
                  <p className="font-medium">{profile?.cgpa || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile?.skills?.length ? (
                      profile.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">No skills added</p>
                    )}
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/profile/edit">Edit Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex gap-2 mb-6">
              <Button
                variant={activeTab === "matches" ? "default" : "outline"}
                onClick={() => setActiveTab("matches")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                AI Matches
              </Button>
              <Button
                variant={activeTab === "opportunities" ? "default" : "outline"}
                onClick={() => setActiveTab("opportunities")}
              >
                <Search className="h-4 w-4 mr-2" />
                All Opportunities
              </Button>
              <Button
                variant={activeTab === "shortlist" ? "default" : "outline"}
                onClick={() => setActiveTab("shortlist")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Daily Shortlist
              </Button>
            </div>

            <div className="space-y-4">
              {activeTab === "matches" &&
                opportunities.slice(0, 5).map((result, index) => (
                  <Card key={result.opportunity.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(result.opportunity.type)}
                            <CardTitle className="text-lg">{result.opportunity.title}</CardTitle>
                          </div>
                          <CardDescription>{result.opportunity.organization}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getScoreColor(result.match_score)}`}>
                            {result.match_score}%
                          </p>
                          <p className="text-xs text-gray-500">Match Score</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        {result.opportunity.description}
                      </p>
                      {result.matched_skills.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1">Matched Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {result.matched_skills.map((skill, i) => (
                              <span
                                key={i}
                                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1"
                              >
                                <CheckCircle className="h-3 w-3" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {result.missing_skills.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Missing Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {result.missing_skills.map((skill, i) => (
                              <span
                                key={i}
                                className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded flex items-center gap-1"
                              >
                                <XCircle className="h-3 w-3" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEngage(result.opportunity.id, "viewed")}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEngage(result.opportunity.id, "saved")}
                        >
                          <Bookmark className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <Link
                            href={`/audit/${result.opportunity.id}`}
                            onClick={() =>
                              handleEngage(result.opportunity.id, "viewed")
                            }
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Audit & Apply
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {activeTab === "opportunities" &&
                opportunities.map((result) => (
                  <Card key={result.opportunity.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(result.opportunity.type)}
                            <CardTitle className="text-lg">{result.opportunity.title}</CardTitle>
                          </div>
                          <CardDescription>{result.opportunity.organization}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-bold ${getScoreColor(result.match_score)}`}>
                            {result.match_score}%
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          asChild
                        >
                          <a
                            href={result.opportunity.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Apply
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {activeTab === "shortlist" && (
                <>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Your Daily Shortlist</CardTitle>
                      <CardDescription>
                        Top opportunities tailored to your profile - updated daily based on your engagement
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Based on your skills, goals, and engagement patterns, here are your top picks
                        for today.
                      </p>
                    </CardContent>
                  </Card>
                  {opportunities
                    .filter((r) => r.match_score >= 30)
                    .slice(0, 5)
                    .map((result) => (
                      <Card key={result.opportunity.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                {getTypeIcon(result.opportunity.type)}
                                {result.opportunity.title}
                              </CardTitle>
                              <CardDescription>
                                {result.opportunity.organization} •{" "}
                                {result.opportunity.deadline && (
                                  <span className="text-red-500">
                                    Due: {result.opportunity.deadline}
                                  </span>
                                )}
                              </CardDescription>
                            </div>
                            <p
                              className={`text-xl font-bold ${getScoreColor(
                                result.match_score
                              )}`}
                            >
                              {result.match_score}%
                            </p>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-2">
                            <Button asChild>
                              <Link
                                href={`/audit/${result.opportunity.id}`}
                                onClick={() =>
                                  handleEngage(result.opportunity.id, "viewed")
                                }
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Generate Cover Letter
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}