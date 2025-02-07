import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectSpraywall } from "../../../redux/features/spraywall/spraywallSelectors";
import { colors } from "../../../utils/styles";
import ModalTitle from "./ModalTitle";
import ModalButtons from "./ModalButtons";

const isBoulder = true;

const ModalContent = () => {
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    console.error("Selected spray wall not found.");
    return <Text>Selected spray wall not found.</Text>;
  }

  return (
    <View style={styles.contentContainer}>
      <ModalTitle />
      {isBoulder ? (
        <Image
          source={{ uri: spraywall?.url }}
          style={{ width: "100%", height: 225 }}
          // resizeMode="contain"
          contentFit="contain"
          cachePolicy={"memory-disk"}
        />
      ) : null}
      <ModalButtons />
    </View>
  );
};

export default ModalContent;

const styles = StyleSheet.create({
  contentContainer: {
    width: "90%",
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
