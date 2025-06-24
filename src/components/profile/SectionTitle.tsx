import { View, Text } from "react-native";
import React from "react";
import { padding } from "../../utils/styles";

type SectionTitleProps = {
  title: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <View
      style={{
        paddingHorizontal: padding.general,
        marginTop: 10,
        flexDirection: "row",
        height: 30,
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
    </View>
  );
};

export default SectionTitle;
