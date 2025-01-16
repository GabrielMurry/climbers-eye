import { TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

const ModalBackground = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backgroundContainer}
      onPress={() => navigation.goBack()}
    >
      <BlurView style={styles.blur} intensity={25} />
    </TouchableOpacity>
  );
};

export default ModalBackground;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.2,
  },
  blur: {
    flex: 1,
  },
});
