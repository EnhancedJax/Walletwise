import { TablesInsert } from "../types/supabase";
import useSession from "./useSession";
import {
  addDBAccount,
  addDBCategory,
  addDBEntry,
  fetchDBAccounts,
  fetchDBCategories,
  fetchDBEntries,
} from "../utils/supabase";
import { useData } from "./useData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useUpdateData() {
  const { setAccounts, setCategories, setEntries } = useData();
  const { session } = useSession();

  async function pullAccounts() {
    if (!session) return;
    const accounts = await fetchDBAccounts(session);
    if (!accounts) return;
    setAccounts(accounts);
    AsyncStorage.setItem("accounts", JSON.stringify(accounts));
  }
  async function pullCategories() {
    if (!session) return;
    const categories = await fetchDBCategories(session);
    if (!categories) return;
    AsyncStorage.setItem("categories", JSON.stringify(categories));
    setCategories(categories);
  }
  async function pullEntries() {
    if (!session) return;
    const entries = await fetchDBEntries(session);
    if (!entries) return;
    AsyncStorage.setItem("entries", JSON.stringify(entries));
    setEntries(entries);
  }

  async function addAccount(account: TablesInsert<"accounts">) {
    const success = await addDBAccount(account);
    if (success) {
      pullAccounts();
      return true;
    }
    return false;
  }

  async function addCategory(category: TablesInsert<"categories">) {
    const success = await addDBCategory(category);
    if (success) {
      pullCategories();
      return true;
    }
    return false;
  }

  async function addEntry(entry: TablesInsert<"entries">) {
    const success = await addDBEntry(entry);
    if (success) {
      pullEntries();
      return true;
    }
    return false;
  }

  return {
    addAccount,
    addCategory,
    addEntry,
    pullAccounts,
    pullCategories,
    pullEntries,
  };
}
