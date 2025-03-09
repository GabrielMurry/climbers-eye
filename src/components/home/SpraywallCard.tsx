import { View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import React, { memo, useEffect } from "react";
import { colors } from "../../utils/styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import { Spraywall } from "../../utils/types/spraywall";
import { setSelectedSpraywallId } from "../../redux/features/spraywall/spraywallSlice";

type SpraywallCardProps = {
  spraywallCard: Spraywall;
  highlight: boolean;
};

const SpraywallCard: React.FC<SpraywallCardProps> = ({
  spraywallCard,
  highlight,
}) => {
  const dispatch = useAppDispatch();
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    console.error("Selected spray wall not found.");
    return <Text>Selected spray wall not found.</Text>;
  }

  console.log(spraywall.url);

  return (
    <Pressable
      style={{
        height: "100%",
        aspectRatio: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      key={spraywallCard.id}
      onPress={() => dispatch(setSelectedSpraywallId(spraywallCard.id))}
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
            highlight && spraywallCard.id === spraywall.id
              ? colors.primary
              : colors.primaryLight,
        }}
      />
      <Image
        source={{ uri: spraywallCard.url }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 2,
          opacity: !highlight ? 1 : spraywallCard.id === spraywall.id ? 1 : 0.8,
        }}
      />
    </Pressable>
  );
};

export default SpraywallCard;
