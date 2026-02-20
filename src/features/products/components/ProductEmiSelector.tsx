"use client"

import { useState } from "react"

type Emi = {
    id: string
    tenureMonths: number
    monthlyAmount: string
    interestRate: string
    cashback: string | null
}

type Variant = {
    mrp: string | null
    id: string
    storage: string | null
    color: string | null
    price: string
    image: string | null
    emiPlans: Emi[]
}

export default function ProductEmiSelector({
    variants,
}: {
    variants: Variant[]
}) {
    const [selectedVariant, setSelectedVariant] = useState<Variant>(
        variants[0]
    )
    const [selectedEmi, setSelectedEmi] = useState<Emi | null>(null)

    return (
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
            {/* LEFT — IMAGE */}
            <div className="bg-gray-50 rounded-3xl border p-10 flex items-center justify-center">
                <img
                    key={selectedVariant.id}
                    src={selectedVariant.image ?? ""}
                    className="max-h-[420px] object-contain transition"
                    alt=""
                />
            </div>

            {/* RIGHT — PURCHASE PANEL */}
            <div className="bg-white border rounded-2xl p-6 space-y-6">
                {/* Variant Pills */}
                <div className="flex gap-2 flex-wrap">
                    {variants.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => {
                                setSelectedVariant(v)
                                setSelectedEmi(null)
                            }}
                            className={`px-4 py-2 rounded-full text-sm border transition
                ${selectedVariant.id === v.id
                                    ? "bg-black text-white border-black"
                                    : "hover:border-gray-400"
                                }`}
                        >
                            {v.storage} • {v.color}
                        </button>
                    ))}
                </div>

                {/* Price */}
                <div className="space-y-1">
                    <div className="text-3xl font-semibold">
                        ₹{selectedVariant.price}
                    </div>

                    {selectedVariant.mrp && (
                        <div className="text-sm text-gray-500">
                            <span className="line-through">₹{selectedVariant.mrp}</span>
                            {" "}
                            <span className="text-green-600 ml-2">
                                {Math.round(
                                    ((Number(selectedVariant.mrp) - Number(selectedVariant.price)) /
                                        Number(selectedVariant.mrp)) *
                                    100
                                )}
                                % off
                            </span>
                        </div>
                    )}
                </div>

                {/* EMI Cards */}
                <div className="space-y-3">
                    {selectedVariant.emiPlans.map((emi) => (
                        <button
                            key={emi.id}
                            onClick={() => setSelectedEmi(emi)}
                            className={`w-full text-left rounded-xl border p-4 transition
                ${selectedEmi?.id === emi.id
                                    ? "border-black shadow"
                                    : "hover:border-gray-300"
                                }`}
                        >
                            <div className="font-medium text-lg">
                                ₹{emi.monthlyAmount}/month
                            </div>

                            <div className="text-sm text-gray-500">
                                {emi.tenureMonths} months • {emi.interestRate}% interest
                            </div>

                            {emi.cashback && (
                                <div className="text-green-600 text-sm mt-1">
                                    {emi.cashback}
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* CTA */}
                <button
                    disabled={!selectedEmi}
                    className={`w-full py-3 rounded-xl font-medium transition
            ${selectedEmi
                            ? "bg-black text-white hover:opacity-90"
                            : "bg-gray-200 text-gray-500"
                        }`}
                >
                    Proceed with selected plan
                </button>
            </div>
        </div>
    )
}