import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Bolt, Plus, Utensils } from "lucide-react-native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

import { Link } from "expo-router";
import AccountArray from "../src/components/accountArray";
import { useData } from "../src/hooks/useData";
import { H1 } from "../src/components/essentials";
import { useEffect } from "react";

function Dashboard() {
  const { accounts, entries, categories } = useData();
  useEffect(() => console.log("update"), [accounts]);
  return (
    <SafeAreaView className="w-screen h-screen bg-cbg dark:bg-dbg">
      <View className="sticky flex flex-row items-center justify-between w-full bg-cfg dark:bg-dfg rounded-b-md p-7">
        <Text className="text-2xl font-ib">
          Wallet<Text className="text-cprimary dark:text-dprimary">Wise</Text>
        </Text>
        <Link href="/settings" asChild>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Bolt className="text-cpg dark:text-dpg font-il" size="22px" />
          </TouchableOpacity>
        </Link>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center w-full">
          <AccountArray accountObj={accounts} />
        </View>

        <View className="flex w-full p-7">
          <H1 optionName="details" optionhref="\details">
            Expenses
          </H1>
          <View className="flex w-full p-4 rounded-md bg-cfg dark:bg-dfg">
            <View className="flex flex-row items-center justify-between pb-2">
              <Text className="font-normal text-cpg dark:text-dpg font-il">
                $912{" "}
                <Text className="text-xs text-cpg dark:text-dpg font-il">
                  spent this period
                </Text>
              </Text>
              <Text>$1,693</Text>
            </View>
            <View className="flex w-full h-10 bg-csub dark:bg-dsub"></View>
          </View>
        </View>

        <View className="flex w-full p-7">
          <H1 optionName="view all" optionhref="\transactions">
            Transactions
          </H1>
          <View className="w-full rounded-md bg-cfg dark:bg-dfg">
            {entries.map((entry, index) => (
              <Entry key={index} entry={entry} />
            ))}
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
        <TouchableOpacity className="bg-cprimary dark:bg-dprimary absolute bottom-8 right-8 flex h-[72px] w-[72px] items-center justify-center rounded-lg">
          <Plus className="text-white" size="42px" />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const Entry = ({ entry }: { entry: any }) => {
  const { accounts, entries, categories } = useData();

  const formattedDate = format(entry.date, "dd/MM");
  var accString = "";
  if (entry.type == 2) {
    accString =
      accounts[entry.from_account].name +
      " -> " +
      accounts[entry.transfer_account].name;
  } else {
    accString = String("accounts[entry.from_account].name");
  }
  return (
    <View className="rounded-md">
      <TouchableNativeFeedback
        onPress={() => console.log("Entry clicked")}
        background={TouchableNativeFeedback.Ripple(
          "rgba(150,150,150,0.1)",
          true,
        )}
      >
        <View className="flex flex-row items-center justify-between w-full p-4">
          <View className="flex flex-row mr-4 shrink">
            <View
              className="mr-4 h-[32px] w-[32px] rounded-lg p-2"
              style={{ backgroundColor: "categories[entry.category].color" }}
            >
              <Utensils className="text-cpg dark:text-dpg" size="16px" />
            </View>
            <View>
              <Text className="text-base font-medium font-im">
                {String(entry.name)}
              </Text>
              <Text numberOfLines={1} className="w-2/3 text-sm font-il">
                {accString} ⋅ {formattedDate}
              </Text>
            </View>
          </View>
          <Text
            className={`font-im text-base ${
              entry.type == 0
                ? "text-cbalneg dark:text-dbalneg"
                : entry.type == 1
                  ? "text-cbalpos dark:text-dbalpos"
                  : "text-cpg dark:text-dpg2"
            }`}
          >
            {entry.type == 0 ? "-" : entry.type == 1 ? "+" : ""}$
            {String(entry.amount)}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default Dashboard;
