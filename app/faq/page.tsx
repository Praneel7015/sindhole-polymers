import { buildMetadata } from "@/lib/seo";
import { faqs, faqCategories } from "@/content/faq";
import { faqJsonLd } from "@/lib/seo";
import FaqClient from "./FaqClient";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about uPVC window profiles, Greentech systems, ordering, and more.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
          ),
        }}
      />
      <FaqClient faqs={faqs} categories={faqCategories} />
    </>
  );
}
