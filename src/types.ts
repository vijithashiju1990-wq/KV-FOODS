export type ProductCategory = 'all' | 'dryfruits' | 'vegetables' | 'combos' | 'powders';

export interface Product {
  id: string;
  name: string;
  category: 'dryfruits' | 'vegetables' | 'combos' | 'powders';
  price: number; // In Indian Rupees (₹)
  unit: string;  // e.g. "250g", "1kg", "500g", "Bundle"
  description: string;
  imageUrl: string;
  badge?: string; // e.g. "Best Seller", "100% Organic", "Rare Find", "Fresh Harvest"
  nutrients: string[]; // e.g. ["Antioxidants", "Vitamin A", "Fiber"]
  rating: number; // e.g. 4.8
  reviewsCount: number;
  stock: number; // In stock quantity
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RecipeResult {
  recipeName: string;
  prepTime: string;
  servings: string;
  description: string;
  kvSpotlight: string;
  ingredients: string[];
  steps: string[];
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  stars: number;
  location: string;
}
