import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const H1 = ({
  children,
  optionName = "",
  optionhref = "\\",
}: {
  children: React.ReactNode;
  optionhref?: string;
  optionName?: string;
}) => {
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
};

export default H1;
