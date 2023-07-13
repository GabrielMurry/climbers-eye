import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import FullScreenImage from "./FullScreenImage";
import { request } from "../api/requestMethods";
import { useSelector } from "react-redux";

const ModalEditPreview = ({
  image,
  imageScaleDownFactor,
  modalVisible,
  setModalVisible,
  navigation,
  resultImageUri,
}) => {
  const { user } = useSelector((state) => state.userReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const [isPublish, setIsPublish] = useState(true);
  const [imageFullScreen, setImageFullScreen] = useState(false);

  const handleNext = async () => {
    data = {
      name,
      description,
      matching: isMatching,
      publish: isPublish,
      image_data: resultImageUri.split(",")[1], // using the default image has complete base64 as image.uri --> remove the 'data:image/png;base64' in the beginning of string
      image_width: image.width,
      image_height: image.height,
    };
    const response = await request(
      "post",
      `add_boulder/${spraywalls[spraywallIndex].id}/${user.id}`,
      data
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      navigation.navigate("Boulder", { boulder: response.data });
    }
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView(image, imageScaleDownFactor)}>
            <Pressable
              style={styles.modalImageContainer(image, imageScaleDownFactor)}
              onPress={() => setImageFullScreen(true)}
            >
              <View
                style={{
                  width: image.width / (imageScaleDownFactor + 2.5),
                  height: image.height / (imageScaleDownFactor + 2.5),
                }}
              >
                <Image
                  source={{ uri: resultImageUri }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              </View>
            </Pressable>
            <View style={styles.labelAndInputContainer}>
              <View>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Boulder Name"
                  placeholderTextColor="lightgray"
                />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Description"
                  placeholderTextColor="lightgray"
                />
              </View>
            </View>
            <View style={styles.labelAndToggleContainer}>
              <View style={styles.labelAndToggle}>
                <Text style={styles.toggleLabel}>Matching Allowed</Text>
                <Switch value={isMatching} onValueChange={setIsMatching} />
              </View>
              <View style={styles.labelAndToggle}>
                <Text style={styles.toggleLabel}>Publish</Text>
                <Switch value={isPublish} onValueChange={setIsPublish} />
              </View>
            </View>
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
      </KeyboardAvoidingView>
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={resultImageUri}
        image={image}
        onRequestClose={() => setImageFullScreen(false)}
      />
    </Modal>
  );
};

export default ModalEditPreview;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: (image, imageScaleDownFactor) => ({
    backgroundColor: "lightblue",
    borderRadius: 10,
    width: image.width / imageScaleDownFactor,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    position: "absolute",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }),
  modalImageContainer: (image, imageScaleDownFactor) => ({
    width:
      imageScaleDownFactor === 10
        ? image.width / (imageScaleDownFactor + 1)
        : image.width / (imageScaleDownFactor - 1),
    height:
      imageScaleDownFactor === 10
        ? image.width / (imageScaleDownFactor + 1)
        : image.width / (imageScaleDownFactor - 1),
    justifyContent: "center",
    alignItems: "center",
  }),
  modalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  labelAndInputContainer: {
    marginTop: 20,
    width: "75%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  modalButton: (col) => ({
    width: 100,
    height: 40,
    backgroundColor: col,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  }),
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  labelAndToggleContainer: {
    width: "60%",
    rowGap: 10,
  },
  labelAndToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLabel: {
    fontSize: 16,
  },
});
