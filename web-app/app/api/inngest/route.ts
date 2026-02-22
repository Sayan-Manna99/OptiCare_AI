import { inngest } from "@/lib/inngest/client";
import { signUpEmail } from "@/lib/inngest/functions";
import { serve } from "inngest/next";



export const { GET, PUT, POST } = serve({
  client: inngest,
  functions: [signUpEmail],
});
