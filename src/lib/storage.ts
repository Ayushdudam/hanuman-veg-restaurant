import fs from 'fs';
import path from 'path';
import { 
  MenuItem, 
  MenuCategory, 
  RestaurantTable, 
  RestaurantOrder, 
  RestaurantSettings, 
  OrderStatus 
} from '@/types/restaurant';
import { MENU_ITEMS, MENU_CATEGORIES, RESTAURANT_DATA } from '@/data/restaurantData';

interface DatabaseSchema {
  menuItems: MenuItem[];
  categories: MenuCategory[];
  tables: RestaurantTable[];
  orders: RestaurantOrder[];
  settings: RestaurantSettings;
}

// Default initial settings
const DEFAULT_SETTINGS: RestaurantSettings = {
  name: RESTAURANT_DATA.name,
  legalName: RESTAURANT_DATA.legalName,
  tagline: RESTAURANT_DATA.tagline,
  address: RESTAURANT_DATA.address,
  phone: RESTAURANT_DATA.phone,
  phoneDisplay: RESTAURANT_DATA.phoneDisplay,
  whatsappNumber: "919820647374",
  landline: RESTAURANT_DATA.landline,
  landlineDisplay: RESTAURANT_DATA.landlineDisplay,
  hours: RESTAURANT_DATA.hours,
  priceForTwo: RESTAURANT_DATA.priceForTwo,
  orderingMode: "menu-and-ordering",
  announcement: "Serving authentic Mumbai Tiffin & Pure Jain delicacies at Sion Circle since decades.",
  enableWhatsAppCheckout: true,
  enableDirectOrderSubmission: true,
  productionBaseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://hanuman-veg-restaurant.vercel.app",
};

// Default initial tables
const DEFAULT_TABLES: RestaurantTable[] = [
  { id: "tbl-01", tableNumber: "T01", label: "Ground Floor - Window 1", capacity: 4, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-02", tableNumber: "T02", label: "Ground Floor - Window 2", capacity: 4, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-03", tableNumber: "T03", label: "Ground Floor - Center", capacity: 2, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-04", tableNumber: "T04", label: "Ground Floor - Family", capacity: 6, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-05", tableNumber: "T05", label: "First Floor AC - Corner", capacity: 4, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-06", tableNumber: "T06", label: "First Floor AC - Center", capacity: 4, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-07", tableNumber: "T07", label: "First Floor AC - Family Booth", capacity: 8, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-08", tableNumber: "T08", label: "First Floor AC - Couple 1", capacity: 2, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-09", tableNumber: "T09", label: "First Floor AC - Couple 2", capacity: 2, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-10", tableNumber: "T10", label: "Sion Circle View 1", capacity: 4, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-11", tableNumber: "T11", label: "Sion Circle View 2", capacity: 4, createdAt: new Date().toISOString(), isActive: true },
  { id: "tbl-12", tableNumber: "T12", label: "Takeaway Express Counter", capacity: 0, createdAt: new Date().toISOString(), isActive: true },
];

// Seed items mapping images and availability
const INITIAL_MENU_ITEMS: MenuItem[] = MENU_ITEMS.map((item, idx) => ({
  ...item,
  isAvailable: true,
  sortOrder: idx + 1,
  imageUrl: item.imageTag || undefined,
}));

// In-memory cache
let inMemoryDb: DatabaseSchema | null = null;

// Determine DB file path (supports local repo and /tmp for serverless)
function getDbFilePath(): string {
  const localDir = path.join(process.cwd(), 'data');
  const localFile = path.join(localDir, 'hanuman-db.json');

  if (process.env.NODE_ENV === 'production' && !fs.existsSync(localDir)) {
    return path.join('/tmp', 'hanuman-db.json');
  }
  return localFile;
}

function loadDatabase(): DatabaseSchema {
  if (inMemoryDb) {
    return inMemoryDb;
  }

  const filePath = getDbFilePath();

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      inMemoryDb = JSON.parse(raw);
      if (inMemoryDb && inMemoryDb.menuItems && inMemoryDb.menuItems.length > 0) {
        return inMemoryDb;
      }
    }
  } catch (err) {
    console.warn("Failed to load db from file, reinitializing...", err);
  }

  // Initialize fresh database
  inMemoryDb = {
    menuItems: INITIAL_MENU_ITEMS,
    categories: MENU_CATEGORIES,
    tables: DEFAULT_TABLES,
    orders: [
      {
        id: "ord-seed-1",
        orderReference: "HVR-9104",
        tableNumber: "T01",
        customerName: "Rohan Parekh",
        customerPhone: "+91 98201 23456",
        items: [
          { dishId: "si-1", name: "Butter Mysore Masala Dosa", price: 180, quantity: 2, notes: "Extra crispy" },
          { dishId: "si-8", name: "South Indian Filter Kaapi", price: 60, quantity: 2 },
        ],
        totalAmount: 480,
        status: "completed",
        orderType: "dinein",
        notes: "Family breakfast",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: "ord-seed-2",
        orderReference: "HVR-9105",
        tableNumber: "T05",
        customerName: "Aarti Shah",
        customerPhone: "+91 98199 87654",
        items: [
          { dishId: "pb-1", name: "Special Hanuman Butter Pav Bhaji", price: 180, quantity: 2 },
          { dishId: "bv-1", name: "Royal Kulfi Falooda", price: 170, quantity: 1 },
        ],
        totalAmount: 530,
        status: "preparing",
        orderType: "dinein",
        notes: "Jain butter on side",
        createdAt: new Date(Date.now() - 900000).toISOString(),
      }
    ],
    settings: DEFAULT_SETTINGS,
  };

  saveDatabase(inMemoryDb);
  return inMemoryDb;
}

function saveDatabase(data: DatabaseSchema): void {
  inMemoryDb = data;
  try {
    const filePath = getDbFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn("Could not persist database to disk:", err);
  }
}

// Public & Admin Storage Functions

export async function getMenuItems(filters?: {
  category?: string;
  jainOnly?: boolean;
  search?: string;
  includeUnavailable?: boolean;
}): Promise<MenuItem[]> {
  const db = loadDatabase();
  let items = [...db.menuItems];

  if (!filters?.includeUnavailable) {
    items = items.filter(i => i.isAvailable !== false);
  }

  if (filters?.category && filters.category !== 'all') {
    if (filters.category === 'jain-specials') {
      items = items.filter(i => i.isJainFriendly || i.category === 'jain-specials');
    } else {
      items = items.filter(i => i.category === filters.category);
    }
  }

  if (filters?.jainOnly) {
    items = items.filter(i => i.isJainFriendly);
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    items = items.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    );
  }

  return items;
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const db = loadDatabase();
  return db.menuItems.find(i => i.id === id) || null;
}

export async function createMenuItem(itemData: Omit<MenuItem, 'id'>): Promise<MenuItem> {
  const db = loadDatabase();
  const id = `dish-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const newItem: MenuItem = {
    ...itemData,
    id,
    isAvailable: itemData.isAvailable ?? true,
    sortOrder: itemData.sortOrder ?? db.menuItems.length + 1,
  };

  db.menuItems.push(newItem);
  saveDatabase(db);
  return newItem;
}

export async function updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> {
  const db = loadDatabase();
  const idx = db.menuItems.findIndex(i => i.id === id);
  if (idx === -1) return null;

  db.menuItems[idx] = {
    ...db.menuItems[idx],
    ...updates,
    id, // protect ID
  };

  saveDatabase(db);
  return db.menuItems[idx];
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  const db = loadDatabase();
  const initialLength = db.menuItems.length;
  db.menuItems = db.menuItems.filter(i => i.id !== id);

  if (db.menuItems.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export async function toggleMenuItemAvailability(id: string, isAvailable?: boolean): Promise<MenuItem | null> {
  const db = loadDatabase();
  const item = db.menuItems.find(i => i.id === id);
  if (!item) return null;

  item.isAvailable = isAvailable !== undefined ? isAvailable : !item.isAvailable;
  saveDatabase(db);
  return item;
}

export async function getCategories(): Promise<MenuCategory[]> {
  const db = loadDatabase();
  return db.categories;
}

export async function createCategory(cat: MenuCategory): Promise<MenuCategory> {
  const db = loadDatabase();
  if (db.categories.some(c => c.id === cat.id)) {
    throw new Error(`Category ${cat.id} already exists`);
  }
  db.categories.push(cat);
  saveDatabase(db);
  return cat;
}

export async function getTables(): Promise<RestaurantTable[]> {
  const db = loadDatabase();
  return db.tables;
}

export async function createTable(tableNumber: string, label?: string, capacity?: number): Promise<RestaurantTable> {
  const db = loadDatabase();
  const cleanNumber = tableNumber.trim().toUpperCase();
  
  if (db.tables.some(t => t.tableNumber === cleanNumber)) {
    throw new Error(`Table ${cleanNumber} already exists`);
  }

  const newTable: RestaurantTable = {
    id: `tbl-${Date.now()}`,
    tableNumber: cleanNumber,
    label: label || `Table ${cleanNumber}`,
    capacity: capacity || 4,
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  db.tables.push(newTable);
  saveDatabase(db);
  return newTable;
}

export async function deleteTable(id: string): Promise<boolean> {
  const db = loadDatabase();
  const initialLen = db.tables.length;
  db.tables = db.tables.filter(t => t.id !== id);

  if (db.tables.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export async function getOrders(): Promise<RestaurantOrder[]> {
  const db = loadDatabase();
  // Return sorted newest first
  return [...db.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createOrder(orderData: {
  tableNumber?: string;
  customerName?: string;
  customerPhone?: string;
  items: { dishId: string; name: string; price: number; quantity: number; notes?: string }[];
  totalAmount: number;
  orderType?: 'dinein' | 'takeaway' | 'delivery';
  notes?: string;
}): Promise<RestaurantOrder> {
  const db = loadDatabase();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderReference = `HVR-${randomSuffix}`;

  const newOrder: RestaurantOrder = {
    id: `ord-${Date.now()}-${randomSuffix}`,
    orderReference,
    tableNumber: orderData.tableNumber || undefined,
    customerName: orderData.customerName || "Dine-in Guest",
    customerPhone: orderData.customerPhone || undefined,
    items: orderData.items,
    totalAmount: orderData.totalAmount,
    status: "pending",
    orderType: orderData.orderType || (orderData.tableNumber ? "dinein" : "takeaway"),
    notes: orderData.notes,
    createdAt: new Date().toISOString(),
  };

  db.orders.unshift(newOrder);
  saveDatabase(db);
  return newOrder;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<RestaurantOrder | null> {
  const db = loadDatabase();
  const order = db.orders.find(o => o.id === id);
  if (!order) return null;

  order.status = status;
  order.updatedAt = new Date().toISOString();
  saveDatabase(db);
  return order;
}

export async function getSettings(): Promise<RestaurantSettings> {
  const db = loadDatabase();
  return db.settings;
}

export async function updateSettings(updates: Partial<RestaurantSettings>): Promise<RestaurantSettings> {
  const db = loadDatabase();
  db.settings = {
    ...db.settings,
    ...updates,
  };
  saveDatabase(db);
  return db.settings;
}
