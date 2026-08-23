import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/meta";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = buildMetadata({
  title: "Authorised Distributor — Bidar & North Karnataka",
  description:
    "Sindhole Polymers is the authorised Greentech uPVC profile dealer in Bidar, Karnataka. Legal distributor notice and copyright information.",
  path: "/legal/distributor",
});

export default function DistributorPage() {
  return (
    <>
      <Header />
      <main className="page-offset section-pad" style={{ background: "var(--surface-0)" }}>
      <div className="container-prose mx-auto">
        <header className="mb-10">
          <p className="t-overline mb-2" style={{ color: "var(--accent)" }}>
            Legal
          </p>
          <h1 className="t-display-lg mb-3" style={{ color: "var(--fg-ink)" }}>
            Authorised Distributor Notice
          </h1>
          <p className="t-body-sm" style={{ color: "var(--fg-subtle)" }}>
            Last updated: August 2026
          </p>
        </header>

        <div style={{ color: "var(--fg-secondary)" }}>
          {/* Authorised dealer notice */}
          <div
            className="p-6 rounded-xl border mb-10"
            style={{ borderColor: "var(--accent-mid)", background: "var(--accent-light)" }}
          >
            <p className="t-body font-medium mb-1" style={{ color: "var(--accent-dark)" }}>
              Authorised Dealer — Greentech uPVC India Pvt. Ltd.
            </p>
            <p className="t-body" style={{ color: "var(--fg-secondary)" }}>
              Sindhole Polymers is formally authorised by Greentech uPVC India Pvt. Ltd. to
              stock and supply Greentech-branded uPVC profile systems in the Bidar district
              and North Karnataka region.
            </p>
          </div>

          <Section title="Distributor Details">
            <table className="w-full t-body-sm border-collapse">
              <tbody>
                {[
                  ["Business name", "Sindhole Polymers"],
                  ["Nature of business", "Authorised dealer — uPVC profile systems"],
                  ["Principal brand represented", "Greentech uPVC India Pvt. Ltd."],
                  ["Registered address", `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.postalCode}`],
                  ["Authorised territory", "Bidar district and surrounding North Karnataka region"],
                  ["Contact phone", siteConfig.phone],
                  ["Contact email", siteConfig.email],
                  ["GST number", siteConfig.company.gst || "To be updated"],
                ].map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td className="py-3 pr-4 font-medium" style={{ color: "var(--fg-ink)", width: "40%" }}>
                      {label}
                    </td>
                    <td className="py-3" style={{ color: "var(--fg-secondary)" }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Trademark and Brand Usage Notice">
            <p>
              The "Greentech" name, Greentech logo, and associated product names are trademarks of{" "}
              <strong>Greentech uPVC India Pvt. Ltd.</strong> Use of these marks on this website is
              made solely under the authorised dealer relationship and does not imply any ownership
              or independent trademark rights by Sindhole Polymers.
            </p>
            <p>
              "DIMEX" and DIMEX GmbH references on this website are made to accurately represent the
              technology heritage of Greentech profile systems and are the property of their
              respective owners.
            </p>
          </Section>

          <Section title="Copyright Notice">
            <p>
              © {new Date().getFullYear()} Sindhole Polymers. All rights reserved.
            </p>
            <p>
              The content on this website — including text, design, user interface, custom
              illustrations, SVG diagrams, and page structure — is the original work of Sindhole
              Polymers and/or its designers and is protected by applicable copyright law.
              Unauthorised reproduction, redistribution, or commercial use of any content on this
              website is prohibited without written permission.
            </p>
            <p>
              Product photography, where used, is sourced with permission from Greentech uPVC India
              Pvt. Ltd. All rights in such images remain with their respective copyright holders.
            </p>
          </Section>

          <Section title="Disclaimer">
            <p>
              Product specifications, pricing, and availability are subject to change without
              notice. While we endeavour to keep information on this website accurate and current,
              Sindhole Polymers makes no warranty, express or implied, regarding the completeness or
              accuracy of any information provided. All product and technical specifications should
              be confirmed directly with Sindhole Polymers before use in any project documentation.
            </p>
            <p>
              Sindhole Polymers is an independent business entity. Greentech uPVC India Pvt. Ltd.
              is not responsible for the operations, representations, or commitments made by
              Sindhole Polymers beyond the scope of the authorised dealer agreement.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              This notice and any disputes arising from the use of this website are governed by the
              laws of India, with jurisdiction in the courts of Bidar, Karnataka.
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
      <div className="t-body space-y-3 [&_a]:underline [&_a]:text-[var(--accent)] [&_strong]:text-[var(--fg-ink)]">
        {children}
      </div>
    </section>
  );
}
