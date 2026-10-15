-- ==============================================================================
-- HANUMAN VEG RESTAURANT, SION, MUMBAI
-- Database Schema for Supabase PostgreSQL
-- ==============================================================================

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT DEFAULT 'Utensils',
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Menu Items Table
CREATE TABLE IF NOT EXISTS public.menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    description TEXT,
    dietary TEXT NOT NULL DEFAULT 'pure-veg',
    spice_level INT DEFAULT 0 CHECK (spice_level BETWEEN 0 AND 3),
    is_signature BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_jain_friendly BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    badge TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast menu lookups
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_jain ON public.menu_items(is_jain_friendly);

-- 3. Restaurant Tables
CREATE TABLE IF NOT EXISTS public.restaurant_tables (
    id TEXT PRIMARY KEY,
    table_number TEXT UNIQUE NOT NULL,
    label TEXT,
    capacity INT DEFAULT 4,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Restaurant Orders
CREATE TABLE IF NOT EXISTS public.restaurant_orders (
    id TEXT PRIMARY KEY,
    order_reference TEXT UNIQUE NOT NULL,
    table_number TEXT,
    customer_name TEXT DEFAULT 'Dine-in Guest',
    customer_phone TEXT,
    items JSONB NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
    order_type TEXT NOT NULL DEFAULT 'dinein' CHECK (order_type IN ('dinein', 'takeaway', 'delivery')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON public.restaurant_orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_table ON public.restaurant_orders(table_number);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.restaurant_orders(created_at DESC);

-- 5. Restaurant Settings
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
    id INT PRIMARY KEY DEFAULT 1,
    name TEXT NOT NULL,
    legal_name TEXT,
    tagline TEXT,
    address TEXT,
    phone TEXT,
    phone_display TEXT,
    whatsapp_number TEXT,
    landline TEXT,
    landline_display TEXT,
    hours TEXT,
    price_for_two TEXT,
    ordering_mode TEXT DEFAULT 'menu-and-ordering',
    announcement TEXT,
    enable_whatsapp_checkout BOOLEAN DEFAULT TRUE,
    enable_direct_order_submission BOOLEAN DEFAULT TRUE,
    production_base_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;

-- Public can read menu items, categories, settings, and tables
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Menu Items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Public Read Tables" ON public.restaurant_tables FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.restaurant_settings FOR SELECT USING (true);

-- Public can submit an order
CREATE POLICY "Public Submit Orders" ON public.restaurant_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Own Order Status" ON public.restaurant_orders FOR SELECT USING (true);

-- Service role / Authenticated admins have full CRUD access
CREATE POLICY "Admin Full Access Categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Menu Items" ON public.menu_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Tables" ON public.restaurant_tables FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Orders" ON public.restaurant_orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Settings" ON public.restaurant_settings FOR ALL USING (auth.role() = 'authenticated');
