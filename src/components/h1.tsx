import { View, Text } from "react-native";

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

export default H1;
