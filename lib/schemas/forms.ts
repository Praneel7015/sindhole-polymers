import { z } from "zod";

export const userTypeSchema = z.enum(["trade", "homeowner"]);

// Email: pass-through if empty, validate if non-empty
const optionalEmail = z
  .string()
  .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
    message: "Enter a valid email address",
  });

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
    .refine((v) => v === "" || v.length >= 2, { message: "Enter your city" }),
  turnstileToken: z.string().min(1, "Please complete the security check"),
  _hp: z.literal("").optional(),
});

// ─── Enquiry schema (multi-step) ──────────────────────────────────────────────
export const enquirySchema = contactBase.extend({
  company: z.string(),
  sector: z.string(),
  product: z.string(),
  quantity: z.string(),
  timeline: z.string(),
  message: z.string().max(2000),
  fileKey: z.string().optional(),
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
  email: optionalEmail,
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
  yearsInBusiness: z.string(),
  monthlyVolume: z.string(),
  currentSupplier: z.string(),
  message: z.string().max(1000),
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
  preferredTime: z.string(),
  turnstileToken: z.string().min(1, "Please complete the security check"),
  _hp: z.literal("").optional(),
});

// ─── Types ────────────────────────────────────────────────────────────────────
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type FabricatorInput = z.infer<typeof fabricatorSchema>;
export type CallbackInput = z.infer<typeof callbackSchema>;
