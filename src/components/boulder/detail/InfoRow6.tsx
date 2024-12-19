import { View, Text } from "react-native";
import React from "react";
import { Boulder } from "../../../utils/types/boulder";

type InfoRow6Props = {
  boulder: Boulder;
};

const InfoRow6: React.FC<InfoRow6Props> = ({ boulder }) => {
  return (
    <View
      style={{
        height: 50,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "gray" }}>{boulder.date}</Text>
    </View>
  );
};

export default InfoRow6;
