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

function Dashboard() {
  const { accounts, entries, categories } = useData();
  return (
    <SafeAreaView className="bg-cbg dark:bg-dbg h-screen w-screen">
      <View className="bg-cfg dark:bg-dfg sticky flex w-full flex-row items-center justify-between rounded-b-md p-7">
        <Text className="font-ib text-2xl">
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
        <View className="flex w-full flex-row items-center">
          <AccountArray accountObj={accounts} />
        </View>

        <View className="flex w-full p-7">
          <H1 optionName="details" optionhref="\details">
            Expenses
          </H1>
          <View className="bg-cfg dark:bg-dfg flex w-full rounded-md p-4">
            <View className="flex flex-row items-center justify-between pb-2">
              <Text className="text-cpg dark:text-dpg font-il font-normal">
                $912{" "}
                <Text className="text-cpg dark:text-dpg font-il text-xs">
                  spent this period
                </Text>
              </Text>
              <Text>$1,693</Text>
            </View>
            <View className="bg-csub dark:bg-dsub flex h-10 w-full"></View>
          </View>
        </View>

        <View className="flex w-full p-7">
          <H1 optionName="view all" optionhref="\transactions">
            Transactions
          </H1>
          <View className="bg-cfg dark:bg-dfg w-full rounded-md">
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
  var accString = "Solve later";
  if (entry.type == 2) {
    accString =
      accounts[entry.from_account]?.name +
      " -> " +
      accounts[entry.transfer_account]?.name;
  } else {
    accString = accounts[entry.from_account]?.name;
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
        <View className="flex w-full flex-row items-center justify-between p-4">
          <View className="mr-4 flex shrink flex-row">
            <View
              className="mr-4 h-[32px] w-[32px] rounded-lg p-2"
              style={{ backgroundColor: "categories[entry.category].color" }}
            >
              <Utensils className="text-cpg dark:text-dpg" size="16px" />
            </View>
            <View>
              <Text className="font-im text-base font-medium">
                {String(entry.name ? entry.name : entry.category)}
              </Text>
              <Text numberOfLines={1} className="font-il text-sm">
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
