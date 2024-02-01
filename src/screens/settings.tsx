import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";

function Settings({ navigation }: { navigation: any }) {
  return (
    <ScrollView>
      <View className="sticky flex flex-row items-center justify-between w-full p-8">
        <Button
          title="Go back"
          onPress={() => navigation.navigate("Dashboard")}
        ></Button>
      </View>
    </ScrollView>
  );
}

export default Settings;
