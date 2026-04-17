"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/utils";
import { Search, Sparkles, Loader2, CheckCircle, BarChart, Upload, FileText } from "lucide-react";
import Link from "next/link";

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      let text = '';
      for (let i = 0; i < uint8Array.length; i++) {
        const byte = uint8Array[i];
        if (byte >= 32 && byte <= 126) {
          text += String.fromCharCode(byte);
        } else {
          text += ' ';
        }
      }
      
      setResumeText(text);
    } catch (err) {
      console.error('Error parsing PDF:', err);
    } finally {
      setLoading(false);
    }
  };

  const analyzeResume = async () => {
    if (!resumeText.trim()) return;
    setAnalyzing(true);
    try {
      const res = await fetch(`${API_URL}/api/agent/auditor/resume-analyzer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeText,
          student_id: localStorage.getItem("student_id")
        })
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (e) {
      console.error("Analysis failed", e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end">
        <Link href="/user/resume-builder">
          <Button variant="outline">Go to Builder</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              <h3 className="font-semibold">Upload Resume</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload a PDF resume for AI-powered analysis. The resume will be parsed and analyzed.
            </p>
            <Input
              type="file"
              accept=".pdf"
              className="cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Parsing resume...
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <h3 className="font-semibold">Or Paste Resume Text</h3>
            </div>
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here for AI analysis..."
              rows={8}
              className="font-mono text-sm"
            />
            <Button onClick={analyzeResume} disabled={analyzing || !resumeText.trim()} className="w-full gap-2">
              {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {analyzing ? "Analyzing with AI..." : "Analyze Resume with AI"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {analysisResult && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Analysis Results</h3>
              <Badge variant="outline">{analysisResult.method || "AI"}</Badge>
            </div>
            
            {(analysisResult.analysis || analysisResult.skills) && (
              <div className="space-y-4">
                {(analysisResult.analysis?.ats_score || analysisResult.ats_score) && (
                  <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                    <BarChart className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">ATS Score</p>
                      <p className="text-2xl font-bold">{analysisResult.analysis?.ats_score || analysisResult.ats_score}/100</p>
                    </div>
                  </div>
                )}

                {(analysisResult.analysis?.skills || analysisResult.skills) && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Extracted Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {(analysisResult.analysis?.skills || analysisResult.skills || []).map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(analysisResult.analysis?.experience_level || analysisResult.experience_level) && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Experience Level</h4>
                    <Badge>{analysisResult.analysis?.experience_level || analysisResult.experience_level}</Badge>
                  </div>
                )}

                {(analysisResult.analysis?.missing_sections || analysisResult.missing_sections) && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Missing Sections</h4>
                    <div className="flex flex-wrap gap-2">
                      {(analysisResult.analysis?.missing_sections || analysisResult.missing_sections || []).map((section: string, i: number) => (
                        <Badge key={i} variant="destructive">{section}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(analysisResult.analysis?.suggestions || analysisResult.suggestions) && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Suggestions</h4>
                    <ul className="space-y-1">
                      {(analysisResult.analysis?.suggestions || analysisResult.suggestions || []).map((s: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {analysisResult.error && (
              <div className="p-3 bg-red-50 text-red-600 rounded text-sm">
                {analysisResult.error}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}