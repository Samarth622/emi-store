# 📱 EMI Store — Full Stack Assignment

A full-stack web application that displays smartphones with multiple EMI plans backed by mutual-fund style financing. Users can explore products, select variants, compare EMI options, and proceed with a selected plan.

This project was built as part of the **1Fi Full Stack Developer Assignment**.

---

## ✨ Features

### 🛍 Product Experience
* **Dynamic product pages:** Multiple products with unique URLs.
* **Variant selection:** Choose between different storage capacities and colors.
* **Variant-specific images:** Visuals update based on selected variants.
* **Price & MRP display:** Transparent pricing with automatic discount calculation.

### 💳 EMI Experience
* **Multiple EMI plans:** Various tenure options available per variant.
* **Detailed breakdowns:** Monthly payment calculation, interest rate display, and cashback information.
* **Interactive selection:** Selectable EMI plans with a "Proceed" button that enables only after a selection is made.

### ⚙ Backend
* **Database-driven:** Fully dynamic data (no hardcoded arrays).
* **REST APIs:** Custom endpoints for fetching products and variants.
* **Relational schema:** Structured data flow (Product → Variant → EMI Plan).

---

## 🧠 Architecture



The application follows a modern full-stack architecture using Next.js App Router:

**Frontend (Next.js)** ⇄ **API Routes (Next.js)** ⇄ **Drizzle ORM** ⇄ **Neon PostgreSQL**

### Data Model
* **Product** (Parent entity)
    * ↳ **Variants** (Child of Product)
        * ↳ **EMI Plans** (Child of Variant)

---

## 🛠 Tech Stack

### Frontend
* **Framework:** Next.js (App Router)
* **Library:** React
* **Styling:** Tailwind CSS

### Backend & Database
* **API:** Next.js Route Handlers (Node.js)
* **Database:** Neon PostgreSQL
* **ORM:** Drizzle ORM

---

## 📦 Database Schema



### `Product`
* `id` (Primary Key)
* `name`
* `slug`
* `description`

### `Variant`
* `id` (Primary Key)
* `productId` (Foreign Key)
* `storage`
* `color`
* `price`
* `mrp`
* `image`

### `EMI Plan`
* `id` (Primary Key)
* `variantId` (Foreign Key)
* `tenureMonths`
* `monthlyAmount`
* `interestRate`
* `cashback`

---

## 🔌 API Endpoints

### Get Products List
Retrieves all available products.
```http
GET /api/products
```

### Get Product Details
Retrieves a specific product by its slug, including all associated variants and EMI plans.
```http
GET /api/products/[slug]
```
Returns:
* product object
* Array of variants
* Array of EMI plans mapped to variants

--- 

# ⚡ Setup Instructions

### 1. Clone the repository
```bash
git clone <repo-url>
cd emi-store
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add the following variables:
```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
NODE_ENV=development
```

### 4. Run migrations
Push the schema to your Neon PostgreSQL database:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 5. Seed the database
Populate the database with initial dummy data:

```bash
npm run seed
```

### 6. Run the development server
```bash
npm run dev
```

### 7. Access the application
Open your browser and navigate to `http://localhost:3000` to see the application in action.

---

# 📝 Author

Samarth Gupta
