import { relations } from "drizzle-orm"
import { products } from "./product"
import { variants } from "./variant"
import { emiPlans } from "./emiPlan"

/* Product → Variants */
export const productRelations = relations(products, ({ many }) => ({
  variants: many(variants),
}))

/* Variant → Product + EmiPlans */
export const variantRelations = relations(variants, ({ one, many }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
  emiPlans: many(emiPlans),
}))

/* EmiPlan → Variant */
export const emiRelations = relations(emiPlans, ({ one }) => ({
  variant: one(variants, {
    fields: [emiPlans.variantId],
    references: [variants.id],
  }),
}))