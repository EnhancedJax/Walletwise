import { useState, useEffect } from "react";
import { Tables, TablesInsert } from "../types/supabase";
import useSession from "./useSession";
import {
  addDBAccount,
  addDBCategory,
  addDBEntry,
  fetchDBAccounts,
  fetchDBCategories,
  fetchDBEntries,
} from "../utils/supabase";

export function useData() {
  const [accounts, setAccounts] = useState<Tables<"accounts">[]>([]);
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [entries, setEntries] = useState<Tables<"entries">[]>([]);
  const { session } = useSession();

  useEffect(() => {
    pullAccounts();
    pullCategories();
    pullEntries();
  }, [session]);

  async function pullAccounts() {
    if (!session) return;
    const accounts = await fetchDBAccounts(session);
    if (accounts) {
      setAccounts(accounts);
      console.log("set", accounts.map((a) => a.name).join(","));
    }
  }
  async function pullCategories() {
    if (!session) return;
    const categories = await fetchDBCategories(session);
    if (categories) setCategories(categories);
  }
  async function pullEntries() {
    if (!session) return;
    const entries = await fetchDBEntries(session);
    if (entries) setEntries(entries);
  }

  async function addAccount(account: TablesInsert<"accounts">) {
    console.log("adding");
    const success = await addDBAccount(account);
    if (success) {
      console.log("success, pull ");
      pullAccounts();
      return true;
    }
    console.log("bad");
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
    accounts,
    categories,
    entries,
    addAccount,
    addCategory,
    addEntry,
  };
}

// example of how to use the hook
// const { accounts, entries, categories } = useData();
