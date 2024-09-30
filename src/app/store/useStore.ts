import { create } from "zustand";
import { UserItemSlice, createUserItemSlice } from "./createUserItemSlice";

type StoreState = UserItemSlice;

export const useStore = create<StoreState>()((...args) => ({
  ...createUserItemSlice(...args),
}));
