import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { Check, Clock, PencilLine, Utensils } from "lucide-react-native";

import H1 from "../components/h1";

function NewEntry({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView className="w-screen h-screen bg-cbg">
      <ScrollView>
        <View className="flex w-full p-7">
          <H1 optionName="">New Entry</H1>
          <View className="flex items-center w-full rounded-md bg-cfg">
            <View className="flex items-center pt-8 ">
              <View className="p-2 rounded-lg w-[32px] h-[32px] bg-gray-500">
                <Utensils className="text-cpg" size="16px" />
              </View>
              <Text className="mt-4 font-bold text-cpg font-ir">
                Food and Drinks
              </Text>
              <Text className="text-sm font-il text-cpg">Cash</Text>
            </View>
            <Text className="text-3xl text-cbalneg font-isb">-$2.15</Text>
            <Hrule />
            <View className="flex flex-row items-center justify-center px-0 py-4">
              <View className="flex flex-row items-center">
                <Text className="pr-2 text-base text-cpg font-il">
                  Transfer
                </Text>
                <View className="w-1 h-1 rounded-lg "></View>
              </View>
              <View className="flex flex-row items-center">
                <Text className="pr-2 text-base text-cpg font-il">Income</Text>
                <View className="w-1 h-1 rounded-lg "></View>
              </View>
              <View className="flex flex-row items-center">
                <Text className="pr-2 text-base text-cpg font-isb">
                  Expense
                </Text>
                <View className="w-1 h-1 rounded-lg bg-cbalneg"></View>
              </View>
            </View>
          </View>
        </View>
        <View className="flex w-full p-7">
          <H1 optionName="">Entry details</H1>
          <View className="flex w-full rounded-md bg-cfg">
            <View className="flex flex-row items-center p-4">
              <PencilLine className=" text-cpg" size="15px" />
              <Text className="pl-4 text-base opacity-30 font-il text-cpg">
                CATEGORY default
              </Text>
            </View>
            <Hrule />
            <View className="flex flex-row items-center p-4">
              <Clock className=" text-cpg" size="15px" />
              <Text className="pl-4 text-base font-il text-cpg">
                30 Jan 12:00 AM
              </Text>
            </View>
          </View>
          <View className="flex w-full p-4 mt-4 rounded-md bg-cfg">
            <View className="flex flex-row items-center justify-between mb-4">
              <Text className="text-xs text-base font-il">Account</Text>
              <Text className="text-xs text-base font-il">Category</Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <View className="w-[45%] bg-red-500 rounded-lg"></View>
              <View className="w-[45%] bg-red-500 rounded-lg"></View>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity className="absolute bg-cprimary rounded-lg bottom-8 right-8 w-[72px] h-[72px] flex justify-center items-center">
        <Check className="text-white" size="42px" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Hrule = () => {
  return <View className="w-full h-1 bg-cbg" />;
};

export default NewEntry;
