import { Session } from "@supabase/supabase-js";
import { Tables, TablesInsert } from "../types/supabase";
import { supabase } from "./supabaseInit";
import Toast from "react-native-root-toast";

/*
 * ADD
 */
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

/*
 * UPDATE
 */

export async function updateDBAccount(
  id: number,
  account: TablesInsert<"accounts">,
) {
  const { data, error } = await supabase
    .from("accounts")
    .update(account)
    .eq("id", id)
    .select();

  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return false;
  }
  return true;
}

export async function updateDBCategory(
  id: number,
  category: TablesInsert<"categories">,
) {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", id)
    .select();

  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return false;
  }
  return true;
}

export async function updateDBEntry(
  id: number,
  entry: TablesInsert<"entries">,
) {
  const { data, error } = await supabase
    .from("entries")
    .update(entry)
    .eq("id", id)
    .select();

  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return false;
  }
  return true;
}

/*
 * DELETE
 */

export async function deleteDBAccount(id: number) {
  const { data, error } = await supabase.from("accounts").delete().eq("id", id);

  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return false;
  }
  return true;
}

export async function deleteDBCategory(id: number) {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return false;
  }
  return true;
}

export async function deleteDBEntry(id: number) {
  const { data, error } = await supabase.from("entries").delete().eq("id", id);

  if (error) {
    Toast.show(error.message, {
      textColor: "#FF8888",
    });
    console.error(error);
    return false;
  }
  return true;
}

/*
 * FETCH
 */

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
