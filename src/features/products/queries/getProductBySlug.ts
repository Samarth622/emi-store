import { db } from "@/db"
import { products, variants, emiPlans } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getProductBySlug(slug: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      variants: {
        with: {
          emiPlans: true,
        },
      },
    },
  })

  return product
}