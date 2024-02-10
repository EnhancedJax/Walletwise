import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
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
  OptionRule,
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

function NewAcc() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0.0);
  const { session } = useSession();
  const currency = "HKD $";
  const { addAccount } = useUpdateData();
  const bottomInputRef = useRef<BottomSheet>(null);
  const bottomColorRef = useRef<BottomSheet>(null);
  const snapPointsInput = useMemo(() => ["1%", "50%"], []);
  const snapPointsColor = useMemo(() => ["1%", "35%"], []);
  const [selectedColor, setSelectedColor] = useState("blue");

  async function createAccount() {
    await addAccount({
      name: name,
      balance: Number(amount),
      color1: accountColors[selectedColor][0],
      color2: accountColors[selectedColor][1],
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

  return (
    <SafeAreaView className="w-screen h-screen bg-cbg dark:bg-dbg">
      <View className="flex w-full p-7">
        <H1>New Account</H1>
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
      </View>
      <View className="flex w-full p-7">
        <H1>Account Details</H1>
        <View className="flex w-full rounded-md bg-cfg dark:bg-dfg">
          <View className="flex flex-row items-center p-4">
            <PencilLine className=" text-cpg dark:text-dpg" size="15px" />
            <TextInput
              onChangeText={(text) => setName(text)}
              value={name}
              placeholder="My Wallet"
              autoCapitalize={"none"}
              className="w-full pl-4 text-base font-il text-cpg dark:text-dpg"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </View>
          <OptionRule />
          <View className="flex flex-row items-center p-4">
            <Banknote className=" text-cpg dark:text-dpg" size="15px" />
            <Text className="w-full pl-4 text-base font-il text-cpg dark:text-dpg">
              {currency}
            </Text>
          </View>
          <OptionRule />
          <TouchableComponent onPress={() => bottomInputRef.current?.expand()}>
            <View className="flex flex-row items-center p-4">
              <PiggyBank className=" text-cpg dark:text-dpg" size="15px" />
              <Text className="w-full pl-4 text-base font-il text-cpg dark:text-dpg">
                {amount}
              </Text>
            </View>
          </TouchableComponent>
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
        </View>
      </View>
      <TouchableOpacity
        className="absolute bg-cprimary dark:bg-dprimary rounded-lg bottom-8 right-8 w-[72px] h-[72px] flex justify-center items-center"
        onPress={() => createAccount()}
      >
        <Check className="text-white" size="42px" />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomInputRef}
        index={-1}
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
        </View>
      </BottomSheet>

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
        <View className="flex items-center justify-center grow">
          <Text className="text-2xl text-ib">{text}</Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

export default NewAcc;
