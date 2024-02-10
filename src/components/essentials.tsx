import { Link } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
} from "react-native";

export const TouchableComponent: React.ComponentType<
  TouchableOpacityProps | TouchableNativeFeedbackProps
> = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

export function H1({
  children,
  optionName = "",
  optionhref = "\\",
}: {
  children: React.ReactNode;
  optionhref?: string;
  optionName?: string;
}) {
  if (optionhref == "\\") {
    return (
      <View className="flex flex-row items-center justify-between mb-4 ">
        <Text className="text-lg text-cpg dark:text-dpg font-ib">
          {children}
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Text className="text-right text-cpg dark:text-dpg font-il">
            {optionName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View className="flex flex-row items-center justify-between mb-4 ">
        <Text className="text-lg text-cpg dark:text-dpg font-ib">
          {children}
        </Text>
        <Link href={optionhref} asChild>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Text className="text-right text-cpg dark:text-dpg font-il">
              {optionName}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }
}

export function OptionsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex w-full rounded-md bg-cfg dark:bg-dfg">
      {children}
    </View>
  );
}

export function OptionRow({ children }: { children: React.ReactNode }) {
  return <View className="flex flex-row items-center p-4">{children}</View>;
}

export function OptionRule() {
  return <View className="w-full h-1 bg-cbg dark:bg-dbg" />;
}
