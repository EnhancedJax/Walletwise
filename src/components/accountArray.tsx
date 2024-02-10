import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Edit, Plus, X } from "lucide-react-native";
import { Link } from "expo-router";
import { Tables } from "../types/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AccountCardProps {
  isClicked: boolean;
  onClick: () => void;
  accountItem: any;
  onLongClick: () => void;
}

function AccountCard({
  isClicked,
  onClick,
  accountItem,
  onLongClick,
}: AccountCardProps) {
  return (
    <View>
      <TouchableWithoutFeedback onPress={onClick} onLongPress={onLongClick}>
        <LinearGradient
          colors={[accountItem.color1, accountItem.color2]}
          className={`mr-4 flex h-[136px] w-[136px] flex-col items-start justify-center rounded-lg p-4 ${
            isClicked ? "opacity-70" : ""
          }`}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text className="mb-2 text-white font-il">
            {String(accountItem.name)}
          </Text>
          <Text className="text-xl text-white font-isb">
            ${String(accountItem.balance)}
          </Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
}

const AccountArray = ({
  accountObj,
}: {
  accountObj: Record<number, Tables<"accounts">>;
}) => {
  const [clickStates, setClickStates] = useState(
    accountObj ? new Array(Object.keys(accountObj).length).fill(false) : []
  );
  useEffect(() => {
    setClickStates(
      accountObj ? new Array(Object.keys(accountObj).length).fill(false) : []
    );
  }, [accountObj]);
  const handleClick = async (index: number, id: number) => {
    setClickStates((prevStates) => {
      const allFalse = prevStates.every((state) => state === false);
      if (allFalse) {
        return prevStates.map((_, i) => (i === index ? false : true));
      } else if (prevStates[index] === false) {
        return prevStates.map(() => false);
      } else {
        return prevStates.map((_, i) => (i === index ? false : true));
      }
    });
    try {
      console.log(`Setting ${id.toString()}`);
      await AsyncStorage.setItem("selectedAccount", id.toString());
      // console.log(await AsyncStorage.getItem("selectedAccount"));
    } catch (e) {
      // saving error
      console.error(e);
    }
  };
  const handleLongClick = (index: number, id: number) => {
    console.log(`Removing ${id}`);
  };
  return (
    <ScrollView
      horizontal
      className="p-8 "
      showsHorizontalScrollIndicator={false}
    >
      {Object.keys(accountObj).map((id: any, index: number) => (
        <AccountCard
          key={index}
          isClicked={clickStates[index]}
          onClick={() => handleClick(index, id)}
          accountItem={accountObj[id]}
          onLongClick={() => handleLongClick(index, id)}
        />
      ))}
      <View className="mr-20 flex h-[136px] justify-center">
        <Link href="/newaccount" asChild>
          <TouchableOpacity className="bg-csub dark:bg-dsub flex h-[39px] w-[39px] items-center justify-center rounded-lg p-4">
            <Plus className="text-cfg dark:text-dfg" size="20px" />
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
};

export default AccountArray;
