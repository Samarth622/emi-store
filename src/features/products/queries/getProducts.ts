import { db } from "@/db"
import { products } from "@/db/schema"

export async function getProducts() {
  return db.query.products.findMany({
    with: {
      variants: {
        limit: 1,
      },
    },
  })
}