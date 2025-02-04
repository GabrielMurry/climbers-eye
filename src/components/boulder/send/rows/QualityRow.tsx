import { View, Text } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/outline";

type QualityRowProps = {
  value: number;
  setValue: (val: number) => void;
};

const QualityRow: React.FC<QualityRowProps> = ({ value, setValue }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          flex: 1,
          fontWeight: "bold",
          marginRight: 10,
          fontSize: 16,
          color: "#333",
        }}
      >
        Quality:
      </Text>
      <View
        style={{
          flexDirection: "row",
          flex: 2,
        }}
      >
        <StarIcon
          size={35}
          fill={value >= 1 ? "gold" : "lightgray"}
          color={value >= 1 ? "gold" : "lightgray"}
          onPress={() => setValue(1)}
        />
        <StarIcon
          size={35}
          fill={value >= 2 ? "gold" : "lightgray"}
          color={value >= 2 ? "gold" : "lightgray"}
          onPress={() => setValue(2)}
        />
        <StarIcon
          size={35}
          fill={value === 3 ? "gold" : "lightgray"}
          color={value === 3 ? "gold" : "lightgray"}
          onPress={() => setValue(3)}
        />
      </View>
    </View>
  );
};

export default QualityRow;
