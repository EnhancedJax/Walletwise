import { Session } from "@supabase/supabase-js";
import { Tables, TablesInsert } from "../types/supabase";
import { supabase } from "./supabaseInit";
import Toast from "react-native-root-toast";

export async function addAccount(account: TablesInsert<"accounts">) {
  const { data, error } = await supabase.from("accounts").insert(account);
  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return;
  }
  return data;
}

export async function addCategory(category: TablesInsert<"categories">) {
  const { data, error } = await supabase.from("categories").insert(category);
  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return;
  }
  return data;
}

export async function addEntry(entry: TablesInsert<"entries">) {
  const { data, error } = await supabase.from("entries").insert(entry);
  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return;
  }
  return data;
}

export async function fetchAccounts(session: Session) {
  let { data: accounts, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("owner", session?.user.id);
  if (error) console.error(error);
  return accounts as Tables<"accounts">[];
}

export async function fetchCategories(session: Session) {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .or(`owner.is.null,owner.eq.${session?.user.id}`);
  if (error) console.error(error);
  return categories as Tables<"categories">[];
}

export async function fetchEntries(session: Session) {
  let { data: entries, error } = await supabase
    .from("entries")
    .select("*")
    .eq("owner", session?.user.id);
  if (error) console.error(error);
  return entries as Tables<"entries">[];
}
