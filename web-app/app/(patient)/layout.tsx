import React from "react";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-400 p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  );
}
