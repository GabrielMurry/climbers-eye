import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";

const ModalEditPreview = ({
  image,
  imageScaleDownFactor,
  modalVisible,
  setModalVisible,
  navigation,
}) => {
  const handleNext = () => {
    navigation.navigate("BoulderQuestionnaire");
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView(image, imageScaleDownFactor)}>
          <Text style={styles.modalTitleText}>Preview</Text>
          <Image
            source={{ uri: image.uri }}
            style={styles.modalImage(image, imageScaleDownFactor)}
            resizeMode="contain"
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.modalButton("rgba(15, 10, 222, 0.2)")}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton("rgba(15, 10, 222, 1)")}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditPreview;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: (image, imageScaleDownFactor) => ({
    // margin: 20,
    backgroundColor: "lightblue",
    borderRadius: 20,
    width: image.width / imageScaleDownFactor,
    height: image.height / (imageScaleDownFactor - 0.5),
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }),
  modalTitleText: {
    fontSize: 28,
  },
  modalImage: (image, imageScaleDownFactor) => ({
    width: image.width / (imageScaleDownFactor - 1),
    height: image.width / (imageScaleDownFactor - 1),
  }),
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  modalButton: (col) => ({
    width: 90,
    height: 45,
    backgroundColor: col,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  }),
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
