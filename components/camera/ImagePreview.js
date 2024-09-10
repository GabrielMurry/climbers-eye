import { Image, StyleSheet } from "react-native";

const ImagePreview = ({ image }) => {
  return <Image source={{ uri: image.uri }} style={styles.camera} />;
};

export default ImagePreview;

const styles = StyleSheet.create({
  camera: {
    flex: 4 / 3,
  },
});
