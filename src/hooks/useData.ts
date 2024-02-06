import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseInit";
import { Tables } from "../types/supabase";
import useSession from "./useSession";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchAccounts,
  fetchCategories,
  fetchEntries,
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
    const accounts = await fetchAccounts(session);
    if (accounts) setAccounts(accounts);
  }
  async function pullCategories() {
    if (!session) return;
    const categories = await fetchCategories(session);
    if (categories) setCategories(categories);
  }
  async function pullEntries() {
    if (!session) return;
    const entries = await fetchEntries(session);
    if (entries) setEntries(entries);
  }

  return {
    accounts,
    categories,
    entries,
    setAccounts,
    setCategories,
    setEntries,
  };
}

// example of how to use the hook
// const { accounts, entries, categories } = useData();
