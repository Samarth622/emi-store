import "dotenv/config"
import { db } from "../index"
import { products, variants, emiPlans } from "../schema"

const productsSeed = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    basePrice: 130000,
    images: {
      Silver:
        "https://m.media-amazon.com/images/I/61EoCnDyoQL._SL1500_.jpg",
      Black:
        "https://m.media-amazon.com/images/I/618vU2qKXQL._SL1500_.jpg",
    },
  },
  {
    name: "Samsung S24 Ultra",
    slug: "samsung-s24-ultra",
    basePrice: 120000,
    images: {
      Silver:
        "https://m.media-amazon.com/images/I/71T10gT0BSL._SL1500_.jpg",
      Black:
        "https://m.media-amazon.com/images/I/71iZ+fdoI9L._SL1500_.jpg",
    },
  },
  {
    name: "Pixel 9 Pro",
    slug: "pixel-9-pro",
    basePrice: 100000,
    images: {
      Silver:
        "https://m.media-amazon.com/images/I/51hMSDdGAtL._SL1200_.jpg",
      Black:
        "https://m.media-amazon.com/images/I/51qG7EM6MZL._SL1000_.jpg",
    },
  },
  {
    name: "OnePlus 13R",
    slug: "oneplus-13-r",
    basePrice: 90000,
    images: {
      Silver:
        "https://m.media-amazon.com/images/I/61++T836jiL._SL1500_.jpg",
      Black:
        "https://m.media-amazon.com/images/I/61muVCIy-uL._SL1500_.jpg",
    },
  },
]

const variantConfig = [
  { storage: "256GB", color: "Silver", priceDiff: 0 },
  { storage: "256GB", color: "Black", priceDiff: 0 },

  { storage: "512GB", color: "Silver", priceDiff: 20000 },
  { storage: "512GB", color: "Black", priceDiff: 20000 },
]

const emiTenures = [6, 12, 18, 24]

function calcMonthly(price: number, months: number, interest: number) {
  const total = price + price * (interest / 100)
  return Math.round(total / months)
}

async function seed() {
  console.log("🌱 Seeding realistic data...")

  for (const p of productsSeed) {
    const [product] = await db
      .insert(products)
      .values({
        name: p.name,
        slug: p.slug,
        description: `${p.name} flagship phone`,
      })
      .returning()

    for (const v of variantConfig) {
      const variantPrice = p.basePrice + v.priceDiff
      const mrp = variantPrice + 10000

      const [variant] = await db
        .insert(variants)
        .values({
          productId: product.id,
          storage: v.storage,
          color: v.color,
          price: variantPrice.toString(),
          mrp: mrp.toString(),
          image: p.images[v.color as "Silver" | "Black"],
        })
        .returning()

      const emiData = emiTenures.map((months) => {
        const interest = months <= 12 ? 0 : 10.5

        return {
          variantId: variant.id,
          tenureMonths: months,
          interestRate: interest.toString(),
          monthlyAmount: calcMonthly(
            variantPrice,
            months,
            interest
          ).toString(),
          cashback: months === 12 ? "₹2000 cashback" : null,
        }
      })

      await db.insert(emiPlans).values(emiData)
    }
  }

  console.log("✅ Seed finished")
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})