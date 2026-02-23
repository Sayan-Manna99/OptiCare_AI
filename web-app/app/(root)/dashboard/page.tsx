import Link from "next/link";
import { Eye, ScanLine, Activity, Clock, ArrowRight, CheckCircle } from "lucide-react";

const stats = [
    {
        label: "Total Scans",
        value: "0",
        icon: ScanLine,
        color: "text-blue-400",
        bg: "bg-blue-600/10 border-blue-600/20",
    },
    {
        label: "Conditions Detected",
        value: "0",
        icon: Activity,
        color: "text-red-400",
        bg: "bg-red-500/10 border-red-500/20",
    },
    {
        label: "Clear Scans",
        value: "0",
        icon: CheckCircle,
        color: "text-teal-400",
        bg: "bg-teal-400/10 border-teal-400/20",
    },
    {
        label: "Last Scan",
        value: "—",
        icon: Clock,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10 border-yellow-400/20",
    },
];

const conditions = [
    { name: "Diabetic Retinopathy", desc: "Damage to retinal blood vessels caused by diabetes." },
    { name: "Glaucoma", desc: "Increased eye pressure damaging the optic nerve." },
    { name: "Cataracts", desc: "Clouding of the eye's natural lens." },
    { name: "Age-related Macular Degeneration", desc: "Deterioration of the central area of the retina." },
    { name: "Normal", desc: "No abnormalities detected in the retinal scan." },
];

export default function DashboardPage() {
    return (
        <div className="space-y-10">
            {/* Hero Banner */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600/20 via-gray-800 to-gray-900 border border-blue-600/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center shrink-0">
                        <Eye className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-200">
                            AI Eye Disease Detection
                        </h1>
                        <p className="text-gray-400 mt-1 max-w-lg text-sm md:text-base">
                            Upload a retinal image and our deep learning model will analyze it for signs of eye disease — instantly and accurately.
                        </p>
                    </div>
                </div>
                <Link
                    href="/scan"
                    className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40"
                >
                    Start New Scan
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            {/* Stats Grid */}
            <div>
                <h2 className="text-lg font-semibold text-gray-300 mb-4">Your Overview</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`rounded-xl border p-5 ${stat.bg} flex flex-col gap-3`}
                        >
                            <div className={`${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-200">{stat.value}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div>
                <h2 className="text-lg font-semibold text-gray-300 mb-4">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { step: "01", title: "Upload Retinal Image", desc: "Take a clear photo of the retina or upload an existing scan image (JPG/PNG).", color: "text-blue-400", border: "border-blue-600/20" },
                        { step: "02", title: "AI Analyzes the Scan", desc: "Our deep learning model processes the image and identifies disease markers.", color: "text-purple-400", border: "border-purple-500/20" },
                        { step: "03", title: "View Results & Report", desc: "Get a detailed report with the condition detected, confidence score, and recommendations.", color: "text-teal-400", border: "border-teal-400/20" },
                    ].map((item) => (
                        <div key={item.step} className={`rounded-xl bg-gray-800 border ${item.border} p-6 space-y-3`}>
                            <span className={`text-4xl font-black ${item.color} opacity-30`}>{item.step}</span>
                            <h3 className="text-gray-200 font-semibold">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detectable Conditions */}
            <div>
                <h2 className="text-lg font-semibold text-gray-300 mb-4">Detectable Conditions</h2>
                <div className="rounded-xl bg-gray-800 border border-gray-700 divide-y divide-gray-700">
                    {conditions.map((c) => (
                        <div key={c.name} className="flex items-start gap-4 px-6 py-4">
                            <div className="h-2 w-2 rounded-full bg-blue-400 mt-2 shrink-0" />
                            <div>
                                <p className="text-gray-200 font-medium text-sm">{c.name}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{c.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center py-6">
                <Link
                    href="/scan"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg transition-all shadow-xl shadow-blue-600/20"
                >
                    <ScanLine className="h-5 w-5" />
                    Scan Your Eyes Now
                </Link>
                <p className="text-gray-600 text-sm mt-3">Free · Instant · AI-Powered</p>
            </div>
        </div>
    );
}
