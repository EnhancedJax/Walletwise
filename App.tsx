import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView className="bg-cbg">
      <View className="flex h-[142px] flex-col items-start justify-start gap-4 self-stretch">
        <View className="inline-flex items-center justify-start gap-2.5 self-stretch">
          <Text className="text-base font-light text-neutral-500">
            Your accounts
          </Text>
        </View>
        <View className="inline-flex items-start justify-start gap-4 self-stretch">
          <View className="inline-flex h-[110px] w-[110px] flex-col items-start justify-center gap-2 rounded-3xl border border-neutral-300 bg-white p-3 shadow">
            <Text className="self-stretch text-base font-light text-neutral-800">
              Bank
            </Text>
            <Text className="self-stretch text-xl font-medium text-neutral-800">
              $92,000
            </Text>
          </View>
          <View className="inline-flex h-[110px] w-[110px] flex-col items-start justify-center gap-2 rounded-3xl border border-neutral-300 bg-white p-3 shadow">
            <Text className="self-stretch text-base font-light text-neutral-800">
              Super Wallet
            </Text>
            <Text className="self-stretch text-xl font-medium text-neutral-800">
              $100,0123.423
            </Text>
          </View>
          <View className="inline-flex h-[110px] w-8 flex-col items-center justify-start rounded-3xl bg-white shadow">
            <View className="flex h-[55px] flex-col items-center justify-center self-stretch rounded-tl-3xl rounded-tr-3xl border border-neutral-300 bg-white">
              <View className="relative h-4 w-4" />
            </View>
            <View className="flex h-[55px] flex-col items-center justify-center self-stretch rounded-bl-3xl rounded-br-3xl border-b-2 border-l-2 border-r-2 border-neutral-800 bg-white">
              <View className="relative h-4 w-4" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
