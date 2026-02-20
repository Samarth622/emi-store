import { NextResponse } from "next/server"
import { getProductBySlug } from "@/features/products/queries/getProductBySlug"

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  const data = await getProductBySlug(slug)

  if (!data) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}