import { getProductBySlug } from "@/features/products/queries/getProductBySlug"
import { notFound } from "next/navigation"
import ProductEmiSelector from "@/features/products/components/ProductEmiSelector"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return notFound()

  if (!product.variants.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        No variants available
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-8">{product.name}</h1>

      <ProductEmiSelector variants={product.variants} />
    </div>
  )
}