import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import FooterSection from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Blog - CareerCompass",
  description: "Latest updates and insights from CareerCompass",
};

const blogPosts = [
  {
    id: 1,
    title: "How AI is Revolutionizing Career Matching",
    excerpt: "Discover how artificial intelligence is transforming the way students find their dream opportunities.",
    category: "Technology",
    date: "April 15, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "5 Tips for Writing the Perfect Cover Letter",
    excerpt: "Learn the secrets to crafting cover letters that get noticed by recruiters.",
    category: "Career Advice",
    date: "April 10, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Resume Best Practices for 2026",
    excerpt: "The landscape of resume writing has changed. Here's what you need to know.",
    category: "Career Advice",
    date: "April 5, 2026",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Introducing CareerCompass 2.0",
    excerpt: "We're excited to announce our biggest update yet with new AI-powered features.",
    category: "Product Updates",
    date: "March 28, 2026",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "How to Prepare for Virtual Interviews",
    excerpt: "Master the art of virtual interviews with these proven strategies.",
    category: "Career Advice",
    date: "March 20, 2026",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "The Future of Entry-Level Jobs",
    excerpt: "Exploring trends in the entry-level job market and what they mean for students.",
    category: "Industry Insights",
    date: "March 15, 2026",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Latest insights, tips, and updates for your career journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="border border-foreground/10 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="text-primary hover:underline cursor-pointer">Read more →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}