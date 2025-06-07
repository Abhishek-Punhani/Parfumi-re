
export interface Perfume {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  brand: string;
  category: string;
  sizes: string[];
  inStock: boolean;
  rating: number;
  reviews: Review[];
}

export interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
