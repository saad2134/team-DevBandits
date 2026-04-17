import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import NavbarComponent from "@/components/navbar/navbar";
import FooterSection from "@/components/footer/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers - CareerCompass",
  description: "Join the CareerCompass team",
};

const jobOpenings = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build the next generation of career matching features using React and TypeScript.",
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Improve our AI matching algorithms and build new intelligent features.",
  },
  {
    id: 3,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design beautiful, intuitive interfaces that help students find their dream careers.",
  },
  {
    id: 4,
    title: "Customer Success Manager",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    description: "Help our student users get the most out of CareerCompass.",
  },
  {
    id: 5,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Scale our platform to serve millions of students worldwide.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarComponent isExternalPage={true} />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Help us revolutionize how students discover career opportunities. We're building the future of career matching, and we want you to be part of it.
          </p>

          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="border border-border/20 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{job.description}</p>
                  </div>
                  <Button className="shrink-0">Apply Now</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Don't see the right role?</h2>
            <p className="text-muted-foreground mb-4">
              We're always looking for talented people. Send us your resume and we'll reach out when a suitable position opens up.
            </p>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}