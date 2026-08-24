import { z } from "zod";

export const userTypeSchema = z.enum(["trade", "homeowner"]);

/** Optional text input — missing keys and empty strings both become "". */
const optionalText = z.string().default("");

const optionalEmail = z
  .string()
  .default("")
  .pipe(z.union([z.literal(""), z.string().email("Enter a valid email address")]));

const turnstileToken = z.preprocess(
  (v) => (v === undefined || v === null ? "" : v),
  z.string().min(1, "Please complete the security check"),
);

const honeypot = z.union([z.literal(""), z.undefined()]).optional();

// ─── Base contact fields ───────────────────────────────────────────────────────
const contactBase = z.object({
  userType: userTypeSchema,
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d\s\+\-\(\)]+$/, "Invalid phone number"),
  email: optionalEmail,
  city: z
    .string()
    .default("")
    .refine((v) => v === "" || v.length >= 2, { message: "Enter your city" }),
  turnstileToken,
  _hp: honeypot,
});

// ─── Enquiry schema (multi-step) ──────────────────────────────────────────────
export const enquirySchema = contactBase.extend({
  company: optionalText,
  sector: optionalText,
  product: optionalText,
  quantity: optionalText,
  timeline: optionalText,
  message: z.string().default("").pipe(z.string().max(2000)),
  fileKey: optionalText,
  fileUrl: z
    .string()
    .default("")
    .transform((v) => (v.length > 0 ? v : undefined))
    .pipe(z.string().url().optional()),
  fileName: optionalText,
});

// ─── Contact form (simple) ────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d\s\+\-\(\)]+$/, "Invalid phone number"),
  email: optionalEmail,
  message: z.string().min(5, "Please enter a message").max(1000),
  turnstileToken,
  _hp: honeypot,
});

// ─── Fabricator application ───────────────────────────────────────────────────
export const fabricatorSchema = z.object({
  businessName: z.string().min(2, "Enter your business name"),
  ownerName: z.string().min(2, "Enter your name"),
  phone: z
    .string()
    .min(10)
    .regex(/^[\d\s\+\-\(\)]+$/),
  email: z.string().email("Enter a valid email"),
  city: z.string().min(2),
  yearsInBusiness: optionalText,
  monthlyVolume: optionalText,
  currentSupplier: optionalText,
  message: z.string().default("").pipe(z.string().max(1000)),
  turnstileToken,
  _hp: honeypot,
});

// ─── Callback request ─────────────────────────────────────────────────────────
export const callbackSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z
    .string()
    .min(10)
    .regex(/^[\d\s\+\-\(\)]+$/),
  preferredTime: optionalText,
  turnstileToken,
  _hp: honeypot,
});

// ─── Types ────────────────────────────────────────────────────────────────────
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type FabricatorInput = z.infer<typeof fabricatorSchema>;
export type CallbackInput = z.infer<typeof callbackSchema>;
