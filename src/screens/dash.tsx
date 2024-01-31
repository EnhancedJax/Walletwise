import { Pressable, SafeAreaView, ScrollView, View, Text } from "react-native";
import { Navigation, Bolt, Plus, Utensils } from "lucide-react-native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { testAccounts, testEntries, testCategories } from "./data.js";

function Dash() {
  return (
    <ScrollView>
      <View className="flex flex-row items-center justify-between w-full p-8">
        <Text className="text-2xl font-ib">
          Wallet<Text className="text-cprimary">Wise</Text>
        </Text>
        <Bolt className="text-cpg font-il" size="22px" />
      </View>

      <View className="flex flex-row items-center w-full p-8">
        <AccountCard object={testAccounts[0]} />
        <AccountCard object={testAccounts[1]} />
        <View className="flex items-center justify-center p-4 bg-csub w-[39px] h-[39px] rounded-lg">
          <Plus className="text-cfg" size="20px" />
        </View>
      </View>

      <View className="flex w-full p-8">
        <H1 optionName="details">Expenses</H1>
        <View className="flex w-full p-4 rounded-md bg-cfg">
          <View className="flex flex-row items-center justify-between pb-2">
            <Text className="font-normal text-cpg font-il">
              $912{" "}
              <Text className="text-xs text-cpg font-il">
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
          <Entry object={testEntries[0]}></Entry>
          <Entry object={testEntries[1]}></Entry>
          <Entry object={testEntries[2]}></Entry>
          <Entry object={testEntries[0]}></Entry>
          <Entry object={testEntries[0]}></Entry>
          <Entry object={testEntries[0]}></Entry>
          <Entry object={testEntries[0]}></Entry>
          <Entry object={testEntries[0]}></Entry>
        </View>
      </View>
    </ScrollView>
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
      <Text className="mb-2 text-white font-il">{String(object.name)}</Text>
      <Text className="text-xl text-white font-isb">
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
      <Text className="text-lg text-cpg font-ib">{children}</Text>
      <Text className="text-right text-cpg font-il">{optionName}</Text>
    </View>
  );
};

const Entry = ({ object }: { object: any }) => {
  const formattedDate = format(object.date, "dd/MM");
  var accString = "";
  if (object.type == 2) {
    accString =
      testAccounts[object.account[0]].name +
      " -> " +
      testAccounts[object.account[1]].name;
  } else {
    accString = String(object.account);
  }
  return (
    <View className="flex flex-row items-center justify-between p-4">
      <View className="flex flex-row">
        <View
          className="p-2 mr-4 rounded-lg w-[32px] h-[32px]"
          style={{ backgroundColor: object.category.color }}
        >
          <Utensils className="text-cpg" size="16px" />
        </View>
        <View>
          <Text className="text-base font-medium font-im">
            {String(object.name)}
          </Text>
          <Text className="text-sm font-il">
            {accString} ⋅ {formattedDate}
          </Text>
        </View>
      </View>
      <Text
        className={`text-base font-im ${
          object.type == 0
            ? "text-cbalneg"
            : object.type == 1
            ? "text-cbalpos"
            : "text-cpg2"
        }`}
      >
        {object.type == 0 ? "-" : object.type == 1 ? "+" : ""}$
        {String(object.amount)}
      </Text>
    </View>
  );
};

export default Dash;
