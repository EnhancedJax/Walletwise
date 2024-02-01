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

function Settings() {
  return (
    <ScrollView>
      <View className="sticky flex flex-row items-center justify-between w-full p-8">
        <Link href="/" asChild>
          <Button title="Go back"></Button>
        </Link>
      </View>
    </ScrollView>
  );
}

export default Settings;
