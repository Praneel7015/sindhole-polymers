import { z } from "zod";

export const userTypeSchema = z.enum(["trade", "homeowner"]);

// ─── Base contact fields ───────────────────────────────────────────────────────
const contactBase = z.object({
  userType: userTypeSchema,
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d\s\+\-\(\)]+$/, "Invalid phone number"),
  email: z.string().email("Enter a valid email address").or(z.literal("")),
  city: z.string().min(2, "Enter your city").optional().or(z.literal("")),
  turnstileToken: z.string().min(1, "Please complete the security check"),
  // honeypot — must be empty
  _hp: z.literal("").optional(),
});

// ─── Enquiry schema (multi-step) ──────────────────────────────────────────────
export const enquirySchema = contactBase.extend({
  company: z.string().optional(),
  sector: z.string().optional(),
  product: z.string().optional(),
  quantity: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().max(2000).optional(),
  fileKey: z.string().optional(), // UploadThing file key after upload
  fileUrl: z.string().url().optional(),
  fileName: z.string().optional(),
});

// ─── Contact form (simple) ────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d\s\+\-\(\)]+$/, "Invalid phone number"),
  email: z.string().email("Enter a valid email").or(z.literal("")),
  message: z.string().min(5, "Please enter a message").max(1000),
  turnstileToken: z.string().min(1, "Please complete the security check"),
  _hp: z.literal("").optional(),
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
  yearsInBusiness: z.string().optional(),
  monthlyVolume: z.string().optional(),
  currentSupplier: z.string().optional(),
  message: z.string().max(1000).optional(),
  turnstileToken: z.string().min(1, "Please complete the security check"),
  _hp: z.literal("").optional(),
});

// ─── Callback request ─────────────────────────────────────────────────────────
export const callbackSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z
    .string()
    .min(10)
    .regex(/^[\d\s\+\-\(\)]+$/),
  preferredTime: z.string().optional(),
  turnstileToken: z.string().min(1, "Please complete the security check"),
  _hp: z.literal("").optional(),
});

// ─── Types ────────────────────────────────────────────────────────────────────
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type FabricatorInput = z.infer<typeof fabricatorSchema>;
export type CallbackInput = z.infer<typeof callbackSchema>;
