import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FOOTER_HEIGHT = 85;
const SHUTTER_BUTTON_SIZE = FOOTER_HEIGHT;

const ButtonControls = ({
  image,
  setImage,
  handleSubmitImage,
  handleImageTaken,
}) => {
  return (
    <View style={styles.buttonContainer}>
      {image ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setImage(null)}
          >
            <Text style={styles.text}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmitImage}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={handleImageTaken}>
          <Ionicons
            name={"radio-button-on"}
            size={SHUTTER_BUTTON_SIZE}
            color={"#f1f1f1"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ButtonControls;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "black",
    height: FOOTER_HEIGHT,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    backgroundColor: "green",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
