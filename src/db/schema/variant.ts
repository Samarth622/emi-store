import { pgTable, uuid, text, integer, numeric } from "drizzle-orm/pg-core"
import { products } from "./product"

export const variants = pgTable("variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),

  storage: text("storage"),
  color: text("color"),

  price: numeric("price").notNull(),
  mrp: numeric("mrp").notNull(),

  image: text("image"),
})