import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const HR_EMAIL = 'hr@ccpromoters.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cizr93dz.insforge.site';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: true },
});

const templates = {
  registration: (data: Record<string, string>) => ({
    subject: `New Candidate Registration — ${data.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0D0D0D;padding:24px;border-radius:8px 8px 0 0">
          <h2 style="color:#fff;margin:0">New Candidate Registration</h2>
        </div>
        <div style="background:#f7f9fc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
          <p style="color:#4a5568">A new candidate has registered on CCPromoters:</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#718096;width:140px"><strong>Name</strong></td><td style="color:#0D0D0D">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Email</strong></td><td style="color:#0D0D0D">${data.email}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Discipline</strong></td><td style="color:#0D0D0D">${data.discipline || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Experience</strong></td><td style="color:#0D0D0D">${data.experience || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Location</strong></td><td style="color:#0D0D0D">${data.location || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Job Type</strong></td><td style="color:#0D0D0D">${data.jobType || '—'}</td></tr>
          </table>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0">
            <a href="${SITE_URL}/dashboard/admin/candidates" style="background:#CC1016;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">
              View in Admin Panel →
            </a>
          </div>
        </div>
      </div>
    `,
  }),

  resume: (data: Record<string, string>) => ({
    subject: `Resume Uploaded — ${data.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0D0D0D;padding:24px;border-radius:8px 8px 0 0">
          <h2 style="color:#fff;margin:0">Resume Uploaded</h2>
        </div>
        <div style="background:#f7f9fc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
          <p style="color:#4a5568">A candidate has uploaded their resume:</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#718096;width:140px"><strong>Name</strong></td><td style="color:#0D0D0D">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Email</strong></td><td style="color:#0D0D0D">${data.email}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>File</strong></td><td style="color:#0D0D0D">${data.fileName}</td></tr>
          </table>
          ${data.fileUrl ? `<div style="margin-top:16px"><a href="${data.fileUrl}" style="background:#CC1016;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">Download Resume →</a></div>` : ''}
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0">
            <a href="${SITE_URL}/dashboard/admin/candidates" style="color:#0D0D0D;font-size:14px">View in Admin Panel →</a>
          </div>
        </div>
      </div>
    `,
  }),

  contact: (data: Record<string, string>) => ({
    subject: `New Contact Enquiry — ${data.subject || 'General'} (from ${data.name})`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0D0D0D;padding:24px;border-radius:8px 8px 0 0">
          <h2 style="color:#fff;margin:0">New Contact Form Submission</h2>
          <p style="color:#CC1016;margin:6px 0 0;font-size:14px">Someone is interested in working with CCPromoters</p>
        </div>
        <div style="background:#f7f9fc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#718096;width:140px"><strong>Name</strong></td><td style="color:#0D0D0D;font-weight:600">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Email</strong></td><td><a href="mailto:${data.email}" style="color:#CC1016">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding:8px 0;color:#718096"><strong>Phone</strong></td><td style="color:#0D0D0D">${data.phone}</td></tr>` : ''}
            ${data.company ? `<tr><td style="padding:8px 0;color:#718096"><strong>Company</strong></td><td style="color:#0D0D0D">${data.company}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#718096"><strong>Subject</strong></td><td style="color:#0D0D0D">${data.subject || '—'}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#fff;border-left:4px solid #CC1016;border-radius:4px">
            <p style="color:#718096;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px">Message</p>
            <p style="color:#0D0D0D;margin:0;line-height:1.6">${data.message}</p>
          </div>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0">
            <a href="mailto:${data.email}" style="background:#CC1016;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block">
              Reply to ${data.name} →
            </a>
            <a href="${SITE_URL}/dashboard/admin/contacts" style="margin-left:12px;color:#0D0D0D;font-size:14px;text-decoration:none">
              View in Admin →
            </a>
          </div>
        </div>
      </div>
    `,
  }),

  application: (data: Record<string, string>) => ({
    subject: `New Job Application — ${data.candidateName} → ${data.jobTitle}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0D0D0D;padding:24px;border-radius:8px 8px 0 0">
          <h2 style="color:#fff;margin:0">New Job Application</h2>
          <p style="color:#CC1016;margin:6px 0 0;font-size:14px">A candidate has applied via CCPromoters</p>
        </div>
        <div style="background:#f7f9fc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#718096;width:140px"><strong>Name</strong></td><td style="color:#0D0D0D;font-weight:600">${data.candidateName}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Email</strong></td><td><a href="mailto:${data.candidateEmail}" style="color:#CC1016">${data.candidateEmail}</a></td></tr>
            ${data.candidatePhone ? `<tr><td style="padding:8px 0;color:#718096"><strong>Phone</strong></td><td style="color:#0D0D0D">${data.candidatePhone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#718096"><strong>Position</strong></td><td style="color:#0D0D0D;font-weight:600">${data.jobTitle}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Discipline</strong></td><td style="color:#0D0D0D">${data.discipline || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#718096"><strong>Location</strong></td><td style="color:#0D0D0D">${data.location || '—'}</td></tr>
          </table>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;display:flex;gap:12px;flex-wrap:wrap">
            <a href="mailto:${data.candidateEmail}" style="background:#CC1016;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block">
              Reply to ${data.candidateName} →
            </a>
            ${data.resumeUrl ? `<a href="${data.resumeUrl}" style="background:#0D0D0D;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block">Download Resume →</a>` : ''}
          </div>
          <div style="margin-top:16px">
            <a href="${SITE_URL}/dashboard/admin/applications" style="color:#0D0D0D;font-size:13px;text-decoration:none">View in Admin Panel →</a>
          </div>
        </div>
      </div>
    `,
  }),
};

export async function POST(req: NextRequest) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('[notify] SMTP_USER and SMTP_PASS env vars are not set — email skipped');
    return NextResponse.json({ ok: false, error: 'SMTP not configured' }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { type, data } = body as { type: keyof typeof templates; data: Record<string, string> };

    const template = templates[type];
    if (!template) return NextResponse.json({ error: 'Unknown notification type' }, { status: 400 });

    const { subject, html } = template(data);

    await transporter.sendMail({
      from: `CCPromoters <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: HR_EMAIL,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[notify] Email send failed:', err);
    return NextResponse.json({ ok: false, error: 'Email send failed' }, { status: 500 });
  }
}
