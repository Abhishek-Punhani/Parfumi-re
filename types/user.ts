import { Perfume, Review } from "./perfume";

export interface User {
  name: string;
  username: string;
  email: string;
  picture?: string;
  password: string;
  role?: "User" | "Admin" | "SuperAdmin";
  isVerified: boolean;
}


export interface LoginInputProps {
  icon: "user" | "email" | "password";
  placeholder: string;
  name: string;
  type?: string;
}

export interface SignInProps {
  providers: any[];
  callbackUrl: string;
  csrfToken: string;
}

export interface SignupFormProps {
  name: string;
  email: string;
  username: string;
  profilePicture: string;
  password: string;
  conf_password: string;
  success: string;
  error: string;
}

export interface LoginFormProps {
  email: string;
  password: string;
  success: string;
  error: string;
}

export interface Order {
  _id: string;
  products: string[];
  total: number;
  status: string;
  date: string;
}

export interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

export interface Address {
  id: number;
  type: string;
  name: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  picture: string;
  orders: Order[];
  wishlist: Perfume[];
  addresses: Address[];
  totalSpent: string;
  totalOrders: string;
  reviewsWritten: Review[];
}