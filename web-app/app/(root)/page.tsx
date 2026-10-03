import Link from "next/link";
import {
  Eye, ScanLine, Activity, FileText, Shield, Users, BarChart3,
  Brain, Lock, Zap, HeartPulse, CheckCircle2, Stethoscope, ArrowRight,
} from "lucide-react";
import { getAuth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import LandingActions from "@/components/landing/LandingActions";

export default async function LandingPage() {
  const auth = await getAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAuthenticated = !!session?.user;
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 border-b border-gray-700/60 bg-gray-900/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors">OptiCare</p>
              <p className="text-[10px] text-gray-500">Clinical Intelligence</p>
            </div>
          </Link>
          <LandingActions isAuthenticated={isAuthenticated} type="navbar" />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/15 border border-blue-600/30 text-blue-400 mb-6">
            <Zap className="h-3 w-3" /> AI-Powered Ophthalmology Ecosystem
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-100 leading-tight max-w-4xl mx-auto mb-6">
            AI-Assisted Retinal Screening{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              &amp; Clinical Monitoring
            </span>{" "}
            Ecosystem
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            OptiCare empowers clinics, doctors, and healthcare staff to streamline retinal screening,
            receive AI-assisted diagnosis, monitor patients, and generate professional medical reports — all in one platform.
          </p>
          <LandingActions isAuthenticated={isAuthenticated} type="hero" />

          {/* stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Disease Classes", value: "4", icon: Brain, color: "text-blue-400" },
              { label: "AI Accuracy", value: "~93%", icon: Activity, color: "text-teal-400" },
              { label: "Report Time", value: "<5s", icon: FileText, color: "text-yellow-400" },
              { label: "Model Type", value: "MobileNetV3", icon: Zap, color: "text-purple-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-gray-800/80 border border-gray-700 p-4 text-left backdrop-blur-sm hover:border-blue-600/30 transition-colors">
                <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
                <p className="text-xl font-black text-gray-100">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLE SELECTION ── */}
      <section id="roles" className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/15 border border-blue-600/30 text-blue-400 mb-4">
              <Zap className="h-3 w-3" /> Role-Based Access
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-100 mb-3">Choose Your Portal</h1>
            <p className="text-gray-500 text-base leading-relaxed">
              OptiCare serves both clinical teams and patients with dedicated, purpose-built portals for each role.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Doctor Card */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-600/10 to-gray-800 border border-blue-600/25 p-8 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-600/10 group">
              <div className="h-14 w-14 rounded-2xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope className="h-7 w-7 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">Doctor / Clinic Portal</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Full clinical workflow management for healthcare professionals. Upload scans, review AI predictions, manage patients, and generate professional medical reports.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Manage patient records",
                  "Upload & analyze retinal scans",
                  "Review AI-generated predictions",
                  "Generate downloadable PDF reports",
                  "Monitor patient history & trends",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <Link href="/sign-in" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20">
                  <Lock className="h-4 w-4" /> Doctor Login
                </Link>
                <Link href="/sign-up" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-200 font-semibold transition-all">
                  Register Clinic
                </Link>
              </div>
            </div>

            {/* Patient Card */}
            <div className="rounded-3xl bg-gradient-to-br from-teal-400/8 to-gray-800 border border-teal-400/20 p-8 hover:border-teal-400/40 transition-all hover:shadow-2xl hover:shadow-teal-400/5 group">
              <div className="h-14 w-14 rounded-2xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartPulse className="h-7 w-7 text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">Patient Portal</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                A dedicated space for patients to access their medical reports, track retinal health, and stay informed about AI-generated insights from their doctor.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Access AI-generated medical reports",
                  "Track scan history over time",
                  "View doctor notes & recommendations",
                  "Monitor retinal health trends",
                  "Download personal health reports",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/patient-login" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-400/10 hover:bg-teal-400/20 border border-teal-400/30 hover:border-teal-400/50 text-teal-300 font-bold transition-all mb-3">
                <Lock className="h-4 w-4" /> Patient Login
              </Link>
              <p className="text-center text-xs text-gray-600">
                Accounts are provided by your clinic or healthcare provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 border-t border-gray-800">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/15 border border-blue-600/30 text-blue-400 mb-4">
              <Zap className="h-3 w-3" /> Platform Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">Everything a Modern Eye Clinic Needs</h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Purpose-built features for AI-assisted ophthalmology — from initial scan to long-term patient monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Brain, color: "text-blue-400", bg: "bg-blue-600/10 border-blue-600/20", title: "AI Retinal Screening", desc: "MobileNetV3 deep learning model detects CNV, DME, DRUSEN & NORMAL with high confidence." },
              { icon: Stethoscope, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", title: "Doctor Dashboard", desc: "Full clinical overview with patient management, scan history, and condition analytics." },
              { icon: Activity, color: "text-teal-400", bg: "bg-teal-400/10 border-teal-400/20", title: "Patient Monitoring", desc: "Track each patient's retinal health progression with longitudinal scan history." },
              { icon: FileText, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20", title: "PDF Medical Reports", desc: "Generate instant, professional medical reports with one click — ready to share or print." },
              { icon: BarChart3, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", title: "Healthcare Analytics", desc: "Visualize disease distribution, scan trends, and clinic performance over time." },
              { icon: Shield, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", title: "OOD Protection", desc: "Smart validation rejects non-medical images, protecting prediction integrity." },
              { icon: Users, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", title: "Role-Based Access", desc: "Separate doctor, compounder, and patient portals with dedicated workflows." },
              { icon: ScanLine, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", title: "Instant Results", desc: "AI inference completes in under 5 seconds, enabling high-throughput clinic workflows." },
            ].map((f) => (
              <div key={f.title} className={`rounded-2xl border p-6 ${f.bg} hover:scale-[1.02] transition-transform`}>
                <f.icon className={`h-7 w-7 ${f.color} mb-4`} />
                <h3 className="text-gray-200 font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Eye className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-400">OptiCare</span>
          </div>
          <p className="text-xs text-gray-700 text-center max-w-lg">
            ⚕ <strong className="text-gray-600">Disclaimer:</strong> OptiCare provides AI-assisted analysis for informational purposes only. It is not a substitute for professional medical diagnosis. Always consult a qualified ophthalmologist.
          </p>
          <p className="text-xs text-gray-700">© 2026 OptiCare</p>
        </div>
      </footer>
    </>
  );
}
