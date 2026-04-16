import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Search, FileText, TrendingUp } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">{siteConfig.name}</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Never Miss an Opportunity
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/signup">
              <Button size="xl">Get Started Free</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="xl">Dashboard</Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Search className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Scanning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our AI scans multiple platforms to find opportunities matching your profile.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>AI Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get ranked results based on skills, CGPA, year, and career goals.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Resume Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Auto-generate cover letters and get actionable suggestions.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Daily Shortlist</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive personalized daily recommendations adjusted to your engagement.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold">Ready to Start?</h2>
          <p className="mt-4 text-gray-600">
            Join thousands of students finding their dream opportunities.
          </p>
          <Link href="/signup" className="mt-6 inline-block">
            <Button size="xl">Create Your Profile</Button>
          </Link>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Built by Team DevBandits - GDG UCE OU Hackathon 2026</p>
        </div>
      </footer>
    </div>
  );
}