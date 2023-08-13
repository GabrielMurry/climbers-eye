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
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Add Boulder
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "rgba(30, 144, 255, 1)",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={handleCameraPressed}
                >
                  <CameraIcon size={25} color={"white"} />
                  <Text style={{ color: "white" }}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "rgba(30, 144, 255, 1)",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={handleDefaultImagePressed}
                >
                  <PhotoIcon size={25} color={"white"} />
                  <Text style={{ color: "white" }}>Default Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "rgba(30, 144, 255, 1)",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={handleUploadImagePressed}
                >
                  <ArrowUpOnSquareIcon size={25} color={"white"} />
                  <Text style={{ color: "white" }}>Upload</Text>
                </TouchableOpacity>
              </View>
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
  },
  displayContainer: {
    width: "100%",
    height: 225,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    // paddingBottom: 35,
    flexDirection: "row",
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
