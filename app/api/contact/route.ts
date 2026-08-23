import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/forms";
import { resend, TO_EMAIL, FROM_EMAIL, verifyTurnstile } from "@/lib/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    if (data._hp) return NextResponse.json({ success: true });

    const valid = await verifyTurnstile(data.turnstileToken);
    if (!valid) {
      return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 403 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email || undefined,
      subject: `Website Contact — ${data.name}`,
      html: `
        <h2 style="color:#1F3C28;font-family:sans-serif">New Contact Message</h2>
        <p style="font-family:sans-serif"><strong>Name:</strong> ${data.name}</p>
        <p style="font-family:sans-serif"><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        ${data.email ? `<p style="font-family:sans-serif"><strong>Email:</strong> ${data.email}</p>` : ""}
        <p style="font-family:sans-serif"><strong>Message:</strong></p>
        <p style="font-family:sans-serif;background:#f5f5f0;padding:12px;border-radius:6px">${data.message}</p>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:24px">Sent from polymers.sindhole.com</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
