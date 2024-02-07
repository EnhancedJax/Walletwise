import create from "zustand";
import { Tables, TablesInsert } from "../types/supabase";

interface DataStore {
  accounts: Tables<"accounts">[];
  categories: Tables<"categories">[];
  entries: Tables<"entries">[];
  setAccounts: (accounts: Tables<"accounts">[]) => void;
  setCategories: (categories: Tables<"categories">[]) => void;
  setEntries: (entries: Tables<"entries">[]) => void;
}

export const useData = create<DataStore>((set) => ({
  accounts: [],
  categories: [],
  entries: [],
  setAccounts: (accounts) => {
    console.log("set acc");
    set({ accounts });
  },
  setCategories: (categories) => set({ categories }),
  setEntries: (entries) => set({ entries }),
}));
