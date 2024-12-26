export type Condition = "MORE" | "EXPENSIVE";

export type SelectedItem = {
  id: number;
  name: string;
  price: number;
  iconUrl?: string;
};

export interface CategoryDataType {
  id: number;
  name: string;
  products: SelectedItem[];
}
