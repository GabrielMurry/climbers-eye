import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";

const GymAndOptions = ({ gym, setIsModalVisible }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          width: "90%",
        }}
        numberOfLines={1}
      >
        {gym.name}
      </Text>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <EllipsisHorizontalIcon size={35} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(
  GymAndOptions,
  (prevProps, nextProps) => prevProps.gym.id === nextProps.gym.id
);
