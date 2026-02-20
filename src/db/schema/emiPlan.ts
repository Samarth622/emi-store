import { pgTable, uuid, integer, numeric, text } from "drizzle-orm/pg-core"
import { variants } from "./variant"

export const emiPlans = pgTable("emi_plans", {
  id: uuid("id").defaultRandom().primaryKey(),

  variantId: uuid("variant_id")
    .references(() => variants.id)
    .notNull(),

  tenureMonths: integer("tenure_months").notNull(),
  monthlyAmount: numeric("monthly_amount").notNull(),
  interestRate: numeric("interest_rate").notNull(),
  cashback: text("cashback"),
})