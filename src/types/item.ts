export interface IItem {
  id?: string;
  name: string;
  price: number;
  old_price?: number;
  discount_percent?: number;
  currency: string;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  volumes?: {
    id: string;
    label: string;
    in_stock: boolean;
  }[];
  category:string
}
