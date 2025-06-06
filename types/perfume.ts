
export interface Perfume {
  id: string;
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
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
