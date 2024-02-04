import { TablesInsert } from "../types/supabase";
import { supabase } from "./supabaseInit";

export async function addAccount(account: TablesInsert<"accounts">) {
  const { data, error } = await supabase.from("accounts").insert(account);
  if (error) console.error(error);
  return data;
}

export async function addCategory(category: TablesInsert<"categories">) {
  const { data, error } = await supabase.from("categories").insert(category);
  if (error) console.error(error);
  return data;
}

export async function addEntry(entry: TablesInsert<"entries">) {
  const { data, error } = await supabase.from("entries").insert(entry);
  if (error) console.error(error);
  return data;
}
