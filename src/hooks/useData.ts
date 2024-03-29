import {create} from "zustand";
import { Tables } from "../types/supabase";

interface DataStore {
  accounts: Record<number, Tables<"accounts">>;
  categories: Tables<"categories">[];
  entries: Tables<"entries">[];
  setAccounts: (accounts: Record<number, Tables<"accounts">>) => void;
  setCategories: (categories: Tables<"categories">[]) => void;
  setEntries: (entries: Tables<"entries">[]) => void;
}

export const useData = create<DataStore>((set) => ({
  accounts: {},
  categories: [],
  entries: [],
  setAccounts: (accounts) => set({ accounts }),
  setCategories: (categories) => set({ categories }),
  setEntries: (entries) => set({ entries }),
}));
