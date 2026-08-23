import { NextResponse } from "next/server";
import { fabricatorSchema } from "@/lib/schemas/forms";
import { resend, TO_EMAIL, FROM_EMAIL, verifyTurnstile } from "@/lib/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = fabricatorSchema.safeParse(body);

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
      replyTo: data.email,
      subject: `Fabricator Application — ${data.businessName} (${data.city})`,
      html: `
        <h2 style="color:#1F3C28;font-family:sans-serif">Fabricator / Partner Application</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><th align="left" style="padding:8px;background:#f5f5f0;border:1px solid #ddd">Field</th><th align="left" style="padding:8px;background:#f5f5f0;border:1px solid #ddd">Value</th></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Business Name</strong></td><td style="padding:8px;border:1px solid #ddd">${data.businessName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Owner Name</strong></td><td style="padding:8px;border:1px solid #ddd">${data.ownerName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>City</strong></td><td style="padding:8px;border:1px solid #ddd">${data.city}</td></tr>
          ${data.yearsInBusiness ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Years in business</strong></td><td style="padding:8px;border:1px solid #ddd">${data.yearsInBusiness}</td></tr>` : ""}
          ${data.monthlyVolume ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Monthly volume</strong></td><td style="padding:8px;border:1px solid #ddd">${data.monthlyVolume}</td></tr>` : ""}
          ${data.currentSupplier ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Current supplier</strong></td><td style="padding:8px;border:1px solid #ddd">${data.currentSupplier}</td></tr>` : ""}
          ${data.message ? `<tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${data.message}</td></tr>` : ""}
        </table>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:24px">Sent from polymers.sindhole.com</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/fabricator]", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
