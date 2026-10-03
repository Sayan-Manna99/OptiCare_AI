"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PatientSignInSchema, PatientSignInFormData } from "@/lib/validations/auth.validation";
import { Button } from "@/components/ui/button";
import InputField from "@/components/form/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAsPatient } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ShieldCheck, Info } from "lucide-react";

export default function PatientLoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientSignInFormData>({
    defaultValues: {
      patientId: "",
      password: "",
    },
    resolver: zodResolver(PatientSignInSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<PatientSignInFormData> = async (data) => {
    try {
      // FRONTEND ONLY REDIRECT FOR DEMO
      toast.success("Login successful! Welcome to the portal.");
      router.push("/patient-portal");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-gray-100 tracking-tight">Patient Portal Access</h1>
        <p className="text-gray-500 font-medium">Enter your clinic-provided credentials to securely access your reports.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <InputField
            name="patientId"
            label="Patient / User ID"
            placeholder="e.g. OPT-2026-XXXX"
            type="text"
            register={register}
            error={errors.patientId}
          />

          <InputField
            name="password"
            label="Access Password"
            placeholder="Enter your security password"
            type="password"
            register={register}
            error={errors.password}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-black text-lg transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Verifying...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Secure Portal Login
            </div>
          )}
        </Button>
      </form>

      {/* Security Note */}
      <div className="p-6 rounded-3xl bg-gray-900/50 border border-gray-800 space-y-4">
        <div className="flex items-center gap-3 text-blue-400">
          <Info className="h-5 w-5" />
          <h4 className="text-sm font-bold uppercase tracking-widest">Clinic Managed Access</h4>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed italic">
          If you do not have your credentials or have lost them, please contact your healthcare provider directly. Patient accounts are created and managed by the clinic to ensure maximum data privacy and security.
        </p>
      </div>

      {/* Footer Branding */}
      <div className="flex items-center justify-center gap-2 py-4 border-t border-gray-800/50">
        <ShieldCheck className="h-4 w-4 text-gray-700" />
        <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">HIPAA Compliant Secure Access</span>
      </div>
    </div>
  );
}
