"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import { enquirySchema, type EnquiryInput } from "@/lib/schemas/forms";
import { siteConfig } from "@/content/meta";

/* ─── Step definitions ────────────────────────────────────────────────────── */
const STEPS = ["Your details", "Project info", "Message & submit"] as const;

const PRODUCT_OPTIONS = [
  "52mm Casement Series",
  "60mm Casement Series",
  "80mm Sliding Series",
  "Not sure — need advice",
];
const QUANTITY_OPTIONS = [
  "< 10 window sets",
  "10–50 window sets",
  "50–200 window sets",
  "200+ window sets",
  "Not sure yet",
];
const TIMELINE_OPTIONS = [
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Exploring options",
];
const SECTOR_OPTIONS = [
  "Residential — individual villa/house",
  "Residential — apartment complex",
  "Commercial / office",
  "Replacement & refurbishment",
  "Other",
];

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function Enquiry() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    key: string;
    name: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      userType: "homeowner",
      name: "",
      phone: "",
      email: "",
      city: "",
      company: "",
      sector: "",
      product: "",
      quantity: "",
      timeline: "",
      message: "",
      turnstileToken: "",
      _hp: "",
    },
  });

  // Register Turnstile token without a DOM input (set via widget callbacks)
  useEffect(() => {
    register("turnstileToken");
  }, [register]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const userType = watch("userType");

  async function handleNext() {
    const fieldsPerStep: Array<(keyof EnquiryInput)[]> = [
      ["userType", "name", "phone"],
      ["sector", "product", "quantity", "timeline"],
    ];
    const valid = await trigger(fieldsPerStep[step]);
    if (valid) setStep((s) => s + 1);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/uploadthing", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json() as { url: string; key: string; name: string };
      setUploadedFile(data);
      setValue("fileUrl", data.url);
      setValue("fileKey", data.key);
      setValue("fileName", data.name);
    } catch {
      setUploadError("Upload failed — try again or remove the file.");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(data: EnquiryInput) {
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !json.success) throw new Error(json.error ?? "Unknown error");
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="enquiry" className="section-pad" style={{ background: "var(--surface-0)" }}>
        <div className="container max-w-xl mx-auto text-center py-16">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6"
              style={{ background: "var(--accent-light)" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M5 15L11 21L23 7"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="t-display-md mb-3" style={{ color: "var(--fg-ink)" }}>
              Enquiry received.
            </h2>
            <p className="t-body" style={{ color: "var(--fg-secondary)" }}>
              We&apos;ll be in touch shortly. For faster response, WhatsApp us directly.
            </p>
            <a
              href={siteConfig.whatsappPrefilled}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full font-medium transition-opacity hover:opacity-80"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <WhatsAppIcon />
              Continue on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="enquiry" className="section-pad" style={{ background: "var(--surface-1)" }}>
      <div className="container">
        <div className="grid md:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-start">
          {/* Left — copy */}
          <div>
            <p className="t-overline mb-3" style={{ color: "var(--accent)" }}>
              Get in Touch
            </p>
            <h2 className="t-display-lg mb-5" style={{ color: "var(--fg-ink)" }}>
              Start your project.
            </h2>
            <p className="t-body mb-8 max-w-md" style={{ color: "var(--fg-secondary)" }}>
              Whether you&apos;re a fabricator looking to stock Greentech profiles or a homeowner
              planning new windows — send us the details and we&apos;ll respond with options, pricing,
              and availability.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={siteConfig.whatsappPrefilled}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border font-medium transition-colors"
              style={{
                borderColor: "#25D366",
                color: "#1a6637",
                background: "#f0fdf4",
              }}
            >
              <WhatsAppIcon />
              Prefer WhatsApp? Chat directly →
            </a>

            {/* Steps indicator (desktop) */}
            <div className="hidden md:flex gap-6 mt-10">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center transition-all"
                    style={{
                      background: i <= step ? "var(--accent)" : "var(--surface-2)",
                      color: i <= step ? "var(--accent-on)" : "var(--fg-subtle)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="t-body-sm"
                    style={{ color: i === step ? "var(--fg-ink)" : "var(--fg-subtle)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div
            className="rounded-2xl border p-8 shadow-md"
            style={{ background: "var(--surface-0)", borderColor: "var(--border-subtle)" }}
          >
            {/* Progress bar */}
            <div className="mb-6">
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: "var(--surface-2)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--accent)" }}
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="t-body-xs mt-2" style={{ color: "var(--fg-subtle)" }}>
                Step {step + 1} of {STEPS.length} — {STEPS[step]}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <StepPanel key="step0">
                    {/* User type toggle */}
                    <div className="flex rounded-lg border overflow-hidden mb-5" style={{ borderColor: "var(--border-default)" }}>
                      {(["homeowner", "trade"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setValue("userType", t)}
                          className="flex-1 py-2.5 t-body-sm font-medium transition-colors"
                          style={{
                            background: userType === t ? "var(--accent)" : "transparent",
                            color: userType === t ? "var(--accent-on)" : "var(--fg-secondary)",
                          }}
                        >
                          {t === "homeowner" ? "Homeowner" : "Trade / Fabricator"}
                        </button>
                      ))}
                    </div>

                    <Field label="Full name *" error={errors.name?.message}>
                      <input {...register("name")} placeholder="e.g. Ravi Kumar" />
                    </Field>
                    <Field label="Phone *" error={errors.phone?.message}>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+91 98765 43210"
                      />
                    </Field>
                    <Field label="Email" error={errors.email?.message}>
                      <input {...register("email")} type="email" placeholder="optional" />
                    </Field>
                    <Field label="City / District" error={errors.city?.message}>
                      <input {...register("city")} placeholder="e.g. Bidar, Gulbarga" />
                    </Field>
                    {userType === "trade" && (
                      <Field label="Business / Company name">
                        <input
                          {...register("company")}
                          placeholder="Your fabrication unit or company"
                        />
                      </Field>
                    )}

                    {/* Honeypot */}
                    <input {...register("_hp")} type="text" className="hidden" tabIndex={-1} />
                  </StepPanel>
                )}

                {step === 1 && (
                  <StepPanel key="step1">
                    <Field label="Sector / Project type">
                      <select {...register("sector")}>
                        <option value="">Select…</option>
                        {SECTOR_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Product series of interest">
                      <select {...register("product")}>
                        <option value="">Select…</option>
                        {PRODUCT_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Approx. quantity">
                      <select {...register("quantity")}>
                        <option value="">Select…</option>
                        {QUANTITY_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Timeline">
                      <select {...register("timeline")}>
                        <option value="">Select…</option>
                        {TIMELINE_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                  </StepPanel>
                )}

                {step === 2 && (
                  <StepPanel key="step2">
                    <Field label="Message / requirements" error={errors.message?.message}>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Share any project details, dimensions, or questions…"
                      />
                    </Field>

                    {/* File upload */}
                    <div className="mb-4">
                      <label className="block t-body-sm font-medium mb-1.5" style={{ color: "var(--fg-secondary)" }}>
                        Attach a file (optional)
                        <span className="ml-1 t-body-xs font-normal" style={{ color: "var(--fg-subtle)" }}>
                          Plans, drawings — PDF or image, max 8 MB
                        </span>
                      </label>
                      {uploadedFile ? (
                        <div
                          className="flex items-center gap-2 p-3 rounded-lg border t-body-sm"
                          style={{ borderColor: "var(--accent-mid)", background: "var(--accent-light)" }}
                        >
                          <span style={{ color: "var(--accent)" }}>✓</span>
                          <span className="truncate flex-1" style={{ color: "var(--accent-dark)" }}>{uploadedFile.name}</span>
                          <button
                            type="button"
                            className="flex-shrink-0"
                            style={{ color: "var(--fg-subtle)" }}
                            onClick={() => {
                              setUploadedFile(null);
                              setValue("fileUrl", undefined);
                              setValue("fileKey", undefined);
                              setValue("fileName", undefined);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label
                          className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed cursor-pointer transition-colors hover:border-[var(--accent)] t-body-sm"
                          style={{ borderColor: "var(--border-default)", color: "var(--fg-subtle)" }}
                        >
                          {uploading ? "Uploading…" : "Click to choose a file"}
                          <input
                            type="file"
                            accept="application/pdf,image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={uploading}
                          />
                        </label>
                      )}
                      {uploadError && (
                        <p className="t-body-xs mt-1" style={{ color: "var(--status-error)" }}>{uploadError}</p>
                      )}
                    </div>

                    {/* Turnstile */}
                    <div className="mb-4">
                      <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
                        onSuccess={(token) => {
                          setValue("turnstileToken", token, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                          clearErrors("turnstileToken");
                        }}
                        onExpire={() =>
                          setValue("turnstileToken", "", { shouldValidate: true })
                        }
                        onError={() =>
                          setValue("turnstileToken", "", { shouldValidate: true })
                        }
                        options={{ theme: "light", size: "normal" }}
                      />
                      {errors.turnstileToken && (
                        <p className="t-body-xs mt-1" style={{ color: "var(--status-error)" }}>
                          {errors.turnstileToken.message}
                        </p>
                      )}
                    </div>

                    {serverError && (
                      <div
                        className="p-3 rounded-lg t-body-sm mb-4"
                        style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
                      >
                        {serverError}
                      </div>
                    )}
                  </StepPanel>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex gap-3 mt-6">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="flex-1 py-3 rounded-xl border t-body-sm font-medium transition-colors hover:bg-[var(--surface-1)]"
                    style={{ borderColor: "var(--border-default)", color: "var(--fg-secondary)" }}
                  >
                    Back
                  </button>
                )}
                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 rounded-xl t-body-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ background: "var(--accent)", color: "var(--accent-on)" }}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl t-body-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-60"
                    style={{ background: "var(--accent)", color: "var(--accent-on)" }}
                  >
                    {submitting ? "Sending…" : "Send enquiry"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function StepPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4"
    >
      {children}
    </motion.div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactElement<{ className?: string }>;
}) {
  const styledChild = React.cloneElement(children, {
    className: ["field-input", children.props.className].filter(Boolean).join(" "),
  });

  return (
    <div className="flex flex-col gap-1.5">
      <label className="t-body-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
        {label}
      </label>
      {styledChild}
      {error && (
        <p className="t-body-xs" style={{ color: "var(--status-error)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
