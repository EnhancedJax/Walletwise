import { Pressable, SafeAreaView, ScrollView, View, Text } from "react-native";
import { Navigation, Bolt, Plus } from "lucide-react-native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

function Dash() {
  const testEntry = {
    name: "My McDonald's",
    amount: 500,
    date: new Date(),
    category: "Food & Drinks",
    account: "Cash",
    type: 0, //0 = expense, 1 = income, 2 = transfer
  };

  const testAccount = {
    name: "Cash",
    balance: 6942.01,
    gradient: ["#3385ff", "#4ECAFF"],
  };

  return (
    <SafeAreaView className="w-screen h-screen bg-cbg">
      <View className="flex flex-row items-center justify-between w-full p-8">
        <Text className="text-2xl font-bold font-[Inter]">
          Wallet<Text className="text-cprimary">Wise</Text>
        </Text>
        <Bolt className="text-cpg font-[Inter]" size="22px" />
      </View>

      <View className="flex flex-row items-center w-full p-8">
        <AccountCard object={testAccount} />
        <AccountCard object={testAccount} />
        <View className="flex items-center justify-center p-4 bg-csub w-[39px] h-[39px] rounded-full">
          <Plus className="text-cfg" size="20px" />
        </View>
      </View>

      <View className="flex w-full p-8">
        <H1 optionName="details">Expenses</H1>
        <View className="flex w-full p-4 rounded-md bg-cfg">
          <View className="flex flex-row items-center justify-between pb-2">
            <Text className="font-normal text-cpg font-[Inter]">
              $912{" "}
              <Text className="text-xs text-cpg font-[Inter]">
                spent this period
              </Text>
            </Text>
            <Text>$1,693</Text>
          </View>
          <View className="flex w-full h-10 bg-csub"></View>
        </View>
      </View>

      <View className="flex w-full p-8">
        <H1 optionName="view all">Transactions</H1>
        <View className="w-full rounded-md bg-cfg">
          <Entry object={testEntry}></Entry>
          <Entry object={testEntry}></Entry>
        </View>
      </View>
    </SafeAreaView>
  );
}

const AccountCard = ({ object }: { object: any }) => {
  return (
    <LinearGradient
      colors={object.gradient}
      className="flex flex-col items-start justify-center p-4 rounded-lg w-[136px] h-[136px] mr-4"
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <Text className="mb-2 font-light text-white font-[Inter]">
        {String(object.name)}
      </Text>
      <Text className="text-xl font-semibold text-white font-[Inter]">
        ${String(object.balance)}
      </Text>
    </LinearGradient>
  );
};

const H1 = ({
  children,
  optionName,
}: {
  children: React.ReactNode;
  optionName: string;
}) => {
  return (
    <View className="flex flex-row items-center justify-between mb-4 ">
      <Text className="text-lg font-bold text-cpg font-[Inter]">
        {children}
      </Text>
      <Text className="font-light text-right text-cpg font-[Inter]2">
        {optionName}
      </Text>
    </View>
  );
};

const Entry = ({ object }: { object: any }) => {
  const formattedDate = format(object.date, "dd MMM HH:mm");
  return (
    <View className="flex flex-row items-center justify-between w-full p-3 border-b rounded-xl border-cborder">
      <View className="flex flex-row items-center justify-start">
        <View className="flex items-center justify-start p-2 mr-3 rounded-lg bg-rose-500">
          <View className="w-4 h-4 bg-blue-500" />
        </View>
        <View className="inline-flex flex-col items-start justify-center">
          <Text className="mb-1 text-base font-semibold text-neutral-800">
            {String(object.name)}
          </Text>
          <Text className="text-xs font-light text-neutral-800 ">
            <Text className="text-xs font-light text-neutral-800">
              {String(object.account)} ⋅ {formattedDate}
            </Text>
          </Text>
        </View>
      </View>
      <Text className="text-base font-medium text-red-500 ">
        ${String(object.amount)}
      </Text>
    </View>
  );
};

export default Dash;
