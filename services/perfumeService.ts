import type { Perfume } from "@/types/perfume";

// Mock data service - In a real app, this would connect to your MongoDB backend
const mockPerfumes: Perfume[] = [
  {
    id: "1",
    name: "Eternal Rose",
    description: "A luxurious blend of Bulgarian rose petals with hints of vanilla and musk.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop"
    ],
    brand: "Parfumière",
    category: "Floral",
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Sarah Johnson",
        rating: 5,
        comment: "Absolutely divine! The rose scent is perfect and lasts all day.",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: "2",
    name: "Midnight Oud",
    description: "An intense, mysterious fragrance with rich oud wood and amber notes.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400&h=400&fit=crop"
    ],
    brand: "Parfumière",
    category: "Woody",
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    rating: 4.9,
    reviews: [
      {
        id: "r2",
        userId: "u2",
        userName: "Michael Chen",
        rating: 5,
        comment: "Rich and sophisticated. Perfect for evening wear.",
        date: "2024-01-10"
      }
    ]
  },
  {
    id: "3",
    name: "Ocean Breeze",
    description: "Fresh and invigorating with notes of sea salt, citrus, and white musk.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584382296087-ac00c7263710?w=400&h=400&fit=crop"
    ],
    brand: "Parfumière",
    category: "Fresh",
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    rating: 4.6,
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Emma Davis",
        rating: 4,
        comment: "Light and refreshing, perfect for summer days.",
        date: "2024-01-05"
      }
    ]
  },
  {
    id: "4",
    name: "Golden Amber",
    description: "Warm and sensual with amber, honey, and exotic spices.",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&h=400&fit=crop"
    ],
    brand: "Parfumière",
    category: "Oriental",
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    rating: 4.7,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "David Wilson",
        rating: 5,
        comment: "Luxurious and long-lasting. Gets compliments every time I wear it.",
        date: "2023-12-28"
      }
    ]
  },
  {
    id: "5",
    name: "Vanilla Dreams",
    description: "Sweet and comforting with Madagascar vanilla and caramel undertones.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1607734834519-d8576ae60ea8?w=400&h=400&fit=crop"
    ],
    brand: "Parfumière",
    category: "Gourmand",
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    rating: 4.5,
    reviews: [
      {
        id: "r5",
        userId: "u5",
        userName: "Jessica Brown",
        rating: 4,
        comment: "Sweet and cozy, like a warm hug in a bottle.",
        date: "2023-12-20"
      }
    ]
  }
];

export const getPerfumes = async (): Promise<Perfume[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockPerfumes;
};

export const getPerfumeById = async (id: string): Promise<Perfume | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPerfumes.find(perfume => perfume.id === id) || null;
};
