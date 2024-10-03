import { StateCreator } from "zustand";

type SelectedItem = {
  id: number;
  name: string;
  price: number;
};

type Condition = "MORE" | "EXPENSIVE";

export interface UserItemSlice {
  thatItemName: string;
  thatItemPrice: string;
  selectCondition: Condition | null;
  selectItemList: SelectedItem[];
  setThatItemName: (itemName: string) => void;
  setThatItemPrice: (itemPrice: string) => void;
  setSelectCondition: (condition: Condition) => void;
  addSelectItem: (item: SelectedItem) => void;
  deleteItem: (id: number) => void;
  resetItem: () => void;
}

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
  resetItem: () => set({ selectItemList: [] }),
});
