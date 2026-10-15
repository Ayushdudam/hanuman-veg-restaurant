# Database & Cloud Architecture Guide
## Hanuman Veg Restaurant — Sion Circle, Mumbai

This production application features a **Dual-Mode Persistence Architecture** designed for zero-downtime reliability:

### Mode 1: Zero-Config Out-of-the-Box Local & Serverless Persistence (Active by Default)
* The storage engine (`src/lib/storage.ts`) automatically manages and updates a persistent JSON datastore in `data/hanuman-db.json` (or `/tmp/hanuman-db.json` in serverless cloud environments).
* Pre-seeded with:
  * 45+ authentic dishes across South Indian, Pav Bhaji, North Indian, Indo-Chinese, Jain Specials, and Beverages.
  * 12 default dining tables (`T01` to `T12`).
  * Live orders tracking and operational settings.
* Full CRUD operations:
  * Dish creation, pricing updates, description updates.
  * 1-click availability toggles (In-stock / Sold-out).
  * Table QR code generation with unique target URLs.
  * Live kitchen ticket status updates (`pending` ➔ `preparing` ➔ `ready` ➔ `completed` ➔ `cancelled`).

---

### Mode 2: Supabase PostgreSQL Cloud Integration (Optional Production Upgrade)
If you wish to connect a remote Supabase PostgreSQL database:

1. **Create a Supabase Project**:
   * Navigate to [supabase.com](https://supabase.com) and create a project in the Mumbai (`ap-south-1`) region.

2. **Run the Database Migration**:
   * Open the Supabase **SQL Editor**.
   * Copy and run the entire script found in:
     `supabase/migrations/01_hanuman_schema.sql`
   * This creates the `categories`, `menu_items`, `restaurant_tables`, `restaurant_orders`, and `restaurant_settings` tables with indexes, check constraints, and Row Level Security (RLS) policies.

3. **Configure Environment Variables in Vercel**:
   In your Vercel Project Settings ➔ **Environment Variables**, add:
   ```env
   NEXT_PUBLIC_SITE_URL="https://hanuman-veg-restaurant.vercel.app"
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="[Your-Secure-Owner-Password]"
   ADMIN_SECRET="[A-Random-32-Char-Secret-String]"
   NEXT_PUBLIC_SUPABASE_URL="https://[your-project-id].supabase.co"
   SUPABASE_SERVICE_ROLE_KEY="[your-service-role-secret-key]"
   ```

---

## Owner Admin Credentials & Route Reference

* **Public Website**: `/`
* **Dedicated QR Digital Menu**: `/menu` (or `/menu?table=T01`)
* **Admin Login**: `/admin/login`
* **Admin Overview**: `/admin`
* **Dishes Management**: `/admin/menu`
* **Table QR Codes & Printable Cards**: `/admin/tables`
* **Live Kitchen Orders Feed**: `/admin/orders`
* **Operational Settings**: `/admin/settings`

### Default Owner Credentials
* **Username**: `admin`
* **Password**: `hanuman@sion`
*(Credentials can be updated in `/admin/settings` or via the `ADMIN_PASSWORD` environment variable).*
