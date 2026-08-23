import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/schemas/forms";
import { resend, TO_EMAIL, FROM_EMAIL, verifyTurnstile } from "@/lib/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Honeypot check
    if (data._hp) {
      return NextResponse.json({ success: true }); // silently accept spam
    }

    // Turnstile verification
    const valid = await verifyTurnstile(data.turnstileToken);
    if (!valid) {
      return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 403 });
    }

    const subject = `New Enquiry — ${data.userType === "trade" ? "Trade" : "Homeowner"} — ${data.name} (${data.city || "location not specified"})`;

    const html = `
      <h2 style="color:#1F3C28;font-family:sans-serif">New Enquiry from Sindhole Polymers Website</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><th align="left" style="padding:8px;background:#f5f5f0;border:1px solid #ddd">Field</th><th align="left" style="padding:8px;background:#f5f5f0;border:1px solid #ddd">Value</th></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Type</strong></td><td style="padding:8px;border:1px solid #ddd">${data.userType === "trade" ? "Trade / Fabricator" : "Homeowner"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
        ${data.email ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>` : ""}
        ${data.city ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>City</strong></td><td style="padding:8px;border:1px solid #ddd">${data.city}</td></tr>` : ""}
        ${data.company ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Company</strong></td><td style="padding:8px;border:1px solid #ddd">${data.company}</td></tr>` : ""}
        ${data.product ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Product interest</strong></td><td style="padding:8px;border:1px solid #ddd">${data.product}</td></tr>` : ""}
        ${data.quantity ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Quantity</strong></td><td style="padding:8px;border:1px solid #ddd">${data.quantity}</td></tr>` : ""}
        ${data.timeline ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Timeline</strong></td><td style="padding:8px;border:1px solid #ddd">${data.timeline}</td></tr>` : ""}
        ${data.message ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${data.message}</td></tr>` : ""}
        ${data.fileUrl ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Attachment</strong></td><td style="padding:8px;border:1px solid #ddd"><a href="${data.fileUrl}">${data.fileName ?? "View file"}</a></td></tr>` : ""}
      </table>
      <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:24px">Sent from polymers.sindhole.com</p>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email || undefined,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/enquiry]", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
