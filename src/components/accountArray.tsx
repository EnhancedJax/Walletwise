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

interface AccountCardProps {
  isClicked: boolean;
  onClick: () => void;
  accountItem: any;
  onRemove: () => void;
}

function AccountCard({
  isClicked,
  onClick,
  accountItem,
  onRemove,
}: AccountCardProps) {
  const [edit, setEdit] = useState(false);

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={onClick}
        onLongPress={() => setEdit(!edit)}
      >
        <LinearGradient
          colors={[accountItem.color1, accountItem.color2]}
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
      <TouchableWithoutFeedback onPress={onRemove}>
        <View
          className={`absolute flex items-center justify-center w-8 h-8 rounded-lg bg-cprimary right-2 ${
            edit ? "block" : "hidden"
          }`}
        >
          <Edit className="text-white" size="20px" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const AccountArray = ({ accountObj }: { accountObj: any }) => {
  const [clickStates, setClickStates] = useState(
    accountObj ? new Array(accountObj.length).fill(false) : []
  );

  useEffect(() => {
    setClickStates(accountObj ? new Array(accountObj.length).fill(false) : []);
  }, [accountObj]);

  const handleClick = (index: number) => {
    setClickStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleRemove = (index: number) => {
    console.log(`Removing ${index}`);
  };

  return (
    <ScrollView
      horizontal
      className="p-8 "
      showsHorizontalScrollIndicator={false}
    >
      {accountObj.map((account: any, index: number) => (
        <AccountCard
          key={index}
          isClicked={clickStates[index]}
          onClick={() => handleClick(index)}
          accountItem={accountObj[index]}
          onRemove={() => handleRemove(index)}
        />
      ))}

      <View className="flex justify-center h-[136px] mr-20">
        <Link href="/newaccount" asChild>
          <TouchableOpacity className="flex items-center justify-center p-4 bg-csub w-[39px] h-[39px] rounded-lg">
            <Plus className="text-cfg" size="20px" />
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
};

export default AccountArray;
