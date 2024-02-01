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

function Details() {
  return (
    <ScrollView>
      <View className="sticky flex w-full flex-row items-center justify-between p-8">
        <Link href="/" asChild>
          <Button title="Go back"></Button>
        </Link>
      </View>
    </ScrollView>
  );
}

export default Details;
