import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import FooterSection from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Cookie Policy - CareerCompass",
  description: "CareerCompass Cookie Policy",
};

export default function CookiePolicyPage() {
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
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: April 17, 2026</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to the site.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to remember your preferences, analyze traffic patterns, and to help us understand how our website is being used.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Types of Cookies We Use</h2>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies are necessary for the website to function. They allow you to navigate the site and use its features. These cookies do not collect any personal information about you.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our site.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Functional Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences. They may be set by us or by third-party providers.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Managing Your Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Most browsers allow you to control cookies through their settings. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you disable cookies, some features of CareerCompass may not work properly. We recommend that you leave cookies enabled for the best experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. We recommend that you read the privacy policies of these third-party websites for more information about their cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our Cookie Policy, please contact us at privacy@careercompass.io.
              </p>
            </section>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}