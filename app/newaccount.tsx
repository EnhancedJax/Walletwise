import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { addAccount } from "../src/utils/supabase";
import useSession from "../src/hooks/useSession";
import H1 from "../src/components/h1";
import { Hrule } from "../src/components/hrule";
import {
  Banknote,
  Check,
  Palette,
  PencilLine,
  PiggyBank,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

function NewAcc() {
  const [name, setName] = useState("");
  const [bal, setBal] = useState("");
  const { session } = useSession();
  const currency = "HKD $";

  async function createAccount() {
    await addAccount({
      name: name,
      balance: Number(bal),
      color1: "#000000",
      color2: "#000000",
      owner: String(session?.user.id),
    });

    await router.navigate("/");
  }
  return (
    <SafeAreaView className="w-screen h-screen bg-cbg">
      <View className="flex w-full p-7">
        <H1 optionName="">New Account</H1>
        <LinearGradient
          colors={["#000", "#000"]}
          className="flex flex-col items-start justify-center p-4 rounded-lg w-full h-[136px] mr-4"
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text className="mb-2 text-white font-il">{name}</Text>
          <Text className="text-xl text-white font-isb">
            {currency}
            {bal}
          </Text>
        </LinearGradient>
      </View>
      <View className="flex w-full p-7">
        <H1 optionName="">Account Details</H1>
        <View className="flex w-full rounded-md bg-cfg">
          <View className="flex flex-row items-center p-4">
            <PencilLine className=" text-cpg" size="15px" />
            <TextInput
              onChangeText={(text) => setName(text)}
              value={name}
              placeholder="My Wallet"
              autoCapitalize={"none"}
              className="w-full pl-4 text-base font-il text-cpg"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </View>
          <Hrule />
          <View className="flex flex-row items-center p-4">
            <Banknote className=" text-cpg" size="15px" />
            <Text className="w-full pl-4 text-base font-il text-cpg">
              {currency}
            </Text>
          </View>
          <Hrule />
          <View className="flex flex-row items-center p-4">
            <PiggyBank className=" text-cpg" size="15px" />
            <TextInput
              onChangeText={(text) => setBal(text)}
              value={bal}
              placeholder="0"
              autoCapitalize={"none"}
              className="w-full pl-4 text-base font-il text-cpg"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          </View>
          <Hrule />
          <View className="flex flex-row items-center p-4">
            <Palette className=" text-cpg" size="15px" />
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="absolute bg-cprimary rounded-lg bottom-8 right-8 w-[72px] h-[72px] flex justify-center items-center"
        onPress={() => createAccount()}
      >
        <Check className="text-white" size="42px" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default NewAcc;
