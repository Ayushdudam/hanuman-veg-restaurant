export type DietaryType = 'pure-veg' | 'jain-available' | 'pure-jain';

export type CategorySlug = 
  | 'south-indian' 
  | 'pav-bhaji' 
  | 'north-indian' 
  | 'indo-chinese' 
  | 'beverages' 
  | 'jain-specials' 
  | string;

export interface MenuItem {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  description: string;
  dietary: DietaryType;
  spiceLevel?: 0 | 1 | 2 | 3; // 0=mild, 1=medium, 2=spicy, 3=extra spicy
  isSignature?: boolean;
  isBestseller?: boolean;
  isJainFriendly: boolean;
  isAvailable?: boolean; // defaults to true
  imageUrl?: string;
  imageTag?: string;
  badge?: string;
  sortOrder?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  sortOrder?: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  instructions?: string;
}

export interface RestaurantTable {
  id: string;
  tableNumber: string; // e.g. "T01", "T02", "Family-1"
  label?: string;
  capacity?: number;
  createdAt: string;
  isActive: boolean;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type OrderType = 'dinein' | 'takeaway' | 'delivery';

export interface OrderItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface RestaurantOrder {
  id: string;
  orderReference: string; // e.g. "HVR-8492"
  tableNumber?: string;
  customerName?: string;
  customerPhone?: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderType: OrderType;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RestaurantSettings {
  name: string;
  legalName: string;
  tagline: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  landline: string;
  landlineDisplay: string;
  hours: string;
  priceForTwo: string;
  orderingMode: 'menu-and-ordering' | 'menu-only';
  announcement?: string;
  enableWhatsAppCheckout: boolean;
  enableDirectOrderSubmission: boolean;
  productionBaseUrl?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: 'Google' | 'Justdial' | 'Swiggy' | 'Zomato';
  review: string;
  tag: string;
  avatarInitial: string;
}

export interface TimeSlot {
  name: string;
  timing: string;
  service: string;
  highlight: string;
}

export interface RestaurantInfo {
  name: string;
  legalName: string;
  tagline: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  phoneDisplay: string;
  landline: string;
  landlineDisplay: string;
  hours: string;
  priceForTwo: string;
  ratingScore: number;
  ratingMax: number;
  reviewCount: number;
  ratingBreakdown: {
    cleanliness: number;
    foodTaste: number;
    valueForMoney: number;
    jainOptions: number;
  };
  whatsappUrlBase: string;
  googleMapsDirectionsUrl: string;
  googleMapsEmbedUrl: string;
}
