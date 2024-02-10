import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import useSession from "../src/hooks/useSession";
import {
  H1,
  OptionRow,
  OptionRule,
  OptionsWrapper,
  TouchableComponent,
} from "../src/components/essentials";
import {
  Banknote,
  Check,
  Palette,
  PencilLine,
  PiggyBank,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useUpdateData } from "../src/hooks/useUpdateData";
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import accountColors from "../src/colors.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useData } from "../src/hooks/useData";

function EditAcc() {
  const { accounts } = useData();
  const { session } = useSession();
  const [index, setIndex] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [selectedColor, setSelectedColor] = useState("blue");
  const currency = "HKD $";
  const { updateAccount, deleteAccount } = useUpdateData();
  const bottomColorRef = useRef<BottomSheet>(null);
  const snapPointsColor = useMemo(() => ["1%", "35%"], []);
  useEffect(() => {
    const getValueFromAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem("selectedAccount");
        console.log(value);
        return value; // Return the value from AsyncStorage
      } catch (error) {
        console.log(error);
      }
    };

    const setIndexValue = async () => {
      const value = await getValueFromAsyncStorage();
      setIndex(Number(value) ?? 0);
      setName(accounts[Number(value)].name);
      setAmount(accounts[Number(value)].balance);
      setSelectedColor(accounts[Number(value)].colors);
    };

    setIndexValue();
  }, []);

  async function editAccount() {
    await updateAccount(index, {
      name: name,
      balance: Number(amount),
      colors: selectedColor,
      owner: String(session?.user.id),
    });

    router.navigate("/");
  }

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const [numPadDecimalState, setNumPadDecimalState] = useState(0);
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
    }
  }

  function handleDelete() {
    console.log(index);
    deleteAccount(index);
    router.navigate("/");
  }

  return (
    <SafeAreaView className="w-screen h-screen bg-cbg dark:bg-dbg">
      <View className="flex w-full p-7">
        <H1 optionName="Adjust balance" optionhref="\adjustbal">
          Edit Account
        </H1>
        <LinearGradient
          colors={accountColors[selectedColor]}
          className="flex flex-col items-start justify-center p-4 rounded-lg w-full h-[136px] mr-4"
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text className="mb-2 text-white font-il">
            {name ? name : "My wallet"}
          </Text>
          <Text className="text-xl text-white font-isb">
            {currency}
            {amount}
          </Text>
        </LinearGradient>

        <View className="flex w-full p-4 mt-4 bg-red-500 rounded-md">
          <TouchableComponent onPress={() => handleDelete()}>
            <Text className="text-center text-cfg dark:text-dfg font-ir">
              Delete account
            </Text>
          </TouchableComponent>
        </View>
      </View>
      <View className="flex w-full p-7">
        <H1>Account Details</H1>
        <OptionsWrapper>
          <OptionRow>
            <PencilLine className=" text-cpg dark:text-dpg" size="15px" />
            <TextInput
              onChangeText={(text) => setName(text)}
              value={name}
              placeholder="My Wallet"
              autoCapitalize={"none"}
              className="w-full pl-4 text-base font-il text-cpg dark:text-dpg"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </OptionRow>
          <OptionRule />
          <TouchableComponent onPress={() => bottomColorRef.current?.expand()}>
            <View className="flex flex-row items-center w-full p-4 ">
              <Palette className=" text-cpg dark:text-dpg" size="15px" />

              <LinearGradient
                colors={accountColors[selectedColor]}
                className="ml-4 rounded-lg grow h-[24px]"
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
          </TouchableComponent>
        </OptionsWrapper>
      </View>
      <TouchableOpacity
        className="absolute bg-cprimary dark:bg-dprimary rounded-lg bottom-8 right-8 w-[72px] h-[72px] flex justify-center items-center"
        onPress={() => editAccount()}
      >
        <Check className="text-white" size="42px" />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomColorRef}
        index={-1}
        snapPoints={snapPointsColor}
        animationConfigs={animationConfigs}
        overDragResistanceFactor={10}
        enableContentPanningGesture={false}
      >
        <View
          className="flex flex-row flex-wrap items-center justify-center w-full h-full px-7 pb-7"
          style={{ gap: 16 }}
        >
          {Object.keys(accountColors).map((color, index) => (
            <TouchableComponent
              onPress={() => setSelectedColor(color)}
              key={index}
              className="flex items-center justify-center grow"
            >
              <LinearGradient
                colors={accountColors[color]}
                className="w-16 h-16 rounded-lg"
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              />
            </TouchableComponent>
          ))}
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
export default EditAcc;
