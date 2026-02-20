"use client"

import { useMemo, useState } from "react"

type Emi = {
  id: string
  tenureMonths: number
  monthlyAmount: string
  interestRate: string
  cashback: string | null
}

type Variant = {
  id: string
  storage: string | null
  color: string | null
  price: string
  mrp: string | null
  image: string | null
  emiPlans: Emi[]
}

export default function ProductEmiSelector({
  variants,
}: {
  variants: Variant[]
}) {
  // ⭐ default
  const first = variants[0]

  const [selectedStorage, setSelectedStorage] = useState(first.storage)
  const [selectedColor, setSelectedColor] = useState(first.color)
  const [selectedEmi, setSelectedEmi] = useState<Emi | null>(null)

  // ⭐ selected variant
  const selectedVariant =
    variants.find(
      (v) =>
        v.storage === selectedStorage &&
        v.color === selectedColor
    ) ?? variants[0]

  // ⭐ storage options
  const storageOptions = useMemo(
    () => [...new Set(variants.map((v) => v.storage))],
    [variants]
  )

  // ⭐ color options per storage
  const colorOptions = useMemo(() => {
    return [
      ...new Set(
        variants
          .filter((v) => v.storage === selectedStorage)
          .map((v) => v.color)
      ),
    ]
  }, [variants, selectedStorage])

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
      {/* IMAGE */}
      <div className="bg-gray-50 rounded-3xl border p-10 flex items-center justify-center">
        <img
          key={selectedVariant.id}
          src={selectedVariant.image ?? ""}
          className="max-h-[420px] object-contain"
          alt=""
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-white border rounded-2xl p-6 space-y-6">
        {/* STORAGE */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Storage</div>

          <div className="flex gap-2 flex-wrap">
            {storageOptions.map((s) => (
              <button
                key={s ?? ""}
                onClick={() => {
                  setSelectedStorage(s)
                  setSelectedEmi(null)

                  const colors = variants
                    .filter((v) => v.storage === s)
                    .map((v) => v.color)

                  setSelectedColor(colors[0] ?? null)
                }}
                className={`px-4 py-2 rounded-full border text-sm transition
                ${
                  selectedStorage === s
                    ? "bg-black text-white border-black"
                    : "hover:border-gray-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* COLOR */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Color</div>

          <div className="flex gap-2 flex-wrap">
            {colorOptions.map((c) => (
              <button
                key={c ?? ""}
                onClick={() => {
                  setSelectedColor(c)
                  setSelectedEmi(null)
                }}
                className={`px-4 py-2 rounded-full border text-sm transition
                ${
                  selectedColor === c
                    ? "bg-black text-white border-black"
                    : "hover:border-gray-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="space-y-1">
          <div className="text-3xl font-semibold">
            ₹{selectedVariant.price}
          </div>

          {selectedVariant.mrp && (
            <div className="text-sm text-gray-500">
              <span className="line-through">
                ₹{selectedVariant.mrp}
              </span>

              <span className="text-green-600 ml-2">
                {Math.round(
                  ((Number(selectedVariant.mrp) -
                    Number(selectedVariant.price)) /
                    Number(selectedVariant.mrp)) *
                    100
                )}
                % off
              </span>
            </div>
          )}
        </div>

        {/* EMI */}
        <div className="space-y-3">
          {selectedVariant.emiPlans.map((emi) => (
            <button
              key={emi.id}
              onClick={() => setSelectedEmi(emi)}
              className={`w-full text-left rounded-xl border p-4 transition
              ${
                selectedEmi?.id === emi.id
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
          ${
            selectedEmi
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          Proceed with selected plan
        </button>
      </div>
    </div>
  )
}