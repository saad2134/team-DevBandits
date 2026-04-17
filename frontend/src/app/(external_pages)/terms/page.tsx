import type { Metadata } from "next";
import NavbarComponent from "@/components/navbar/navbar";
import FooterSection from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Terms of Service - CareerCompass",
  description: "CareerCompass Terms of Service",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarComponent isExternalPage={true} />

      <main className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: April 17, 2026</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using CareerCompass, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, then you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The service and its original content, features, and functionality are and will remain the exclusive property of CareerCompass and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You may not copy, modify, distribute, sell, or lease any part of our service without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. User Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Our service allows you to post, link, store, or otherwise transmit certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By posting content to the service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You may not use the service for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any local, state, federal, or international laws or regulations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to: harass, abuse, harm, defame, or discriminate; submit false or misleading information; collect or track personal information of others; or spread viruses or other harmful code.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall CareerCompass, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms, please contact us at legal@careercompass.io.
              </p>
            </section>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}