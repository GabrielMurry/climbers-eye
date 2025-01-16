import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  ArrowUpOnSquareIcon,
  CameraIcon,
  PhotoIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import * as ImagePicker from "expo-image-picker";
import ModalButton from "./ModalButton";
import { colors } from "../../utils/styles";
import { getImageFromLibrary } from "../../utils/imageLibrary";

const isBoulder = true;

const ModalButtons = () => {
  const navigation = useNavigation();

  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    console.error("Selected spray wall not found.");
    return <Text>Selected spray wall not found.</Text>;
  }

  const handleCameraPressed = () => {
    navigation.goBack();
    navigation.navigate("CameraStack", { screen: "Camera" });
  };

  const handleDefaultImagePressed = () => {
    navigation.goBack();
    const image = {
      url: spraywall.url,
      width: spraywall.width,
      height: spraywall.height,
    };
    navigation.navigate("BoulderStack", {
      screen: "EditBoulder",
      params: { image },
    });
  };

  const handleUploadImagePressed = async () => {
    let result = await getImageFromLibrary();
    if (result.canceled) return;
    const image = result.assets[0];
    navigation.goBack();
    if (isBoulder) {
      navigation.navigate("BoulderStack", {
        screen: "EditBoulder",
        params: {
          image: {
            url: image.uri,
            width: image.width,
            height: image.height,
          },
        },
      });
    } else {
      navigation.navigate("SpraywallStack", {
        screen: "AddNewSprayWall",
        params: {
          image: {
            url: image.uri,
            width: image.width,
            height: image.height,
          },
        },
      });
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <ModalButton
        onPress={handleCameraPressed}
        icon={<CameraIcon size={25} color={colors.primary} />}
        label={"Camera"}
      />
      {isBoulder ? (
        <ModalButton
          onPress={handleDefaultImagePressed}
          icon={<PhotoIcon size={25} color={colors.primary} />}
          label={"Default Image"}
          isEmphasized={true}
        />
      ) : null}
      <ModalButton
        onPress={handleUploadImagePressed}
        icon={<ArrowUpOnSquareIcon size={25} color={colors.primary} />}
        label={"Upload"}
      />
    </View>
  );
};

export default ModalButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
});
