import { Resend } from "resend";
import { WELCOME_EMAIL_TEMPLATE } from '@/lib/resend/email.templates/wellcome.email.template'
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendWelcomeEmail({
  email,
  name,

}: WelcomeEmailData) {
  const html = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name);

  return await resend.emails.send({
    from: "Momentum <onboarding@resend.dev>",
    to: email,
    subject: "Welcome to OptiCare AI",
    html,
  });
}
