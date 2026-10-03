import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import { getAuth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ClinicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900">
      <MobileHeader />
      <div className="hidden lg:block w-64 shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 min-w-0 p-4 md:p-8 lg:p-10">
        {children}
      </div>
    </div>
  );
}
