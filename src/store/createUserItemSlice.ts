import { StateCreator } from "zustand";
import { Condition, SelectedItem } from "@/types/item";

interface RecommendedItemType {
  name: string;
  price: number;
  iconUrl: string;
  percentage: number;
  quantity: number;
  change: number;
}

interface DataType {
  id: string;
  name: string;
  price: number;
  recommendationType: Condition;
  suggestedItems: RecommendedItemType[];
}

type ItemState = {
  thatItemName: string;
  thatItemPrice: number | null;
  selectCondition: Condition | null;
  selectItemList: SelectedItem[];
  resultItem: DataType | null;
};

type ItemAction = {
  setThatItemName: (name: string) => void;
  setThatItemPrice: (price: number) => void;
  setSelectCondition: (condition: Condition) => void;
  setResultItem: (item: DataType) => void;
  addSelectItem: (item: SelectedItem) => void;
  deleteItem: (id: number) => void;
  resetItem: () => void;
  resetItemList: () => void;
};

export type UserItemSlice = ItemState & ItemAction;

export const createUserItemSlice: StateCreator<UserItemSlice> = (set) => ({
  thatItemName: "",
  thatItemPrice: null,
  selectCondition: null,
  selectItemList: [],
  resultItem: null,
  setThatItemName: (itemName) => set(() => ({ thatItemName: itemName })),
  setThatItemPrice: (itemPrice) => set(() => ({ thatItemPrice: itemPrice })),
  setSelectCondition: (condition) =>
    set(() => ({ selectCondition: condition })),
  addSelectItem: (item) =>
    set((state) => ({
      selectItemList: Array.isArray(item)
        ? item
        : [...state.selectItemList, item],
    })),
  deleteItem: (id) =>
    set((state) => ({
      selectItemList: state.selectItemList.filter((item) => item.id !== id),
    })),
  resetItem: () =>
    set({
      thatItemName: "",
      thatItemPrice: 0,
    }),
  resetItemList: () => set({ selectItemList: [] }),
  setResultItem: (item) => set({ resultItem: item }),
});
