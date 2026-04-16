"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    cgpa: "",
    year: "",
    branch: "",
    skills: "",
    goals: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
        year: formData.year ? parseInt(formData.year) : null,
        branch: formData.branch || null,
        skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [],
        goals: formData.goals ? formData.goals.split(",").map(g => g.trim()) : [],
      };

      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("student_id", data.user.id);
        localStorage.setItem("student_token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>Join OpportunityRadar to get personalized opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>CGPA</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="8.5"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                />
              </div>
              <div>
                <Label>Year</Label>
                <Input
                  type="number"
                  placeholder="2"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Branch</Label>
              <Input
                placeholder="e.g. Computer Science"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              />
            </div>
            <div>
              <Label>Skills (comma separated)</Label>
              <Input
                placeholder="Python, JavaScript, Machine Learning"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>
            <div>
              <Label>Goals (comma separated)</Label>
              <Input
                placeholder="Software Engineering, Data Science"
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={() => {
                setFormData({
                  email: "demo@example.com",
                  password: "demo123",
                  name: "Demo Student",
                  cgpa: "8.5",
                  year: "3",
                  branch: "Computer Science",
                  skills: "Python, JavaScript, React",
                  goals: "Software Engineering, Full Stack Development",
                });
              }}
            >
              Fill Demo Data
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}