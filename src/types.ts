export type PackageFamily = 'ALL' | 'FCLUB' | 'YOLO100' | 'SODA125' | 'D159V';

export type CycleFilter = 'ALL' | '1T' | '3T' | '6T' | '12T';

export type DemandType = 'ALL' | 'COST' | 'SOCIAL' | 'HIGH_DATA' | 'COMBO_VOICE';

export type OrderStatus = 'pending' | 'shipping' | 'completed' | 'cancelled';

export interface PackageCommunicationInfo {
  demand: string;
  targetAudience: string;
  shortMessage: string;
  demandType: DemandType;
}

export interface StudentPackage {
  id: string;
  code: string;
  familyName: string;
  family: 'FCLUB' | 'YOLO100' | 'SODA125' | 'D159V';
  demand: string;
  demandType: DemandType;
  targetAudience: string;
  shortMessage: string;
  cycle: string;
  cycleMonths: number;
  bonusText?: string;
  discountPercent: number;
  price: number;
  originalPrice: number;
  giftText: string;
  giftOptions: string[];
  dataAllowance: string;
  voiceAllowance: string;
  extraBenefit: string;
  badge?: string;
  isPopular?: boolean;
}

export interface StudentCartItem {
  packageItem: StudentPackage;
  quantity: number;
  selectedGift: string;
  simOption: 'new_sim_physical' | 'new_sim_esim' | 'existing_sim';
  existingPhoneNumber?: string;
}

export interface StudentOrder {
  id: string;
  customerName: string;
  studentId?: string;
  schoolName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  district: string;
  deliveryMethod: 'dormitory_15m' | 'home_standard' | 'pickup_booth' | 'instant_esim';
  paymentMethod: 'vietqr' | 'cod' | 'momo' | 'vnpay';
  items: StudentCartItem[];
  totalAmount: number;
  orderDate: string;
  status: OrderStatus;
  notes?: string;
  staffNote?: string;
  staffAssigned?: string;
}

export interface QuickFilterState {
  family: PackageFamily;
  cycle: CycleFilter;
  demand: DemandType;
  searchQuery: string;
  sortBy: 'price_asc' | 'price_desc' | 'discount_desc' | 'popular';
}

// App View State
export type AppViewMode = 'customer' | 'admin';

// Legacy Sim types
export type SimCategory = 'all' | 'tam-hoa' | 'tu-quy' | 'loc-phat' | 'than-tai' | 'nam-sinh' | 'dau-co-091' | 'dau-so-co' | 'data-4g' | 'phong-thuy';

export interface SimItem {
  id: string;
  number: string;
  rawNumber: string;
  category: SimCategory;
  categoryName: string;
  prefix: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  simType: string;
  includedPackage: string;
  fengShuiScore: number;
  meaning: string;
  isHot?: boolean;
  isBestSeller?: boolean;
  freeShip?: boolean;
  stock?: number;
  badge?: string;
}

export interface DataPackage {
  id: string;
  name: string;
  code: string;
  price: number;
  originalPrice?: number;
  cycle?: string;
  dataPerDay: string;
  totalData?: string;
  voiceFree?: string;
  smsFree?: string;
  callInternal?: string;
  callExternal?: string;
  extraBonus?: string;
  highlight?: string;
  isHot?: boolean;
  popular?: boolean;
}

export interface CartItem {
  sim: SimItem;
  quantity: number;
  selectedFormat: 'eSIM' | 'physical';
  registeredName?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city?: string;
  district?: string;
  paymentMethod: 'cod' | 'vnpay' | 'vietqr' | 'momo' | string;
  deliveryMethod?: 'express_15m' | 'standard' | 'esim_qr' | string;
  deliverySpeed?: string;
  simFormat?: string;
  citizenId?: string;
  createdAt?: string;
  items: CartItem[];
  totalAmount?: number;
  total?: number;
  discountAmount?: number;
  orderDate?: string;
  status: OrderStatus | string;
  notes?: string;
}

export interface FilterState {
  searchQuery: string;
  category: SimCategory;
  prefix: string;
  priceRange: string;
  simFormat: string;
  sortBy: string;
}
