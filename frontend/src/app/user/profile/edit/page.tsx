"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";
import { 
  Upload, FileText, Save, ArrowLeft, CheckCircle
} from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  location: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  institution: string;
  branch: string;
  year: string;
  cgpa: string;
  skills: string;
  goals: string;
  target_roles: string;
  industries: string;
  preferred_job_types: string;
  preferred_locations: string;
  work_preference: string;
  notice_period: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    location: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    institution: "",
    branch: "",
    year: "",
    cgpa: "",
    skills: "",
    goals: "",
    target_roles: "",
    industries: "",
    preferred_job_types: "",
    preferred_locations: "",
    work_preference: "",
    notice_period: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/profile/${studentId}`);
        const data = await res.json();
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
          linkedin_url: data.linkedin_url || "",
          github_url: data.github_url || "",
          portfolio_url: data.portfolio_url || "",
          institution: data.institution || "",
          branch: data.branch || "",
          year: data.year?.toString() || "",
          cgpa: data.cgpa?.toString() || "",
          skills: data.skills?.join(", ") || "",
          goals: data.goals?.join(", ") || "",
          target_roles: data.target_roles?.join(", ") || "",
          industries: data.industries?.join(", ") || "",
          preferred_job_types: data.preferred_job_types?.join(", ") || "",
          preferred_locations: data.preferred_locations?.join(", ") || "",
          work_preference: data.work_preference || "",
          notice_period: data.notice_period || "",
        });
        if (data.resume_filename) {
          setResumeName(data.resume_filename);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const studentId = localStorage.getItem("student_id");
    if (!studentId) return;

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone || null,
        location: formData.location || null,
        linkedin_url: formData.linkedin_url || null,
        github_url: formData.github_url || null,
        portfolio_url: formData.portfolio_url || null,
        institution: formData.institution || null,
        branch: formData.branch || null,
        year: formData.year ? parseInt(formData.year) : null,
        cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
        skills: formData.skills ? formData.skills.split(",").map(s => s.trim()).filter(Boolean) : [],
        goals: formData.goals ? formData.goals.split(",").map(g => g.trim()).filter(Boolean) : [],
        target_roles: formData.target_roles ? formData.target_roles.split(",").map(r => r.trim()).filter(Boolean) : [],
        industries: formData.industries ? formData.industries.split(",").map(i => i.trim()).filter(Boolean) : [],
        preferred_job_types: formData.preferred_job_types ? formData.preferred_job_types.split(",").map(t => t.trim()).filter(Boolean) : [],
        preferred_locations: formData.preferred_locations ? formData.preferred_locations.split(",").map(l => l.trim()).filter(Boolean) : [],
        work_preference: formData.work_preference || null,
        notice_period: formData.notice_period || null,
      };

      await fetch(`${API_URL}/profile/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Handle resume upload if new file selected
      if (resumeFile && resumeFile.name !== resumeName) {
        await fetch(`${API_URL}/profile/${studentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            resume_filename: resumeFile.name,
            resume_uploaded_at: new Date().toISOString()
          }),
        });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground">Update your information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resume Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-4">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="resume-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setResumeFile(file);
                }}
              />
              <label htmlFor="resume-upload" className="cursor-pointer flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{resumeFile ? resumeFile.name : (resumeName || "Upload new resume (PDF)")}</p>
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                </div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>LinkedIn URL</Label>
                <Input
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="linkedin.com/in/username"
                />
              </div>
              <div>
                <Label>GitHub URL</Label>
                <Input
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="github.com/username"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Institution</Label>
                <Input
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="University/College name"
                />
              </div>
              <div>
                <Label>Branch/Department</Label>
                <Input
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="e.g. Computer Science"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Current Year</Label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g. 3"
                />
              </div>
              <div>
                <Label>CGPA</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  placeholder="e.g. 8.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Skills (comma separated)</Label>
              <Input
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="Python, JavaScript, Machine Learning"
              />
            </div>
          </CardContent>
        </Card>

        {/* Goals & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Career Goals & Preferences</CardTitle>
            <CardDescription>Your Learner agent uses this to personalize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Goals (comma separated)</Label>
                <Input
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  placeholder="Software Engineering, Data Science"
                />
              </div>
              <div>
                <Label>Target Roles (comma separated)</Label>
                <Input
                  value={formData.target_roles}
                  onChange={(e) => setFormData({ ...formData, target_roles: e.target.value })}
                  placeholder="Full Stack Developer, ML Engineer"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Industries (comma separated)</Label>
                <Input
                  value={formData.industries}
                  onChange={(e) => setFormData({ ...formData, industries: e.target.value })}
                  placeholder="Tech, Finance, Healthcare"
                />
              </div>
              <div>
                <Label>Preferred Job Types (comma separated)</Label>
                <Input
                  value={formData.preferred_job_types}
                  onChange={(e) => setFormData({ ...formData, preferred_job_types: e.target.value })}
                  placeholder="Internship, Full-time"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Work Preference</Label>
                <Input
                  value={formData.work_preference}
                  onChange={(e) => setFormData({ ...formData, work_preference: e.target.value })}
                  placeholder="Remote, Hybrid, or On-site"
                />
              </div>
              <div>
                <Label>Notice Period</Label>
                <Input
                  value={formData.notice_period}
                  onChange={(e) => setFormData({ ...formData, notice_period: e.target.value })}
                  placeholder="Immediately, 1 month, etc."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving} className="min-w-[150px]">
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Saved!
              </>
            ) : saving ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/user/profile")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}