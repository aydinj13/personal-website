/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to generate the appropriate HTML template based on form type
function generateEmailHTML(data: any) {
  const baseStyles = `
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .container {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 32px;
        margin: 20px 0;
      }
      .header {
        text-align: center;
        margin-bottom: 32px;
      }
      .logo {
        font-size: 24px;
        font-weight: bold;
        color: #2563eb;
        margin-bottom: 8px;
      }
      .subtitle {
        color: #6b7280;
        font-size: 16px;
      }
      .section {
        margin: 24px 0;
        padding: 16px;
        background: #f8fafc;
        border-radius: 8px;
      }
      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #1e40af;
        margin-bottom: 12px;
      }
      .field {
        margin: 12px 0;
      }
      .label {
        font-weight: 600;
        color: #4b5563;
        margin-bottom: 4px;
      }
      .value {
        color: #1f2937;
      }
      .message {
        white-space: pre-wrap;
        background: #fff;
        padding: 16px;
        border-radius: 6px;
        border-left: 4px solid #2563eb;
      }
      .footer {
        text-align: center;
        margin-top: 32px;
        padding-top: 16px;
        border-top: 1px solid #e5e7eb;
        color: #6b7280;
        font-size: 14px;
      }
      .highlight {
        display: inline-block;
        background: #dbeafe;
        color: #1e40af;
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: 500;
      }
    </style>
  `;

  const baseTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${baseStyles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">${data.type === 'client' ? 'New Client Inquiry' : data.type === 'partner' ? 'New Partnership Opportunity' : 'New General Inquiry'}</div>
            <div class="subtitle">${
              data.type === 'client' 
                ? 'A potential client has submitted a project inquiry'
                : data.type === 'partner'
                ? 'A new partnership opportunity has been submitted'
                : 'Someone has sent you a message'
            }</div>
          </div>

          <div class="section">
            <div class="section-title">Contact Information</div>
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">
                <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">
                  ${data.email}
                </a>
              </div>
            </div>
            ${data.type === 'client' && data.phone ? `
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${data.phone}</div>
              </div>
            ` : ''}
          </div>

          ${data.type === 'client' ? `
            <div class="section">
              <div class="section-title">Project Details</div>
              <div class="field">
                <div class="label">Service Type</div>
                <div class="value">
                  <span class="highlight">${data.service}</span>
                </div>
              </div>
              <div class="field">
                <div class="label">Budget Range</div>
                <div class="value">
                  <span class="highlight">${data.budget}</span>
                </div>
              </div>
              ${data.startDate ? `
                <div class="field">
                  <div class="label">Preferred Start Date</div>
                  <div class="value">${data.startDate}</div>
                </div>
              ` : ''}
            </div>
          ` : data.type === 'partner' ? `
            <div class="section">
              <div class="section-title">Partnership Details</div>
              <div class="field">
                <div class="label">Partnership Type</div>
                <div class="value">
                  <span class="highlight">${data.partnershipType}</span>
                </div>
              </div>
            </div>
          ` : ''}

          <div class="section">
            <div class="section-title">${data.type === 'client' ? 'Project Description' : 'Message'}</div>
            <div class="message">${data.message}</div>
          </div>

          <div class="footer">
            <p>This ${data.type === 'client' ? 'inquiry' : data.type === 'partner' ? 'opportunity' : 'message'} was sent from your website's contact form.</p>
            <p>Respond within 1-2 business days to maintain high engagement.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return baseTemplate;
}

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await resend.emails.send({
      from: 'Personal Website <onboarding@resend.dev>',
      to: 'aydin@aydinjoshi.com',
      subject: data.type === 'client' 
        ? '🚀 New Client Request'
        : data.type === 'partner'
        ? '🤝 New Partner Request'
        : '📫 New General Inquiry',
      html: generateEmailHTML(data)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}