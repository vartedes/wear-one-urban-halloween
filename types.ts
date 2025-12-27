
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isHot?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface User {
  name: string;
  email: string;
  level: number;
  xp: number;
  points: number;
  ordersCount: number;
  couponsCount: number;
  avatar: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'paypal';
  lastFour: string;
  expiry: string;
  isDefault: boolean;
}
