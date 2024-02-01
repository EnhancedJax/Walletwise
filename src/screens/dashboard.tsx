import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { Bolt, Plus, Utensils } from "lucide-react-native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { testAccounts, testEntries, testCategories } from "./data.js";

import H1 from "../components/h1";
import AccountArray from "../components/accountArray";

function Dashboard({ navigation }: { navigation: any }) {
  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View className="sticky flex flex-row items-center justify-between w-full p-8 bg-cfg dark:bg-dfg rounded-b-md">
        <Text className="text-2xl font-ib">
          Wallet<Text className="text-cprimary">Wise</Text>
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => navigation.navigate("Details")}
        >
          <Bolt className="text-cpg font-il" size="22px" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center w-full">
        <AccountArray accountObj={testAccounts} />
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

export default Dashboard;
