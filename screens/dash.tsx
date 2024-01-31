import { StatusBar } from "expo-status-bar";
import { Pressable, SafeAreaView, ScrollView, View, Text } from "react-native";
import { Navigation, Plus } from "lucide-react-native";
import { format } from "date-fns";

function Dash() {
  const testEntry = {
    name: "My McDonald's",
    amount: 500,
    date: new Date(),
    category: "Food & Drinks",
    account: "Cash",
    type: 0, //0 = expense, 1 = income, 2 = transfer
  };

  const testAccount = {
    name: "Cash",
    balance: 500,
  };

  return (
    <SafeAreaView className="w-screen h-screen p-10 bg-cbg">
      <Text className="text-xl bg-red-500">HELLO WORLD</Text>
    </SafeAreaView>
  );
}

export default Dash;
