import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import {
  ArrowUpOnSquareIcon,
  CameraIcon,
  PhotoIcon,
} from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { colors } from "../../utils/styles";
import ModalButton from "./ModalButton";

const CustomModal = ({ isVisible, onClose, navigation, isBoulder = true }) => {
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );

  const handleCameraPressed = () => {
    onClose();
    const nextScreen = isBoulder ? "EditBoulder" : "AddNewSprayWall";
    navigation.navigate("CameraStack", {
      screen: "Camera",
      params: { nextScreen: nextScreen },
    });
  };

  const handleDefaultImagePressed = () => {
    onClose();
    navigation.navigate("BoulderStack", {
      screen: "EditBoulder",
      params: {
        image: {
          url: spraywalls[spraywallIndex]?.url,
          width: spraywalls[spraywallIndex]?.width,
          height: spraywalls[spraywallIndex]?.height,
        },
      },
    });
  };

  const handleUploadImagePressed = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result && !result.canceled) {
      Image.getSize(result.assets[0].uri, (width, height) => {
        onClose();
        if (isBoulder) {
          navigation.navigate("BoulderStack", {
            screen: "EditBoulder",
            params: {
              image: {
                url: "data:image/png;base64," + result.assets[0].base64,
                width: width,
                height: height,
              },
            },
          });
        } else {
          navigation.navigate("SpraywallStack", {
            screen: "AddNewSprayWall",
            params: {
              image: {
                url: "data:image/png;base64," + result.assets[0].base64,
                width: width,
                height: height,
              },
            },
          });
        }
      });
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose}
      >
        <BlurView style={styles.modalContent} intensity={25}>
          {/* Add modal content here */}
          <View style={styles.displayContainer}>
            {/* title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {isBoulder ? "Add Boulder" : "Add New Spray Wall"}
              </Text>
            </View>
            {/* image */}
            {isBoulder ? (
              <Image
                source={{ uri: spraywalls[spraywallIndex]?.url }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : null}
            {/* buttons */}
            <View style={styles.buttonContainer}>
              <ModalButton
                onPress={handleCameraPressed}
                icon={CameraIcon}
                label={"Camera"}
                colors={colors}
              />
              {isBoulder ? (
                <ModalButton
                  onPress={handleDefaultImagePressed}
                  icon={PhotoIcon}
                  label={"Default Image"}
                  colors={colors}
                  isEmphasized={true}
                />
              ) : null}
              <ModalButton
                onPress={handleUploadImagePressed}
                icon={ArrowUpOnSquareIcon}
                label={"Upload"}
                colors={colors}
              />
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  displayContainer: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    position: "absolute", //Here is the trick
    bottom: 90, //Here is the trick
    alignSelf: "center",
  },
  titleContainer: {
    padding: 10,
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "bold" },
  image: {
    width: "100%",
    height: 225,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    width: "100%",
    gap: 10,
  },
});
