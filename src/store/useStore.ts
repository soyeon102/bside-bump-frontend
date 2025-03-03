import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserItemSlice, createUserItemSlice } from "./createUserItemSlice";

type StoreState = UserItemSlice;

type UserIdState = {
  userId: string | null;
  setUserId: (userId: string) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (...args) => ({
      ...createUserItemSlice(...args),
    }),
    {
      name: "result-item",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useUserIdStore = create<UserIdState>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (userId: string) => set({ userId }),
    }),
    {
      name: "user-id",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
