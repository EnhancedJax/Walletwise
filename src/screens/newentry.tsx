import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Check, Clock, PencilLine, Utensils } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { testAccounts, testEntries, testCategories } from "./data.js";

import H1 from "../components/h1";

function NewEntry({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView className="w-screen h-screen bg-cbg">
      <ScrollView>
        <View className="flex w-full px-7 pt-7">
          <H1 optionName="">New Entry</H1>
          <View className="flex items-center w-full rounded-md bg-cfg">
            <View className="flex items-center pt-8 ">
              <View
                className="p-2 rounded-lg w-[32px] h-[32px]"
                style={{
                  backgroundColor: testCategories["Food & Drinks"].color,
                }}
              >
                <Utensils className="text-cpg" size="16px" />
              </View>
              <Text className="mt-4 font-bold text-cpg font-ir">
                Food and Drinks
              </Text>
              <Text className="text-sm font-il text-cpg">Cash</Text>
            </View>
            <Text className="my-4 text-3xl text-cbalneg font-isb">-$2.15</Text>
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
              <TextInput
                className="w-full pl-4 text-base font-il text-cpg"
                placeholder="Food and Drinks"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
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
            <View className="flex flex-row items-center justify-between h-[92px]">
              <TouchableWithoutFeedback>
                <LinearGradient
                  colors={testAccounts[0].gradient}
                  className="flex flex-col items-center justify-center w-[47%] h-full p-4 mr-4 rounded-lg"
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text className="mb-2 text-white font-il">
                    {String(testAccounts[0].name)}
                  </Text>
                  <Text className="text-xl text-white font-isb">
                    ${String(testAccounts[0].balance)}
                  </Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View
                  className="flex flex-col items-center justify-center w-[47%] h-full p-4 mr-4 rounded-lg"
                  style={{
                    backgroundColor: testCategories["Food & Drinks"].color,
                  }}
                >
                  <Utensils className="text-cpg" size="24px" />
                  <Text className="mt-2 text-sm text-cpg font-il">
                    Food and Drinks
                  </Text>
                </View>
              </TouchableWithoutFeedback>
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
