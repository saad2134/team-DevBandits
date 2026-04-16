"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { API_URL } from "@/lib/utils";
import { useTheme } from "next-themes";
import { 
  ArrowRight, ArrowLeft, Upload, FileText, CheckCircle, 
  GraduationCap, Target, Building, MapPin, Globe, Phone, LogOut,
  Sun, Moon, Home
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FormData {
  phone: string;
  location: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  cgpa: string;
  year: string;
  branch: string;
  institution: string;
  skills: string;
  resumeFile: File | null;
  goals: string;
  preferred_job_types: string;
  preferred_locations: string;
  target_roles: string;
  industries: string;
  work_preference: string;
  notice_period: string;
}

const STORAGE_KEY = "onboarding_progress";

const JOB_TYPES = ["Internship", "Full-time", "Part-time", "Contract", "Research", "Scholarship"];
const WORK_PREFERENCES = ["Remote", "Hybrid", "On-site"];
const NOTICE_PERIODS = ["Immediately", "1 month", "2 weeks", "3 months", "6 months", "1 year"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentId, setStudentId] = useState<number | null>(null);
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    location: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    cgpa: "",
    year: "",
    branch: "",
    institution: "",
    skills: "",
    resumeFile: null,
    goals: "",
    preferred_job_types: "",
    preferred_locations: "",
    target_roles: "",
    industries: "",
    work_preference: "",
    notice_period: "",
  });

  const steps = [
    { title: "Profile", icon: FileText },
    { title: "Goals", icon: Target },
  ];

  const totalSteps = steps.length;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.formData) {
          setFormData(prev => ({ ...prev, ...parsed.formData, resumeFile: null }));
        }
        if (parsed.step) setStep(parsed.step);
        if (parsed.studentId) setStudentId(parsed.studentId);
      } catch (e) {
        console.error("Failed to load saved progress", e);
      }
    }
    
    const storedId = localStorage.getItem("student_id");
    if (storedId) {
      setStudentId(parseInt(storedId));
    }
  }, []);

  const saveProgress = (newStep: number, newStudentId?: number) => {
    const toSave = {
      step: newStep,
      studentId: newStudentId || studentId,
      formData: { ...formData, resumeFile: null },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const updateField = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    saveProgress(step);
  };

  const handleLogout = () => {
    localStorage.removeItem("student_id");
    localStorage.removeItem("student_token");
    localStorage.removeItem(STORAGE_KEY);
    router.push("/login");
  };

  const handleNext = async () => {
    setError("");

    if (step === 0) {
      if (!formData.phone && !formData.resumeFile) {
        setError("Please upload a resume or fill in your phone number");
        return;
      }
      if (!formData.branch) {
        setError("Please enter your branch/department");
        return;
      }
      if (!formData.year) {
        setError("Please enter your current year");
        return;
      }
      if (!formData.cgpa) {
        setError("Please enter your CGPA");
        return;
      }
      if (!formData.skills) {
        setError("Please enter your skills");
        return;
      }
    }

    setLoading(true);

    if (step === 0) {
      try {
        const res = await fetch(`${API_URL}/onboarding/step2/${studentId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: formData.phone || null,
            location: formData.location || null,
            linkedin_url: formData.linkedin_url || null,
            github_url: formData.github_url || null,
            portfolio_url: formData.portfolio_url || null,
            cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
            year: formData.year ? parseInt(formData.year) : null,
            branch: formData.branch || null,
            institution: formData.institution || null,
            skills: formData.skills ? formData.skills.split(",").map(s => s.trim()).filter(Boolean) : [],
            resume_filename: formData.resumeFile ? formData.resumeFile.name : null,
          }),
        });
        const data = await res.json();
        
        if (data.success) {
          saveProgress(1);
          setStep(1);
        } else {
          setError(data.message || "Failed to save profile");
        }
      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError('');
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
      
      const content = text.toLowerCase();
      
      const phoneMatch = text.match(/(\d{10})/g) || text.match(/(?:0|\+91)[\s-]?(\d{5})[\s-]?(\d{5})/);
      const linkedinMatch = content.match(/linkedin\.com\/in\/([a-z0-9_-]+)/);
      const githubMatch = content.match(/github\.com\/([a-z0-9_-]+)/);
      const cgpaMatch = text.match(/\bcgpa\b[:=]*\s*(8\.[0-9]|9\.[0-9]|10\.0)/i) || text.match(/\b(8\.[0-9]|9\.[0-9]|10\.0)\b/);
      const yearMatch = content.match(/\b(year|yr)[s:]*\s*(\d)\b/i) || content.match(/\b(3)\b/);
      const branchMatch = content.match(/(computer science|information technology|electronics ?and ?communication|mechanical engineering|civil engineering|electrical engineering)/i);
      const instMatch = text.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}\s+(University|College|Institute))/i);
      
      const skillList = ['python', 'javascript', 'react', 'node', 'java', 'c++', 'sql', 'mongodb', 'machine learning', 'tensorflow', 'aws', 'docker', 'git', 'html', 'css', 'typescript'];
      const foundSkills = skillList.filter(s => content.includes(s));
      
      const phone = phoneMatch ? (phoneMatch[0]?.length === 10 ? phoneMatch[0] : phoneMatch[1] + phoneMatch[2]) : '';
      const formattedPhone = phone.length === 10 ? `+91 ${phone.slice(0,5)} ${phone.slice(5)}` : '';
      
      setFormData(prev => ({
        ...prev,
        resumeFile: file,
        phone: formattedPhone || prev.phone,
        linkedin_url: linkedinMatch ? `https://linkedin.com/in/${linkedinMatch[1]}` : prev.linkedin_url,
        github_url: githubMatch ? `https://github.com/${githubMatch[1]}` : prev.github_url,
        cgpa: cgpaMatch ? cgpaMatch[1] : prev.cgpa,
        year: yearMatch ? String(yearMatch[2] || '3') : prev.year,
        branch: branchMatch ? branchMatch[1].replace(/\s+and\s+/i, ' ').replace(/\s+engineering/i, '').trim() : prev.branch,
        institution: instMatch ? instMatch[1].trim() : prev.institution,
        skills: foundSkills.length ? foundSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') : prev.skills,
      }));
    } catch (err) {
      console.error('Error parsing PDF:', err);
      setFormData(prev => ({ ...prev, resumeFile: file }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/onboarding/step3/${studentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goals: formData.goals ? formData.goals.split(",").map(g => g.trim()).filter(Boolean) : [],
          preferred_job_types: formData.preferred_job_types ? formData.preferred_job_types.split(",").map(t => t.trim()).filter(Boolean) : [],
          preferred_locations: formData.preferred_locations ? formData.preferred_locations.split(",").map(l => l.trim()).filter(Boolean) : [],
          target_roles: formData.target_roles ? formData.target_roles.split(",").map(r => r.trim()).filter(Boolean) : [],
          industries: formData.industries ? formData.industries.split(",").map(i => i.trim()).filter(Boolean) : [],
          work_preference: formData.work_preference || null,
          notice_period: formData.notice_period || null,
        }),
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.removeItem(STORAGE_KEY);
        router.push("/user/dashboard");
      } else {
        setError(data.message || "Failed to complete onboarding");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-end gap-2 mb-4">
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="border border-foreground/10">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border border-foreground/10">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Button variant="ghost" className="border border-foreground/10" size="icon" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Onboarding</h1>
          <p className="text-muted-foreground">Complete your profile to get personalized opportunities</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s, i) => (
              <div key={i} className={`flex items-center gap-2 ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < step ? "bg-primary text-primary-foreground" : 
                  i === step ? "bg-primary/20 text-primary border-2 border-primary" : 
                  "bg-muted"
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-sm hidden sm:inline">{s.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 0 && "Profile Details"}
              {step === 1 && "Goals & Preferences"}
            </CardTitle>
            <CardDescription>
              {step === 0 && "Tell us about yourself (Learner agent will use this)"}
              {step === 1 && "Your career preferences (Your behaviour will adjust the platform in real time)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            {step === 0 && (
              <div className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Upload your resume (PDF)</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    For best results, use an OCR/ATS-friendly resume with clean formatting
                  </p>
                  <Input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    id="resume-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  <Label htmlFor="resume-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>{formData.resumeFile ? formData.resumeFile.name : "Choose PDF"}</span>
                    </Button>
                  </Label>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="text-center text-sm text-muted-foreground">— or fill manually —</div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="border border-foreground/10"
                    size="sm"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        phone: "+1 234 567 8900",
                        location: "Bangalore, India",
                        linkedin_url: "linkedin.com/in/demo",
                        github_url: "github.com/demo",
                        cgpa: "8.5",
                        year: "3",
                        branch: "Computer Science",
                        institution: "Demo University",
                        skills: "Python, JavaScript, React, Machine Learning",
                      }));
                    }}
                  >
                    Fill Demo Data
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="+1 234 567 8900"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="City, Country"
                        className="pl-10"
                        value={formData.location}
                        onChange={(e) => updateField("location", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>LinkedIn URL</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="linkedin.com/in/username"
                        className="pl-10"
                        value={formData.linkedin_url}
                        onChange={(e) => updateField("linkedin_url", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>GitHub URL</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="github.com/username"
                        className="pl-10"
                        value={formData.github_url}
                        onChange={(e) => updateField("github_url", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Institution</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="University/College name"
                        className="pl-10"
                        value={formData.institution}
                        onChange={(e) => updateField("institution", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Branch/Department</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g. Computer Science"
                        className="pl-10"
                        value={formData.branch}
                        onChange={(e) => updateField("branch", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Current Year</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 3"
                      value={formData.year}
                      onChange={(e) => updateField("year", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>CGPA</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 8.5"
                      value={formData.cgpa}
                      onChange={(e) => updateField("cgpa", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Skills (comma separated)</Label>
                  <Input
                    placeholder="Python, JavaScript, Machine Learning, React"
                    value={formData.skills}
                    onChange={(e) => updateField("skills", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label>Career Goals (comma separated)</Label>
                  <Input
                    placeholder="Software Engineering, Data Science, Product Management"
                    value={formData.goals}
                    onChange={(e) => updateField("goals", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Target Roles (comma separated)</Label>
                    <Input
                      placeholder="Full Stack Developer, ML Engineer"
                      value={formData.target_roles}
                      onChange={(e) => updateField("target_roles", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Industries (comma separated)</Label>
                    <Input
                      placeholder="Tech, Finance, Healthcare"
                      value={formData.industries}
                      onChange={(e) => updateField("industries", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Preferred Job Types (comma separated)</Label>
                    <Input
                      placeholder="Internship, Full-time, Research"
                      value={formData.preferred_job_types}
                      onChange={(e) => updateField("preferred_job_types", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Options: {JOB_TYPES.join(", ")}</p>
                  </div>
                  <div>
                    <Label>Preferred Locations (comma separated)</Label>
                    <Input
                      placeholder="Remote, Bangalore, USA"
                      value={formData.preferred_locations}
                      onChange={(e) => updateField("preferred_locations", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Work Preference</Label>
                    <Input
                      placeholder="Remote, Hybrid, or On-site"
                      value={formData.work_preference}
                      onChange={(e) => updateField("work_preference", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Options: {WORK_PREFERENCES.join(", ")}</p>
                  </div>
                  <div>
                    <Label>Notice Period</Label>
                    <Input
                      placeholder="Immediately, 1 month, etc."
                      value={formData.notice_period}
                      onChange={(e) => updateField("notice_period", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Options: {NOTICE_PERIODS.join(", ")}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    className="border border-foreground/10"
                    size="sm"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        goals: "Software Engineering, Data Science",
                        target_roles: "Full Stack Developer, ML Engineer",
                        industries: "Tech, Finance",
                        preferred_job_types: "Internship, Full-time",
                        preferred_locations: "Remote, Bangalore",
                        work_preference: "Hybrid",
                        notice_period: "Immediately",
                      }));
                    }}
                  >
                    Fill Demo Data
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4">
              {step > 0 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)} disabled={loading}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < totalSteps - 1 ? (
                <Button onClick={handleNext} disabled={loading}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Completing..." : "Complete Setup"}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}