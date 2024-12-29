export type Condition = "MORE" | "EXPENSIVE";

export interface SelectedItem {
  id: number;
  name: string;
  price: number;
  iconUrl?: string;
}

export interface CategoryData {
  id: number;
  name: string;
  products: SelectedItem[];
}

export interface RecommendedItem {
  name: string;
  price: number;
  iconUrl?: string | undefined;
}
