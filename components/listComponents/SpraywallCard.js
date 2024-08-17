import { View, Pressable, Image } from "react-native";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { colors } from "../../utils/styles";

const SpraywallCard = ({
  spraywall,
  index,
  handleSpraywallPress,
  highlight,
}) => {
  const { spraywallIndex } = useSelector((state) => state.spraywallReducer);
  console.log("spraywall card id:", spraywall.id);

  return (
    <Pressable
      style={{
        height: "100%",
        aspectRatio: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      key={spraywall.id}
      onPress={() => handleSpraywallPress({ spraywall, index })}
    >
      <View
        style={{
          height: "110%",
          aspectRatio: 1,
          position: "absolute",
          borderRadius: 2,
          backgroundColor: colors.primaryLight,
          borderWidth: highlight ? 2 : 0,
          borderColor:
            highlight && index === spraywallIndex
              ? colors.primary
              : colors.primaryLight,
        }}
      />
      <Image
        source={{ uri: spraywall.url }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 2,
          opacity: !highlight ? 1 : index === spraywallIndex ? 1 : 0.8,
        }}
      />
    </Pressable>
  );
};

export default memo(
  SpraywallCard,
  (prevProps, nextProps) => prevProps.spraywall.id === nextProps.spraywall.id
);
