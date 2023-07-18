import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import {
  ArrowUpOnSquareIcon,
  CameraIcon,
  PhotoIcon,
} from "react-native-heroicons/outline";

const ModalAddNewBoulder = ({
  isModalVisible,
  setIsModalVisible,
  handleCameraPressed,
  handleDefaultImagePressed,
  handleUploadImagePressed,
}) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          {/* Add modal content here */}
          <View style={styles.displayContainer}>
            <View style={styles.columnContainer}>
              {/* Upload button (text) */}
              <Pressable
                style={styles.buttonTextSmall}
                onPress={handleUploadImagePressed}
              >
                <Text style={{ marginRight: 20, fontWeight: "bold" }}>
                  Upload
                </Text>
              </Pressable>
              {/* Camera button (text) */}
              <Pressable
                style={styles.buttonTextSmall}
                onPress={handleCameraPressed}
              >
                <Text style={{ marginRight: 20, fontWeight: "bold" }}>
                  Camera
                </Text>
              </Pressable>
              {/* Default Image button (text) */}
              <Pressable
                style={styles.buttonTextBig}
                onPress={handleDefaultImagePressed}
              >
                <Text style={{ marginRight: 20, fontWeight: "bold" }}>
                  Default Image
                </Text>
              </Pressable>
            </View>
            <View style={styles.columnContainer}>
              {/* Upload button (icon) */}
              <Pressable
                style={styles.buttonContainerIcon}
                onPress={handleUploadImagePressed}
              >
                <View style={styles.buttonIconSmall}>
                  <ArrowUpOnSquareIcon size={20} color={"rgb(0, 122, 255)"} />
                </View>
              </Pressable>
              {/* Camera button (icon) */}
              <Pressable
                style={styles.buttonContainerIcon}
                onPress={handleCameraPressed}
              >
                <View style={styles.buttonIconSmall}>
                  <CameraIcon size={20} color={"rgb(0, 122, 255)"} />
                </View>
              </Pressable>
              {/* Image Default button (icon) */}
              <Pressable
                style={styles.buttonContainerIcon}
                onPress={handleDefaultImagePressed}
              >
                <View style={styles.buttonIconBig}>
                  <PhotoIcon size={25} color={"white"} />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalAddNewBoulder;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  modalContent: {
    flex: 1,
  },
  displayContainer: {
    width: "100%",
    height: 250,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 35,
    flexDirection: "row",
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
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
