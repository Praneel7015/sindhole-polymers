import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder_key_not_set");

export const FROM_EMAIL = "leads@polymers.sindhole.com";
export const TO_EMAIL = process.env.LEAD_EMAIL ?? "polymers@sindhole.com";

export async function verifyTurnstile(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    // Dev: skip if no key configured
    if (process.env.NODE_ENV !== "production") return true;
    return false;
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    },
  );

  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}
