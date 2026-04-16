"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/utils";
import { 
  User, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, 
  Target, Settings, Edit, Upload, FileText, Star, Calendar, Award,
  Linkedin, Github
} from "lucide-react";

interface StudentProfile {
  id: number;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  cgpa?: number;
  year?: number;
  branch?: string;
  institution?: string;
  skills: string[];
  goals: string[];
  preferred_job_types: string[];
  preferred_locations: string[];
  target_roles: string[];
  industries: string[];
  work_preference?: string;
  notice_period?: string;
  resume_filename?: string;
  resume_uploaded_at?: string;
  onboarding_completed: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 md:p-8 text-center">
        <p>Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {profile.name ? profile.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{profile.name || "Your Name"}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
              {profile.branch && (
                <p className="text-sm text-muted-foreground">{profile.branch} {profile.year && `• Year ${profile.year}`}</p>
              )}
              {profile.institution && (
                <p className="text-sm text-muted-foreground">{profile.institution}</p>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              {profile.cgpa && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-lg font-bold">{profile.cgpa}</span>
                  <span className="text-sm text-muted-foreground">CGPA</span>
                </div>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link href="/user/profile/edit">Edit Profile</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-4 h-4" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{profile.email}</span>
            </div>
            {profile.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{profile.location}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.linkedin_url && (
              <div className="flex items-center gap-3 text-sm">
                <Linkedin className="w-4 h-4 text-muted-foreground" />
                <a href={profile.linkedin_url} target="_blank" className="text-primary hover:underline">LinkedIn</a>
              </div>
            )}
            {profile.github_url && (
              <div className="flex items-center gap-3 text-sm">
                <Github className="w-4 h-4 text-muted-foreground" />
                <a href={profile.github_url} target="_blank" className="text-primary hover:underline">GitHub</a>
              </div>
            )}
            {profile.portfolio_url && (
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <a href={profile.portfolio_url} target="_blank" className="text-primary hover:underline">Portfolio</a>
              </div>
            )}
            {!profile.linkedin_url && !profile.github_url && !profile.portfolio_url && (
              <p className="text-sm text-muted-foreground">No links added</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="w-4 h-4" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.skills?.length ? (
              profile.skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No skills added</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Goals & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4" />
            Career Goals & Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Goals</p>
            <div className="flex flex-wrap gap-2">
              {profile.goals?.length ? (
                profile.goals.map((goal, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1">{goal}</Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No goals specified</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Target Roles</p>
              <div className="flex flex-wrap gap-2">
                {profile.target_roles?.length ? (
                  profile.target_roles.map((role, i) => (
                    <Badge key={i} variant="outline" className="px-2 py-0.5 text-xs">{role}</Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Industries</p>
              <div className="flex flex-wrap gap-2">
                {profile.industries?.length ? (
                  profile.industries.map((ind, i) => (
                    <Badge key={i} variant="outline" className="px-2 py-0.5 text-xs">{ind}</Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Preferred Job Types</p>
              <div className="flex flex-wrap gap-2">
                {profile.preferred_job_types?.length ? (
                  profile.preferred_job_types.map((type, i) => (
                    <Badge key={i} variant="outline" className="px-2 py-0.5 text-xs">{type}</Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Work Preference</p>
              <p className="text-sm">{profile.work_preference || "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.resume_filename ? (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium">{profile.resume_filename}</p>
                  {profile.resume_uploaded_at && (
                    <p className="text-xs text-muted-foreground">
                      Uploaded {new Date(profile.resume_uploaded_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push("/user/profile/edit")}>
                Update Resume
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground mb-4">No resume uploaded yet</p>
              <Button onClick={() => router.push("/user/profile/edit")}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}