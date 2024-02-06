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
import { Link } from "expo-router";
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { H1, Hrule, TouchableComponent } from "../src/components/essentials";

function NewEntry() {
  const [entryType, setEntryType] = useState(0);
  const [amount, setAmount] = useState(0.0);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomInputRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "53%"], []);
  const snapPointsInput = useMemo(() => ["1%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [numPadDecimalState, setNumPadDecimalState] = useState(0);
  const [numPadOperatorState, setNumPadOperatorState] = useState(0);
  const [numPadSavedAmount, setNumPadSavedAmount] = useState(0);

  function handleNumpad(value: number) {
    if (value >= 0 && value <= 9) {
      if (numPadDecimalState === 0) {
        setAmount((prevAmount) => prevAmount * 10 + value);
      } else if (numPadDecimalState < 3) {
        setAmount((prevAmount) =>
          parseFloat(
            (prevAmount + value * 0.1 ** numPadDecimalState).toFixed(2)
          )
        );
        setNumPadDecimalState((prevState) => prevState + 1);
      }
    } else if (value === -1) {
      if (numPadDecimalState === 0) {
        setNumPadDecimalState(1);
      }
    } else if (value === -2) {
      setNumPadDecimalState((prevState) => Math.max(0, prevState - 1));
      setAmount((prevAmount) => {
        const amountString = prevAmount.toString();
        const newAmountString = amountString.slice(0, -1);
        const newAmount = parseFloat(newAmountString);
        return isNaN(newAmount) ? 0 : newAmount;
      });
    } else if (value > 100) {
      setNumPadSavedAmount(amount);
      if (numPadOperatorState == 0 && value !== 555) {
        setAmount(0);
      } else if (numPadOperatorState != 555 && value !== 555) {
        if (numPadOperatorState === 333) {
          setNumPadSavedAmount(Math.max(0, numPadSavedAmount - amount));
        } else if (numPadOperatorState === 444) {
          setNumPadSavedAmount(numPadSavedAmount + amount);
        } else if (numPadOperatorState === 222) {
          setNumPadSavedAmount(
            parseFloat((numPadSavedAmount / amount).toFixed(2))
          );
        } else if (numPadOperatorState === 111) {
          setNumPadSavedAmount(
            parseFloat((numPadSavedAmount * amount).toFixed(2))
          );
        }
        setAmount(0);
      }

      if (value === 555) {
        if (numPadOperatorState === 333) {
          setAmount(Math.max(0, numPadSavedAmount - amount));
        } else if (numPadOperatorState === 444) {
          setAmount(numPadSavedAmount + amount);
        } else if (numPadOperatorState === 222) {
          setAmount(parseFloat((numPadSavedAmount / amount).toFixed(2)));
        } else if (numPadOperatorState === 111) {
          setAmount(parseFloat((numPadSavedAmount * amount).toFixed(2)));
        }
        setNumPadOperatorState(0);
        bottomInputRef.current?.close();
      } else {
        setNumPadOperatorState(value);
      }
    }
  }

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  // render
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        pressBehavior="close"
        opacity={0.0}
      />
    ),
    []
  );

  return (
    <SafeAreaView className="w-screen h-screen bg-cbg dark:bg-dbg">
      <ScrollView>
        <View className="flex w-full p-7">
          <H1>New Entry</H1>
          <View className="flex items-center w-full mb-4 rounded-md bg-cfg dark:bg-dfg">
            <TouchableOpacity>
              <Text
                className={`my-4 text-3xl font-isb ${
                  entryType == 0
                    ? "text-cbalneg dark:text-dbalneg"
                    : entryType == 1
                    ? "text-cbalpos dark:text-dbalpos"
                    : "text-cpg2 dark:text-dpg2"
                }`}
                onPress={() => bottomInputRef.current?.expand()}
                numberOfLines={1}
              >
                {entryType == 0 ? "-" : entryType == 1 ? "+" : ""}$
                {amount.toFixed(2)}
              </Text>
            </TouchableOpacity>
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
      >
        <View className="flex w-full px-7">
          <H1>SnapEntry</H1>
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
      <BottomSheet
        ref={bottomInputRef}
        index={1}
        snapPoints={snapPointsInput}
        animationConfigs={animationConfigs}
        overDragResistanceFactor={10}
        enableContentPanningGesture={false}
        // backdropComponent={renderBackdrop}
      >
        <View className="flex flex-row w-full h-full px-7 pb-7">
          <View className="flex flex-col grow">
            <Row>
              <NumpadTile onPress={() => handleNumpad(1)} text="1" />
              <NumpadTile onPress={() => handleNumpad(2)} text="2" />
              <NumpadTile onPress={() => handleNumpad(3)} text="3" />
            </Row>
            <Row>
              <NumpadTile onPress={() => handleNumpad(4)} text="4" />
              <NumpadTile onPress={() => handleNumpad(5)} text="5" />
              <NumpadTile onPress={() => handleNumpad(6)} text="6" />
            </Row>
            <Row>
              <NumpadTile onPress={() => handleNumpad(7)} text="7" />
              <NumpadTile onPress={() => handleNumpad(8)} text="8" />
              <NumpadTile onPress={() => handleNumpad(9)} text="9" />
            </Row>
            <Row>
              <NumpadTile onPress={() => handleNumpad(-1)} text="." />
              <NumpadTile onPress={() => handleNumpad(0)} text="0" />
              <NumpadTile onPress={() => handleNumpad(-2)} text="⌫" />
            </Row>
          </View>
          <View className="flex flex-col w-[72px] bg-cbg rounded-md">
            <NumpadTile onPress={() => handleNumpad(111)} text="×" />
            <NumpadTile onPress={() => handleNumpad(222)} text="÷" />
            <NumpadTile onPress={() => handleNumpad(333)} text="-" />
            <NumpadTile onPress={() => handleNumpad(444)} text="+" />
            <NumpadTile onPress={() => handleNumpad(555)} text="=" />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const SnapEntry = ({ object }: { object: any }) => {
  return (
    <View className="mb-4 rounded-md bg-cbg dark:bg-dbg">
      <TouchableComponent
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
      </TouchableComponent>
    </View>
  );
};

const Row = ({ children }: { children: React.ReactNode }) => {
  return <View className="flex flex-row w-full grow">{children}</View>;
};

interface NumpadTileProps {
  onPress: () => void;
  text: string;
}

const NumpadTile: React.FC<NumpadTileProps> = ({ onPress, text }) => {
  return (
    <View className="justify-center grow">
      <TouchableComponent
        onPressIn={onPress}
        className="flex items-center justify-center grow"
      >
        <Text className="text-2xl text-ib">{text}</Text>
      </TouchableComponent>
    </View>
  );
};

export default NewEntry;
