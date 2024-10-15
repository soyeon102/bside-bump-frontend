import { StateCreator } from "zustand";
import { Condition, SelectedItem } from "@/types/item";

type ItemState = {
  thatItemName: string;
  thatItemPrice: string;
  selectCondition: Condition | null;
  selectItemList: SelectedItem[];
};

type ItemAction = {
  setThatItemName: (name: string) => void;
  setThatItemPrice: (price: string) => void;
  setSelectCondition: (condition: Condition) => void;
  addSelectItem: (item: SelectedItem) => void;
  deleteItem: (id: number) => void;
  resetItem: () => void;
  resetItemList: () => void;
};

export type UserItemSlice = ItemState & ItemAction;

export const createUserItemSlice: StateCreator<UserItemSlice> = (set) => ({
  thatItemName: "",
  thatItemPrice: "",
  selectCondition: null,
  selectItemList: [],
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
      thatItemPrice: "",
    }),
  resetItemList: () => set({ selectItemList: [] }),
});
