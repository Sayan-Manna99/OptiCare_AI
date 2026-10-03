"use server";

import { getAuth } from "../better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";
import { PatientSignInFormData, SignInFormData, SignUpFormData } from "../validations/auth.validation";

export const signUpWithEmail = async (data: SignUpFormData) => {
  try {
    const auth = await getAuth();
    if (!auth) {
      return { success: false, message: "Could not initialize auth" };
    }

    const response = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    if (!response) {
      return { success: false, message: "Sign up failed" };
    }

    //await inngest.send({
    // name: "app/user.created",
    // data: { name: data.name, email: data.email },
    //  });

    return { success: true, data: response };
  } catch (error: any) {
    console.error("sign up failed,", error);
    const message = error?.body?.message || error?.message || "Sign up failed";
    return { success: false, message };
  }
};

export const signOut = async () => {
  try {
    const auth = await getAuth();
    await auth.api.signOut({
      headers: await headers(),
    });
    return { success: true };
  } catch (error) {
    console.error("sign out failed", error);
    return { success: false, message: "Could not sign out" };
  }
};

export const signInWithEmail = async (data: SignInFormData) => {
  try {
    const auth = await getAuth();
    if (!auth) {
      return { success: false, message: "Could not initialize auth" };
    }

    const response = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
      headers: await headers(), // required for session cookie
    });

    if (!response) {
      return { success: false, message: "Sign in failed" };
    }

    return { success: true, data: response };
  } catch (error: any) {
    console.error("sign in failed,", error);
    const message = error?.body?.message || error?.message || "Sign in failed";
    return { success: false, message };
  }
};

export const signInAsPatient = async (data: PatientSignInFormData) => {
  try {
    // For now, we simulate a successful login since patients are created by clinics
    // and stored in a separate collection/table that we'll integrate later.

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (data.patientId.startsWith("OPT-") && data.password.length >= 6) {
      return {
        success: true,
        message: "Signed in to Patient Portal",
        redirect: "/dashboard" // Patients will have a different dashboard later
      };
    }

    return {
      success: false,
      message: "Invalid Patient ID or Password. Please check your clinic records."
    };
  } catch (error: any) {
    console.error("patient sign in failed,", error);
    return { success: false, message: "An error occurred during sign in." };
  }
};
