import { buildMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Sindhole Polymers collects, uses, and protects your personal information.",
  path: "/legal/privacy",
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="page-offset section-pad" style={{ background: "var(--surface-0)" }}>
      <div className="container-prose mx-auto">
        <header className="mb-10">
          <p className="t-overline mb-2" style={{ color: "var(--accent)" }}>Legal</p>
          <h1 className="t-display-lg mb-3" style={{ color: "var(--fg-ink)" }}>Privacy Policy</h1>
          <p className="t-body-sm" style={{ color: "var(--fg-subtle)" }}>
            Last updated: August 2026
          </p>
        </header>

        <div
          className="prose-custom"
          style={{ color: "var(--fg-secondary)" }}
        >
          <Section title="1. Who we are">
            <p>
              This Privacy Policy applies to <strong>Sindhole Polymers</strong> ("we", "us", "our"),
              a business operating at Manahalli Road, Basaveshwara Nagar, Bidar, Karnataka 585403,
              India. We operate the website at{" "}
              <a href="https://polymers.sindhole.com">polymers.sindhole.com</a> (the "Site").
            </p>
          </Section>

          <Section title="2. Information we collect">
            <p>We collect information you voluntarily provide through our enquiry, contact, and
            fabricator application forms. This includes:</p>
            <ul>
              <li>Name, phone number, and email address</li>
              <li>City/district and business or company name (for trade enquiries)</li>
              <li>Project details including product interest, quantity, and timeline</li>
              <li>Uploaded files (project plans or drawings) shared via our file upload feature</li>
              <li>Any message or notes you include in the form</li>
            </ul>
            <p>
              We also collect anonymised usage data via{" "}
              <strong>Cloudflare Web Analytics</strong>, which is cookieless and does not track
              individuals. No cookies are set for analytics purposes.
            </p>
          </Section>

          <Section title="3. How we use your information">
            <ul>
              <li>To respond to your enquiry or application by phone, email, or WhatsApp</li>
              <li>To provide pricing, product information, and availability relevant to your project</li>
              <li>To maintain a record of business correspondence</li>
            </ul>
            <p>
              We do <strong>not</strong> use your information for unsolicited marketing, sell it to
              third parties, or use it for any purpose other than responding to your enquiry and
              conducting our business.
            </p>
          </Section>

          <Section title="4. Data storage and security">
            <p>
              Enquiry emails are delivered via <strong>Resend</strong> (a transactional email
              service) to our business inbox. Uploaded files are stored securely via{" "}
              <strong>Uploadthing</strong>. We take reasonable technical and organisational
              precautions to protect your data, including HTTPS encryption on all form submissions.
            </p>
          </Section>

          <Section title="5. Data retention">
            <p>
              We retain enquiry correspondence for as long as is reasonably necessary for business
              purposes, typically no longer than 3 years unless a longer retention period is
              required by applicable law or ongoing business relationship.
            </p>
          </Section>

          <Section title="6. Third-party services">
            <p>Our Site uses the following third-party services:</p>
            <ul>
              <li>
                <strong>Cloudflare Web Analytics</strong> — cookieless, privacy-first analytics
              </li>
              <li>
                <strong>Cloudflare Turnstile</strong> — bot/spam protection on forms (no CAPTCHA
                image challenges; no cookies beyond what is strictly necessary for the challenge)
              </li>
              <li>
                <strong>Resend</strong> — transactional email delivery
              </li>
              <li>
                <strong>Uploadthing</strong> — file storage for uploaded attachments
              </li>
              <li>
                <strong>Google Maps</strong> — embedded map on our Contact page (Google's privacy
                policy applies to the map embed)
              </li>
            </ul>
          </Section>

          <Section title="7. Your rights">
            <p>
              Under applicable Indian data protection legislation, you have the right to access,
              correct, or request deletion of personal information we hold about you. To exercise
              any of these rights, contact us at{" "}
              <a href="mailto:polymers@sindhole.com">polymers@sindhole.com</a>.
            </p>
          </Section>

          <Section title="8. Changes to this policy">
            <p>
              We may update this policy from time to time. The "Last updated" date at the top of
              this page reflects the most recent version. Continued use of the Site after changes
              constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              For any privacy-related questions, contact us at:
              <br />
              Sindhole Polymers, Manahalli Road, Basaveshwara Nagar, Bidar, Karnataka 585403
              <br />
              Email:{" "}
              <a href="mailto:polymers@sindhole.com">polymers@sindhole.com</a>
              <br />
              Phone: +91 93919 05091
            </p>
          </Section>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="t-display-sm mb-3" style={{ color: "var(--fg-ink)" }}>
        {title}
      </h2>
      <div className="t-body space-y-3 [&_a]:underline [&_a]:text-[var(--accent)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
