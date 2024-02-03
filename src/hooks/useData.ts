import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Tables } from "../types/supabase";
import useSession from "./useSession";

export function useData() {
  const [accounts, setAccounts] = useState<Tables<"accounts">[]>([]);
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [entries, setEntries] = useState<Tables<"entries">[]>([]);
  const { session } = useSession();

  useEffect(() => {
    if (!(session && session.user.id)) return;
    fetchAccounts();
    fetchCategories();
    fetchEntries();
  }, [session]);

  async function fetchAccounts() {
    let { data: accounts, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("owner", session?.user.id);
    if (error) console.error(error);
    setAccounts(accounts as Tables<"accounts">[]);
  }

  async function fetchCategories() {
    let { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .or(`owner.is.null,owner.eq.${session?.user.id}`);
    if (error) console.error(error);
    setCategories(categories as Tables<"categories">[]);
  }

  async function fetchEntries() {
    let { data: entries, error } = await supabase
      .from("entries")
      .select("*")
      .eq("owner", session?.user.id);
    if (error) console.error(error);
    setEntries(entries as Tables<"entries">[]);
  }

  return { accounts, categories, entries };
}

// example of how to use the hook
// const { accounts, entries, categories } = useData();
