import { TablesInsert } from "../types/supabase";
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
