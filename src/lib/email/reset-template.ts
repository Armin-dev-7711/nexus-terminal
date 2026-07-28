// src/lib/email/reset-template.ts

interface SendResetPasswordEmailProps {
  userName: string;
  resetUrl: string;
}

export function getResetPasswordEmailHtml({
  userName,
  resetUrl,
}: SendResetPasswordEmailProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Emergency Key Reset | NEXUS</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; padding: 40px 10px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #121215; border: 1px solid #27272a; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 32px 32px 20px 32px; text-align: center; border-bottom: 1px solid #18181b;">
                  <div style="display: inline-block; background-color: #84cc16; color: #09090b; font-weight: 900; font-size: 16px; padding: 6px 16px; border-radius: 12px; letter-spacing: 2px;">
                    NEXUS OS
                  </div>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 32px;">
                  <h1 style="font-size: 20px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0; letter-spacing: -0.5px;">
                    Emergency Key Override Request
                  </h1>
                  <p style="font-size: 13px; color: #a1a1aa; line-height: 1.6; margin: 0 0 24px 0;">
                    Greetings <strong style="color: #ffffff;">${userName}</strong>,<br>
                    A password security key override token has been generated for your node operator account. Click below to establish a new secret security key.
                  </p>

                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 32px 0;">
                    <a href="${resetUrl}" target="_blank" style="display: inline-block; background-color: #84cc16; color: #09090b; font-weight: 800; font-size: 13px; text-decoration: none; padding: 14px 28px; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 0 20px rgba(132,204,34,0.3);">
                      Reset Security Key &rarr;
                    </a>
                  </div>

                  <p style="font-size: 11px; color: #71717a; line-height: 1.5; margin: 24px 0 0 0; border-top: 1px solid #18181b; padding-top: 16px;">
                    If you did not request a key override, please secure your network access immediately. This cryptographic token will expire shortly.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px 32px; background-color: #09090b; text-align: center; border-top: 1px solid #18181b;">
                  <p style="font-size: 10px; color: #52525b; margin: 0; text-transform: uppercase; letter-spacing: 1.5px;">
                    NEXUS Terminal &bull; Decentralized Intelligence Protocol
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
