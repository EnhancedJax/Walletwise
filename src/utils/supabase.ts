import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

//TODO change to env
const supabaseUrl = "https://brocrytvrtfsvhmebznj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyb2NyeXR2cnRmc3ZobWViem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NjE5MDAsImV4cCI6MjAyMjQzNzkwMH0.Xpwtx4mdaxgsISdfjfGfyMh9BOtro4OFOz5345WxIVs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
