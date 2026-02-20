import Link from "next/link"
import { getProducts } from "@/features/products/queries/getProducts"

export default async function ProductsPage() {
  const products = await getProducts()

  if (!products.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        No products available
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const image = product.variants?.[0]?.image

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white border rounded-2xl p-6 hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-56">
                {image ? (
                  <img
                    src={image}
                    alt={product.name}
                    className="max-h-44 object-contain group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">
                    No image
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="mt-4 space-y-1">
                <div className="font-semibold text-lg">
                  {product.name}
                </div>

                <div className="text-sm text-gray-500 group-hover:text-black transition">
                  View EMI plans →
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}