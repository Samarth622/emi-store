import { NextResponse } from "next/server"
import { getProducts } from "@/features/products/queries/getProducts"

export async function GET() {
  const data = await getProducts()
  return NextResponse.json(data)
}