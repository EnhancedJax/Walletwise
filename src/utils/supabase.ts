import { Session } from "@supabase/supabase-js";
import { Tables, TablesInsert } from "../types/supabase";
import { supabase } from "./supabaseInit";
import Toast from "react-native-root-toast";

export async function addDBAccount(account: TablesInsert<"accounts">) {
  const { data, error } = await supabase.from("accounts").insert(account);
  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return false;
  }
  return true;
}

export async function addDBCategory(category: TablesInsert<"categories">) {
  const { data, error } = await supabase.from("categories").insert(category);
  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return false;
  }
  return true;
}

export async function addDBEntry(entry: TablesInsert<"entries">) {
  const { data, error } = await supabase.from("entries").insert(entry);
  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return false;
  }
  return true;
}

export async function fetchDBAccounts(session: Session) {
  let { data: accounts, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("owner", session?.user.id);
  if (error) console.error(error);
  return accounts as Tables<"accounts">[];
}

export async function fetchDBCategories(session: Session) {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .or(`owner.is.null,owner.eq.${session?.user.id}`);
  if (error) console.error(error);
  return categories as Tables<"categories">[];
}

export async function fetchDBEntries(session: Session) {
  let { data: entries, error } = await supabase
    .from("entries")
    .select("*")
    .eq("owner", session?.user.id);
  if (error) console.error(error);
  return entries as Tables<"entries">[];
}

export async function fetchDBEntriesByDay(
  session: Session,
  year: number,
  month: number,
  day: number,
) {
  let { data: entries, error } = await supabase
    .from("entries")
    .select("*")
    .eq("owner", session?.user.id)
    .eq("date", `${year}-${month}-${day}`);

  if (error) {
    console.error(error);
    return [];
  }

  return entries as Tables<"entries">[];
}

export async function fetchDBEntriesByMonth(
  session: Session,
  year: number,
  month: number,
) {
  let { data: entries, error } = await supabase
    .from("entries")
    .select("*")
    .eq("owner", session?.user.id)
    .gte("date", `${year}-${month}-${1}`)
    .lt("date", `${year}-${month + 1}-${1}`);

  if (error) {
    console.error(error);
    return [];
  }

  return entries as Tables<"entries">[];
}
