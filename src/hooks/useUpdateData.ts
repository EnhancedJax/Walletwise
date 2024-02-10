import { Tables, TablesInsert } from "../types/supabase";
import useSession from "./useSession";
import {
  addDBAccount,
  addDBCategory,
  addDBEntry,
  updateDBAccount,
  updateDBCategory,
  updateDBEntry,
  fetchDBAccounts,
  fetchDBCategories,
  fetchDBEntries,
  deleteDBAccount,
  deleteDBCategory,
  deleteDBEntry,
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
    const accsObj: Record<number, Tables<"accounts">> = accounts.reduce(
      (accounts, account) => ({ ...accounts, [account.id]: account }),
      {},
    );
    AsyncStorage.setItem("accounts", JSON.stringify(accsObj));
    setAccounts(accsObj);
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
  
  async function updateAccount(id: number, account: TablesInsert<"accounts">) {
    const success = await updateDBAccount(id, account);
    if (success) {
      pullAccounts();
      return true;
    }
    return false;
  }
  async function updateCategory(id: number, category: TablesInsert<"categories">) {
    const success = await updateDBCategory(id, category);
    if (success) {
      pullCategories();
      return true;
    }
    return false;
  }
  async function updateEntry(id: number, entry: TablesInsert<"entries">) {
    const success = await updateDBEntry(id, entry);
    if (success) {
      pullEntries();
      return true;
    }
    return false;
  }
  async function deleteAccount(id: number) {
    console.log(`Deleting account ${id}`)
    const success = await deleteDBAccount(id);
    if (success) {
      console.log("Success")
      pullAccounts();
      return true;
    }
    return false;
  }
  async function deleteCategory(id: number) {
    const success = await deleteDBCategory(id);
    if (success) {
      pullCategories();
      return true;
    }
    return false;
  }
  async function deleteEntry(id: number) {
    const success = await deleteDBEntry(id);
    if (success) {
      pullEntries();
      return true;
    }
    return false;
  }


  async function getLocalAccounts() {
    const accounts = await AsyncStorage.getItem("accounts");
    if (accounts) setAccounts(JSON.parse(accounts));
  }
  async function getLocalCategories() {
    const categories = await AsyncStorage.getItem("categories");
    if (categories) setCategories(JSON.parse(categories));
  }
  async function getLocalEntries() {
    const entries = await AsyncStorage.getItem("entries");
    if (entries) setEntries(JSON.parse(entries));
  }

  return {
    addAccount,
    addCategory,
    addEntry,
    updateAccount,
    updateCategory,
    updateEntry,
    deleteAccount,
    deleteCategory,
    deleteEntry,
    pullAccounts,
    pullCategories,
    pullEntries,
    getLocalAccounts,
    getLocalCategories,
    getLocalEntries,
  };
}
