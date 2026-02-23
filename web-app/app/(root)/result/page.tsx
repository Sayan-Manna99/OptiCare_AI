"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    CheckCircle,
    AlertTriangle,
    Info,
    ScanLine,
    Download,
    ArrowLeft,
    Activity,
    Shield,
} from "lucide-react";
import { Suspense } from "react";

const recommendations: Record<string, string> = {
    "Diabetic Retinopathy":
        "Consult an ophthalmologist immediately. Regular blood sugar monitoring and annual retinal screenings are strongly advised. Laser treatment may be required depending on severity.",
    Glaucoma:
        "Schedule an urgent consultation with an eye specialist. Intraocular pressure management with eye drops or surgery may be necessary to prevent optic nerve damage.",
    Cataracts:
        "A routine eye examination is recommended. Depending on the severity, cataract surgery (phacoemulsification) is a safe and effective treatment option.",
    "Age-related Macular Degeneration":
        "Consult a retinal specialist. Anti-VEGF injections, vitamins, and dietary changes can slow progression in early stages.",
    Normal:
        "No abnormalities detected. Maintain annual eye check-ups and protect your eyes from UV exposure. A healthy diet rich in antioxidants supports eye health.",
};

const severityConfig: Record<
    string,
    { color: string; bg: string; icon: typeof CheckCircle }
> = {
    Mild: {
        color: "text-yellow-400",
        bg: "bg-yellow-400/10 border-yellow-400/20",
        icon: Info,
    },
    Moderate: {
        color: "text-orange-400",
        bg: "bg-orange-500/10 border-orange-500/20",
        icon: AlertTriangle,
    },
    Severe: {
        color: "text-red-400",
        bg: "bg-red-500/10 border-red-500/20",
        icon: AlertTriangle,
    },
    Normal: {
        color: "text-teal-400",
        bg: "bg-teal-400/10 border-teal-400/20",
        icon: CheckCircle,
    },
};

function ResultContent() {
    const params = useSearchParams();
    const condition = params.get("condition") ?? "Normal";
    const confidence = parseInt(params.get("confidence") ?? "92");
    const severity = params.get("severity") ?? "Normal";
    const fileName = params.get("fileName") ?? "retinal_scan.jpg";

    const sev = severityConfig[severity] ?? severityConfig["Normal"];
    const SevIcon = sev.icon;
    const recommendation =
        recommendations[condition] ?? recommendations["Normal"];
    const isNormal = condition === "Normal";

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Back */}
            <Link
                href="/scan"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Scan
            </Link>

            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-200">
                    Analysis Results
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    File: <span className="text-gray-400">{fileName}</span>
                </p>
            </div>

            {/* Condition Card */}
            <div
                className={`rounded-2xl border p-6 flex items-start gap-5 ${isNormal
                    ? "bg-teal-400/5 border-teal-400/20"
                    : "bg-red-500/5 border-red-500/20"
                    }`}
            >
                <div
                    className={`h-14 w-14 rounded-xl flex items-center justify-center shrink-0 ${isNormal
                        ? "bg-teal-400/10 border border-teal-400/20"
                        : "bg-red-500/10 border border-red-500/20"
                        }`}
                >
                    {isNormal ? (
                        <CheckCircle className="h-7 w-7 text-teal-400" />
                    ) : (
                        <Activity className="h-7 w-7 text-red-400" />
                    )}
                </div>
                <div className="flex-1">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                        Detected Condition
                    </p>
                    <h2 className="text-gray-100 text-2xl font-bold mt-1">{condition}</h2>
                    <p
                        className={`text-sm mt-1 font-medium ${isNormal ? "text-teal-400" : "text-red-400"
                            }`}
                    >
                        {isNormal
                            ? "No disease detected — your eyes appear healthy."
                            : "Condition detected — please consult a specialist."}
                    </p>
                </div>
            </div>

            {/* Confidence + Severity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Confidence Score */}
                <div className="rounded-xl bg-gray-800 border border-gray-700 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm font-medium">Confidence Score</p>
                        <span className="text-blue-400 font-bold text-lg">{confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-700"
                            style={{ width: `${confidence}%` }}
                        />
                    </div>
                    <p className="text-gray-600 text-xs">
                        {confidence >= 85
                            ? "High confidence prediction"
                            : confidence >= 70
                                ? "Moderate confidence — consider re-scan"
                                : "Low confidence — please re-upload a clearer image"}
                    </p>
                </div>

                {/* Severity */}
                <div
                    className={`rounded-xl border p-5 flex items-center gap-4 ${sev.bg}`}
                >
                    <div
                        className={`h-12 w-12 rounded-xl flex items-center justify-center ${sev.bg}`}
                    >
                        <SevIcon className={`h-6 w-6 ${sev.color}`} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Severity Level</p>
                        <p className={`text-xl font-bold mt-0.5 ${sev.color}`}>{severity}</p>
                    </div>
                </div>
            </div>

            {/* Recommendation */}
            <div className="rounded-xl bg-gray-800 border border-gray-700 p-5 space-y-3">
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <p className="text-gray-300 font-semibold text-sm">
                        Recommendation
                    </p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{recommendation}</p>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl bg-yellow-400/5 border border-yellow-400/20 px-5 py-4 flex items-start gap-3">
                <Info className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                <p className="text-yellow-400/80 text-xs leading-relaxed">
                    <strong>Disclaimer:</strong> This analysis is AI-generated and intended for informational purposes only. It is not a medical diagnosis. Please consult a qualified ophthalmologist or healthcare professional for medical advice.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/dashboard"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-700 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-gray-100 font-semibold transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                    Go to Home
                </Link>
                <Link
                    href="/scan"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-600/40 text-gray-300 hover:text-gray-100 font-semibold transition-all"
                >
                    <ScanLine className="h-4 w-4" />
                    Scan Again
                </Link>
                <button
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20"
                >
                    <Download className="h-4 w-4" />
                    Download Report
                </button>
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="h-8 w-8 border-2 border-blue-600/30 border-t-blue-400 rounded-full animate-spin" />
                </div>
            }
        >
            <ResultContent />
        </Suspense>
    );
}
