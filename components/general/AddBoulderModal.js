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

const AddBoulderModal = ({ isVisible, onClose, navigation }) => {
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );

  const handleCameraPressed = () => {
    onClose();
    navigation.navigate("Camera", { screen: "EditBoulder" });
  };

  const handleDefaultImagePressed = () => {
    onClose();
    navigation.navigate("EditBoulder", {
      image: {
        url: spraywalls[spraywallIndex].url,
        width: spraywalls[spraywallIndex].width,
        height: spraywalls[spraywallIndex].height,
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
        navigation.navigate("EditBoulder", {
          image: {
            url: "data:image/png;base64," + result.assets[0].base64,
            width: width,
            height: height,
          },
        });
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
            <View
              style={{
                height: "10%",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Add Boulder
              </Text>
            </View>
            {/* image */}
            <View
              style={{
                width: "100%",
                height: "65%",
                padding: 10,
              }}
            >
              <Image
                source={{ uri: spraywalls[spraywallIndex].url }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
            {/* buttons */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
                height: "25%",
              }}
            >
              {/* camera */}
              <TouchableOpacity
                style={{
                  height: "90%",
                  aspectRatio: 1,
                  backgroundColor: colors.primaryLight,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
                onPress={handleCameraPressed}
              >
                <CameraIcon size={25} color={colors.primary} />
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Camera
                </Text>
              </TouchableOpacity>
              {/* default image */}
              <TouchableOpacity
                style={{
                  height: "90%",
                  aspectRatio: 1,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  backgroundColor: colors.primaryLight,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
                onPress={handleDefaultImagePressed}
              >
                <PhotoIcon size={25} color={colors.primary} />
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Default Image
                </Text>
              </TouchableOpacity>
              {/* upload */}
              <TouchableOpacity
                style={{
                  height: "90%",
                  aspectRatio: 1,
                  backgroundColor: colors.primaryLight,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
                onPress={handleUploadImagePressed}
              >
                <ArrowUpOnSquareIcon size={25} color={colors.primary} />
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddBoulderModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  displayContainer: {
    width: "100%",
    height: 450,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    borderRadius: 10,
    // paddingBottom: 35,
    position: "absolute", //Here is the trick
    bottom: 90, //Here is the trick
  },
  columnContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  buttonTextSmall: {
    width: 125,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonTextBig: {
    width: 125,
    height: 60,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonContainerIcon: {
    width: "100%",
    alignItems: "center",
  },
  buttonIconSmall: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    // shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  buttonIconBig: {
    width: 60,
    height: 60,
    backgroundColor: "rgb(0, 122, 255)",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    // shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
});
