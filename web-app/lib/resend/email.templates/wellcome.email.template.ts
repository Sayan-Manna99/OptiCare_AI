export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to OcuSense AI</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f6f8; padding:40px 20px;">
    <tr>
      <td align="center">
        
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:600px; background:#ffffff; border-radius:8px; padding:40px; border:1px solid #e5e7eb;">
          
          <!-- Heading -->
          <tr>
            <td style="padding-bottom:20px;">
              <h1 style="margin:0; font-size:24px; color:#111827;">
                Welcome to OptiCare AI, {{name}} 👋
              </h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding-bottom:20px;">
              <p style="margin:0; font-size:16px; line-height:1.6; color:#374151;">
                Your account has been successfully created. We're excited to have you join OcuSense AI — your intelligent eye disease detection platform.
              </p>
            </td>
          </tr>

          <!-- Description -->
          <tr>
            <td style="padding-bottom:20px;">
              <p style="margin:0; font-size:16px; line-height:1.6; color:#374151;">
                With OcuSense AI, you can upload eye scan images and receive AI-powered predictions along with a detailed medical-style report delivered directly to your email.
              </p>
            </td>
          </tr>

          <!-- Features -->
          <tr>
            <td style="padding-bottom:25px;">
              <p style="margin:0 0 10px 0; font-weight:600; color:#111827;">
                What you can do:
              </p>
              <ul style="margin:0; padding-left:20px; color:#374151; font-size:15px; line-height:1.8;">
                <li>Upload eye scan images securely</li>
                <li>Receive instant AI-based predictions</li>
                <li>Download detailed PDF medical reports</li>
                <li>Get reports delivered directly to your email</li>
              </ul>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding-top:20px; border-top:1px solid #e5e7eb;">
              <p style="margin:0; font-size:14px; color:#6b7280; line-height:1.6;">
                If you have any questions, simply reply to this email — we're here to help.
              </p>
              
              <p style="margin:15px 0 0 0; font-size:12px; color:#9ca3af; line-height:1.5;">
                © ${new Date().getFullYear()} OcuSense AI. All rights reserved.
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
