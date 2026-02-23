"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, ScanLine, ImageIcon, AlertCircle } from "lucide-react";

export default function ScanPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = (file: File) => {
        setError(null);
        if (!file.type.startsWith("image/")) {
            setError("Please upload a valid image file (JPG, PNG, WEBP).");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError("Image size must be under 10MB.");
            return;
        }
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, []);

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const onDragLeave = () => setDragging(false);

    const clearImage = () => {
        setSelectedFile(null);
        setPreview(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;
        setLoading(true);

        // Simulate analysis delay (replace with real API call when ML service is ready)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock result — pass via query params to result page
        const mockResults = {
            condition: "Diabetic Retinopathy",
            confidence: "87",
            severity: "Moderate",
            fileName: selectedFile.name,
        };

        const params = new URLSearchParams(mockResults);
        router.push(`/result?${params.toString()}`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-200">Scan Your Eye</h1>
                <p className="text-gray-500 mt-2 text-sm">
                    Upload a clear retinal fundus image. Our AI will analyze it and return a detailed prediction report.
                </p>
            </div>

            {/* Upload Zone */}
            {!preview ? (
                <div
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 p-12 flex flex-col items-center justify-center gap-4 text-center
            ${dragging
                            ? "border-blue-500 bg-blue-600/10"
                            : "border-gray-600 bg-gray-800 hover:border-blue-500/60 hover:bg-gray-800/80"
                        }`}
                >
                    <div className="h-16 w-16 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                        <Upload className="h-7 w-7 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-gray-200 font-semibold text-lg">
                            {dragging ? "Drop your image here" : "Drag & drop or click to upload"}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">Supports JPG, PNG, WEBP · Max 10MB</p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFile(file);
                        }}
                    />
                </div>
            ) : (
                /* Image Preview */
                <div className="rounded-2xl bg-gray-800 border border-gray-700 overflow-hidden">
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Selected retinal scan"
                            className="w-full max-h-80 object-contain bg-gray-900"
                        />
                        <button
                            onClick={clearImage}
                            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-gray-900/70 border border-gray-600 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 transition-colors"
                        >
                            <X className="h-4 w-4 text-gray-300" />
                        </button>
                    </div>
                    <div className="px-5 py-4 flex items-center gap-3 border-t border-gray-700">
                        <ImageIcon className="h-4 w-4 text-gray-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-gray-300 text-sm font-medium truncate">{selectedFile?.name}</p>
                            <p className="text-gray-600 text-xs">
                                {selectedFile ? (selectedFile.size / 1024).toFixed(1) : 0} KB
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {/* Tips */}
            <div className="rounded-xl bg-gray-800 border border-gray-700 p-5 space-y-3">
                <p className="text-gray-300 text-sm font-semibold">Tips for best results:</p>
                <ul className="space-y-2">
                    {[
                        "Use a clear, in-focus retinal fundus photograph",
                        "Ensure proper lighting — avoid overexposed or dark images",
                        "Image should be at least 224×224 pixels",
                        "Accepted formats: JPG, PNG, WEBP",
                    ].map((tip) => (
                        <li key={tip} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                            <span className="text-gray-500 text-sm">{tip}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Analyze Button */}
            <button
                onClick={handleAnalyze}
                disabled={!selectedFile || loading}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-base transition-all shadow-lg shadow-blue-600/20"
            >
                {loading ? (
                    <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing Image…
                    </>
                ) : (
                    <>
                        <ScanLine className="h-5 w-5" />
                        Analyze Image
                    </>
                )}
            </button>
        </div>
    );
}
