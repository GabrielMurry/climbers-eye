import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronRightIcon } from "react-native-heroicons/outline";

type SectionCardProps = {
  icon: React.JSX.Element;
  title: string;
  data?: number;
  onPress: () => void;
};

const SectionCard: React.FC<SectionCardProps> = ({
  icon,
  title,
  data,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 60,
        alignItems: "center",
        flexDirection: "row",
      }}
      onPress={onPress}
    >
      <View style={{ width: 30 }}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>{title}</Text>
      </View>
      <View
        style={{
          width: 75,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>{data}</Text>
      </View>
      <View
        style={{
          width: 50,
          alignItems: "center",
        }}
      >
        <ChevronRightIcon color={"black"} size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default SectionCard;
