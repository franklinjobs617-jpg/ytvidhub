"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { trackConversion } from "@/lib/analytics";

interface CustomCreditSliderProps {
    onRequestLogin?: () => void;
}

export default function CustomCreditSlider({
    onRequestLogin,
}: CustomCreditSliderProps) {
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(100);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Calculate price
    const price = (quantity * 0.05).toFixed(2);

    // Calculate estimations
    const downloadCount = quantity; // 1 credit per download
    const aiCount = Math.floor(quantity / 2); // 2 credits per AI analysis

    const PRESETS = [100, 500, 1000, 2000];
    const MIN = 20;
    const MAX = 2000;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handlePurchase = async () => {
        if (!user?.googleUserId) {
            if (onRequestLogin) {
                onRequestLogin();
            } else {
                alert("Please login first to purchase credits.");
            }
            return;
        }

        setLoading(true);
    trackConversion('credit_purchase_click', { quantity, price: Number(price) });
        const BASE_URL = "https://api.ytvidhub.com";

        try {
            const response = await fetch(`${BASE_URL}/prod-api/stripe/getPayUrl`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    googleUserId: user.googleUserId,
                    project: "ytvidhub",
                    type: "yt_credits_custom",
                    quantity: quantity,
                }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            if (data && data.data) {
                window.location.href = data.data;
            } else {
                throw new Error("Checkout URL not found.");
            }
        } catch (error: any) {
            console.error("Payment failed:", error);
            alert(`Payment failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Calculate percentage for gradient background
    const percentage = ((quantity - MIN) / (MAX - MIN)) * 100;

    return (
        <div className="w-full max-w-6xl mx-auto my-12 px-4">
            {/* 
        Container: "Stripe-like" Horizontal Bar 
      */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-1">
                <div className="bg-slate-50/50 rounded-[22px] p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                    {/* 1. Left: Dynamic Capability Estimates */}
                    <div className="lg:w-1/4 w-full flex flex-col gap-4">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Usage Estimate
                            </h3>
                            <p className="text-xs text-slate-500 font-medium">
                                What you can do with {quantity} credits:
                            </p>
                        </div>

                        <div className="space-y-3">
                            {/* 1 Video = 1 Credit */}
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Downloads</p>
                                        <p className="text-[10px] text-slate-400 font-medium">1 credit / video</p>
                                    </div>
                                </div>
                                <span className="text-xl font-black text-slate-900 tracking-tight">{downloadCount.toLocaleString()}</span>
                            </div>

                            {/* 1 AI = 2 Credits */}
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Analyses</p>
                                        <p className="text-[10px] text-slate-400 font-medium">2 credits / video</p>
                                    </div>
                                </div>
                                <span className="text-xl font-black text-slate-900 tracking-tight">{aiCount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Middle: The Controller (Dynamic) */}
                    <div className="flex-1 w-full lg:border-l lg:border-r border-slate-200 lg:px-12 py-2">

                        {/* Display Header */}
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Total Credits</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{quantity}</span>
                                    <span className="text-sm font-bold text-slate-500">credits</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Your Price</span>
                                <div className="text-4xl font-black text-blue-600 tracking-tighter leading-none">${price}</div>
                            </div>
                        </div>

                        {/* Slider Component */}
                        <div className="relative w-full h-8 flex items-center group mb-2">
                            {/* Hidden Input */}
                            <input
                                type="range"
                                min={MIN}
                                max={MAX}
                                value={quantity}
                                onChange={handleSliderChange}
                                onMouseDown={() => setIsDragging(true)}
                                onMouseUp={() => setIsDragging(false)}
                                onTouchStart={() => setIsDragging(true)}
                                onTouchEnd={() => setIsDragging(false)}
                                className="w-full absolute inset-0 z-30 opacity-0 cursor-pointer"
                            />

                            {/* Track */}
                            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden relative">
                                <div
                                    className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100 ease-out"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                            {/* Thumb */}
                            <div
                                className="absolute h-7 w-7 bg-white border-[3px] border-blue-600 rounded-full shadow-md z-20 pointer-events-none transition-all duration-100 ease-out flex items-center justify-center transform hover:scale-110"
                                style={{ left: `calc(${percentage}% - 14px)` }}
                            >
                                <div className={`w-2 h-2 rounded-full bg-blue-600 transition-opacity duration-200 ${isDragging ? 'opacity-100' : 'opacity-0'}`} />
                            </div>
                        </div>

                        {/* Quick Select Marks */}
                        <div className="flex justify-between mt-6 px-1">
                            {PRESETS.map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setQuantity(val)}
                                    className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all border ${quantity === val
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                                        }`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3. Right: Action (Button) */}
                    <div className="lg:w-1/5 w-full flex flex-col items-center justify-center">
                        <button
                            onClick={handlePurchase}
                            disabled={loading}
                            className={`
                w-full py-5 rounded-2xl text-sm font-bold uppercase tracking-wide
                bg-slate-900 text-white shadow-xl shadow-slate-900/20
                hover:bg-blue-600 hover:shadow-blue-600/30 hover:-translate-y-1
                active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed
                transition-all duration-300 ease-out
                flex flex-col items-center justify-center gap-1 group
              `}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing
                                </span>
                            ) : (
                                <>
                                    <span className="group-hover:scale-105 transition-transform">Instant Buy</span>
                                    <span className="text-[10px] font-medium opacity-60 normal-case">Life-time valid</span>
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
