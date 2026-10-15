export type DietaryType = 'pure-veg' | 'jain-available' | 'pure-jain';

export interface MenuItem {
  id: string;
  name: string;
  category: 'south-indian' | 'pav-bhaji' | 'north-indian' | 'indo-chinese' | 'beverages' | 'jain-specials';
  price: number;
  description: string;
  dietary: DietaryType;
  spiceLevel?: 0 | 1 | 2 | 3; // 0=mild, 1=medium, 2=spicy, 3=extra spicy
  isSignature?: boolean;
  isBestseller?: boolean;
  isJainFriendly: boolean;
  imageTag?: string;
  badge?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  instructions?: string;
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
