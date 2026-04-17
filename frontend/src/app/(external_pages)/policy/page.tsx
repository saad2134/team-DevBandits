import type { Metadata } from "next";
import NavbarComponent from "@/components/navbar/navbar";
import FooterSection from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Privacy Policy - CareerCompass",
  description: "CareerCompass Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarComponent isExternalPage={true} />

      <main className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: April 17, 2026</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At CareerCompass, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully. If you disagree with the terms of this privacy policy, please do not access the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the platform, or otherwise when you contact us.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                This includes information such as your name, email address, phone number, educational background, skills, and career preferences. We also collect automatically collected information through cookies and similar technologies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We use the information to provide and improve our services, communicate with you, send you marketing communications, and to detect and prevent fraud.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Sharing Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We only share information with the following third parties: service providers who process data on our behalf, business partners with your consent, and as required by law.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We never sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards, no website or system can be completely secure. We cannot guarantee that unauthorized third parties will never be able to defeat those measures.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or restrict processing of your personal information. You may also have the right to object to processing and to data portability.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or comments about this policy, you may email us at privacy@careercompass.io.
              </p>
            </section>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}