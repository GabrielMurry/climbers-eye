import { View, Text, Image } from "react-native";
import React from "react";
import { padding } from "../../utils/styles";
import { Spraywall } from "../../utils/types/spraywall";
import { pad } from "lodash";

type SelectedWallProps = {
  spraywall: Spraywall;
};

const SelectedWall: React.FC<SelectedWallProps> = ({ spraywall }) => {
  return (
    <View
      style={{
        paddingHorizontal: padding.general,
        paddingTop: padding.general,
        gap: padding.general,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: spraywall.url }}
          style={{ width: "100%", aspectRatio: 1, borderRadius: 20 }}
        />
      </View>
      <Text style={{ fontSize: 26 }}>{spraywall.name}</Text>
    </View>
  );
};

export default SelectedWall;
