import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Touchable,
  TouchableNativeFeedback,
} from "react-native";
import { Bolt, Plus, Utensils } from "lucide-react-native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

import { Link } from "expo-router";
import H1 from "../src/components/h1";
import AccountArray from "../src/components/accountArray";
import { testAccounts, testCategories, testEntries } from "../src/data.js";
import { StatusBar } from "expo-status-bar";

function Dashboard() {
  return (
    <SafeAreaView className="bg-cbg h-screen w-screen">
      <View className="bg-cfg dark:bg-dfg sticky flex w-full flex-row items-center justify-between rounded-b-md p-7">
        <Text className="font-ib text-2xl">
          Wallet<Text className="text-cprimary">Wise</Text>
        </Text>
        <Link href="/settings" asChild>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Bolt className="text-cpg font-il" size="22px" />
          </TouchableOpacity>
        </Link>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex w-full flex-row items-center">
          <AccountArray accountObj={testAccounts} />
        </View>

        <View className="flex w-full p-7">
          <H1 optionName="details">Expenses</H1>
          <View className="bg-cfg flex w-full rounded-md p-4">
            <View className="flex flex-row items-center justify-between pb-2">
              <Text className="text-cpg font-il font-normal">
                $912{" "}
                <Text className="text-cpg font-il text-xs">
                  spent this period
                </Text>
              </Text>
              <Text>$1,693</Text>
            </View>
            <View className="bg-csub flex h-10 w-full"></View>
          </View>
        </View>

        <View className="flex w-full p-7">
          <H1 optionName="view all">Transactions</H1>
          <View className="bg-cfg w-full rounded-md">
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

      <LinearGradient
        className="absolute bottom-0 h-[72px] w-full "
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <Link href="/newentry" asChild>
        <TouchableOpacity className="bg-cprimary absolute bottom-8 right-8 flex h-[72px] w-[72px] items-center justify-center rounded-lg">
          <Plus className="text-white" size="42px" />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
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
    <View className="rounded-md ">
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          "rgba(150,150,150,0.1)",
          true,
        )}
      >
        <View className="flex flex-row items-center justify-between p-4">
          <View className="flex flex-row">
            <View
              className="mr-4 h-[32px] w-[32px] rounded-lg p-2"
              style={{ backgroundColor: object.category.color }}
            >
              <Utensils className="text-cpg" size="16px" />
            </View>
            <View>
              <Text className="font-im text-base font-medium">
                {String(object.name)}
              </Text>
              <Text className="font-il text-sm">
                {accString} ⋅ {formattedDate}
              </Text>
            </View>
          </View>
          <Text
            className={`font-im text-base ${
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
      </TouchableNativeFeedback>
    </View>
  );
};

export default Dashboard;
