import { inngest } from "@/lib/inngest/client";
import { sendWelcomeEmail } from '@/lib/resend/send.wellcome.email';

export const signUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.created" },

  async ({ event, step }) => {
    return await step.run("send-welcome-email", async () => {
      const introText =
        "OcuSense AI leverages advanced deep learning models to analyze retinal images and detect potential eye diseases in real time. Upload your scan, receive AI-powered predictions, and get a comprehensive report instantly.";
      const {
        data: { email, name },
      } = event;

      const appUrl = process.env.NEXT_PUBLIC_APP_URL;

      if (!appUrl) {
        throw new Error("NEXT_PUBLIC_APP_URL is not defined");
      }

      

      await sendWelcomeEmail({
        email,
        name,
        intro: introText,
        
      });

      return {
        success: true,
        message: "email sent successfully",
      };
    });
  },
);
