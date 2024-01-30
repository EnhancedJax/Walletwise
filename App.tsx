import { StatusBar } from "expo-status-bar";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Navigation, Plus } from "lucide-react-native";
import { format } from "date-fns";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
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
    <NavigationContainer>
      <SafeAreaView className="w-screen h-screen bg-cbg">
        <View className="flex flex-col items-start justify-start px-8 py-8">
          <HomeTitle>Your accounts</HomeTitle>
          <View className="flex flex-row">
            <AccountCard object={testAccount} />
            <AccountCard object={testAccount} />
            <View className="flex flex-col items-center justify-center w-8 border shadow bg-cbg h-28 rounded-3xl border-cborder">
              <Plus size="16px" className="text-cpg" />
            </View>
          </View>
        </View>
        <View className="flex flex-col items-start justify-start px-8 py-8">
          <HomeTitle>Expense structure</HomeTitle>
          <View className="w-full h-12 border shadow bg-cbg border-cborder rounded-2xl"></View>
        </View>
        <View className="flex-col items-start justify-start flex-1 px-8 py-8">
          <HomeTitle>Expense history</HomeTitle>
          <View className="w-full h-full">
            <ScrollView removeClippedSubviews>
              <Entry object={testEntry}></Entry>
              <Entry object={testEntry}></Entry>
              <Entry object={testEntry}></Entry>
              <Entry object={testEntry}></Entry>
              <Entry object={testEntry}></Entry>
              <Entry object={testEntry}></Entry>
              <Entry object={testEntry}></Entry>
              <Entry object={testEntry}></Entry>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const AccountCard = ({ object }: { object: any }) => {
  return (
    <Pressable className="flex flex-col items-start justify-center p-3 mr-4 bg-white border shadow h-28 w-28 rounded-2xl border-cborder">
      <Text className="mb-2 text-base font-light text-cpg">
        {String(object.name)}
      </Text>
      <Text className="text-xl font-medium text-cpg">
        ${String(object.balance)}
      </Text>
    </Pressable>
  );
};

const HomeTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text className="w-full mb-4 text-base font-light text-cpg2">
      {children}
    </Text>
  );
};

const Entry = ({ object }: { object: any }) => {
  const formattedDate = format(object.date, "dd MMM HH:mm");
  return (
    <View className="flex flex-row items-center justify-between w-full p-3 border-b bg-cbg rounded-xl border-cborder">
      <View className="flex flex-row items-center justify-start">
        <View className="flex items-center justify-start p-2 mr-3 rounded-lg bg-rose-500">
          <View className="w-4 h-4 bg-blue-500" />
        </View>
        <View className="inline-flex flex-col items-start justify-center">
          <Text className="mb-1 text-base font-semibold text-neutral-800">
            {String(object.name)}
          </Text>
          <Text className="text-xs font-light text-neutral-800 ">
            <Text className="text-xs font-light text-neutral-800">
              {String(object.account)} ⋅ {formattedDate}
            </Text>
          </Text>
        </View>
      </View>
      <Text className="text-base font-medium text-red-500 ">
        ${String(object.amount)}
      </Text>
    </View>
  );
};
