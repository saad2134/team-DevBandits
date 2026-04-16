"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { GraduationCap, FileText, CheckCircle, XCircle, Lightbulb } from "lucide-react";

interface AuditData {
  student_profile: {
    id: number;
    name: string;
    cgpa: number | null;
    year: number | null;
    branch: string | null;
    skills: string[];
    goals: string[];
  };
  opportunity: {
    id: number;
    title: string;
    organization: string;
    type: string;
    description: string;
    requirements: string[];
    deadline: string | null;
    url?: string;
  };
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  suggestions: string[];
  cover_letter: string;
}

export default function AuditPage() {
  const router = useRouter();
  const params = useParams();
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      router.push("/login");
      return;
    }

    const opportunityId = params.id;

    const fetchAudit = async () => {
      try {
        const res = await fetch(`${API_URL}/audit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: parseInt(studentId),
            opportunity_id: parseInt(opportunityId as string),
          }),
        });
        const data = await res.json();
        setAuditData(data);
      } catch (error) {
        console.error("Failed to fetch audit:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [router, params.id]);

  const copyCoverLetter = () => {
    if (auditData?.cover_letter) {
      navigator.clipboard.writeText(auditData.cover_letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          <p className="mt-4 text-gray-600">Analyzing your profile...</p>
        </div>
      </div>
    );
  }

  if (!auditData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No data found</p>
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
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resume Audit</CardTitle>
                <CardDescription>
                  {auditData.opportunity.title} at {auditData.opportunity.organization}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-6">
                  <p className="text-6xl font-bold mb-2">Match Score</p>
                  <p className={`text-4xl font-bold ${getScoreColor(auditData.match_score)}`}>
                    {auditData.match_score}%
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Your Profile</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> {auditData.student_profile.name}</p>
                    <p><span className="text-gray-500">Branch:</span> {auditData.student_profile.branch || "Not set"}</p>
                    <p><span className="text-gray-500">Year:</span> {auditData.student_profile.year || "Not set"}</p>
                    <p><span className="text-gray-500">CGPA:</span> {auditData.student_profile.cgpa || "Not set"}</p>
                  </div>
                </div>

                {auditData.matched_skills.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Matched Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {auditData.matched_skills.map((skill, i) => (
                        <span key={i} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {auditData.missing_skills.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Missing Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {auditData.missing_skills.map((skill, i) => (
                        <span key={i} className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {auditData.suggestions.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-600" />
                      Suggestions
                    </h3>
                    <ul className="space-y-2">
                      {auditData.suggestions.map((suggestion, i) => (
                        <li key={i} className="text-sm bg-yellow-50 p-2 rounded">
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generated Cover Letter
                </CardTitle>
                <CardDescription>
                  AI-generated personalized cover letter for this opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6 whitespace-pre-wrap text-sm font-mono">
                  {auditData.cover_letter}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={copyCoverLetter}>
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={auditData.opportunity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}