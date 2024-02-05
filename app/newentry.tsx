import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  TouchableNativeFeedback,
} from "react-native";
import { Check, Clock, PencilLine, Utensils } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { testAccounts, testCategories } from "../src/data";
import H1 from "../src/components/h1";
import { Link } from "expo-router";
import BottomSheet, { useBottomSheetSpringConfigs } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Hrule } from "../src/components/hrule";

function NewEntry() {
  const [entryType, setEntryType] = useState(0);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["10%", "53%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  // render
  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View key={item} className="p-2 m-2 bg-red-500">
        <Text>{item}</Text>
      </View>
      // <SnapEntry object={item}></SnapEntry>
    ),
    []
  );

  return (
    <SafeAreaView className="w-screen h-screen bg-cbg dark:bg-dbg">
      <ScrollView>
        <View className="flex w-full p-7">
          <H1 optionName="">New Entry</H1>
          <View className="flex items-center w-full mb-4 rounded-md bg-cfg dark:bg-dfg">
            <Text
              className={`my-4 text-3xl font-isb ${
                entryType == 0
                  ? "text-cbalneg dark:text-dbalneg"
                  : entryType == 1
                  ? "text-cbalpos dark:text-dbalpos"
                  : "text-cpg2 dark:text-dpg2"
              }`}
            >
              {entryType == 0 ? "-" : entryType == 1 ? "+" : ""}$2.15
            </Text>
            <Hrule />
            <View className="flex flex-row items-center justify-center px-0 py-4">
              <TouchableOpacity onPress={() => setEntryType(1)}>
                <View className="flex flex-col items-center mr-4 ">
                  <Text className="mb-2 text-base text-cpg dark:text-dpg font-isb">
                    Income
                  </Text>
                  <View
                    className={`w-1 h-1 rounded-lg ${
                      entryType === 1 ? "bg-cbalpos dark:bg-dbalpos" : ""
                    }`}
                  ></View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEntryType(2)}>
                <View className="flex flex-col items-center pr-4">
                  <Text className="mb-2 text-base text-cpg dark:text-dpg font-isb">
                    Transfer
                  </Text>
                  <View
                    className={`w-1 h-1 rounded-lg ${
                      entryType === 2 ? "bg-csub dark:bg-dsub" : ""
                    }`}
                  ></View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEntryType(0)}>
                <View className="flex flex-col items-center">
                  <Text className="mb-2 text-base text-cpg dark:text-dpg font-isb">
                    Expense
                  </Text>
                  <View
                    className={`w-1 h-1 rounded-lg ${
                      entryType === 0 ? "bg-cbalneg dark:bg-dbalneg" : ""
                    }`}
                  ></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex w-full p-4 mb-4 rounded-md bg-cfg dark:bg-dfg">
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
                  <Utensils className="text-cpg dark:text-dpg" size="24px" />
                  <Text className="mt-2 text-sm text-cpg dark:text-dpg font-il">
                    Food and Drinks
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View className="flex w-full rounded-md bg-cfg dark:bg-dfg">
            <View className="flex flex-row items-center p-4">
              <PencilLine className=" text-cpg dark:text-dpg" size="15px" />
              <TextInput
                className="w-full pl-4 text-base font-il text-cpg dark:text-dpg"
                placeholder="Food and Drinks"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
            </View>
            <Hrule />
            <View className="flex flex-row items-center p-4">
              <Clock className=" text-cpg dark:text-dpg" size="15px" />
              <Text className="pl-4 text-base font-il text-cpg dark:text-dpg">
                30 Jan 12:00 AM
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animationConfigs={animationConfigs}
        overDragResistanceFactor={10}
        // enableDynssamicSizing={true}
        // contentHeight={500}
      >
        <View className="flex w-full px-7">
          <H1 optionName="">SnapEntry</H1>
          {/* <BottomSheetScrollView>
            {data.map((item: string) => renderItem({ item }))}
          </BottomSheetScrollView> */}
        </View>
      </BottomSheet>
      <Link href="/" asChild>
        <TouchableOpacity className="absolute bg-cprimary dark:bg-dprimary rounded-lg bottom-8 right-8 w-[72px] h-[72px] flex justify-center items-center">
          <Check className="text-white" size="42px" />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const SnapEntry = ({ object }: { object: any }) => {
  return (
    <View className="mb-4 rounded-md bg-cbg dark:bg-dbg">
      <TouchableNativeFeedback
        onPress={() => console.log("Entry clicked")}
        background={TouchableNativeFeedback.Ripple(
          "rgba(150,150,150,0.1)",
          true
        )}
      >
        <View className="flex flex-row items-center justify-between p-4">
          <View className="flex flex-row">
            <View
              className="p-2 mr-4 rounded-lg w-[32px] h-[32px]"
              style={{ backgroundColor: object.category.color }}
            >
              <Utensils className="text-cpg dark:text-dpg" size="16px" />
            </View>
            <View>
              <Text className="text-base font-medium font-im">
                {String(object.name)}
              </Text>
              <Text className="text-sm font-il">{String(object.account)}</Text>
            </View>
          </View>
          <Text
            className={`text-base font-im ${
              object.type == 0
                ? "text-cbalneg dark:text-dbalneg"
                : object.type == 1
                ? "text-cbalpos dark:text-dbalpos"
                : "text-cpg dark:text-dpg2"
            }`}
          >
            {object.type == 0 ? "-" : object.type == 1 ? "+" : ""}$
            {String(object.amount)}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default NewEntry;
