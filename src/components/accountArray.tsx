import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Plus } from "lucide-react-native";

interface AccountCardProps {
  isClicked: boolean;
  onClick: () => void;
  accountItem: any;
}

const AccountCard: React.FC<AccountCardProps> = ({
  isClicked,
  onClick,
  accountItem,
}) => (
  <TouchableWithoutFeedback onPress={onClick}>
    <LinearGradient
      colors={accountItem.gradient}
      className={`flex flex-col items-start justify-center p-4 rounded-lg w-[136px] h-[136px] mr-4 ${
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
);

const AccountArray = ({ accountObj }: { accountObj: any }) => {
  const [clickStates, setClickStates] = useState(
    new Array(accountObj.length).fill(false)
  );

  const handleClick = (index: number) => {
    setClickStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <ScrollView horizontal className="p-8">
      {accountObj.map((account: any, index: number) => (
        <AccountCard
          key={index}
          isClicked={clickStates[index]}
          onClick={() => handleClick(index)}
          accountItem={accountObj[index]}
        />
      ))}

      <View className="flex items-center justify-center p-4 bg-csub w-[39px] h-[39px] rounded-lg">
        <Plus className="text-cfg" size="20px" />
      </View>
    </ScrollView>
  );
};

export default AccountArray;
