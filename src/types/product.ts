export interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  colors?: string[];
}
