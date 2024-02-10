import { Link } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../utils/supabaseInit";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Settings() {
  return (
    <ScrollView>
      <View className="sticky flex flex-row items-center justify-between w-full p-8">
        <Link href="/" asChild>
          <Button title="Go back"></Button>
        </Link>
        <Button
          title="Sign out"
          onPress={() => supabase.auth.signOut()}
        ></Button>
      </View>
    </ScrollView>
  );
}

export default Settings;
