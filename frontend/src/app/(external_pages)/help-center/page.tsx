import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import FooterSection from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Help Center - CareerCompass",
  description: "Get help and support for CareerCompass",
};

const faqs = [
  {
    question: "How does CareerCompass match me with opportunities?",
    answer: "CareerCompass uses AI to analyze your profile, skills, and preferences to match you with tailored opportunities from various sources. The platform considers your academic background, interests, and career goals.",
  },
  {
    question: "How do I create an account?",
    answer: "Click on the Signup button in the navigation and fill in your details. You can also sign up using your Google account for a faster registration process.",
  },
  {
    question: "Is CareerCompass free to use?",
    answer: "Yes, CareerCompass is free for students. We offer premium features with our paid plans, but the core matching functionality is available at no cost.",
  },
  {
    question: "How do I update my profile?",
    answer: "Navigate to your Profile page from the dashboard sidebar. Click on the Edit button to modify your personal information, skills, and preferences.",
  },
  {
    question: "Can I integrate my resume with CareerCompass?",
    answer: "Yes! Go to the Resume section in your dashboard to upload your resume. Our AI will analyze it and suggest improvements.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our support team by emailing support@careercompass.io or using the AI Assistant in your dashboard for immediate help.",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm hover:underline">Login</Link>
              <Link href="/signup" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">Signup</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Find answers to common questions and get support for using CareerCompass.
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-foreground/10 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Still need help?</h2>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Contact our support team.
            </p>
            <Link href="/user/assistant" className="text-primary hover:underline">
              Contact Support →
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}