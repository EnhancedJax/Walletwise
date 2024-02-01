import { View, Text, TouchableOpacity } from "react-native";

const H1 = ({
  children,
  optionName,
  onPress,
}: {
  children: React.ReactNode;
  optionName: string;
  onPress: () => void;
}) => {
  return (
    <View className="flex flex-row items-center justify-between mb-4 ">
      <Text className="text-lg text-cpg font-ib">{children}</Text>
      <TouchableOpacity
        onPress={onPress}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Text className="text-right text-cpg font-il">{optionName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default H1;
