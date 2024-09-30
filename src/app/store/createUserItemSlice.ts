import { StateCreator } from "zustand";

type ComparisonItem = {
  id: string;
  name: string;
  price: number;
  isEditable: boolean;
};

type Condition = "more" | "save";

export interface UserItemSlice {
  thatItemName: string;
  thatItemPrice: string;
  selectCondition: Condition | null;
  comparisonItemList: ComparisonItem[];
  setThatItemName: (itemName: string) => void;
  setThatItemPrice: (itemPrice: string) => void;
  setSelectCondition: (condition: Condition) => void;
  setComparisonItemList: (item: ComparisonItem) => void;
}

export const createUserItemSlice: StateCreator<UserItemSlice> = (set) => ({
  thatItemName: "",
  thatItemPrice: "",
  selectCondition: null,
  comparisonItemList: [],
  setThatItemName: (itemName) => set(() => ({ thatItemName: itemName })),
  setThatItemPrice: (itemPrice) => set(() => ({ thatItemPrice: itemPrice })),
  setSelectCondition: (condition) =>
    set(() => ({ selectCondition: condition })),
  setComparisonItemList: (item) =>
    set((state) => ({
      comparisonItemList: Array.isArray(item)
        ? item
        : [...state.comparisonItemList, item],
    })),
});
